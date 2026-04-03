'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4" dir={language === 'ur' ? 'rtl' : 'ltr'}>
        <div className="relative">

          <div className="flex flex-col lg:flex-row items-center gap-24 relative z-10">
            {/* Image Layered Composition */}
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white"
              >
                <Image
                  src="/images/about-us.jpg"
                  alt="JPSD About Us"
                  width={800}
                  height={1000}
                  className="object-cover"
                />
              </motion.div>
              
              {/* Floating Badge */}
              <div className={`absolute -top-12 ${language === 'ur' ? '-right-12' : '-left-12'} w-40 h-40 gradient-primary rounded-full flex flex-col items-center justify-center text-white shadow-2xl z-20 border-8 border-white`}>
                <span className="text-4xl font-black English-text">25+</span>
                <span className={`font-bold uppercase tracking-widest text-center ${language === 'ur' ? 'urdu-text text-[10px]' : 'text-[10px]'}`}>
                  {language === 'ur' ? 'خدمت کے سال' : 'Years of Mercy'}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-[2px] w-12 bg-primary-green" />
                  <span className={`text-primary-green font-black uppercase text-xs tracking-[0.3em] ${language === 'ur' ? 'urdu-text' : ''}`}>
                    {language === 'ur' ? 'ہماری وراثت' : 'Our Legacy'}
                  </span>
                </div>
                <h2 className={`text-5xl md:text-6xl font-black text-[#1e293b] leading-tight ${language === 'ur' ? 'urdu-text leading-[1.3]' : ''}`}>
                  {language === 'ur' ? (
                    <>سچائی اور <span className="text-primary-blue">خدمت</span> پر مبنی ایک طویل سفر۔</>
                  ) : (
                    <>A Journey Sustained by <span className="text-primary-blue">Sincerity</span> & Service.</>
                  )}
                </h2>
                <p className={`text-xl text-gray-500 font-light leading-relaxed ${language === 'ur' ? 'urdu-text' : ''}`}>
                  {language === 'ur' 
                    ? 'جمعیت پنجابی سوداگرانِ دہلی (JPSD) اس بات کا ثبوت ہے کہ اجتماعی انسانی ہمدردی کیا حاصل کر سکتی ہے۔ کراچی میں بنیاد رکھی گئی، اب ہم خیر کے لیے ایک عالمی قوت بن چکے ہیں۔'
                    : 'Jamiyat Punjabi Saudagran-e-Delhi (JPSD) stands as a testament to what collective human compassion can achieve. Founded in Karachi, we have evolved into a global force for good.'}
                </p>
              </motion.div>

              {/* Quote Box with Glassmorphism */}
              <div className="glass p-8 rounded-3xl border-l-[6px] border-primary-green relative overflow-hidden bg-white/40 shadow-xl">
                <p className={`text-[#2c3e50] italic text-xl mb-6 leading-relaxed relative z-10 font-medium ${language === 'ur' ? 'urdu-text' : ''}`}>
                  {language === 'ur' 
                    ? '"جے پی ایس ڈی ضرورت مندوں کے لیے امید اور رحمت ki کرن ہے۔ ہماری وقف ٹیم انسانیت کی خدمت کے لیے انتھک محنت کرتی ہے۔"'
                    : '"JPSD is a beacon of hope & mercy for the needy. Our dedicated team works tirelessly to serve humanity."'}
                </p>
                <div className={`flex items-center space-x-5 rtl:space-x-reverse relative z-10 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white font-black text-2xl shadow-lg">
                    MAS
                  </div>
                  <div className={language === 'ur' ? 'mr-5' : ''}>
                    <p className={`font-black text-2xl text-[#1e293b] tracking-tighter ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {language === 'ur' ? 'مولانا عبد الستار' : 'Maulana Abdul Sattar'}
                    </p>
                    <p className={`text-sm font-bold text-primary-blue uppercase tracking-widest opacity-70 ${language === 'ur' ? 'urdu-text text-xs' : ''}`}>
                      {language === 'ur' ? 'چیئرمین، JPSD' : 'Chairman, JPSD'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
