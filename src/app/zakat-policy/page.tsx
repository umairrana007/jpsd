'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { FiHeart, FiCheck, FiShield } from 'react-icons/fi';

export default function ZakatPolicyPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'زکوٰۃ کی پالیسی' : 'Zakat Policy'}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-[#27ae60]/10 border-t-8 border-[#27ae60] ${isUrdu ? 'text-right' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <div className={`flex items-center gap-4 mb-4 ${isUrdu ? 'justify-end' : ''}`}>
            <FiHeart className="text-4xl text-[#27ae60]" />
            <h1 className={`text-4xl md:text-5xl font-black text-[#0f172a] ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu ? 'زکوٰۃ کی تقسیم اور پالیسی' : 'Zakat Policy & Guidelines'}
            </h1>
          </div>
          
          <p className={`text-xl text-slate-500 mb-10 ${isUrdu ? 'urdu-text' : ''}`}>
            {isUrdu 
              ? 'Jamiyat Punjabi Saudagran-e-Delhi (JPSD) کے پاس 100٪ زکوٰۃ کی شفافیت اور مستحقین میں مکمل تقسیم کی ضمانت ہے۔'
              : 'JPSD ensures 100% transparency and exact deployment of Zakat to the most severely eligible families.'}
          </p>

          <div className={`space-y-10 prose prose-lg max-w-none text-slate-600 ${isUrdu ? 'urdu-text leading-loose' : ''}`}>
            
            <section className="bg-[#27ae60]/5 rounded-2xl p-8 border border-[#27ae60]/20">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-[#27ae60] mb-4 mt-0">
                <FiShield /> {isUrdu ? '100% عطیہ کی پالیسی' : '100% Donation Policy (Zero Admin Fee)'}
              </h2>
              <p className="text-[#2c3e50] font-medium leading-relaxed mb-0">
                {isUrdu 
                  ? 'JPSD کو ملنے والی زکوٰۃ کی رقم سے کسی بھی قسم کے انتظامی اخراجات (Administrative overheads) یا عملے کی تنخواہیں نہیں کاٹی جاتیں۔ آپ کی جمع کروائی گئی زکوٰۃ کا 100 فیصد حصہ براہ راست غریب مستحق کی ملکیت بنا دیا جاتا ہے۔ انتظامی کاموں کا خرچ "عطیات و للہ" کے فنڈز سے پورا کیا جاتا ہے۔'
                  : 'JPSD guarantees a Zero Admin-Fee policy on Zakat. Not a single penny is deducted for marketing, staff salaries, or operational overhead. 100% of your Zakat directly reaches the poor. Administrative costs are exclusively covered through "Lillah" funds sponsored by dedicated patrons.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-6">
                {isUrdu ? 'زکوٰۃ کی اہلیت کا طریقہ کار' : 'Zakat Eligibility (Mustahiqeen)'}
              </h2>
              <p className="mb-6">
                {isUrdu 
                  ? 'ہر درخواست گزار کی مالی حالت کا گہرا اور خفیہ جائزہ لیا جاتا ہے۔ زکوٰۃ دینے سے قبل درج ذیل تصدیقی مراحل پر عمل ہوتا ہے:'
                  : 'Every applicant undergoes a deeply humane yet highly strict internal verification process to ensure Zakat eligibility:'}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { en: 'Detailed physical surveys of the applicant’s home.', ur: 'درخواست گزار کے گھر کا تفصیلی جسمانی سروے اور دورہ۔' },
                  { en: 'CNIC, Nadra matching, and background wealth checks.', ur: 'شناختی کارڈ (CNIC) اور محلے کے معززین سے آمدنی کی تصدیق۔' },
                  { en: 'Evaluating medical & family constraints severely.', ur: 'طبی صورتحال اور بچوں کی تعلیم کے بوجھ کا معائنہ۔' },
                  { en: 'Ensuring ownership transfer directly into the patient/student hands.', ur: 'زکوٰۃ کی رقم کو براہ راست نقدی، راشن یا ادویات کی صورت میں مستحق کی ملکیت میں دینا۔' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-slate-50 p-4 rounded-xl items-start">
                    <FiCheck className="text-[#27ae60] mt-1 shrink-0" />
                    <span className="text-sm md:text-base">{isUrdu ? item.ur : item.en}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                {isUrdu ? 'زکوٰۃ کے مصارف' : 'Avenues of Zakat Expenditure'}
              </h2>
              <p>
                {isUrdu 
                  ? 'قرآن مجید کی سورہ التوبہ (آیت 60) کی روشنی میں، JPSD زکوٰۃ کو خاص طور پر غریبوں کو راشن بھیجنے (دسترخوان)، اسپتالوں میں غریب مریضوں کے مفت علاج، مستحق طلباء کی تعلیمی فیس (اسکالر شپس)، اور قدرتی آفات میں نقد امداد کے طور پر خرچ کیا جاتا ہے۔'
                  : 'In light of Surah At-Tawbah (9:60), JPSD strictly channels Zakat towards direct cash relief for the impoverished, completely free patient care in hospitals, food distribution for the destitute, and educational scholarships for brilliant students possessing below-Nisab resources.'}
              </p>
            </section>

            <div className="pt-8">
              <Link href="/zakat-calculator">
                <button className={`bg-[#27ae60] hover:bg-[#219a52] text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-[#27ae60]/30 transition-transform active:scale-95 ${isUrdu ? 'urdu-text text-lg' : ''}`}>
                  {isUrdu ? 'اپنا زکوٰۃ کیلکولیٹ کریں' : 'Calculate Your Zakat Now'}
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
