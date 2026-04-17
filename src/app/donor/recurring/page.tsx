'use client';

import React, { useState } from 'react';
import { 
  FiHeart, FiPlus, FiSettings, FiTrash2,
  FiActivity, FiCheckCircle, FiCalendar, FiArrowRight, FiX, FiShield, FiTrendingUp, FiTarget, FiZap, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecurringHubPage() {
  const [recurringDonations, setRecurringDonations] = useState([
    { id: 'REC-01', cause: 'Orphan Support Program', amount: 5000, frequency: 'Monthly', nextDate: '2026-04-15', status: 'Active' },
    { id: 'REC-02', cause: 'Clean Water Maintenance', amount: 2500, frequency: 'Monthly', nextDate: '2026-04-20', status: 'Active' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showForecastModal, setShowForecastModal] = useState(false);
  const [newPulse, setNewPulse] = useState({ amount: 1000, cause: 'General Sadaqah' });

  const handleAddPulse = () => {
    const newItem = {
      id: `REC-0${recurringDonations.length + 1}`,
      cause: newPulse.cause,
      amount: newPulse.amount,
      frequency: 'Monthly',
      nextDate: '2026-05-01',
      status: 'Active'
    };
    setRecurringDonations([...recurringDonations, newItem]);
    setShowAddModal(false);
  };

  const removePulse = (id: string) => {
    setRecurringDonations(recurringDonations.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* Add Pulse Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-6"
          >
             <motion.div 
                initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.95 }}
                className="bg-white max-w-lg w-full rounded-[4rem] p-12 shadow-2xl border border-white/20 relative"
             >
                <button onClick={() => setShowAddModal(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-all"><FiX size={24}/></button>
                <div className="text-center mb-10">
                   <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-[#1ea05f] mx-auto mb-4">
                      <FiHeart size={32} />
                   </div>
                   <h4 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">Initialize New Pulse</h4>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Automate your legacy of giving.</p>
                </div>

                <div className="space-y-8">
                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Select Commitment Amount</p>
                      <div className="grid grid-cols-3 gap-3">
                         {[1000, 2500, 5000].map(amt => (
                            <button 
                               key={amt}
                               onClick={() => setNewPulse({...newPulse, amount: amt})}
                               className={`py-4 rounded-2xl font-black text-sm italic transition-all ${newPulse.amount === amt ? 'bg-[#1ea05f] text-white shadow-lg shadow-green-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                            >
                               RS {amt}
                            </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Select Mission / Cause</p>
                      <select 
                         className="w-full p-5 bg-slate-50 border-none rounded-2xl text-slate-800 font-black italic uppercase text-xs outline-none focus:ring-2 focus:ring-[#1ea05f]/20"
                         onChange={(e) => setNewPulse({...newPulse, cause: e.target.value})}
                      >
                         <option>General Sadaqah</option>
                         <option>Food Pack Distribution</option>
                         <option>Medical Aid Mission</option>
                         <option>Education Endowment</option>
                      </select>
                   </div>

                   <button 
                      onClick={handleAddPulse}
                      className="w-full py-6 bg-slate-900 text-white font-black text-[11px] uppercase rounded-[2rem] tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                   >
                      Confirm Commitment <FiCheckCircle />
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FINAL Operational Forecast Modal FIX */}
      <AnimatePresence>
        {showForecastModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2050] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
          >
             <motion.div 
                initial={{ y: 100, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 100, opacity: 0, scale: 0.9 }}
                className="bg-white max-w-xl w-full rounded-[4rem] shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden"
             >
                {/* Header Section - Fixed at top */}
                <div className="bg-slate-900 p-10 text-white relative shrink-0">
                   <div className="absolute top-0 right-0 w-48 h-48 bg-[#1ea05f]/20 rounded-full blur-[80px] -mr-24 -mt-24 pointer-events-none" />
                   <button onClick={() => setShowForecastModal(false)} className="absolute top-8 right-8 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all text-white/50 hover:text-white z-50"><FiX size={20}/></button>
                   
                   <div className="flex items-center gap-5 relative z-10">
                      <div className="w-14 h-14 bg-[#1ea05f] rounded-2xl flex items-center justify-center shadow-lg shadow-[#1ea05f]/40 transition-transform hover:rotate-3"><FiTrendingUp size={28}/></div>
                      <div>
                         <h4 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Mission Forecast</h4>
                         <p className="text-[9px] font-black text-[#1ea05f] uppercase tracking-[0.3em] mt-2 italic opacity-80">Strategic Operational Capacity</p>
                      </div>
                   </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-4 custom-scrollbar">
                   {[
                      { month: 'MAY - JUN', mission: 'Arid Zone Water Projects', status: '100% Funded', percent: 100 },
                      { month: 'JUL - AUG', mission: 'Solar Education Hubs', status: '82% Funded', percent: 82 },
                      { month: 'SEP - OCT', mission: 'Winter Prep Deployments', status: 'Planning Phase', percent: 35 },
                   ].map((item, id) => (
                      <div key={id} className="relative flex items-start gap-6 p-6 hover:bg-slate-50 rounded-[2.5rem] transition-all group border border-transparent hover:border-slate-100">
                         <div className="mt-1 w-10 h-10 rounded-full bg-white border-2 border-slate-50 flex items-center justify-center z-10 shadow-sm group-hover:border-[#1ea05f] transition-all shrink-0">
                            {item.percent === 100 ? <FiCheck className="text-[#1ea05f]" size={14}/> : <div className="w-2.5 h-2.5 rounded-full bg-slate-200 group-hover:bg-[#1ea05f]" />}
                         </div>
                         <div className="flex-1 space-y-4 min-w-0">
                            <div className="flex justify-between items-start gap-4">
                               <div className="truncate">
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.month}</p>
                                  <h5 className="text-base font-black text-slate-900 italic uppercase leading-none truncate">{item.mission}</h5>
                               </div>
                               <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border shrink-0 ${item.percent === 100 ? 'bg-green-50 text-[#1ea05f] border-green-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                  {item.status}
                               </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner translate-z-0">
                               <motion.div 
                                 initial={{ width: 0 }} 
                                 animate={{ width: `${item.percent}%` }} 
                                 transition={{ delay: 0.2, duration: 1.5, ease: "circOut" }}
                                 className={`h-full ${item.percent === 100 ? 'bg-gradient-to-r from-[#1ea05f] to-emerald-400' : 'bg-blue-500'} rounded-full`}
                               />
                            </div>
                         </div>
                      </div>
                   ))}

                   <div className="mt-4 flex items-start gap-4 p-7 bg-slate-50/80 rounded-[2.5rem] border border-slate-100 relative group overflow-hidden">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1ea05f] shadow-sm shrink-0 font-black italic text-lg opacity-40">"</div>
                      <p className="text-[10px] font-black italic text-slate-600 leading-relaxed uppercase tracking-tight">
                         Your "Basal Pulse" enables us to plan missions with 100% financial certainty.
                      </p>
                   </div>
                </div>

                {/* Footer Section - Fixed at bottom */}
                <div className="p-8 md:p-10 pt-4 bg-white shrink-0 border-t border-slate-50">
                   <button onClick={() => setShowForecastModal(false)} className="w-full py-5 bg-slate-900 text-white font-black text-[10px] uppercase rounded-[2rem] shadow-xl hover:bg-slate-800 active:scale-[0.98] transition-all tracking-[0.4em]">Close Projection</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Recurring Hub</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-3 italic">Establish your basal pulse of consistent impact.</p>
        </div>
        <button 
           onClick={() => setShowAddModal(true)}
           className="px-10 py-5 bg-[#1ea05f] text-white font-black rounded-[2rem] shadow-2xl shadow-green-100 hover:scale-105 transition-all flex items-center gap-3 uppercase tracking-widest text-[11px]"
        >
          <FiPlus size={18} /> New Commitment
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
           {recurringDonations.map((sub) => (
             <motion.div 
               layout
               key={sub.id}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-8 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all relative overflow-hidden"
             >
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
               
               <div className="flex justify-between items-start">
                 <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-[#1ea05f] group-hover:bg-white group-hover:shadow-inner transition-all">
                   <FiHeart size={28} />
                 </div>
                 <span className="px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 flex items-center gap-2 border border-emerald-100/50">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {sub.status}
                 </span>
               </div>

               <div>
                 <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{sub.cause}</h4>
                 <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.2em] italic">{sub.frequency} Contribution Protocol</p>
               </div>

               <div className="flex items-end justify-between pt-6 border-t border-slate-50">
                 <div>
                   <p className="text-2xl font-black text-slate-900 tracking-tighter italic">RS {sub.amount.toLocaleString()} <span className="text-slate-400 text-[10px] font-bold uppercase tracking-normal">/ month</span></p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2 bg-slate-50 w-fit px-3 py-1 rounded-lg"><FiCalendar className="text-[#1ea05f]" /> Next Pulse: {sub.nextDate}</p>
                 </div>
                 <div className="flex gap-2">
                   <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"><FiSettings /></button>
                   <button 
                     onClick={() => removePulse(sub.id)}
                     className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-400 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-sm shadow-rose-100"
                   >
                      <FiTrash2 />
                   </button>
                 </div>
               </div>
             </motion.div>
           ))}

           <motion.div 
             layout
             onClick={() => setShowAddModal(true)}
             className="bg-slate-50 border-4 border-dashed border-slate-200 p-10 rounded-[3.5rem] flex flex-col items-center justify-center gap-5 text-center cursor-pointer hover:bg-white hover:border-[#1ea05f] hover:shadow-2xl hover:shadow-green-50 transition-all group min-h-[300px]"
           >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-slate-200 group-hover:text-[#1ea05f] group-hover:shadow-2xl transition-all">
                 <FiPlus size={40} />
              </div>
              <div>
                 <h4 className="text-xl font-black text-slate-400 group-hover:text-slate-900 italic uppercase">Add Another Pulse</h4>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 max-w-[200px] mx-auto">Trigger a consistent wave of change across the globe.</p>
              </div>
           </motion.div>
        </AnimatePresence>
      </div>

      <section className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1ea05f]/20 rounded-full blur-[120px] -mr-64 -mt-64" />
         <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="space-y-6">
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#1ea05f]"><FiShield size={24}/></div>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400"><FiTrendingUp size={24}/></div>
               </div>
               <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none">The Basal Pulse Protocol</h3>
               <p className="text-slate-400 font-bold text-sm max-w-xl leading-relaxed italic">
                 Consistency is the fuel of sustainable change. By maintaining a "Pulse" contribution, you allow JPSD to plan missions with 100% financial certainty, ensuring zero aid delays.
               </p>
            </div>
            <button 
              onClick={() => setShowForecastModal(true)}
              className="px-12 py-6 bg-[#1ea05f] text-white font-black rounded-[2rem] shadow-2xl shadow-[#1ea05f]/20 hover:scale-105 active:scale-95 transition-all text-[11px] uppercase tracking-widest flex items-center gap-3 cursor-pointer"
            >
               View Operational Forecast <FiArrowRight />
            </button>
         </div>
      </section>
    </div>
  );
}
