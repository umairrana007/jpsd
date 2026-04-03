'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { FiSend, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';

export default function AskShariahPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const faqs = [
    {
      q: isUrdu ? 'کیا آن لائن زکوٰۃ ادا کرنا جائز ہے؟' : 'Is it permissible to pay Zakat online?',
      a: isUrdu ? 'جی ہاں، آن لائن زکوٰۃ ادا کرنا جائز ہے جب تک مستحق تک پہنچنا یقینی ہو۔' : 'Yes, paying Zakat online is permissible as long as it reaches the deserving recipients.',
    },
    {
      q: isUrdu ? 'فطرانہ کی رقم کتنی ہے؟' : 'What is the current Fitrana amount?',
      a: isUrdu ? 'فطرانہ کی رقم ہر سال گندم، جو یا کھجور کی قیمت کے مطابق مقرر ہوتی ہے۔' : 'Fitrana amount is determined annually based on the price of wheat, barley, or dates.',
    },
    {
      q: isUrdu ? 'صدقہ اور زکوٰۃ میں کیا فرق ہے؟' : 'What is the difference between Sadaqah and Zakat?',
      a: isUrdu ? 'زکوٰۃ فرض ہے جبکہ صدقہ نفلی عبادت ہے۔ زکوٰۃ کے مصارف مقرر ہیں۔' : 'Zakat is obligatory while Sadaqah is voluntary. Zakat has specific recipients defined by Shariah.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f]">Home</Link><span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'شریعہ ایڈوائزر' : 'Ask Shariah'}</span>
        </div>

        <div className={`text-center mb-16 space-y-5 ${isUrdu ? 'urdu-text' : ''}`}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-[#0f172a]">
            {isUrdu ? <>شریعہ <span className="text-[#1ea05f]">مشورہ</span></> : <>Ask <span className="text-[#1ea05f]">Shariah</span></>}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-slate-500 max-w-xl mx-auto">
            {isUrdu ? 'اپنے شرعی سوالات ہمارے مفتیان کرام سے پوچھیں۔' : 'Submit your questions to our qualified Shariah advisors for guidance.'}
          </motion.p>
        </div>

        {/* Question Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/40 border border-slate-100 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#1ea05f]/10 flex items-center justify-center">
              <FiMessageSquare className="text-[#1ea05f] text-xl" />
            </div>
            <h2 className={`text-2xl font-black text-[#0f172a] ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu ? 'اپنا سوال بھیجیں' : 'Submit Your Question'}
            </h2>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" placeholder={isUrdu ? 'آپ کا نام' : 'Your Name'} 
                className={`w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1ea05f] focus:ring-2 focus:ring-[#1ea05f]/10 text-sm font-medium transition-all ${isUrdu ? 'urdu-text text-right' : ''}`} />
              <input type="email" placeholder={isUrdu ? 'ای میل ایڈریس' : 'Email Address'}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1ea05f] focus:ring-2 focus:ring-[#1ea05f]/10 text-sm font-medium transition-all" />
            </div>
            <select className={`w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1ea05f] text-sm font-medium text-slate-500 ${isUrdu ? 'urdu-text text-right' : ''}`}>
              <option>{isUrdu ? 'موضوع منتخب کریں' : 'Select Topic'}</option>
              <option>{isUrdu ? 'زکوٰۃ' : 'Zakat'}</option>
              <option>{isUrdu ? 'نماز' : 'Salah'}</option>
              <option>{isUrdu ? 'روزہ' : 'Fasting'}</option>
              <option>{isUrdu ? 'نکاح' : 'Nikah'}</option>
              <option>{isUrdu ? 'کاروبار' : 'Business'}</option>
              <option>{isUrdu ? 'دیگر' : 'Other'}</option>
            </select>
            <textarea rows={5} placeholder={isUrdu ? 'اپنا سوال یہاں لکھیں...' : 'Type your question here...'}
              className={`w-full px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1ea05f] focus:ring-2 focus:ring-[#1ea05f]/10 text-sm font-medium transition-all resize-none ${isUrdu ? 'urdu-text text-right' : ''}`} />
            <button type="submit" className="w-full py-4 bg-[#1ea05f] text-white rounded-2xl font-bold text-sm hover:bg-[#178f52] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1ea05f]/20">
              <FiSend /> {isUrdu ? 'سوال بھیجیں' : 'Submit Question'}
            </button>
          </form>
        </motion.div>

        {/* FAQ Section */}
        <div className={`${isUrdu ? 'urdu-text' : ''}`}>
          <h2 className="text-3xl font-black text-[#0f172a] text-center mb-10">
            {isUrdu ? 'عمومی سوالات' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md shadow-slate-200/20 border border-slate-100">
                <div className="flex items-start gap-3">
                  <FiCheckCircle className="text-[#1ea05f] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0f172a] mb-2">{faq.q}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
