'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiDollarSign, FiUsers, FiUser, 
  FiBarChart2, FiSettings, FiMenu, FiLayout, 
  FiImage, FiFileText, FiPieChart, FiBriefcase, 
  FiTarget, FiZap, FiMail, FiActivity, FiGlobe, FiLayers 
} from 'react-icons/fi';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const GlobalSearch = dynamic(() => import('@/components/admin/GlobalSearch'), {
  loading: () => <div className="h-12 w-full bg-slate-100 animate-pulse rounded-2xl mb-4" />,
  ssr: false
});

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

import { useLanguage } from '@/contexts/LanguageContext';

interface AdminStats {
  todayDonations: number;
  totalDonations: number;
  totalDonors: number;
  activeVolunteers: number;
  upcomingMissions: number;
  systemHealth: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, t } = useLanguage();
  const isUrdu = language === 'ur';

  const isWebsiteManagement = pathname?.startsWith('/admin/pages') || 
                               pathname?.startsWith('/admin/navigation') || 
                               pathname?.startsWith('/admin/media') || 
                               pathname?.startsWith('/admin/theme');
  
  const portalName = isWebsiteManagement ? "Website Management" : "Administration Portal";

  const { currentUserData } = useAuth();

  const mainNavItems = [
    { href: '/admin', label: 'Dashboard', icon: FiHome },
    { href: '/admin/donations', label: 'Donations', icon: FiDollarSign, collection: 'donations' },
    { href: '/admin/treasury', label: 'Treasury', icon: FiPieChart, role: [UserRole.ADMIN] },
    { href: '/admin/volunteers', label: 'Volunteers', icon: FiUsers, collection: 'volunteers' },
    { href: '/admin/missions', label: 'Mission Planning', icon: FiTarget, collection: 'events' },
    { href: '/admin/users', label: 'Users', icon: FiUser, role: [UserRole.ADMIN] },
    { href: '/admin/causes', label: 'Causes', icon: FiHome, collection: 'causes' },
    { href: '/admin/categories', label: 'Asset Classes', icon: FiLayers, role: [UserRole.ADMIN, UserRole.CONTENT_MANAGER] },
    { href: '/admin/events', label: 'Events', icon: FiUser, collection: 'events' },
    { href: '/admin/reports', label: 'Reports', icon: FiBarChart2, role: [UserRole.ADMIN] },
    { href: '/admin/analytics', label: 'Analytics', icon: FiActivity, role: [UserRole.ADMIN] },
    { href: '/admin/webhooks', label: 'Webhooks', icon: FiZap, role: [UserRole.ADMIN] },
  ];

  const managementNavItems = [
    { href: '/admin/pages', label: 'Page Manager', icon: FiFileText, collection: 'pages' },
    { href: '/admin/testimonials', label: 'Testimonials', icon: FiUsers, collection: 'testimonials' },
    { href: '/admin/partners', label: 'Partners', icon: FiBriefcase, collection: 'partners' },
    { href: '/admin/navigation', label: 'Menu Manager', icon: FiMenu, role: [UserRole.ADMIN] },
    { href: '/admin/theme', label: 'Theme & Colors', icon: FiLayout, role: [UserRole.ADMIN] },
    { href: '/admin/layout-manager', label: 'Layout Manager', icon: FiLayout, role: [UserRole.ADMIN] },
    { href: '/admin/media', label: 'Media Vault', icon: FiImage, collection: 'media' },
    { href: '/admin/email-templates', label: 'Email Templates', icon: FiMail, role: [UserRole.ADMIN] },
    { href: '/admin/settings', label: 'Foundation Identity', icon: FiSettings, role: [UserRole.ADMIN] },
  ];

  const hasAccess = (item: any) => {
    if (currentUserData?.role === UserRole.ADMIN) return true;
    if (item.role && !item.role.includes(currentUserData?.role)) return false;
    if (item.collection && !currentUserData?.allowedCollections?.includes(item.collection)) return false;
    return true;
  };

  const visibleMainItems = mainNavItems.filter(hasAccess);
  const visibleManagementItems = managementNavItems.filter(hasAccess);

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.VOLUNTEER]}>
      <div className={`flex min-h-screen bg-[#f9f9fb] font-sans text-slate-800 ${isUrdu ? 'flex-row-reverse' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
        {/* SideNavBar */}
        <aside className={`hidden md:flex flex-col w-64 border-slate-200/50 bg-slate-50/80 backdrop-blur-xl h-screen p-4 sticky top-0 overflow-y-auto ${isUrdu ? 'border-l' : 'border-r'}`}>
          <div className="mb-8 px-4 pt-6 flex flex-col items-center text-center">
            <div className="relative w-56 h-20 mb-6 transition-transform hover:scale-105 active:scale-95">
              <Image 
                src="/logo.png" 
                alt="JPSD Logo" 
                fill
                sizes="240px"
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#1ea05f] leading-tight text-center">{portalName}</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 text-center">JPSD Global</p>
            </div>
          </div>

          <GlobalSearch />
          <nav className="flex-1 space-y-2">
            {visibleMainItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href)) 
                  ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'
                }`}
              >
                <item.icon className="text-lg" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}

            {visibleManagementItems.length > 0 && (
              <>
                <div className="pt-4 pb-2 px-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Website Management</p>
                </div>
                {visibleManagementItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      pathname?.startsWith(item.href) 
                      ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' 
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'
                    }`}
                  >
                    <item.icon className="text-lg" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>
          <div className="mt-auto pt-6 border-t border-slate-200/50 px-4 flex items-center gap-3 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#1ea05f]/20 flex items-center justify-center overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-[#1ea05f] text-white flex items-center justify-center font-bold">
                {currentUserData?.name?.charAt(0) || 'M'}
              </div>
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-bold text-slate-800 truncate">{currentUserData?.name || 'Management'}</p>
              <p className="text-xs text-slate-400 truncate">{currentUserData?.role?.replace('_', ' ') || 'Super Admin'}</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto pt-28 md:pt-32">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>

        {/* Mobile Bottom NavBar */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 backdrop-blur-lg border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-3xl z-50">
          {visibleMainItems.slice(0, 5).map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl ${
                pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href)) 
                ? 'bg-[#1ea05f]/10 text-[#1ea05f]' 
                : 'text-slate-400'
              }`}
            >
              <item.icon className="text-xl" />
              <span className="text-[10px] font-medium mt-1">{item.label.split(' ')[0]}</span>
            </Link>
          ))}
        </nav>
      </div>
    </ProtectedRoute>
  );
}
