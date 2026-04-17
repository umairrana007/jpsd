'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiArrowRight, FiCheckCircle, FiPhone, FiHeart, FiUserCheck, FiShield, FiBriefcase } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
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
    cnic: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});
  
  const { register, loginWithGoogle } = useAuth();
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
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle(role);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-32 md:pt-40 pb-20 md:pb-32 p-6 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-[#1ea05f]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-2xl z-10" dir={isUrdu ? 'rtl' : 'ltr'}>
        <div className="text-center mb-10">
           <span className="inline-block px-4 py-1.5 rounded-full bg-[#1ea05f]/10 text-[#1ea05f] text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-[#1ea05f]/20">
             {t('signup.title')}
           </span>
           <h2 className={`text-4xl font-black text-white tracking-tighter italic uppercase ${isUrdu ? 'urdu-text' : ''}`}>
             {role === UserRole.VOLUNTEER ? 'Volunteer Induction' : t('signup.joinMission')}
           </h2>
           <p className={`text-slate-400 mt-2 font-medium ${isUrdu ? 'urdu-text' : ''}`}>
             {role === UserRole.VOLUNTEER ? 'Join our elite task force for rapid deployment across Pakistan.' : t('signup.subtitle')}
           </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative">
          {/* Role Selection Tabs */}
          <div className="grid grid-cols-4 gap-3 mb-10">
            <button 
              onClick={() => { setRole(UserRole.DONOR); setStep(1); }}
              className={`h-28 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                role === UserRole.DONOR ? 'bg-[#1ea05f]/10 border-[#1ea05f] text-white shadow-lg shadow-[#1ea05f]/10' : 'bg-white/2 border-white/5 text-slate-500'
              }`}
            >
              <FiHeart size={24} />
              <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">BE A<br/>DONOR</span>
            </button>
            <button 
              onClick={() => { setRole(UserRole.VOLUNTEER); setStep(1); }}
              className={`h-28 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                role === UserRole.VOLUNTEER ? 'bg-blue-600/10 border-blue-600 text-white shadow-lg shadow-blue-600/10' : 'bg-white/2 border-white/5 text-slate-500'
              }`}
            >
              <FiUserCheck size={24} />
              <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">BE A<br/>VOLUNTEER</span>
            </button>
            <button 
              onClick={() => { setRole(UserRole.PROFESSIONAL); setStep(1); }}
              className={`h-28 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                role === UserRole.PROFESSIONAL ? 'bg-purple-600/10 border-purple-600 text-white shadow-lg shadow-purple-600/10' : 'bg-white/2 border-white/5 text-slate-500'
              }`}
            >
              <FiBriefcase size={24} />
              <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">BE A<br/>PROFESSIONAL</span>
            </button>
            <button 
              onClick={() => { setRole(UserRole.YOUTH); setStep(1); }}
              className={`h-28 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                role === UserRole.YOUTH ? 'bg-orange-600/10 border-orange-600 text-white shadow-lg shadow-orange-600/10' : 'bg-white/2 border-white/5 text-slate-500'
              }`}
            >
              <FiCheckCircle size={24} />
              <span className="text-[8px] font-black uppercase tracking-widest text-center leading-tight">BE A YOUTH<br/>MEMBER</span>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {role === UserRole.VOLUNTEER ? (
                <motion.div 
                  key="volunteer-induction"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#1ea05f]/5 border border-[#1ea05f]/20 p-8 rounded-[2.5rem] text-center space-y-6"
                >
                  <FiShield size={48} className="mx-auto text-[#1ea05f]" />
                  <div className="space-y-2">
                    <h4 className="text-white font-black italic tracking-tighter uppercase">Detailed Recruitment Required</h4>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      JPSD volunteers are part of a tactical response unit. To ensure deployment readiness, we require your full profile including CNIC and skills analysis.
                    </p>
                  </div>
                  <Link 
                    href="/volunteer/register"
                    className="group w-full py-5 bg-[#1ea05f] text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all uppercase italic tracking-widest text-[11px] shadow-xl shadow-[#1ea05f]/20"
                  >
                    Start Full Enrollment <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ) : step === 1 ? (
                <motion.div 
                  key="donor-step-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="relative">
                      <FiUser className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                      <input 
                        required
                        type="text" 
                        placeholder={t('signup.fullNamePlaceholder')}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full bg-white/5 border ${validationErrors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none`}
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
                        className={`w-full bg-white/5 border ${validationErrors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <FiUserCheck className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                        <input 
                          required
                          type="text" 
                          placeholder="CNIC"
                          value={formData.cnic}
                          onChange={(e) => setFormData({...formData, cnic: e.target.value})}
                          className={`w-full bg-white/5 border ${validationErrors.cnic ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-[10px] font-black`}
                        />
                      </div>
                      <div className="relative">
                        <FiPhone className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500`} />
                        <input 
                          required
                          type="text" 
                          placeholder="Phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className={`w-full bg-white/5 border ${validationErrors.phone ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-[10px] font-black`}
                        />
                      </div>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                  <button 
                    type="button"
                    onClick={handleNext}
                    className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group uppercase italic tracking-widest text-[11px]"
                  >
                    Next Step <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold"><span className="bg-[#0f172a] px-4 text-slate-500 tracking-[0.2em]">{isUrdu ? 'یا' : 'OR'}</span></div>
                  </div>

                  <button 
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full py-4.5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-4 group shadow-xl shadow-white/5 uppercase italic tracking-widest text-[11px]"
                  >
                    <div className="bg-white p-1 rounded-lg">
                      <FaGoogle className="text-[#4285F4] text-lg" />
                    </div>
                    <span className={isUrdu ? 'urdu-text' : ''}>
                      {isUrdu ? 'گوگل کے ساتھ سائن اپ کریں' : 'Signup with Google'}
                    </span>
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="donor-step-2"
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
                      placeholder="SET PASSWORD"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-14 text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none"
                    />
                  </div>

                  {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                    >
                      BACK
                    </button>
                    <button 
                      type="submit"
                      disabled={loading}
                      className="flex-[2] py-4 bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            {t('signup.alreadyRegistered')} <Link href="/login" className="text-[#1ea05f] font-black hover:underline italic">{t('signup.signIn')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
