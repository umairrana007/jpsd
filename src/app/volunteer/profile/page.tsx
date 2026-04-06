'use client';

import React from 'react';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, 
  FiStar, FiShield, FiTrendingUp, FiActivity,
  FiEdit, FiCheckCircle, FiBell, FiLock, FiLogOut, FiDownload,
  FiZap, FiAward
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function VolunteerProfilePage() {
  const volunteer = {
    id: 'BGT-VOL-824',
    name: 'Asad Ullah',
    email: 'volunteer@jpsd.org',
    phone: '+92 300 1234567',
    location: 'Karachi, Pakistan',
    joined: 'Jan 2024',
    rank: 'Operational Specialist',
    level: 4,
    rating: 4.9,
    hours: 148.5,
    missions: 42,
    bloodGroup: 'B+',
    emergencyContact: '+92 321 7654321'
  };

  return (
    <div className="space-y-12">
      {/* Profile Header Card */}
      <header className="bg-slate-900 rounded-[5rem] p-16 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-12 group">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1ea05f]/20 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-700" />
         <div className="relative z-10 shrink-0">
            <div className="w-48 h-48 rounded-[3.5rem] bg-gradient-to-br from-slate-800 to-slate-950 p-1 flex items-center justify-center relative shadow-2xl overflow-hidden group/avatar">
               <div className="w-full h-full bg-[#1ea05f] flex items-center justify-center text-6xl font-black italic uppercase italic tracking-tighter">
                  {volunteer.name.charAt(0)}
               </div>
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <FiEdit size={32} />
               </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl border border-slate-200 group-hover:scale-110 transition-transform">
               <FiStar size={24} className="text-[#1ea05f]" />
            </div>
         </div>
         <div className="relative z-10 flex-1 space-y-4 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
               <h2 className="text-4xl lg:text-5xl font-black italic uppercase leading-none tracking-tighter">{volunteer.name}</h2>
               <span className="px-4 py-1.5 bg-[#1ea05f] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-[#1ea05f]/20">Active Deployer</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-slate-400 font-bold uppercase tracking-widest text-xs italic">
               <span className="flex items-center gap-2"><FiShield className="text-[#1ea05f]" /> {volunteer.rank}</span>
               <span className="flex items-center gap-2"><FiMapPin /> {volunteer.location}</span>
               <span className="flex items-center gap-2"><FiCalendar /> Joined {volunteer.joined}</span>
            </div>
            <div className="pt-6 flex flex-wrap justify-center md:justify-start gap-4">
               <button className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-3xl hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <FiEdit /> Modify Tactical Data
               </button>
               <button className="px-8 py-4 bg-[#1ea05f]/10 border border-[#1ea05f]/20 text-[#1ea05f] rounded-3xl hover:bg-[#1ea05f] hover:text-white transition-all font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <FiDownload /> Download ID Card
               </button>
            </div>
         </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         {/* Identity Breakdown */}
         <section className="xl:col-span-4 bg-white p-12 rounded-[4rem] border border-slate-200/50 shadow-sm space-y-12">
            <div>
               <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Tactical Identity</h3>
               <p className="text-[10px] text-slate-400 font-black tracking-widest mt-1 uppercase italic">Verified Core Data</p>
            </div>
            <div className="space-y-8">
               {[
                 { label: 'Operational ID', val: volunteer.id, icon: FiZap, color: 'text-blue-500' },
                 { label: 'Communication Hub', val: volunteer.email, icon: FiMail, color: 'text-purple-500' },
                 { label: 'Tactical Radio', val: volunteer.phone, icon: FiPhone, color: 'text-[#1ea05f]' },
                 { label: 'Biological Grade', val: volunteer.bloodGroup, icon: FiActivity, color: 'text-red-500' },
                 { label: 'Emergency Backup', val: volunteer.emergencyContact, icon: FiShield, color: 'text-amber-500' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 group">
                    <div className={`w-12 h-12 bg-slate-50 flex items-center justify-center rounded-2xl ${item.color} group-hover:scale-110 transition-transform`}>
                       <item.icon size={20} />
                    </div>
                    <div>
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                       <p className="text-sm font-black text-slate-800 italic uppercase">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>
         </section>

         {/* Performance Matrix */}
         <section className="xl:col-span-8 space-y-10">
            <div className="bg-white p-14 rounded-[4.5rem] border border-slate-200/50 shadow-sm space-y-12">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div className="space-y-1">
                     <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Performance Matrix</h3>
                     <p className="text-[10px] font-black italic text-[#1ea05f] uppercase tracking-widest">Active Verification Period: Q1 2026</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="text-right">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Global Weightage</p>
                        <p className="text-xl font-black italic text-slate-900">Rank #142</p>
                     </div>
                     <FiTrendingUp className="text-[#1ea05f]" size={32} />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: 'Operational Hours', value: volunteer.hours, suffix: 'Verified', color: 'bg-blue-50 text-blue-600', sub: 'Field Deployment' },
                    { label: 'Engagement Phase', value: volunteer.missions, suffix: 'Missions', color: 'bg-[#1ea05f]/5 text-[#1ea05f]', sub: 'Mission Critical' },
                    { label: 'Tactical Rating', value: volunteer.rating, suffix: '/ 5.0', color: 'bg-amber-50 text-amber-600', sub: 'Deployment Score' },
                  ].map((stat, i) => (
                    <div key={i} className={`p-10 rounded-[3.5rem] ${stat.color} flex flex-col items-center text-center space-y-4 border border-transparent hover:border-current transition-all group`}>
                       <p className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{stat.label}</p>
                       <div className="flex items-end gap-2">
                          <span className="text-5xl font-black italic">{stat.value}</span>
                          <span className="text-[10px] font-black uppercase tracking-tighter mb-2 opacity-60">{stat.suffix}</span>
                       </div>
                       <p className="text-[8px] font-black uppercase tracking-[0.2em] italic">{stat.sub}</p>
                    </div>
                  ))}
               </div>

               {/* Activity Progression */}
               <div className="space-y-8 pt-8 mt-8 border-t border-slate-100">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-slate-400">
                     <span>Deployment Tier: Operational Specialist (Level 4)</span>
                     <span>Next Tier: 52% Deployment Velocity</span>
                  </div>
                  <div className="w-full h-4 bg-slate-50 rounded-full border border-slate-100 p-1">
                     <div className="w-[52%] h-full bg-gradient-to-r from-slate-900 via-slate-800 to-[#1ea05f] rounded-full shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.1] pointer-events-none" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Tactical Preferences */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="bg-slate-950 p-12 rounded-[4rem] text-white relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                  <FiBell size={32} className="text-[#1ea05f] mb-6" />
                  <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4">Channel Routing</h4>
                  <div className="space-y-4">
                     {['Field Engagement Alerts', 'Logistics Availability', 'Rapid Response Protocols', 'New Base Intelligence'].map((p, i) => (
                        <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                           <span className="text-[11px] font-black uppercase tracking-widest opacity-80">{p}</span>
                           <div className="w-10 h-6 bg-[#1ea05f]/20 border border-[#1ea05f]/50 rounded-full relative p-1 cursor-pointer">
                              <div className="w-4 h-4 bg-[#1ea05f] rounded-full absolute right-1" />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 p-12 rounded-[4rem] text-white relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px] -mr-16 -mt-16" />
                  <FiLock size={32} className="text-indigo-300 mb-6" />
                  <h4 className="text-xl font-black italic uppercase tracking-tighter mb-4">Security Protocol</h4>
                  <p className="text-xs font-semibold text-indigo-100 opacity-60 italic mb-8 leading-relaxed">
                     Protect your tactical identity and access frequency. Ensure your 2FA frequency is set to operational standards.
                  </p>
                  <button className="w-full py-5 bg-white text-indigo-900 rounded-3xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-indigo-50 transition-all">
                     Recalibrate Security Link
                  </button>
               </div>
            </div>
         </section>
      </div>
    </div>
  );
}
