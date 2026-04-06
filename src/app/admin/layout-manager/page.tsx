'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { motion } from 'framer-motion';
import { 
  FiLayout, FiEye, FiSave, FiCheck, 
  FiRefreshCw, FiAlertCircle, FiType, 
  FiMonitor, FiSmartphone, FiTable
} from 'react-icons/fi';
import { updateSiteSettings } from './actions';
import { getGlobalConfig, SiteSettings } from '@/lib/settings';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';

function LayoutManagerPage() {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<SiteSettings>({
    showHero: true,
    heroTitleEn: '',
    heroTitleUr: '',
    primaryColor: '#1ea05f',
    secondaryColor: '#3b82f6',
    livesServed: 0,
    donationsReceived: 0,
    volunteersCount: 0,
    programsCount: 0,
  });

  useEffect(() => {
    async function init() {
      // Note: In client component we fetch normally (bypassing server-only cache logic where possible)
      // but for this demo/preview, we'll just read from our settings helper
      const config = await getGlobalConfig();
      setSettings(config);
      setLoading(false);
    }
    init();
  }, []);

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    
    startTransition(async () => {
      const result = await updateSiteSettings({
        showHero: settings.showHero,
        heroTitleEn: settings.heroTitleEn || '',
        heroTitleUr: settings.heroTitleUr || '',
        primaryColor: settings.primaryColor || '#1ea05f',
        secondaryColor: settings.secondaryColor || '#3b82f6',
        livesServed: Number(settings.livesServed) || 0,
        donationsReceived: Number(settings.donationsReceived) || 0,
        volunteersCount: Number(settings.volunteersCount) || 0,
        programsCount: Number(settings.programsCount) || 0,
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.message);
      }
    });
  };

  if (loading) return (
     <div className="min-h-[400px] flex items-center justify-center">
        <FiRefreshCw className="animate-spin text-[#1ea05f] text-4xl" />
     </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Layout Orchestrator</h2>
          <p className="text-slate-500 font-medium">Toggle sections and manage public layout nodes across the platform.</p>
        </div>
        <div className="flex gap-4">
          <button 
             onClick={handleSave}
             disabled={isPending}
             className="px-8 py-4 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center gap-2 group disabled:opacity-50"
          >
            {isPending ? <FiRefreshCw className="animate-spin" /> : (success ? <FiCheck /> : <FiSave />)} 
            {isPending ? 'Propagating Changes...' : (success ? 'Published & Cached' : 'Publish Changes')}
          </button>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 font-bold animate-pulse">
           <FiAlertCircle /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-8">
           {/* Section Toggles */}
           <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500">
                  <FiLayout size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Active Layout Nodes</h3>
              </div>

              <div className="space-y-6">
                 {/* Hero Section Toggle */}
                 <div className="flex items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:bg-white transition-all hover:shadow-xl hover:shadow-slate-200/20">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#1ea05f] transition-all shadow-sm">
                          <FiMonitor size={24} />
                       </div>
                       <div>
                          <p className="font-black text-slate-800 uppercase tracking-widest text-sm">Homepage Hero Section</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Main Landing Narrative & Identity</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setSettings({...settings, showHero: !settings.showHero})}
                      className={`w-16 h-8 rounded-full relative transition-all duration-300 ${settings.showHero ? 'bg-[#1ea05f]' : 'bg-slate-300'}`}
                    >
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-sm ${settings.showHero ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 {/* Placeholders for future sections */}
                 <div className="flex items-center justify-between p-8 bg-slate-50/50 border border-slate-100/50 rounded-[2rem] opacity-50">
                    <div className="flex items-center gap-6">
                       <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-300">
                          <FiSmartphone size={24} />
                       </div>
                       <div>
                          <p className="font-black text-slate-300 uppercase tracking-widest text-sm">Stats Counter Block</p>
                          <p className="text-[10px] text-slate-200 font-bold uppercase tracking-[0.2em] mt-1">Global Impact Metrics (Coming Soon)</p>
                       </div>
                    </div>
                    <div className="w-16 h-8 bg-slate-200 rounded-full cursor-not-allowed"></div>
                 </div>
              </div>
           </section>

           {/* Content Controls */}
           {settings.showHero && (
             <motion.section 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10"
             >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1ea05f]/10 rounded-2xl flex items-center justify-center text-[#1ea05f]">
                    <FiType size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Hero Content Overrides</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Display Title (English)</label>
                      <input 
                         type="text" 
                         value={settings.heroTitleEn} 
                         onChange={(e) => setSettings({...settings, heroTitleEn: e.target.value})}
                         className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 transition-all" 
                         placeholder="Leave blank for translation default..."
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 text-right">Display Title (Urdu)</label>
                      <input 
                         dir="rtl"
                         type="text" 
                         value={settings.heroTitleUr} 
                         onChange={(e) => setSettings({...settings, heroTitleUr: e.target.value})}
                         className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 transition-all urdu-font" 
                         placeholder="خالی چھوڑیں..."
                      />
                   </div>
                </div>
             </motion.section>
           )}

           {/* Impact Metrics Overrides */}
           <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10 mt-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                  <FiTable size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Impact Metrics Overrides</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Lives Served Count</label>
                    <input 
                       type="number" 
                       value={settings.livesServed} 
                       onChange={(e) => setSettings({...settings, livesServed: Number(e.target.value)})}
                       className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-black text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 transition-all outline-none" 
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Total Donations ($)</label>
                    <input 
                       type="number" 
                       value={settings.donationsReceived} 
                       onChange={(e) => setSettings({...settings, donationsReceived: Number(e.target.value)})}
                       className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-black text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 transition-all outline-none" 
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Active Programs Count</label>
                    <input 
                       type="number" 
                       value={settings.programsCount} 
                       onChange={(e) => setSettings({...settings, programsCount: Number(e.target.value)})}
                       className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-black text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 transition-all outline-none" 
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Total Volunteers</label>
                    <input 
                       type="number" 
                       value={settings.volunteersCount} 
                       onChange={(e) => setSettings({...settings, volunteersCount: Number(e.target.value)})}
                       className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-black text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 transition-all outline-none" 
                    />
                 </div>
              </div>
           </section>
        </div>

        {/* Live Status SideCard */}
        <div className="space-y-8">
           <div className="bg-slate-950 p-10 rounded-[3rem] text-white space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1ea05f]/20 rounded-full blur-[80px] -mr-32 -mt-32 hover:bg-[#1ea05f]/40 transition-all duration-1000"></div>
              <div className="relative z-10 space-y-8">
                 <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#1ea05f]">Deployment Live View</h4>
                    <FiEye className="animate-pulse text-[#1ea05f]" />
                 </div>
                 
                 <div className="space-y-6">
                    <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                       <p className="text-[10px] font-black text-slate-500 uppercase">Current Hero Status</p>
                       <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${settings.showHero ? 'bg-[#1ea05f]' : 'bg-slate-700'}`}></div>
                          <span className="font-bold text-lg">{settings.showHero ? 'Propagating to ISR' : 'Suppressed'}</span>
                       </div>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
                       <p className="text-[10px] font-black text-slate-500 uppercase">CDN Cache Purge</p>
                       <div className="flex items-center gap-4">
                          <FiCheck className="text-[#1ea05f]" />
                          <span className="text-xs font-bold text-slate-400 tracking-wide italic">Targeted Tag Revalidation Engaged</span>
                       </div>
                    </div>
                 </div>

                 <p className="text-[10px] text-center text-slate-500 font-medium italic">All changes are atomic and finalized once the publish protocol completes.</p>
              </div>
           </div>

           <div className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Device Simulation</h4>
              <div className="grid grid-cols-2 gap-4">
                 <button className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-3xl group">
                    <FiMonitor className="text-slate-400 group-hover:text-[#1ea05f]" size={24}/>
                    <span className="text-[9px] font-black uppercase">Desktop</span>
                 </button>
                 <button className="flex flex-col items-center gap-3 p-6 bg-slate-50/50 rounded-3xl opacity-50 cursor-not-allowed">
                    <FiSmartphone className="text-slate-300" size={24}/>
                    <span className="text-[9px] font-black uppercase">Mobile</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
export default withAuth(LayoutManagerPage, { 
  allowedRoles: [UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.VIEWER] 
});
