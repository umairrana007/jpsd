'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiClock, FiHeart, FiFileText, FiArrowRight, 
  FiDownload, FiShare2, FiStar, FiZap,
  FiUser, FiBell, FiShield, FiGlobe,
  FiMinus, FiPlus, FiGrid, FiActivity, FiSearch, FiRefreshCw,
  FiTrendingUp, FiLayers, FiCalendar, FiArrowDown
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { generateTaxReceipt, generateBulkReceipts } from '@/lib/pdfUtils';
import { useAuth } from '@/contexts/AuthContext';
import { getUserDonations, getUserImpactMetrics, getUserRecurringDonations, ImpactMetrics } from '@/lib/firebaseUtils';
import { format, addMonths } from 'date-fns';
import dynamic from 'next/dynamic';

const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false, loading: () => <div className="h-64 bg-slate-100 animate-pulse rounded"/> });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

export default function DonorDashboardPage() {
  const { user, currentUserData } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications'>('profile');
  const [donations, setDonations] = useState<any[]>([]);
  const [impactData, setImpactData] = useState<ImpactMetrics | null>(null);
  const [recurringSubscriptions, setRecurringSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [recurringActive, setRecurringActive] = useState(true);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [donationData, metrics, subscriptions] = await Promise.all([
        getUserDonations(user!.uid),
        getUserImpactMetrics(user!.uid),
        getUserRecurringDonations(user!.uid)
      ]);
      setDonations(donationData);
      setImpactData(metrics);
      setRecurringSubscriptions(subscriptions.length > 0 ? subscriptions : [
         // Mock for demonstration if none exist yet
         { id: 'REC-001', cause: 'Global Food Crisis', amount: 5000, frequency: 'monthly', status: 'Active', nextDate: addMonths(new Date(), 1) }
      ]);
    } catch (error) {
      console.error('Dashboard Data Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = (txn: any) => {
    generateTaxReceipt({
      id: txn.id?.substring(0, 8).toUpperCase() || 'TXN-TEMP',
      donorName: currentUserData?.name || user?.displayName || 'Donor',
      email: user?.email || '',
      phone: currentUserData?.phone || '',
      amount: txn.amount,
      causeName: txn.causeTitle || 'General Fund'
    });
  };

  const totals = donations.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  
  // Mock data for impact chart
  const chartData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 2000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: 2390 },
    { name: 'Jul', amount: totals || 3490 },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* 🚀 Tactical Welcome Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0f172a] p-10 md:p-14 rounded-[4rem] text-white overflow-hidden relative shadow-2xl border border-white/5">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1ea05f]/10 rounded-full blur-[140px] -mr-64 -mt-64" />
         <div className="relative z-10 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">Aura of <span className="text-[#1ea05f]">Giving.</span></h2>
            <p className="text-slate-400 font-medium max-w-lg leading-relaxed text-sm">
               Directing resources to the most critical global flashpoints. Your legacy of compassion is active and growing.
            </p>
         </div>
         <div className="relative z-10 flex gap-6">
          <div className="relative z-10 flex gap-6">
             <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] min-w-[140px] shadow-2xl group hover:border-[#1ea05f]/40 transition-all">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1ea05f] mb-3 border-b border-[#1ea05f]/20 pb-2">Impact Score</p>
                <div className="relative">
                   <p className="text-4xl font-black italic leading-none">{impactData?.impactScore || 0}</p>
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="absolute -top-4 -right-4 w-8 h-8 bg-[#1ea05f] rounded-full flex items-center justify-center text-[10px] shadow-lg shadow-[#1ea05f]/40"
                   >
                     <FiStar />
                   </motion.div>
                </div>
             </div>
             <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] min-w-[140px] shadow-2xl group hover:border-blue-400/40 transition-all">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-3 border-b border-blue-400/20 pb-2">Lives Impacted</p>
                <p className="text-4xl font-black italic leading-none">{impactData?.livesImpacted || 0}</p>
             </div>
          </div>
         </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* 📊 Intelligence Column */}
        <div className="xl:col-span-8 space-y-10">
           
           {/* Giving Analytics Chart */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-8"
           >
              <div className="flex justify-between items-end">
                <div>
                   <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">Giving Trajectory</h3>
                   <p className="text-sm font-bold text-slate-400 mt-1">Real-time analysis of your financial deployments over time.</p>
                </div>
                <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-100">
                   {['6M', '1Y', 'ALL'].map(t => (
                      <button key={t} className={`px-5 py-2 rounded-xl text-[9px] font-black transition-all ${t === '1Y' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{t}</button>
                   ))}
                </div>
              </div>

              <div className="h-[300px] w-full mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                       <defs>
                          <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#1ea05f" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#1ea05f" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
                          dy={10}
                       />
                       <YAxis hide domain={[0, 'auto']} />
                       <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff' }}
                          itemStyle={{ color: '#1ea05f', fontWeight: 900, fontSize: '12px' }}
                       />
                       <Area type="monotone" dataKey="amount" stroke="#1ea05f" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </motion.section>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-8 group transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-[#1ea05f]" />
                  <div className="flex justify-between items-start">
                     <div className="w-12 h-12 bg-[#1ea05f]/10 rounded-2xl flex items-center justify-center text-[#1ea05f]">
                        <FiRefreshCw size={24} className={recurringActive ? 'animate-spin-slow' : ''} />
                     </div>
                     <div 
                       onClick={() => setRecurringActive(!recurringActive)}
                       className={`w-14 h-8 rounded-full relative cursor-pointer transition-colors ${recurringActive ? 'bg-[#1ea05f]' : 'bg-slate-200'}`}
                     >
                       <motion.div 
                         initial={false}
                         animate={{ x: recurringActive ? 24 : 4 }}
                         className="absolute top-1.5 w-5 h-5 bg-white rounded-full shadow-lg"
                       />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h4 className="text-xl font-black italic uppercase tracking-widest text-slate-800">Recurring Units</h4>
                        <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-widest">Active Plans: <span className="text-[#1ea05f]">{recurringSubscriptions.filter(s => s.status === 'Active').length} missions</span></p>
                     </div>
                     
                     <div className="space-y-3 max-h-[140px] overflow-y-auto pr-2 scrollbar-hide">
                        {recurringSubscriptions.map((sub) => (
                          <div key={sub.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group/sub">
                             <div>
                                <p className="text-[9px] font-black uppercase tracking-tighter text-slate-800">{sub.cause}</p>
                                <p className="text-[8px] font-bold text-slate-400">Next: {format(new Date(sub.nextDate), 'dd MMM')}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-xs font-black text-slate-900">Rs. {sub.amount.toLocaleString()}</p>
                                <button className="text-[8px] font-black text-red-400 uppercase tracking-widest hover:underline opacity-0 group-hover/sub:opacity-100 transition-opacity">Cancel</button>
                             </div>
                          </div>
                        ))}
                     </div>

                     <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-100">
                        {['monthly', 'quarterly', 'yearly'].map(f => (
                           <button 
                              key={f}
                              onClick={() => setFrequency(f as any)}
                              className={`flex-1 py-3 px-1 rounded-xl text-[8px] font-black uppercase tracking-tighter transition-all ${frequency === f ? 'bg-white text-[#1ea05f] shadow-md' : 'text-slate-400'}`}
                           >
                              {f}
                           </button>
                        ))}
                     </div>
                  </div>
               </section>

              <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[3rem] text-white space-y-8 shadow-xl shadow-blue-200 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
                  <div className="flex justify-between items-start relative z-10">
                     <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <FiLayers size={24} />
                     </div>
                     <button 
                       onClick={() => alert('Impact visualization compiled. Ready for sharing!')}
                       className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-4 py-2 rounded-full backdrop-blur-md flex items-center gap-2 hover:bg-white/40 transition-all"
                     >
                       <FiShare2 /> Share Impact
                     </button>
                  </div>
                  <div className="relative z-10">
                     <h4 className="text-2xl font-black italic uppercase tracking-tighter">Impact Portfolio</h4>
                     <p className="text-sm opacity-80 font-medium leading-tight mt-2">Your resources are currently enabling {donations.length} active missions.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 relative z-10 px-1">
                     <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                           <FiHeart className="text-red-400" />
                           <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Causes Supported</p>
                        </div>
                        <p className="text-xl font-black">{impactData?.causesCount || 0}</p>
                     </div>
                     <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                           <FiTrendingUp className="text-yellow-400" />
                           <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Impact Growth</p>
                        </div>
                        <p className="text-xl font-black">+14.2%</p>
                     </div>
                  </div>
               </section>
           </div>

           <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                 <div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">Signal Archive</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1">Immutable financial receipts and transaction telemetry.</p>
                 </div>
                  <div className="flex gap-4">
                     <button 
                       onClick={() => console.log('Initiating bulk download for', donations.length, 'receipts...')}
                       className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl"
                     >
                        <FiDownload /> Bulk Download (ZIP)
                     </button>
                  </div>
              </div>

              <div className="space-y-4">
                 {loading ? (
                   <div className="py-20 text-center animate-pulse">
                     <FiRefreshCw className="mx-auto mb-4 animate-spin text-[#1ea05f]" size={32} />
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Ledger...</p>
                   </div>
                 ) : donations.map((txn, i) => (
                    <div key={txn.id || i} className="group flex items-center gap-8 p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:border-[#1ea05f]/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all">
                       <div className="w-14 h-14 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center text-[#1ea05f] shadow-sm font-black italic">
                          {txn.type === 'Zakat' ? 'Z' : 'S'}
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center gap-3">
                             <h5 className="text-md font-black text-slate-800 uppercase tracking-tighter italic">{txn.causeTitle || 'Global Fund'}</h5>
                             <span className="w-1 h-1 bg-slate-300 rounded-full" />
                             <span className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest">{txn.status}</span>
                          </div>
                          <div className="flex items-center gap-6 mt-1">
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2"><FiCalendar size={12} /> {txn.createdAt ? format(txn.createdAt, 'dd MMM yyyy') : 'Recent'}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2"><FiActivity size={12} /> ID: {txn.id?.substring(0, 10).toUpperCase() || 'TXN-TEMP'}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-2xl font-black text-slate-900 italic tracking-tighter">PKR {txn.amount?.toLocaleString()}</p>
                          <button 
                             onClick={() => handleDownloadReceipt(txn)}
                             className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest flex items-center gap-2 justify-end mt-1 hover:underline group-hover:translate-x-1 transition-transform"
                          >
                             Generate Receipt <FiArrowRight />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        {/* 👤 Identity & Protocol Column */}
        <div className="xl:col-span-4 space-y-10">
           
           {/* Profile Management */}
           <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-10">
              <div className="flex bg-slate-100 p-2 rounded-[2rem] border border-slate-200">
                 {['Identity', 'Protocol'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setActiveTab(t.toLowerCase() as any)}
                      className={`flex-1 py-4 px-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeTab === t.toLowerCase() ? 'bg-white text-slate-800 shadow-md' : 'text-slate-400'
                      }`}
                    >
                      {t}
                    </button>
                 ))}
              </div>

              <AnimatePresence mode="wait">
                 {activeTab === 'profile' ? (
                   <motion.div key="profile" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-10">
                      <div className="relative group">
                         <div className="w-32 h-32 mx-auto rounded-[3rem] bg-slate-100 overflow-hidden shadow-2xl border-4 border-white">
                            <img src={user?.photoURL || "/images/jpsd_ambulance.jpg"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Identity" />
                         </div>
                         <button className="absolute bottom-0 right-1/2 translate-x-14 bg-slate-900 text-white p-3 rounded-2xl shadow-xl hover:bg-[#1ea05f] transition-all">
                            <FiActivity size={14} />
                         </button>
                      </div>

                      <div className="text-center space-y-1">
                         <h4 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter">{currentUserData?.name || 'Authorized Member'}</h4>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{user?.email}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                         {[
                            { label: 'Member Rank', val: currentUserData?.role || 'DONOR', icon: <FiShield /> },
                            { label: 'Active Region', val: 'Karachi, PK', icon: <FiGlobe /> },
                            { label: 'Frequency', val: frequency.toUpperCase(), icon: <FiClock /> }
                         ].map((item, i) => (
                            <div key={i} className="flex items-center gap-5 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100">
                               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                                  {item.icon}
                               </div>
                               <div>
                                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                                  <p className="text-xs font-black text-slate-800 italic">{item.val}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </motion.div>
                 ) : (
                   <motion.div key="notifications" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                       <div className="space-y-4">
                          {[
                            { title: 'Project Updates', desc: 'Secure cause milestones.', icon: <FiTrendingUp /> },
                            { title: 'Security Alerts', desc: 'Auth & billing protocols.', icon: <FiShield /> },
                            { title: 'Official feed', desc: 'HQ correspondence.', icon: <FiArrowDown /> },
                          ].map((item, i) => (
                             <div key={i} className="flex items-center gap-5 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 group cursor-pointer hover:bg-white transition-all">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1ea05f] shadow-sm">
                                   {item.icon}
                                </div>
                                <div className="flex-1">
                                   <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">{item.title}</p>
                                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
                                </div>
                                <div className="w-8 h-4 rounded-full bg-[#1ea05f] relative">
                                   <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                                </div>
                             </div>
                          ))}
                       </div>
                   </motion.div>
                 )}
              </AnimatePresence>

              <button className="w-full py-6 bg-slate-900 text-white font-black rounded-[2.5rem] shadow-2xl hover:scale-105 transition-all text-[11px] uppercase tracking-widest italic">Sync Digital Identity</button>
           </section>

           {/* Deployment Center */}
           <section className="bg-gradient-to-br from-[#1ea05f] to-green-700 p-12 rounded-[4rem] text-white space-y-8 shadow-2xl shadow-[#1ea05f]/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-1000" />
              <div className="space-y-4 relative z-10">
                 <div className="w-14 h-14 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md">
                    <FiActivity size={28} className="animate-pulse" />
                 </div>
                 <h3 className="text-3xl font-black italic uppercase tracking-tighter">Emergency Hub</h3>
                 <p className="text-sm font-medium opacity-90 leading-relaxed italic">
                    Critical flashpoints detected. Deploy immediate tactical relief assets to active humanitarian zones.
                 </p>
              </div>
              <button className="w-full py-6 bg-white text-[#1ea05f] font-black rounded-[2rem] shadow-xl text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                 Initiate Deployment <FiArrowRight />
              </button>
           </section>
        </div>
      </div>
    </div>
  );
}
