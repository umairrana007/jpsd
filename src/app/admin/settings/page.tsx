'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiSave, FiGlobe, FiMail, FiSettings, FiShield, 
  FiDollarSign, FiTerminal, FiRefreshCw, FiLock
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getGlobalSettings, updateGlobalSettings } from '@/lib/firebaseUtils';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

function AdminSettingsPage() {
  const { setGlobalAlert } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'JPSD Foundation',
    siteDescription: 'Advancing humanity through education, health, and welfare solutions.',
    contactEmail: 'info@jpsd.org.pk',
    contactPhone: '+92 21 34135826 - 29',
    address: 'Jamiyat House, 9 Faran Society, Hyder Ali Road, Karachi, Pakistan',
    operatingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
    mapsApiKey: 'AIzaSyA_****************',
    maintenanceMode: false
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getGlobalSettings();
      if (data) setSettings(prev => ({ ...prev, ...data }));
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const success = await updateGlobalSettings(settings);
    if (success) {
      setGlobalAlert('Global assets synchronized with HQ successfully.', 'success');
    } else {
      setGlobalAlert('Network error detected. Fallback protocols enabled.', 'error');
    }
    setSaving(false);
  };

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center bg-[#f9f9fb]">
        <div className="w-16 h-16 border-4 border-[#1ea05f] border-t-transparent rounded-full animate-spin shadow-xl shadow-[#1ea05f]/20"></div>
     </div>
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">System Configuration</h2>
          <p className="text-slate-500 font-medium">Global parameters, API integrations and security vault.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200 hover:text-slate-800 transition-all">
            Discard
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-[#1ea05f] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <FiRefreshCw className="animate-spin" /> : <FiSave />} 
            {saving ? 'Synchronizing...' : 'Save Global State'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         {/* Vertical Nav Tabs */}
         <nav className="xl:col-span-3 space-y-3">
            {[
              { label: 'Organization Info', icon: <FiSettings />, active: true },
              { label: 'Payment Engines', icon: <FiDollarSign /> },
              { label: 'Automated Comm.', icon: <FiMail /> },
              { label: 'Security & Access', icon: <FiShield /> },
              { label: 'Network & API', icon: <FiTerminal /> },
            ].map((tab, i) => (
              <button key={i} className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all font-black text-xs uppercase tracking-widest ${
                tab.active ? 'bg-[#1ea05f] text-white shadow-lg shadow-[#1ea05f]/20' : 'bg-white text-slate-400 hover:bg-slate-50'
              }`}>
                 <span className="text-lg">{tab.icon}</span>
                 {tab.label}
              </button>
            ))}
         </nav>

         {/* Content Area */}
         <div className="xl:col-span-9 space-y-10">
            
            {/* Identity Section */}
            <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1ea05f]/10 rounded-2xl flex items-center justify-center text-[#1ea05f]">
                     <FiSettings size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Foundation Identity</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Foundation Name</label>
                     <input 
                        type="text" 
                        value={settings.siteName} 
                        onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                        className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Foundation Mission Statement (Description)</label>
                     <input 
                        type="text" 
                        value={settings.siteDescription} 
                        onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                        className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Support Email</label>
                     <input 
                        type="email" 
                        value={settings.contactEmail} 
                        onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                        className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Network</label>
                     <input 
                        type="text" 
                        value={settings.contactPhone} 
                        onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                        className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Global HQ Address</label>
                     <input 
                        type="text" 
                        value={settings.address} 
                        onChange={(e) => setSettings({...settings, address: e.target.value})}
                        className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Operating Cycles (Working Hours)</label>
                     <input 
                        type="text" 
                        value={settings.operatingHours} 
                        onChange={(e) => setSettings({...settings, operatingHours: e.target.value})}
                        className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                     />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Google Maps Integration (API KEY)</label>
                     <input 
                        type="password" 
                        value={settings.mapsApiKey} 
                        onChange={(e) => setSettings({...settings, mapsApiKey: e.target.value})}
                        className="w-full px-6 py-3.5 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-blue-500/20" 
                     />
                  </div>
               </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                     <FiDollarSign size={24} />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Active Payment Engines</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['JazzCash', 'EasyPaisa', 'Bank Alfalah'].map((gate, i) => (
                    <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 relative overflow-hidden group shadow-sm">
                       <div className="flex justify-between items-center mb-6">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{gate} API</span>
                          <div className="w-2 h-2 rounded-full bg-[#1ea05f] shadow-[0_0_10px_#1ea05f]"></div>
                       </div>
                       <h4 className="font-black text-slate-800 mb-2">{gate} High-Speed</h4>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Live Production Mode</p>
                       <button className="text-[10px] font-black text-[#1ea05f] hover:underline uppercase tracking-widest">Rotate API Key</button>
                    </div>
                  ))}
               </div>
            </section>

            {/* Security Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <section className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  <div className="flex items-center gap-4">
                     <FiLock className="text-[#1ea05f]" size={24} />
                     <h3 className="text-lg font-black italic uppercase tracking-widest">Protocol Shield</h3>
                  </div>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <div>
                           <p className="text-sm font-black tracking-tight">2FA Authority</p>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Mandatory for all admins</p>
                        </div>
                        <div className="w-12 h-6 bg-[#1ea05f] rounded-full relative shadow-inner">
                           <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                     </div>
                     <div className="flex justify-between items-center border-t border-white/5 pt-6">
                        <div>
                           <p className="text-sm font-black tracking-tight">Session Lease</p>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Automatic expiration</p>
                        </div>
                        <span className="text-xs font-black text-[#1ea05f]">30 Minutes</span>
                     </div>
                  </div>
                  <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                     <FiRefreshCw /> Push Global Sync
                  </button>
               </section>

               <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-8">
                  <div className="flex items-center gap-4">
                     <FiGlobe className="text-blue-500" size={24} />
                     <h3 className="text-lg font-black text-slate-800 italic uppercase tracking-widest">SEO & Outreach</h3>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Language</label>
                        <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-100">
                           <button className="flex-1 py-2 bg-white rounded-lg shadow-sm font-black text-[10px] text-slate-800 uppercase tracking-widest">English</button>
                           <button className="flex-1 py-2 font-black text-[10px] text-slate-400 uppercase tracking-widest">Urdu</button>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Description</label>
                        <textarea rows={3} defaultValue="JPSD Welfare Trust is providing global relief and sustainable charity programs." className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 text-xs focus:ring-0 shadow-inner" />
                     </div>
                     <div className="flex items-center justify-between p-6 bg-red-500/5 border border-red-500/10 rounded-2xl group cursor-pointer" 
                          onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}>
                        <div>
                           <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-1">Maintenance Mode Protocol</p>
                           <p className="text-[10px] text-slate-400 font-medium italic">Bypass only for authorized admins</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full relative transition-all ${settings.maintenanceMode ? 'bg-red-500' : 'bg-slate-200'}`}>
                           <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${settings.maintenanceMode ? 'right-1' : 'left-1'}`}></div>
                        </div>
                     </div>
                  </div>
               </section>
            </div>

         </div>
      </div>
    </div>
  );
}

export default withAuth(AdminSettingsPage, { 
  allowedRoles: [UserRole.ADMIN] 
});
