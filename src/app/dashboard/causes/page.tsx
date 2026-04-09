'use client';

import React, { useState, useEffect } from 'react';
import { FiExternalLink, FiShare2, FiTrendingUp, FiHeart, FiGlobe, FiTarget, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getCauses } from '@/lib/firebaseUtils';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Cause } from '@/types';

export default function MyCausesPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isUrdu = language === 'ur';
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCauses();
  }, []);

  const fetchCauses = async () => {
    setLoading(true);
    try {
      const data = await getCauses();
      // For now, we'll show "Recommended" or "Followed" causes.
      // In a real app, we'd filter by user.uid in a 'followed_causes' collection.
      setCauses(data.slice(0, 3)); 
    } catch (error) {
      console.error('Error fetching causes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-slate-100 pb-12">
         <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#1ea05f] font-black text-[10px] uppercase tracking-[0.4em]">
               <FiTarget /> Global Directive Portfolio
            </div>
            <h1 className="text-6xl font-black text-slate-800 tracking-tighter italic uppercase leading-none">
               {isUrdu ? 'محفوظ کردہ مہمات' : 'Mission Archives'}
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-relaxed">Active Humanitarian Campaigns Verified by the JPSD Shariah Board.</p>
         </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {causes.map((cause, idx) => (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: idx * 0.1 }}
             key={cause.id} 
             className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-[#1ea05f]/5 hover:border-[#1ea05f]/20 transition-all duration-700"
           >
              <div className="h-64 bg-slate-100 relative overflow-hidden">
                 <Image 
                   src={cause.image || '/images/jpsd_health.jpg'} 
                   alt={cause.title}
                   fill
                   loading="lazy"
                   sizes="(max-width: 768px) 100vw, 33vw"
                   className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                 <div className="absolute top-8 left-8 bg-white/20 backdrop-blur-xl px-6 py-2 rounded-2xl text-[9px] font-black text-white uppercase tracking-widest border border-white/20 shadow-xl">
                    {cause.category || 'Humanitarian'}
                 </div>
                 <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em] mb-1 italic">Mission Status</p>
                    <p className="text-white text-xs font-black uppercase tracking-widest italic">{cause.active ? 'Active Deployment' : 'Mission Completed'}</p>
                 </div>
              </div>
              <div className="p-10 flex flex-col flex-1 space-y-8">
                 <h3 className="text-2xl font-black text-slate-800 tracking-tightest italic uppercase leading-tight group-hover:text-[#1ea05f] transition-colors">{cause.title}</h3>
                 
                 <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact Velocity</p>
                          <p className="text-xl font-black text-slate-800 italic uppercase">{(cause.raisedAmount / cause.goalAmount * 100).toFixed(0)}% <span className="text-xs text-[#1ea05f] font-bold">READY</span></p>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Target Asset</p>
                          <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">${cause.goalAmount?.toLocaleString()}</p>
                       </div>
                    </div>
                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${(cause.raisedAmount / cause.goalAmount * 100)}%` }}
                         transition={{ duration: 1.5, ease: "circOut" }}
                         className="h-full bg-gradient-to-r from-[#1ea05f] to-[#34d399] rounded-full shadow-[0_0_15px_rgba(30,160,95,0.3)]"
                       ></motion.div>
                    </div>
                 </div>

                 <div className="mt-auto pt-4 flex gap-4">
                    <button className="w-14 h-14 bg-slate-50 text-slate-300 hover:text-[#1ea05f] border border-slate-100 rounded-2xl font-black transition-all flex items-center justify-center active:scale-95">
                       <FiShare2 size={18} />
                    </button>
                    <Link href={`/welfare/causes/${cause.id}`} className="flex-1 h-14 bg-white text-[#1ea05f] hover:bg-slate-950 hover:text-white border border-[#1ea05f]/20 rounded-2xl font-black transition-all flex items-center justify-center gap-3 uppercase text-[10px] tracking-[0.2em] shadow-sm hover:shadow-xl active:scale-95">
                       <span>Intelligence</span>
                       <FiArrowRight strokeWidth={3} />
                    </Link>
                 </div>
              </div>
           </motion.div>
         ))}
      </section>

      {/* Global Outreach Call to Action */}
      <div className="p-16 bg-slate-950 rounded-[4rem] text-white flex flex-col xl:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
         <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#1ea05f]/5 rounded-full blur-[100px]"></div>
         <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-12 grid-rows-12 h-full w-full opacity-20 capitalize text-[8px] font-black tracking-widest select-none">
               {Array.from({length: 144}).map((_, i) => <div key={i} className="flex items-center justify-center border-[0.5px] border-white/5">JPSD</div>)}
            </div>
         </div>
         
         <div className="relative z-10 max-w-xl text-center xl:text-left">
            <h4 className="text-4xl font-black mb-4 italic uppercase tracking-tighter leading-none">Expand Your Humanitarian Reach</h4>
            <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Identify active flashpoints and deploy aid resources where they are critically mandated.</p>
         </div>
         <Link href="/welfare" className="relative z-10 px-12 py-5 bg-[#1ea05f] text-white font-black rounded-2xl shadow-[0_20px_50px_rgba(30,160,95,0.3)] hover:scale-105 transition-all uppercase text-[11px] tracking-[0.3em] flex items-center gap-4">
            <FiGlobe strokeWidth={3} /> Discover Active Missions
         </Link>
      </div>

    </div>
  );
}

