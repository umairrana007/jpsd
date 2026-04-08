'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiLayout, FiDroplet, FiType, FiEye, 
  FiSave, FiRefreshCw, FiZap, FiGrid,
  FiBox, FiCloudRain, FiMonitor
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getThemeSettings, updateThemeSettings } from '@/lib/firebaseUtils';
import { useAuth } from '@/contexts/AuthContext';

export default function ThemeManagerPage() {
  const { setGlobalAlert } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [theme, setTheme] = useState({
    primary: '#1ea05f',
    secondary: '#3b82f6',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#0f172a',
    font: 'Inter, sans-serif'
  });

  useEffect(() => {
    const fetchTheme = async () => {
      const data = await getThemeSettings();
      if (data) setTheme(prev => ({ ...prev, ...data }));
      setLoading(false);
    };
    fetchTheme();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await updateThemeSettings(theme);
    if (success) {
      setGlobalAlert('Visual Identity DNA committed and synchronized site-wide.', 'success');
    }
    setSaving(false);
  };

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-[#f9f9fb]">
        <div className="w-16 h-16 border-4 border-[#1ea05f] border-t-transparent rounded-full animate-spin shadow-xl shadow-[#1ea05f]/20"></div>
     </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Visual Identity Orchestrator</h2>
          <p className="text-slate-500 font-medium">Fine-tune the foundation's aesthetic DNA and brand perception.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200 hover:text-slate-800 transition-all">
            Reset to Default
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-4 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center gap-2 group disabled:opacity-50"
          >
            {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave className="group-hover:scale-110 transition-transform" />}
            {saving ? 'Synchronizing DNA...' : 'Commit Palette'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left Side: Color Modules */}
        <div className="xl:col-span-8 space-y-10">
          
          {/* Primary Palette */}
          <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1ea05f]/10 rounded-2xl flex items-center justify-center text-[#1ea05f]">
                <FiDroplet size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Foundation Colorways</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Core Primary', value: theme.primary, key: 'primary' },
                { label: 'Impact Secondary', value: theme.secondary, key: 'secondary' },
                { label: 'Action Accent', value: theme.accent, key: 'accent' },
              ].map((color, i) => (
                <div key={i} className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{color.label}</label>
                  <div className="relative group">
                    <div 
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl border-2 border-white shadow-md pointer-events-none" 
                      style={{ backgroundColor: color.value }}
                    />
                    <input 
                      type="text" 
                      value={color.value}
                      onChange={(e) => setTheme({...theme, [color.key]: e.target.value})}
                      className="w-full px-14 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 uppercase" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography Engine */}
          <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                <FiType size={24} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Typography Architecture</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Global Font Family</label>
                  <div className="grid grid-cols-2 gap-4">
                     {['Inter', 'Roboto', 'Outfit', 'Plus Jakarta'].map((font) => (
                        <button 
                          key={font} 
                          onClick={() => setTheme({...theme, font: `${font}, sans-serif`})}
                          className={`px-6 py-4 rounded-2xl font-bold text-sm transition-all border ${
                            theme.font.includes(font) ? 'bg-[#1ea05f] text-white border-[#1ea05f] shadow-lg shadow-[#1ea05f]/20' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                          }`}
                        >
                          {font}
                        </button>
                     ))}
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Canvas Appearance</label>
                  <div className="flex p-2 bg-slate-100 rounded-[2rem] border border-slate-200">
                     <button className="flex-1 flex items-center justify-center gap-3 py-4 bg-white rounded-[1.5rem] shadow-sm font-black text-xs uppercase tracking-widest text-[#0f172a]">
                        <FiMonitor /> Natural Light
                     </button>
                     <button className="flex-1 flex items-center justify-center gap-3 py-4 font-black text-xs uppercase tracking-widest text-slate-400">
                        <FiCloudRain /> Deep Obsidian
                     </button>
                  </div>
               </div>
            </div>
          </section>

          {/* Live Component Preview */}
          <section className="bg-slate-900 p-12 rounded-[4rem] text-white space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1ea05f]/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
             <div className="flex items-center justify-between">
                <div>
                   <h3 className="text-xl font-black italic uppercase tracking-widest mb-2">Real-Time Canvas Preview</h3>
                   <p className="text-sm font-medium text-slate-400 underline underline-offset-8 decoration-[#1ea05f]/50 italic group">Simulated rendering of current token set.</p>
                </div>
                <FiEye className="text-[#1ea05f] animate-pulse" size={32} />
             </div>

             <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3rem] space-y-8">
                <div className="space-y-4">
                   <h4 className="text-4xl font-black italic uppercase leading-none tracking-tighter" style={{ color: theme.primary }}>Impact Header</h4>
                   <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                      Experience how the current <span className="font-bold underline decoration-2 underline-offset-4" style={{ textDecorationColor: theme.secondary }}>secondary palette</span> modulates the user experience and overall readability.
                   </p>
                </div>
                <div className="flex gap-6">
                   <button 
                    className="px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl transition-all hover:scale-105"
                    style={{ backgroundColor: theme.primary, color: '#fff', boxShadow: `0 20px 40px ${theme.primary}25` }}
                   >
                     Primary Action
                   </button>
                   <button 
                    className="px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest border transition-all hover:bg-white hover:text-slate-900"
                    style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
                   >
                     Ghost State
                   </button>
                </div>
             </div>
          </section>section
        </div>

        {/* Right Side: Quick Stats & Presets */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-8">
              <h4 className="text-lg font-black italic uppercase tracking-widest">Heritage Presets</h4>
              <div className="space-y-4">
                {[
                  { name: 'Emerald Oasis', color: '#1ea05f' },
                  { name: 'Royal Humanitarian', color: '#3b82f6' },
                  { name: 'Divine Golden', color: '#f59e0b' },
                ].map((preset, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-6 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-all group">
                     <span className="font-bold text-slate-600">{preset.name}</span>
                     <div className="w-8 h-8 rounded-xl group-hover:scale-110 transition-transform" style={{ backgroundColor: preset.color }}></div>
                  </button>
                ))}
              </div>
           </div>

           <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-10 rounded-[3rem] text-white space-y-8">
              <div className="w-12 h-12 bg-[#1ea05f]/10 rounded-2xl flex items-center justify-center text-[#1ea05f]">
                 <FiZap size={24} />
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-widest">Style Impact Meta</h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                       <span>Readability Engine</span>
                       <span className="text-[#1ea05f]">Optimized</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[85%] h-full bg-[#1ea05f] rounded-full"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                       <span>Contrast Ratio</span>
                       <span className="text-blue-500">AAA Verified</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[100%] h-full bg-blue-500 rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
