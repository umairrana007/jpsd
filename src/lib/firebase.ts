// Firebase Configuration and Initialization
// Safe initialization to prevent Vercel client crashes if env variables are missing
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
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
let db: Firestore | undefined;
let auth: Auth | undefined;
let storage: FirebaseStorage | undefined;

try {
  // Check if we actually have keys
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== '' && !firebaseConfig.apiKey.includes('DUMMY')) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } else {
    console.warn("FIREBASE IS NOT CONFIGURED! Using mocked services.");
  }
} catch (error) {
  console.error("Firebase Initialization Error:", error);
}

// Fallback empty proxies so the app doesn't crash if Firebase fails to load
const dummyDb = new Proxy({} as Firestore, { get: () => () => ({}) });
const dummyAuth = new Proxy({} as Auth, { 
    get: (target, prop) => {
        if (prop === 'currentUser') return null;
        return () => {};
    }
});
const dummyStorage = new Proxy({} as FirebaseStorage, { get: () => () => ({}) });

export { app };
export const dbInstance = db || dummyDb;
export const authInstance = auth || dummyAuth;
export const storageInstance = storage || dummyStorage;

// Exporting as the original names used in the app
export { dbInstance as db, authInstance as auth, storageInstance as storage };
export default app;
