'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiZap, FiSettings, FiBell, FiShield, FiGlobe, FiUsers, FiBarChart2, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { getUserImpactMetrics, ImpactMetrics } from '@/lib/firebaseUtils';

type MainTab = 'overview' | 'preferences';
type PrefTab = 'general' | 'alerts' | 'security' | 'language';

export default function DonorDashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [impactData, setImpactData] = useState<ImpactMetrics | null>(null);
  
  const [mainTab, setMainTab] = useState<MainTab>('overview');
  const [prefTab, setPrefTab] = useState<PrefTab>('general');
  const [tacticalMode, setTacticalMode] = useState(true);
  const [alerts, setAlerts] = useState({
    success: true,
    payment: true,
    weekly: false
  });

  useEffect(() => {
    setMounted(true);
    if (user) {
      getUserImpactMetrics(user.uid).then(setImpactData);
    }
  }, [user]);

  if (!mounted) return <div className="p-10 animate-pulse bg-slate-50 min-h-[400px] rounded-[3rem]" />;

  return (
    <div className="space-y-12 pb-20">
      {/* Tab Switcher */}
      <div className="flex items-center gap-4 relative z-50">
        <button 
          onClick={() => setMainTab('overview')}
          className={`px-10 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${mainTab === 'overview' ? 'bg-[#1ea05f] text-white shadow-xl' : 'bg-white text-slate-800 border border-slate-200'}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setMainTab('preferences')}
          className={`px-10 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${mainTab === 'preferences' ? 'bg-[#1ea05f] text-white shadow-xl' : 'bg-white text-slate-800 border border-slate-200'}`}
        >
          Preferences
        </button>
      </div>

      {mainTab === 'overview' ? (
        <div className="space-y-10">
          <h2 className="text-7xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Aura of Giving</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Impact Score', val: impactData?.impactScore || '8,420', icon: <FiZap />, color: 'text-amber-500' },
              { label: 'Lives Affected', val: impactData?.livesImpacted || '1,240', icon: <FiUsers />, color: 'text-blue-500' },
              { label: 'Total Contribution', val: `$${impactData?.totalDonated || '42,500'}`, icon: <FiBarChart2 />, color: 'text-[#1ea05f]' }
            ].map((m, i) => (
              <div key={i} className="bg-white rounded-[3.5rem] border border-slate-200 p-12 flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
                  <p className="text-5xl font-black italic tracking-tighter text-slate-900">{m.val}</p>
                </div>
                <div className={`w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center ${m.color} text-3xl`}>{m.icon}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <h2 className="text-7xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Calibration</h2>
          <div className="bg-white rounded-[4rem] border border-slate-200 p-10 flex flex-col md:flex-row gap-10 shadow-sm">
            {/* Sidebar Buttons - No Animations to prevent click blocking */}
            <div className="md:w-[350px] flex flex-col gap-4 relative z-[100]">
              {[
                { id: 'general', label: 'General Protocol', icon: <FiSettings /> },
                { id: 'alerts', label: 'Alert Feedback', icon: <FiBell /> },
                { id: 'security', label: 'Security Layer', icon: <FiShield /> },
                { id: 'language', label: 'Global Localization', icon: <FiGlobe /> }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setPrefTab(item.id as PrefTab)}
                  className={`flex items-center gap-6 px-10 py-8 rounded-[3rem] text-[12px] font-black uppercase tracking-widest transition-all w-full text-left border-2 ${
                    prefTab === item.id 
                      ? 'bg-[#1ea05f] text-white border-[#1ea05f] shadow-2xl translate-x-3' 
                      : 'bg-white text-slate-800 border-slate-50 hover:border-slate-200'
                  }`}
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                  {prefTab === item.id && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-slate-50/50 rounded-[3.5rem] p-16 border border-slate-100 min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={prefTab} 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {prefTab === 'general' && (
                    <div className="space-y-10">
                       <h4 className="text-3xl font-black italic uppercase text-slate-900 leading-none">General Interface</h4>
                       <div className="space-y-6">
                          <div className="p-10 bg-white rounded-[3rem] flex justify-between items-center shadow-sm">
                             <div className="max-w-[70%]">
                                <span className="text-sm font-black uppercase text-slate-800 italic">Tactical Mode</span>
                                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Focus exclusively on high-urgency emergency missions.</p>
                             </div>
                             <div 
                                onClick={() => setTacticalMode(!tacticalMode)}
                                className={`w-14 h-7 rounded-full relative p-1.5 cursor-pointer transition-all ${tacticalMode ? 'bg-[#1ea05f]' : 'bg-slate-200'}`}
                             >
                                <div className={`w-4 h-4 bg-white rounded-full transition-all ${tacticalMode ? 'translate-x-7' : 'translate-x-0'}`} />
                             </div>
                          </div>
                       </div>
                    </div>
                  )}
                  {prefTab === 'alerts' && (
                    <div className="space-y-10">
                       <h4 className="text-3xl font-black italic uppercase text-slate-900 leading-none">Alert Feedback</h4>
                       <div className="space-y-5">
                          {[
                             { id: 'success' as const, title: 'Project Success Flashes', desc: 'Instant alerts when a cause hits 100% goal.' },
                             { id: 'payment' as const, title: 'Tactical Payment Alerts', desc: 'Secure confirmation for every donation.' },
                             { id: 'weekly' as const, title: 'Weekly Mission Digest', desc: 'Consolidated report of your global deeds.' },
                          ].map((pref) => (
                             <div key={pref.id} className="p-10 bg-white rounded-[3rem] border border-slate-100 flex items-center justify-between shadow-sm">
                                <div className="max-w-[70%]">
                                   <p className="text-sm font-black uppercase text-slate-800 italic">{pref.title}</p>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 leading-relaxed">{pref.desc}</p>
                                </div>
                                <div 
                                   onClick={() => setAlerts(prev => ({ ...prev, [pref.id]: !prev[pref.id] }))}
                                   className={`w-14 h-7 rounded-full relative p-1.5 cursor-pointer transition-all ${alerts[pref.id] ? 'bg-[#1ea05f]' : 'bg-slate-200'}`}
                                >
                                   <div className={`w-4 h-4 bg-white rounded-full transition-all ${alerts[pref.id] ? 'translate-x-7' : 'translate-x-0'}`} />
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                  )}
                  {prefTab === 'security' && (
                    <div>
                       <h4 className="text-3xl font-black italic uppercase text-slate-900 mb-8">Security Layer</h4>
                       <div className="p-10 bg-white rounded-[3rem] flex items-center gap-6 shadow-sm border border-blue-50">
                          <FiShield className="text-blue-500" size={32} />
                          <span className="text-xs font-black uppercase">Encryption Protocol v4.0 Active</span>
                       </div>
                    </div>
                  )}
                  {prefTab === 'language' && (
                    <div className="grid grid-cols-1 gap-4">
                       <h4 className="text-3xl font-black italic uppercase text-slate-900 mb-6">Localization</h4>
                       {['English', 'Urdu', 'Arabic'].map(lang => (
                          <div key={lang} className="p-8 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-between font-black text-[10px] uppercase">
                             {lang} {lang === 'English' && <FiCheck className="text-[#1ea05f]" />}
                          </div>
                       ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
