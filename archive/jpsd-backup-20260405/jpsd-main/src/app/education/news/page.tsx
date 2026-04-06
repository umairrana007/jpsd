'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

const newsItems = [
  {
    id: 1,
    title: 'Jamia JPSD Annual Convocation 2026',
    titleUrdu: 'جامعہ بیت السلام سالانہ کانووکیشن 2026',
    excerpt: '500 students graduated from various programs at the annual convocation ceremony held at Jamia JPSD.',
    excerptUrdu: 'جامعہ بیت السلام میں منعقد سالانہ کانووکیشن تقریب میں 500 طلبا نے مختلف پروگرامز سے فارغ التحصیل ہوئے۔',
    image: '/images/fallback.jpg',
    date: 'March 20, 2026',
  },
  {
    id: 2,
    title: 'New School Branch Opens in Multan',
    titleUrdu: 'ملتان میں نئی سکول شاخ کا افتتاح',
    excerpt: 'JPSD expanded its education network with the opening of a new school branch in Multan serving 300 students.',
    excerptUrdu: 'بیت السلام نے ملتان میں نئی سکول شاخ کے افتتاح کے ساتھ اپنے تعلیمی نیٹ ورک کو وسعت دی جو 300 طلبا کی خدمت کرے گی۔',
    image: '/images/jpsd_health.jpg',
    date: 'March 5, 2026',
  },
  {
    id: 3,
    title: 'Scholarship Awards Ceremony',
    titleUrdu: 'اسکالرشپ ایوارڈز تقریب',
    excerpt: '150 deserving students received full scholarships for higher education at leading universities across Pakistan.',
    excerptUrdu: '150 مستحق طلبا کو پاکستان بھر کی معروف یونیورسٹیوں میں اعلیٰ تعلیم کے لیے مکمل اسکالرشپ سے نوازا گیا۔',
    image: '/images/jpsd_ambulance.jpg',
    date: 'February 18, 2026',
  },
];

export default function EducationNewsPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f]">Home</Link><span>/</span>
          <Link href="/education" className="hover:text-[#1ea05f]">Education</Link><span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'خبریں' : 'News'}</span>
        </div>

        <div className={`text-center mb-20 space-y-5 ${isUrdu ? 'urdu-text' : ''}`}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-[#0f172a]">
            {isUrdu ? <>تعلیمی <span className="text-[#1ea05f]">خبریں</span></> : <>Education <span className="text-[#1ea05f]">News</span></>}
          </motion.h1>
        </div>

        <div className="space-y-8">
          {newsItems.map((news, index) => (
            <motion.article key={news.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-slate-200/30 border border-slate-100 hover:shadow-xl transition-all flex flex-col md:flex-row">
              <div className="relative w-full md:w-80 h-56 md:h-auto flex-shrink-0 overflow-hidden">
                <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="320px" />
              </div>
              <div className="p-7 flex flex-col justify-between">
                <div>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-3">
                    <FiCalendar /> {news.date}
                  </span>
                  <h3 className={`text-xl font-black text-[#0f172a] mb-2 group-hover:text-[#1ea05f] transition-colors ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? news.titleUrdu : news.title}
                  </h3>
                  <p className={`text-slate-500 text-sm leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? news.excerptUrdu : news.excerpt}
                  </p>
                </div>
                <Link href={`/education/news/${news.id}`} className="inline-flex items-center gap-2 text-[#1ea05f] font-bold text-sm mt-4 cursor-pointer group-hover:gap-3 transition-all">
                  {isUrdu ? 'مزید پڑھیں' : 'Read More'} <FiArrowRight />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

