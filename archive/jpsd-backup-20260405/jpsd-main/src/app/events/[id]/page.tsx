'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { FiMapPin, FiCalendar, FiClock, FiArrowLeft, FiShare2, FiUsers, FiTag } from 'react-icons/fi';

const eventsList = [
  {
    id: 1,
    title: 'Ramadan Food Drive 2024',
    titleUrdu: 'رمضان فوڈ ڈرائیو ۲۰۲۴',
    date: 'March 15, 2024',
    location: 'Karachi',
    locationUrdu: 'کراچی',
    image: '/images/jpsd_ambulance.jpg',
    description: 'Distributed 10,000+ food packages to families in need during Ramadan. We focus on providing complete a month of rations to deserving households across various parts of the city. With your continuous support, we aim to double our reach for the next campaign.',
    descriptionUrdu: 'رمضان کے دوران ضرورت مند خاندانوں میں ۱۰،۰۰۰ سے زائد راشن پیکٹ تقسیم کیے گئے۔ ہم شہر کے مختلف حصوں میں مستحق گھرانوں کو ایک ماہ کا مکمل راشن فراہم کرنے پر توجہ مرکوز کرتے ہیں۔ آپ کے مسلسل تعاون سے، ہم اگلی مہم کے لیے اپنی پہنچ کو دوگنا کرنے کا ارادہ رکھتے ہیں۔',
    time: '10:00 AM - 4:00 PM',
    type: 'Humanitarian',
    typeUrdu: 'انسانی ہمدردی'
  },
  {
    id: 2,
    title: 'Free Medical Camp',
    titleUrdu: 'مفت میڈیکل کیمپ',
    date: 'February 20, 2024',
    location: 'Lahore',
    locationUrdu: 'لاہور',
    image: '/images/jpsd_education.jpg',
    description: 'Provided free healthcare to 5,000+ patients with specialist consultations. The camp included pediatricians, eye specialists, and general physicians. Free medicines were also distributed among the patients who could not afford them.',
    descriptionUrdu: 'ماہر ڈاکٹروں کی زیر نگرانی ۵۰۰۰ سے زائد مریضوں کا مفت طبی معائنہ کیا گیا۔ کیمپ میں بچوں کے معالج، آنکھوں کے ماہرین اور جنرل فزیشنز شامل تھے۔ ان مریضوں میں مفت ادویات بھی تقسیم کی گئیں جو انہیں خریدنے کی سکت نہیں رکھتے تھے۔',
    time: '09:00 AM - 6:00 PM',
    type: 'Medical',
    typeUrdu: 'طبی'
  },
  {
    id: 3,
    title: 'Winter Clothing Distribution',
    titleUrdu: 'سردیوں کے کپڑوں کی تقسیم',
    date: 'January 10, 2024',
    location: 'Islamabad',
    locationUrdu: 'اسلام آباد',
    image: '/images/jpsd_rozgaar.jpg',
    description: 'Distributed warm clothing to homeless individuals during winter. Volunteers gathered late at night to distribute blankets, jackets, and socks to those struggling against the harsh cold on the streets.',
    descriptionUrdu: 'سردیوں کے موسم میں بے گھر افراد میں گرم کپڑے تقسیم کیے گئے۔ رضاکاروں نے رات گئے کمبل، جیکٹس اور جرابیں تقسیم کرنے کے لیے جمع ہوئے تاکہ سڑکوں پر سخت سردی کا مقابلہ کرنے والوں کی مدد کی جا سکے۔',
    time: '08:00 PM - 12:00 AM',
    type: 'Relief',
    typeUrdu: 'امداد'
  },
  {
    id: 4,
    title: 'School Supplies Drive',
    titleUrdu: 'اسکول سپلائیز مہم',
    date: 'December 5, 2023',
    location: 'Peshawar',
    locationUrdu: 'پشاور',
    image: '/images/jpsd_main.jpg',
    description: 'Equipped 500+ students with books, bags, and stationery for new academic year. Education is the key to unlocking a better future, and supplying these tools ensures that marginalized children can pursue their dreams without financial hindrance.',
    descriptionUrdu: 'نئے تعلیمی سال کے لیے ۵۰۰ سے زائد طلباء کو کتابیں، بیگز اور اسٹیشنری فراہم کی گئی۔ تعلیم بہتر مستقبل کی کنجی ہے، اور ان آلات کی فراہمی اس بات کو یقینی بناتی ہے کہ پسماندہ بچے مالی رکاوٹ کے بغیر اپنے خوابوں کی تکمیل کر سکیں۔',
    time: '11:00 AM - 3:00 PM',
    type: 'Education',
    typeUrdu: 'تعلیم'
  },
];

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const [eventData, setEventData] = useState<any>(null);

  useEffect(() => {
    const foundEvent = eventsList.find(e => e.id.toString() === id);
    if (foundEvent) {
      setEventData(foundEvent);
    } else {
      setEventData({
        id: id,
        title: 'Special Collective Welfare Effort',
        titleUrdu: 'خصوصی اجتماعی فلاحی کوشش',
        date: 'Upcoming / جاری ہے',
        location: 'Various Locations',
        locationUrdu: 'مختلف مقامات',
        image: '/images/jpsd_food.jpg',
        description: 'Join us in our ongoing community welfare activities. This event focuses on community support, charity distribution, and fostering a sense of brotherhood to alleviate the difficulties faced by the less privileged. Your participation makes all the difference.',
        descriptionUrdu: 'ہماری جاری کمیونٹی فلاحی سرگرمیوں میں ہمارے ساتھ شامل ہوں۔ یہ ایونٹ کمیونٹی سپورٹ، صدقات کی تقسیم، اور بھائی چارے کے جذبے کو فروغ دینے پر توجہ مرکوز کرتا ہے تاکہ کم مراعات یافتہ افراد کو درپیش مشکلات کو کم کیا جا سکے۔ آپ کی شرکت ہی اصل تبدیلی لاتی ہے۔',
        time: 'TBA',
        type: 'General',
        typeUrdu: 'عام'
      });
    }
  }, [id]);

  if (!eventData) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  const title = language === 'ur' ? (eventData.titleUrdu || eventData.title) : eventData.title;
  const description = language === 'ur' ? (eventData.descriptionUrdu || eventData.description) : eventData.description;
  const location = language === 'ur' ? (eventData.locationUrdu || eventData.location) : eventData.location;
  const type = language === 'ur' ? (eventData.typeUrdu || eventData.type) : eventData.type;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-32 overflow-hidden relative">
      {/* Abstract Backgrounds */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1ea05f]/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <button 
          onClick={() => router.back()} 
          className={`inline-flex items-center gap-2 text-slate-500 hover:text-[#1ea05f] font-bold mb-12 transition-all group ${language === 'ur' ? 'flex-row-reverse' : ''}`}
        >
          <FiArrowLeft className={`group-hover:-translate-x-1 transition-transform ${language === 'ur' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
          <span className={language === 'ur' ? 'urdu-text' : 'text-xs uppercase tracking-widest'}>
            {language === 'ur' ? 'واپس جائیں' : 'Return to Events'}
          </span>
        </button>

        <div className={`flex flex-col lg:flex-row gap-16 lg:items-start ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
          {/* Main Visual & Info */}
          <div className="flex-1 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image 
                src={eventData.image} 
                alt={title} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className={`absolute bottom-8 ${language === 'ur' ? 'right-8' : 'left-8'} z-20`}>
                 <span className={`bg-[#1ea05f] text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
                   <FiTag /> {type}
                 </span>
              </div>
            </motion.div>

            <div className={`space-y-8 ${language === 'ur' ? 'text-right' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
              <h1 className={`text-4xl md:text-6xl font-black text-[#0f172a] !leading-[1.4] ${language === 'ur' ? 'urdu-text' : 'English-text tracking-tightest'}`}>
                {title}
              </h1>

              <div className={`prose prose-xl max-w-none text-slate-600 font-medium ${language === 'ur' ? 'urdu-text !leading-[2.0]' : 'English-text opacity-90'}`}>
                {description.split('\n').map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 text-2xl"><FiUsers /></div>
                  <div>
                    <p className={`text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {language === 'ur' ? 'شرکاء' : 'Participants'}
                    </p>
                    <p className="text-2xl font-black text-[#0f172a]">500+</p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#1ea05f]/5 flex items-center justify-center text-[#1ea05f] text-2xl">✨</div>
                  <div>
                    <p className={`text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {language === 'ur' ? 'حالت' : 'Event Status'}
                    </p>
                    <p className={`text-xl font-black text-[#1ea05f] ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {language === 'ur' ? 'تصدیق شدہ' : 'Verified Event'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Logistics */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-[400px] flex-shrink-0 sticky top-32"
          >
            <div className="bg-white rounded-[3rem] p-10 shadow-3xl border border-white relative overflow-hidden">
               <div className={`space-y-10 relative z-10 ${language === 'ur' ? 'text-right' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
                 <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="mt-1 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1ea05f] flex-shrink-0"><FiCalendar /></div>
                      <div>
                        <p className={`text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
                          {language === 'ur' ? 'تاریخ' : 'Date & Day'}
                        </p>
                        <p className="text-lg font-black text-[#0f172a] English-text">{eventData.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="mt-1 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1ea05f] flex-shrink-0"><FiClock /></div>
                      <div>
                        <p className={`text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
                          {language === 'ur' ? 'وقت' : 'Time Slot'}
                        </p>
                        <p className="text-lg font-black text-[#0f172a] English-text">{eventData.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="mt-1 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1ea05f] flex-shrink-0"><FiMapPin /></div>
                      <div>
                        <p className={`text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
                          {language === 'ur' ? 'مقام' : 'Exact Location'}
                        </p>
                        <p className={`text-lg font-black text-[#0f172a] ${language === 'ur' ? 'urdu-text !text-base' : ''}`}>{location}</p>
                      </div>
                    </div>
                 </div>

                 <div className="space-y-4 pt-10 border-t border-slate-50">
                    <Link href="/volunteer" className="block">
                      <Button variant="primary" className={`w-full !rounded-[1.5rem] !py-5 font-black flex items-center justify-center gap-3 ${language === 'ur' ? 'urdu-text text-lg' : 'tracking-widest capitalize'}`}>
                        {language === 'ur' ? 'رضاکار بنیں' : 'Register to Volunteer'}
                      </Button>
                    </Link>
                    <Link href="/contact-us" className="block">
                      <Button variant="outline" className={`w-full !rounded-[1.5rem] !py-5 font-black border-slate-200 text-slate-500 hover:text-slate-900 ${language === 'ur' ? 'urdu-text text-lg' : 'tracking-widest capitalize'}`}>
                        {language === 'ur' ? 'سوالات پوچھیں' : 'Inquire Details'}
                      </Button>
                    </Link>
                 </div>

                 <div className="flex justify-center pt-2">
                    <button className="flex items-center gap-2 text-slate-300 hover:text-[#1ea05f] transition-colors">
                      <FiShare2 />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{language === 'ur' ? 'شیئر کریں' : 'Share Activity'}</span>
                    </button>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
