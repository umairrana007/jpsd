// Firebase utility functions for common operations

import { db, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  setDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  Firestore
} from 'firebase/firestore';
import { Cause, Event, BlogPost, Volunteer, User, UserRole, Donation, Deployment, NavItem, AuditLog, AppUser, Subscription, Partner, Testimonial } from '@/types';
import { getSafeImageUrl } from './imageUtils';

// --- In-Memory Cache (Phase 5) ---
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
interface CacheEntry {
  data: unknown;
  timestamp: number;
}
const queryCache: Record<string, CacheEntry> = {};

const getCachedData = (key: string) => {
  const entry = queryCache[key];
  if (entry && (Date.now() - entry.timestamp < CACHE_TTL)) {
    return entry.data;
  }
  return null;
};

const setCachedData = (key: string, data: unknown) => {
  queryCache[key] = { data, timestamp: Date.now() };
};

export const invalidateCache = (prefix?: string) => {
  if (!prefix) {
    Object.keys(queryCache).forEach(key => delete queryCache[key]);
  } else {
    Object.keys(queryCache).forEach(key => {
      if (key.startsWith(prefix)) delete queryCache[key];
    });
  }
};

/**
 * Global helper to safely convert Firestore Timestamp or string to Date
 * Handles: Firebase Timestamp, Date object, ISO string, or null/undefined
 */
export const toDateSafe = (value: any): Date | undefined => {
  if (!value) return undefined;
  // If it's a Firebase Timestamp
  if (typeof value.toDate === 'function') return value.toDate();
  // If it's already a Date object
  if (value instanceof Date) return value;
  // If it's a string, parse it
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }
  return undefined;
};

// Helper to get non-null db reference (throws if not configured)
const getDb = (): Firestore => {
  if (!db) {
    throw new Error('Firebase not configured. Set environment variables.');
  }
  return db;
};

// Helper for timing out database calls
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number = 1000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('TIMEOUT')), timeoutMs)
    )
  ]);
};

// Global check for Firebase availability
const isDBAvailable = () => isFirebaseConfigured && db !== null;

