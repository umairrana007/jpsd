'use client';

import React, { useState } from 'react';
import { 
  FiUser, FiMail, FiPhone, FiLock, 
  FiShield, FiCalendar, FiMapPin, FiBriefcase,
  FiClock, FiUpload, FiAlertCircle, FiArrowRight,
  FiArrowLeft, FiCheckCircle, FiTrash2, FiPlusCircle,
  FiRefreshCw
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { createVolunteer } from '@/lib/firebaseUtils';

export default function VolunteerRegisterPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
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
    interests: [] as string[],
    availability: { days: [] as string[], hours: '' },
    emergencyContact: { name: '', phone: '', relation: '' }
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    const volunteerId = await createVolunteer({
      ...formData,
      dob: new Date(formData.dob),
      joinedAt: new Date()
    });
    
    if (volunteerId) {
      alert('Identity Induction committed. Deployment eligibility review pending HQ approval.');
      window.location.href = '/volunteer/login';
    }
    setSubmitting(false);
  };

  const [newSkill, setNewSkill] = useState('');
  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({...formData, skills: [...formData.skills, newSkill]});
      setNewSkill('');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1ea05f]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Progress HUD */}
      <div className="w-full max-w-2xl mb-12 flex justify-between items-center relative z-10">
         {[1, 2, 3].map((s) => (
           <div key={s} className="flex flex-col items-center gap-3">
             <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center font-black transition-all duration-500 ${step >= s ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'}`}>
                {step > s ? <FiCheckCircle /> : s}
             </div>
             <span className={`text-[9px] font-black uppercase tracking-widest ${step >= s ? 'text-slate-800' : 'text-slate-300'}`}>
                {s === 1 ? 'Identity' : s === 2 ? 'Logic' : 'Vetting'}
             </span>
           </div>
         ))}
         <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[70%] h-0.5 bg-slate-100 -z-10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(step - 1) * 50}%` }}
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
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
               <div className="text-center space-y-4">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">Genesis Identity Induction</h2>
                  <p className="text-sm font-medium text-slate-500">Provide your verified identification for field operations deployment.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name & Phone */}
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Legal Identity Name</label>
                        <div className="relative group">
                          <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1ea05f] transition-colors" />
                          <input type="text" placeholder="Asad Ullah" className="w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/10 outline-none" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Mobile Access Frequency</label>
                        <div className="relative group">
                          <FiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1ea05f] transition-colors" />
                          <input type="tel" placeholder="+92 3XX XXXXXXX" className="w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/10 outline-none" />
                        </div>
                     </div>
                  </div>

                  {/* DOB & Gender */}
                  <div className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Cycle Start (DOB)</label>
                        <div className="relative group">
                          <FiCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1ea05f] transition-colors" />
                          <input type="date" className="w-full pl-14 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/10 outline-none" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Humanitarian Gender</label>
                        <select className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/10 outline-none appearance-none">
                           <option>Male</option>
                           <option>Female</option>
                           <option>Other</option>
                        </select>
                     </div>
                  </div>

                  {/* CNIC (Mandatory) */}
                  <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">National Verification Serial (CNIC)</label>
                     <div className="relative group">
                        <FiShield className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1ea05f] transition-colors" />
                        <input type="text" placeholder="42XXX-XXXXXXX-X" className="w-full pl-14 pr-8 py-5 bg-slate-50 border-none rounded-[1.5rem] font-bold text-xl text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/10 outline-none uppercase tracking-tighter" />
                     </div>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Credentials Authentication</label>
                     <div className="relative group">
                        <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1ea05f] transition-colors" />
                        <input type="password" placeholder="Secure Vault Key (Min 8 chars)" className="w-full pl-14 pr-8 py-4 bg-slate-50 border-none rounded-[1.5rem] font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/10 outline-none" />
                     </div>
                  </div>
               </div>

               <button 
                 onClick={nextStep}
                 className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
               >
                 <span>Calibrate Tactical Logic</span>
                 <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
               <div className="flex items-center gap-6 border-b border-slate-100 pb-10">
                  <button onClick={prevStep} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all"><FiArrowLeft /></button>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Tactical Logic Assignment</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Address */}
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Regional Operations City</label>
                     <input type="text" placeholder="Karachi" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/10 outline-none" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Province Domain</label>
                     <input type="text" placeholder="Sindh" className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/10 outline-none" />
                  </div>

                  {/* Skills Tagging */}
                  <div className="md:col-span-2 space-y-4">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Operational Skillset (Add Multi)</label>
                     <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="e.g. Rapid First Aid" 
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          className="flex-1 px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/10 outline-none" 
                        />
                        <button onClick={addSkill} className="w-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-[#1ea05f] hover:text-white transition-all">
                           <FiPlusCircle size={22} />
                        </button>
                     </div>
                     <div className="flex flex-wrap gap-3 mt-2">
                        {formData.skills.map(skill => (
                           <span key={skill} className="px-4 py-2 bg-[#1ea05f]/10 text-[#1ea05f] rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                              {skill} <FiTrash2 className="cursor-pointer" onClick={() => setFormData({...formData, skills: formData.skills.filter(s => s !== skill)})} />
                           </span>
                        ))}
                     </div>
                  </div>

                  {/* Availability */}
                  <div className="md:col-span-2 space-y-6 bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                     <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4 flex items-center gap-2 italic">
                        <FiClock className="text-[#1ea05f]" /> Temporal Availability Mapping
                     </h4>
                     <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                           <button 
                             key={day}
                             onClick={() => {
                                const days = formData.availability.days.includes(day) 
                                   ? formData.availability.days.filter(d => d !== day) 
                                   : [...formData.availability.days, day];
                                setFormData({...formData, availability: {...formData.availability, days}});
                             }}
                             className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.availability.days.includes(day) ? 'bg-[#1ea05f] text-white shadow-lg' : 'bg-white text-slate-300 border border-slate-100'}`}
                           >
                              {day}
                           </button>
                        ))}
                     </div>
                     <div className="mt-6 flex items-center gap-4">
                        <div className="flex-1">
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Cycle Window (Hours)</p>
                           <input type="text" placeholder="e.g. 5:00 PM - 9:00 PM" className="w-full bg-white px-6 py-4 rounded-2xl font-bold text-slate-800 text-xs focus:ring-0 outline-none" />
                        </div>
                     </div>
                  </div>
               </div>

               <button 
                 onClick={nextStep}
                 className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group"
               >
                 <span>Finalize Vetting Protocol</span>
                 <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
               </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-10"
            >
               <div className="flex items-center gap-6 border-b border-slate-100 pb-10">
                  <button onClick={prevStep} className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-all"><FiArrowLeft /></button>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Vetting & Verification Hub</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Emergency Support */}
                  <div className="space-y-6">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Emergency Relay Coordination</label>
                     <div className="space-y-4 bg-red-50/50 p-8 rounded-[2.5rem] border border-red-100/50">
                        <div className="relative group">
                           <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                           <input type="text" placeholder="Contact Full Name" className="w-full pl-12 pr-4 py-3.5 bg-white border-none rounded-xl font-bold text-slate-800 text-xs focus:ring-0" />
                        </div>
                        <div className="relative group">
                           <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                           <input type="tel" placeholder="Relay Phone Number" className="w-full pl-12 pr-4 py-3.5 bg-white border-none rounded-xl font-bold text-slate-800 text-xs focus:ring-0" />
                        </div>
                        <div className="relative group">
                           <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                           <input type="text" placeholder="Relationship Protocol" className="w-full pl-12 pr-4 py-3.5 bg-white border-none rounded-xl font-bold text-slate-800 text-xs focus:ring-0" />
                        </div>
                     </div>
                  </div>

                  {/* Asset Uploads */}
                  <div className="space-y-6">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Operational Asset Proofs</label>
                     <div className="space-y-4">
                        <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-[#1ea05f] transition-all cursor-pointer">
                           <FiUpload className="text-slate-300 group-hover:text-[#1ea05f] mb-4" size={32} />
                           <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Profile Genesis Photo</h5>
                           <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Clear Facial ID Required</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[2.5rem] flex items-center justify-between group cursor-pointer border border-slate-100 hover:border-blue-400 transition-all">
                           <div className="flex items-center gap-4">
                              <FiBriefcase className="text-blue-400" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-800 text-left">Deploy CV / Resume Portfolio</span>
                           </div>
                           <FiUpload className="text-slate-300" />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-slate-900 p-10 rounded-[4rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1ea05f]/20 rounded-full blur-3xl -mr-16 -mt-16" />
                  <div className="flex gap-4">
                     <FiShield size={32} className="text-[#1ea05f]" />
                     <div>
                        <h4 className="text-lg font-black italic uppercase italic tracking-widest italic tracking-widest">Genesis Verification Protocol</h4>
                        <p className="text-xs font-medium text-slate-400 leading-relaxed mt-2 italic">
                           Your application will undergo a deep-vetting review by JPSD HQ. You will receive a secure notification on deployment eligibility within 48 operational hours.
                        </p>
                     </div>
                  </div>
               </div>

               <button 
                 onClick={handleSubmit}
                 disabled={submitting}
                 className="w-full py-8 bg-[#1ea05f] text-white font-black rounded-3xl shadow-2xl shadow-[#1ea05f]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group italic uppercase tracking-widest disabled:opacity-50"
               >
                 {submitting ? <FiRefreshCw className="animate-spin" /> : <FiCheckCircle size={24} />} 
                 {submitting ? 'Committing assets...' : 'Commit Identity & Request Activation'}
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12 flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">
         <span className="flex items-center gap-2"><FiShield className="text-[#1ea05f]" /> HQ Encrypted</span>
         <span className="flex items-center gap-2"><FiAlertCircle className="text-[#1ea05f]" /> Identity Verified</span>
         <span className="flex items-center gap-2"><FiCheckCircle className="text-[#1ea05f]" /> Humanitarian Certified</span>
      </div>
    </div>
  );
}

