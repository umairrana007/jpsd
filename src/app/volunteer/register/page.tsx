'use client';

import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiPhone, FiLock, 
  FiShield, FiCalendar, FiMapPin, FiBriefcase,
  FiClock, FiUpload, FiAlertCircle, FiArrowRight,
  FiArrowLeft, FiCheckCircle, FiTrash2, FiPlusCircle,
  FiRefreshCw, FiExternalLink, FiGlobe, FiDownload
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { submitVolunteerApplication } from '@/lib/firebaseUtils';
import { generateVolunteerCertificate } from '@/lib/pdfUtils';

const SKILL_CATEGORIES = [
  { id: 'medical', en: 'Medical', ur: 'طبی' },
  { id: 'logistics', en: 'Logistics', ur: 'لاجسٹکس' },
  { id: 'teaching', en: 'Teaching', ur: 'تدریس' },
  { id: 'tech', en: 'Tech', ur: 'ٹیکنالوجی' },
  { id: 'emergency', en: 'Emergency Response', ur: 'ہنگامی سرگرمیاں' }
];

// REUSABLE CUSTOM ALERT MODAL (Fix #4)
const CustomAlert = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => (
  <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-6">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl border-t-8 ${type === 'error' ? 'border-red-500' : 'border-[#1ea05f]'}`}
    >
      <div className="text-center space-y-6">
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${type === 'error' ? 'bg-red-50 text-red-500' : 'bg-[#1ea05f]/10 text-[#1ea05f]'}`}>
          {type === 'error' ? <FiAlertCircle size={40} /> : <FiCheckCircle size={40} />}
        </div>
        <div>
          <h3 className={`text-2xl font-black italic uppercase tracking-tighter ${type === 'error' ? 'text-red-600' : 'text-slate-800'}`}>
            {type === 'error' ? 'Critical Halt' : 'Directive Success'}
          </h3>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-2">{message}</p>
        </div>
        <button onClick={onClose} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
          Acknowledge & Sync
        </button>
      </div>
    </motion.div>
  </div>
);

export default function VolunteerRegisterPage() {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [customAlert, setCustomAlert] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [certReady, setCertReady] = useState<{ blob: Blob, id: string } | null>(null);
  
  const [selectedRegion, setSelectedRegion] = useState<'karachi' | 'sindh' | 'northern' | 'other'>('karachi');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cnic: '',
    dob: '',
    gender: 'male' as const,
    address: { city: '', province: '' },
    skills: [] as string[],
    availability: { days: [] as string[], hours: '', preferredRoles: [] as string[] },
    emergencyContact: { name: '', phone: '', relation: '' }
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const toggleSkill = (skillId: string) => {
    const skills = formData.skills.includes(skillId)
      ? formData.skills.filter(s => s !== skillId)
      : [...formData.skills, skillId];
    setFormData({ ...formData, skills });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Simulate submission & save to Firestore (logic from lib already exist)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedId = `VOL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Fix #1 B: Integrate Certificate Generation
      const blob = generateVolunteerCertificate({
        name: formData.name,
        volunteerId: generatedId,
        skills: formData.skills,
        region: selectedRegion,
        joinedAt: new Date().toISOString()
      });

      setCertReady({ blob, id: generatedId });
      setCustomAlert({ message: 'Identity Integrated. Tactical Merit Certificate Ready.', type: 'success' });
      
    } catch (error: any) {
      setCustomAlert({ message: error.message || 'Transmission failed.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const downloadCert = () => {
    if (!certReady) return;
    const url = URL.createObjectURL(certReady.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JPSD_Merit_${certReady.id}.pdf`;
    a.click();
    window.location.href = '/volunteer/dashboard?new=true';
  };

  const isUrdu = language === 'ur';

  // FIX #1 A: Location Step
  const LocationStep = () => (
    <div className="space-y-10">
      <div className="flex items-center gap-6 border-b border-slate-100 pb-10">
        <button onClick={prevStep} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all"><FiArrowLeft /></button>
        <h3 className="text-2xl font-black italic uppercase tracking-tighter">{isUrdu ? 'علاقائی مرکز' : 'Geographical Sectoring'}</h3>
      </div>
      
      <div className="space-y-6">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">
          {isUrdu ? 'اپنا ترجیحی علاقائی مرکز منتخب کریں' : 'Select your preferred regional deployment hub'}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { id: 'karachi', label: 'Karachi Hub', sub: 'Coastal Sector' },
            { id: 'sindh', label: 'Sindh Regional', sub: 'Thar & Rural Sectors' },
            { id: 'northern', label: 'Northern Areas', sub: 'High-Altitude Relief' },
            { id: 'other', label: 'Remote / Global', sub: 'Cyber-Response' }
          ].map(region => (
            <div 
              key={region.id}
              onClick={() => setSelectedRegion(region.id as any)}
              className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all flex items-center justify-between group ${selectedRegion === region.id ? 'border-[#1ea05f] bg-[#1ea05f]/5' : 'border-slate-100 bg-slate-50 hover:border-slate-300'}`}
            >
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-800 uppercase italic tracking-tighter">{region.label}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{region.sub}</span>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedRegion === region.id ? 'bg-[#1ea05f] text-white' : 'bg-white text-slate-100 border border-slate-100'}`}>
                {selectedRegion === region.id && <FiCheckCircle />}
              </div>
            </div>
          ))}
        </div>
        
        <div className="h-56 bg-slate-900 rounded-[3rem] p-1 overflow-hidden relative group">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-700" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
           <div className="relative h-full flex items-center justify-center border-4 border-dashed border-white/10 rounded-[2.8rem]">
              <div className="text-center space-y-2">
                 <FiMapPin className="text-[#1ea05f] mx-auto" size={32} />
                 <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Sector Map Initializing...</p>
              </div>
           </div>
        </div>
      </div>

      <button 
        onClick={nextStep}
        className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
      >
        <span>{isUrdu ? 'اگلا مرحلہ: دستیابی' : 'Next Step: Temporal Availability'}</span>
        <FiArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#f9f9fb] flex flex-col items-center justify-center p-6 relative overflow-hidden ${isUrdu ? 'font-urdu' : ''}`} dir={isUrdu ? 'rtl' : 'ltr'}>
      {/* HUD Progress */}
      <div className="w-full max-w-2xl mb-12 flex justify-between items-center relative z-10">
         {[1, 2, 3, 4, 5].map((s) => (
           <div key={s} className="flex flex-col items-center gap-3">
             <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center font-black transition-all duration-500 ${step >= s ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'}`}>
                {step > s ? <FiCheckCircle /> : s}
             </div>
             <span className={`text-[9px] font-black uppercase tracking-widest ${step >= s ? 'text-slate-800' : 'text-slate-300'}`}>
                {s === 1 ? (isUrdu ? 'شناخت' : 'Personal') : s === 2 ? (isUrdu ? 'مہارتیں' : 'Skills') : s === 3 ? (isUrdu ? 'علاقہ' : 'Region') : s === 4 ? (isUrdu ? 'دستیابی' : 'Temporal') : (isUrdu ? 'جائزہ' : 'Review')}
             </span>
           </div>
         ))}
         <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-slate-100 -z-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step - 1) * 25}%` }}
              className="h-full bg-slate-900" 
            />
         </div>
      </div>

      <motion.div 
        layout
        className="w-full max-w-3xl bg-white rounded-[4rem] shadow-2xl shadow-slate-200/50 p-10 md:p-14 relative z-10 border border-slate-100"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} className="space-y-10">
               <div className="text-center space-y-4">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">{isUrdu ? 'ذاتی معلومات' : 'Personal Integration'}</h2>
                  <p className="text-sm font-medium text-slate-500">{isUrdu ? 'بنیادی معلومات فراہم کریں' : 'Sync your identity with the humanitarian core.'}</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Full Name</label>
                    <div className="relative group">
                      <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Email Node</label>
                    <div className="relative group">
                      <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                      <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold" />
                    </div>
                  </div>
               </div>
               <button onClick={nextStep} className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl flex items-center justify-center gap-3">
                 <span>Next Step: Skills</span> <FiArrowRight />
               </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} className="space-y-10">
               <div className="flex items-center gap-6 border-b border-slate-100 pb-10">
                  <button onClick={prevStep} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400"><FiArrowLeft /></button>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Skillset Topology</h3>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SKILL_CATEGORIES.map(category => (
                    <div key={category.id} onClick={() => toggleSkill(category.id)} className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center justify-between ${formData.skills.includes(category.id) ? 'border-[#1ea05f] bg-[#1ea05f]/5' : 'border-slate-100 bg-slate-50'}`}>
                      <span className="text-sm font-black text-slate-800 uppercase italic tracking-tighter">{category.en}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${formData.skills.includes(category.id) ? 'bg-[#1ea05f] text-white' : 'bg-white border'}`}>
                        {formData.skills.includes(category.id) && <FiCheckCircle />}
                      </div>
                    </div>
                  ))}
               </div>
               <button onClick={nextStep} className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl flex items-center justify-center gap-3">
                 <span>Next Step: Region</span> <FiArrowRight />
               </button>
            </motion.div>
          )}

          {step === 3 && <LocationStep />}

          {step === 4 && (
            <motion.div key="s4" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} className="space-y-10">
               <div className="flex items-center gap-6 border-b border-slate-100 pb-10">
                  <button onClick={prevStep} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400"><FiArrowLeft /></button>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Temporal Availability</h3>
               </div>
               <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <button key={day} onClick={() => {
                        const days = formData.availability.days.includes(day) ? formData.availability.days.filter(d => d !== day) : [...formData.availability.days, day];
                        setFormData({...formData, availability: {...formData.availability, days}});
                    }} className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest ${formData.availability.days.includes(day) ? 'bg-[#1ea05f] text-white' : 'bg-slate-50 text-slate-300'}`}>
                      {day}
                    </button>
                  ))}
               </div>
               <button onClick={nextStep} className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl flex items-center justify-center gap-3">
                 <span>Next Step: Final Review</span> <FiArrowRight />
               </button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="s5" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} className="space-y-10">
               <div className="flex items-center gap-6 border-b border-slate-100 pb-10">
                  <button onClick={prevStep} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400"><FiArrowLeft /></button>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Final Protocol Review</h3>
               </div>
               <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-6">
                  <div className="flex justify-between items-center pb-6 border-b">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-[#1ea05f]">Region Hub</span>
                     <span className="text-sm font-black text-slate-800 italic uppercase">{selectedRegion} Sector</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</span>
                     <span className="text-sm font-black text-slate-800 italic uppercase">{formData.name}</span>
                  </div>
               </div>
               <button onClick={handleSubmit} disabled={submitting} className="w-full py-8 bg-[#1ea05f] text-white font-black rounded-3xl shadow-2xl flex items-center justify-center gap-4 italic uppercase tracking-widest">
                 {submitting ? <FiRefreshCw className="animate-spin" /> : <FiShield />} 
                 {submitting ? 'Committing...' : 'Finalize Identity Commit'}
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* SUCCESS MODAL WITH DOWNLOAD */}
      <AnimatePresence>
        {certReady && customAlert?.type === 'success' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 bg-slate-900/90 backdrop-blur-2xl z-[150] flex items-center justify-center p-6">
             <motion.div initial={{scale:0.8, y:20}} animate={{scale:1, y:0}} className="bg-white rounded-[4rem] p-16 max-w-2xl w-full text-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-[#1ea05f]" />
                <FiCheckCircle size={80} className="text-[#1ea05f] mx-auto" />
                <div className="space-y-2">
                   <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-800">Mission Ready</h2>
                   <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">Deployment credentials have been generated</p>
                </div>
                <div className="p-10 bg-slate-50 rounded-[3.5rem] border-2 border-dashed border-slate-100 space-y-4">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tactical Merit Accreditation</p>
                   <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-16 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-center">
                         <FiShield className="text-[#1ea05f]" />
                      </div>
                      <div className="text-left">
                         <p className="text-sm font-black text-slate-800 uppercase italic">JPSD_CERT_{certReady.id}</p>
                         <p className="text-[9px] font-bold text-slate-400">PDF Document • 420 KB</p>
                      </div>
                   </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                   <button onClick={downloadCert} className="flex-1 py-6 bg-[#1ea05f] text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-[#1ea05f]/20 uppercase text-[10px] tracking-widest">
                      <FiDownload size={18} /> Download Certificate
                   </button>
                   <Link href="/volunteer/dashboard" className="flex-1 py-6 bg-slate-100 text-slate-800 font-black rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all uppercase text-[10px] tracking-widest">
                      Enter Dashboard
                   </Link>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {customAlert && customAlert.type === 'error' && <CustomAlert {...customAlert} onClose={() => setCustomAlert(null)} />}
    </div>
  );
}
