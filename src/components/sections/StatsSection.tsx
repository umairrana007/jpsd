'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SiteSettings } from '@/lib/settings';

interface StatItemProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
  lang?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, icon, delay = 0, ...props }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center p-8 glass rounded-2xl border border-white/20 shadow-xl hover-lift bg-white/40"
    >
      {icon && <div className="text-[#f39c12] text-5xl mb-4 flex justify-center">{icon}</div>}
      <h3 dir="ltr" className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#27ae60] to-[#2980b9] bg-clip-text text-transparent mb-3 English-text text-center">
        {count.toLocaleString()}+
      </h3>
      <p className={`text-[#2c3e50] font-bold ${props.lang === 'ur' ? 'urdu-text text-[1rem]' : 'text-lg tracking-wide uppercase'}`}>
        {label}
      </p>
    </motion.div>
  );
};

export const StatsSection: React.FC<{ settings?: SiteSettings }> = ({ settings }) => {
  const { language } = useLanguage();
  
  const stats = {
    totalLivesServed: settings?.livesServed ?? 500000,
    totalDonationsReceived: settings?.donationsReceived ?? 1240000,
    activePrograms: settings?.programsCount ?? 42,
    volunteersCount: settings?.volunteersCount ?? 1500,
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Section Info */}
          <div className="lg:w-1/3 space-y-6">
            <span className={`text-primary-green font-bold ${language === 'ur' ? 'urdu-text text-xl' : 'tracking-widest uppercase text-sm'} inline-block underline decoration-accent-gold underline-offset-8`}>
              {language === 'ur' ? 'ہمارے عالمی اثرات' : 'Our Global Impact'}
            </span>
            <h2 className={`text-4xl md:text-5xl font-black text-[#1e293b] leading-tight ${language === 'ur' ? 'urdu-text leading-[1.4]' : 'english-text'}`}>
              {language === 'ur' ? 'تبدیل شدہ زندگیوں کی پہچان' : 'Evidence of Transformed Lives'}
            </h2>
            <p className={`text-gray-500 text-lg leading-relaxed ${language === 'ur' ? 'urdu-text' : 'english-text'}`}>
              {language === 'ur' 
                ? 'ہر عدد (Number) ایک کہانی ہے استقامت کی، ایک خاندان جسے سہارا ملا، اور ایک ایسا معاشرہ جو آپ کے عطیات کی بدولت بااختیار بنا۔'
                : 'Every number represents a story of resilience, a family supported, and a community empowered through your generous contributions.'}
            </p>
          </div>

          {/* Asymmetric Stats Grid */}
            <div className={`lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 relative ${language === 'ur' ? 'lg:pr-16 text-right' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <div className="space-y-8">
              <StatItem
                value={stats.totalLivesServed}
                label={language === 'ur' ? 'متاثرین کی خدمت' : 'Lives Served'}
                delay={0}
                icon="🤝"
              />
              <div className={language === 'ur' ? 'lg:-translate-x-12' : 'lg:translate-x-12'}>
                <StatItem
                  value={stats.activePrograms}
                  label={language === 'ur' ? 'فعال پروگرام' : 'Active Programs'}
                  delay={0.4}
                  icon="📋"
                />
              </div>
            </div>
            <div className="space-y-8 pt-0 md:pt-12">
              <StatItem
                value={stats.totalDonationsReceived}
                label={language === 'ur' ? 'مجموعی عطیات' : 'Donations'}
                delay={0.2}
                icon="💰"
              />
              <div className={language === 'ur' ? 'lg:translate-x-12' : 'lg:-translate-x-12'}>
                <StatItem
                  value={stats.volunteersCount}
                  label={language === 'ur' ? 'رضاکار' : 'Volunteers'}
                  delay={0.6}
                  icon="✋"
                />
              </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-green/10 rounded-full blur-[100px] -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
