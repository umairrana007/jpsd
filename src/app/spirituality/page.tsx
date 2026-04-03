'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

export default function SpiritualityPage() {
  const { t } = useLanguage();

  const services = [
    {
      id: 'duas',
      title: 'Masnoon Duas',
      description: 'A comprehensive collection of daily prophetic prayers (Duas) for various occasions, with translations and recitations.',
      image: '/images/jpsd_health.jpg',
      href: '/spirituality/duas',
      icon: '🤲',
    },
    {
      id: 'bayanat',
      title: 'Bayanat Hub',
      description: 'Listen to and download soul-enriching Islamic lectures, Friday sermons, and series by renowned scholars.',
      image: '/images/fallback.jpg',
      href: '/spirituality/bayanat',
      icon: '🎙️',
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
            className="inline-flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full text-orange-700 font-bold text-sm tracking-wider"
          >
            <span>🕋</span>
            <span>SPIRITUAL UPLIFTMENT</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-slate-900 leading-tight"
          >
            Nourish Your <span className="text-[#d35400]">Soul</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-medium"
          >
            Access a wealth of verified Islamic resources, literature, and audio to strengthen your connection with the divine.
          </motion.p>
        </div>

        {/* Services Grid - Spirituality has 2 main sections, so centering them */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#c0392b]/90 via-[#c0392b]/30 to-transparent mix-blend-multiply" />
                <div className="absolute bottom-6 left-6 flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl z-10 border border-white/30">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-white z-10 drop-shadow-lg">{service.title}</h2>
                </div>
              </div>
              
              <div className="p-8 space-y-6 flex flex-col justify-between" style={{ minHeight: '220px' }}>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {service.description}
                </p>
                
                <Link href={service.href} className="inline-block w-full mt-auto">
                  <button className="w-full py-4 rounded-xl bg-slate-50 text-slate-900 font-bold hover:bg-[#d35400] hover:text-white transition-colors flex items-center justify-center space-x-2 border border-slate-200 hover:border-[#d35400]">
                    <span>Enter Section</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Ask Shariah Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-[#f39c12] to-[#d35400] rounded-[3rem] p-12 text-center text-white relative flex flex-col md:flex-row items-center justify-between"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          
          <div className="text-left md:max-w-md relative z-10 mb-8 md:mb-0">
            <h3 className="text-3xl font-black mb-3 text-white drop-shadow-sm">Have an Islamic Query?</h3>
            <p className="text-orange-50 font-medium">Get verified fatwas and guidance from our esteemed Shariah panel on matters of daily life, finance, and worship.</p>
          </div>
          
          <div className="relative z-10 w-full md:w-auto">
            <Link href="/ask-shariah">
              <button className="w-full md:w-auto px-10 py-5 bg-white text-[#d35400] rounded-2xl font-black text-lg hover:bg-orange-50 transition-colors shadow-2xl hover:scale-105 transform active:scale-95 flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span>Ask Shariah Advisor</span>
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
