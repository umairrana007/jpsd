// Firebase Configuration and Initialization
// Lazy initialization to prevent build-time crashes
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

// Check if we have a real API key (not a placeholder)
const isValidConfig = firebaseConfig.apiKey && 
  !firebaseConfig.apiKey.includes('DUMMY') && 
  !firebaseConfig.apiKey.includes('REPLACE');

let app: FirebaseApp | null = null;
let _db: Firestore | null = null;
let _auth: Auth | null = null;
let _storage: FirebaseStorage | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!app) {
    if (!isValidConfig) {
      throw new Error('Firebase not configured. Please add valid environment variables.');
    }
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getFirebaseApp());
  }
  return _db;
}

export function getAuthInstance(): Auth {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

export function getStorageInstance(): FirebaseStorage {
  if (!_storage) {
    _storage = getStorage(getFirebaseApp());
  }
  return _storage;
}

// Legacy exports for backward compatibility - these are lazy getters
export const db = new Proxy({} as Firestore, {
  get(_target, prop) {
    return getDb()[prop as keyof Firestore];
  }
});

export const auth = new Proxy({} as Auth, {
  get(_target, prop) {
    return getAuthInstance()[prop as keyof Auth];
  }
});

export const storage = new Proxy({} as FirebaseStorage, {
  get(_target, prop) {
    return getStorageInstance()[prop as keyof FirebaseStorage];
  }
});

export default {
  get app() { return getFirebaseApp(); }
};
