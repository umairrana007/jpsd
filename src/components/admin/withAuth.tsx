'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

interface WithAuthProps {
  allowedRoles?: UserRole[];
}

export function withAuth<T extends object>(
  Component: React.ComponentType<T>,
  { allowedRoles }: WithAuthProps = {}
) {
  return function ProtectedRoute(props: T) {
    const { user, currentUserData, loading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (loading) return;

      // If not logged in, redirect to login
      if (!user) {
        router.push('/login');
        return;
      }

      // If user is inactive, show error or redirect
      if (currentUserData && !currentUserData.isActive) {
        // Redirection should be to a friendly unauthorized page
        router.push('/unauthorized?reason=inactive');
        return;
      }

      // Role check
      if (allowedRoles && allowedRoles.length > 0) {
        if (!currentUserData?.role) return; // Wait for role data
        
        const hasPermission = allowedRoles.includes(currentUserData.role as UserRole) || isAdmin;
        
        if (!hasPermission) {
          router.push('/unauthorized');
        }
      }
    }, [user, currentUserData, loading, router, isAdmin]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#1ea05f] border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse text-sm uppercase tracking-widest">Verifying Tactics...</p>
          </div>
        </div>
      );
    }

    // Role check logic before rendering
    if (allowedRoles && allowedRoles.length > 0 && currentUserData) {
        const hasPermission = allowedRoles.includes(currentUserData.role as UserRole) || isAdmin;
        if (!hasPermission) return null;
    }

    if (!user) return null;

    return <Component {...props} />;
  };
}
