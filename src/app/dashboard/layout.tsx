'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiHeart, FiActivity, FiSettings, FiLogOut, 
  FiMenu, FiX, FiPieChart, FiUser, FiZap, FiShield 
} from 'react-icons/fi';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();
  const { currentUserData, logout } = useAuth();
  const isUrdu = language === 'ur';
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { label: isUrdu ? 'اوور ویو' : 'Overview', icon: <FiPieChart />, href: '/dashboard' },
    { label: isUrdu ? 'تاریخی عطیات' : 'Mission History', icon: <FiHeart />, href: '/dashboard/donations' },
    { label: isUrdu ? 'محفوظ کردہ مہمات' : 'Mission Archives', icon: <FiActivity />, href: '/dashboard/causes' },
    { label: isUrdu ? 'رضاکارانہ پورٹل' : 'Volunteer Force', icon: <FiUser />, href: '/dashboard/volunteer' },
    { label: isUrdu ? 'سیٹنگز' : 'Settings', icon: <FiSettings />, href: '/dashboard/settings' },
  ];

  if (currentUserData?.role === 'admin') {
    menuItems.push({ label: isUrdu ? 'ایڈمن پینل' : 'Admin Panel', icon: <FiShield />, href: '/dashboard/admin' });
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row font-inter selection:bg-[#1ea05f]/20" dir={isUrdu ? 'rtl' : 'ltr'}>
      
      {/* Sidebar - Desktop (Natural Flow + Sticky) */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-x border-slate-100 h-screen sticky top-0 z-50 shrink-0 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Brand Identity */}
          <div className="p-10 flex flex-col items-center">
            <Link href="/" className="flex flex-col gap-6 group items-center text-center">
               <div className="relative w-64 h-24 transition-transform hover:scale-105 active:scale-95">
                  <Image 
                    src="/logo.png" 
                    alt="JPSD Logo" 
                    fill 
                    className="object-contain" 
                    priority
                  />
               </div>
               <div className="flex flex-col items-center border-t-2 border-[#1ea05f] pt-4 px-4 w-full">
                  <span className="text-xl font-black text-slate-900 tracking-tightest uppercase italic leading-none">{isUrdu ? 'صارف پورٹل' : 'User Portal'}</span>
                  <span className={`text-[8px] font-black text-slate-400 tracking-[0.2em] uppercase mt-1 ${isUrdu ? 'tracking-normal' : ''}`}>{isUrdu ? 'جے پی ایس ڈی عالمی' : 'JPSD Global'}</span>
               </div>
            </Link>
          </div>

          {/* Navigation Core */}
          <nav className="flex-1 px-6 space-y-3">
             <p className="px-4 text-[9px] font-black text-slate-300 uppercase tracking-widest mb-6 italic opacity-50 text-left">
                {isUrdu ? 'بنیادی ہدایات' : 'Main Directives'}
             </p>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-5 px-6 py-4.5 rounded-[1.5rem] font-black transition-all group relative overflow-hidden ${
                  pathname === item.href 
                    ? 'bg-slate-950 text-white shadow-2xl shadow-slate-950/20' 
                    : 'text-slate-400 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {pathname === item.href && (
                  <motion.div layoutId="activeNav" className="absolute inset-0 bg-slate-950 -z-10" />
                )}
                <span className={`text-xl ${pathname === item.href ? 'text-[#1ea05f]' : 'group-hover:text-[#1ea05f]'} transition-colors shrink-0`}>{item.icon}</span>
                <span className={`text-[11px] uppercase tracking-[0.15em] italic flex-1 text-left ${isUrdu ? 'urdu-text' : ''}`}>{item.label}</span>
                {pathname === item.href && (
                   <div className="w-1.5 h-1.5 rounded-full bg-[#1ea05f] shadow-[0_0_8px_#1ea05f] shrink-0"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* User Meta & Action */}
          <div className="p-8 mt-auto space-y-4">
             <div className="p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-[#1ea05f]/20 transition-all text-left">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#1ea05f] flex items-center justify-center text-sm font-black shadow-sm group-hover:rotate-12 transition-transform shrink-0">
                      {currentUserData?.name?.slice(0, 2).toUpperCase() || 'MU'}
                   </div>
                   <div className="overflow-hidden flex-1">
                      <p className="text-xs font-black text-slate-900 truncate uppercase tracking-tighter italic text-left">{currentUserData?.name || 'Anonymous Donor'}</p>
                      <p className={`text-[8px] text-[#1ea05f] font-black uppercase tracking-[0.2em] mt-1 italic text-left ${isUrdu ? 'tracking-normal' : ''}`}>{currentUserData?.role || 'Philanthropist'}</p>
                   </div>
                </div>
             </div>
             <button 
               onClick={logout}
               className="flex items-center justify-center gap-3 w-full px-6 py-5 text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
             >
                <FiLogOut strokeWidth={3} className="shrink-0" />
                <span>{isUrdu ? 'سائن آؤٹ' : 'Terminate Session'}</span>
             </button>
          </div>
        </div>
      </aside>

      {/* Mobile Interface - Fixed Top */}
      <div className="lg:hidden fixed top-0 w-full z-[60] bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 h-20">
          <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 bg-slate-900 text-[#1ea05f] rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
             <FiMenu size={20} strokeWidth={3} />
          </button>
          <div className="text-sm font-black text-slate-900 uppercase tracking-widest italic">{isUrdu ? 'ڈیش بورڈ' : 'Core Dashboard'}</div>
          <div className="w-10"></div>
      </div>

      <AnimatePresence>
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[70] flex">
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
             onClick={() => setSidebarOpen(false)}
           />
           <motion.div 
             initial={{ x: isUrdu ? 320 : -320 }}
             animate={{ x: 0 }}
             exit={{ x: isUrdu ? 320 : -320 }}
             transition={{ type: "spring", damping: 25, stiffness: 200 }}
             className={`relative w-80 bg-white h-full shadow-2xl flex flex-col p-10 ${isUrdu ? 'rtl' : 'ltr'}`}
           >
              <div className="flex justify-between items-center mb-12">
                 <div className="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Baitussalam</div>
                 <button onClick={() => setSidebarOpen(false)} className="text-slate-400 p-2"><FiX size={24} /></button>
              </div>
              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-5 px-6 py-4.5 rounded-[1.5rem] font-black ${
                      pathname === item.href ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400'
                    }`}
                  >
                    <span className={pathname === item.href ? 'text-[#1ea05f]' : ''}>{item.icon}</span>
                    <span className="text-[10px] uppercase tracking-widest italic">{item.label}</span>
                  </Link>
                ))}
              </nav>
           </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* Primary Canvas */}
      <main className="flex-1 min-h-screen pt-28 lg:pt-0 overflow-x-hidden">
         <div className="max-w-7xl mx-auto p-6 md:p-16 overflow-visible">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={pathname}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              {children}
            </motion.div>
         </div>
      </main>

      <style jsx global>{`
         @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,900;1,900&display=swap');
         .tracking-tightest { letter-spacing: -0.05em; }
      `}</style>

    </div>
  );
}

