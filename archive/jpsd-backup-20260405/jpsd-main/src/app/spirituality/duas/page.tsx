'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { FiBookOpen, FiStar, FiSun, FiMoon, FiHeart } from 'react-icons/fi';

const duas = [
  {
    id: 1,
    titleArabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    titleEn: 'Bismillah',
    titleUrdu: 'بسم اللہ',
    transliteration: 'Bismillahi ar-Rahmanir-Raheem',
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful',
    translationUrdu: 'اللہ کے نام سے شروع جو بڑا مہربان نہایت رحم والا ہے',
    category: 'Daily',
    icon: <FiSun className="text-amber-500" />,
  },
  {
    id: 2,
    titleArabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا',
    titleEn: 'Dua for Beneficial Knowledge',
    titleUrdu: 'نفع بخش علم کی دعا',
    transliteration: 'Allahumma inni as\'aluka ilman naafi\'an',
    translation: 'O Allah, I ask You for beneficial knowledge',
    translationUrdu: 'اے اللہ میں تجھ سے نفع بخش علم مانگتا ہوں',
    category: 'Knowledge',
    icon: <FiBookOpen className="text-blue-500" />,
  },
  {
    id: 3,
    titleArabic: 'رَبِّ زِدْنِي عِلْمًا',
    titleEn: 'Dua for Increase in Knowledge',
    titleUrdu: 'علم میں اضافے کی دعا',
    transliteration: 'Rabbi zidni ilma',
    translation: 'My Lord, increase me in knowledge',
    translationUrdu: 'اے میرے رب میرے علم میں اضافہ فرما',
    category: 'Knowledge',
    icon: <FiStar className="text-purple-500" />,
  },
  {
    id: 4,
    titleArabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا',
    titleEn: 'Before Eating',
    titleUrdu: 'کھانے سے پہلے کی دعا',
    transliteration: 'Allahumma barik lana feema razaqtana',
    translation: 'O Allah, bless us in what You have provided for us',
    translationUrdu: 'اے اللہ ہمیں جو تو نے رزق دیا ہے اس میں برکت عطا فرما',
    category: 'Daily',
    icon: <FiHeart className="text-red-500" />,
  },
  {
    id: 5,
    titleArabic: 'بِسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    titleEn: 'Before Sleeping',
    titleUrdu: 'سونے سے پہلے کی دعا',
    transliteration: 'Bismika Allahumma amootu wa ahya',
    translation: 'In Your name, O Allah, I die and I live',
    translationUrdu: 'اے اللہ تیرے نام سے مرتا ہوں اور جیتا ہوں',
    category: 'Night',
    icon: <FiMoon className="text-indigo-500" />,
  },
  {
    id: 6,
    titleArabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا',
    titleEn: 'Upon Waking Up',
    titleUrdu: 'جاگنے کی دعا',
    transliteration: 'Alhamdu lillahil-lathee ahyana ba\'da ma amatana',
    translation: 'All praise is for Allah who gave us life after death',
    translationUrdu: 'تمام تعریفیں اللہ کے لیے جس نے ہمیں موت کے بعد زندگی دی',
    category: 'Morning',
    icon: <FiSun className="text-yellow-500" />,
  },
];

export default function DuasPage() {
  const { language } = useLanguage();
  const isUrdu = language === 'ur';

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/" className="hover:text-[#1ea05f]">Home</Link><span>/</span>
          <Link href="/spirituality" className="hover:text-[#1ea05f]">Spirituality</Link><span>/</span>
          <span className="text-[#1ea05f]">{isUrdu ? 'دعائیں' : 'Duas'}</span>
        </div>

        <div className={`text-center mb-20 space-y-5 ${isUrdu ? 'urdu-text' : ''}`}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-[#0f172a]">
            {isUrdu ? <>دعائیں و <span className="text-[#1ea05f]">اذکار</span></> : <>Duas & <span className="text-[#1ea05f]">Supplications</span></>}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-lg text-slate-500 max-w-2xl mx-auto">
            {isUrdu ? 'روزمرہ کی دعائیں اور اذکار جو سنت نبوی ﷺ سے ثابت ہیں۔' : 'Daily supplications and remembrances from the Prophetic Sunnah.'}
          </motion.p>
        </div>

        <div className="space-y-6">
          {duas.map((dua, index) => (
            <motion.div
              key={dua.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/30 border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl flex-shrink-0">
                  {dua.icon}
                </div>
                <div>
                  <h3 className={`text-base font-bold text-[#0f172a] ${isUrdu ? 'urdu-text' : ''}`}>
                    {isUrdu ? dua.titleUrdu : dua.titleEn}
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1ea05f] bg-[#1ea05f]/5 px-2 py-0.5 rounded">{dua.category}</span>
                </div>
              </div>
              
              {/* Arabic Text */}
              <div className="text-center py-6 px-4 bg-gradient-to-br from-slate-50 to-green-50/30 rounded-2xl mb-5 border border-slate-100/50">
                <p className="text-3xl md:text-4xl font-bold text-[#0f172a] leading-[2.2]" style={{ fontFamily: "'Amiri', 'Traditional Arabic', serif" }} dir="rtl">
                  {dua.titleArabic}
                </p>
              </div>

              {/* Transliteration */}
              <p className="text-sm text-slate-500 italic mb-2 font-medium">{dua.transliteration}</p>
              
              {/* Translation */}
              <p className={`text-sm text-slate-600 font-medium ${isUrdu ? 'urdu-text text-right' : ''}`}>
                {isUrdu ? dua.translationUrdu : dua.translation}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
