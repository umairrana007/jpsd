'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle, FiPhone, FiMapPin, FiHeart, FiUserCheck, FiBriefcase } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserRole } from '@/types';
import Link from 'next/link';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(UserRole.DONOR);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cnic: '',
    community: '',
    skills: '',
    institution: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});
  
  const { register } = useAuth();
  const router = useRouter();
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  const validateStep1 = () => {
    const errors: Record<string, boolean> = {};
    if (!formData.name) errors.name = true;
    if (!formData.email) errors.email = true;
    if (!formData.phone) errors.phone = true;
    if (!formData.cnic) errors.cnic = true;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setError('');
    } else {
      setError(isUrdu ? 'براہ کرم تمام ضروری معلومات فراہم کریں۔' : 'Please fill all required fields correctly.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.password) {
      setError(isUrdu ? 'پاس ورڈ لازمی ہے۔' : 'Password is required.');
      return;
    }
    
    setError('');
    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name, role, {
        phone: formData.phone,
        cnic: formData.cnic,
        community: formData.community,
        skills: formData.skills,
        institution: formData.institution
      });
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-32 md:pt-40 p-6 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-[#1ea05f]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-xl z-10" dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className="text-center mb-10">
           <span className="inline-block px-4 py-1.5 rounded-full bg-[#1ea05f]/10 text-[#1ea05f] text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-[#1ea05f]/20">
             {t('signup.title')}
           </span>
           <h2 className={`text-4xl font-black text-white tracking-tighter italic uppercase ${isUrdu ? 'urdu-text' : ''}`}>
             {t('signup.joinMission')}
           </h2>
           <p className={`text-slate-400 mt-2 font-medium ${isUrdu ? 'urdu-text' : ''}`}>
             {t('signup.subtitle')}
           </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative">
          {/* Step Indicator */}
          <div className="flex gap-2 mb-10 justify-center">
            <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 1 ? 'w-12 bg-[#1ea05f]' : 'w-4 bg-white/10'}`}></div>
            <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 2 ? 'w-12 bg-[#1ea05f]' : 'w-4 bg-white/10'}`}></div>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                   {/* Role Selection */}
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <button 
                        type="button"
                        onClick={() => setRole(UserRole.DONOR)}
                        className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                          role === UserRole.DONOR ? 'bg-[#1ea05f]/10 border-[#1ea05f] text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                        }`}
                      >
                         <FiHeart size={20} />
                         <span className={`text-[8px] font-black uppercase tracking-widest text-center ${isUrdu ? 'urdu-text' : ''}`}>{t('signup.donor')}</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setRole(UserRole.VOLUNTEER)}
                        className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                          role === UserRole.VOLUNTEER ? 'bg-blue-600/10 border-blue-600 text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                        }`}
                      >
                         <FiUserCheck size={20} />
                         <span className={`text-[8px] font-black uppercase tracking-widest text-center ${isUrdu ? 'urdu-text' : ''}`}>{t('signup.volunteer')}</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setRole(UserRole.PROFESSIONAL)}
                        className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                          role === UserRole.PROFESSIONAL ? 'bg-amber-600/10 border-amber-600 text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                        }`}
                      >
                         <FiBriefcase size={20} />
                         <span className={`text-[8px] font-black uppercase tracking-widest text-center ${isUrdu ? 'urdu-text' : ''}`}>{t('signup.professional')}</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setRole(UserRole.YOUTH)}
                        className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                          role === UserRole.YOUTH ? 'bg-purple-600/10 border-purple-600 text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                        }`}
                      >
                         <FiCheckCircle size={20} />
                         <span className={`text-[8px] font-black uppercase tracking-widest text-center ${isUrdu ? 'urdu-text' : ''}`}>{t('signup.youth')}</span>
                      </button>
                   </div>

                   <div className="space-y-4">
                      <div className="relative">
                         <FiUser className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                         <input 
                            required
                            type="text" 
                            placeholder={t('signup.fullNamePlaceholder')}
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className={`w-full bg-white/5 border ${validationErrors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none ${isUrdu ? 'urdu-text' : ''}`}
                         />
                      </div>

                      <div className="relative">
                         <FiMail className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                         <input 
                            required
                            type="email" 
                            placeholder={t('signup.emailPlaceholder')}
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={`w-full bg-white/5 border ${validationErrors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none ${isUrdu ? 'urdu-text' : ''}`}
                         />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                           <FiUserCheck className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                           <input 
                              required
                              type="text" 
                              placeholder={t('signup.cnicPlaceholder')}
                              value={formData.cnic}
                              onChange={(e) => setFormData({...formData, cnic: e.target.value})}
                              className={`w-full bg-white/5 border ${validationErrors.cnic ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-[10px] uppercase font-black focus:ring-2 focus:ring-[#1ea05f]/30 outline-none ${isUrdu ? 'urdu-text' : ''}`}
                           />
                        </div>

                        <div className="relative">
                           <FiUserCheck className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                           <input 
                              required
                              type="text" 
                              placeholder={t('signup.communityPlaceholder')}
                              value={formData.community}
                              onChange={(e) => setFormData({...formData, community: e.target.value})}
                              className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-[10px] uppercase font-black focus:ring-2 focus:ring-[#1ea05f]/30 outline-none ${isUrdu ? 'urdu-text' : ''}`}
                           />
                        </div>

                        <div className={`relative ${role === UserRole.VOLUNTEER || role === UserRole.PROFESSIONAL || role === UserRole.YOUTH ? 'md:col-span-1' : 'md:col-span-2'}`}>
                           <FiPhone className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                           <input 
                              required
                              type="text" 
                              placeholder={t('signup.phonePlaceholder')}
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className={`w-full bg-white/5 border ${validationErrors.phone ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-[10px] uppercase font-black focus:ring-2 focus:ring-[#1ea05f]/30 outline-none ${isUrdu ? 'urdu-text' : ''}`}
                           />
                        </div>

                        {(role === UserRole.VOLUNTEER || role === UserRole.PROFESSIONAL) && (
                          <div className="relative">
                             <FiBriefcase className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                             <input 
                                required
                                type="text" 
                                placeholder={t('signup.skillsPlaceholder')}
                                value={formData.skills}
                                onChange={(e) => setFormData({...formData, skills: e.target.value})}
                                className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-[10px] uppercase font-black focus:ring-2 focus:ring-[#1ea05f]/30 outline-none ${isUrdu ? 'urdu-text' : ''}`}
                             />
                          </div>
                        )}

                        {role === UserRole.YOUTH && (
                          <div className="relative">
                             <FiCheckCircle className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                             <input 
                                required
                                type="text" 
                                placeholder={t('signup.institutionPlaceholder')}
                                value={formData.institution}
                                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                                className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-[10px] uppercase font-black focus:ring-2 focus:ring-[#1ea05f]/30 outline-none ${isUrdu ? 'urdu-text' : ''}`}
                             />
                          </div>
                        )}
                      </div>
                   </div>

                   {error && <p className={`text-red-500 text-xs font-bold text-center px-4 ${isUrdu ? 'urdu-text' : ''}`}>{error}</p>}

                   <button 
                     type="button"
                     onClick={handleNext}
                     className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group"
                   >
                      <span className={isUrdu ? 'urdu-text' : ''}>{t('common.nextStep')}</span>
                      <FiArrowRight className={`group-hover:translate-x-1 transition-transform ${isUrdu ? 'rotate-180' : ''}`} />
                   </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                   <div className="relative">
                      <FiLock className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                      <input 
                         required
                         type="password" 
                         placeholder={t('signup.passwordPlaceholder')}
                         value={formData.password}
                         onChange={(e) => setFormData({...formData, password: e.target.value})}
                         className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none ${isUrdu ? 'urdu-text' : ''}`}
                      />
                   </div>

                   {error && <p className={`text-red-500 text-xs font-bold text-center px-4 ${isUrdu ? 'urdu-text' : ''}`}>{error}</p>}

                   <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className={`flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all ${isUrdu ? 'urdu-text' : ''}`}
                      >
                         {t('common.goBack')}
                      </button>
                      <button 
                        type="submit"
                        disabled={loading}
                        className={`flex-[2] py-4 bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all disabled:opacity-50 ${isUrdu ? 'urdu-text' : ''}`}
                      >
                         {loading ? t('signup.loading') : t('signup.submit')}
                      </button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
             <p className={`text-xs text-slate-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${isUrdu ? 'urdu-text' : ''}`}>
                <FiCheckCircle className="text-[#1ea05f]" /> {isUrdu ? 'جے پی ایس ڈی میں رجسٹرڈ' : 'Registered at JPSD'}
             </p>
          </div>

          <p className={`mt-8 text-center text-sm text-slate-500 font-medium ${isUrdu ? 'urdu-text' : ''}`}>
            {t('signup.alreadyRegistered')} <Link href="/login" className="text-[#1ea05f] font-black hover:underline underline-offset-4 italic">{t('signup.signIn')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
