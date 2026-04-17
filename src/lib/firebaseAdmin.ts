import * as admin from 'firebase-admin';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

let isInitialized = false;

if (!projectId || !clientEmail || !privateKey) {
  console.warn('⚠️ Firebase Admin credentials missing. Server-side auth features disabled.');
  console.warn('   Add FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY to .env.local');
} else {
  // Process the private key to handle common .env formatting issues
  const formattedPrivateKey = privateKey
    .replace(/\\n/g, '\n') // Convert literal \n to actual newlines
    .replace(/^"|"$/g, '')  // Remove wrapping quotes if they exist
    .trim();

  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey: formattedPrivateKey,
        }),
      });
      isInitialized = true;
      console.log('✅ Firebase Admin Initialized Successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin:', error);
    }
  } else {
    isInitialized = true;
  }
}

// Export safe wrappers that check initialization
export const adminAuth = new Proxy({} as admin.auth.Auth, {
  get(target, prop) {
    if (!isInitialized) {
      throw new Error('Firebase Admin not initialized. Check your environment variables.');
    }
    return Reflect.get(admin.auth(), prop);
  }
});

export const adminDb = new Proxy({} as admin.firestore.Firestore, {
  get(target, prop) {
    if (!isInitialized) {
      throw new Error('Firebase Admin not initialized. Check your environment variables.');
    }
    return Reflect.get(admin.firestore(), prop);
  }
});
