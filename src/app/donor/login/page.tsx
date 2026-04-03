'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiMail, FiLock, FiArrowRight, 
  FiSmartphone, FiShield, FiGlobe, 
  FiCheckCircle, FiFramer, FiCheck
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export default function DonorLoginPage() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic
    console.log('Logging in donor:', formData);
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-[#1ea05f]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] bg-blue-500/5 rounded-full blur-[110px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-[4rem] shadow-2xl shadow-slate-200/60 p-10 md:p-16 relative z-10 border border-slate-100"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mb-8 overflow-hidden group hover:scale-105 transition-transform cursor-pointer">
             <div className="w-full h-full bg-[#1ea05f] text-white flex items-center justify-center font-black text-2xl italic tracking-tighter">BGT</div>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight italic uppercase leading-none">Access Giving Vault</h1>
          <p className="text-slate-500 font-medium mt-4 text-sm px-6">Secure portal for the Baitussalam global community of donors.</p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-slate-50 p-1.5 rounded-[2rem] border border-slate-100 mb-8">
           <button 
             onClick={() => setLoginMethod('email')}
             className={`flex-1 py-3 px-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
               loginMethod === 'email' ? 'bg-white text-[#1ea05f] shadow-sm' : 'text-slate-400 hover:text-slate-600'
             }`}
           >
             Email Access
           </button>
           <button 
             onClick={() => setLoginMethod('phone')}
             className={`flex-1 py-3 px-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
               loginMethod === 'phone' ? 'bg-white text-[#1ea05f] shadow-sm' : 'text-slate-400 hover:text-slate-600'
             }`}
           >
             Phone Direct
           </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-4">
              {loginMethod === 'email' ? (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Credentials Directive</label>
                  <div className="relative group">
                    <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                    <input 
                      required
                      type="email" 
                      placeholder="ali@foundation.org" 
                      className="w-full pl-14 pr-4 py-5 bg-slate-50 border-none rounded-3xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 italic">Mobile Number Sequence</label>
                  <div className="relative group">
                    <FiSmartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                    <input 
                      required
                      type="tel" 
                      placeholder="+92 3XX XXXXXXX" 
                      className="w-full pl-14 pr-4 py-5 bg-slate-50 border-none rounded-3xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between px-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Secret Key</label>
                   <Link href="/donor/forgot-password" size="sm" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Revive Access?</Link>
                </div>
                <div className="relative group">
                  <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1ea05f] transition-colors" />
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full pl-14 pr-4 py-5 bg-slate-50 border-none rounded-3xl font-bold text-slate-800 focus:ring-2 focus:ring-[#1ea05f]/20 outline-none transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
           </div>

           <button 
             type="submit"
             className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
           >
             <span className="relative z-10 italic uppercase tracking-widest">Authenticate & Enter Vault</span>
             <FiArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
           </button>
        </form>

        {/* Social Authentication */}
        <div className="mt-12 space-y-6">
           <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-slate-100" />
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Legacy Social Pathways</span>
              <div className="flex-1 h-[1px] bg-slate-100" />
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                 <FcGoogle size={20} />
                 <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Google Hub</span>
              </button>
              <button className="flex items-center justify-center gap-3 py-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                 <FaFacebook className="text-blue-600" size={20} />
                 <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Facebook Meta</span>
              </button>
           </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100/50 flex flex-col items-center">
           <p className="text-sm font-medium text-slate-500">
             Not a member of the Giving Circle? <Link href="/donor/register" className="text-[#1ea05f] font-black italic hover:underline ml-1">Initiate Profile</Link>
           </p>
        </div>
      </motion.div>

      <div className="mt-12 flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">
         <span className="flex items-center gap-2"><FiGlobe className="text-[#1ea05f]" /> English (GLOBAL)</span>
         <span className="flex items-center gap-2 urdu-text text-xs tracking-normal">اردو (پاکستانی)</span>
      </div>
    </div>
  );
}
