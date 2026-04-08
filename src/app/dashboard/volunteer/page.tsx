'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiClock, FiCheckCircle, FiCalendar, FiMapPin, 
  FiHeart, FiAward, FiStar, FiChevronRight, FiGrid, 
  FiActivity, FiMessageSquare, FiPhone, FiX, FiDownload, FiZap, FiTarget
} from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { generateVolunteerCertificate } from '@/lib/pdfUtils';

// Fix #2 B: Lazy-Loaded Analytics Charts
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false, loading: () => <div className="h-48 bg-slate-50 animate-pulse rounded-[2rem]"/> });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });

const IMPACT_DATA = [
  { month: 'Jan', hours: 45 },
  { month: 'Feb', hours: 52 },
  { month: 'Mar', hours: 48 },
  { month: 'Apr', hours: 61 },
  { month: 'May', hours: 55 },
  { month: 'Jun', hours: 67 },
];

// FIX #4: Custom Alert for Dashboard
const DashboardAlert = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[200] p-6">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl">
      <div className="text-center space-y-4">
        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${type === 'error' ? 'bg-red-50 text-red-500' : 'bg-[#1ea05f]/10 text-[#1ea05f]'}`}>
          {type === 'error' ? <FiX size={32} /> : <FiCheckCircle size={32} />}
        </div>
        <p className="text-sm font-bold text-slate-800 uppercase tracking-widest leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest">Acknowledge</button>
      </div>
    </motion.div>
  </div>
);

export default function VolunteerPortalClean() {
  const { language } = useLanguage();
  const { currentUserData } = useAuth();
  const isUrdu = language === 'ur';
  const [showSupport, setShowSupport] = useState(false);
  const [alert, setAlert] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Mock User Data for Matching (Phase 7 Context)
  const volunteerSkills = currentUserData?.skills || ['medical', 'logistics', 'emergency'];

  const allMissions = [
    { id: '1', title: 'Tharparkar Water Matrix', desc: 'Deploy hydration assets to remote sectors.', requiredSkills: ['logistics', 'emergency'], region: 'sindh' },
    { id: '2', title: 'Trauma Care Response', desc: 'Immediate medical assistance for disaster zones.', requiredSkills: ['medical', 'emergency'], region: 'karachi' },
    { id: '3', title: 'Tech Infrastructure Setup', desc: 'Deploying low-cost compute in rural schools.', requiredSkills: ['tech', 'teaching'], region: 'northern' },
    { id: '4', title: 'Flood Relief Coordination', desc: 'High-level logistics for relief goods.', requiredSkills: ['logistics'], region: 'sindh' },
  ];

  // Fix #2 A: Intelligence Matching (Skill-Based Mission Filtering)
  const matchedMissions = useMemo(() => {
    if (!volunteerSkills || !allMissions) return allMissions || [];
    
    return [...(allMissions || [])].sort((a, b) => {
      const aMatch = a.requiredSkills?.filter(skill => volunteerSkills.includes(skill)).length || 0;
      const bMatch = b.requiredSkills?.filter(skill => volunteerSkills.includes(skill)).length || 0;
      return bMatch - aMatch; // Higher match score first
    });
  }, [volunteerSkills]);

  const handleDownloadCert = () => {
    try {
      const blob = generateVolunteerCertificate({
        name: currentUserData?.name || 'Authorized Volunteer',
        volunteerId: currentUserData?.uid || 'VOL-456-X',
        skills: volunteerSkills,
        region: currentUserData?.region || 'karachi',
        joinedAt: new Date().toISOString(),
        hours: 124
      });
      const url = URL.createObjectURL(blob as Blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `JPSD_Merit_Accreditation.pdf`;
      a.click();
      setAlert({ message: 'Commencing Certificate Download. Protocol Complete.', type: 'success' });
    } catch (e) {
      setAlert({ message: 'PDF Generation Failed. System Error.', type: 'error' });
    }
  };

  const stats = [
    { label: isUrdu ? 'خدمت کے گھنٹے' : 'Hours', val: '124', color: 'text-blue-600', bg: 'bg-blue-50', icon: <FiClock /> },
    { label: isUrdu ? 'مکمل مشنز' : 'Missions', val: matchedMissions.length.toString(), color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <FiCheckCircle /> },
    { label: isUrdu ? 'امتیازی نشان' : 'Badges', val: '08', color: 'text-amber-600', bg: 'bg-amber-50', icon: <FiStar /> },
    { label: isUrdu ? 'رینک' : 'Rank', val: 'Elite', color: 'text-purple-600', bg: 'bg-purple-50', icon: <FiAward /> }
  ];

  return (
    <div className="min-h-screen space-y-12 pb-20 bg-white" dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* HUD HEADER */}
      <header className="px-4 pt-6">
         <div className="bg-slate-900 p-12 rounded-[3.5rem] border border-slate-800 relative overflow-hidden text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1ea05f]/10 rounded-full blur-[120px] -mr-48 -mt-48 transition-all hover:bg-[#1ea05f]/20"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
               <div className="space-y-4 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1ea05f]/20 text-[#1ea05f] border border-[#1ea05f]/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
                     <FiZap className="animate-pulse" /> {isUrdu ? 'آن لائن • ہیڈ کوارٹر سے منسلک' : 'ONLINE • CONNECTED TO HQ'}
                  </div>
                  <h1 className="text-5xl font-black tracking-tighter italic uppercase">
                     {isUrdu ? 'مشن کنٹرول' : 'Mission Control'}
                  </h1>
                  <p className="text-white/50 font-bold text-sm max-w-lg leading-relaxed uppercase tracking-wide">
                     {isUrdu ? 'آپ کی خدمات اور انسانی ہمدردی کا مکمل ریکارڈ یہاں موجود ہے۔' : 'Centralized Intelligence for Tactical Field Deployments & Impact.'}
                  </p>
               </div>
               <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <button className="px-10 py-5 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                     {isUrdu ? 'نئے مشنز' : 'Active Intelligence'}
                  </button>
                  <button onClick={() => setShowSupport(true)} className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                     {isUrdu ? 'رابطہ' : 'HQ Comms'}
                  </button>
               </div>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 px-4">
         <div className="xl:col-span-2 space-y-12">
            {/* STATS HUD */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {stats.map((stat, i) => (
                  <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500">
                     <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm group-hover:rotate-6 transition-transform`}>
                        {stat.icon}
                     </div>
                     <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                  </div>
               ))}
            </div>

            {/* ANALYTICS CHARTA (Fix #2 B) */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8">
               <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800 flex items-center gap-3">
                     <FiActivity className="text-[#1ea05f]" /> {isUrdu ? 'آپریشنل چارٹ' : 'Impact Analytics'}
                  </h3>
                  <span className="text-[10px] font-black text-[#1ea05f] bg-[#1ea05f]/10 px-4 py-1.5 rounded-full uppercase tracking-widest">Live Sync</span>
               </div>
               <div className="h-64 w-full px-2">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={IMPACT_DATA}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                        <Tooltip 
                           contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                           cursor={{fill: '#f1f5f9', radius: 12}}
                        />
                        <Bar dataKey="hours" radius={[10, 10, 10, 10]}>
                           {IMPACT_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={index === 5 ? '#1ea05f' : '#cbd5e1'} />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* MISSIONS (Fix #2 A: Matched List) */}
            <div className="space-y-8">
               <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-800 flex items-center gap-3">
                     <FiTarget className="text-[#1ea05f]" /> {isUrdu ? 'آپ کے لیے مشنز' : 'Strategic Matches'}
                  </h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic font-bold">Based on your Skill Profile</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchedMissions.map((mission, i) => (
                     <div key={i} className={`bg-white rounded-[3rem] p-10 border transition-all hover:shadow-2xl flex flex-col justify-between ${i === 0 ? 'border-[#1ea05f] bg-[#1ea05f]/5' : 'border-slate-100'}`}>
                        <div className="space-y-4">
                           <div className="flex justify-between items-start">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${i === 0 ? 'bg-[#1ea05f] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                 {i === 0 ? '98% Match' : 'High Priority'}
                              </span>
                              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{mission.region} Sector</span>
                           </div>
                           <h4 className="text-xl font-black text-slate-900 tracking-tight leading-7">{mission.title}</h4>
                           <p className="text-xs text-slate-500 font-bold leading-relaxed">{mission.desc}</p>
                        </div>
                        <div className="mt-8 flex items-center justify-between border-t border-slate-100/50 pt-6">
                           <div className="flex gap-2">
                              {mission.requiredSkills.map(s => <div key={s} className="w-2 h-2 rounded-full bg-[#1ea05f]"></div>)}
                           </div>
                           <button className="text-[10px] font-black uppercase tracking-widest text-[#1ea05f] flex items-center gap-2 hover:gap-4 transition-all">
                              Request Deployment <FiChevronRight />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* SIDEBAR HUB */}
         <div className="space-y-10">
            {/* Fix #2 C: Merit Recognition Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
               <FiAward className="text-[#1ea05f] mb-6" size={48} />
               <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Merit Accreditation</h3>
               <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-8 leading-5">Official Certification for your humanitarian field deployments.</p>
               <button 
                  onClick={handleDownloadCert}
                  className="w-full py-5 bg-white text-slate-900 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-[#1ea05f] hover:text-white transition-all shadow-xl shadow-black/20 flex items-center justify-center gap-3"
               >
                  <FiDownload size={18} /> Download Credentials
               </button>
            </div>

            {/* MERIT BADGES */}
            <div className="bg-slate-50 p-10 rounded-[3.5rem] border border-slate-100 space-y-8">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Protocol Badge Identity</h4>
               <div className="grid grid-cols-2 gap-4">
                  {[
                     { n: 'Medic', i: '🩺', c: 'bg-white border-red-50' },
                     { n: 'Ration', i: '📦', c: 'bg-white border-orange-50' },
                     { n: 'Flood', i: '🌊', c: 'bg-white border-blue-50' },
                     { n: 'Elite', i: '👑', c: 'bg-white border-emerald-50' }
                  ].map((badge, i) => (
                     <div key={i} className={`${badge.c} p-6 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all hover:scale-105 cursor-pointer`}>
                        <span className="text-3xl">{badge.i}</span>
                        <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">{badge.n}</span>
                     </div>
                  ))}
               </div>
               <button className="w-full text-center text-[10px] font-black text-[#1ea05f] uppercase tracking-widest hover:underline">View Badge Hub</button>
            </div>

            {/* FIELD HQ */}
            <div className="bg-emerald-600 p-12 rounded-[3.5rem] text-white space-y-8 shadow-2xl shadow-emerald-500/20 relative">
               <h4 className="text-2xl font-black italic uppercase tracking-tighter">HQ Support</h4>
               <p className="text-xs font-bold text-emerald-100 uppercase tracking-wide leading-relaxed italic">
                  Need real-time sync with sector command for operational assistance?
               </p>
               <button 
                  onClick={() => setShowSupport(true)}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl hover:bg-white hover:text-emerald-600 transition-all flex items-center justify-center gap-3"
               >
                  Open Secure Comms
               </button>
            </div>
         </div>
      </div>

      {/* SUPPORT MODAL */}
      <AnimatePresence>
         {showSupport && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
               <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white max-w-md w-full rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-3 bg-[#1ea05f]"></div>
                  <div className="flex justify-between items-start mb-10">
                     <h4 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800">Support HQ</h4>
                     <button onClick={() => setShowSupport(false)} className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all shadow-inner"><FiX size={20} /></button>
                  </div>
                  <div className="space-y-8">
                     <div className="p-8 bg-slate-50 rounded-[2.5rem] flex items-center gap-6 border border-slate-100">
                        <div className="w-20 h-20 rounded-full bg-[#1ea05f]/10 flex items-center justify-center text-[#1ea05f] text-3xl font-black italic">HQ</div>
                        <div>
                           <p className="text-lg font-black text-slate-900 uppercase italic">Command Center</p>
                           <p className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest">Active • 24/7 Response</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-1 gap-4">
                        <a href="https://wa.me/9221111298111" className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 no-underline uppercase text-[10px] tracking-widest"><FiMessageSquare size={18} /> Live Data Sync</a>
                        <a href="tel:+9221111298111" className="w-full py-5 border-2 border-slate-100 text-slate-800 font-black rounded-2xl flex items-center justify-center gap-3 no-underline uppercase text-[10px] tracking-widest hover:bg-slate-50"><FiPhone size={18} /> Signal Call</a>
                     </div>
                     <p className="text-center text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Operational location will be shared automatically.</p>
                  </div>
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      {alert && <DashboardAlert {...alert} onClose={() => setAlert(null)} />}
    </div>
  );
}
