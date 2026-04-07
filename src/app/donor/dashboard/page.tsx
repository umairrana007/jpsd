'use client';

import React, { useState } from 'react';
import { FiClock, FiHeart, FiFileText, FiArrowRight, 
  FiDownload, FiShare2, FiStar, FiZap,
  FiUser, FiBell, FiShield, FiGlobe,
  FiMinus, FiPlus, FiGrid, FiActivity, FiSearch, FiRefreshCw
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { generateTaxReceipt } from '@/lib/pdfUtils';
import { useAuth } from '@/contexts/AuthContext';
import { getUserDonations } from '@/lib/firebaseUtils';
import { useEffect } from 'react';
import { format } from 'date-fns';

export default function DonorDashboardPage() {
  const { user, currentUserData } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications'>('profile');
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDonations();
    }
  }, [user]);

  const fetchDonations = async () => {
    setLoading(true);
    const data = await getUserDonations(user!.uid);
    setDonations(data);
    setLoading(false);
  };

  const totals = donations.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const livesSustained = Math.ceil(totals / 2000); // Metric: ~2000 PKR sustains a life/ration pack

  const handleDownloadReceipt = (txn: any) => {
    generateTaxReceipt({
      id: txn.id.substring(0, 8).toUpperCase(),
      donorName: currentUserData?.name || user?.displayName || 'Donor',
      email: user?.email || '',
      phone: currentUserData?.phone || '',
      amount: txn.amount,
      causeName: txn.causeTitle || 'General Fund'
    });
  };

  const handleExportCSV = () => {
    if (donations.length === 0) return;
    
    const headers = ['ID', 'Cause', 'Amount', 'Status', 'Date', 'Type'];
    const rows = donations.map(d => [
      d.id,
      d.causeTitle || 'General',
      d.amount,
      d.status,
      d.createdAt ? format(d.createdAt, 'MMM d, yyyy') : 'N/A',
      d.type || 'Sadaqah'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers, ...rows].map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Donations_${user?.uid.substring(0, 5)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-10">
      {/* Hero Welcome Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-br from-slate-900 to-slate-800 p-10 md:p-14 rounded-[4rem] text-white overflow-hidden relative shadow-2xl">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1ea05f]/20 rounded-full blur-[140px] -mr-64 -mt-64" />
         <div className="relative z-10 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">Welcome, <span className="text-[#1ea05f]">Humanitarian.</span></h2>
            <p className="text-slate-400 font-medium max-w-lg leading-relaxed">
              Your dedication to global welfare has direct impact on thousands of lives. Explore your heritage of giving below.
            </p>
         </div>
         <div className="relative z-10 flex gap-6 mt-4 md:mt-0">
             <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] min-w-[120px] shadow-2xl shadow-black/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1ea05f] mb-3 border-b border-[#1ea05f]/20 pb-2">Lives Sustained</p>
                <p className="text-3xl font-black italic leading-none">{livesSustained}</p>
             </div>
             <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] min-w-[120px] shadow-2xl shadow-black/20">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3 border-b border-blue-400/20 pb-2">Impact Score</p>
                <p className="text-3xl font-black italic leading-none">{(donations.length * 0.5).toFixed(1)}</p>
             </div>
         </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Left Column: Stats & History */}
        <div className="xl:col-span-7 space-y-10">
           
           {/* Giving Trajectory Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-6 group hover:border-[#1ea05f] transition-all">
                 <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <FiHeart size={24} />
                 </div>
                 <div>
                    <h4 className="text-xl font-black italic uppercase tracking-widest text-slate-800">Recurring Core</h4>
                    <p className="text-sm font-medium text-slate-500 mt-1">Active monthly commitment to humanitarian causes.</p>
                 </div>
                 <p className="text-3xl font-black text-slate-900">PKR 15,000 / mo</p>
                 <button className="flex items-center gap-2 text-[10px] font-black text-[#1ea05f] uppercase tracking-widest hover:translate-x-1 transition-transform">Optimize Subscription <FiArrowRight /></button>
              </div>

              <div className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-6 group hover:border-blue-500 transition-all">
                 <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <FiStar size={24} />
                 </div>
                 <div>
                    <h4 className="text-xl font-black italic uppercase tracking-widest text-slate-800">Total Legacy</h4>
                    <p className="text-sm font-medium text-slate-500 mt-1">Accumulated life-time contributions.</p>
                 </div>
                  <p className="text-3xl font-black text-slate-900">PKR {totals.toLocaleString()}</p>
                 <button className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:translate-x-1 transition-transform">View Full Summary <FiArrowRight /></button>
              </div>
           </div>

           {/* Recent Transactions Table */}
           <section className="bg-white/70 backdrop-blur-md p-12 rounded-[3.5rem] border border-white shadow-sm space-y-8">
              <div className="flex justify-between items-end">
                 <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">Sacred Transactions</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1">Your recent financial contributions to the foundation.</p>
                 </div>
                  <button 
                    onClick={handleExportCSV}
                    disabled={donations.length === 0}
                    className="px-6 py-3 border border-slate-200 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-white transition-all disabled:opacity-30"
                  >
                    Consolidated CSV
                  </button>
              </div>

               <div className="space-y-4">
                {loading ? (
                  <div className="py-20 text-center animate-pulse">
                    <FiRefreshCw className="mx-auto mb-4 animate-spin text-[#1ea05f]" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing with HQ...</p>
                  </div>
                ) : donations.length > 0 ? (
                  donations.map((txn, i) => (
                    <div key={txn.id || i} className="flex items-center gap-6 p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/20 transition-all group animate-in fade-in slide-in-from-bottom-2">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs ${txn.type === 'Zakat' ? 'bg-[#1ea05f]/10 text-[#1ea05f]' : 'bg-blue-500/10 text-blue-500'}`}>
                          {(txn.type || 'S')[0]}
                       </div>
                       <div className="flex-1">
                          <p className="text-sm font-black text-slate-800 italic uppercase truncate max-w-[180px]">{txn.causeTitle || 'General Fund'}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                            {txn.createdAt ? format(txn.createdAt, 'MMM d, yyyy') : 'Recently'}
                          </p>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-black text-slate-800 italic">PKR {txn.amount?.toLocaleString()}</p>
                          <span className={`text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${txn.status === 'verified' || txn.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                             {txn.status}
                          </span>
                       </div>
                       <button 
                          onClick={() => handleDownloadReceipt(txn)}
                          className="w-10 h-10 border border-slate-200 text-slate-400 rounded-xl flex items-center justify-center hover:bg-[#1ea05f] hover:text-white transition-all group-hover:scale-105"
                        >
                          <FiDownload />
                       </button>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
                    <FiHeart className="mx-auto mb-4 text-slate-200" size={48} />
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No transactions recorded yet.</p>
                    <button className="mt-4 text-[#1ea05f] font-black text-[10px] uppercase tracking-widest hover:underline italic">Initialize first impact</button>
                  </div>
                )}
              </div>
           </section>
        </div>

        {/* Right Column: Settings & Support */}
        <div className="xl:col-span-5 space-y-10">
           
           {/* Profile & Settings Card */}
           <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
              <div className="flex bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200">
                 <button 
                   onClick={() => setActiveTab('profile')}
                   className={`flex-1 py-4 px-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                     activeTab === 'profile' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'
                   }`}
                 >
                   Identity Portal
                 </button>
                 <button 
                   onClick={() => setActiveTab('notifications')}
                   className={`flex-1 py-4 px-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                     activeTab === 'notifications' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'
                   }`}
                 >
                   Protocol Feed
                 </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'profile' ? (
                  <motion.div 
                    key="profile"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                     <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-400 font-black text-2xl shadow-xl overflow-hidden group cursor-pointer relative">
                           <img src="/images/jpsd_ambulance.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Identity" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-all">MOD</div>
                        </div>
                        <div>
                           <h4 className="text-xl font-black text-slate-800 italic tracking-tighter uppercase leading-none">Muhammad Umair</h4>
                           <span className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest mt-2 block italic">Member Since: 2024 Gen-01</span>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Language Preferred</label>
                           <div className="flex gap-4">
                              <button className="flex-1 py-4 bg-[#1ea05f] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#1ea05f]/20">English (GLOBAL)</button>
                              <button className="flex-1 py-4 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest urdu-text tracking-normal">اردو (پاکستانی)</button>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Global Directive</label>
                           <div className="relative group">
                              <FiGlobe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                              <input type="text" readOnly value="Karachi, Pakistan (Region-01)" className="w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 text-xs focus:ring-0" />
                           </div>
                        </div>
                     </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="notifications"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                     <div className="flex flex-col gap-4">
                        {[
                          { title: 'Project Updates', desc: 'Alert me on cause milestones.', active: true },
                          { title: 'Payment Alerts', desc: 'Secure billing & renewal data.', active: true },
                          { title: 'Direct Messages', desc: 'HQ correspondence feed.', active: false },
                        ].map((item, i) => (
                           <div key={i} className="flex justify-between items-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100 group">
                              <div>
                                 <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1 italic">{item.title}</p>
                                 <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
                              </div>
                              <div className={`w-10 h-6 rounded-full relative cursor-pointer ${item.active ? 'bg-[#1ea05f]' : 'bg-slate-200'}`}>
                                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group relative overflow-hidden">
                 <FiZap className="text-[#1ea05f]" />
                 <span className="relative z-10 italic uppercase tracking-widest">Update Identity Core</span>
              </button>
           </section>

           {/* Emergency Giving Pulse */}
           <section className="bg-gradient-to-br from-[#1ea05f] to-green-700 p-12 rounded-[4rem] text-white space-y-8 shadow-2xl shadow-[#1ea05f]/20 relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500" />
              <div className="space-y-4">
                 <FiActivity size={32} className="animate-pulse" />
                 <h3 className="text-2xl font-black italic uppercase tracking-tighter">Emergency Hub</h3>
                 <p className="text-sm font-medium opacity-80 leading-relaxed">
                   2 Critical Humanitarian Flashpoints detected. Deploy immediate relief assets to Palestine and Sudan.
                 </p>
              </div>
              <button className="w-full py-5 bg-white text-[#1ea05f] font-black rounded-[2rem] shadow-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Launch Intervention <FiArrowRight className="inline ml-2" /></button>
           </section>
        </div>
      </div>
    </div>
  );
}

