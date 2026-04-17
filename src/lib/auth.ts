import { NextRequest } from 'next/server';
import { verifySession } from '@/app/login/actions';

/**
 * Retrieves the user information from the secure session cookie.
 * This performs a cryptographic verification using the Firebase Admin SDK.
 */
export async function getUserFromCookie(request: NextRequest) {
  const session = request.cookies.get('session');
  if (!session) return null;
  
  try {
    const claims = await verifySession(session.value);
    if (!claims) return null;
    
    // Try to fetch user role from Firestore (requires Firebase Admin)
    try {
      const { adminDb } = await import('@/lib/firebaseAdmin');
      const userDoc = await adminDb.collection('users').doc(claims.uid).get();
      const userData = userDoc.data();
      
      return { 
        ...claims,
        role: userData?.role || 'donor',
        isActive: userData?.isActive !== false,
      };
    } catch (firestoreError) {
      // If Firestore access fails, return basic claims with default role
      console.warn('[Auth Lib] Firestore access failed, using session claims only:', firestoreError);
      return {
        ...claims,
        role: 'donor', // Default role if Firestore is unavailable
        isActive: true,
      };
    }
  } catch (error) {
    console.error('[Auth Lib] Session verification failed:', error);
    return null;
  }
}
