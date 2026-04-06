'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import { Metadata } from 'next';

const newsItems = [
  {
    id: 1,
    title: 'JPSD Distributes Relief to 10,000 Families',
    titleUrdu: 'بیت السلام نے 10,000 خاندانوں میں امداد تقسیم کی',
    excerpt: 'In a massive relief operation, JPSD distributed food packages and essential supplies to flood-affected families across Sindh.',
    excerptUrdu: 'ایک بڑے ریلیف آپریشن میں بیت السلام نے سندھ بھر میں سیلاب متاثر خاندانوں میں فوڈ پیکجز اور ضروری اشیاء تقسیم کیں۔',
    image: '/images/jpsd_food.jpg',
    date: 'March 15, 2026',
    category: 'Relief',
  },
  {
    id: 2,
    title: 'New Water Filtration Plant Inaugurated in Tharparkar',
    titleUrdu: 'تھرپارکر میں نئے واٹر فلٹریشن پلانٹ کا افتتاح',
    excerpt: 'A state-of-the-art water filtration plant was inaugurated in Tharparkar, providing clean drinking water to over 5,000 villagers.',
    excerptUrdu: 'تھرپارکر میں جدید ترین واٹر فلٹریشن پلانٹ کا افتتاح کیا گیا جو 5,000 سے زائد دیہاتیوں کو صاف پانی فراہم کرے گا۔',
    image: '/images/jpsd_health.jpg',
    date: 'March 10, 2026',
    category: 'Water',
  },
  {
    id: 3,
    title: 'Free Medical Camp Benefits 2,000+ Patients',
    titleUrdu: 'مفت طبی کیمپ سے 2,000 سے زائد مریض مستفید',
    excerpt: 'A three-day free medical camp organized by JPSD provided healthcare services including eye surgeries and dental care.',
    excerptUrdu: 'بیت السلام کی جانب سے تین روزہ مفت طبی کیمپ میں آنکھوں کی سرجری اور دانتوں کی دیکھ بھال سمیت طبی خدمات فراہم کی گئیں۔',
    image: '/images/jpsd_ambulance.jpg',
    date: 'February 28, 2026',
    category: 'Health',
  },
  {
    id: 4,
    title: 'Annual Qurbani Drive Successfully Completed',
    titleUrdu: 'سالانہ قربانی مہم کامیابی سے مکمل',
    excerpt: 'JPSD completed its annual Qurbani drive, distributing meat to over 100,000 deserving families nationwide.',
    excerptUrdu: 'بیت السلام نے اپنی سالانہ قربانی مہم مکمل کی، ملک بھر میں 100,000 سے زائد مستحق خاندانوں میں گوشت تقسیم کیا۔',
    image: '/images/jpsd_education.jpg',
    date: 'February 15, 2026',
    category: 'Seasonal',
  },
];

export default function WelfareNewsPage() {
  const { language, t } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className={`flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium ${isUrdu ? 'flex-row-reverse justify-end' : ''}`}>
          <Link href="/" className="hover:text-[#1ea05f] transition-colors">{t('nav.home')}</Link>
          <span className={isUrdu ? 'rotate-180' : ''}>/</span>
          <Link href="/welfare" className="hover:text-[#1ea05f] transition-colors">{t('nav.welfare')}</Link>
          <span className={isUrdu ? 'rotate-180' : ''}>/</span>
          <span className={`text-[#1ea05f] ${isUrdu ? 'urdu-text' : ''}`}>{t('nav.news')}</span>
        </div>

        {/* Header */}
        <div className={`text-center mb-20 space-y-5 ${isUrdu ? 'urdu-text' : ''}`}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-[#0f172a] leading-tight"
          >
            {isUrdu ? (
              <>{t('nav.welfare')} <span className="text-[#1ea05f]">{t('nav.news')}</span></>
            ) : (
              <>{t('nav.welfare')} <span className="text-[#1ea05f]">{t('nav.news')}</span></>
            )}
          </motion.h1>
        </div>

        {/* News List */}
        <div className="space-y-8">
          {newsItems.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-slate-200/30 border border-slate-100 hover:shadow-xl transition-all flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-80 h-56 md:h-auto flex-shrink-0 overflow-hidden">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-[#1ea05f]/10 text-[#1ea05f] px-3 py-1 rounded-lg">{news.category}</span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <FiCalendar className="text-[11px]" /> {news.date}
                    </span>
                  </div>
                  <h3 className={`text-xl font-black text-[#0f172a] mb-2 group-hover:text-[#1ea05f] transition-colors ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? news.titleUrdu : news.title}
                  </h3>
                  <p className={`text-slate-500 text-sm leading-relaxed line-clamp-2 ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? news.excerptUrdu : news.excerpt}
                  </p>
                </div>
                <div className="mt-4">
                  <Link href={`/welfare/news/${news.id}`} className={`inline-flex items-center gap-2 text-[#1ea05f] font-bold text-sm group-hover:gap-3 transition-all cursor-pointer ${isUrdu ? 'flex-row-reverse' : ''}`}>
                    <span className={isUrdu ? 'urdu-text' : ''}>{t('common.readMore')}</span> 
                    <FiArrowRight className={isUrdu ? 'rotate-180' : ''} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

