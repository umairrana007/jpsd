'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiGlobe, FiPhone } from 'react-icons/fi';
import { MdOutlineCalculate } from 'react-icons/md';
import Link from 'next/link';

export const TopBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/40 backdrop-blur-3xl border-b border-gray-100 py-3 relative z-[100]"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Contact Info */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse font-bold text-[#475569] text-xs">
          <a href="tel:+92-21-111-298-111" className="flex items-center space-x-2 hover:text-primary-green transition-all group">
            <FiPhone className="text-primary-green group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">+92 21 111 298 111</span>
          </a>
          <Link href="/bank-details" className="flex items-center space-x-2 hover:text-primary-green transition-all group">
            <FiGlobe className="text-primary-green group-hover:scale-110 transition-transform flex-shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">Official Global Outreach</span>
          </Link>
        </div>

        {/* Action Info */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex bg-gray-100/80 p-1 rounded-xl flex-shrink-0">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                language === 'en' ? 'bg-white text-primary-green shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                language === 'ur' ? 'bg-white text-primary-green shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              UR
            </button>
          </div>
          <Link href="/ask-shariah" className="hidden lg:flex items-center space-x-2 bg-accent-gold/10 px-4 py-1.5 rounded-xl text-accent-gold hover:bg-accent-gold/20 transition-all border border-accent-gold/20 flex-shrink-0">
             <MdOutlineCalculate className="text-sm flex-shrink-0" />
             <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Shariah Advisory</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
