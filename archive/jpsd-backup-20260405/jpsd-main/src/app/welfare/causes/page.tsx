'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiArrowRight } from 'react-icons/fi';

const welfareCauses = [
  {
    id: 1,
    title: 'Flood Relief Fund',
    titleUrdu: 'سیلاب ریلیف فنڈ',
    description: 'Emergency relief for flood-affected families including food, medicine, shelter and rehabilitation.',
    descriptionUrdu: 'سیلاب متاثرین کے لیے ہنگامی امداد بشمول خوراک، ادویات، رہائش اور بحالی۔',
    image: '/images/jpsd_ambulance.jpg',
    raised: 'PKR 15.2M',
    goal: 'PKR 25M',
    percentage: 61,
  },
  {
    id: 2,
    title: 'Orphan Care Program',
    titleUrdu: 'یتیم بچوں کی کفالت',
    description: 'Complete care for orphan children including education, healthcare, food, and shelter.',
    descriptionUrdu: 'یتیم بچوں کی مکمل کفالت بشمول تعلیم، صحت، خوراک اور رہائش۔',
    image: '/images/jpsd_education.jpg',
    raised: 'PKR 8.5M',
    goal: 'PKR 12M',
    percentage: 71,
  },
  {
    id: 3,
    title: 'Winter Relief Campaign',
    titleUrdu: 'سردیوں کی امداد',
    description: 'Distributing warm clothes, blankets, and heaters to deserving families during harsh winters.',
    descriptionUrdu: 'سخت سردیوں میں مستحق خاندانوں کو گرم کپڑے، کمبل اور ہیٹر تقسیم کرنا۔',
    image: '/images/jpsd_rozgaar.jpg',
    raised: 'PKR 5.1M',
    goal: 'PKR 10M',
    percentage: 51,
  },
  {
    id: 4,
    title: 'Food Distribution Drive',
    titleUrdu: 'راشن تقسیم مہم',
    description: 'Monthly ration packages for underprivileged families containing essential food supplies.',
    descriptionUrdu: 'مستحق خاندانوں کو ماہانہ راشن پیکجز بشمول ضروری اشیاء خوردنی۔',
    image: '/images/jpsd_main.jpg',
    raised: 'PKR 12M',
    goal: 'PKR 18M',
    percentage: 67,
  },
];

export default function WelfareCausesPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/welfare" className="hover:text-[#1ea05f] transition-colors">Welfare</Link>
          <span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'مقاصد' : 'Causes'}</span>
        </div>

        {/* Header */}
        <div className={`text-center mb-20 space-y-5 ${isUrdu ? 'urdu-text' : ''}`}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#0f172a] leading-tight"
          >
            {isUrdu ? (
              <>فلاحی <span className="text-[#1ea05f]">مقاصد</span></>
            ) : (
              <>Welfare <span className="text-[#1ea05f]">Causes</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            {isUrdu 
              ? 'ان فلاحی مقاصد کی حمایت کریں اور ضرورت مندوں تک امداد پہنچائیں۔'
              : 'Support these welfare causes and help us bring relief to those in need.'}
          </motion.p>
        </div>

        {/* Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {welfareCauses.map((cause, index) => (
            <motion.div
              key={cause.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-72 h-56 md:h-auto overflow-hidden flex-shrink-0">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              
              <div className="p-7 flex flex-col justify-between flex-grow">
                <div className="space-y-3">
                  <h3 className={`text-xl font-black text-[#0f172a] ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? cause.titleUrdu : cause.title}
                  </h3>
                  <p className={`text-slate-500 text-sm leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? cause.descriptionUrdu : cause.description}
                  </p>
                </div>

                <div className="mt-5 space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-[#1ea05f]">{cause.raised}</span>
                      <span className="text-slate-400">{cause.goal}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cause.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="h-full bg-gradient-to-r from-[#1ea05f] to-[#27ae60] rounded-full"
                      />
                    </div>
                  </div>

                  <Link href="/donation">
                    <button className="w-full py-3.5 rounded-xl bg-[#1ea05f] text-white font-bold text-sm hover:bg-[#178f52] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1ea05f]/20 mt-2">
                      <FiHeart /> {isUrdu ? 'ابھی عطیہ دیں' : 'Donate Now'}
                      <FiArrowRight />
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
