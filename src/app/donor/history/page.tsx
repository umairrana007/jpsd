'use client';

import React, { useState } from 'react';
import { 
  FiClock, FiDownload, FiSearch, FiFilter,
  FiArrowUpRight, FiCheckCircle, FiMoreHorizontal,
  FiFileText, FiActivity, FiHeart, FiHome
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function DonorHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const historyData = [
    { id: 'TXN-9821', date: '2026-03-28', cause: 'Clean Water Initiative', amount: 25000, method: 'JazzCash', status: 'Completed' },
    { id: 'TXN-9815', date: '2026-03-15', cause: 'Syrian Emergency Relief', amount: 50000, method: 'Bank Transfer', status: 'Completed' },
    { id: 'TXN-9792', date: '2026-02-28', cause: 'Monthly General Sadaqah', amount: 5000, method: 'Credit Card', status: 'Completed' },
    { id: 'TXN-9745', date: '2026-02-10', cause: 'STEM Library Books', amount: 15000, method: 'Online Hub', status: 'Completed' },
    { id: 'TXN-9688', date: '2026-01-25', cause: 'Winter Blanket Drive', amount: 12000, method: 'JazzCash', status: 'Completed' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Giving History</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">Your journey of impact, documented and tracked.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <FiDownload /> Export PDF Statement
          </button>
        </div>
      </header>

      {/* Quick Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm group hover:bg-[#1ea05f]/5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#1ea05f]/10 flex items-center justify-center text-[#1ea05f] mb-6">
               <FiActivity size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Lifetime Contribution</p>
            <h4 className="text-3xl font-black text-slate-800 tracking-tighter italic mt-1">RS 132,000</h4>
         </div>
         <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm group hover:bg-blue-500/5 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
               <FiCheckCircle size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Total Transactions</p>
            <h4 className="text-3xl font-black text-slate-800 tracking-tighter italic mt-1">42 Deeds</h4>
         </div>
         <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-125 transition-transform"></div>
            <FiClock className="text-[#1ea05f] mb-6" size={24} />
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic mb-1">Most Recent Action</p>
            <h4 className="text-xl font-black tracking-tight italic">3 Days Ago</h4>
            <p className="text-[9px] text-[#1ea05f] font-black uppercase tracking-widest mt-2 hover:underline cursor-pointer flex items-center gap-1">View Details <FiArrowUpRight /></p>
         </div>
      </section>

      {/* History Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Legacy Ledger</h3>
               <p className="text-[10px] text-[#1ea05f] font-black uppercase tracking-widest mt-1">Every transaction is Shariah verified</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
               <div className="relative flex-1 md:flex-none">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by cause..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-[#1ea05f]/20 outline-none w-full md:w-64"
                  />
               </div>
               <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-colors">
                  <FiFilter />
               </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                      <th className="px-10 py-6 border-b border-slate-50">Transaction ID</th>
                      <th className="px-10 py-6 border-b border-slate-50">Cause / Project</th>
                      <th className="px-10 py-6 border-b border-slate-50">Amount</th>
                      <th className="px-10 py-6 border-b border-slate-50">Method</th>
                      <th className="px-10 py-6 border-b border-slate-50">Status</th>
                      <th className="px-10 py-6 border-b border-slate-50 text-right">Receipt</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {historyData.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/10 transition-all cursor-pointer group">
                         <td className="px-10 py-8">
                            <span className="font-black text-slate-400 text-[10px] uppercase tracking-widest">{row.id}</span>
                            <p className="text-[9px] text-slate-800 font-bold mt-1 uppercase italic tracking-tighter">{row.date}</p>
                         </td>
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-[#1ea05f]/10 flex items-center justify-center text-[#1ea05f]">
                                  <FiHeart size={14} />
                               </div>
                               <span className="font-black text-slate-800 text-sm italic">{row.cause}</span>
                            </div>
                         </td>
                         <td className="px-10 py-8 text-sm font-black text-slate-800 tracking-tighter">RS {row.amount.toLocaleString()}</td>
                         <td className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.method}</td>
                         <td className="px-10 py-8">
                            <span className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-start gap-2 text-emerald-500 bg-emerald-50 w-fit">
                               <FiCheckCircle /> {row.status}
                            </span>
                         </td>
                         <td className="px-10 py-8 text-right">
                            <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-[#1ea05f] hover:text-white transition-all group-hover:shadow-lg group-hover:shadow-[#1ea05f]/20">
                               <FiFileText size={18} />
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
          
          <div className="p-10 bg-slate-50/50 flex justify-center">
             <button className="text-[10px] font-black text-slate-400 hover:text-[#1ea05f] uppercase tracking-[0.2em] transition-all">
                Load More History Trace
             </button>
          </div>
      </div>
    </div>
  );
}
