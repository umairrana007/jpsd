'use client';

import React from 'react';
import { 
  FiUser, FiShield, FiGlobe, FiZap, 
  FiMail, FiPhone, FiMapPin, FiActivity,
  FiEdit2, FiCheckCircle, FiArrowRight
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function DonorProfilePage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Genesis Profile</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Your identity within the JPSD Global Ecosystem.</p>
        </div>
        <button className="px-8 py-3 bg-white text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
          <FiEdit2 /> Update Identity
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Profile Card */}
        <div className="lg:col-span-4 space-y-10">
           <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-10 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="w-40 h-40 rounded-[3rem] bg-slate-100 flex items-center justify-center text-slate-400 font-black text-4xl shadow-2xl overflow-hidden group relative">
                 <img src="/images/jpsd_education.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" alt="Identity" />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-all uppercase tracking-widest">Update Photo</div>
              </div>

              <div>
                 <h3 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter leading-none mb-3">Muhammad Umair</h3>
                 <span className="text-[10px] font-black text-[#1ea05f] bg-[#1ea05f]/10 px-4 py-2 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 italic">
                    <FiCheckCircle /> Verified Platinum Member
                 </span>
              </div>

              <div className="w-full space-y-4 pt-10 border-t border-slate-50">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Impact Tier</span>
                    <span className="text-slate-800">Elite Commander</span>
                 </div>
                 <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-[#1ea05f]" />
                 </div>
              </div>
           </section>

           <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-[4rem] text-white shadow-2xl shadow-black/20 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/20 rounded-full blur-[100px] -mr-16 -mt-16"></div>
              <FiShield size={32} className="text-[#1ea05f]" />
              <h4 className="text-xl font-black italic uppercase tracking-tighter leading-none">Security Calibration</h4>
              <p className="text-slate-400 font-medium text-xs leading-relaxed max-w-[200px]">2-Factor Auth is active on this portal. Security logs last reviewed: Today at 08:24 AM.</p>
              <button className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform italic">Review Security Matrix <FiArrowRight /></button>
           </div>
        </div>

        {/* Detailed Data */}
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-md p-14 rounded-[4rem] border border-white shadow-sm space-y-12">
           <div>
              <h3 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter leading-none mb-10 border-b border-slate-50 pb-8">Personal Information Core</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Mission Email</label>
                    <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                       <FiMail className="text-slate-400" />
                       <span className="text-sm font-black text-slate-800">umair@JPSD.ngo</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Tactical Contact</label>
                    <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                       <FiPhone className="text-slate-400" />
                       <span className="text-sm font-black text-slate-800">+92 300 1234567</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">Home Deployment Region</label>
                    <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 w-full">
                       <FiMapPin className="text-slate-400" />
                       <span className="text-sm font-black text-slate-800">Area-01, Karachi, Pakistan (South Sindh)</span>
                    </div>
                 </div>
              </div>
           </div>

           <div>
              <h3 className="text-xl font-black text-slate-800 italic uppercase tracking-tighter leading-none mb-10 border-b border-slate-50 pb-8">Global Localization</h3>
              <div className="space-y-8">
                 <div className="flex items-center justify-between p-8 bg-slate-50 rounded- [3rem] border border-slate-100">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                          <FiGlobe size={24} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-800 italic uppercase">Preferred Dialect</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Language: English / Urdu Localized</p>
                       </div>
                    </div>
                    <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline italic">Switch Context</button>
                 </div>
                 
                 <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                          <FiActivity size={24} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-800 italic uppercase">Activity Visibility</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Public Impact Tracking: Active</p>
                       </div>
                    </div>
                    <button className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:underline italic">Edit Visibility</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

