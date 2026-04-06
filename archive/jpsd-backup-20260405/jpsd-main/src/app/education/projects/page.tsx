'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiBook, FiUsers, FiAward } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: 'Jamia JPSD',
    titleUrdu: 'جامعہ بیت السلام',
    description: 'A comprehensive Islamic education institution offering Hifz, Dars-e-Nizami, and modern education programs.',
    descriptionUrdu: 'ایک جامع اسلامی تعلیمی ادارہ جو حفظ، درس نظامی اور جدید تعلیمی پروگرام پیش کرتا ہے۔',
    image: '/images/fallback.jpg',
    students: '2,500+',
    location: 'Karachi',
    icon: <FiBook />,
  },
  {
    id: 2,
    title: 'School Network',
    titleUrdu: 'سکول نیٹ ورک',
    description: 'Quality primary and secondary education for underprivileged children through our network of schools.',
    descriptionUrdu: 'ہمارے سکولوں کے نیٹ ورک کے ذریعے غریب بچوں کو معیاری ابتدائی اور ثانوی تعلیم۔',
    image: '/images/jpsd_main.jpg',
    students: '5,000+',
    location: 'Multiple Cities',
    icon: <FiUsers />,
  },
  {
    id: 3,
    title: 'Scholarship Program',
    titleUrdu: 'اسکالرشپ پروگرام',
    description: 'Full scholarships for deserving students to pursue higher education in reputable universities.',
    descriptionUrdu: 'مستحق طالب علموں کو معروف یونیورسٹیوں میں اعلیٰ تعلیم کے لیے مکمل اسکالرشپ۔',
    image: '/images/jpsd_food.jpg',
    students: '500+',
    location: 'All Pakistan',
    icon: <FiAward />,
  },
  {
    id: 4,
    title: 'Vocational Training',
    titleUrdu: 'پیشہ ورانہ تربیت',
    description: 'Skill development and vocational training programs to empower youth and women with marketable skills.',
    descriptionUrdu: 'نوجوانوں اور خواتین کو مارکیٹ کے قابل ہنر سکھانے کے لیے ہنر مندی کے پروگرام۔',
    image: '/images/jpsd_health.jpg',
    students: '1,200+',
    location: 'Karachi & Lahore',
    icon: <FiAward />,
  },
];

export default function EducationProjectsPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/education" className="hover:text-[#1ea05f] transition-colors">Education</Link>
          <span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'منصوبے' : 'Projects'}</span>
        </div>

        <div className={`text-center mb-20 space-y-5 ${isUrdu ? 'urdu-text' : ''}`}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#0f172a] leading-tight"
          >
            {isUrdu ? (
              <>تعلیمی <span className="text-[#1ea05f]">منصوبے</span></>
            ) : (
              <>Education <span className="text-[#1ea05f]">Projects</span></>
            )}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-slate-500 max-w-2xl mx-auto">
            {isUrdu ? 'بیت السلام کے تعلیمی منصوبے نئی نسل کی تعمیر میں اہم کردار ادا کر رہے ہیں۔' : 'JPSD education projects shaping the future generation with knowledge and values.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6">
                  <h3 className={`text-2xl font-black text-white ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? project.titleUrdu : project.title}
                  </h3>
                </div>
              </div>
              <div className="p-7 space-y-4">
                <p className={`text-slate-500 text-sm leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? project.descriptionUrdu : project.description}
                </p>
                <div className="flex gap-3 text-[11px] text-slate-400 font-bold">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <FiUsers className="text-[#1ea05f]" /> {project.students} Students
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    📍 {project.location}
                  </span>
                </div>
                <Link href="/donation">
                  <button className="w-full py-3.5 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-[#1ea05f] hover:text-white transition-all flex items-center justify-center gap-2 border border-slate-200 hover:border-[#1ea05f] mt-2">
                    {isUrdu ? 'عطیہ دیں' : 'Support This Project'} <FiArrowRight />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

