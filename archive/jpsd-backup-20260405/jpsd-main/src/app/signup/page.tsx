'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, FiLock, FiUser, FiBriefcase, 
  FiArrowRight, FiCheckCircle, FiHeart, FiUserCheck 
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { useRouter } from 'next/navigation';
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
    skills: '' // For volunteers
  });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Regular Expression Guards
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^03\d{2}-\d{7}$/;
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

    if (!formData.name.trim()) errors.name = 'Operational Name required';
    if (!emailRegex.test(formData.email)) errors.email = 'Invalid Tactical Email';
    if (!phoneRegex.test(formData.phone)) errors.phone = 'Format: 03XX-XXXXXXX';
    if (!cnicRegex.test(formData.cnic)) errors.cnic = 'Format: XXXXX-XXXXXXX-X';
    if (formData.password.length < 8) errors.password = 'Security Key (min 8 chars) required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => setStep(step + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      setError('Operational Data Correction Required');
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name, role);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-32 md:pt-40 p-6 text-center">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 max-w-md w-full"
         >
            <div className="w-20 h-20 bg-[#1ea05f]/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1ea05f] text-4xl shadow-xl shadow-[#1ea05f]/10">
               <FiCheckCircle />
            </div>
            <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">Verification Sent</h2>
            <p className="text-slate-400 mb-8 font-medium">
               {role === UserRole.VOLUNTEER 
                 ? "Account created! Please check your email for verification. Once verified, an admin will review your profile."
                 : "Account created! You can now log in and start your journey."}
            </p>
            <Link href="/login" className="block w-full py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">
               Proceed to Login
            </Link>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-32 md:pt-40 p-6 relative overflow-hidden">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-[#1ea05f]/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-xl z-10 py-10">
        <div className="text-center mb-10">
           <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase underline decoration-[#1ea05f] decoration-4 underline-offset-8">Join the Mission</h2>
           <p className="text-slate-500 mt-6 font-medium">Help us reach those who need it most.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl relative">
          
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-10">
             {[1, 2].map((s) => (
               <div key={s} className={`h-1 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-[#1ea05f]' : 'w-4 bg-white/10'}`}></div>
             ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-4">
                     <button 
                       type="button"
                       onClick={() => setRole(UserRole.DONOR)}
                       className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${
                         role === UserRole.DONOR ? 'bg-[#1ea05f]/10 border-[#1ea05f] text-white shadow-xl shadow-[#1ea05f]/10' : 'bg-white/5 border-white/10 text-slate-500'
                       }`}
                     >
                        <FiHeart size={24} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Become a Donor</span>
                     </button>
                     <button 
                       type="button"
                       onClick={() => setRole(UserRole.VOLUNTEER)}
                       className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${
                         role === UserRole.VOLUNTEER ? 'bg-blue-600/10 border-blue-600 text-white shadow-xl shadow-blue-600/10' : 'bg-white/5 border-white/10 text-slate-500'
                       }`}
                     >
                        <FiUserCheck size={24} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Become a Volunteer</span>
                     </button>
                  </div>

                   <div className="space-y-4">
                      <div className="relative">
                         <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                         <input 
                            required
                            type="text" 
                            placeholder="Operational Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className={`w-full bg-white/5 border ${validationErrors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none`}
                         />
                      </div>
                      <div className="relative">
                         <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                         <input 
                            required
                            type="email" 
                            placeholder="Tactical Email (Official)"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={`w-full bg-white/5 border ${validationErrors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none`}
                         />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="relative">
                            <FiUserCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input 
                               required
                               type="text" 
                               placeholder="CNIC (00000-0000000-0)"
                               value={formData.cnic}
                               onChange={(e) => setFormData({...formData, cnic: e.target.value})}
                               className={`w-full bg-white/5 border ${validationErrors.cnic ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 pl-14 pr-6 text-white text-[10px] uppercase font-black focus:ring-2 focus:ring-[#1ea05f]/30 outline-none`}
                            />
                         </div>
                         <div className="relative">
                            <FiUserCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input 
                               required
                               type="text" 
                               placeholder="Phone (03XX-XXXXXXX)"
                               value={formData.phone}
                               onChange={(e) => setFormData({...formData, phone: e.target.value})}
                               className={`w-full bg-white/5 border ${validationErrors.phone ? 'border-red-500' : 'border-white/10'} rounded-2xl py-4 pl-14 pr-6 text-white text-[10px] uppercase font-black focus:ring-2 focus:ring-[#1ea05f]/30 outline-none`}
                            />
                         </div>
                      </div>
                   </div>

                  <button 
                    type="button"
                    onClick={handleNext}
                    className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group"
                  >
                     <span>Next Step</span>
                     <FiArrowRight className="group-hover:translate-x-1" />
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
                     <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                     <input 
                        required
                        type="password" 
                        placeholder="Choose a Strong Password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none"
                     />
                  </div>

                  {role === UserRole.VOLUNTEER && (
                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                       <div className="relative">
                          <FiBriefcase className="absolute left-5 top-5 text-slate-500" />
                          <textarea 
                             placeholder="Which skills can you contribute? (e.g. Arabic translation, Medical, Logistics)"
                             value={formData.skills}
                             onChange={(e) => setFormData({...formData, skills: e.target.value})}
                             className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 outline-none h-32 resize-none"
                          />
                       </div>
                    </motion.div>
                  )}

                  {error && <p className="text-red-500 text-xs font-bold text-center px-4">{error}</p>}

                  <div className="flex gap-4">
                     <button 
                       type="button"
                       onClick={() => setStep(1)}
                       className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                     >
                        Back
                     </button>
                     <button 
                       type="submit"
                       disabled={loading}
                       className="flex-[2] py-4 bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all disabled:opacity-50"
                     >
                        {loading ? 'Creating Account...' : 'Complete Signup'}
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            Already registered? <Link href="/login" className="text-[#1ea05f] font-black hover:underline underline-offset-4 italic">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
