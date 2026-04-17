'use client';

import React, { useState } from 'react';
import { 
  FiClock, FiDownload, FiSearch, FiFilter,
  FiArrowUpRight, FiCheckCircle, FiMoreHorizontal,
  FiFileText, FiActivity, FiHeart, FiHome, FiTrendingUp, FiExternalLink, FiChevronRight, FiCheck, FiX, FiCamera, FiMap
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function DonorHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTxn, setSelectedTxn] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [activeUpdate, setActiveUpdate] = useState<any>(null);

  const historyData = [
    { id: 'TXN-9821', date: 'Mar 28, 2026', cause: 'Clean Water Initiative', amount: 25000, method: 'JazzCash', status: 'Impact Delivered', impact: '5+ Families provided with permanent water access.', location: 'Tharparkar, Sindh', img: 'https://images.unsplash.com/photo-1541810228801-985f4e859046?auto=format&fit=crop&w=800&q=80' },
    { id: 'TXN-9815', date: 'Mar 15, 2026', cause: 'Syrian Emergency Relief', amount: 50000, method: 'Bank Transfer', status: 'Allocated', impact: 'Medical kits dispatched to Syrian border.', location: 'Idlib Region', img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80' },
    { id: 'TXN-9792', date: 'Feb 28, 2026', cause: 'Monthly General Sadaqah', amount: 5000, method: 'Credit Card', status: 'Impact Delivered', impact: 'Food packs distributed across underserved areas.', location: 'Karachi Central', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    { id: 'TXN-9745', date: 'Feb 10, 2026', cause: 'STEM Library Books', amount: 15000, method: 'Online Hub', status: 'Verifying', impact: 'Funds being processed for book procurement.', location: 'Lahore South', img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80' },
    { id: 'TXN-9688', date: 'Jan 25, 2026', cause: 'Winter Blanket Drive', amount: 12000, method: 'JazzCash', status: 'Impact Delivered', impact: '10 Hand-woven blankets delivered.', location: 'Naran Valley', img: 'https://images.unsplash.com/photo-1544026354-52824bb36a88?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleDownload = (txnId: string) => {
    setToastMsg(`GENERATING RECEIPT FOR ${txnId}...`);
    setShowToast(true);
    setTimeout(() => {
      const content = `JPSD OFFICIAL RECEIPT\nTransaction ID: ${txnId}\nStatus: Verified\nShariah Compliant`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `JPSD_${txnId}_Receipt.txt`;
      a.click();
      setShowToast(false);
    }, 1500);
  };

  const handleViewUpdate = (item: any) => {
    setActiveUpdate(item);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      
      {/* Impact Report Modal */}
      <AnimatePresence>
        {activeUpdate && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
          >
             <motion.div 
                initial={{ y: 50, scale: 0.9 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.9 }}
                className="bg-white max-w-2xl w-full rounded-[4rem] overflow-hidden shadow-2xl border border-white/20"
             >
                <div className="relative h-64 w-full">
                   <img src={activeUpdate.img} alt="Impact" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                   <button onClick={() => setActiveUpdate(null)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"><FiX size={24}/></button>
                   <div className="absolute bottom-8 left-10">
                      <span className="px-4 py-1.5 bg-[#1ea05f] text-white text-[9px] font-black uppercase rounded-full tracking-widest">{activeUpdate.status}</span>
                      <h4 className="text-2xl font-black text-white italic uppercase mt-2">{activeUpdate.cause}</h4>
                   </div>
                </div>
                <div className="p-12 space-y-8">
                   <div className="flex justify-between items-start gap-10">
                      <div className="space-y-2">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiMap /> Mission Location</p>
                         <p className="text-lg font-black text-slate-800 italic">{activeUpdate.location}</p>
                      </div>
                      <div className="text-right space-y-2">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Allocation</p>
                         <p className="text-lg font-black text-[#1ea05f] italic">RS {activeUpdate.amount.toLocaleString()}</p>
                      </div>
                   </div>
                   <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-4">
                      <p className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest flex items-center gap-2"><FiActivity /> Action Report</p>
                      <p className="text-slate-800 font-black italic text-base leading-relaxed">{activeUpdate.impact}</p>
                   </div>
                   <button onClick={() => setActiveUpdate(null)} className="w-full py-5 bg-slate-900 text-white font-black text-[10px] uppercase rounded-3xl tracking-[0.2em] shadow-xl shadow-slate-200">Close Report</button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Impact Ledger</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-3 italic">Trace the echo of your generosity across the globe.</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => handleDownload('LEDGER-FULL')} className="px-8 py-4 bg-slate-900 text-[#1ea05f] font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-2xl flex items-center gap-2 hover:scale-105 transition-all cursor-pointer">
              <FiDownload size={16} /> Export Audit PDF
           </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
         <div className="md:col-span-8 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
               <FiActivity size={120} className="text-[#1ea05f]" />
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full">
               <div>
                  <p className="text-[10px] font-black text-[#1ea05f] uppercase tracking-[0.4em] mb-4">Cumulative Impact</p>
                  <h4 className="text-6xl font-black text-slate-900 tracking-tighter italic">RS 132,000</h4>
               </div>
               <div className="mt-10 flex items-center gap-8">
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lives Touched</span>
                     <span className="text-2xl font-black text-slate-900 italic">450+</span>
                  </div>
                  <div className="flex flex-col border-l border-slate-100 pl-8">
                     <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Missions</span>
                     <span className="text-2xl font-black text-slate-900 italic">08</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="md:col-span-4 bg-[#1ea05f] p-10 rounded-[3.5rem] text-white shadow-xl shadow-green-100 relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <FiTrendingUp size={48} className="text-white/40 mb-8" />
            <div>
               <p className="text-white/60 text-[10px] font-black uppercase tracking-widest italic mb-2">Growth Rate</p>
               <h4 className="text-4xl font-black tracking-tighter italic">+14% Growth</h4>
               <p className="text-[9px] font-bold uppercase tracking-widest mt-2 text-green-100">Against previous quarter</p>
            </div>
         </div>
      </section>

      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
          <div className="p-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-50">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#1ea05f] shadow-inner shadow-slate-200"><FiSearch /></div>
                <input 
                  type="text" placeholder="Search mission by cause or ID..." 
                  className="bg-transparent border-none outline-none font-black uppercase text-[11px] tracking-widest text-slate-800 w-64 md:w-80"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="flex gap-3">
                {['All', 'Food', 'Water', 'Medical'].map(f => (
                   <button key={f} className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${f === 'All' ? 'bg-[#1ea05f] text-white shadow-lg shadow-green-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                      {f}
                   </button>
                ))}
             </div>
          </div>

          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-slate-50">
                   {historyData.map((row) => (
                      <React.Fragment key={row.id}>
                        <tr 
                          onClick={() => setSelectedTxn(selectedTxn === row.id ? null : row.id)}
                          className={`hover:bg-slate-50/50 transition-all cursor-pointer group ${selectedTxn === row.id ? 'bg-slate-50/80' : ''}`}
                        >
                           <td className="px-10 py-10">
                              <div className="flex items-center gap-6">
                                 <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center group-hover:border-[#1ea05f] group-hover:bg-white transition-all text-slate-300 group-hover:text-[#1ea05f]">
                                    <FiActivity size={20} />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{row.id}</span>
                                    <span className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{row.cause}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">{row.date} • {row.method}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-10">
                              <div className="flex flex-col items-end gap-2">
                                 <span className="text-xl font-black text-slate-900 tracking-tighter italic">RS {row.amount.toLocaleString()}</span>
                                 <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                    row.status === 'Impact Delivered' ? 'bg-green-100 text-[#1ea05f]' : 'bg-blue-100 text-blue-500'
                                 }`}>
                                    <div className={`w-2 h-2 rounded-full ${row.status === 'Impact Delivered' ? 'bg-[#1ea05f]' : 'bg-blue-500'} animate-pulse`} />
                                    {row.status}
                                 </span>
                              </div>
                           </td>
                           <td className="px-10 py-10 text-right">
                              <div className={`transition-transform duration-300 ${selectedTxn === row.id ? 'rotate-90 text-[#1ea05f]' : 'text-slate-200'}`}>
                                 <FiChevronRight size={24} />
                              </div>
                           </td>
                        </tr>
                        
                        <AnimatePresence>
                           {selectedTxn === row.id && (
                              <motion.tr 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-slate-50/30"
                              >
                                 <td colSpan={3} className="px-20 py-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                       <div className="space-y-4">
                                          <h5 className="text-[10px] font-black uppercase text-[#1ea05f] tracking-[0.3em]">Operational Impact</h5>
                                          <p className="text-slate-800 font-black italic text-lg leading-relaxed">{row.impact}</p>
                                          <div className="flex gap-3 pt-4">
                                             <button 
                                               onClick={(e) => { e.stopPropagation(); handleDownload(row.id); }}
                                               className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[9px] font-black uppercase text-slate-600 hover:text-[#1ea05f] hover:border-[#1ea05f] transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                                             >
                                                <FiFileText /> Download Receipt
                                             </button>
                                             <button 
                                               onClick={(e) => { e.stopPropagation(); handleViewUpdate(row); }}
                                               className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[9px] font-black uppercase text-slate-600 hover:text-[#1ea05f] hover:border-[#1ea05f] transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
                                             >
                                                <FiExternalLink /> View Project Update
                                             </button>
                                          </div>
                                       </div>
                                       <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-center text-center gap-2">
                                          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto text-[#1ea05f] mb-2"><FiCheckCircle size={20}/></div>
                                          <p className="text-[9px] font-black uppercase text-slate-400 leading-none">Transaction Status</p>
                                          <p className="text-xs font-black uppercase italic text-[#1ea05f]">Audited & Verified</p>
                                          <p className="text-[7px] text-slate-300 mt-2">Hash: 0x821...abd92</p>
                                       </div>
                                    </div>
                                 </td>
                              </motion.tr>
                           )}
                        </AnimatePresence>
                      </React.Fragment>
                   ))}
                </tbody>
             </table>
          </div>

          <div className="p-12 text-center bg-slate-50/50">
             <button className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] hover:text-[#1ea05f] transition-all">
                Load Historical Data Trace
             </button>
          </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 100, x: '-50%', opacity: 0 }} animate={{ y: 0, x: '-50%', opacity: 1 }} exit={{ y: 100, x: '-50%', opacity: 0 }}
            className="fixed bottom-10 left-1/2 z-[1000] bg-slate-900 text-white px-10 py-5 rounded-[2rem] border border-white/10 shadow-2xl flex items-center gap-5 min-w-[350px]"
          >
             <div className="w-2 h-2 rounded-full bg-[#1ea05f] animate-ping" />
             <span className="text-[11px] font-black uppercase tracking-[0.2em]">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
