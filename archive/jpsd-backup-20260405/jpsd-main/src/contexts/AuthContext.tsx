// Firebase Authentication Context
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  currentUserData: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
  isAdmin: boolean;
  isContentManager: boolean;
  isVolunteer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserData, setCurrentUserData] = useState<any | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Log Activity Helper
  const logLoginActivity = async (userId: string, email: string) => {
    if (!db) return;
    try {
      await addDoc(collection(db as Firestore, 'login_activity'), {
        userId,
        email,
        timestamp: serverTimestamp(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
        // Note: Client IP can be added if using cloud functions or third-party IP services
      });
    } catch (e) {
      console.error('Error logging activity:', e);
    }
  };

  // Session Timeout Hook (30 Minutes)
  useEffect(() => {
    if (!user) return;

    const TIMEOUT_MS = 30 * 60 * 1000;
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > TIMEOUT_MS) {
        logout();
        alert('Your session has expired for security reasons.');
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [user, lastActivity]);

  // Activity Tracker
  useEffect(() => {
    if (!user) return;
    const updateActivity = () => setLastActivity(Date.now());
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
    };
  }, [user]);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user && db) {
        // Fetch user data from Firestore
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setCurrentUserData(userSnap.data());
          } else {
            // Create user document if it doesn't exist
            await setDoc(userRef, {
              email: user.email,
              name: user.displayName || '',
              photoURL: user.photoURL || '',
              role: UserRole.DONOR,
              isActive: true,
              createdAt: new Date(),
              lastLogin: new Date(),
            });
            setCurrentUserData({
              email: user.email,
              name: user.displayName || '',
              role: UserRole.DONOR,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setCurrentUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const login = async (email: string, password: string) => {
    try {
      // DEVELOPER OVERRIDE: Mock Admin Login for UI testing without Firebase keys
      if (email === "admin@test.com" && password === "123456") {
         console.log("Mock Admin Login Activated");
         setUser({ uid: 'mock-admin-999', email: 'admin@test.com', displayName: 'System Admin' } as any);
         setCurrentUserData({ name: 'System Admin', email: 'admin@test.com', role: UserRole.ADMIN, isActive: true });
         setLoading(false);
         return;
      }
      
      
      if (!auth || !db) {
        throw new Error('Authentication system is currently offline.');
      }
      
      const result = await signInWithEmailAndPassword(auth as Auth, email, password);
      
      // Fetch user data from Firestore to check activation status
      const userRef = doc(db as Firestore, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.isActive === false) {
          await signOut(auth as Auth); // Log out immediately if not active
          throw new Error('Your account is currently pending approval by an administrator.');
        }
        
        await updateDoc(userRef, {
          lastLogin: new Date(),
        });
        
        // Log Activity
        await logLoginActivity(result.user.uid, email);
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to login');
    }
  };


  const register = async (email: string, password: string, name: string, role: UserRole = UserRole.DONOR) => {
    if (!auth || !db) {
      throw new Error('Registration system is currently offline.');
    }
    try {
      const result = await createUserWithEmailAndPassword(auth as Auth, email, password);
      await updateProfile(result.user, {
        displayName: name,
      });
      
      // Donors are auto-approved, others require admin review
      const autoApprove = role === UserRole.DONOR;
      
      // Create user document in Firestore
      await setDoc(doc(db as Firestore, 'users', result.user.uid), {
        email,
        name,
        role: role,
        isActive: autoApprove,
        status: autoApprove ? 'approved' : 'pending',
        createdAt: new Date(),
        lastLogin: new Date(),
        preferences: {
          language: 'en',
          newsletter: false,
        },
      });

      // Send email verification
      await sendEmailVerification(result.user);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to register');
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth as Auth);
      setCurrentUserData(null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to logout');
    }
  };

  const resetPassword = async (email: string) => {
    if (!auth) throw new Error('Auth system offline');
    try {
      await sendPasswordResetEmail(auth as Auth, email);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send password reset email');
    }
  };

  const updateUserRole = async (userId: string, role: UserRole) => {
    if (!db) return;
    try {
      const userRef = doc(db as Firestore, 'users', userId);
      await updateDoc(userRef, { role });
      if (currentUserData) {
        setCurrentUserData({ ...currentUserData, role });
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update user role');
    }
  };

  const isAdmin = currentUserData?.role === UserRole.ADMIN;
  const isContentManager = currentUserData?.role === UserRole.CONTENT_MANAGER;
  const isVolunteer = currentUserData?.role === UserRole.VOLUNTEER;

  const value: AuthContextType = {
    user,
    loading,
    currentUserData,
    login,
    register,
    logout,
    resetPassword,
    updateUserRole,
    isAdmin,
    isContentManager,
    isVolunteer,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
