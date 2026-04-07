'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiClock, FiHeart, FiCreditCard, 
  FiFileText, FiUser, FiSettings, FiLogOut,
  FiBell, FiMenu, FiX, FiPlus, FiGlobe
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { UserRole } from '@/types';

export default function DonorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', icon: FiHome, href: '/donor/dashboard' },
    { label: 'Giving History', icon: FiClock, href: '/donor/history' },
    { label: 'Recurring Hub', icon: FiHeart, href: '/donor/recurring' },
    { label: 'Payment Methods', icon: FiCreditCard, href: '/donor/payments' },
    { label: 'Tax Certificates', icon: FiFileText, href: '/donor/certificates' },
    { label: 'Genesis Profile', icon: FiUser, href: '/donor/profile' },
  ];

  return (
    <ProtectedRoute allowedRoles={[UserRole.DONOR, UserRole.ADMIN]}>
      <div className="flex min-h-screen bg-[#f9f9fb] font-sans text-slate-800" dir="ltr">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-slate-200/50 bg-white/80 backdrop-blur-xl h-screen p-6 sticky top-0 overflow-y-auto">
        <div className="mb-10 px-2 pt-4 flex flex-col items-center text-center">
          <div className="relative w-64 h-24 mb-6 transition-transform hover:scale-105 active:scale-95">
            <Image 
              src="/logo.png" 
              alt="JPSD Logo" 
              fill
              sizes="280px"
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#1ea05f] uppercase tracking-tighter italic">
               Donor Portal
            </h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">JPSD Global</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${pathname === item.href ? 'bg-[#1ea05f] text-white shadow-xl shadow-[#1ea05f]/20 font-bold' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-800 font-bold'}`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <Link href="/donor/settings" className="flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-slate-800 transition-all font-bold">
            <FiSettings size={20} />
            <span className="text-sm">Preferences</span>
          </Link>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all font-bold">
            <FiLogOut size={20} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/50 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
           <div className="flex items-center gap-4 lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-500"><FiMenu size={24} /></button>
              <h1 className="text-lg font-black text-slate-800 italic uppercase tracking-tighter">Donor Hub</h1>
           </div>

           <div className="hidden lg:flex items-center gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full italic">Status: Verified Member</span>
           </div>

           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 mr-6 border-r border-slate-200 pr-6">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Impact Score</p>
                    <p className="text-sm font-black text-[#1ea05f] italic tracking-tight">Level 12 • Heroism</p>
                 </div>
              </div>
              
              <button className="relative p-2 text-slate-400 hover:text-[#1ea05f] transition-colors group">
                 <FiBell size={22} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-slate-800 truncate max-w-[120px]">Muhammad Umair</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Platinum Donor</p>
                 </div>
                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1ea05f] to-green-600 flex items-center justify-center text-white font-black shadow-lg">U</div>
              </div>
           </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 md:p-10 lg:p-12">
          {children}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[101] p-8 lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                 <h1 className="text-xl font-black text-[#1ea05f] italic uppercase">Donor Core</h1>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400"><FiX size={24} /></button>
              </div>
              <nav className="flex-1 space-y-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${pathname === item.href ? 'bg-[#1ea05f] text-white shadow-xl' : 'text-slate-400'}`}
                  >
                    <item.icon size={22} />
                    <span className="font-bold">{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-4 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 p-4 rounded-xl">
                   <FiGlobe className="text-[#1ea05f]" /> English / اردو (Localized)
                </div>
                <button className="w-full flex items-center gap-4 px-6 py-4 text-red-500 font-bold transition-all">
                  <FiLogOut size={22} />
                  <span>Terminate Session</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}
