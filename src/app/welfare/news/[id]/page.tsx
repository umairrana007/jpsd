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
    title: 'Baitussalam Distributes Relief to 10,000 Families',
    titleUrdu: 'بیت السلام نے 10,000 خاندانوں میں امداد تقسیم کی',
    content: 'In a massive relief operation, Baitussalam distributed food packages and essential supplies to flood-affected families across Sindh. The operation was carried out over two weeks, utilizing our vast network of volunteers to ensure supplies reached the most remote and disconnected communities. Each family received a month’s worth of dry rations, clean drinking water, and essential hygiene kits.',
    contentUrdu: 'ایک بڑے ریلیف آپریشن میں بیت السلام نے سندھ بھر میں سیلاب متاثر خاندانوں میں فوڈ پیکجز اور ضروری اشیاء تقسیم کیں۔ یہ آپریشن دو ہفتوں تک جاری رہا، جس میں ہمارے رضاکاروں کے وسیع نیٹ ورک کا استعمال کیا گیا تاکہ دور دراز اور منقطع علاقوں تک امداد پہنچائی جا سکے۔ ہر خاندان کو ایک ماہ کا خشک راشن، پینے کا صاف پانی اور حفظان صحت کی ضروری اشیاء فراہم کی گئیں۔',
    image: '/images/jpsd_rozgaar.jpg',
    date: 'March 15, 2026',
    category: 'Relief',
  },
  {
    id: 2,
    title: 'New Water Filtration Plant Inaugurated in Tharparkar',
    titleUrdu: 'تھرپارکر میں نئے واٹر فلٹریشن پلانٹ کا افتتاح',
    content: 'A state-of-the-art water filtration plant was inaugurated in Tharparkar, providing clean drinking water to over 5,000 villagers. The plant uses reverse osmosis (RO) technology to purify groundwater, significantly reducing waterborne diseases in the region. This initiative is part of our long-term goal to provide sustainable water solutions to arid regions.',
    contentUrdu: 'تھرپارکر میں جدید ترین واٹر فلٹریشن پلانٹ کا افتتاح کیا گیا جو 5,000 سے زائد دیہاتیوں کو صاف پانی فراہم کرے گا۔ یہ پلانٹ زیر زمین پانی کو صاف کرنے کے لیے ریورس اوسموسس (RO) ٹیکنالوجی کا استعمال کرتا ہے، جس سے خطے میں پانی سے پیدا ہونے والی بیماریوں میں نمایاں کمی آئے گی۔ یہ اقدام خشک علاقوں میں پائیدار پانی کے حل فراہم کرنے کے ہمارے طویل مدتی ہدف کا حصہ ہے۔',
    image: '/images/jpsd_main.jpg',
    date: 'March 10, 2026',
    category: 'Water',
  },
  {
    id: 3,
    title: 'Free Medical Camp Benefits 2,000+ Patients',
    titleUrdu: 'مفت طبی کیمپ سے 2,000 سے زائد مریض مستفید',
    content: 'A three-day free medical camp organized by Baitussalam provided healthcare services including eye surgeries and dental care. Over 2,000 patients from underprivileged backgrounds were treated free of cost. The camp included specialist doctors, completely free medicines, and follow-up consultation provisions for critical patients.',
    contentUrdu: 'بیت السلام کی جانب سے تین روزہ مفت طبی کیمپ میں آنکھوں کی سرجری اور دانتوں کی دیکھ بھال سمیت طبی خدمات فراہم کی گئیں۔ پسماندہ پس منظر سے تعلق رکھنے والے 2,000 سے زائد مریضوں کا مفت علاج کیا گیا۔ اس کیمپ میں ماہر ڈاکٹرز، مکمل طور پر مفت ادویات، اور تشویشناک مریضوں کے لیے فالو اپ مشاورت کی سہولیات شامل تھیں۔',
    image: '/images/jpsd_food.jpg',
    date: 'February 28, 2026',
    category: 'Health',
  },
  {
    id: 4,
    title: 'Annual Qurbani Drive Successfully Completed',
    titleUrdu: 'سالانہ قربانی مہم کامیابی سے مکمل',
    content: 'Baitussalam completed its annual Qurbani drive, distributing meat to over 100,000 deserving families nationwide. The distribution was meticulously planned and executed in adherence strictly to hygienic requirements, ensuring families could celebrate Eid-ul-Adha with dignity and joy.',
    contentUrdu: 'بیت السلام نے اپنی سالانہ قربانی مہم مکمل کی، جس کے تحت ملک بھر میں 100,000 سے زائد مستحق خاندانوں میں گوشت تقسیم کیا گیا۔ اس تقسیم کی منصوبہ بندی اور اس پر عمل درآمد حفظان صحت کے تقاضوں کے مطابق کیا گیا تھا، تاکہ یہ یقینی بنایا جا سکے کہ خاندان عزت اور خوشی کے ساتھ عید الاضحی منا سکیں۔',
    image: '/images/jpsd_health.jpg',
    date: 'February 15, 2026',
    category: 'Seasonal',
  },
];

export default function NewsDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  const news = newsItems.find(item => item.id.toString() === id);

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">{isUrdu ? 'خبر نہیں ملی' : 'News article not found'}</h1>
        <Link href="/welfare/news" className="text-[#1ea05f] hover:underline font-medium">
          {isUrdu ? 'خبروں پر واپس جائیں' : 'Return to News'}
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
          <Link href="/welfare" className="hover:text-[#1ea05f] transition-colors">Welfare</Link>
          <span>/</span>
          <Link href="/welfare/news" className="hover:text-[#1ea05f] transition-colors">{isUrdu ? 'خبریں' : 'News'}</Link>
          <span>/</span>
          <span className="text-[#1ea05f] truncate max-w-[200px]">{isUrdu ? news.titleUrdu : news.title}</span>
        </div>

        {/* Article Back Button */}
        <Link 
          href="/welfare/news" 
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
