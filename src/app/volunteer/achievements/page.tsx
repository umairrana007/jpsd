'use client';

import React from 'react';
import { 
  FiAward, FiStar, FiShield, FiTrendingUp, FiTarget, 
  FiZap, FiDownload, FiShare2, FiGrid, FiActivity
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function VolunteerAchievementsPage() {
  const levels = [
    { name: 'Observer', rank: 'Level 1', minXP: 0 },
    { name: 'Cadet', rank: 'Level 2', minXP: 500 },
    { name: 'Responder', rank: 'Level 3', minXP: 1200 },
    { name: 'Specialist', rank: 'Level 4', minXP: 2500, active: true },
    { name: 'Strategist', rank: 'Level 5', minXP: 5000 },
  ];

  const badges = [
    { title: 'First Responder', desc: 'Deployed in disaster relief within 24hr notice.', icon: FiShield, color: 'text-red-500', bg: 'bg-red-50', date: 'Sept 2025' },
    { title: 'Elite Logistics', desc: 'Over 50 verified hours in warehouse management.', icon: FiTrendingUp, color: 'text-blue-500', bg: 'bg-blue-50', date: 'Aug 2025' },
    { title: 'Community Hero', desc: 'Assisted over 1,000+ local beneficiaries.', icon: FiStar, color: 'text-amber-500', bg: 'bg-amber-50', date: 'Jul 2025' },
    { title: 'Field Specialist', desc: 'Certified for high-risk field operations.', icon: FiTarget, color: 'text-purple-500', bg: 'bg-purple-50', date: 'Jun 2025' },
    { title: 'Rapid Deployment', desc: 'Completed 5 urgent missions in 1 month.', icon: FiZap, color: 'text-[#1ea05f]', bg: 'bg-[#1ea05f]/10', date: 'May 2025' },
    { title: 'Guardian', desc: 'Served as lead volunteer for 3+ events.', icon: FiAward, color: 'text-slate-900', bg: 'bg-slate-100', date: 'Apr 2025' },
  ];

  return (
    <div className="space-y-12">
      {/* Achievement Hero */}
      <header className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-slate-900 p-14 rounded-[4rem] text-white overflow-hidden relative shadow-2xl flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#1ea05f]/30 rounded-full blur-[120px] -mr-48 -mt-48 anim-pulse" />
            <div className="relative z-10 space-y-6">
               <div className="flex items-center gap-3">
                  <FiAward className="text-[#1ea05f]" size={28} />
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-[#1ea05f] italic">Hall of Impact</span>
               </div>
               <h2 className="text-5xl lg:text-6xl font-black italic uppercase leading-none tracking-tighter">Verified Achievements</h2>
               <p className="text-slate-400 font-medium max-w-xl leading-relaxed text-base">
                 Your dedication transforms lives. Tracking your humanitarian milestones, tactical badges, and operational excellence.
               </p>
               <div className="flex gap-4 pt-4">
                  <button className="px-10 py-5 bg-[#1ea05f] text-white font-black rounded-3xl shadow-xl shadow-[#1ea05f]/20 hover:scale-105 transition-all text-xs uppercase tracking-widest flex items-center gap-3">
                     <FiDownload /> Export Portfolio
                  </button>
                  <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-3xl hover:bg-white/10 transition-all text-xs uppercase tracking-widest flex items-center gap-3 italic">
                     <FiShare2 /> Public ID
                  </button>
               </div>
            </div>
         </div>

         <div className="bg-white p-14 rounded-[4rem] border border-slate-200/50 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Ranking Status</p>
               <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-slate-950 rounded-2xl flex items-center justify-center text-[#1ea05f] shadow-2xl text-4xl font-black italic ring-8 ring-slate-100 ring-offset-4">
                     4
                  </div>
                  <div>
                     <h4 className="text-2xl font-black text-slate-800 italic uppercase">Specialist</h4>
                     <p className="text-[10px] text-[#1ea05f] font-black uppercase tracking-widest mt-1">Tier: Operational Elite</p>
                  </div>
               </div>
            </div>
            <div className="space-y-5 pt-8 mt-8 border-t border-slate-100">
               <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                  <span className="text-slate-400">Progression to L5</span>
                  <span className="text-slate-900">2,500 / 5,000 XP</span>
               </div>
               <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                  <div className="w-[50%] h-full bg-gradient-to-r from-[#1ea05f] to-emerald-400 rounded-full shadow-[0_0_15px_rgba(30,160,95,0.4)] transition-all duration-1000"></div>
               </div>
               <p className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest italic">Maintain velocity to reach Strategist Tier</p>
            </div>
         </div>
      </header>

      {/* Badges Inventory */}
      <section className="bg-white p-12 md:p-16 rounded-[4.5rem] border border-slate-200/50 shadow-sm space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div className="space-y-2">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-800">Operational Medals</h3>
              <p className="text-sm font-bold text-slate-400 uppercase italic tracking-widest">Verified skillsets earned through field deployment</p>
           </div>
           <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl">
              <button className="bg-white text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">All</button>
              <button className="text-slate-400 hover:text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Rare</button>
              <button className="text-slate-400 hover:text-slate-900 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Mastery</button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
           {badges.map((badge, i) => (
             <div key={i} className="group relative bg-[#fcfcfc] p-10 rounded-[3rem] border border-slate-100 hover:border-[#1ea05f]/30 hover:bg-white hover:shadow-2xl hover:shadow-[#1ea05f]/5 transition-all duration-500 cursor-pointer overflow-hidden">
                <div className={`absolute -right-8 -top-8 w-32 h-32 ${badge.bg} rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative z-10 flex items-start gap-6">
                   <div className={`shrink-0 w-20 h-20 ${badge.bg} rounded-3xl flex items-center justify-center ${badge.color} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <badge.icon size={36} />
                   </div>
                   <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{badge.date}</span>
                      <h4 className="text-xl font-black italic uppercase text-slate-900 leading-none">{badge.title}</h4>
                      <p className="text-xs font-semibold text-slate-500 leading-relaxed max-w-[200px]">{badge.desc}</p>
                   </div>
                </div>
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-30 transition-opacity">
                   <FiActivity size={64} className="text-[#1ea05f]/20" />
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Leaderboard/Milestones Footer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <section className="bg-slate-950 p-12 rounded-[4rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] pointer-events-none" />
            <div className="relative z-10 space-y-8">
               <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Tactical Leaderboard</h3>
                  <span className="text-[10px] font-black uppercase text-[#1ea05f] border border-[#1ea05f]/30 px-3 py-1 rounded-full">Global Ops</span>
               </div>
               <div className="space-y-4">
                  {[
                    { name: 'Idrees B.', rank: 1, xp: '18.2K', me: false },
                    { name: 'Salman K.', rank: 2, xp: '15.9K', me: false },
                    { name: 'Asad Ullah', rank: 3, xp: '14.8K', me: true },
                    { name: 'Huzaifa G.', rank: 4, xp: '12.1K', me: false },
                  ].map((user, i) => (
                    <div key={i} className={`flex justify-between items-center p-5 rounded-2xl border transition-all ${user.me ? 'bg-[#1ea05f] border-[#1ea05f] shadow-lg shadow-[#1ea05f]/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                       <div className="flex items-center gap-5">
                          <span className={`text-lg font-black italic ${user.me ? 'text-white' : 'text-[#1ea05f]'}`}>#{user.rank}</span>
                          <span className="text-sm font-black italic uppercase">{user.name}</span>
                       </div>
                       <span className={`text-[10px] font-black uppercase tracking-widest ${user.me ? 'text-white/90 font-bold' : 'text-slate-500'}`}>{user.xp} XP</span>
                    </div>
                  ))}
               </div>
            </div>
         </section>

         <section className="bg-gradient-to-br from-blue-600 to-indigo-900 p-12 rounded-[4rem] text-white flex flex-col justify-center items-center text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
            <FiZap className="text-yellow-400 group-hover:scale-125 transition-transform" size={48} />
            <div className="space-y-3">
               <h3 className="text-3xl font-black italic uppercase tracking-tighter">Impact Boost Active</h3>
               <p className="text-sm font-medium text-blue-100/70 max-w-sm leading-relaxed italic">
                 Deploying in the next 48 hours for **Water Filter Installation** will grant double XP and a "Master Hydra" badge.
               </p>
            </div>
            <button className="px-10 py-5 bg-white text-blue-900 font-black rounded-3xl hover:bg-blue-50 transition-all text-xs uppercase tracking-widest">
               Deploy Now
            </button>
         </section>
      </div>
    </div>
  );
}
