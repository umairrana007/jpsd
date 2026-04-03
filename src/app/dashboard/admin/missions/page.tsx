'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEdit3, FiGlobe, FiZap, FiSave, FiX, 
  FiImage, FiType, FiMessageSquare, FiTrendingUp, FiTarget,
  FiArrowRight, FiCheck
} from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

export default function MissionManagement() {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();
  const isUrdu = language === 'ur';

  const [missionData, setMissionData] = useState({
    titleEn: '',
    titleUr: '',
    descEn: '',
    descUr: '',
    target: '',
    category: 'Relief'
  });

  const [isTranslating, setIsTranslating] = useState(false);
  const [success, setSuccess] = useState(false);

  const mockTranslate = () => {
    setIsTranslating(true);
    setTimeout(() => {
      setMissionData(prev => ({
        ...prev,
        titleUr: 'تھرپارکر واٹر ریلیف مشن',
        descUr: 'سندھ کے دور افتادہ علاقوں میں خاندانوں کو 500+ راشن کٹس اور ہائیجین پیک تقسیم کرنے میں لاجسٹک ٹیم کی مدد کریں۔'
      }));
      setIsTranslating(false);
    }, 1500);
  };

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
         <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#1ea05f] font-black text-[10px] uppercase tracking-[0.4em]">
               <FiGlobe strokeWidth={3} /> Mission Forge
            </div>
            <h1 className="text-6xl font-black text-slate-800 tracking-tighter italic uppercase leading-none">
               {isUrdu ? 'مہمات کی تخلیق' : 'Create Mission'}
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] leading-relaxed">Publish new humanitarian events with AI-powered translation.</p>
         </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
         {/* English Inputs */}
         <div className="space-y-10">
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <FiType className="text-blue-500" /> Primary Data (English)
               </div>
               
               <div className="space-y-6">
                  <div>
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Mission Strategic Title</label>
                     <input 
                        type="text" 
                        value={missionData.titleEn}
                        onChange={(e) => setMissionData({...missionData, titleEn: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-sm font-black uppercase tracking-tight italic text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20"
                        placeholder="E.G. THARPARKAR WATER RELIEF"
                     />
                  </div>
                  <div>
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Mission Directives (Description)</label>
                     <textarea 
                        rows={6}
                        value={missionData.descEn}
                        onChange={(e) => setMissionData({...missionData, descEn: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20"
                        placeholder="Describe the tactical goals and logistic requirements..."
                     />
                  </div>
               </div>
            </div>

            <button 
               onClick={mockTranslate}
               disabled={isTranslating || !missionData.titleEn}
               className="w-full py-8 bg-slate-950 text-white rounded-[2.5rem] flex items-center justify-center gap-4 group hover:bg-[#1ea05f] transition-all disabled:opacity-50"
            >
               {isTranslating ? (
                  <div className="flex items-center gap-4">
                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Synchronizing Linguistics...</span>
                  </div>
               ) : (
                  <>
                     <FiZap className="text-[#1ea05f] group-hover:text-white" />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Translate to Urdu (Auto-Sync)</span>
                  </>
               )}
            </button>
         </div>

         {/* Urdu Outputs */}
         <div className="space-y-10">
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10" dir="rtl">
               <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#1ea05f]">
                  <FiGlobe /> اردو ترجمہ (Urdu Sync)
               </div>
               
               <div className="space-y-6">
                  <div>
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 block">مہم کا عنوان</label>
                     <input 
                        type="text" 
                        value={missionData.titleUr}
                        onChange={(e) => setMissionData({...missionData, titleUr: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-lg font-black text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20"
                        placeholder="عنوان یہاں درج کریں..."
                     />
                  </div>
                  <div>
                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 block">مہم کی تفصیلات</label>
                     <textarea 
                        rows={6}
                        value={missionData.descUr}
                        onChange={(e) => setMissionData({...missionData, descUr: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 text-lg font-medium text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20"
                        placeholder="تفصیلات یہاں درج کریں..."
                     />
                  </div>
               </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between">
               <div className="flex gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#1ea05f]"><FiImage size={24} /></div>
                  <div className="text-left py-1">
                     <span className="block text-[10px] font-black uppercase tracking-widest text-slate-800">Media Assets</span>
                     <span className="text-[8px] text-slate-400 uppercase font-bold italic">No media selected</span>
                  </div>
               </div>
               <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-100 transition-all">Upload</button>
            </div>
         </div>
      </div>

      <div className="fixed bottom-12 right-12 z-50 flex items-center gap-4">
         <AnimatePresence>
            {success && (
               <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="px-8 py-5 bg-slate-900 text-[#1ea05f] rounded-2xl shadow-2xl flex items-center gap-4 border border-[#1ea05f]/20"
               >
                  <FiCheck size={20} strokeWidth={3} />
                  <span className="text-[10px] font-black uppercase tracking-widest italic">Mission Published Globally</span>
               </motion.div>
            )}
         </AnimatePresence>
         
         <button 
            onClick={handleSave}
            className="w-24 h-24 bg-slate-950 text-[#1ea05f] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all group border border-[#1ea05f]/30"
         >
            <FiSave size={32} strokeWidth={2.5} />
         </button>
      </div>
    </div>
  );
}
