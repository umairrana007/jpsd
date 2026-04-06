'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function TermsOfServicePage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'سروس کی شرائط' : 'Terms of Service'}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 ${isUrdu ? 'text-right' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <h1 className={`text-4xl md:text-5xl font-black text-[#0f172a] mb-10 ${isUrdu ? 'urdu-text' : ''}`}>
            {isUrdu ? 'ویب سائٹ کے قواعد و ضوابط' : 'Terms of Service'}
          </h1>

          <div className={`space-y-8 prose prose-lg max-w-none text-slate-600 ${isUrdu ? 'urdu-text leading-loose' : ''}`}>
            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                {isUrdu ? '1. قبولیت' : '1. Acceptance of Terms'}
              </h2>
              <p>
                {isUrdu 
                  ? 'Jamiyat Punjabi Saudagran-e-Delhi (JPSD) کی ویب سائٹ تک رسائی یا استعمال کر کے، آپ ان شرائط و ضوابط کے پابند ہونے سے اتفاق کرتے ہیں۔ اگر آپ کو ان شرائط کا کوئی حصہ منظور نہیں ہے تو براہ کرم اس سائٹ کا استعمال نہ کریں۔'
                  : 'By accessing or using the Jamiyat Punjabi Saudagran-e-Delhi (JPSD) website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                {isUrdu ? '2. عطیات کی پالیسی' : '2. Donation Policy'}
              </h2>
              <p>
                {isUrdu 
                  ? 'JPSD کے پلیٹ فارم کے ذریعے جمع کیے گئے تمام عطیات رضاکارانہ ہیں۔ عطیہ کنندگان اس بات کو یقینی بنانے کے ذمہ دار ہیں کہ لین دین قانونی اور رضاکارانہ ہے۔ غلطی سے کیے گئے لین دین کی واپسی کے لیے، براہ کرم 3 دن کے اندر ہم سے رابطہ کریں۔ صدقہ اور زکوٰۃ کے فنڈز شرعی قوانین کے مطابق تقسیم کیے جائیں گے۔'
                  : 'All donations made through the JPSD platform are voluntary. Donors are responsible for ensuring the transaction is legal and intended. For refunds of mistaken transactions, please contact us within 3 days. Sadaqah and Zakat funds will be distributed strictly according to Shariah laws.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                {isUrdu ? '3. کاپی رائٹ اور ٹریڈ مارک' : '3. Copyright and Trademarks'}
              </h2>
              <p>
                {isUrdu 
                  ? 'اس ویب سائٹ پر موجود مواد، پراجیکٹ کی تصاویر، لوگو اور ٹیکسٹ Jamiyat Punjabi Saudagran-e-Delhi (JPSD) کی ملکیت ہیں۔ مواد کے غیر مجاز استعمال کی سختی سے ممانعت ہے۔'
                  : 'The content, project images, logos, and text found on this website are the property of Jamiyat Punjabi Saudagran-e-Delhi (JPSD). Unauthorized commercial use of the content without permission is strictly prohibited.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-4">
                {isUrdu ? '4. تبدیلی کے حقوق' : '4. Modifications'}
              </h2>
              <p>
                {isUrdu 
                  ? 'JPSD کسی بھی وقت ان شرائط کو نظر ثانی کرنے کا حق محفوظ رکھتا ہے۔ ویب سائٹ کا آپ کا مسلسل استعمال اپ ڈیٹ شدہ شرائط کی منظوری تصور ہوگا۔'
                  : 'JPSD reserves the right to revise these Terms at any time without prior notice. By using this website, you are agreeing to be bound by the current version of these Terms of Service.'}
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
