'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

export default function EducationPage() {
  const { t } = useLanguage();

  const services = [
    {
      id: 'projects',
      title: 'Educational Projects',
      description: 'Discover our schools, academies, and vast educational infrastructure built for the holistic development of youth.',
      image: '/images/fallback.jpg',
      href: '/education/projects',
      icon: '🏫',
    },
    {
      id: 'causes',
      title: 'Sponsor a Student',
      description: 'Provide scholarships and essential educational materials for bright minds who lack financial resources.',
      image: '/images/fallback.jpg',
      href: '/education/causes',
      icon: '🎓',
    },
    {
      id: 'news',
      title: 'Academic News',
      description: 'Read the latest updates, curriculum advancements, and success stories from our educational institutes.',
      image: '/images/fallback.jpg',
      href: '/education/news',
      icon: '📚',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full text-blue-700 font-bold text-sm tracking-wider"
          >
            <span>📖</span>
            <span>KNOWLEDGE HUB</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 leading-tight"
          >
            Our Education <span className="text-[#2980b9]">Initiatives</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-medium"
          >
            Empowering the next generation through quality, accessible education blending modern sciences with ethical foundations.
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#2980b9]/90 via-[#2980b9]/30 to-transparent mix-blend-multiply" />
                <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl z-10 border border-white/30">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white z-10 drop-shadow-lg">{service.title}</h2>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <p className="text-slate-600 leading-relaxed font-medium">
                  {service.description}
                </p>
                
                <Link href={service.href} className="inline-block w-full">
                  <button className="w-full py-4 rounded-xl bg-slate-50 text-slate-900 font-bold hover:bg-[#2980b9] hover:text-white transition-colors flex items-center justify-center space-x-2 border border-slate-200 hover:border-[#2980b9]">
                    <span>Explore</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="mt-24 bg-gradient-to-r from-[#1e3c72] to-[#2a5298] rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/20"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl font-black">Invest in the Future</h3>
            <p className="text-blue-100 text-lg">Pledge an ongoing contribution to fund scholarships, build schools, and provide modern educational tools.</p>
            <div className="pt-4">
              <Link href="/donation">
                <button className="px-10 py-4 bg-white text-[#1e3c72] rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl hover:scale-105 active:scale-95 transform">
                  Donate to Education Fund
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
