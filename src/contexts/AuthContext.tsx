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
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { UserRole, User as AppUser } from '@/types';
import { GlobalAlert } from '@/components/ui/GlobalAlert';
export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  currentUserData: AppUser | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (role?: UserRole) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole, extraData?: Partial<AppUser>) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserRole: (userId: string, role: UserRole) => Promise<void>;
  updateUserPermissions: (userId: string, permissions: string[]) => Promise<void>;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isContentManager: boolean;
  isVolunteer: boolean;
  permissions: string[];
  setGlobalAlert: (message: string, type?: AlertType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserData, setCurrentUserData] = useState<AppUser | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [globalAlert, setGlobalAlertState] = useState<{ message: string; type: AlertType; isOpen: boolean }>({
    message: '',
    type: 'info',
    isOpen: false,
  });

  const setGlobalAlert = (message: string, type: AlertType = 'info') => {
    setGlobalAlertState({ message, type, isOpen: true });
  };

  // Log Activity Helper
  const logLoginActivity = async (userId: string, email: string) => {
    if (!db) return;
    try {
      await addDoc(collection(db as Firestore, 'login_activity'), {
        userId,
        email,
        timestamp: serverTimestamp(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
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
        setGlobalAlert('Your session has expired for security reasons. Please re-authenticate.', 'error');
      }
    }, 60000);

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
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setCurrentUserData({ id: userSnap.id, ...userSnap.data() } as AppUser);
          } else {
            const newUser: AppUser = {
              id: user.uid,
              email: user.email || '',
              name: user.displayName || '',
              photoURL: user.photoURL || '',
              role: UserRole.DONOR,
              isActive: true,
              status: 'approved',
              createdAt: new Date(),
              lastLogin: new Date(),
              preferences: {
                language: 'en',
                newsletter: false,
                notifications: true,
              },
            };
            await setDoc(userRef, newUser);
            setCurrentUserData(newUser);
          }
        } catch (error: unknown) {
          const msg = error instanceof Error ? error.message : 'Authentication data synchronization failed';
          console.error(msg);
          setGlobalAlert(msg, 'error');
        }
      } else {
        setCurrentUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (!isFirebaseConfigured || !auth || !db) {
      throw new Error('Authentication system is currently offline. Please check your environment variables.');
    }

    try {
      const result = await signInWithEmailAndPassword(auth as Auth, email, password);
      const userRef = doc(db as Firestore, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      
      const SUPER_ADMIN_EMAILS = ['m.umairrana007@gmail.com', 'admin@jpsd.org'];
      const isSuperAdminEmail = SUPER_ADMIN_EMAILS.includes(email || '');

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.isActive === false && !isSuperAdminEmail) {
          await signOut(auth as Auth);
          throw new Error('Your account is currently pending approval by an administrator.');
        }
        await updateDoc(userRef, { lastLogin: new Date() });
        await logLoginActivity(result.user.uid, email);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to login';
      setGlobalAlert(msg, 'error');
      throw error;
    }
  };

  const loginWithGoogle = async (preferredRole: UserRole = UserRole.DONOR) => {
    if (!isFirebaseConfigured || !auth || !db) {
      throw new Error('Authentication system is currently offline. Please check your environment variables.');
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth as Auth, provider);
      const userRef = doc(db as Firestore, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      
      const SUPER_ADMIN_EMAILS = ['m.umairrana007@gmail.com', 'admin@jpsd.org'];
      const isSuperAdminEmail = SUPER_ADMIN_EMAILS.includes(result.user.email || '');

      if (!userSnap.exists()) {
        const role = isSuperAdminEmail ? UserRole.ADMIN : preferredRole;
        const autoApprove = role === UserRole.DONOR || isSuperAdminEmail;

        await setDoc(userRef, {
          email: result.user.email,
          name: result.user.displayName || '',
          photoURL: result.user.photoURL || '',
          role: role,
          isActive: autoApprove,
          status: autoApprove ? 'approved' : 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
          lastLogin: new Date(),
          permissions: isSuperAdminEmail ? ['*'] : [],
        });
        
        if (!autoApprove) {
          await signOut(auth as Auth);
          throw new Error('Selection committed. Identity verification pending Super Admin review.');
        }
      } else {
        const data = userSnap.data();
        if (data.isActive === false && !isSuperAdminEmail) {
          await signOut(auth as Auth);
          throw new Error('Your account is currently pending approval by an administrator.');
        }
        await updateDoc(userRef, { lastLogin: new Date() });
      }
      await logLoginActivity(result.user.uid, result.user.email || 'google-user');
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/popup-closed-by-user') return;
      const msg = error instanceof Error ? error.message : 'Failed to login with Google';
      setGlobalAlert(msg, 'error');
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole = UserRole.DONOR, extraData: Partial<AppUser> = {}) => {
    if (!auth || !db) {
      throw new Error('Registration system is currently offline.');
    }
    try {
      const result = await createUserWithEmailAndPassword(auth as Auth, email, password);
      await updateProfile(result.user, {
        displayName: name,
      });
      const autoApprove = role === UserRole.DONOR;
      await setDoc(doc(db as Firestore, 'users', result.user.uid), {
        email,
        name,
        role: role,
        isActive: autoApprove,
        status: autoApprove ? 'approved' : 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastLogin: new Date(),
        permissions: [],
        preferences: {
          language: 'en',
          newsletter: false,
        },
        ...extraData,
      });
      await sendEmailVerification(result.user);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to register';
      setGlobalAlert(msg, 'error');
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth as Auth);
      setCurrentUserData(null);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to logout';
      setGlobalAlert(msg, 'error');
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    if (!auth) throw new Error('Auth system offline');
    try {
      await sendPasswordResetEmail(auth as Auth, email);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Operation failed';
      throw new Error(msg);
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
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Operation failed';
      throw new Error(msg);
    }
  };

  const updateUserPermissions = async (userId: string, permissions: string[]) => {
    if (!db) return;
    try {
      const userRef = doc(db as Firestore, 'users', userId);
      await updateDoc(userRef, { 
        permissions,
        updatedAt: new Date()
      });
      if (currentUserData && userId === user?.uid) {
        setCurrentUserData({ ...currentUserData, permissions });
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Operation failed';
      throw new Error(msg);
    }
  };

  const SUPER_ADMIN_EMAILS = ['m.umairrana007@gmail.com', 'admin@jpsd.org'];
  const isSuperAdmin = user ? (SUPER_ADMIN_EMAILS.includes(user.email || '') || currentUserData?.role === UserRole.ADMIN) : false;
  const isAdmin = currentUserData?.role === UserRole.ADMIN || isSuperAdmin;
  const isContentManager = currentUserData?.role === UserRole.CONTENT_MANAGER;
  const isVolunteer = currentUserData?.role === UserRole.VOLUNTEER;
  const permissions = currentUserData?.permissions || [];

  const value: AuthContextType = {
    user,
    loading,
    currentUserData,
    login,
    loginWithGoogle,
    register,
    logout,
    resetPassword,
    updateUserRole,
    updateUserPermissions,
    isAdmin,
    isSuperAdmin,
    isContentManager,
    isVolunteer,
    permissions,
    setGlobalAlert,
  };

  return (
    <AuthContext.Provider value={value}>
      <GlobalAlert 
        message={globalAlert.isOpen ? globalAlert.message : null} 
        type={globalAlert.type} 
        onClose={() => setGlobalAlertState({ ...globalAlert, isOpen: false })} 
      />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
