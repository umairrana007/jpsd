'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiCalendar, FiClock, FiAward, 
  FiMessageSquare, FiBookOpen, FiUser, FiSettings,
  FiLogOut, FiMenu, FiX, FiBell, FiActivity,
  FiZap, FiShield
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import BilingualChatbot from '@/components/BilingualChatbot';

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Tactical Hub', icon: FiHome, href: '/volunteer/dashboard' },
    { label: 'Browse Events', icon: FiCalendar, href: '/volunteer/events' },
    { label: 'Operational History', icon: FiClock, href: '/volunteer/history' },
    { label: 'Achievements', icon: FiAward, href: '/volunteer/achievements' },
    { label: 'Training Center', icon: FiBookOpen, href: '/volunteer/training' },
    { label: 'HQ Comms', icon: FiMessageSquare, href: '/volunteer/messages' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f3f4f6] font-sans text-slate-800" dir="ltr">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-slate-200/50 bg-slate-900 h-screen p-6 sticky top-0 text-white overflow-y-auto shadow-2xl shadow-black/20">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/40 rounded-full blur-3xl -mr-16 -mt-16" />
        </div>

        <div className="mb-12 px-2 pt-4 relative z-10 flex flex-col items-center text-center">
          <div className="relative w-64 h-24 mb-6 brightness-0 invert opacity-95 transition-transform hover:scale-105 active:scale-95">
             <Image 
               src="/logo.png" 
               alt="Baitussalam Logo" 
               fill 
               className="object-contain" 
               priority
             />
          </div>
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-3 italic tracking-tighter uppercase leading-none text-center justify-center">
               Volunteer Hub
            </h1>
            <p className="text-[10px] text-[#1ea05f] font-black uppercase tracking-[0.2em] mt-1 pr-0 text-center">Tactical Response Unit</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 relative z-10">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${pathname === item.href ? 'bg-[#1ea05f] text-white shadow-xl shadow-[#1ea05f]/20 font-bold' : 'text-slate-500 hover:bg-white/5 hover:text-white font-bold'}`}
            >
              <item.icon size={20} />
              <span className="text-sm italic uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-2 relative z-10 pt-8 border-t border-white/5">
          <Link href="/volunteer/profile" className="flex items-center gap-4 px-5 py-4 text-slate-500 hover:text-white transition-all font-bold">
            <FiUser size={20} />
            <span className="text-sm italic uppercase tracking-widest">My Identity</span>
          </Link>
          <button className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-bold">
            <FiLogOut size={20} />
            <span className="text-sm italic uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-slate-200/50 px-6 py-4 flex items-center justify-between shadow-sm">
           <div className="flex items-center gap-4 lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-slate-500"><FiMenu size={24} /></button>
              <h1 className="text-lg font-black text-slate-800 italic uppercase tracking-tighter">Tactical Hub</h1>
           </div>

           <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-3 bg-slate-100/50 px-4 py-2 rounded-2xl border border-slate-200/50">
                 <FiZap size={18} className="text-[#1ea05f]" />
                 <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">Rank: Operational Specialist (L4)</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4 mr-6 border-r border-slate-200 pr-6">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hours Deployed</p>
                    <p className="text-sm font-black text-slate-800 italic">148.5 Total</p>
                 </div>
                 <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-[#1ea05f]">
                    <FiActivity size={20} />
                 </div>
              </div>
              
              <button className="relative p-2 text-slate-400 hover:text-slate-800 transition-colors group">
                 <FiBell size={22} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-[#1ea05f] rounded-full border-2 border-white animate-pulse"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-slate-800 truncate max-w-[120px]">Asad Ullah</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">ID: BGT-VOL-824</p>
                 </div>
                 <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black shadow-lg">A</div>
              </div>
           </div>
        </header>

        {/* Content Viewport */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          {children}
        </main>
        <BilingualChatbot />
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
              className="fixed top-0 left-0 bottom-0 w-80 bg-slate-900 z-[101] p-8 lg:hidden flex flex-col text-white"
            >
              <div className="flex justify-between items-center mb-12">
                 <h1 className="text-xl font-black text-white italic uppercase tracking-tighter">Volunteer Hub</h1>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-xl text-slate-400"><FiX size={24} /></button>
              </div>
              <nav className="flex-1 space-y-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${pathname === item.href ? 'bg-[#1ea05f] text-white shadow-xl shadow-[#1ea05f]/20' : 'text-slate-500'}`}
                  >
                    <item.icon size={22} />
                    <span className="font-bold italic uppercase tracking-widest">{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
                   <FiShield className="text-[#1ea05f]" />
                   <span className="text-[10px] font-black uppercase tracking-widest italic text-slate-400">Tactical Grade A+</span>
                </div>
                <button className="w-full flex items-center gap-4 px-6 py-4 text-red-500 font-bold transition-all italic uppercase tracking-widest hover:bg-white/5 rounded-2xl">
                  <FiLogOut size={22} />
                  <span>Terminate</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
