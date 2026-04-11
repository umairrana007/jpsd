import { NextRequest } from 'next/server';
import { verifySession } from '@/app/login/actions';
import { adminDb } from '@/lib/firebaseAdmin';

/**
 * Retrieves the user information from the secure session cookie.
 * This performs a cryptographic verification using the Firebase Admin SDK.
 */
export async function getUserFromCookie(request: NextRequest) {
  const session = request.cookies.get('session');
  if (!session) return null;
  
  const claims = await verifySession(session.value);
  if (!claims) return null;
  
  try {
    // Fetch the user's role and latest profile data from Firestore
    // This ensures permissions are based on the latest database state, not stale token data
    const userDoc = await adminDb.collection('users').doc(claims.uid).get();
    const userData = userDoc.data();
    
    return { 
      ...claims,
      role: userData?.role || 'donor',
      isActive: userData?.isActive !== false,
    };
  } catch (error) {
    console.error('[Auth Lib] Firestore verification failed:', error);
    return null;
  }
}