// Donation Operations
export const createDonation = async (donationData: Partial<Donation>) => {
  if (!isDBAvailable()) return null;

  try {
    const { status: statusOverride, createdAt: createdAtInput, ...rest } = donationData;
    let createdAt = Timestamp.now();
    if (createdAtInput instanceof Timestamp) {
      createdAt = createdAtInput;
    } else if (createdAtInput instanceof Date) {
      createdAt = Timestamp.fromDate(createdAtInput);
    }

    const donationRef = await addDoc(collection(getDb() as Firestore, 'donations'), {
      ...rest,
      createdAt,
      status: statusOverride ?? 'pending',
    });
    
    return donationRef.id;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};

export const getDonations = async () => {
  if (!isDBAvailable()) return [];
  try {
    const donationsQuery = query(
      collection(getDb(), 'donations'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(donationsQuery);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting donations:', error);
    throw error;
  }
};

export const getUserDonations = async (userId: string, status?: string): Promise<Donation[]> => {
  try {
    let donationsQuery = query(
      collection(getDb(), 'donations'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    if (status) {
      donationsQuery = query(donationsQuery, where('status', '==', status));
    }

    const snapshot = await getDocs(donationsQuery);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        donorName: data.donorName || '',
        donorEmail: data.donorEmail || '',
        donorPhone: data.donorPhone || '',
        amount: data.amount || 0,
        userId: data.userId || '',
        causeId: data.causeId || '',
        causeName: data.causeName || '',
        paymentMethod: data.paymentMethod || 'jazzcash',
        frequency: data.frequency || 'one-time',
        status: data.status || 'pending',
        timestamp: toDateSafe(data.timestamp) || new Date(),
        receiptConsent: data.receiptConsent || false,
        isZakat: data.isZakat || false,
        isAnonymous: data.isAnonymous || false,
        transactionId: data.transactionId,
        securityHash: data.securityHash,
        receiptSent: data.receiptSent || false,
        createdAt: toDateSafe(data.createdAt)
      } as Donation;
    });
  } catch (error) {
    console.error('Error getting user donations:', error);
    return [];
  }
};

// Program Operations
export const getPrograms = async () => {
  return getCauses(); // Synchronizing with 'causes'
};

export const getProgramById = async (id: string) => {
  return getCauseById(id); // Synchronizing with 'causes'
};

// Cause Operations
export const getCauses = async (): Promise<Cause[]> => {
  if (!isDBAvailable()) return [];
  const cacheKey = 'causes_all';
  const cached = getCachedData(cacheKey);
  if (cached) return cached as Cause[];

  if (!isDBAvailable()) return [];

  try {
    const causesQuery = query(
      collection(getDb() as Firestore, 'causes'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(causesQuery);
    
    const data = snapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        ...data,
        id: doc.id,
        image: getSafeImageUrl(data.image),
        deadline: toDateSafe(data.deadline),
        createdAt: toDateSafe(data.createdAt),
        updatedAt: toDateSafe(data.updatedAt),
      } as Cause;
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error: unknown) {
    console.error('Database Error:', error);
    return [];
  }
};

export const getCauseById = async (id: string): Promise<Cause | null> => {
  try {
    const causeRef = doc(getDb(), 'causes', id);
    const causeSnap = await getDoc(causeRef);
    if (causeSnap.exists()) {
      const data = causeSnap.data() as any;
      return {
        ...data,
        id: causeSnap.id,
        image: getSafeImageUrl(data.image),
        deadline: toDateSafe(data.deadline),
        createdAt: toDateSafe(data.createdAt),
        updatedAt: toDateSafe(data.updatedAt),
      } as Cause;
    }
  } catch (error) {
    console.error('Error getting cause detail:', error);
  }
  return null;
};

// Event Operations
export const getEvents = async (): Promise<Event[]> => {
  const cacheKey = 'events_all';
  const cached = getCachedData(cacheKey);
  if (cached) return cached as Event[];

  if (!isDBAvailable()) return [];

  try {
    const eventsQuery = query(
      collection(getDb() as Firestore, 'events'),
      orderBy('startDate', 'asc')
    );
    const snapshot = await getDocs(eventsQuery);

    const data = snapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        ...data,
        id: doc.id,
        image: getSafeImageUrl(data.image),
        startDate: toDateSafe(data.startDate),
        endDate: toDateSafe(data.endDate),
        registrationDeadline: toDateSafe(data.registrationDeadline),
        createdAt: toDateSafe(data.createdAt),
      } as Event;
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error: unknown) {
    console.error('Database Error:', error);
    return [];
  }
};

export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    const eventRef = doc(getDb(), 'events', id);
    const eventSnap = await getDoc(eventRef);
    if (eventSnap.exists()) {
      const data = eventSnap.data() as any;
      return {
        ...data,
        id: eventSnap.id,
        image: getSafeImageUrl(data.image),
        startDate: toDateSafe(data.startDate),
        endDate: toDateSafe(data.endDate),
        registrationDeadline: toDateSafe(data.registrationDeadline),
        createdAt: toDateSafe(data.createdAt),
      } as Event;
    }
  } catch (error) {
    console.error('Error getting event detail:', error);
  }
  return null;
};

// Blog Post Operations
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const cacheKey = 'blog_posts_all';
  const cached = getCachedData(cacheKey);
  if (cached) return cached as BlogPost[];

  if (!isDBAvailable()) return [];

  try {
    const postsQuery = query(
      collection(getDb() as Firestore, 'blog_posts'),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );
    const snapshot = await getDocs(postsQuery);

    const data = snapshot.docs.map(doc => {
      const data = doc.data() as any;
      return {
        ...data,
        id: doc.id,
        image: getSafeImageUrl(data.image),
        publishedAt: toDateSafe(data.publishedAt),
        createdAt: toDateSafe(data.createdAt),
        updatedAt: toDateSafe(data.updatedAt),
      } as BlogPost;
    });
    setCachedData(cacheKey, data);
    return data;
  } catch (error: unknown) {
    console.error('Database Error:', error);
    return [];
  }
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const postRef = doc(getDb(), 'blog_posts', id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const data = postSnap.data() as any;
      return {
        ...data,
        id: postSnap.id,
        image: getSafeImageUrl(data.image),
        publishedAt: toDateSafe(postSnap.data().publishedAt),
        createdAt: toDateSafe(postSnap.data().createdAt),
        updatedAt: toDateSafe(postSnap.data().updatedAt),
      } as BlogPost;
    }
  } catch (error) {
    console.error('Error getting blog post details:', error);
  }
  return null;
};

