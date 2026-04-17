'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiSettings, FiBell, FiShield, FiLock, 
  FiGlobe, FiSmartphone, FiCheckCircle,
  FiZap, FiCheck, FiX, FiShieldOff, FiMessageSquare, FiPhone, FiCpu, FiMonitor, FiMapPin, FiClock
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

type SettingTab = 'general' | 'alerts' | 'security' | 'language';

export default function DonorSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingTab>('general');
  const [mounted, setMounted] = useState(false);
  
  // States
  const [tacticalMode, setTacticalMode] = useState(true);
  const [alerts, setAlerts] = useState({
    success: true,
    payment: true,
    weekly: false
  });

  const [channels, setChannels] = useState({
    WhatsApp: false,
    'Direct SMS': false,
    'Email Hub': true,
    Push: true
  });

  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-10 animate-pulse bg-slate-50 rounded-[3rem] min-h-[400px]" />;

  const handleChannelClick = (name: string) => {
    if (name === 'WhatsApp' && !channels.WhatsApp) {
      setIsLinking(true);
    } else {
      setChannels(prev => ({ ...prev, [name]: !prev[name as keyof typeof channels] }));
    }
  };

  const navItems = [
    { id: 'general', label: 'General Protocol', icon: FiSettings },
    { id: 'alerts', label: 'Alert Feedback', icon: FiBell },
    { id: 'security', label: 'Security Layer', icon: FiShield },
    { id: 'language', label: 'Global Localization', icon: FiGlobe },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Preferences Hub</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-3 italic">Calibrate your donor experience and operational alerts.</p>
        </div>
        <div className="flex gap-3">
           <span className="px-6 py-3 bg-white text-[#1ea05f] font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-100 shadow-sm">
              Terminal: Online
           </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-4">
           {navItems.map((item) => (
             <button 
               key={item.id}
               onClick={() => setActiveTab(item.id as SettingTab)}
               className={`w-full flex items-center justify-between px-10 py-7 rounded-[3rem] font-black text-[12px] uppercase tracking-widest transition-all border-2 ${
                 activeTab === item.id 
                  ? 'bg-[#1ea05f] text-white border-[#1ea05f] shadow-2xl shadow-green-100 translate-x-3' 
                  : 'bg-white text-slate-800 border-slate-50 hover:border-slate-200'
               }`}
             >
                <div className="flex items-center gap-5">
                   <item.icon size={22} />
                   <span>{item.label}</span>
                </div>
                {activeTab === item.id && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
             </button>
           ))}
        </div>

        <div className="lg:col-span-8">
           <div className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm min-h-[600px] relative overflow-hidden">
              
              <AnimatePresence>
                {isLinking && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-[200] bg-white/95 backdrop-blur-md flex items-center justify-center p-12"
                  >
                    <div className="max-w-md w-full text-center space-y-8">
                       <FiPhone size={40} className="mx-auto text-[#1ea05f]" />
                       <h4 className="text-2xl font-black italic uppercase text-slate-900 leading-none">Link WhatsApp</h4>
                       <input 
                         type="text" placeholder="+92 300 1234567" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)}
                         className="w-full px-8 py-6 rounded-3xl bg-slate-50 border border-slate-100 font-black text-center text-xl outline-none focus:ring-4 ring-green-100"
                       />
                       <div className="flex gap-4">
                          <button onClick={() => setIsLinking(false)} className="flex-1 py-5 bg-slate-100 rounded-3xl font-black text-[10px] uppercase">Cancel</button>
                          <button onClick={() => { if(whatsappNumber) { setChannels(prev => ({ ...prev, WhatsApp: true })); setIsLinking(false); } }} className="flex-1 py-5 bg-[#1ea05f] text-white rounded-3xl font-black text-[10px] uppercase shadow-xl">Verify & Activate</button>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                 <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    
                    {activeTab === 'general' && (
                      <div className="space-y-10">
                         <div className="flex justify-between items-center border-b border-slate-50 pb-8">
                            <h3 className="text-2xl font-black text-slate-900 italic uppercase">General Protocol</h3>
                            <FiSettings className="text-slate-200" size={32} />
                         </div>
                         <div className="p-10 bg-slate-50/50 rounded-[3.5rem] flex items-center justify-between">
                            <div>
                               <p className="text-sm font-black text-slate-800 italic uppercase">Tactical Mode</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Minimalist high-urgency rescue UI.</p>
                            </div>
                            <div 
                               onClick={() => setTacticalMode(!tacticalMode)}
                               className={`w-14 h-7 rounded-full relative p-1.5 cursor-pointer transition-all ${tacticalMode ? 'bg-[#1ea05f]' : 'bg-slate-200'}`}
                            >
                               <div className={`w-4 h-4 bg-white rounded-full transition-all ${tacticalMode ? 'translate-x-7' : 'translate-x-0'}`} />
                            </div>
                         </div>
                      </div>
                    )}

                    {activeTab === 'alerts' && (
                      <div className="space-y-12">
                         <div className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-900 italic uppercase">Operational Alerts</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                               {[
                                  { id: 'success' as const, t: 'Mission Success', s: alerts.success },
                                  { id: 'payment' as const, t: 'Payment Alerts', s: alerts.payment },
                                  { id: 'weekly' as const, t: 'Weekly Digest', s: alerts.weekly }
                               ].map((item) => (
                                  <div key={item.id} className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 flex flex-col gap-4">
                                     <span className="text-[10px] font-black uppercase text-slate-800 tracking-tight leading-none">{item.t}</span>
                                     <div 
                                        onClick={() => setAlerts(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                        className={`w-12 h-6 rounded-full relative p-1 cursor-pointer ${item.s ? 'bg-[#1ea05f]' : 'bg-slate-200'}`}
                                     >
                                        <div className={`w-4 h-4 bg-white rounded-full transition-all ${item.s ? 'translate-x-6' : 'translate-x-0'}`} />
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-8">
                            <h3 className="text-2xl font-black text-slate-900 italic uppercase">Delivery Channels</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                               {Object.entries(channels).map(([name, isActive]) => (
                                  <div 
                                    key={name} onClick={() => handleChannelClick(name)}
                                    className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col items-center gap-2 ${isActive ? 'bg-white border-[#1ea05f] shadow-lg shadow-green-50' : 'bg-slate-50 border-slate-100 opacity-60'}`}
                                  >
                                     <FiZap className={isActive ? 'text-[#1ea05f]' : 'text-slate-300'} />
                                     <span className="text-[9px] font-black uppercase leading-none">{name}</span>
                                     <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-full ${isActive ? 'bg-green-100 text-[#1ea05f]' : 'bg-slate-200 text-slate-400'}`}>
                                        {isActive ? 'Active' : 'Standby'}
                                     </span>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                    )}

                    {activeTab === 'security' && (
                       <div className="space-y-12">
                          <div className="flex justify-between items-center border-b border-slate-50 pb-8">
                             <h3 className="text-2xl font-black text-slate-900 italic uppercase">Security Protocols</h3>
                             <FiShield className="text-slate-200" size={32} />
                          </div>

                          <div className="p-10 bg-slate-900 rounded-[3.5rem] text-white flex items-center justify-between shadow-2xl relative overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-3xl group-hover:scale-150 transition-transform duration-700" />
                             <div>
                                <p className="text-sm font-black uppercase italic text-white flex items-center gap-3">
                                   <FiSmartphone /> 2-Factor Authentication
                                </p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Verification required for high-value missions.</p>
                             </div>
                             <div 
                                onClick={() => setTwoFactor(!twoFactor)}
                                className={`w-14 h-7 rounded-full relative p-1.5 cursor-pointer transition-all ${twoFactor ? 'bg-[#1ea05f]' : 'bg-white/10'}`}
                             >
                                <div className={`w-4 h-4 bg-white rounded-full transition-all ${twoFactor ? 'translate-x-7' : 'translate-x-0'}`} />
                             </div>
                          </div>

                          <div className="space-y-6">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                                <FiCpu /> Operational Devices
                             </p>
                             <div className="space-y-3">
                                {[
                                   { dev: 'iPhone 15 Pro', loc: 'Karachi, PK', current: true },
                                   { dev: 'MacBook M3 Max', loc: 'Lahore, PK', current: false },
                                ].map((device, i) => (
                                   <div key={i} className="p-8 bg-slate-50/50 border border-slate-100 rounded-[2.5rem] flex items-center justify-between">
                                      <div className="flex items-center gap-5">
                                         <div className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-400"><FiMonitor size={18}/></div>
                                         <div>
                                            <p className="text-sm font-black text-slate-800 uppercase italic leading-none">{device.dev}</p>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">{device.loc}</p>
                                         </div>
                                      </div>
                                      {device.current ? (
                                         <span className="px-4 py-1.5 bg-green-100 text-[#1ea05f] text-[7px] font-black uppercase rounded-full">Primary</span>
                                      ) : (
                                         <button className="text-[8px] font-black uppercase text-red-400 hover:text-red-500 transition-colors cursor-pointer">Terminate</button>
                                      )}
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    )}

                    {activeTab === 'language' && (
                       <div className="space-y-12">
                          <div className="flex justify-between items-center border-b border-slate-50 pb-8">
                             <h3 className="text-2xl font-black text-slate-900 italic uppercase">Global Localization</h3>
                             <FiGlobe className="text-[#1ea05f] opacity-20" size={32} />
                          </div>

                          {/* Language Selection Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             {[
                                { name: 'English', detail: 'International', code: 'US' },
                                { name: 'Urdu', detail: 'National / PK', code: 'PK' },
                                { name: 'Arabic', detail: 'GCC Region', code: 'SA' },
                             ].map((lang) => (
                                <div 
                                  key={lang.name}
                                  onClick={() => setSelectedLang(lang.name)}
                                  className={`p-10 rounded-[3.5rem] border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-1 ${selectedLang === lang.name ? 'bg-white border-[#1ea05f] shadow-2xl shadow-green-50' : 'bg-slate-50 border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-2 ${selectedLang === lang.name ? 'bg-green-100 text-[#1ea05f]' : 'bg-white text-slate-300'}`}>
                                      {lang.code === 'US' ? 'EN' : lang.code === 'PK' ? 'UR' : 'AR'}
                                   </div>
                                   <p className="text-sm font-black uppercase italic text-slate-800 leading-none">{lang.name}</p>
                                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{lang.detail}</p>
                                   {selectedLang === lang.name && <FiCheckCircle className="text-[#1ea05f] mt-4" size={20} />}
                                </div>
                             ))}
                          </div>

                          {/* Regional Info (Dynamic Detection) */}
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
                                <div className="p-4 bg-white rounded-2xl text-slate-400 shadow-sm"><FiMapPin /></div>
                                <div>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Region</p>
                                   <p className="text-[12px] font-black text-slate-800 uppercase italic">
                                      {Intl.DateTimeFormat().resolvedOptions().timeZone.includes('Karachi') ? 'South Asia (PK)' : 'Global Region Detected'}
                                   </p>
                                </div>
                             </div>
                             <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center gap-6">
                                <div className="p-4 bg-white rounded-2xl text-slate-400 shadow-sm"><FiClock /></div>
                                <div>
                                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Protocol</p>
                                   <p className="text-[12px] font-black text-slate-800 uppercase italic">
                                      GMT {new Date().getTimezoneOffset() / -60 >= 0 ? '+' : ''}{new Date().getTimezoneOffset() / -60} ({Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop()?.replace('_', ' ')})
                                   </p>
                                </div>
                             </div>
                          </div>
                       </div>
                    )}
                 </motion.div>
              </AnimatePresence>
           </div>

           <div className="mt-8 flex justify-end gap-5">
              <button className="px-10 py-5 bg-white text-slate-800 hover:text-red-500 hover:border-red-200 font-black text-[10px] uppercase rounded-3xl border border-slate-200 transition-all cursor-pointer">
                 Reset System
              </button>
              <button className="px-12 py-5 bg-[#1ea05f] text-white font-black text-[10px] uppercase rounded-3xl shadow-xl hover:shadow-green-200 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                 Save Preferences
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
