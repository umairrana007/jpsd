'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'رازداری کی پالیسی' : 'Privacy Policy'}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 ${isUrdu ? 'text-right' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <h1 className={`text-4xl md:text-5xl font-black text-[#0f172a] mb-10 ${isUrdu ? 'urdu-text' : ''}`}>
            {isUrdu ? 'رازداری کی پالیسی' : 'Privacy Policy'}
          </h1>

          <div className={`space-y-8 prose prose-lg max-w-none text-slate-600 ${isUrdu ? 'urdu-text leading-loose' : ''}`}>
            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                {isUrdu ? '1. تعارف' : '1. Introduction'}
              </h2>
              <p>
                {isUrdu 
                  ? 'بیت السلام ویلفیئر ٹرسٹ آپ کی رازداری کا احترام کرتا ہے اور آپ کے ذاتی ڈیٹا کی حفاظت کے لیے پرعزم ہے۔ یہ رازداری کی پالیسی بتاتی ہے کہ جب آپ ہماری ویب سائٹ استعمال کرتے ہیں تو ہم آپ کی ذاتی معلومات کو کیسے جمع، استعمال اور محفوظ کرتے ہیں۔'
                  : 'Baitussalam Welfare Trust respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                {isUrdu ? '2. ہم کونسا ڈیٹا جمع کرتے ہیں' : '2. What Data We Collect'}
              </h2>
              <p className="mb-4">
                {isUrdu 
                  ? 'ہم درج ذیل قسم کی ذاتی معلومات اکٹھا کر سکتے ہیں:'
                  : 'We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:'}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{isUrdu ? 'شناختی ڈیٹا (نام، ای میل، فون نمبر)' : 'Identity Data (Name, Email, Phone Number)'}</li>
                <li>{isUrdu ? 'عطیہ کا ڈیٹا (رقم، ادائیگی کا طریقہ، تاریخ)' : 'Donation Data (Amount, Payment Method, Date)'}</li>
                <li>{isUrdu ? 'تکنیکی ڈیٹا (آئی پی ایڈریس، براؤزر کی قسم)' : 'Technical Data (IP Address, Browser Type)'}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                {isUrdu ? '3. ہم آپ کا ڈیٹا کیسے استعمال کرتے ہیں' : '3. How We Use Your Data'}
              </h2>
              <p>
                {isUrdu 
                  ? 'صرف آپ کے عطیات پر کارروائی کرنے، رسیدیں جاری کرنے، آپ کو ہماری فلاحی سرگرمیوں کے بارے میں آگاہ رکھنے، اور آپ کے رضاکارانہ درخواستوں کا جواب دینے کے لیے۔ ہم آپ کا ڈیٹا کبھی بھی غیر متعلقہ فریقین کو فروخت نہیں کرتے۔'
                  : 'We will only use your personal data to process donations, issue receipts, notify you regarding our welfare campaigns, and interact regarding your volunteer applications. We never sell your personal data to third parties.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                {isUrdu ? '4. ڈیٹا کی حفاظت' : '4. Data Security'}
              </h2>
              <p>
                {isUrdu 
                  ? 'ہم نے آپ کے ذاتی ڈیٹا کو اتفاقی طور پر ضائع ہونے، غیر مجاز طریقے سے استعمال یا رسائی ہونے سے روکنے کے لیے مناسب حفاظتی اقدامات (SSL انکرپشن) کیے ہیں۔ ادائیگیاں محفوظ اور بین الاقوامی معیار کے مطابق ہوتی ہیں۔'
                  : 'We have put in place appropriate security measures (including SSL encryption) to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. Payment gateways used are thoroughly secured and compliant with financial standards.'}
              </p>
            </section>
            
            <p className="pt-8 border-t border-slate-100 text-sm md:text-base opacity-80 font-medium text-slate-400">
              {isUrdu 
                ? 'آخری بار اپ ڈیٹ کیا گیا: یکم مارچ 2026'
                : 'Last Updated: March 1, 2026'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
