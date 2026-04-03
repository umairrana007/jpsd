'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiClock, FiCheckCircle, FiCalendar, FiMapPin, 
  FiHeart, FiAward, FiStar, FiChevronRight, FiGrid, FiActivity, FiMessageSquare, FiPhone, FiX
} from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function VolunteerPortalClean() {
  const { language } = useLanguage();
  const { currentUserData } = useAuth();
  const isUrdu = language === 'ur';

  const stats = [
    { label: isUrdu ? 'خدمت کے گھنٹے' : 'Hours', val: '124', color: 'text-blue-600', bg: 'bg-blue-50', icon: <FiClock /> },
    { label: isUrdu ? 'مکمل مشنز' : 'Missions', val: '12', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <FiCheckCircle /> },
    { label: isUrdu ? 'امتیازی نشان' : 'Badges', val: '08', color: 'text-amber-600', bg: 'bg-amber-50', icon: <FiStar /> },
    { label: isUrdu ? 'رینک' : 'Rank', val: 'Elite', color: 'text-purple-600', bg: 'bg-purple-50', icon: <FiAward /> }
  ];

  const [showSupport, setShowSupport] = React.useState(false);

  return (
    <div className="min-h-screen space-y-12 pb-20 bg-white">
      {/* 🚀 Support Modal Overlay */}
      <AnimatePresence>
         {showSupport && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="bg-white max-w-md w-full rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
               >
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#1ea05f]"></div>
                  
                  <div className="flex justify-between items-start mb-8">
                     <div>
                        <h4 className="text-2xl font-bold text-slate-800">{isUrdu ? 'کوارڈینیٹر سے رابطہ' : 'Contact Coordinator'}</h4>
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Sector Z-45 • Live Assistance</p>
                     </div>
                     <button onClick={() => setShowSupport(false)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 Transition-all">✕</button>
                  </div>

                  <div className="space-y-6">
                     <div className="p-6 bg-slate-50 rounded-2xl flex items-center gap-6 border border-slate-100">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-white shadow-sm flex items-center justify-center text-[#1ea05f] text-2xl font-bold">
                           AS
                        </div>
                        <div>
                           <p className="font-bold text-slate-900">Ahmed Siddiqui</p>
                           <p className="text-xs text-[#1ea05f] font-bold uppercase tracking-widest">Active Now • Head of Sector</p>
                        </div>
                     </div>
                     
                     <div className="space-y-3">
                        <a 
                           href="https://wa.me/9221111298111" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all no-underline"
                        >
                           <FiMessageSquare /> {isUrdu ? 'براہ راست چیٹ کریں' : 'Start Live Chat'}
                        </a>
                        <a 
                           href="tel:+9221111298111" 
                           className="w-full py-4 border border-slate-200 text-slate-600 font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all no-underline"
                        >
                           <FiPhone /> {isUrdu ? 'کال کریں' : 'Voice Call'}
                        </a>
                     </div>
                  </div>
                  
                  <p className="mt-8 text-center text-[10px] text-slate-400 font-medium italic">Your coordinates and status will be shared with the coordinator.</p>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {/* 🚀 Header */}
      <header className="px-4">
         <div className="bg-slate-50 p-12 rounded-3xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1ea05f]/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="space-y-3 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-[#1ea05f] border border-emerald-100 rounded-full text-[10px] font-bold uppercase tracking-widest">
                     <FiHeart /> {isUrdu ? 'انسانیت کی خدمت' : 'Servant of Humanity'}
                  </div>
                  <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                     {isUrdu ? 'رضاکارانہ پورٹل' : 'Volunteer Portal'}
                  </h1>
                  <p className="text-slate-500 font-medium max-w-lg leading-relaxed">
                     {isUrdu ? 'آپ کی خدمات اور انسانی ہمدردی کا مکمل ریکارڈ یہاں موجود ہے۔' : 'Manage your field deployments and humanitarian impact here.'}
                  </p>
               </div>
               <div className="flex gap-4">
                  <button className="px-8 py-3.5 bg-[#1ea05f] text-white font-bold rounded-xl shadow-lg shadow-emerald-50 text-sm hover:opacity-90 transition-all">
                     {isUrdu ? 'نئے مشنز تلاش کریں' : 'New Missions'}
                  </button>
               </div>
            </div>
         </div>
      </header>

      {/* 📊 Personal Analytics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4">
         {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all">
               <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-xl mb-4`}>
                  {stat.icon}
               </div>
               <p className="text-3xl font-bold text-slate-800 mb-1">{stat.val}</p>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 px-4">
         {/* 📅 Active Operational List */}
         <div className="xl:col-span-2 space-y-8">
            <h3 className="text-xl font-bold text-slate-800">{isUrdu ? 'زیرِ تکمیل کام' : 'Active Assignments'}</h3>
            <div className="space-y-6">
               {[1, 2].map((op, i) => (
                  <div key={i} className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center hover:border-[#1ea05f]/30 transition-all border-l-8 border-l-[#1ea05f]">
                     <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-[#1ea05f] shrink-0">
                        <FiMapPin size={32} />
                     </div>
                     <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                           <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">Hydration Relief</span>
                           <span className="text-[10px] font-bold text-slate-300 uppercase">Sector Z-45</span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800">Tharparkar Water Matrix Deployment</h4>
                        <p className="text-sm text-slate-500 font-medium">Support the logistics team in distributing 500+ Ration Kits across remote Sindh regions.</p>
                     </div>
                     <button className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-[#1ea05f] hover:text-white transition-all shadow-inner">
                        <FiChevronRight size={24} />
                     </button>
                  </div>
               ))}
            </div>
         </div>

         {/* 🎖️ Merit & Identity */}
         <div className="space-y-10">
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm space-y-8">
               <h4 className="text-lg font-bold text-slate-800">{isUrdu ? 'اعزازی لیبل' : 'Merit Marks'}</h4>
               <div className="grid grid-cols-2 gap-4">
                  {[
                     { n: 'Medic', i: '🩺', c: 'bg-red-50' },
                     { n: 'Ration', i: '📦', c: 'bg-orange-50' },
                     { n: 'Flood', i: '🌊', c: 'bg-blue-50' },
                     { n: 'Rapid', i: '⚡', c: 'bg-emerald-50' }
                  ].map((badge, i) => (
                     <div key={i} className={`${badge.c} p-5 rounded-2xl flex flex-col items-center gap-2 border border-black/5`}>
                        <span className="text-2xl">{badge.i}</span>
                        <span className="text-[9px] font-bold text-slate-800 uppercase tracking-widest">{badge.n}</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-3xl text-white space-y-6 shadow-2xl shadow-emerald-950/20">
               <h4 className="text-xl font-bold">{isUrdu ? 'فیلڈ رابطہ' : 'Field HQ'}</h4>
               <p className="text-sm text-white/50 leading-relaxed italic">
                  {isUrdu ? 'اپنے سیکٹر کوارڈینیٹر سے براہ راست مدد حاصل کریں۔' : 'Need real-time support from your sector coordinator?'}
               </p>
               <button 
                  onClick={() => setShowSupport(true)}
                  className="w-full py-4 bg-[#1ea05f] text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-emerald-900/50 hover:bg-white hover:text-[#1ea05f] transition-all"
               >
                  {isUrdu ? 'کوارڈینیٹر سے رابطہ کریں' : 'Open Support Comms'}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
