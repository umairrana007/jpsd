// Protected Route Component for Admin Routes
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const router = useRouter();
  const { user, loading, currentUserData } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/login?redirect=' + window.location.pathname);
        return;
      }

      // Check role-based access if allowedRoles is specified
      if (allowedRoles && allowedRoles.length > 0) {
        const userRole = currentUserData?.role as UserRole;
        if (!allowedRoles.includes(userRole)) {
          // Redirect to unauthorized page if user doesn't have required role
          router.push('/unauthorized');
          return;
        }
      }
    }
  }, [user, loading, currentUserData, router, allowedRoles]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9fb]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1ea05f] border-t-transparent rounded-full animate-spin shadow-xl shadow-[#1ea05f]/20 mx-auto mb-6"></div>
          <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] animate-pulse">Synchronizing Security Protocol...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated or doesn't have required role
  const userRole = currentUserData?.role as UserRole;
  if (!user || (allowedRoles && !allowedRoles.includes(userRole))) {
    return null;
  }

  return <>{children}</>;
};

// Higher Order Component for protecting pages
export function withProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: UserRole[]
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
}
