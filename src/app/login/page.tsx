'use client';

// Authentication page for JPSD Portal

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, setGlobalAlert } = useAuth();
  const router = useRouter();
  const { t, language } = useLanguage();
  const isUrdu = language === 'ur';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // Instead of hardcoded emails, we'll let the role-based logic handle it.
      // We'll redirect to a generic /redirect path or handle it here by watching currentUserData.
      // For now, let's use a small delay and then check the role if available, 
      // otherwise default to dashboard which will handle its own redirection.
      
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      // Role detection happens after login
      router.push('/donor/dashboard');
      setTimeout(() => router.refresh(), 100);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start pt-32 md:pt-40 pb-20 md:pb-32 p-6 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-[#1ea05f]/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
        dir={isUrdu ? 'rtl' : 'ltr'}
      >
        <div className="text-center mb-10">
           <h2 className={`text-4xl font-black text-white tracking-tighter italic uppercase ${isUrdu ? 'urdu-text' : ''}`}>
             {t('login.title')}
           </h2>
           <p className={`text-slate-400 mt-2 font-medium ${isUrdu ? 'urdu-text' : ''}`}>
             {t('login.subtitle')}
           </p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold ${
                error.includes('pending') ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
              } ${isUrdu ? 'urdu-text' : ''}`}
            >
              {error.includes('pending') ? <FiCheckCircle /> : <FiAlertCircle />}
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className={`text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 ${isUrdu ? 'urdu-text' : ''}`}>
                {t('login.emailLabel')}
              </label>
              <div className="relative group">
                <FiMail className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#1ea05f] transition-colors`} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 focus:border-[#1ea05f]/50 transition-all outline-none`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 ${isUrdu ? 'urdu-text' : ''}`}>
                 {t('login.passwordLabel')}
              </label>
              <div className="relative group">
                <FiLock className={`${isUrdu ? 'right-5' : 'left-5'} absolute top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#1ea05f] transition-colors`} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 ${isUrdu ? 'pr-14 pl-6' : 'pl-14 pr-6'} text-white text-sm focus:ring-2 focus:ring-[#1ea05f]/30 focus:border-[#1ea05f]/50 transition-all outline-none`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer appearance-none w-5 h-5 border border-white/10 rounded-lg bg-white/5 checked:bg-[#1ea05f] checked:border-[#1ea05f] transition-all" />
                  <FiCheckCircle className="absolute text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className={`text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-400 transition-colors ${isUrdu ? 'urdu-text' : ''}`}>
                  {t('login.staySignedIn')}
                </span>
              </label>
              <button 
                type="button"
                onClick={() => {
                  if(!email) {
                    setError(t('login.enterEmail'));
                  } else {
                    setGlobalAlert(`${t('login.resetSent')} ${email}`, 'success');
                  }
                }}
                className={`text-[10px] font-black text-[#1ea05f] uppercase tracking-widest hover:underline underline-offset-4 ${isUrdu ? 'urdu-text' : ''}`}
              >
                {t('login.forgotPassword')}
              </button>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-gradient-to-br from-[#1ea05f] to-[#15804a] text-white font-black rounded-2xl shadow-xl shadow-[#1ea05f]/20 hover:opacity-90 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {loading ? t('login.authenticating') : (
                <>
                  <span className={isUrdu ? 'urdu-text' : ''}>{t('login.signIn')}</span>
                  <FiArrowRight className={`group-hover:translate-x-1 transition-transform ${isUrdu ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold"><span className="bg-[#0f172a] px-4 text-slate-500 tracking-[0.2em]">{isUrdu ? 'یا' : 'OR'}</span></div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4.5 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-4 group shadow-xl shadow-white/5 uppercase italic tracking-widest text-[11px]"
            >
              <div className="bg-white p-1 rounded-lg">
                <FaGoogle className="text-[#4285F4] text-lg" />
              </div>
              <span className={isUrdu ? 'urdu-text' : ''}>
                {isUrdu ? 'گوگل سے لاگ ان کریں' : 'Login with Google'}
              </span>
            </button>
          </form>

          <p className={`mt-8 text-center text-sm text-slate-500 font-medium ${isUrdu ? 'urdu-text' : ''}`}>
            {t('login.noAccount')} <Link href="/signup" className="text-[#1ea05f] font-black hover:underline underline-offset-4 tracking-tight italic">{t('login.joinMission')}</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
