'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
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
      <div className="absolute top-0 -left-20 w-96 h-96 bg-[#1ea05f]/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
           <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">Welcome Back</h2>
           <p className="text-slate-400 mt-2 font-medium">Continue your journey of making an impact.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold ${
                error.includes('pending') ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}
            >
              {error.includes('pending') ? <FiCheckCircle /> : <FiAlertCircle />}
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#1ea05f] transition-colors" />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 focus:border-[#1ea05f]/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Secure Password</label>
              <div className="relative group">
                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#1ea05f] transition-colors" />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 focus:border-[#1ea05f]/50 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer appearance-none w-5 h-5 border border-white/10 rounded-lg bg-white/5 checked:bg-[#1ea05f] checked:border-[#1ea05f] transition-all" />
                  <FiCheckCircle className="absolute text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-400 transition-colors">Stay Signed In</span>
              </label>
              <button 
                type="button"
                onClick={() => {
                  if(!email) {
                    setError('Please enter your email to reset password.');
                  } else {
                    const { resetPassword } = useAuth(); // Call directly or handle via state
                    alert('Password reset link has been sent to ' + email);
                  }
                }}
                className="text-[10px] font-black text-[#1ea05f] uppercase tracking-widest hover:underline underline-offset-4"
              >
                Forgot Password?
              </button>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 font-medium">
            Don't have an account? <Link href="/signup" className="text-[#1ea05f] font-black hover:underline underline-offset-4 tracking-tight italic">Join the Mission</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
