'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface HeroSectionProps {
  settings?: {
    heroTitleEn?: string;
    heroTitleUr?: string;
    heroImage?: string;
  }
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const { t, language } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    // Prefetch donor-critical flows
    router.prefetch('/donation');
  }, [router]);

  const displayTitleEn = settings?.heroTitleEn || t('home.hero.title.part1');
  const displayTitleUr = settings?.heroTitleUr || t('home.hero.title.full');

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 bg-gradient-to-br from-white via-[#f8fafc] to-[#f0fdf4] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-[600px] h-[600px] bg-[#1ea05f]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-[600px] h-[600px] bg-[#3b82f6]/10 rounded-full blur-[120px] animate-pulse" />
      
      {/* Grid Pattern */}
      {/* Grid pattern fix for 403 error */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-24 lg:pt-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ur' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex-[1.2] space-y-10 text-center ${language === 'ur' ? 'lg:text-right' : 'lg:text-left'}`}
          >
            <div className="space-y-6">
              <motion.div
                dir={language === 'ur' ? 'rtl' : 'ltr'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`inline-flex items-center space-x-3 rtl:space-x-reverse bg-white/80 backdrop-blur-xl px-6 py-2.5 rounded-2xl border border-[#1ea05f]/20 shadow-xl shadow-[#1ea05f]/5 ${language === 'ur' ? 'text-right' : ''}`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#1ea05f] animate-ping" />
                <span className={`text-[#1ea05f] font-black uppercase text-[10px] md:text-xs tracking-[0.3em] ${language === 'ur' ? 'urdu-text tracking-normal' : ''}`}>
                  {t('home.hero.badge')}
                </span>
              </motion.div>
              
              {language === 'ur' ? (
                <h1 className="urdu-text text-5xl md:text-7xl lg:text-[80px] font-black text-[#0f172a] leading-tight drop-shadow-sm text-center lg:text-right">
                  {displayTitleUr}
                </h1>
              ) : (
                <h1 className="english-text text-6xl md:text-8xl lg:text-[100px] font-black text-[#0f172a] leading-[0.95] tracking-tightest">
                  {displayTitleEn}
                </h1>
              )}
              
              <p className={language === 'ur' ? "urdu-text text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed mx-auto lg:ml-auto lg:mr-0 font-medium opacity-80" : "english-text text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed lg:mx-0 mx-auto font-medium opacity-80"}>
                {t('home.hero.subtitle.full')}
              </p>
            </div>

            <div className={`flex flex-wrap gap-6 justify-center ${language === 'ur' ? 'lg:justify-end' : 'lg:justify-start'} pt-4 ${language === 'ur' ? 'flex-row-reverse' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
              <Link href="/donation">
                <Button
                  variant="primary"
                  size="lg"
                  className={`!px-8 md:!px-12 !py-5 md:!py-8 text-lg md:text-xl !rounded-[2rem] shadow-2xl shadow-[#1ea05f]/20 hover:scale-[1.03] transition-all bg-[#1ea05f] hover:bg-[#168a50] ${language === 'ur' ? 'urdu-text' : ''}`}
                >
                  {t('home.hero.cta.donate')}
                </Button>
              </Link>
              <Link href="/causes">
                <Button
                  variant="outline"
                  size="lg"
                  className={`!px-8 md:!px-12 !py-5 md:!py-8 text-lg md:text-xl !rounded-[2rem] border-slate-200 text-slate-600 hover:border-[#1ea05f] hover:text-[#1ea05f] glass-card ${language === 'ur' ? 'urdu-text' : ''}`}
                >
                  {t('home.hero.cta.programs')}
                </Button>
              </Link>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-slate-100 max-w-xl mx-auto ${language === 'ur' ? 'lg:mr-0 lg:ml-auto' : 'lg:mx-0'}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
              {[
                { label: t('home.hero.stat.beneficiaries'), value: '5M+' },
                { label: t('home.hero.stat.volunteers.label'), value: '10K+' },
                { label: t('home.hero.stat.countries.label'), value: '25+' },
              ].map((m, i) => (
                <div key={i} className="space-y-1 group cursor-default text-center">
                  <p dir="ltr" className="text-4xl font-black text-[#0f172a] group-hover:text-[#1ea05f] transition-colors english-text">{m.value}</p>
                  <p className={`text-[11px] uppercase font-bold text-slate-400 ${language === 'ur' ? 'urdu-text text-xs tracking-normal' : 'tracking-widest whitespace-nowrap'}`}>{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex-1 relative w-full max-w-2xl group"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] aspect-[4/5] border-[12px] border-white/80 backdrop-blur-3xl">
              <Image
                src={settings?.heroImage || "/images/jpsd_hero.png"}
                alt="JPSD Hero Banner"
                width={1200}
                height={1500}
                className="object-cover w-full h-full transition-transform duration-[2000ms] group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Artistic Floating Elements */}
            <motion.div
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -top-12 ${language === 'ur' ? '-left-12' : '-right-12'} w-48 h-48 bg-white/70 backdrop-blur-2xl rounded-[3rem] p-8 shadow-3xl border border-white/40 z-20 flex flex-col justify-center items-center text-center space-y-2`}
            >
              <div className="w-16 h-16 rounded-full bg-[#1ea05f]/10 flex items-center justify-center text-4xl">🕊️</div>
              <span className={`text-[11px] font-black text-[#1ea05f] uppercase tracking-widest ${language === 'ur' ? 'urdu-text' : ''}`}>
                {t('home.hero.floating.peace')}
              </span>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className={`absolute -bottom-8 ${language === 'ur' ? '-right-16 pr-12 pl-8' : '-left-16 pr-12 pl-8'} bg-white/80 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-3xl z-20 border border-white/40 flex items-center space-x-5 rtl:space-x-reverse`}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl shadow-xl shadow-orange-500/20">
                ✨
              </div>
              <div className={`flex flex-col ${language === 'ur' ? 'text-right' : ''}`}>
                <span className={`text-3xl font-black text-[#0f172a] leading-none tracking-tight ${language === 'ur' ? 'urdu-text' : 'English-text'}`}>
                  {t('home.hero.floating.taxFree')}
                </span>
                <span className={`text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
                  {t('home.hero.floating.certified')}
                </span>
              </div>
            </motion.div>

            {/* Decorative Rings */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#1ea05f]/5 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-[#3b82f6]/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
