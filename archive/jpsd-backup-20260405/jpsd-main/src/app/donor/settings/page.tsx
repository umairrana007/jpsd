'use client';

import React from 'react';
import { 
  FiSettings, FiBell, FiShield, FiLock, 
  FiGlobe, FiSmartphone, FiCheckCircle,
  FiActivity, FiZap
} from 'react-icons/fi';

export default function DonorSettingsPage() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Preferences Hub</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Calibrate your donor experience and operational alerts.</p>
        </div>
        <div className="flex gap-3">
           <span className="px-6 py-3 bg-slate-100 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200">
              Last Synced: Just Now
           </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
           {[
             { label: 'General Protocol', icon: FiSettings, active: true },
             { label: 'Alert Feedback', icon: FiBell, active: false },
             { label: 'Security Layer', icon: FiShield, active: false },
             { label: 'Global Localization', icon: FiGlobe, active: false },
           ].map((item, i) => (
             <button key={i} className={`w-full flex items-center gap-4 px-8 py-5 rounded-[2.5rem] font-black text-[11px] uppercase tracking-widest transition-all ${item.active ? 'bg-[#1ea05f] text-white shadow-xl shadow-[#1ea05f]/20' : 'bg-white text-slate-400 hover:bg-slate-50 border border-transparent hover:border-slate-100'}`}>
                <item.icon size={18} />
                <span>{item.label}</span>
             </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-10">
           
           {/* Notification Settings */}
           <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-10">
              <div className="flex justify-between items-end border-b border-slate-50 pb-8">
                 <div>
                    <h3 className="text-xl font-black text-slate-800 italic uppercase tracking-tighter leading-none">Operational Alerts</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 italic">How HQ communicates with you</p>
                 </div>
                 <FiBell className="text-slate-200" size={32} />
              </div>

              <div className="space-y-6">
                 {[
                   { title: 'Project Success Flashes', desc: 'Instant alerts when a cause hits survival threshold.', active: true },
                   { title: 'Payment Confirmation', desc: 'Secure protocol feedback for every donation.', active: true },
                   { title: 'Weekly Impact Review', desc: 'Consolidated report of your global deeds.', active: false },
                 ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-6 bg-slate-50/50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all">
                       <div>
                          <p className="text-sm font-black text-slate-800 italic uppercase mb-1">{item.title}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
                       </div>
                       <div className={`w-12 h-7 rounded-full relative cursor-pointer transition-all ${item.active ? 'bg-[#1ea05f]' : 'bg-slate-200'}`}>
                          <div className={`absolute top-1.5 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-1.5' : 'left-1.5'}`}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           {/* Security & Access */}
           <section className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#1ea05f]/10 rounded-full blur-[100px] -mr-32 -mt-32" />
              
              <div className="flex items-center gap-6 mb-10 relative z-10">
                 <div className="w-16 h-16 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 flex items-center justify-center text-[#1ea05f]">
                    <FiLock size={32} />
                 </div>
                 <div>
                    <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none">Access Protocol</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2 italic">Secure Identity Management</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                 <button className="p-8 bg-white/5 hover:bg-white/10 border border-white/5 rounded-[2.5rem] transition-all text-left group">
                    <p className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest mb-2 italic">Credentials</p>
                    <h4 className="text-sm font-black uppercase tracking-widest">Rotate Password</h4>
                    <FiZap className="text-slate-600 mt-4 group-hover:text-amber-400 transition-colors" />
                 </button>
                 <button className="p-8 bg-white/5 hover:bg-white/10 border border-white/5 rounded-[2.5rem] transition-all text-left group">
                    <p className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest mb-2 italic">Device ID</p>
                    <h4 className="text-sm font-black uppercase tracking-widest">Active Sessions</h4>
                    <FiSmartphone className="text-slate-600 mt-4 group-hover:text-blue-400 transition-colors" />
                 </button>
              </div>

              <div className="mt-10 p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4 relative z-10">
                 <FiCheckCircle className="text-[#1ea05f]" />
                 <p className="text-xs font-medium text-slate-400">Advanced Bio-metric shielding is active on your mobile app.</p>
              </div>
           </section>

           <div className="flex justify-end gap-4">
              <button className="px-10 py-5 bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-3xl border border-slate-200 hover:text-slate-800 transition-all">Discard Changes</button>
              <button className="px-12 py-5 bg-[#1ea05f] text-white font-black text-[10px] uppercase tracking-widest rounded-3xl shadow-xl shadow-[#1ea05f]/20 hover:scale-105 transition-all">Save Core Protocol</button>
           </div>
        </div>
      </div>
    </div>
  );
}
