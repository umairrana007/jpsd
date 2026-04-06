'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { getEventById } from '@/lib/firebaseUtils';
import { FiMapPin, FiCalendar, FiClock, FiArrowLeft, FiShare2, FiUsers, FiTag } from 'react-icons/fi';

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getEventById(id as string);
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1ea05f]"></div>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">
          {language === 'ur' ? 'تفصیلات نہیں مل سکیں' : 'Event Not Found'}
        </h1>
        <Link href="/events">
          <Button variant="primary">
            {language === 'ur' ? 'ایونٹس پر واپس جائیں' : 'Back to Events'}
          </Button>
        </Link>
      </div>
    );
  }

  const title = language === 'ur' ? (eventData.titleUrdu || eventData.title) : eventData.title;
  const description = language === 'ur' ? (eventData.descriptionUrdu || eventData.description) : eventData.description;
  const location = language === 'ur' ? (eventData.locationUrdu || eventData.location) : eventData.location;

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-32 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#1ea05f]/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 max-w-7xl">
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
          <div className="flex-1 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[16/9] md:aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
            >
              <Image 
                src={eventData.image || '/images/hero-banner.jpg'} 
                alt={title} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 text-2xl"><FiUsers /></div>
                  <div>
                    <p className={`text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {language === 'ur' ? 'شرکاء' : 'Capacity'}
                    </p>
                    <p className="text-2xl font-black text-[#0f172a]">{eventData.maxParticipants || '500+'}</p>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#1ea05f]/5 flex items-center justify-center text-[#1ea05f] text-2xl">✨</div>
                  <div>
                    <p className={`text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {language === 'ur' ? 'حالت' : 'Type'}
                    </p>
                    <p className={`text-xl font-black text-[#1ea05f] ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {eventData.type || 'Community'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                          {language === 'ur' ? 'تاریخ' : 'Date'}
                        </p>
                        <p className="text-lg font-black text-[#0f172a] English-text">
                          {eventData.startDate ? new Date(eventData.startDate).toLocaleDateString() : 'TBA'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="mt-1 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#1ea05f] flex-shrink-0"><FiMapPin /></div>
                      <div>
                        <p className={`text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
                          {language === 'ur' ? 'مقام' : 'Location'}
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
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
