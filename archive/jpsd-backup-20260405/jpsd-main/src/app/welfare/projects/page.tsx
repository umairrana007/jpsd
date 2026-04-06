'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiMapPin, FiUsers, FiCalendar } from 'react-icons/fi';

const projects = [
  {
    id: 1,
    title: 'Dastarkhwan Program',
    titleUrdu: 'دسترخوان پروگرام',
    description: 'Providing free meals to thousands of underprivileged families across Pakistan through our network of community kitchens.',
    descriptionUrdu: 'پاکستان بھر میں ہزاروں مستحق خاندانوں کو مفت کھانا فراہم کرنا۔',
    image: '/images/jpsd_ambulance.jpg',
    location: 'All Pakistan',
    beneficiaries: '50,000+',
    status: 'Active',
    year: '2015',
  },
  {
    id: 2,
    title: 'Clean Water Initiative',
    titleUrdu: 'صاف پانی منصوبہ',
    description: 'Installing water filtration plants and hand pumps in remote villages to provide clean drinking water.',
    descriptionUrdu: 'دور دراز دیہاتوں میں واٹر فلٹریشن پلانٹس اور ہینڈ پمپ لگانا۔',
    image: '/images/jpsd_education.jpg',
    location: 'Sindh & Balochistan',
    beneficiaries: '25,000+',
    status: 'Active',
    year: '2018',
  },
  {
    id: 3,
    title: 'Medical Camp Program',
    titleUrdu: 'طبی کیمپ پروگرام',
    description: 'Organizing free medical camps providing healthcare services including surgeries, medicines, and consultations.',
    descriptionUrdu: 'مفت طبی کیمپس کا انعقاد جن میں سرجری، ادویات اور مشاورت شامل ہے۔',
    image: '/images/jpsd_rozgaar.jpg',
    location: 'Punjab & KPK',
    beneficiaries: '15,000+',
    status: 'Active',
    year: '2020',
  },
  {
    id: 4,
    title: 'Shelter & Housing',
    titleUrdu: 'رہائش منصوبہ',
    description: 'Building permanent housing solutions for flood-affected and homeless families across the country.',
    descriptionUrdu: 'سیلاب متاثرین اور بے گھر خاندانوں کے لیے مستقل رہائشی حل فراہم کرنا۔',
    image: '/images/jpsd_main.jpg',
    location: 'Sindh',
    beneficiaries: '3,000+',
    status: 'Active',
    year: '2022',
  },
  {
    id: 5,
    title: 'Widow Support Program',
    titleUrdu: 'بیواؤں کی مدد پروگرام',
    description: 'Monthly financial assistance and skill development programs for widows to help them become self-sufficient.',
    descriptionUrdu: 'بیواؤں کو ماہانہ مالی امداد اور ہنر مندی کے پروگرام فراہم کرنا۔',
    image: '/images/jpsd_food.jpg',
    location: 'Karachi & Lahore',
    beneficiaries: '8,000+',
    status: 'Active',
    year: '2019',
  },
  {
    id: 6,
    title: 'Qurbani Distribution',
    titleUrdu: 'قربانی تقسیم',
    description: 'Annual Qurbani meat distribution to reach the most deserving communities during Eid-ul-Adha.',
    descriptionUrdu: 'عید الاضحیٰ کے موقع پر سب سے مستحق لوگوں میں قربانی کے گوشت کی تقسیم۔',
    image: '/images/fallback.jpg',
    location: 'All Pakistan',
    beneficiaries: '100,000+',
    status: 'Seasonal',
    year: '2010',
  },
];

export default function WelfareProjectsPage() {
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
          <span className="text-[#1ea05f]">{isUrdu ? 'منصوبے' : 'Projects'}</span>
        </div>

        {/* Header */}
        <div className={`text-center mb-20 space-y-5 ${isUrdu ? 'urdu-text' : ''}`}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#1ea05f] font-black tracking-[0.3em] uppercase text-xs"
          >
            {isUrdu ? 'فلاحی منصوبے' : 'WELFARE PROJECTS'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#0f172a] leading-tight"
          >
            {isUrdu ? (
              <>ہمارے فعال <span className="text-[#1ea05f]">منصوبے</span></>
            ) : (
              <>Our Active <span className="text-[#1ea05f]">Projects</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            {isUrdu 
              ? 'بیت السلام کے فلاحی منصوبے پاکستان بھر میں ضرورت مندوں کی خدمت کر رہے ہیں۔'
              : 'JPSD welfare projects serving the underprivileged across Pakistan with dignity and compassion.'}
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    project.status === 'Active' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-amber-500 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="absolute bottom-4 left-5">
                  <h3 className={`text-xl font-bold text-white ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? project.titleUrdu : project.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <p className={`text-slate-500 text-sm leading-relaxed line-clamp-2 ${isUrdu ? 'urdu-text' : ''}`}>
                  {isUrdu ? project.descriptionUrdu : project.description}
                </p>

                <div className="flex flex-wrap gap-3 text-[11px] text-slate-400 font-bold">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <FiMapPin className="text-[#1ea05f]" /> {project.location}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <FiUsers className="text-[#1ea05f]" /> {project.beneficiaries}
                  </span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                    <FiCalendar className="text-[#1ea05f]" /> {project.year}
                  </span>
                </div>

                <Link href="/donation" className="block pt-2">
                  <button className="w-full py-3.5 rounded-xl bg-slate-50 text-slate-700 font-bold text-sm hover:bg-[#1ea05f] hover:text-white transition-all flex items-center justify-center gap-2 border border-slate-200 hover:border-[#1ea05f]">
                    {isUrdu ? 'عطیہ دیں' : 'Donate to Project'}
                    <FiArrowRight />
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