// Volunteer Operations
export const submitVolunteerApplication = async (volunteerData: Partial<Volunteer>) => {
  try {
    const docRef = await addDoc(collection(getDb(), 'volunteers'), {
      ...volunteerData,
      status: 'pending',
      hoursLogged: 0,
      rating: 5.0,
      badges: [],
      joinedAt: Timestamp.now()
    });
    
    await logActivity({ 
      type: 'VOLUNTEER_REGISTER', 
      message: 'New volunteer application submitted', 
      icon: 'ðŸ™‹' 
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating volunteer:', error);
    throw error;
  }
};

export const getVolunteers = async (): Promise<Volunteer[]> => {
  try {
    const volunteersQuery = query(collection(getDb(), 'volunteers'), orderBy('joinedAt', 'desc'));
    const snapshot = await getDocs(volunteersQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      joinedAt: toDateSafe(doc.data().joinedAt),
      dob: toDateSafe(doc.data().dob),
    })) as Volunteer[];
  } catch (error) {
    console.error('Error getting volunteers:', error);
    return [];
  }
};

export const updateVolunteer = async (volunteerId: string, updates: Partial<Volunteer>) => {
  try {
    const docRef = doc(getDb(), 'volunteers', volunteerId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating volunteer:', error);
    throw error;
  }
};

export const registerForEvent = async (volunteerId: string, eventId: string) => {
  try {
    const registrationRef = await addDoc(collection(getDb(), 'event_registrations'), {
      volunteerId,
      eventId,
      status: 'registered',
      registeredAt: Timestamp.now()
    });
    
    // Update volunteer's assignedEvents
    const volunteerRef = doc(getDb(), 'volunteers', volunteerId);
    const volunteerSnap = await getDoc(volunteerRef);
    if (volunteerSnap.exists()) {
      const currentEvents = volunteerSnap.data().assignedEvents || [];
      await updateDoc(volunteerRef, {
        assignedEvents: [...currentEvents, eventId]
      });
    }

    return registrationRef.id;
  } catch (error) {
    console.error('Error registering for event:', error);
    return null;
  }
};

// Deployment Operations (Phase 9)
export const getDeployments = async (volunteerId?: string) => {
  if (!isDBAvailable()) return [];
  try {
    let deploymentsQuery = query(collection(getDb(), 'deployments'), orderBy('updatedAt', 'desc'));
    if (volunteerId) {
      deploymentsQuery = query(deploymentsQuery, where('volunteerId', '==', volunteerId));
    }
    const snapshot = await getDocs(deploymentsQuery);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      checkInTime: toDateSafe(doc.data().checkInTime),
      checkOutTime: toDateSafe(doc.data().checkOutTime),
      updatedAt: toDateSafe(doc.data().updatedAt),
    }));
  } catch (error) {
    console.error('Error getting deployments:', error);
    return [];
  }
};

