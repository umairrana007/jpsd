'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBriefcase, FiCheckCircle, FiClock, FiAlertCircle, 
  FiFileText, FiStar, FiTrendingUp, FiSettings,
  FiZap, FiMapPin, FiCalendar, FiArrowRight, FiShield
} from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';

function ProfessionalDashboard() {
  const { language } = useLanguage();
  const { currentUserData } = useAuth();
  const isUrdu = language === 'ur';

  // Mock data for the audit demonstration
  const stats = [
    { label: isUrdu ? 'مکمل شدہ سروسز' : 'Services Completed', value: '12', icon: <FiCheckCircle />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: isUrdu ? 'فعال اسائنمنٹس' : 'Active Assignments', value: '3', icon: <FiClock />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: isUrdu ? 'پروفیشنل ریٹنگ' : 'Professional Rating', value: '4.9', icon: <FiStar />, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: isUrdu ? 'اثر کا سکور' : 'Impact Score', value: '850', icon: <FiTrendingUp />, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const services = [
    { title: 'Shariah Consultation', status: 'Active', category: 'Religious', clients: 45 },
    { title: 'Legal Aid Support', status: 'Pending Review', category: 'Legal', clients: 0 },
    { title: 'Medical Advice (Online)', status: 'Active', category: 'Healthcare', clients: 128 },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Premium Hero Header */}
      <header className="relative bg-slate-900 rounded-[3.5rem] p-12 md:p-20 overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -ml-20 -mb-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest italic">{isUrdu ? 'تصدیق شدہ پروفیشنل' : 'Verified Professional Executive'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
              {isUrdu ? 'پروفیشنل کنٹرول' : 'Expert Command'}
            </h1>
            <p className="text-slate-400 font-medium max-w-xl text-sm leading-relaxed">
              {isUrdu ? 'انسانیت کی خدمت کے لیے اپنی مہارت کا استعمال کریں۔ آپ کی خدمات کا براہ راست اثر ہو رہا ہے۔' : 'Leveraging elite expertise for humanitarian excellence. Your contribution is synchronizing with field requirements in real-time.'}
            </p>
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all text-[10px] uppercase tracking-widest flex items-center gap-3">
                {isUrdu ? 'نئی سروس شامل کریں' : 'New Service Protocol'} <FiZap />
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest">
                {isUrdu ? 'اسناد دیکھیں' : 'Credential Deck'}
              </button>
            </div>
          </div>
          
          <div className="p-10 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 text-center space-y-4">
             <div className="w-24 h-24 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center mx-auto text-emerald-500">
                <FiBriefcase size={40} />
             </div>
             <div>
                <p className="text-2xl font-black text-white italic">TIER 1</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Global Expert Rank</p>
             </div>
          </div>
        </div>
      </header>

      {/* Stats Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className={`w-16 h-16 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
              {s.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic opacity-60">{s.label}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tightest">{s.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Active Services List */}
        <div className="lg:col-span-2 bg-white rounded-[3.5rem] border border-slate-100 p-10 space-y-10 shadow-sm">
           <div className="flex justify-between items-end">
              <div>
                 <h2 className="text-2xl font-black italic uppercase tracking-tighter">Current Protocols</h2>
                 <p className="text-[10px] font-black text-slate-400 mt-1 uppercase italic tracking-widest">Active service offerings and intelligence streams</p>
              </div>
              <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">Manage All</button>
           </div>

           <div className="space-y-6">
              {services.map((item, i) => (
                <div key={i} className="group p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/40 transition-all cursor-pointer">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-inner group-hover:rotate-12 transition-transform">
                         <FiFileText size={24} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{item.category}</p>
                         <h4 className="text-xl font-black text-slate-800 italic uppercase">{item.title}</h4>
                      </div>
                   </div>
                   <div className="flex items-center gap-10 text-right">
                      <div className="hidden md:block">
                         <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Impacted</p>
                         <p className="text-lg font-black text-slate-800">{item.clients}+</p>
                      </div>
                      <div className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                         {item.status}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Tactical Requirements / Credential Status */}
        <div className="space-y-10">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
              <div className="flex justify-between items-start">
                 <h3 className="text-xl font-black italic uppercase tracking-tighter">Identity Log</h3>
                 <FiShield className="text-emerald-500" />
              </div>
              <div className="space-y-6">
                 {[
                   { label: 'Academic Verification', status: 'Verified', color: 'text-emerald-500' },
                   { label: 'Professional Licenses', status: 'Pending', color: 'text-amber-500' },
                   { label: 'Security Clearance', status: 'Active', color: 'text-blue-500' },
                 ].map((c, i) => (
                   <div key={i} className="border-l-2 border-white/10 pl-6 space-y-1">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${c.color}`}>{c.status}</p>
                      <p className="font-bold text-sm">{c.label}</p>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                 Update Credentials
              </button>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                 <FiAlertCircle className="text-amber-500" />
                 <h4 className="text-sm font-black italic uppercase">Urgent Requests</h4>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">There are 3 pending consultation requests from field units requiring your specific expertise.</p>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all">
                 Handle Queue <FiArrowRight />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfessionalDashboard, {
  allowedRoles: [UserRole.PROFESSIONAL, UserRole.ADMIN]
});
