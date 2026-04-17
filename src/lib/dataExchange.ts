import { db } from './firebase';
import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  writeBatch, 
  Timestamp,
  deleteDoc,
  Firestore,
  query,
  where
} from 'firebase/firestore';

/**
 * Data Logistics Engine for JPSD Admin Portal
 * Handles system-wide Export and Import of Firestore collections.
 */

// List of all mission-critical collections to include in backup
export const BACKUP_COLLECTIONS = [
  'users',
  'causes',
  'categories',
  'events',
  'donations',
  'volunteers',
  'blog_posts',
  'testimonials',
  'partners',
  'navigation',
  'theme_settings',
  'site_config',
  'global_config',
  'pages',
  'recurring_donations',
  'live_stats',
  'activity_logs'
];

/**
 * Recursive helper to convert Firestore Timestamps to ISO strings in an object.
 */
const serializeTimestamps = (data: any): any => {
  if (!data) return data;
  
  if (data instanceof Timestamp) {
    return data.toDate().toISOString();
  }
  
  if (Array.isArray(data)) {
    return data.map(item => serializeTimestamps(item));
  }
  
  if (typeof data === 'object' && data !== null) {
    const serialized: any = {};
    for (const [key, value] of Object.entries(data)) {
      serialized[key] = serializeTimestamps(value);
    }
    return serialized;
  }
  
  return data;
};

/**
 * Recursive helper to convert ISO strings back to Firestore Timestamps 
 * for fields ending in 'At' or 'Date' or 'Time'.
 */
const deserializeTimestamps = (data: any): any => {
  if (!data) return data;
  
  if (Array.isArray(data)) {
    return data.map(item => deserializeTimestamps(item));
  }
  
  if (typeof data === 'object' && data !== null) {
    const deserialized: any = {};
    for (const [key, value] of Object.entries(data)) {
      // Basic heuristic for typical date fields in this codebase
      const isDateField = key.endsWith('At') || key.toLowerCase().includes('date') || key.toLowerCase().includes('time');
      
      if (isDateField && typeof value === 'string' && !isNaN(Date.parse(value))) {
        deserialized[key] = Timestamp.fromDate(new Date(value));
      } else {
        deserialized[key] = deserializeTimestamps(value);
      }
    }
    return deserialized;
  }
  
  return data;
};

/**
 * EXPORT: Fetches all data from mission-critical collections.
 */
export const exportFullSystem = async () => {
  if (!db) throw new Error('Firebase Database not initialized.');

  const backup: Record<string, any[]> = {};
  
  for (const collectionName of BACKUP_COLLECTIONS) {
    console.log(`[Backup] Exporting collection: ${collectionName}`);
    try {
      const colRef = collection(db as Firestore, collectionName);
      const snapshot = await getDocs(colRef);
      backup[collectionName] = snapshot.docs.map(doc => ({
        _id: doc.id,
        ...serializeTimestamps(doc.data())
      }));
    } catch (e) {
      console.warn(`[Backup] Failed to export ${collectionName}:`, e);
      backup[collectionName] = [];
    }
  }

  return {
    version: '1.0',
    exportDate: new Date().toISOString(),
    system: 'JPSD Master Portal',
    data: backup
  };
};

/**
 * IMPORT: Overwrites or merges data into Firestore.
 * @param jsonData The JSON backup object.
 * @param clearFirst If true, deletes existing records in collections before importing.
 * @param isDemo If true, adds __isDemo: true to every record for future purging.
 */
export const importSystemData = async (jsonData: any, clearFirst: boolean = false, isDemo: boolean = false) => {
  if (!db) throw new Error('Firebase Database not initialized.');
  if (!jsonData.data) throw new Error('Invalid backup file format: Missing data field.');

  const collections = jsonData.data;
  const results: Record<string, { success: number; failed: number }> = {};

  for (const [collectionName, records] of Object.entries(collections)) {
    if (!Array.isArray(records)) continue;
    
    console.log(`[Import] Processing collection: ${collectionName} (${records.length} records)`);
    results[collectionName] = { success: 0, failed: 0 };

    // --- STEP 1: CLEARING (Optional) ---
    if (clearFirst) {
      const colRef = collection(db as Firestore, collectionName);
      const snapshot = await getDocs(colRef);
      const deleteChunks = [];
      let currentBatch = writeBatch(db);
      let count = 0;

      for (const docSnap of snapshot.docs) {
        currentBatch.delete(docSnap.ref);
        count++;
        if (count >= 400) {
          deleteChunks.push(currentBatch.commit());
          currentBatch = writeBatch(db);
          count = 0;
        }
      }
      if (count > 0) deleteChunks.push(currentBatch.commit());
      await Promise.all(deleteChunks);
    }

    // --- STEP 2: WRITING ---
    let currentBatch = writeBatch(db);
    let count = 0;

    for (const record of records) {
      const { _id, ...data } = record;
      const docRef = _id ? doc(db as Firestore, collectionName, _id) : doc(collection(db as Firestore, collectionName));
      
      try {
        const deserializedData = deserializeTimestamps(data);
        
        // Add demo tagging if requested
        if (isDemo) {
          deserializedData.__isDemo = true;
          deserializedData.__demoImportedAt = Timestamp.now();
        }

        currentBatch.set(docRef, deserializedData, { merge: true });
        count++;
        
        if (count >= 400) {
          await currentBatch.commit();
          results[collectionName].success += count;
          currentBatch = writeBatch(db);
          count = 0;
        }
      } catch (e) {
        console.error(`[Import] Failed to process record in ${collectionName}:`, e);
        results[collectionName].failed++;
      }
    }

    if (count > 0) {
      await currentBatch.commit();
      results[collectionName].success += count;
    }
  }

  return results;
};

/**
 * PURGE: Removes all records tagged with __isDemo: true.
 */
export const purgeDemoData = async () => {
  if (!db) throw new Error('Firebase Database not initialized.');
  
  let totalPurged = 0;
  console.log('[Purge] Starting system-wide demo asset purge...');
  
  for (const collectionName of BACKUP_COLLECTIONS) {
    try {
      const colRef = collection(db as Firestore, collectionName);
      const q = query(colRef, where('__isDemo', '==', true));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log(`[Purge] No demo records in ${collectionName}`);
        continue;
      }
      
      console.log(`[Purge] Found ${snapshot.size} demo records in ${collectionName}. Executing secure deletion...`);
      
      const deleteChunks = [];
      let currentBatch = writeBatch(db);
      let count = 0;

      for (const docSnap of snapshot.docs) {
        currentBatch.delete(docSnap.ref);
        count++;
        if (count >= 400) {
          deleteChunks.push(currentBatch.commit());
          currentBatch = writeBatch(db);
          count = 0;
        }
      }
      
      if (count > 0) deleteChunks.push(currentBatch.commit());
      await Promise.all(deleteChunks);
      totalPurged += snapshot.size;
      console.log(`[Purge] Successfully cleared ${snapshot.size} records from ${collectionName}`);
    } catch (e: any) {
      console.error(`[Purge] Critical failure in collection ${collectionName}:`, e.message);
      // Continue to next collection even if one fails
    }
  }
  
  console.log(`[Purge] Operation finalized. Total demo assets purged: ${totalPurged}`);
  return totalPurged;
};
