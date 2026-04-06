'use client';

import React from 'react';
import { 
  FiHeart, FiPlus, FiSettings, FiTrash2,
  FiActivity, FiCheckCircle, FiCalendar, FiArrowRight
} from 'react-icons/fi';

export default function RecurringHubPage() {
  const recurringDonations = [
    { id: 'REC-01', cause: 'Orphan Support Program', amount: 5000, frequency: 'Monthly', nextDate: '2026-04-15', status: 'Active' },
    { id: 'REC-02', cause: 'Clean Water Maintenance', amount: 2500, frequency: 'Monthly', nextDate: '2026-04-20', status: 'Active' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Recurring Hub</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Automated impact: Your consistent dedication to change.</p>
        </div>
        <button className="px-8 py-3 bg-gradient-to-br from-[#1ea05f] to-green-600 text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center gap-2 uppercase tracking-widest text-[10px]">
          <FiPlus /> New Commitment
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {recurringDonations.map((sub, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-8 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
            
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 bg-[#1ea05f]/10 rounded-2xl flex items-center justify-center text-[#1ea05f]">
                <FiHeart size={28} />
              </div>
              <span className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 border border-emerald-100 flex items-center gap-2">
                <FiCheckCircle /> {sub.status}
              </span>
            </div>

            <div>
              <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">{sub.cause}</h4>
              <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest italic">{sub.frequency} Contribution</p>
            </div>

            <div className="flex items-end justify-between pt-4 border-t border-slate-50">
              <div>
                <p className="text-sm font-black text-slate-800 tracking-tighter">RS {sub.amount.toLocaleString()} <span className="text-slate-400 text-[10px] font-bold uppercase">/ month</span></p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2"><FiCalendar /> Next: {sub.nextDate}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors"><FiSettings /></button>
                <button className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-400 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"><FiTrash2 /></button>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-10 rounded-[3rem] flex flex-col items-center justify-center gap-4 text-center cursor-pointer hover:bg-white hover:border-[#1ea05f] transition-all group">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 group-hover:text-[#1ea05f] group-hover:shadow-xl transition-all">
              <FiPlus size={32} />
           </div>
           <h4 className="text-lg font-black text-slate-400 group-hover:text-slate-800 italic uppercase">Add Another Pulse</h4>
           <p className="text-xs font-medium text-slate-400 max-w-[200px]">Create a new recurring commitment to double your impact.</p>
        </div>
      </div>

      {/* Global Impact Note */}
      <section className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1ea05f]/20 rounded-full blur-[120px] -mr-64 -mt-64" />
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4">
               <FiActivity size={32} className="text-[#1ea05f]" />
               <h3 className="text-2xl font-black italic uppercase tracking-tighter">Consistency Calibration</h3>
               <p className="text-slate-400 font-medium max-w-xl leading-relaxed">
                 Recurring donors provide the "Basal Pulse" for our field operations. Because of your consistency, we can plan missions 6 months in advance with 100% financial certainty.
               </p>
            </div>
            <button className="px-10 py-5 bg-[#1ea05f] text-white font-black rounded-3xl shadow-xl hover:scale-105 transition-all text-[10px] uppercase tracking-widest flex items-center gap-2">Explore Field Ops <FiArrowRight /></button>
         </div>
      </section>
    </div>
  );
}
