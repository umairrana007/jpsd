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
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

const isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.apiKey !== '' && !firebaseConfig.apiKey.includes('DUMMY'));

if (isFirebaseConfigured) {
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
  // We don't set db to a fake object anymore, as it causes SDK calls to crash.
  // Instead, utility functions should check isFirebaseConfigured.
}

export { app, db, auth, storage, isFirebaseConfigured };
export default app;

