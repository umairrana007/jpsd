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
        router.push('/admin/login');
        return;
      }

      // Check role-based access if allowedRoles is specified
      if (allowedRoles && allowedRoles.length > 0) {
        const userRole = currentUserData?.role as UserRole;
        if (!allowedRoles.includes(userRole)) {
          // Redirect to dashboard if user doesn't have required role
          router.push('/admin/dashboard');
          return;
        }
      }
    }
  }, [user, loading, currentUserData, router, allowedRoles]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#27ae60] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated or doesn't have required role
  if (!user || (allowedRoles && !allowedRoles.includes(currentUserData?.role))) {
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
