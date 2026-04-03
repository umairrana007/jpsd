'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

export default function ShariahCompliancePage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#f8fdfa] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'شرعی تعمیل' : 'Shariah Compliance'}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-[#1ea05f]/10 border border-[#1ea05f]/20 ${isUrdu ? 'text-right' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <div className={`flex items-center gap-4 mb-10 ${isUrdu ? 'justify-end' : ''}`}>
            <FiCheckCircle className="text-4xl text-[#1ea05f]" />
            <h1 className={`text-4xl md:text-5xl font-black text-[#1ea05f] ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu ? 'شرعی تعمیل کی پالیسی' : 'Shariah Compliance'}
            </h1>
          </div>

          <div className={`space-y-8 prose prose-lg max-w-none text-slate-600 ${isUrdu ? 'urdu-text leading-loose' : ''}`}>
            <p className="text-xl font-medium text-[#0f172a]">
              {isUrdu 
                ? 'Jamiyat Punjabi Saudagran-e-Delhi (JPSD) کا بنیادی مقصد مکمل اسلامی قوانین اور احکامات (شریعت) کی پاسداری کرتے ہوئے فلاحی سرگرمیاں انجام دینا ہے۔'
                : 'JPSD’s core objective is to execute all its welfare operations under total Shariah (Islamic rulings) compliance.'}
            </p>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4 mt-0">
                {isUrdu ? 'دارالافتاء اور سرپرستی' : 'Shariah Board & Supervision'}
              </h2>
              <p>
                {isUrdu 
                  ? 'تمام منصوبوں، زکوٰۃ کی کٹوتیوں اور تقسیم کی نگرانی مستند مفتیان کرام پرمشتمل شریعت بورڈ کے ذریعے کی جاتی ہے۔ JPSD مکمل دارالافتاء سے منسلک ہے، جو اس بات کو یقینی بناتا ہے کہ عطیات میں کسی بھی قسم کا ابہام یا سود کی ملاوٹ نہ ہو۔'
                  : 'All projects, operations, and collections are heavily monitored by an independent Shariah Advisory Board composed of highly respected Muftis. JPSD is tied directly to a Dar-ul-Ifta, guaranteeing exact pinpoint Islamic validity and absolute prohibition of interest (Riba).'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4 border-b border-slate-100 pb-2">
                {isUrdu ? 'علیحدہ اکاؤنٹس کا نظام' : 'Segregation of Funds'}
              </h2>
              <p className="mb-4">
                {isUrdu 
                  ? 'بینکاری اور لین دین کو مکمل شفاف aur شرعی بنانے کے لیے، JPSD فنڈز کو کیٹیگری کے لحاظ سے الگ الگ بینک کھاتوں میں رکھتا ہے۔'
                  : 'To avoid any mingling of funds, JPSD operates strictly segregated bank accounts based on the nature of the donations.'}
              </p>
              <ul className="list-none pl-0 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#1ea05f]" />
                  <span><strong>{isUrdu ? 'زکوٰۃ فنڈ' : 'Zakat Fund'}:</strong> {isUrdu ? 'صرف مستحقین (مصارفِ زکوٰۃ) کے لیے' : 'Strictly utilized for the 8 Asnaf (eligible recipients).'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span><strong>{isUrdu ? 'صدقات و عطیات فنڈ' : 'Sadaqah & Lillah Fund'}:</strong> {isUrdu ? 'رفاہ عامہ اور تعمیراتی کاموں کے لیے' : 'Used for general welfare infrastructure (e.g., mosques, schools, wells).'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span><strong>{isUrdu ? 'سود (انٹرسٹ) فنڈ' : 'Interest Clearing Fund'}:</strong> {isUrdu ? 'اگر کوئی مشتبہ رقم موصول ہو تو بغیر ثواب کی نیت مستحقین کو دی جاتی ہے' : 'Any accidental un-Islamic receipts are cleared to the poor without intention of reward.'}</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4 border-b border-slate-100 pb-2">
                {isUrdu ? 'زکوٰۃ کی منتقلی (تملیک)' : 'Principle of Tamleek (Ownership)'}
              </h2>
              <p>
                {isUrdu 
                  ? 'زکوٰۃ ادا ہونے کی بنیادی شرط، مستحق کو زکوٰۃ کا مالک بنانا ہے۔ JPSD کسی بھی پروجیکٹ (جیسے ہسپتال یا سکول) کی انتظامیہ پر زکوٰۃ خرچ نہیں کرتا، بلکہ یہ براہ راست کسی غریب، مریض یا طالب علم کی ملکیت میں دے دی جاتی ہے۔'
                  : 'A primary condition of Zakat validity is transferring complete ownership (Tamleek) to the poor. JPSD absolutely ensures that Zakat funds are not spent on administrative hospital/school building costs. Instead, they are transferred directly into the ownership of the poor patients, students, or families.'}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
