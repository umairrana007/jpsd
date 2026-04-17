'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FiLoader } from 'react-icons/fi';

/**
 * Traffic Controller Page
 * Redirects users to their specific portal boards based on their roles.
 */
export default function DashboardTrafficController() {
  const { user, currentUserData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (currentUserData) {
      const role = currentUserData.role?.toLowerCase();
      
      switch (role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'volunteer':
          router.push('/volunteer/dashboard');
          break;
        case 'professional':
        case 'expert':
          router.push('/dashboard/professional');
          break;
        case 'donor':
        default:
          router.push('/donor/dashboard');
          break;
      }
    }
  }, [user, currentUserData, loading, router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-[#1ea05f]/20 border-t-[#1ea05f] rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-[#1ea05f]/10 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">Synchronizing Identity</h2>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Establishing secure portal uplink...</p>
      </div>
    </div>
  );
}
