'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiHeart, FiActivity, FiCheckCircle, FiShield, 
  FiArrowUpRight, FiZap, FiDownload, FiStar, FiClock
} from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getUserDonations, getLiveStats } from '@/lib/firebaseUtils';
import { Donation, LiveStats } from '@/types';
import Link from 'next/link';

export default function DonorDashboardClean() {
  const { language } = useLanguage();
  const { user, currentUserData } = useAuth();
  const isUrdu = language === 'ur';
  
  const [donations, setDonations] = useState<Donation[]>([]);
  const [liveStats, setLiveStats] = useState<LiveStats>({ 
    totalLivesServed: 0, 
    totalDonationsReceived: 0,
    activePrograms: 0,
    volunteersCount: 0 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [userDonations, stats] = await Promise.all([
        getUserDonations(user!.uid),
        getLiveStats()
      ]);
      setDonations(userDonations as Donation[]);
      setLiveStats((stats as LiveStats) || { 
        totalLivesServed: 0, 
        totalDonationsReceived: 0,
        activePrograms: 0,
        volunteersCount: 0 
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatedStats = {
    totalDonated: donations.reduce((acc, curr) => acc + (curr.amount || 0), 0),
    zakatTotal: donations.filter(d => d.isZakat).reduce((acc, curr) => acc + (curr.amount || 0), 0),
    impactScore: donations.length * 15,
  };

  const kpis = [
    { 
      label: isUrdu ? 'کل خدمت' : 'Total Contributed', 
      val: `PKR ${calculatedStats.totalDonated.toLocaleString()}`, 
      icon: <FiHeart />, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50' 
    },
    { 
      label: isUrdu ? 'زندگیاں متاثر' : 'Lives Impacted', 
      val: calculatedStats.impactScore.toLocaleString(), 
      icon: <FiActivity />, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      label: isUrdu ? 'زکوٰۃ ریکارڈ' : 'Zakat Record', 
      val: `PKR ${calculatedStats.zakatTotal.toLocaleString()}`, 
      icon: <FiShield />, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50' 
    },
    { 
      label: isUrdu ? 'مشن ریٹنگ' : 'Mission Rank', 
      val: 'Noble 4', 
      icon: <FiStar />, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50' 
    }
  ];

  return (
    <div className="min-h-screen space-y-12 pb-20 bg-white selection:bg-[#1ea05f]/10">
      {/* 🌿 Precise Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-8 px-10 pt-16">
         <div className="space-y-3 text-center md:text-left">
            <h1 className="text-4xl font-black text-slate-900 tracking-tightest leading-none">
               {isUrdu ? 'خوش آمدید، ' : 'Welcome, '} 
               <span className="text-[#1ea05f]">{currentUserData?.name || 'User'}</span>
            </h1>
            <p className="text-slate-400 font-medium text-base max-w-2xl leading-relaxed italic">
               {isUrdu ? 'آپ کی انسانی خدمت کا ریکارڈ یہاں محفوظ ہے۔' : 'Your humanitarian footprint is securely recorded.'}
            </p>
         </div>
         <div className="flex gap-4">
            <Link href="/welfare" className="px-10 py-5 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-emerald-500/5 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-[11px] uppercase tracking-widest leading-none">
               {isUrdu ? 'عطیہ دیں' : 'Donate Now'} <FiZap />
            </Link>
         </div>
      </header>

      {/* 📊 High-Fidelity Horizontal KPI Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
         {kpis.map((kpi, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 group hover:border-[#1ea05f]/10 hover:shadow-2xl hover:shadow-slate-200/40 transition-all min-h-[10rem]">
               <div className={`w-20 h-20 ${kpi.bg.replace('bg-', 'bg-opacity-20 bg-')} ${kpi.color} rounded-[1.75rem] flex items-center justify-center text-3xl shrink-0 transition-transform group-hover:scale-105`}>
                  {kpi.icon}
               </div>
               <div className="flex flex-col gap-1 overflow-hidden">
                  <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.25em] leading-[1.2] italic opacity-60">
                     {kpi.label.split(' ').map((word, idx) => (
                        <span key={idx} className="block">{word}</span>
                     ))}
                  </p>
                  <p className="text-4xl font-black text-slate-900 tracking-tightest truncate">{kpi.val}</p>
               </div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 px-4">
         {/* 📈 Impact Overview (Simplified) */}
         <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 p-10 space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-bold text-slate-800">{isUrdu ? 'سالانہ کارکردگی' : 'Annual Impact'}</h3>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">2026 Archive</span>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-4">
               {[40, 25, 80, 45, 60, 95, 20, 55, 75, 40, 65, 85].map((h, i) => (
                  <div key={i} className="flex-1 group relative">
                     <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        className={`w-full rounded-lg ${i === 5 ? 'bg-[#1ea05f]' : 'bg-slate-100 group-hover:bg-slate-200'} transition-all`}
                     />
                     <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* 🔔 Live Updates */}
         <div className="bg-slate-900 rounded-3xl p-10 text-white space-y-8 flex flex-col">
            <div className="flex justify-between items-center">
               <h4 className="text-lg font-bold flex items-center gap-2">
                  <FiActivity className="text-[#1ea05f]" /> {isUrdu ? 'براہ راست اپڈیٹس' : 'Live Updates'}
               </h4>
               <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-red-500">Live</span>
               </div>
            </div>
            <div className="space-y-8 flex-1 mt-6">
               {[
                  { t: isUrdu ? 'غزہ ریلیف' : 'Gaza Relief', d: isUrdu ? 'طبی سامان پہنچ گیا۔' : 'Medical supplies delivered.', s: 'Success' },
                  { t: isUrdu ? 'پروجیکٹ سیلاب' : 'Project Flood', d: isUrdu ? 'فلٹریشن پلانٹ فعال۔' : 'Filtration units active.', s: 'Ongoing' }
               ].map((log, i) => (
                  <div key={i} className="border-l-2 border-[#1ea05f]/30 pl-6 space-y-1">
                     <p className="text-xs font-bold text-[#1ea05f] uppercase tracking-widest">{log.s}</p>
                     <p className="font-bold">{log.t}</p>
                     <p className="text-xs text-white/50">{log.d}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* 📜 History Table (Professional & Clean) */}
      <div className="px-4 pb-10">
         <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
               <h4 className="text-xl font-bold text-slate-800">{isUrdu ? 'عطیات کی تاریخ' : 'Donation History'}</h4>
               <button className="text-xs font-bold text-[#1ea05f] uppercase tracking-widest hover:underline">{isUrdu ? 'مکمل رپورٹ' : 'View Full Report'}</button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                     <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="px-8 py-4">Transaction</th>
                        <th className="px-8 py-4">Cause</th>
                        <th className="px-8 py-4">Type</th>
                        <th className="px-8 py-4">Amount</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {donations.slice(0, 3).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-all">
                           <td className="px-8 py-6 text-sm font-medium text-slate-500">#{item.id?.slice(-6)}</td>
                           <td className="px-8 py-6 font-bold text-slate-800">{item.causeName || 'General Donation'}</td>
                           <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                                 item.isZakat ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                              }`}>
                                 {item.isZakat ? 'Zakat' : 'Sadaqah'}
                              </span>
                           </td>
                           <td className="px-8 py-6 font-bold text-slate-900 text-lg">PKR {item.amount}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
}
