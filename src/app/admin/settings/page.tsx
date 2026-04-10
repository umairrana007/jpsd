'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiSave, FiGlobe, FiMail, FiSettings, FiShield, 
  FiDollarSign, FiTerminal, FiRefreshCw, FiLock,
  FiImage, FiX, FiLayout
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getGlobalSettings, updateGlobalSettings } from '@/lib/firebaseUtils';
import { withAuth } from '@/components/admin/withAuth';
import { UserRole } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siteConfigSchema } from '@/lib/schemas/cmsSchemas';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { HomepageSectionBuilder, HomepageSection } from '@/components/admin/HomepageSectionBuilder';
import { BilingualInput } from '@/components/admin/BilingualInput';
import { logCMSAnalytics } from '@/lib/cmsAnalytics';
import { triggerWebhook } from '@/lib/webhookDispatcher';

function AdminSettingsPage() {
  const { setGlobalAlert, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    primaryColor: '#1ea05f',
    secondaryColor: '#3b82f6',
    metaDescription: 'JPSD Welfare Trust is providing global relief and sustainable charity programs.',
    metaDescriptionUrdu: '',
    navMenu: [] as { label: string; labelUrdu?: string; href: string }[],
    homepageSections: [] as HomepageSection[]
  });
 
  const [activeTab, setActiveTab] = useState('info');

  const { register, handleSubmit, control, reset, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(siteConfigSchema),
    mode: 'onChange',
    defaultValues: {
      foundationName: 'JPSD Foundation',
      tagline: 'Advancing humanity through education, health, and welfare solutions.',
      email: 'info@jpsd.org.pk',
      phone: '+92 21 34135826 - 29',
      address: 'Jamiyat House, 9 Faran Society, Hyder Ali Road, Karachi, Pakistan',
      logoUrl: '/logo.png',
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await getGlobalSettings();
      if (data) {
        setSettings(prev => ({ ...prev, ...data }));
        reset({
          foundationName: data.siteName || data.foundationName || 'JPSD Foundation',
          tagline: data.siteDescription || data.tagline || 'Advancing humanity through education, health, and welfare solutions.',
          email: data.contactEmail || data.email || 'info@jpsd.org.pk',
          phone: data.contactPhone || data.phone || '+92 21 34135826 - 29',
          address: data.address || 'Jamiyat House, 9 Faran Society, Hyder Ali Road, Karachi, Pakistan',
          logoUrl: data.logoUrl || '/logo.png',
        });
        setSettings(prev => ({
          ...prev,
          metaDescription: data.metaDescription || prev.metaDescription,
          metaDescriptionUrdu: data.metaDescriptionUrdu || prev.metaDescriptionUrdu
        }));
      }
      setLoading(false);
    };
    fetchSettings();
  }, [reset]);

  const onSaveConfig = async (formData: any) => {
    setSaving(true);
    const success = await updateGlobalSettings({
      ...settings,
      siteName: formData.foundationName,
      siteDescription: formData.tagline,
      contactEmail: formData.email,
      contactPhone: formData.phone,
      address: formData.address,
      logoUrl: formData.logoUrl,
    });
    
    if (success) {
      setGlobalAlert('Global assets synchronized with HQ successfully.', 'success');
      
      // Log Analytics
      await logCMSAnalytics({
        docId: 'global_settings',
        collection: 'settings',
        action: 'edit',
        actorUid: user?.uid || 'unknown'
      });

      // Trigger Webhook
      await triggerWebhook({ url: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || '', isActive: true }, {
        type: 'settings_modified',
        data: { siteName: formData.foundationName },
        actorUid: user?.uid
      });
    } else {
      setGlobalAlert('Network error detected. Fallback protocols enabled.', 'error');
    }
    setSaving(false);
  };

  const handleSaveWrapper = () => {
    handleSubmit(onSaveConfig)();
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
            onClick={handleSaveWrapper}
            disabled={saving || !isValid}
            className="px-8 py-3 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
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
              { id: 'info', label: 'Organization Info', icon: <FiSettings /> },
              { id: 'branding', label: 'Branding & Theme', icon: <FiImage /> },
              { id: 'navigation', label: 'Menu Management', icon: <FiGlobe /> },
              { id: 'homepage', label: 'Homepage CMS', icon: <FiLayout /> },
              { id: 'payments', label: 'Payment Engines', icon: <FiDollarSign /> },
              { id: 'security', label: 'Security & Access', icon: <FiShield /> },
            ].map((tab, i) => (
              <button 
                key={i} 
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all font-black text-xs uppercase tracking-widest ${
                activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-slate-400 hover:bg-slate-50'
              }`}>
                 <span className="text-lg">{tab.icon}</span>
                 {tab.label}
              </button>
            ))}
         </nav>

         {/* Content Area */}
         <div className="xl:col-span-9 space-y-10">
            
            {/* Identity Section */}
            {activeTab === 'info' && (
              <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                       <FiSettings size={24} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Foundation Identity</h3>
                 </div>
                 
                 <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Foundation Name</label>
                       <input 
                          type="text" 
                          {...register('foundationName')}
                          className="w-full px-6 py-3.5 bg-white border-2 border-slate-50 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                       />
                       {errors.foundationName && <p className="text-red-500 text-xs mt-1">{errors.foundationName.message as string}</p>}
                    </div>
                    <div className="space-y-3 md:col-span-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Foundation Mission Statement</label>
                       <Controller
                         name="tagline"
                         control={control}
                         render={({ field }) => (
                           <RichTextEditor value={field.value} onChange={field.onChange} />
                         )}
                       />
                       {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline.message as string}</p>}
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Support Email</label>
                       <input 
                          type="email" 
                          {...register('email')}
                          className="w-full px-6 py-3.5 bg-white border-2 border-slate-50 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                       />
                       {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Network</label>
                       <input 
                          type="text" 
                          {...register('phone')}
                          className="w-full px-6 py-3.5 bg-white border-2 border-slate-50 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                       />
                       {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Global HQ Address</label>
                       <input 
                          type="text" 
                          {...register('address')}
                          className="w-full px-6 py-3.5 bg-white border-2 border-slate-50 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                       />
                       {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message as string}</p>}
                    </div>
                    {/* <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Operating Cycles</label>
                       <input 
                          type="text" 
                          value={settings.operatingHours} 
                          onChange={(e) => setSettings({...settings, operatingHours: e.target.value})}
                          className="w-full px-6 py-3.5 bg-white border-2 border-slate-50 rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20" 
                       />
                    </div> */}
                 </form>
              </section>
            )}

            {/* Branding Section */}
            {activeTab === 'branding' && (
              <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                       <FiImage size={24} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Aesthetic & Branding</h3>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Primary Branding Color</label>
                          <div className="flex gap-4 items-center">
                             <input 
                                type="color" 
                                value={settings.primaryColor} 
                                onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                                className="w-20 h-20 rounded-2xl cursor-pointer border-none p-0 overflow-hidden" 
                             />
                             <input 
                                type="text" 
                                value={settings.primaryColor} 
                                onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                                className="flex-1 px-6 py-4 bg-white border-2 border-slate-50 rounded-2xl font-mono font-bold"
                             />
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Secondary Accent Color</label>
                          <div className="flex gap-4 items-center">
                             <input 
                                type="color" 
                                value={settings.secondaryColor} 
                                onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                                className="w-20 h-20 rounded-2xl cursor-pointer border-none p-0 overflow-hidden" 
                             />
                             <input 
                                type="text" 
                                value={settings.secondaryColor} 
                                onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                                className="flex-1 px-6 py-4 bg-white border-2 border-slate-50 rounded-2xl font-mono font-bold"
                             />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Global Logo Asset (URL)</label>
                          <input 
                             type="text" 
                             {...register('logoUrl')}
                             placeholder="/logo.png"
                             className="w-full px-6 py-4 bg-white border-2 border-slate-50 rounded-2xl font-bold"
                          />
                          {errors.logoUrl && <p className="text-red-500 text-xs mt-1">{errors.logoUrl.message as string}</p>}
                          <p className="text-[9px] text-slate-400 italic">Recommended: 400x400 transparent PNG or SVG.</p>
                       </div>
                    </div>
                 </div>
              </section>
            )}

            {/* Navigation Section */}
            {activeTab === 'navigation' && (
              <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                          <FiGlobe size={24} />
                       </div>
                       <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Navigation Architecture</h3>
                    </div>
                    <button 
                      onClick={() => setSettings({...settings, navMenu: [...settings.navMenu, { label: 'New Link', href: '/' }]})}
                      className="px-6 py-2 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20"
                    >
                      Add Nexus Link
                    </button>
                 </div>

                 <div className="space-y-4">
                    {settings.navMenu.map((item, idx) => (
                       <div key={idx} className="flex flex-col md:flex-row gap-4 p-8 bg-white border border-slate-100 rounded-[2.5rem] items-center">
                          <div className="flex-1 w-full space-y-2">
                             <label className="text-[9px] font-black text-slate-300 uppercase px-2">Label (English)</label>
                             <input 
                                type="text" value={item.label} 
                                onChange={(e) => {
                                  let newNav = [...settings.navMenu];
                                  newNav[idx].label = e.target.value;
                                  setSettings({...settings, navMenu: newNav});
                                }}
                                className="w-full px-4 py-2 bg-slate-50 rounded-xl font-bold text-xs" 
                             />
                          </div>
                          <div className="flex-1 w-full space-y-2">
                             <label className="text-[9px] font-black text-slate-300 uppercase px-2">Label (Urdu)</label>
                             <input 
                                type="text" value={item.labelUrdu || ''} 
                                onChange={(e) => {
                                  let newNav = [...settings.navMenu];
                                  newNav[idx].labelUrdu = e.target.value;
                                  setSettings({...settings, navMenu: newNav});
                                }}
                                className="w-full px-4 py-2 bg-slate-50 rounded-xl font-bold text-xs font-urdu" 
                             />
                          </div>
                          <div className="flex-1 w-full space-y-2">
                             <label className="text-[9px] font-black text-slate-300 uppercase px-2">Destination URL</label>
                             <input 
                                type="text" value={item.href} 
                                onChange={(e) => {
                                  let newNav = [...settings.navMenu];
                                  newNav[idx].href = e.target.value;
                                  setSettings({...settings, navMenu: newNav});
                                }}
                                className="w-full px-4 py-2 bg-slate-50 rounded-xl font-bold text-xs" 
                             />
                          </div>
                          <button 
                            onClick={() => {
                              let newNav = [...settings.navMenu];
                              newNav.splice(idx, 1);
                              setSettings({...settings, navMenu: newNav});
                            }}
                            className="p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all"
                          >
                             <FiX />
                          </button>
                       </div>
                    ))}
                    {settings.navMenu.length === 0 && (
                       <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                          <p className="text-slate-400 font-bold italic">No custom navigation routes detected. Falling back to core hardcoded nexus.</p>
                       </div>
                    )}
                 </div>
              </section>
            )}

            {/* Payment Section */}
            {activeTab === 'payments' && (
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
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"></div>
                         </div>
                         <h4 className="font-black text-slate-800 mb-2">{gate} High-Speed</h4>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Live Production Mode</p>
                         <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest">Rotate API Key</button>
                      </div>
                    ))}
                 </div>
              </section>
            )}

            {/* Security Section */}
            {activeTab === 'security' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <section className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="flex items-center gap-4">
                       <FiLock className="text-primary" size={24} />
                       <h3 className="text-lg font-black italic uppercase tracking-widest">Protocol Shield</h3>
                    </div>
                    <div className="space-y-6">
                       <div className="flex justify-between items-center">
                          <div>
                             <p className="text-sm font-black tracking-tight">2FA Authority</p>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Mandatory for all admins</p>
                          </div>
                          <div className="w-12 h-6 bg-primary rounded-full relative shadow-inner">
                             <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                       </div>
                       <div className="flex justify-between items-center border-t border-white/5 pt-6">
                          <div>
                             <p className="text-sm font-black tracking-tight">Session Lease</p>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Automatic expiration</p>
                          </div>
                          <span className="text-xs font-black text-primary">30 Minutes</span>
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
                       <div className="space-y-4">
                          <BilingualInput 
                            label="SEO Meta Description"
                            name="metaDescription"
                            valueEn={settings.metaDescription}
                            valueUr={settings.metaDescriptionUrdu}
                            onChangeEn={(val) => setSettings({...settings, metaDescription: val})}
                            onChangeUr={(val) => setSettings({...settings, metaDescriptionUrdu: val})}
                            isTextArea
                            placeholderEn="JPSD Welfare Trust is providing global relief..."
                          />
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
            )}

            {/* Homepage CMS Section */}
            {activeTab === 'homepage' && (
              <section className="bg-white/70 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-sm space-y-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                       <FiLayout size={24} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight italic uppercase">Homepage Architect</h3>
                 </div>
                 
                 <HomepageSectionBuilder 
                   sections={settings.homepageSections || []} 
                   onChange={(newSections) => setSettings({...settings, homepageSections: newSections})} 
                 />
              </section>
            )}

         </div>
      </div>
    </div>
  );
}

export default withAuth(AdminSettingsPage, { 
  allowedRoles: [UserRole.ADMIN] 
});
