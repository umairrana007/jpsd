// Firebase Configuration and Initialization
// Safe initialization to prevent Vercel client crashes
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, doc } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let db: any;
let auth: any;
let storage: any;

const isConfigured = !!(firebaseConfig.apiKey && firebaseConfig.apiKey !== '' && !firebaseConfig.apiKey.includes('DUMMY'));

if (isConfigured) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("Firebase Initialization Error:", error);
  }
}

// Fallback logic to prevent "collection() expected Firestore" crashes
if (!db) {
  console.warn("FIREBASE NOT CONFIGURED! Using safety proxies.");
  // Mock db as something that won't crash standard calls but won't return data
  db = { type: 'firestore', _databaseId: { projectId: 'mock' } } as any; 
  auth = { currentUser: null } as any;
  storage = {} as any;
}

export { app };
export { db, auth, storage };
export default app;
