'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiDollarSign, FiUsers, FiUser, FiBarChart2, FiSettings, FiMenu, FiLayout, FiImage, FiFileText, FiPieChart, FiBriefcase } from 'react-icons/fi';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const GlobalSearch = dynamic(() => import('@/components/admin/GlobalSearch'), {
  loading: () => <div className="h-12 w-full bg-slate-100 animate-pulse rounded-2xl mb-4" />,
  ssr: false
});

import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { UserRole } from '@/types';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWebsiteManagement = pathname?.startsWith('/admin/pages') || 
                               pathname?.startsWith('/admin/navigation') || 
                               pathname?.startsWith('/admin/media') || 
                               pathname?.startsWith('/admin/theme');
  
  const portalName = isWebsiteManagement ? "Website Management" : "Administration Portal";

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.VOLUNTEER]}>
      <div className="flex min-h-screen bg-[#f9f9fb] font-sans text-slate-800" dir="ltr">
        {/* SideNavBar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-200/50 bg-slate-50/80 backdrop-blur-xl h-screen p-4 sticky top-0 overflow-y-auto">
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
            <Link href="/admin" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname === '/admin' ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiHome className="text-lg" />
              <span className="text-sm">Dashboard</span>
            </Link>
            <Link href="/admin/donations" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/donations') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiDollarSign className="text-lg" />
              <span className="text-sm">Donations</span>
            </Link>
            <Link href="/admin/treasury" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/treasury') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiPieChart className="text-lg" />
              <span className="text-sm">Treasury</span>
            </Link>
            <Link href="/admin/volunteers" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/volunteers') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiUsers className="text-lg" />
              <span className="text-sm">Volunteers</span>
            </Link>
            <Link href="/admin/users" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/users') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiUser className="text-lg" />
              <span className="text-sm">Users</span>
            </Link>
            <Link href="/admin/causes" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/causes') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiHome className="text-lg" />
              <span className="text-sm">Causes</span>
            </Link>
            <Link href="/admin/events" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/events') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiUser className="text-lg" />
              <span className="text-sm">Events</span>
            </Link>
            <Link href="/admin/reports" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/reports') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiBarChart2 className="text-lg" />
              <span className="text-sm">Reports</span>
            </Link>

            <div className="pt-4 pb-2 px-4">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Website Management</p>
            </div>

            <Link href="/admin/pages" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/pages') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiFileText className="text-lg" />
              <span className="text-sm">Page Manager</span>
            </Link>

            <Link href="/admin/testimonials" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/testimonials') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiUsers className="text-lg" />
              <span className="text-sm">Testimonials</span>
            </Link>

            <Link href="/admin/partners" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/partners') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiBriefcase className="text-lg" />
              <span className="text-sm">Partners</span>
            </Link>

            <Link href="/admin/navigation" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/navigation') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiMenu className="text-lg" />
              <span className="text-sm">Menu Manager</span>
            </Link>

            <Link href="/admin/theme" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/theme') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiLayout className="text-lg" />
              <span className="text-sm">Theme & Colors</span>
            </Link>

            <Link href="/admin/layout-manager" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/layout-manager') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiLayout className="text-lg" />
              <span className="text-sm">Layout Manager</span>
            </Link>

            <Link href="/admin/media" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/media') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiImage className="text-lg" />
              <span className="text-sm">Media Vault</span>
            </Link>

            <Link href="/admin/settings" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${pathname?.startsWith('/admin/settings') ? 'bg-[#1ea05f]/10 text-[#1ea05f] font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700 font-medium'}`}>
              <FiSettings className="text-lg" />
              <span className="text-sm">Foundation Identity</span>
            </Link>
          </nav>
          <div className="mt-auto pt-6 border-t border-slate-200/50 px-4 flex items-center gap-3 pb-4">
            <div className="w-10 h-10 rounded-full bg-[#1ea05f]/20 flex items-center justify-center overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-[#1ea05f] text-white flex items-center justify-center font-bold">M</div>
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-bold text-slate-800 truncate">Management</p>
              <p className="text-xs text-slate-400 truncate">Super Admin</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto pt-28 md:pt-32">
          {children}
        </main>

        {/* Mobile Bottom NavBar */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 backdrop-blur-lg border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-3xl z-50">
          <Link href="/admin" className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl ${pathname === '/admin' ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 'text-slate-400'}`}>
            <FiHome className="text-xl" />
            <span className="text-[10px] font-medium mt-1">Home</span>
          </Link>
          <Link href="/admin/donations" className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl ${pathname?.startsWith('/admin/donations') ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 'text-slate-400'}`}>
            <FiDollarSign className="text-xl" />
            <span className="text-[10px] font-medium mt-1">Funds</span>
          </Link>
          <Link href="/admin/add" className="flex flex-col items-center justify-center">
            <div className="bg-[#1ea05f] p-3 rounded-full -mt-8 shadow-lg shadow-[#1ea05f]/40 border-4 border-white text-white">
              <FiDollarSign className="text-xl" />
            </div>
          </Link>
          <Link href="/admin/reports" className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl ${pathname?.startsWith('/admin/reports') ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 'text-slate-400'}`}>
            <FiBarChart2 className="text-xl" />
            <span className="text-[10px] font-medium mt-1">Stats</span>
          </Link>
          <Link href="/admin/settings" className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl ${pathname?.startsWith('/admin/settings') ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 'text-slate-400'}`}>
            <FiSettings className="text-xl" />
            <span className="text-[10px] font-medium mt-1">Menu</span>
          </Link>
        </nav>
      </div>
    </ProtectedRoute>
  );
}
