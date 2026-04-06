'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const events = [
  {
    id: 1,
    title: 'Ramadan Food Drive 2024',
    titleUrdu: 'رمضان فوڈ ڈرائیو ۲۰۲۴',
    date: 'March 15, 2024',
    location: 'Karachi',
    locationUrdu: 'کراچی',
    image: '/images/jpsd_main.jpg',
    description: 'Distributed 10,000+ food packages to families in need during Ramadan.',
    descriptionUrdu: 'رمضان کے دوران ضرورت مند خاندانوں میں ۱۰،۰۰۰ سے زائد راشن پیکٹ تقسیم کیے گئے۔',
  },
  {
    id: 2,
    title: 'Free Medical Camp',
    titleUrdu: 'مفت میڈیکل کیمپ',
    date: 'February 20, 2024',
    location: 'Lahore',
    locationUrdu: 'لاہور',
    image: '/images/jpsd_education.jpg',
    description: 'Provided free healthcare to 5,000+ patients with specialist consultations.',
    descriptionUrdu: 'ماہر ڈاکٹروں کی زیر نگرانی ۵۰۰۰ سے زائد مریضوں کا مفت طبی معائنہ کیا گیا۔',
  },
  {
    id: 3,
    title: 'Winter Clothing Distribution',
    titleUrdu: 'کپڑوں کی تقسیم',
    date: 'January 10, 2024',
    location: 'Islamabad',
    locationUrdu: 'اسلام آباد',
    image: '/images/jpsd_health.jpg',
    description: 'Distributed warm clothing to homeless individuals during winter.',
    descriptionUrdu: 'سردیوں کے موسم میں بے گھر افراد میں گرم کپڑے اور کمبل تقسیم کیے گئے۔',
  },
  {
    id: 4,
    title: 'School Supplies Drive',
    titleUrdu: 'اسکول سپلائیز مہم',
    date: 'December 5, 2023',
    location: 'Peshawar',
    locationUrdu: 'پشاور',
    image: '/images/jpsd_ambulance.jpg',
    description: 'Equipped 500+ students with books, bags, and stationery for new academic year.',
    descriptionUrdu: 'نئے تعلیمی سال کے لیے ۵۰۰ سے زائد طلباء کو کتابیں، بیگز اور اسٹیشنری فراہم کی گئی۔',
  },
];

export const EventsSection: React.FC = () => {
  const { language } = useLanguage();
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4" dir={language === 'ur' ? 'rtl' : 'ltr'}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold text-[#2c3e50] mb-8 ${language === 'ur' ? 'urdu-text !leading-[2.2] py-4' : ''}`}>
            {language === 'ur' ? 'حالیہ ایونٹس اور سرگرمیاں' : 'Recent Events & Activities'}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === 'ur' ? 'urdu-text !leading-[1.8]' : ''}`}>
            {language === 'ur' ? 'دیکھیں کہ ہم پاکستان بھر کی کمیونٹیز میں کس طرح مثبت تبدیلی لا رہے ہیں' : "See how we're making a difference in communities across Pakistan"}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#27ae60] to-[#f39c12] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group flex flex-col h-full"
            >
              <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={language === 'ur' ? (event.titleUrdu || event.title) : event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className={`absolute top-4 ${language === 'ur' ? 'left-4' : 'right-4'} bg-[#f39c12] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10 English-text`}>
                    {event.date}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className={`text-xl font-bold text-[#2c3e50] mb-4 line-clamp-2 min-h-[4.5rem] flex items-center ${language === 'ur' ? 'urdu-text !leading-[1.8] py-2' : ''}`}>
                    {language === 'ur' ? (event.titleUrdu || event.title) : event.title}
                  </h3>
                  
                  <div className={`flex items-center text-gray-400 text-[11px] mb-4 font-bold uppercase tracking-widest ${language === 'ur' ? 'urdu-text text-xs tracking-normal' : ''}`}>
                    <svg className={`w-3.5 h-3.5 ${language === 'ur' ? 'ml-1.5' : 'mr-1.5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {language === 'ur' ? (event.locationUrdu || event.location) : event.location}
                  </div>
                  
                  <p className={`text-gray-500 text-sm line-clamp-3 mb-6 flex-grow ${language === 'ur' ? 'urdu-text opacity-90 leading-relaxed' : 'leading-relaxed'}`}>
                    {language === 'ur' ? (event.descriptionUrdu || event.description) : event.description}
                  </p>

                  <div className="pt-4 border-t border-slate-50 flex items-center">
                    <Link href={`/events/${event.id}`}>
                      <button className={`text-[#27ae60] font-bold text-sm flex items-center group-hover:text-[#219a52] transition-all ${language === 'ur' ? 'urdu-text' : ''}`}>
                        {language === 'ur' ? 'مزید پڑھیں' : 'Read More'}
                        <svg className={`w-4 h-4 ${language === 'ur' ? 'mr-1 ' : 'ml-1 '} transform ${language === 'ur' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 relative z-10" dir="ltr">
          <Link href="/events">
            <button className={`bg-[#1ea05f] hover:bg-[#168a50] text-white px-10 py-5 rounded-[2rem] font-black hover:shadow-2xl transition-all duration-500 transform hover:scale-105 shadow-xl shadow-[#1ea05f]/20 ${language === 'ur' ? 'urdu-text text-lg tracking-normal' : 'text-xs uppercase tracking-[0.3em]'}`}>
              {language === 'ur' ? 'تمام ایونٹس دیکھیں' : 'View All Events ➔'}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
