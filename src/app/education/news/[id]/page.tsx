'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiArrowLeft, FiShare2 } from 'react-icons/fi';

// Same mock data as parent page for demonstration
const newsItems = [
  {
    id: 1,
    title: 'Jamia Baitussalam Annual Convocation 2026',
    titleUrdu: 'جامعہ بیت السلام سالانہ کانووکیشن 2026',
    content: '500 students graduated from various programs at the annual convocation ceremony held at Jamia Baitussalam. The event marked a new milestone for the institution, heavily emphasizing the blend of traditional Islamic teachings and modern scientific methods. Renowned scholars from all over the country attended the ceremony and highlighted the importance of accessible and ethical education. Graduates were awarded medals of excellence to honor their hard work and dedication.',
    contentUrdu: 'جامعہ بیت السلام میں منعقدہ سالانہ کانووکیشن کی تقریب میں 500 طلبا نے مختلف پروگرامز سے گریجویشن کی۔ یہ تقریب ادارے کے لیے ایک نیا سنگ میل ثابت ہوئی، جس میں روایتی اسلامی تعلیمات اور جدید سائنسی طریقوں کے امتزاج پر خاص زور دیا گیا۔ ملک بھر سے نامور اسکالرز نے تقریب میں شرکت کی اور قابل رسائی اور اخلاقی تعلیم کی اہمیت پر زور دیا۔ فارغ التحصیل طلبا کی محنت اور لگن کے اعتراف میں انہیں تمغہ امتیاز سے نوازا گیا۔',
    image: '/images/fallback.jpg',
    date: 'March 20, 2026',
    category: 'Graduation',
  },
  {
    id: 2,
    title: 'New School Branch Opens in Multan',
    titleUrdu: 'ملتان میں نئی سکول شاخ کا افتتاح',
    content: 'Baitussalam expanded its education network with the opening of a new school branch in Multan serving 300 students. This project was carefully designed to accommodate modern digital classrooms, science labs, and comprehensive libraries to ensure quality learning experiences for all students in the region regardless of their socioeconomic realities. Local administration heavily praised Baitussalam\'s continuous efforts to combat educational poverty across Pakistan.',
    contentUrdu: 'بیت السلام نے ملتان میں 300 طلبا کو خدمات فراہم کرنے والی ایک نئی اسکول برانچ کے افتتاح کے ساتھ اپنے تعلیمی نیٹ ورک کو وسعت دی۔ یہ پروجیکٹ احتیاط کے ساتھ جدید ڈیجیٹل کلاس رومز، سائنسی لیبارٹریوں اور جامع لائبریریوں کو ایڈجسٹ کرنے کے لیے ڈیزائن کیا گیا تھا تاکہ خطے کے تمام طلبا کے لیے معیارِ زندگی سے قطع نظر معیاری تعلیم کے تجربات کو یقینی بنایا جا سکے۔ مقامی انتظامیہ نے پاکستان بھر میں تعلیمی پسماندگی کے خلاف بیت السلام کی مسلسل کوششوں کی بھرپور تعریف کی۔',
    image: '/images/jpsd_education.jpg',
    date: 'March 5, 2026',
    category: 'Infrastructure',
  },
  {
    id: 3,
    title: 'Scholarship Awards Ceremony',
    titleUrdu: 'اسکالرشپ ایوارڈز تقریب',
    content: '150 deserving students received full scholarships for higher education at leading universities across Pakistan. The Baitussalam Scholarship fund focuses heavily on orphans, brilliant students lacking resources, and individuals working exceptionally hard within the schooling system. Empowering these students to acquire advanced degrees marks our commitment to shaping the leaders of tomorrow effectively and inclusively.',
    contentUrdu: '150 مستحق طلبا کو پاکستان بھر کی معروف یونیورسٹیوں میں اعلیٰ تعلیم کے حصول کے لیے مکمل اسکالرشپ سے نوازا گیا۔ بیت السلام اسکالرشپ فنڈ کی توجہ بنیادی طور پر یتیموں، وسائل سے محروم ذہین طلبا، اور اسکولی نظام میں غیر معمولی محنت کرنے والے افراد پر مرکوز ہے۔ ان طلبا کو اعلیٰ ڈگریاں حاصل کرنے کے لیے بااختیار بنانا کل کے رہنماؤں کو مؤثر اور جامع انداز میں تشکیل دینے کے ہمارے عزم کی نشاندہی کرتا ہے۔',
    image: '/images/jpsd_rozgaar.jpg',
    date: 'February 18, 2026',
    category: 'Scholarships',
  },
];

export default function EducationNewsDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const news = newsItems.find(item => item.id.toString() === id);

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">{isUrdu ? 'تعلیمی خبر نہیں ملی' : 'Education news article not found'}</h1>
        <Link href="/education/news" className="text-[#1ea05f] hover:underline font-medium">
          {isUrdu ? 'تعلیمی خبروں پر واپس جائیں' : 'Return to Education News'}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/education" className="hover:text-[#1ea05f] transition-colors">Education</Link>
          <span>/</span>
          <Link href="/education/news" className="hover:text-[#1ea05f] transition-colors">{isUrdu ? 'خبریں' : 'News'}</Link>
          <span>/</span>
          <span className="text-[#1ea05f] truncate max-w-[200px]">{isUrdu ? news.titleUrdu : news.title}</span>
        </div>

        {/* Article Back Button */}
        <Link 
          href="/education/news" 
          className={`inline-flex items-center gap-2 text-slate-500 hover:text-[#1ea05f] font-bold mb-8 transition-colors ${isUrdu ? 'flex-row-reverse' : ''}`}
        >
          <FiArrowLeft className={isUrdu ? 'rotate-180' : ''} />
          {isUrdu ? 'خبروں پر واپس جائیں' : 'Back to News'}
        </Link>

        {/* Article Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`space-y-6 mb-10 ${isUrdu ? 'text-right' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <div className={`flex items-center gap-3 ${isUrdu ? 'justify-end' : ''}`}>
            <span className="text-[11px] font-black uppercase tracking-widest bg-[#1ea05f]/10 text-[#1ea05f] px-3 py-1.5 rounded-lg">
              {news.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
              <FiCalendar /> {news.date}
            </span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-black text-[#0f172a] leading-tight ${isUrdu ? 'urdu-text' : ''}`}>
            {isUrdu ? news.titleUrdu : news.title}
          </h1>
        </motion.div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative w-full aspect-[2/1] md:aspect-[2.5/1] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 mb-12"
        >
          <Image
            src={news.image}
            alt={news.title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`prose prose-lg md:prose-xl max-w-none text-slate-600 ${isUrdu ? 'urdu-text text-right !leading-[2.5]' : ''}`}
          dir={isUrdu ? 'rtl' : 'ltr'}
        >
          <p>{isUrdu ? news.contentUrdu : news.content}</p>
          
          <div className={`mt-12 pt-8 border-t border-slate-100 flex items-center ${isUrdu ? 'justify-start flex-row-reverse' : 'justify-between'}`}>
            <button className="flex items-center gap-2 text-slate-500 hover:text-[#1ea05f] font-bold transition-colors">
              <FiShare2 /> {isUrdu ? 'شیئر کریں' : 'Share this article'}
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
