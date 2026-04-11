'use server';

import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebaseAdmin';

/**
 * Creates a secure Firebase session cookie.
 * @param idToken The Firebase ID Token from the client
 */
export async function createSession(idToken: string) {
  const cookieStore = await cookies();
  
  try {
    // Generate a session cookie using the Admin SDK
    // Firebase Admin expects a verified ID Token, not a UID string
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { 
      expiresIn: 60 * 60 * 24 * 7 * 1000 // 1 week
    });
    
    cookieStore.set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
  } catch (error) {
    console.error('[Session Error] Failed to create session cookie:', error);
    throw new Error('Internal authentication failure');
  }
}

/**
 * Verifies a session cookie and returns the decoded claims.
 * @param sessionCookie The session cookie string
 */
export async function verifySession(sessionCookie: string) {
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch (error) {
    console.error('[Session Error] Token verification failed:', error);
    return null;
  }
}

/**
 * Clears the session cookie on logout.
 */
export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
