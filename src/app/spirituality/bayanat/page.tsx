'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { FiPlay, FiClock, FiCalendar } from 'react-icons/fi';

const bayanat = [
  {
    id: 1,
    title: 'The Importance of Taqwa',
    titleUrdu: 'تقویٰ کی اہمیت',
    speaker: 'Mufti Abdul Qavi',
    speakerUrdu: 'مفتی عبدالقوی',
    duration: '45 min',
    date: 'March 25, 2026',
    topic: 'Taqwa',
    image: '/images/jpsd_health.jpg',
  },
  {
    id: 2,
    title: 'Rights of Parents in Islam',
    titleUrdu: 'اسلام میں والدین کے حقوق',
    speaker: 'Maulana Tariq Jameel',
    speakerUrdu: 'مولانا طارق جمیل',
    duration: '55 min',
    date: 'March 18, 2026',
    topic: 'Family',
    image: '/images/jpsd_ambulance.jpg',
  },
  {
    id: 3,
    title: 'The Month of Ramadan',
    titleUrdu: 'ماہ رمضان المبارک',
    speaker: 'Dr. Israr Ahmed',
    speakerUrdu: 'ڈاکٹر اسرار احمد',
    duration: '1h 10min',
    date: 'March 10, 2026',
    topic: 'Ramadan',
    image: '/images/jpsd_education.jpg',
  },
  {
    id: 4,
    title: 'Patience in Trials',
    titleUrdu: 'آزمائشوں میں صبر',
    speaker: 'Mufti Abdul Qavi',
    speakerUrdu: 'مفتی عبدالقوی',
    duration: '38 min',
    date: 'February 28, 2026',
    topic: 'Sabr',
    image: '/images/jpsd_rozgaar.jpg',
  },
  {
    id: 5,
    title: 'Zakat and Its Significance',
    titleUrdu: 'زکوٰۃ اور اس کی اہمیت',
    speaker: 'Maulana Tariq Jameel',
    speakerUrdu: 'مولانا طارق جمیل',
    duration: '50 min',
    date: 'February 20, 2026',
    topic: 'Zakat',
    image: '/images/jpsd_main.jpg',
  },
  {
    id: 6,
    title: 'Seerah of Prophet Muhammad ﷺ',
    titleUrdu: 'سیرت النبی ﷺ',
    speaker: 'Dr. Israr Ahmed',
    speakerUrdu: 'ڈاکٹر اسرار احمد',
    duration: '1h 25min',
    date: 'February 10, 2026',
    topic: 'Seerah',
    image: '/images/jpsd_food.jpg',
  },
];

export default function BayanatPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f]">Home</Link><span>/</span>
          <Link href="/spirituality" className="hover:text-[#1ea05f]">Spirituality</Link><span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'بیانات' : 'Bayanat'}</span>
        </div>

        <div className={`text-center mb-20 space-y-5 ${isUrdu ? 'urdu-text' : ''}`}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-[#0f172a]">
            {isUrdu ? <>بیانات و <span className="text-[#1ea05f]">دروس</span></> : <>Bayanat & <span className="text-[#1ea05f]">Lectures</span></>}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-slate-500 max-w-2xl mx-auto">
            {isUrdu ? 'معروف علمائے کرام کے بیانات اور دروس سنیں اور اپنے ایمان کو مضبوط بنائیں۔' : 'Listen to lectures and sermons by renowned scholars to strengthen your faith.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bayanat.map((bayan, index) => (
            <motion.div
              key={bayan.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-slate-200/30 border border-slate-100 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-16 h-16 rounded-full bg-[#1ea05f] flex items-center justify-center text-white shadow-lg shadow-[#1ea05f]/40 z-10"
                >
                  <FiPlay className="text-2xl ml-1" />
                </motion.div>
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full">
                    {bayan.topic}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <h3 className={`text-lg font-black text-[#0f172a] group-hover:text-[#1ea05f] transition-colors ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? bayan.titleUrdu : bayan.title}
                </h3>
                <p className={`text-sm text-[#1ea05f] font-bold ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? bayan.speakerUrdu : bayan.speaker}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-2 border-t border-slate-50">
                  <span className="flex items-center gap-1.5"><FiClock /> {bayan.duration}</span>
                  <span className="flex items-center gap-1.5"><FiCalendar /> {bayan.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
