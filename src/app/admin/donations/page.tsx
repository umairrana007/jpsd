'use client';

import React, { useState, useMemo } from 'react';
import { 
  FiDollarSign, FiFilter, FiDownload, FiPlus, 
  FiSearch, FiCheckCircle, FiClock, FiCreditCard, 
  FiPieChart, FiTrendingUp, FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';

const initialDonationsData = [
  { id: 'TRX-94821', donor: 'Haris Khan', cause: 'Clean Water', amount: 2500, date: '12 Oct, 2026', method: 'JazzCash', status: 'Verified' },
  { id: 'TRX-82133', donor: 'Sarah Ahmed', cause: 'Education', amount: 450, date: '14 Oct, 2026', method: 'Visa Card', status: 'Pending' },
  { id: 'TRX-77210', donor: 'Zain Malik', cause: 'Food Security', amount: 1200, date: '15 Oct, 2026', method: 'EasyPaisa', status: 'Verified' },
  { id: 'TRX-65412', donor: 'Ali Raza', cause: 'Healthcare', amount: 3000, date: '18 Oct, 2026', method: 'Bank Transfer', status: 'Verified' },
];

function AdminDonationsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);

  const filteredData = useMemo(() => {
    return initialDonationsData.filter(trx => {
      const matchesFilter = activeFilter === 'All' || trx.status === activeFilter;
      const matchesSearch = trx.donor.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           trx.cause.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const exportToCSV = () => {
    const headers = ['ID', 'Donor', 'Cause', 'Amount', 'Date', 'Method', 'Status'];
    const rows = filteredData.map(d => [d.id, d.donor, d.cause, `$${d.amount}`, d.date, d.method, d.status]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `JPSD_Donations_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Donations Management</h2>
          <p className="text-slate-500 font-medium tracking-tight">Monitor and verify all incoming charity funds.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-5 py-3 bg-white text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-xl border border-slate-200 hover:bg-slate-50 shadow-sm transition-all whitespace-nowrap"
          >
            <FiDownload />
            <span>Export Data</span>
          </button>
          <button 
            onClick={() => setShowManualEntry(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-[#1ea05f]/20 hover:opacity-90 transition-all whitespace-nowrap"
          >
            <FiPlus />
            <span>Add Manual Entry</span>
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Donations', value: '$842,500', trend: '+12%', color: 'text-[#1ea05f]' },
          { label: 'Avg Donation', value: '$124.50', trend: 'Trending', color: 'text-blue-500' },
          { label: 'Zakat Fund', value: '$312,000', trend: 'Active', color: 'text-amber-500' },
          { label: 'Pending Verif.', value: '28', trend: '14 New', color: 'text-red-500' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between h-36 relative overflow-hidden group">
            <div className="flex justify-between items-start">
               <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{kpi.label}</span>
               <span className={`${kpi.color} bg-slate-50 text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-100 uppercase tracking-widest`}>{kpi.trend}</span>
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tighter italic">{kpi.value}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-white shadow-sm flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px] relative">
                 <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   type="text" 
                   placeholder="Search by name or Transaction ID..." 
                   className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#1ea05f]/20 font-medium" 
                 />
              </div>
              <div className="flex gap-2">
                 {['All', 'Verified', 'Pending'].map(f => (
                   <button 
                     key={f}
                     onClick={() => setActiveFilter(f)}
                     className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                       activeFilter === f ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 border border-slate-100'
                     }`}
                   >
                     {f}
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-white/70 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="px-8 py-6">Donor Info</th>
                          <th className="px-8 py-6">Mission / Cause</th>
                          <th className="px-8 py-6 text-right">Amount / Date</th>
                          <th className="px-8 py-6">Audit Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {filteredData.length > 0 ? filteredData.map((trx, idx) => (
                         <tr key={idx} className="group hover:bg-slate-50/50 transition-all cursor-pointer">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#1ea05f] font-black text-xs shadow-sm">{trx.donor.charAt(0)}</div>
                                  <div>
                                     <p className="text-sm font-black text-slate-800">{trx.donor}</p>
                                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{trx.id}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <span className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100">
                                  {trx.cause}
                               </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <p className="text-base font-black text-slate-800 tracking-tighter italic">${trx.amount.toLocaleString()}</p>
                               <p className="text-[10px] text-slate-400 font-bold">{trx.date}</p>
                            </td>
                            <td className="px-8 py-6">
                               <div className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${trx.status === 'Verified' ? 'text-[#1ea05f]' : 'text-amber-500'}`}>
                                  <span className={`w-2 h-2 rounded-full ${trx.status === 'Verified' ? 'bg-[#1ea05f]' : 'bg-amber-500 animate-pulse'}`}></span>
                                  {trx.status}
                               </div>
                            </td>
                         </tr>
                       )) : (
                         <tr><td colSpan={4} className="py-10 text-center text-slate-400 font-black uppercase tracking-widest">No entries match your filter</td></tr>
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Funding Sources</h4>
              <div className="flex items-center justify-center mb-10 h-48 relative">
                 <div className="w-40 h-40 rounded-full border-[12px] border-slate-50 border-t-[#1ea05f] border-r-blue-500 flex items-center justify-center">
                    <span className="text-2xl font-black italic text-slate-800">85%</span>
                 </div>
              </div>
              <div className="space-y-4">
                 {[
                   { label: 'E-Wallets', value: '65%', color: 'bg-[#1ea05f]' },
                   { label: 'Bank Wire', value: '25%', color: 'bg-blue-500' },
                   { label: 'Cash Entry', value: '10%', color: 'bg-slate-300' },
                 ].map((src, i) => (
                   <div key={i} className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${src.color}`}></span>
                         <span className="text-slate-500">{src.label}</span>
                      </div>
                      <span className="text-slate-800">{src.value}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {showManualEntry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-3xl relative"
            >
               <button onClick={() => setShowManualEntry(false)} className="absolute top-8 right-8 p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-red-500 transition-all"><FiX size={20} /></button>
               <h3 className="text-2xl font-black text-slate-800 mb-2 italic uppercase tracking-tighter">Manual Donation Log</h3>
               <p className="text-slate-500 mb-8 font-medium">Record a cash or walk-in donation into the system.</p>
               
               <div className="space-y-6">
                  <div>
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Donor Full Name</label>
                     <input type="text" placeholder="e.g. Ahmad Abdullah" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#1ea05f]/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Amount ($)</label>
                        <input type="number" placeholder="0.00" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#1ea05f]/20" />
                     </div>
                     <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Reference</label>
                        <input type="text" placeholder="Manual-ID" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#1ea05f]/20" />
                     </div>
                  </div>
                  <button className="w-full py-5 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 uppercase tracking-widest text-xs hover:opacity-90 transition-all">
                     Confirm and Record
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withAuth(AdminDonationsPage, { 
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.VIEWER] 
});
