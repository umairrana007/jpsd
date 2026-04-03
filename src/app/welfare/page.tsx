'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

export default function WelfarePage() {
  const { t, language } = useLanguage();

  const services = [
    {
      id: 'projects',
      title: t('welfare.service.projects.title'),
      description: t('welfare.service.projects.desc'),
      image: '/images/fallback.jpg',
      href: '/welfare/projects',
      icon: '🏗️',
    },
    {
      id: 'causes',
      title: t('welfare.service.causes.title'),
      description: t('welfare.service.causes.desc'),
      image: '/images/fallback.jpg',
      href: '/welfare/causes',
      icon: '🤝',
    },
    {
      id: 'news',
      title: t('welfare.service.news.title'),
      description: t('welfare.service.news.desc'),
      image: '/images/fallback.jpg',
      href: '/welfare/news',
      icon: '📰',
    },
  ];
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className={`text-center max-w-3xl mx-auto mb-20 space-y-6 ${language === 'ur' ? 'urdu-text' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full text-green-700 font-bold text-sm tracking-wider"
          >
            <span>💚</span>
            <span className={language === 'ur' ? 'urdu-text' : ''}>{t('welfare.badge')}</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-6xl font-black text-slate-900 leading-tight ${language === 'ur' ? 'urdu-text' : ''}`}
          >
            {language === 'ur' ? (
              <span className="urdu-text">{t('welfare.title')}</span>
            ) : (
              <>{t('welfare.title').split(' ')[0]} {t('welfare.title').split(' ')[1]} <span className="text-[#27ae60]">{t('welfare.title').split(' ').slice(2).join(' ')}</span></>
            )}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg md:text-xl text-slate-500 font-medium ${language === 'ur' ? 'urdu-text opacity-80' : ''}`}
          >
            {t('welfare.subtitle')}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl">
                    {service.icon}
                  </div>
                  <h2 className={`text-2xl font-bold text-white ${language === 'ur' ? 'urdu-text' : ''}`}>{service.title}</h2>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <p className={`text-slate-600 leading-relaxed font-medium ${language === 'ur' ? 'urdu-text' : ''}`}>
                  {service.description}
                </p>
                
                <Link href={service.href} className="inline-block w-full">
                  <button className="w-full py-4 rounded-xl bg-slate-50 text-slate-900 font-bold hover:bg-[#27ae60] hover:text-white transition-colors flex items-center justify-center space-x-2 border border-slate-200 hover:border-[#27ae60]">
                    <span className={language === 'ur' ? 'urdu-text' : ''}>{t('welfare.cta.explore')}</span>
                    <svg className={`w-5 h-5 ${language === 'ur' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Global Impact Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 bg-gradient-to-r from-[#2c3e50] to-[#1a252f] rounded-[3rem] p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className={`text-3xl font-black ${language === 'ur' ? 'urdu-text' : ''}`}>{t('welfare.impact.title')}</h3>
            <p className={`text-slate-300 text-lg ${language === 'ur' ? 'urdu-text' : ''}`}>{t('welfare.impact.desc')}</p>
            <div className="pt-4">
              <Link href="/donation">
                <button className={`px-10 py-4 bg-[#27ae60] rounded-full font-bold text-lg hover:bg-[#219a52] transition-colors shadow-lg shadow-[#27ae60]/30 hover:scale-105 active:scale-95 transform ${language === 'ur' ? 'urdu-text' : ''}`}>
                  {t('welfare.impact.btn')}
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
