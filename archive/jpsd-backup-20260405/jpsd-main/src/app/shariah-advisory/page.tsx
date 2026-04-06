'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { FiCheckCircle, FiShield, FiFileText } from 'react-icons/fi';

export default function ShariahAdvisoryPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#f8fdfa] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'شرعی ایڈوائزری' : 'Shariah Advisory'}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-[#1ea05f]/10 border border-[#1ea05f]/20 ${isUrdu ? 'text-right' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <div className={`flex flex-col gap-4 mb-10 ${isUrdu ? 'items-end' : 'items-start'}`}>
            <div className="w-16 h-16 bg-[#1ea05f]/10 rounded-2xl flex items-center justify-center text-[#1ea05f]">
               <FiShield size={32} />
            </div>
            <h1 className={`text-4xl md:text-5xl font-black text-[#1ea05f] ${isUrdu ? 'urdu-text' : ''}`}>
              {isUrdu ? 'شرعی ایڈوائزری بورڈ' : 'Shariah Advisory Board'}
            </h1>
            <p className="text-slate-500 font-medium italic">Establishing the Gold Standard of Islamic Compliance.</p>
          </div>

          <div className={`space-y-8 prose prose-lg max-w-none text-slate-600 ${isUrdu ? 'urdu-text leading-loose' : ''}`}>
            <p className="text-xl font-medium text-[#0f172a]">
              {isUrdu 
                ? 'بیت السلام انٹرنیشنل کا ہر قدم مستند علماء اور ماہرینِ شریعت کی براہ راست نگرانی میں اٹھایا جاتا ہے۔ ہمارا مقصد صرف فلاح و بہبود نہیں، بلکہ اسے خالص شرعی تقاضوں کے مطابق بنانا ہے۔'
                : 'Every single operation at JPSD International is conducted under the rigorous supervision of authorized scholars and Shariah experts. Our mission is not just welfare; it is to ensure every penny is accounted for within divine boundaries.'}
            </p>

            <section className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <FiFileText size={80} />
               </div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4 mt-0">
                {isUrdu ? 'آزاد شرعی مانیٹرنگ' : 'Independent Shariah Monitoring'}
              </h2>
              <p>
                {isUrdu 
                  ? 'بیت السلام کا نظام مستقل طور پر دارالافتاء سے منسلک ہے۔ تمام پروجیکٹس کے اکاؤنٹس کی آڈٹ رپورٹ شریعت بورڈ کو پیش کی جاتی ہے تاکہ اس بات کو یقینی بنایا جا سکے کہ عطیات کا استعمال عین شرعی احکامات کے مطابق ہوا ہے۔'
                  : 'JPSD operates a permanent link with the Dar-ul-Ifta. Detailed audit reports for all humanitarian projects are presented to our Shariah Board to verify that donor funds have been utilized in precise alignment with Islamic mandates.'}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
               <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-[#1ea05f]/30 transition-all">
                  <h3 className="font-black text-[#1ea05f] uppercase tracking-widest text-xs mb-3">{isUrdu ? 'زکوٰۃ کی تقسیم' : 'Zakat Disbursement'}</h3>
                  <p className="text-sm text-slate-600">
                     {isUrdu 
                       ? 'زکوٰۃ کے لیے الگ تملیک (Tamleek) کا نظام قائم ہے تاکہ شرعی ضابطوں کو پورا کیا جا سکے۔'
                       : 'A dedicated Tamleek system is in place to ensure Zakat reached the rightful owners directly.'}
                  </p>
               </div>
               <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-[#1ea05f]/30 transition-all">
                  <h3 className="font-black text-blue-500 uppercase tracking-widest text-xs mb-3">{isUrdu ? 'شفافیت' : 'High Transparency'}</h3>
                  <p className="text-sm text-slate-600">
                     {isUrdu 
                       ? 'فنڈز کی کیٹیگریز (زکوٰۃ، صدقہ، عطیہ) کو الگ الگ بینک اکاؤنٹس میں رکھا جاتا ہے۔'
                       : 'Different donation categories (Zakat, Sadaqah, Lillah) are managed in strictly segregated bank accounts.'}
                  </p>
               </div>
            </div>

            <section className="pt-10 border-t border-slate-100">
               <div className="flex items-center gap-2 mb-4">
                  <FiCheckCircle className="text-[#1ea05f]" />
                  <h2 className="text-2xl font-bold text-[#0f172a] m-0">
                    {isUrdu ? 'شرعی تصدیق نامہ' : 'Shariah Verification'}
                  </h2>
               </div>
              <p>
                {isUrdu 
                  ? 'ہمارے تمام مالیاتی معاملات، بشمول سرمایہ کاری اور عطیات کی وصولی، سود (Riba) سے پاک اور اسلامک بینکنگ کے اصولوں کے عین مطابق ہیں۔'
                  : 'All our financial engagements, including investments and donor collections, are interest-free (Riba-free) and comply strictly with Islamic Banking and Financing standards.'}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