export const createDeployment = async (deploymentData: Partial<Deployment>) => {
  if (!isDBAvailable()) return null;
  try {
    const docRef = await addDoc(collection(getDb(), 'deployments'), {
      ...deploymentData,
      status: 'assigned',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating deployment:', error);
    return null;
  }
};

export const updateDeploymentStatus = async (deploymentId: string, status: Deployment['status'], metadata: Record<string, unknown> = {}) => {
  if (!isDBAvailable()) return false;
  try {
    const docRef = doc(getDb(), 'deployments', deploymentId);
    await updateDoc(docRef, {
      status,
      ...metadata,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating deployment status:', error);
    return false;
  }
};

// Admin Configuration Operations
export const getGlobalSettings = async () => {
  if (!isDBAvailable()) return null;
  try {
    const docRef = doc(getDb(), 'site_config', 'main');
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.error('Error getting global settings:', error);
    return null;
  }
};

export const updateGlobalSettings = async (settings: Record<string, unknown>) => {
  if (!isDBAvailable()) return false;
  try {
    await setDoc(doc(getDb(), 'site_config', 'main'), {
      ...settings,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating global settings:', error);
    return false;
  }
};

export const getThemeSettings = async () => {
  try {
    const docRef = doc(getDb(), 'theme_settings', 'main');
    const snap = await getDoc(docRef);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.error('Error getting theme settings:', error);
    return null;
  }
};

export const updateThemeSettings = async (theme: Record<string, unknown>) => {
  try {
    await setDoc(doc(getDb(), 'theme_settings', 'main'), {
      ...theme,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating theme settings:', error);
    return false;
  }
};

export const getNavigationSettings = async () => {
  try {
    const q = query(collection(getDb(), 'navigation'), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return { items: snap.docs.map(d => ({ id: d.id, ...d.data() })) };
  } catch (error) {
    console.error('Error getting navigation:', error);
    return { items: [] };
  }
};

export const updateNavigationSettings = async (items: any[]) => {
  try {
    const batch = (await import('firebase/firestore')).writeBatch(getDb());
    
    // Simplest logic for UI: We can just let the UI handle individual updateDoc calls
    // But if we want to save all items at once, we use batch
    
    items.forEach(item => {
      // If it doesn't have an id, we'll create one shortly!
      const docRef = item.id ? doc(getDb(), 'navigation', item.id) : doc(collection(getDb(), 'navigation'));
      batch.set(docRef, {
        ...item,
        id: docRef.id,
        updatedAt: Timestamp.now()
      }, { merge: true });
    });
    
    await batch.commit();
    return true;
  } catch (error) {
    console.error('Error updating navigation:', error);
    return false;
  }
};

// Live Stats Operations
export const getLiveStats = async () => {
  if (!isDBAvailable()) return null;

  try {
    const statsQuery = query(collection(getDb() as Firestore, 'live_stats'), limit(1));
    const snapshot = await getDocs(statsQuery);
    if (!snapshot.empty) {
      return snapshot.docs[0].data();
    }
    return null;
  } catch (error: unknown) {
    console.error('Database Error:', error);
    return null;
  }
};

// User Operations
export const createUser = async (userData: Partial<User>) => {
  try {
    const userRef = doc(getDb(), 'users', userData.id as string);
    await setDoc(userRef, {
      ...userData,
      createdAt: Timestamp.now()
    });
    return userData.id as string;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUsers = async () => {
  if (!isDBAvailable()) return [];
  try {
    const usersQuery = query(collection(getDb(), 'users'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(usersQuery);
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

export const updateUserStatus = async (userId: string, status: 'approved' | 'rejected' | 'inactive' | 'pending' | 'pending_deletion', isActive: boolean) => {
  try {
    const userRef = doc(getDb(), 'users', userId);
    await updateDoc(userRef, {
      status,
      isActive,
      updatedAt: Timestamp.now()
    });
    
    await logActivity({
      type: 'USER_ADMIN',
      message: `User ${userId} status updated to ${status} (${isActive ? 'Active' : 'Inactive'})`,
      icon: 'ðŸ‘¤'
    });

    return true;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

export const updateUserRole = async (userId: string, role: UserRole, extra?: Record<string, any>) => {
  try {
    const userRef = doc(getDb(), 'users', userId);
    await updateDoc(userRef, {
      role,
      ...extra,
      updatedAt: Timestamp.now()
    });

    await logActivity({
      type: 'USER_ROLE',
      message: `User ${userId} role changed to ${role}`,
      icon: '🛡️',
      ...extra
    });

    return true;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

// Newsletter Subscription Operations
export const subscribeToNewsletter = async (email: string) => {
  if (!isDBAvailable()) return null;
  try {
    const subscriptionRef = await addDoc(collection(getDb(), 'subscriptions'), {
      email,
      subscribedAt: Timestamp.now(),
      status: 'active'
    });
    return subscriptionRef.id;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};
// System Stats Aggregator (HQ Stats)
export const getSystemStats = async () => {
  if (!isDBAvailable()) return null;
  try {
    const [donorsSnap, donationsSnap, volunteersSnap, eventsSnap] = await Promise.all([
      getDocs(collection(getDb(), 'users')), // Filter role=donor if needed
      getDocs(collection(getDb(), 'donations')),
      getDocs(collection(getDb(), 'volunteers')),
      getDocs(collection(getDb(), 'events'))
    ]);

    const totalDonations = donationsSnap.docs.reduce((acc, doc) => acc + (doc.data().amount || 0), 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayDonations = donationsSnap.docs
      .filter(doc => toDateSafe(doc.data().createdAt) && toDateSafe(doc.data().createdAt)! >= today)
      .reduce((acc, doc) => acc + (doc.data().amount || 0), 0);

    return {
      totalDonors: donorsSnap.size,
      totalDonations,
      todayDonations,
      activeVolunteers: volunteersSnap.size,
      upcomingMissions: eventsSnap.size,
      systemHealth: '100% Operational'
    };
  } catch (e) {
    console.error('HQ Sync Failure:', e);
    return null;
  }
};
// HQ Command Intelligence: Global Search
export const searchUsers = async (searchTerm: string) => {
  if (!isDBAvailable()) return [];
  try {
    const usersCol = collection(getDb(), 'users');
    const q = query(
      usersCol,
      orderBy('name'),
      limit(10)
    );
    const snapshot = await getDocs(q);
    
    // Client-side filter for CNIC/Phone/Email for maximum precision
    const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as User)
      .filter((user: User) => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm) ||
        user.cnic?.includes(searchTerm)
      );
      
    return results;
  } catch (error) {
    console.error('Search Failure:', error);
    return [];
  }
};



// --- Donor Dashboard Enhancements (Phase 5) ---

export interface ImpactMetrics {
  totalDonated: number;
  causesCount: number;
  streakDays: number;
  livesImpacted: number;
  impactScore: number;
}

export const getUserImpactMetrics = async (userId: string): Promise<ImpactMetrics> => {
  if (!isDBAvailable()) {
    return { totalDonated: 0, causesCount: 0, streakDays: 0, livesImpacted: 0, impactScore: 0 };
  }
  
  try {
     const userDoc = await getDoc(doc(getDb(), 'users', userId));
     if (userDoc.exists() && userDoc.data().impactMetrics) {
        return userDoc.data().impactMetrics as ImpactMetrics;
     }
     
     // Fallback to manual computation if not pre-computed
     const donations = await getUserDonations(userId);
     const total = donations.reduce((acc, d: Donation) => acc + (d.amount || 0), 0);
     const causes = new Set(donations.map((d: Donation) => d.causeId || d.causeId)).size;
     const streak = 5; // Fixed mock for Phase 6
     
     return {
        totalDonated: total,
        causesCount: causes,
        streakDays: streak,
        livesImpacted: Math.ceil(total / 2500),
        impactScore: Math.floor(total * 0.1 + causes * 5 + streak * 2)
     };
  } catch (error) {
     console.error('Error getting impact metrics:', error);
     return { totalDonated: 0, causesCount: 0, streakDays: 0, livesImpacted: 0, impactScore: 0 };
  }
};

export const getUserRecurringDonations = async (userId: string): Promise<Subscription[]> => {
   if (!isDBAvailable()) return [];
   try {
      const q = query(collection(getDb(), 'recurring_donations'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId || userId,
          causeId: data.causeId || '',
          cause: data.cause || '',
          amount: data.amount || 0,
          frequency: data.frequency || 'monthly',
          status: data.status || 'active',
          nextBillingAt: toDateSafe(data.nextBillingAt) || new Date(),
          nextDate: toDateSafe(data.nextDate),
          createdAt: toDateSafe(data.createdAt) || new Date()
        } as Subscription;
      });
   } catch (error) {
      console.error('Error getting recurring donations:', error);
      return [];
   }
};

export const toggleRecurringDonation = async (id: string, active: boolean) => {
   if (!isDBAvailable()) return;
   try {
      await updateDoc(doc(getDb(), 'recurring_donations', id), { active, updatedAt: Timestamp.now() });
   } catch (error) {
      console.error('Error toggling recurring donation:', error);
   }
};

// Tactical Activity Stream
export const getRecentActivity = async () => {
  if (!isDBAvailable()) return [];
  try {
    const logsCol = collection(getDb(), 'activity_logs');
    const q = query(logsCol, orderBy('timestamp', 'desc'), limit(15));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      // Return high-fidelity mock stream if live logs are empty for demo
      return [
        { id: '1', type: 'DONATION', message: 'Anonymous donor contributed $500', time: '2m ago', icon: 'ðŸ’°' },
        { id: '2', type: 'VOLUNTEER', message: 'Ali Khan checked-in at Korangi Site', time: '15m ago', icon: 'ðŸ“' },
        { id: '3', type: 'EVENT', message: 'Ramadan Ration Drive mission created', time: '1h ago', icon: 'ðŸ“¦' },
        { id: '4', type: 'SYSTEM', message: 'Theme tokens updated site-wide', time: '3h ago', icon: 'ðŸŽ¨' },
      ];
    }
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Activity Stream Failed:', error);
    return [];
  }
};

// Activity Logging Enhanced (Phase 4)
export const getActivityLogs = async (limitCount: number = 100): Promise<AuditLog[]> => {
  if (!isDBAvailable()) return [];
  
  try {
    const logsQuery = query(
      collection(getDb(), 'activity_logs'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(logsQuery);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId || '',
        userEmail: data.userEmail || '',
        action: data.action || '',
        resource: data.resource || '',
        status: data.status || 'success',
        details: data.details,
        metadata: data.metadata,
        message: data.message,
        adminUid: data.adminUid,
        type: data.type,
        timestamp: toDateSafe(data.timestamp),
        affectedUserId: data.affectedUserId,
        affectedUserIds: data.affectedUserIds,
        createdAt: toDateSafe(data.createdAt) || toDateSafe(data.timestamp) || new Date()
      } as AuditLog;
    });
  } catch (error) {
    console.error('Error getting activity logs:', error);
    return [];
  }
};

export type AuditLogData = {
  type: string;
  message: string;
  collection?: string;
  docId?: string;
  beforeState?: Record<string, unknown>;
  afterState?: Record<string, unknown>;
  actorUid?: string;
  actorEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp?: any;
  [key: string]: any; // Allow for extra metadata fields
};

export const logActivity = async (data: AuditLogData) => {
  if (!isDBAvailable()) return;
  const actorUid = data.actorUid ?? data.adminUid;
  await addDoc(collection(getDb() as Firestore, 'activity_logs'), {
    ...data,
    ...(actorUid ? { actorUid } : {}),
    timestamp: data.timestamp || serverTimestamp()
  });
};

export const saveVersion = async (collectionName: string, docId: string, data: Record<string, unknown>, actorUid: string) => {
  if (!isDBAvailable()) return;
  const versionRef = doc(collection(getDb() as Firestore, collectionName, docId, 'versions'), Date.now().toString());
  await setDoc(versionRef, {
    data,
    createdAt: serverTimestamp(),
    actorUid,
    action: 'update'
  });
};

export const restoreVersion = async (collectionName: string, docId: string, versionId: string) => {
  if (!isDBAvailable()) return;
  const versionRef = doc(getDb() as Firestore, collectionName, docId, 'versions', versionId);
  const versionSnap = await getDoc(versionRef);
  if (!versionSnap.exists()) throw new Error('Version not found');
  const versionData = versionSnap.data();
  await updateDoc(doc(getDb() as Firestore, collectionName, docId), {
    ...(versionData.data as any),
    updatedAt: serverTimestamp(),
    restoredFrom: versionId
  });
};



