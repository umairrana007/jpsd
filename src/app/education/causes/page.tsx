'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiArrowRight } from 'react-icons/fi';

const causes = [
  {
    id: 1,
    title: 'Build a School in Thar',
    titleUrdu: 'تھر میں سکول تعمیر کریں',
    description: 'Help us build a fully equipped school in Tharparkar to educate hundreds of deserving children.',
    descriptionUrdu: 'تھرپارکر میں مکمل سکول تعمیر کریں تاکہ سینکڑوں مستحق بچوں کو تعلیم ملے۔',
    image: '/images/jpsd_rozgaar.jpg',
    raised: 'PKR 7M', goal: 'PKR 15M', percentage: 47,
  },
  {
    id: 2,
    title: 'Sponsor a Student',
    titleUrdu: 'ایک طالب علم کی کفالت',
    description: 'Sponsor the complete education of a deserving student including tuition, books, and uniform.',
    descriptionUrdu: 'ایک مستحق طالبعلم کی مکمل تعلیمی کفالت بشمول فیس، کتب اور یونیفارم۔',
    image: '/images/jpsd_main.jpg',
    raised: 'PKR 3.2M', goal: 'PKR 5M', percentage: 64,
  },
  {
    id: 3,
    title: 'Digital Learning Labs',
    titleUrdu: 'ڈیجیٹل لرننگ لیبز',
    description: 'Setting up computer labs and digital learning centers in underprivileged schools.',
    descriptionUrdu: 'غریب سکولوں میں کمپیوٹر لیبز اور ڈیجیٹل لرننگ سینٹرز قائم کرنا۔',
    image: '/images/jpsd_food.jpg',
    raised: 'PKR 2.1M', goal: 'PKR 8M', percentage: 26,
  },
];

export default function EducationCausesPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f]">Home</Link><span>/</span>
          <Link href="/education" className="hover:text-[#1ea05f]">Education</Link><span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'مقاصد' : 'Causes'}</span>
        </div>

        <div className={`text-center mb-20 space-y-5 ${isUrdu ? 'urdu-text' : ''}`}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-[#0f172a]">
            {isUrdu ? <>تعلیمی <span className="text-[#1ea05f]">مقاصد</span></> : <>Education <span className="text-[#1ea05f]">Causes</span></>}
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {causes.map((cause, index) => (
            <motion.div key={cause.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl transition-all flex flex-col">
              <div className="relative h-52 overflow-hidden">
                <Image src={cause.image} alt={cause.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="33vw" />
              </div>
              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className={`text-lg font-black text-[#0f172a] ${isUrdu ? 'urdu-text' : ''}`}>{isUrdu ? cause.titleUrdu : cause.title}</h3>
                <p className={`text-slate-500 text-sm line-clamp-2 ${isUrdu ? 'urdu-text' : ''}`}>{isUrdu ? cause.descriptionUrdu : cause.description}</p>
                <div className="mt-auto pt-4 space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#1ea05f]">{cause.raised}</span>
                    <span className="text-slate-400">{cause.goal}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${cause.percentage}%` }} transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-[#1ea05f] to-[#27ae60] rounded-full" />
                  </div>
                  <Link href="/donation">
                    <button className="w-full py-3 rounded-xl bg-[#1ea05f] text-white font-bold text-sm hover:bg-[#178f52] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1ea05f]/20 mt-2">
                      <FiHeart /> {isUrdu ? 'عطیہ دیں' : 'Donate'} <FiArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
