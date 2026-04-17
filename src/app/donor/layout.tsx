'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FiHome, FiClock, FiHeart, FiCreditCard, 
  FiFileText, FiUser, FiSettings, FiLogOut,
  FiBell, FiMenu, FiX, FiPlus, FiGlobe, FiAlertCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { UserRole } from '@/types';

export default function DonorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/login');
    } catch {
      router.push('/login');
    }
  };

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
      
      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
               initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
               className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-sm w-full text-center space-y-6"
            >
               <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto">
                  <FiAlertCircle size={32} />
               </div>
               <div>
                  <h4 className="text-xl font-black text-slate-900 italic uppercase">Terminate Session?</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 px-4">Are you sure you want to exit the donor portal?</p>
               </div>
               <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-4 bg-slate-50 text-slate-400 font-bold text-[10px] uppercase rounded-2xl hover:bg-slate-100 transition-all">Cancel</button>
                  <button onClick={handleSignOut} className="flex-1 py-4 bg-red-500 text-white font-bold text-[10px] uppercase rounded-2xl shadow-lg shadow-red-100 hover:bg-red-600 transition-all">Yes, Sign Out</button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col flex-shrink-0 w-64 border-r border-slate-200/50 bg-white/80 backdrop-blur-xl h-screen px-4 py-8 sticky top-0 overflow-y-auto">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="relative w-28 h-14 mb-4">
            <Image src="/logo.png" alt="JPSD Logo" fill sizes="112px" className="object-contain" priority />
          </div>
          <div className="w-full">
            <h1 className="text-base font-black text-[#1ea05f] uppercase tracking-tight italic">Donor Portal</h1>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">JPSD Global</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                pathname === item.href 
                  ? 'bg-[#1ea05f] text-white shadow-xl shadow-[#1ea05f]/20 font-black italic' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 font-bold uppercase text-[11px] tracking-tight'
              }`}
            >
              <item.icon size={18} className="flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-2 pt-8 border-t border-slate-50">
          <Link href="/donor/settings" className="flex items-center gap-4 px-5 py-4 text-slate-400 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all font-bold uppercase text-[11px] tracking-tight">
            <FiSettings size={18} className="flex-shrink-0" />
            <span>Preferences</span>
          </Link>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-4 px-5 py-4 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold uppercase text-[11px] tracking-tight cursor-pointer"
          >
            <FiLogOut size={18} className="flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-100 px-8 py-6 flex items-center justify-between">
           <div className="flex items-center gap-4 lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-500"><FiMenu size={24} /></button>
              <h1 className="text-lg font-black text-slate-800 italic uppercase">Donor Hub</h1>
           </div>

           <div className="hidden lg:flex items-center gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full italic border border-slate-100">Status: Verified Member</span>
           </div>

           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-8 mr-6 border-r border-slate-100 pr-8">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Impact Score</p>
                    <p className="text-base font-black text-[#1ea05f] italic tracking-tight">Level 12 • Heroism</p>
                 </div>
              </div>
              
              <button className="relative p-2 text-slate-400 hover:text-[#1ea05f] transition-colors">
                 <FiBell size={24} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-slate-900 leading-none">Muhammad Umair</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Platinum Donor</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-[#1ea05f] flex items-center justify-center text-white font-black shadow-lg shadow-green-100 text-lg">U</div>
              </div>
           </div>
        </header>

        <main className="flex-1 p-8 md:p-12">
          {children}
        </main>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[100] lg:hidden" />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 w-80 bg-white z-[101] p-10 lg:hidden flex flex-col" >
              <div className="flex justify-between items-center mb-12">
                 <h1 className="text-xl font-black text-[#1ea05f] italic uppercase">Donor Core</h1>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400"><FiX size={24} /></button>
              </div>
              <nav className="flex-1 space-y-4">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${pathname === item.href ? 'bg-[#1ea05f] text-white shadow-xl' : 'text-slate-400'}`} >
                    <item.icon size={22} />
                    <span className="font-bold">{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-slate-100">
                <button onClick={() => { setIsMobileMenuOpen(false); setShowLogoutConfirm(true); }} className="w-full flex items-center gap-4 px-6 py-5 text-red-500 font-bold" >
                  <FiLogOut size={22} />
                  <span>Sign Out</span>
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
