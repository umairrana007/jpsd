'use client';

import React, { useState } from 'react';
import { 
  FiHome, FiCalendar, FiClock, FiAward, 
  FiMessageSquare, FiTrendingUp, FiActivity,
  FiZap, FiArrowRight, FiCheckCircle, FiInfo,
  FiDownload, FiExternalLink, FiSearch, FiFilter,
  FiStar, FiTarget, FiBox, FiShield, FiUser, FiBookOpen
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { generateVolunteerCertificate } from '@/lib/pdfUtils';

export default function VolunteerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'mission' | 'history'>('mission');

  const handleDownloadCertificate = () => {
    generateVolunteerCertificate({
      id: 'BGT-VOL-824',
      name: 'Asad Ullah',
      hoursLogged: 148.5
    });
  };

  return (
    <div className="space-y-10">
      {/* Tactical Status Hero */}
      <header className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2 bg-slate-900 p-12 rounded-[4rem] text-white overflow-hidden relative shadow-2xl flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1ea05f]/20 rounded-full blur-[100px] -mr-32 -mt-32 anim-pulse" />
            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-3">
                  <FiTarget className="text-[#1ea05f]" size={24} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1ea05f] italic">Tactical Ready</span>
               </div>
               <h2 className="text-4xl lg:text-5xl font-black italic uppercase leading-none tracking-tighter">Mission Control</h2>
               <p className="text-slate-400 font-medium max-w-lg leading-relaxed text-sm">
                 You have **3 mission-critical** events in your region. Your logistics profile is 98% complete for field deployment.
               </p>
               <button className="px-10 py-5 bg-[#1ea05f] text-white font-black rounded-3xl shadow-xl shadow-[#1ea05f]/20 hover:scale-105 transition-all text-xs uppercase tracking-widest flex items-center gap-3 w-fit mt-4">
                  Browse Active Missions <FiArrowRight />
               </button>
            </div>
         </div>

         <div className="bg-white p-12 rounded-[4rem] border border-slate-200/50 shadow-sm flex flex-col justify-between">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Operational Rank</p>
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#1ea05f] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#1ea05f]/20">
                     <FiStar size={32} />
                  </div>
                  <div>
                     <h4 className="text-xl font-black text-slate-800 italic uppercase">Specialist</h4>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Level 4 Certified</p>
                  </div>
               </div>
            </div>
            <div className="space-y-4 pt-8 mt-8 border-t border-slate-100">
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-400 italic">Deployment Rating</span>
                  <span className="text-[#1ea05f]">4.9 / 5.0</span>
               </div>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-[#1ea05f] rounded-full shadow-[0_0_10px_rgba(30,160,95,0.5)]"></div>
               </div>
            </div>
         </div>
      </header>

      {/* Main Operational Dashboard */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         
         {/* Left: Events & Notifications */}
         <div className="xl:col-span-8 space-y-10">
            
            {/* Mission Critical Feed */}
            <section className="bg-white/50 backdrop-blur-md p-10 md:p-14 rounded-[3.5rem] border border-white shadow-sm space-y-10">
               <div className="flex justify-between items-end">
                  <div>
                     <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">Operational Feed</h3>
                     <p className="text-sm font-bold text-slate-400 mt-1 uppercase italic tracking-widest">High-priority humanitarian assignments</p>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                     <button onClick={() => setActiveTab('mission')} className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'mission' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>Missions</button>
                     <button onClick={() => setActiveTab('history')} className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'history' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>Timeline</button>
                  </div>
               </div>

               <AnimatePresence mode="wait">
                  {activeTab === 'mission' ? (
                     <motion.div 
                       key="missions"
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       className="space-y-6"
                     >
                        {[
                           { title: 'Food Drive - Korangi', date: 'Tomorrow, 9:00 AM', loc: 'Plot 14, Sector 7', points: '+150 XP', category: 'Urgent' },
                           { title: 'Medical Camp Prep', date: 'Sat, 12 Oct', loc: 'HQ Warehouse', points: '+100 XP', category: 'Training' },
                           { title: 'Water Filter Install', date: 'Sun, 13 Oct', loc: 'Rural Hub', points: '+200 XP', category: 'Operations' },
                        ].map((mission, i) => (
                           <div key={i} className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-[#1ea05f] hover:shadow-2xl hover:shadow-[#1ea05f]/5 transition-all cursor-pointer">
                              <div className="w-16 h-16 bg-slate-50 group-hover:bg-[#1ea05f]/10 rounded-[1.5rem] flex items-center justify-center text-slate-300 group-hover:text-[#1ea05f] transition-all">
                                 <FiZap size={24} />
                              </div>
                              <div className="flex-1 space-y-1">
                                 <div className="flex items-center gap-2">
                                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full ${mission.category === 'Urgent' ? 'bg-red-500 text-white' : mission.category === 'Training' ? 'bg-blue-500 text-white' : 'bg-[#1ea05f] text-white'}`}>
                                       {mission.category}
                                    </span>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{mission.date}</span>
                                 </div>
                                 <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-800">{mission.title}</h4>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2"><FiInfo /> {mission.loc}</p>
                              </div>
                              <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                                 <div className="text-right px-4">
                                    <p className="text-sm font-black text-[#1ea05f] italic">{mission.points}</p>
                                    <p className="text-[8px] text-slate-300 font-bold uppercase tracking-widest">Potential Impact</p>
                                 </div>
                                 <button className="flex-1 md:flex-none px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1ea05f] transition-all group-hover:scale-105">Deploy</button>
                              </div>
                           </div>
                        ))}
                     </motion.div>
                  ) : (
                     <motion.div 
                        key="history"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                     >
                        {[
                           { title: 'Flood Relief Ops', date: 'Aug 2025', hours: '48.0', status: 'Verified' },
                           { title: 'Education Drive', date: 'Jul 2025', hours: '12.5', status: 'Verified' },
                           { title: 'Blood Donation Camp', date: 'Jun 2025', hours: '8.0', status: 'Flagged' },
                        ].map((hist, i) => (
                           <div key={i} className="flex justify-between items-center p-6 border-b border-slate-100/50 hover:bg-slate-50/50 rounded-2xl transition-all">
                              <div>
                                 <h5 className="font-black text-sm italic uppercase text-slate-800">{hist.title}</h5>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{hist.date}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-sm font-black text-slate-900">{hist.hours} HRS</p>
                                 <span className={`text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${hist.status === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{hist.status}</span>
                              </div>
                           </div>
                        ))}
                     </motion.div>
                  )}
               </AnimatePresence>
            </section>
         </div>

         {/* Right: Achievements & Stats */}
         <div className="xl:col-span-4 space-y-10">
            
            {/* Achievement Collection */}
            <section className="bg-white p-12 rounded-[3.5rem] border border-slate-200/50 shadow-sm space-y-10">
               <div>
                  <h3 className="text-xl font-black italic uppercase tracking-widest text-slate-800">Operational Badges</h3>
                  <p className="text-[10px] text-slate-400 font-bold tracking-widest mt-1 uppercase">Showcasing your verified field skillsets</p>
               </div>

               <div className="grid grid-cols-3 gap-6">
                  {[
                    { icon: FiShield, label: 'First Aid', color: 'bg-red-50 text-red-500' },
                    { icon: FiBox, label: 'Logistics', color: 'bg-blue-50 text-blue-500' },
                    { icon: FiUser, label: 'Leader', color: 'bg-purple-50 text-purple-500' },
                    { icon: FiTrendingUp, label: 'Veteran', color: 'bg-amber-50 text-amber-500' },
                    { icon: FiMessageSquare, label: 'Proxy', color: 'bg-green-50 text-green-500' },
                    { icon: FiAward, label: 'Hero', color: 'bg-slate-900 text-[#1ea05f]' },
                  ].map((badge, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all hover:scale-110 shadow-sm opacity-80 hover:opacity-100 cursor-pointer ${badge.color}`}>
                          <badge.icon size={24} />
                       </div>
                       <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{badge.label}</span>
                    </div>
                  ))}
               </div>

               <div className="pt-6 border-t border-slate-100">
                  <button 
                    onClick={handleDownloadCertificate}
                    className="w-full py-4 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                     <FiDownload /> Export Portfolio Certificate
                  </button>
               </div>
            </section>

            {/* Tactical Grade Card */}
            <section className="bg-gradient-to-br from-[#1ea05f] to-slate-900 p-12 rounded-[4rem] text-white space-y-8 relative overflow-hidden group border border-white/5 shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
               <div className="space-y-4">
                  <FiActivity size={32} className="text-[#1ea05f]" />
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Tactical Grade A+</h3>
                  <p className="text-xs font-medium text-slate-400 leading-relaxed italic">
                    Your contribution velocity is in the top 5% of global field agents. Keep deploying assets to maintain your elite status.
                  </p>
               </div>
               <div className="flex justify-between border-t border-white/10 pt-6">
                  <div className="text-center">
                     <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Missions</p>
                     <p className="text-xl font-black italic">42</p>
                  </div>
                  <div className="text-center border-x border-white/5 px-8">
                     <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Rating</p>
                     <p className="text-xl font-black italic text-[#1ea05f]">4.9</p>
                  </div>
                  <div className="text-center">
                     <p className="text-[8px] font-black uppercase tracking-widest text-slate-500 mb-1">Impact</p>
                     <p className="text-xl font-black italic text-blue-400">High</p>
                  </div>
               </div>
            </section>

            {/* Training Shortcut */}
            <button className="w-full p-8 bg-blue-600 rounded-[3rem] text-white shadow-xl shadow-blue-600/20 flex items-center justify-between group overflow-hidden relative">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:scale-150 transition-transform" />
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                     <FiBookOpen size={24} />
                  </div>
                  <div className="text-left">
                     <p className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-1">Academy Access</p>
                     <p className="text-lg font-black italic uppercase italic tracking-widest italic tracking-widest">Training Materials</p>
                  </div>
               </div>
               <FiArrowRight className="group-hover:translate-x-2 transition-transform relative z-10" />
            </button>
         </div>
      </div>
    </div>
  );
}
