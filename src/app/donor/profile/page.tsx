'use client';

import React, { useState } from 'react';
import { 
  FiUser, FiShield, FiGlobe, FiZap, 
  FiMail, FiPhone, FiMapPin, FiActivity,
  FiEdit2, FiCheckCircle, FiArrowRight, FiX, FiCheck
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Locale = 'en' | 'ur' | 'ar';

const translations = {
  en: {
    profileTitle: "Genesis Profile",
    profileTagline: "Your identity within the JPSD Global Ecosystem.",
    updateBtn: "Update Identity",
    impactTier: "Impact Tier",
    tierName: "Elite Commander",
    secTitle: "Security Calibration",
    secDesc: "2-Factor Auth is active on this portal. Security logs last reviewed: Today at 08:24 AM.",
    secBtn: "Review Security Matrix",
    infoTitle: "Personal Information Core",
    emailLabel: "Mission Email",
    phoneLabel: "Tactical Contact",
    regionLabel: "Home Deployment Region",
    locTitle: "Global Localization",
    dialect: "Preferred Dialect",
    dialectStatus: "Language: English / Urdu Localized",
    switchBtn: "Switch Context",
    visTitle: "Activity Visibility",
    visStatus: "Public Impact Tracking: Active",
    editVis: "Edit Visibility",
    verified: "Verified Platinum Member",
    selectLang: "Select Deployment Dialect",
    active: "Active",
    select: "Select",
    hidden: "Hidden",
    public: "Public",
    private: "Private",
    visDesc: "Configure how your impact metrics are visible to the community."
  },
  ur: {
    profileTitle: "پروفائل کا آغاز",
    profileTagline: "جے پی ایس ڈی عالمی نظام میں آپ کی شناخت۔",
    updateBtn: "شناخت تبدیل کریں",
    impactTier: "اثر کا درجہ",
    tierName: "اعلیٰ کمانڈر",
    secTitle: "سیکیورٹی کیلیبریشن",
    secDesc: "اس پورٹل پر ٹو فیکٹر تصدیق فعال ہے۔ سیکیورٹی لاگز کا آخری معائنہ: آج صبح 08:24 بجے۔",
    secBtn: "سیکیورٹی میٹرکس کا جائزہ لیں",
    infoTitle: "ذاتی معلومات کا مرکز",
    emailLabel: "مشن ای میل",
    phoneLabel: "ٹیکٹیکل رابطہ",
    regionLabel: "ہوم ڈیپلائمنٹ ریجن",
    locTitle: "عالمی مرکزیت",
    dialect: "پسندیدہ لہجہ",
    dialectStatus: "زبان: انگریزی / اردو مقامی",
    switchBtn: "سیاق و سباق تبدیل کریں",
    visTitle: "سرگرمی کی نمائش",
    visStatus: "عوامی اثرات کی ٹریکنگ",
    editVis: "نمائش درست کریں",
    verified: "تصدیق شدہ پلاٹینم ممبر",
    selectLang: "ڈیپلائمنٹ لہجہ منتخب کریں",
    active: "فعال",
    select: "منتخب کریں",
    hidden: "پوشیدہ",
    public: "عوامی",
    private: "نجی",
    visDesc: "ترتیب دیں کہ آپ کے اثرات کے اعداد و شمار کمیونٹی کو کیسے نظر آئیں گے۔"
  },
  ar: {
    profileTitle: "ملف التكوين",
    profileTagline: "هويتك داخل نظام JPSD العالمي.",
    updateBtn: "تحديث الهوية",
    impactTier: "فئة الأثر",
    tierName: "قائد النخبة",
    secTitle: "معايرة الأمن",
    secDesc: "المصادقة الثنائية نشطة في هذه البوابة. تمت مراجعة سجلات الأمان: اليوم في 08:24 صباحًا.",
    secBtn: "مراجعة مصفوفة الأمن",
    infoTitle: "نواة المعلومات الشخصية",
    emailLabel: "بريد المهمة",
    phoneLabel: "الاتصال التكتيكي",
    regionLabel: "منطقة النشر الرئيسية",
    locTitle: "التوطين العالمي",
    dialect: "اللهجة المفضلة",
    dialectStatus: "اللغة: الإنجليزية / الأردية المحلية",
    switchBtn: "تبديل السياق",
    visTitle: "رؤية النشاط",
    visStatus: "تتبع الأثر العام",
    editVis: "تعديل الرؤية",
    verified: "عضو بلاتيني معتمد",
    selectLang: "اختر لهجة النشر",
    active: "نشط",
    select: "اختر",
    hidden: "مخفي",
    public: "عام",
    private: "خاص",
    visDesc: "تكوين كيفية ظهور مقاييس تأثيرك للمجتمع."
  }
};

export default function DonorProfilePage() {
  const [lang, setLang] = useState<Locale>('en');
  const [showLangModal, setShowLangModal] = useState(false);
  const [showVisModal, setShowVisModal] = useState(false);
  const [showSecModal, setShowSecModal] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const t = translations[lang];
  const isRtl = lang === 'ur' || lang === 'ar';

  return (
    <>
    <div className={`space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ${isRtl ? 'font-urdu' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">{t.profileTitle}</h2>
          <p className="text-slate-500 font-medium tracking-tight italic">{t.profileTagline}</p>
        </div>
        <button className="px-8 py-3 bg-white text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
          <FiEdit2 /> {t.updateBtn}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Profile Card */}
        <div className="lg:col-span-4 space-y-10">
           <section className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm space-y-10 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="w-40 h-40 rounded-[3rem] bg-slate-100 flex items-center justify-center text-slate-400 font-black text-4xl shadow-2xl overflow-hidden group relative">
                 <Image 
                   src="/images/jpsd_education.jpg" 
                   alt="Identity"
                   fill
                   loading="lazy"
                   sizes="160px"
                   className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                 />
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-all uppercase tracking-widest">Update Photo</div>
              </div>

              <div>
                 <h3 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter leading-none mb-3">Muhammad Umair</h3>
                 <span className="text-[10px] font-black text-[#1ea05f] bg-[#1ea05f]/10 px-4 py-2 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 italic">
                    <FiCheckCircle /> {t.verified}
                 </span>
              </div>

              <div className="w-full space-y-4 pt-10 border-t border-slate-50">
                 <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>{t.impactTier}</span>
                    <span className="text-slate-800">{t.tierName}</span>
                 </div>
                 <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-[#1ea05f]" />
                 </div>
              </div>
           </section>

           <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-[4rem] text-white shadow-2xl shadow-black/20 space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/20 rounded-full blur-[100px] -mr-16 -mt-16"></div>
              <FiShield size={32} className="text-[#1ea05f]" />
              <h4 className="text-xl font-black italic uppercase tracking-tighter leading-none">{t.secTitle}</h4>
              <p className="text-slate-400 font-medium text-xs leading-relaxed max-w-[200px]">{t.secDesc}</p>
              <button 
                onClick={() => setShowSecModal(true)}
                className="text-[9px] font-black text-[#1ea05f] uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform italic"
              >
                {t.secBtn} <FiArrowRight className={isRtl ? 'rotate-180' : ''}/>
              </button>
           </div>
        </div>

        {/* Detailed Data */}
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-md p-14 rounded-[4rem] border border-white shadow-sm space-y-12">
           <div>
              <h3 className="text-2xl font-black text-slate-800 italic uppercase tracking-tighter leading-none mb-10 border-b border-slate-50 pb-8">{t.infoTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">{t.emailLabel}</label>
                    <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                       <FiMail className="text-slate-400" />
                       <span className="text-sm font-black text-slate-800 underline-offset-4">umair@JPSD.ngo</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">{t.phoneLabel}</label>
                    <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                       <FiPhone className="text-slate-400" />
                       <span className="text-sm font-black text-slate-800">+92 300 1234567</span>
                    </div>
                 </div>
                 <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 italic">{t.regionLabel}</label>
                    <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 w-full">
                       <FiMapPin className="text-slate-400" />
                       <span className="text-sm font-black text-slate-800">Area-01, Karachi, Pakistan (South Sindh)</span>
                    </div>
                 </div>
              </div>
           </div>

           <div>
              <h3 className="text-xl font-black text-slate-800 italic uppercase tracking-tighter leading-none mb-10 border-b border-slate-50 pb-8">{t.locTitle}</h3>
              <div className="space-y-8">
                 <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                          <FiGlobe size={24} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-800 italic uppercase">{t.dialect}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{t.dialectStatus}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setShowLangModal(true)}
                      className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline italic"
                    >
                      {t.switchBtn}
                    </button>
                 </div>
                 
                 <div className="flex items-center justify-between p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                          <FiActivity size={24} />
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-800 italic uppercase">{t.visTitle}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                            {t.visStatus}: <span className={isPublic ? 'text-amber-600' : 'text-slate-500'}>{isPublic ? t.active : t.hidden}</span>
                          </p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setShowVisModal(true)}
                      className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:underline italic"
                    >
                      {t.editVis}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>

    {/* Language Selection Modal */}
    <AnimatePresence>
      {showLangModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setShowLangModal(false)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl space-y-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600">
                  <FiGlobe size={20} />
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">{t.selectLang}</h3>
              </div>
              <button 
                onClick={() => setShowLangModal(false)}
                className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all"
              >
                <FiX size={18}/>
              </button>
            </div>

            <div className="space-y-4">
              {[
                { key: 'en', label: 'English', desc: 'Standard Protocol' },
                { key: 'ur', label: 'اردو (Urdu)', desc: 'مقامی لہجہ' },
                { key: 'ar', label: 'عربي (Arabic)', desc: 'لهجة إقليمية' }
              ].map((l) => (
                <button 
                  key={l.key}
                  type="button"
                  onClick={() => { 
                    setLang(l.key as Locale); 
                    setTimeout(() => setShowLangModal(false), 200); 
                  }}
                  className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all group ${
                    lang === l.key 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200' 
                      : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-blue-400'
                  }`}
                >
                  <div className="text-left">
                    <p className={`text-sm font-black uppercase tracking-tighter ${lang === l.key ? 'text-white' : 'text-slate-800'}`}>{l.label}</p>
                    <p className={`text-[9px] font-bold uppercase tracking-widest mt-1 opacity-70 ${lang === l.key ? 'text-white' : 'text-slate-400'}`}>{l.desc}</p>
                  </div>
                  {lang === l.key ? <FiCheck size={20}/> : <span className="text-[9px] font-black uppercase tracking-widest group-hover:text-blue-500">{t.select}</span>}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    {/* Activity Visibility Modal */}
    <AnimatePresence>
      {showVisModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setShowVisModal(false)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl space-y-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600">
                  <FiActivity size={20} />
                </div>
                <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">{t.visTitle}</h3>
              </div>
              <button 
                onClick={() => setShowVisModal(false)}
                className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all"
              >
                <FiX size={18}/>
              </button>
            </div>

            <p className="text-xs font-medium text-slate-500 leading-relaxed uppercase tracking-wide">
              {t.visDesc}
            </p>

            <div className="space-y-4">
               <button 
                  onClick={() => { setIsPublic(true); setShowVisModal(false); }}
                  className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all ${isPublic ? 'bg-amber-500 border-amber-500 text-white shadow-xl shadow-amber-100' : 'bg-slate-50 border-slate-100 text-slate-600'}`}
               >
                  <span className="font-black uppercase tracking-widest text-xs">{t.public}</span>
                  {isPublic && <FiCheck size={20}/>}
               </button>
               <button 
                  onClick={() => { setIsPublic(false); setShowVisModal(false); }}
                  className={`w-full flex items-center justify-between p-6 rounded-3xl border transition-all ${!isPublic ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-slate-50 border-slate-100 text-slate-600'}`}
               >
                  <span className="font-black uppercase tracking-widest text-xs">{t.private}</span>
                  {!isPublic && <FiCheck size={20}/>}
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    {/* Security Matrix Modal */}
    <AnimatePresence>
      {showSecModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl"
          onClick={() => setShowSecModal(false)}
        >
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="bg-[#0a0a0b] text-white border border-white/10 rounded-[3rem] p-10 max-w-2xl w-full shadow-[0_0_100px_rgba(30,160,95,0.2)] space-y-10 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Grid background effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1ea05f 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="flex justify-between items-start relative">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#1ea05f] animate-pulse" />
                   <h3 className="text-xl font-black italic uppercase tracking-tighter">Security Matrix Terminal</h3>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{t.secTitle} // SYSTEM_DIAGNOSTIC_ACTIVE</p>
              </div>
              <button onClick={() => setShowSecModal(false)} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all">
                <FiX size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 relative">
              {[
                 { label: '2FA Protocol', val: 'ENCRYPTED', color: 'text-[#1ea05f]' },
                 { label: 'Device Sync', val: '3 ACTIVE', color: 'text-blue-400' },
                 { label: 'Last Scan', val: 'CLEAN', color: 'text-amber-400' }
              ].map((m, i) => (
                <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-1">
                   <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">{m.label}</p>
                   <p className={`text-xs font-black italic ${m.color}`}>{m.val}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4 relative">
               <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Recent Security Handshakes</p>
               <div className="space-y-2 font-mono text-[10px]">
                  {[
                    { time: '08:24:12', msg: 'Successful login from verified physical location', status: 'OK' },
                    { time: '04:12:05', msg: 'Identity synchronized with mobile terminal', status: 'SYNC' },
                    { time: 'Yesterday', msg: 'Automated 2-factor verification handshake', status: 'SEC' },
                    { time: 'Yesterday', msg: 'Security log purge complete', status: 'SYS' }
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4 p-3 bg-white/[0.02] rounded-lg border border-white/5 group hover:bg-white/[0.04] transition-all">
                       <span className="text-slate-600">{log.time}</span>
                       <span className="flex-1 text-slate-400 group-hover:text-slate-200 transition-colors uppercase italic">{log.msg}</span>
                       <span className="text-[#1ea05f] font-black">[{log.status}]</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="pt-6 border-t border-white/5 flex gap-4 relative">
               <button className="flex-1 py-4 bg-[#1ea05f] hover:bg-[#1ea05f]/80 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all">Reset Matrix Core</button>
               <button onClick={() => setShowSecModal(false)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all">Dismiss Diagnostics</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}

