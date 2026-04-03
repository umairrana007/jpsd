'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiUser, FiMail, FiPhone, FiLock, 
  FiArrowRight, FiShield, FiMapPin, FiCreditCard,
  FiGlobe, FiCheckCircle
} from 'react-icons/fi';

export default function DonorRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cnic: '',
    address: ''
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic would go here
    console.log('Registering donor:', formData);
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1ea05f]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 p-8 md:p-14 relative z-10 border border-slate-100"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-[#1ea05f]/10 rounded-3xl flex items-center justify-center text-[#1ea05f] mb-6">
            <FiUser size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase">Join the Giving Circle</h1>
          <p className="text-slate-500 font-medium mt-2">Create your donor account to track impact and manage your charity heritage.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Identity Name</label>
                <div className="relative group">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                  <input 
                    required
                    type="text" 
                    placeholder="Muhammad Ali" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Directive</label>
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                  <input 
                    required
                    type="email" 
                    placeholder="ali@example.com" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Mobile Access Number</label>
                <div className="relative group">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                  <input 
                    required
                    type="tel" 
                    placeholder="+92 3XX XXXXXXX" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Secure Vault Key</label>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              {/* CNIC (Optional) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex justify-between">
                   <span>CNIC / National ID</span>
                   <span className="text-blue-500/50">Optional</span>
                </label>
                <div className="relative group">
                  <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="42XXX-XXXXXXX-X" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                    value={formData.cnic}
                    onChange={(e) => setFormData({...formData, cnic: e.target.value})}
                  />
                </div>
              </div>

              {/* Address (Optional) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex justify-between">
                   <span>Postal Home Base</span>
                   <span className="text-blue-500/50">Optional</span>
                </label>
                <div className="relative group">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Street, City, Country" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
           </div>

           <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50 flex items-start gap-4">
              <FiShield className="text-blue-500 mt-1" size={20} />
              <div>
                <p className="text-xs font-bold text-slate-800 italic uppercase">Heritage Privacy Commitment</p>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">
                  Your data is protected by the humanitarian encryption protocols. We only use your information for donation tracking and tax certificate issuance.
                </p>
              </div>
           </div>

           <button 
             type="submit"
             className="w-full py-5 bg-[#1ea05f] text-white font-black rounded-3xl shadow-2xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
           >
             <span className="relative z-10 italic uppercase tracking-widest">Construct My Genesis Profile</span>
             <FiArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
             <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
           </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col items-center gap-4">
           <p className="text-sm font-medium text-slate-500">
             Already a member of the circle? <Link href="/donor/login" className="text-[#1ea05f] font-black italic hover:underline">Access Vault</Link>
           </p>
           
           <div className="flex items-center gap-6 mt-2">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <FiGlobe className="text-[#1ea05f]" /> English (Primary)
              </div>
              <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest urdu-text">
                 اردو (قوم)
              </div>
           </div>
        </div>
      </motion.div>

      {/* Footer Info */}
      <div className="mt-12 flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">
         <span className="flex items-center gap-2"><FiCheckCircle className="text-[#1ea05f]" /> SSL Secured</span>
         <span className="flex items-center gap-2"><FiCheckCircle className="text-[#1ea05f]" /> Shariah Compliant</span>
         <span className="flex items-center gap-2"><FiCheckCircle className="text-[#1ea05f]" /> Global Relief Network</span>
      </div>
    </div>
  );
}
