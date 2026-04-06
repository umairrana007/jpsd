'use client';

import React, { useState } from 'react';
import { 
  FiSettings, FiUser, FiBell, FiShield, 
  FiGlobe, FiCheckCircle, FiCamera, FiLock,
  FiMail, FiPhone, FiUserCheck, FiMessageSquare, FiVolume2
} from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserSettingsFinal() {
  const { language, setLanguage } = useLanguage();
  const { currentUserData } = useAuth();
  const isUrdu = language === 'ur';
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: isUrdu ? 'پروفائل' : 'Profile', icon: <FiUser /> },
    { id: 'security', label: isUrdu ? 'سیکیورٹی' : 'Security', icon: <FiShield /> },
    { id: 'notifications', label: isUrdu ? 'اطلاعات' : 'Notifications', icon: <FiBell /> },
    { id: 'language', label: isUrdu ? 'زبان' : 'Language', icon: <FiGlobe /> },
  ];

  const handleLanguageChange = (lang: 'en' | 'ur') => {
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen space-y-10 pb-20 bg-white">
      {/* 🛠️ Header */}
      <header className="px-4 border-b border-slate-100 pb-10">
         <div className={`space-y-2 ${isUrdu ? 'text-right' : 'text-left'}`}>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
               {isUrdu ? 'سیٹنگز' : 'Settings'}
            </h1>
            <p className="text-slate-500 font-medium">
               {isUrdu ? 'اپنی ذاتی معلومات اور سیکیورٹی کو یہاں سے مینیج کریں۔' : 'Manage your personal identity, security, and preferences.'}
            </p>
         </div>
      </header>

      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-10 px-4 ${isUrdu ? 'direction-rtl' : ''}`}>
         
         {/* 🧭 Settings Nav */}
         <div className={`lg:col-span-1 space-y-2 ${isUrdu ? 'order-last lg:order-last' : 'order-first'}`}>
            {tabs.map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                     activeTab === tab.id 
                     ? 'bg-[#1ea05f] text-white shadow-lg shadow-emerald-100' 
                     : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-800 border border-transparent hover:border-slate-100'
                  } ${isUrdu ? 'flex-row-reverse text-right' : 'text-left'}`}
               >
                  <span className="text-xl">{tab.icon}</span>
                  <span>{tab.label}</span>
               </button>
            ))}
         </div>

         {/* 📑 Content Area */}
         <div className="lg:col-span-3 min-h-[500px]">
            <AnimatePresence mode="wait">
               <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm h-full ${isUrdu ? 'text-right' : 'text-left'}`}
               >
                  
                  {activeTab === 'profile' && (
                     <div className="space-y-12">
                        <div className={`flex flex-col md:flex-row items-center gap-8 border-b border-slate-50 pb-10 ${isUrdu ? 'md:flex-row-reverse' : ''}`}>
                           <div className="relative group">
                              <div className="w-32 h-32 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-300 overflow-hidden shadow-inner">
                                 {currentUserData?.photoURL ? (
                                    <img src={currentUserData.photoURL} alt="User" className="w-full h-full object-cover" />
                                 ) : (
                                    <FiUser size={48} />
                                 )}
                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer">
                                    <FiCamera size={24} />
                                 </div>
                              </div>
                           </div>
                           <div className={`space-y-1 text-center ${isUrdu ? 'md:text-right' : 'md:text-left'}`}>
                              <h4 className="text-2xl font-bold text-slate-800">{currentUserData?.name || 'Anonymous User'}</h4>
                              <p className="text-slate-400 font-medium text-sm flex items-center justify-center md:justify-start gap-2">
                                 <FiUserCheck className="text-[#1ea05f]" /> {currentUserData?.role || 'Contributor'} Member
                              </p>
                           </div>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{isUrdu ? 'مکمل نام' : 'Full Name'}</label>
                              <div className="relative">
                                 <FiUser className={`absolute ${isUrdu ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-slate-300`} />
                                 <input 
                                    type="text" 
                                    defaultValue={currentUserData?.name || ''}
                                    className={`w-full ${isUrdu ? 'pr-12 pl-6' : 'pl-12 pr-6'} py-4 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:border-[#1ea05f] focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-medium`}
                                 />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{isUrdu ? 'ای میل پتہ' : 'Email Address'}</label>
                              <div className="relative">
                                 <FiMail className={`absolute ${isUrdu ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-slate-300`} />
                                 <input 
                                    type="email" 
                                    readOnly
                                    value={currentUserData?.email || ''}
                                    className={`w-full ${isUrdu ? 'pr-12 pl-6' : 'pl-12 pr-6'} py-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 cursor-not-allowed font-medium`}
                                 />
                              </div>
                           </div>
                           <div className="md:col-span-2 pt-6">
                              <button className="px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-[#1ea05f] transition-all shadow-xl">
                                 {isUrdu ? 'معلومات محفوظ کریں' : 'Save Changes'}
                              </button>
                           </div>
                        </form>
                     </div>
                  )}

                  {activeTab === 'security' && (
                     <div className="space-y-10">
                        <h4 className="text-2xl font-bold text-slate-800">{isUrdu ? 'سیکیورٹی ترتیبات' : 'Security Settings'}</h4>
                        <div className={`p-8 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-[#1ea05f]/20 transition-all ${isUrdu ? 'flex-row-reverse' : ''}`}>
                           <div className={`flex items-center gap-6 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                                 <FiLock size={24} />
                              </div>
                              <div>
                                 <p className="font-bold text-slate-800">{isUrdu ? 'پاس ورڈ تبدیل کریں' : 'Change Password'}</p>
                                 <p className="text-xs text-slate-400">Update your access key regularly.</p>
                              </div>
                           </div>
                           <button className="text-[#1ea05f] font-bold text-sm hover:underline">{isUrdu ? 'ترمیم کریں' : 'Update'}</button>
                        </div>
                     </div>
                  )}

                  {activeTab === 'notifications' && (
                     <div className="space-y-10">
                        <h4 className="text-2xl font-bold text-slate-800">{isUrdu ? 'اطلاعات کی ترتیبات' : 'Notification Settings'}</h4>
                        <div className="space-y-6">
                           {[
                              { id: 'email', t: isUrdu ? 'ای میل الرٹس' : 'Email Alerts', d: 'Get mission updates via email.', icon: <FiMail /> },
                              { id: 'sms', t: isUrdu ? 'ایس ایم ایس الرٹس' : 'SMS Alerts', d: 'Urgent mobile notifications.', icon: <FiMessageSquare /> },
                              { id: 'push', t: isUrdu ? 'پش نوٹیفیکیشن' : 'Push Notifications', d: 'App-based live signals.', icon: <FiVolume2 /> }
                           ].map(pref => (
                              <div key={pref.id} className={`p-6 border border-slate-100 rounded-2xl flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
                                 <div className={`flex items-center gap-4 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-[#1ea05f]">
                                       {pref.icon}
                                    </div>
                                    <div>
                                       <p className="font-bold text-slate-800">{pref.t}</p>
                                       <p className="text-[10px] text-slate-400 font-medium">{pref.d}</p>
                                    </div>
                                 </div>
                                 <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                                    <div className={`absolute top-1 ${isUrdu ? 'left-1' : 'right-1'} w-4 h-4 bg-white rounded-full shadow-sm`}></div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {activeTab === 'language' && (
                     <div className="space-y-10">
                        <h4 className="text-2xl font-bold text-slate-800">{isUrdu ? 'زبان کی تبدیلی' : 'Language Interface'}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div 
                              onClick={() => handleLanguageChange('en')}
                              className={`p-8 border-2 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${language === 'en' ? 'border-[#1ea05f] bg-emerald-50/10' : 'border-slate-100 hover:border-slate-200'}`}
                           >
                              <span className="font-bold">English (US)</span>
                              {language === 'en' && <FiCheckCircle className="text-[#1ea05f]" />}
                           </div>
                           <div 
                              onClick={() => handleLanguageChange('ur')}
                              className={`p-8 border-2 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${language === 'ur' ? 'border-[#1ea05f] bg-emerald-50/10' : 'border-slate-100 hover:border-slate-200'}`}
                           >
                              <span className="font-bold">اردو (Urdu)</span>
                              {language === 'ur' && <FiCheckCircle className="text-[#1ea05f]" />}
                           </div>
                        </div>
                     </div>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
