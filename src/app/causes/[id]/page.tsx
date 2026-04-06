'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getCauseById } from '@/lib/firebaseUtils';
import { Cause } from '@/types';
import { FiMapPin, FiCalendar, FiUsers, FiClock, FiShield, FiHeart, FiShare2, FiArrowLeft } from 'react-icons/fi';

export default function CauseDetailPage() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [item, setItem] = useState<Cause | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getCauseById(id as string);
        setItem(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1ea05f]"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-slate-800">
          {language === 'ur' ? 'تفصیلات نہیں مل سکیں' : 'Details Not Found'}
        </h1>
        <Link href="/causes">
          <Button variant="primary">
            {language === 'ur' ? 'مقاصد پر واپس جائیں' : 'Back to Causes'}
          </Button>
        </Link>
      </div>
    );
  }

  const title = language === 'ur' ? (item.titleUrdu || item.title) : item.title;
  const description = language === 'ur' ? (item.descriptionUrdu || item.description) : item.description;
  const raised = item.raisedAmount || 0;
  const goal = item.goalAmount || 0;
  const percentage = Math.round((raised / goal) * 100);

  return (
    <main className="min-h-screen bg-slate-50 pt-20 pb-32 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1ea05f]/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <Link href="/causes" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1ea05f] font-bold mb-12 transition-colors group">
          <FiArrowLeft className={`group-hover:-translate-x-1 transition-transform ${language === 'ur' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
          <span className={language === 'ur' ? 'urdu-text' : 'text-xs uppercase tracking-widest'}>
            {language === 'ur' ? 'واپس جائیں' : 'Back to Causes'}
          </span>
        </Link>

        <div className={`flex flex-col lg:flex-row gap-16 lg:items-start ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
          {/* Left: Imagery & Details */}
          <div className="flex-1 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image 
                src={item.image || '/images/hero-banner.jpg'} 
                alt={title} 
                fill 
                className="object-cover"
                priority
              />
              <div className={`absolute top-8 ${language === 'ur' ? 'left-8' : 'right-8'} bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl shadow-xl border border-white/20`}>
                <span className={`text-[#1ea05f] font-black uppercase text-xs tracking-widest ${language === 'ur' ? 'urdu-text' : ''}`}>
                  {item.category}
                </span>
              </div>
            </motion.div>

            <div className={`space-y-8 ${language === 'ur' ? 'text-right' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
              <div>
                <h1 className={`text-4xl md:text-6xl font-black text-[#0f172a] mb-6 !leading-[1.4] opacity-100 ${language === 'ur' ? 'urdu-text' : 'English-text tracking-tightest'}`}>
                  {title}
                </h1>
                <div className={`flex flex-wrap gap-8 items-center ${language === 'ur' ? 'justify-start' : 'justify-start'}`}>
                  <div className="flex items-center gap-2.5 text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                    <FiMapPin className="text-[#1ea05f] text-sm" />
                    <span>{item.location || 'Pakistan'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400 font-bold uppercase text-[11px] tracking-widest">
                    <FiCalendar className="text-[#1ea05f] text-sm" />
                    <span>{item.deadline ? new Date(item.deadline).toLocaleDateString() : 'Continuous Mission'}</span>
                  </div>
                </div>
              </div>

              <div className={`prose prose-lg max-w-none text-slate-600 font-medium ${language === 'ur' ? 'urdu-text !leading-[2.0]' : 'English-text opacity-80'}`}>
                {description.split('\n').map((para: string, idx: number) => (
                  <p key={idx} className="mb-6">{para}</p>
                ))}
              </div>

              {/* Impact Markers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                {[
                  { icon: <FiUsers />, label: language === 'ur' ? 'مستفید افراد' : 'Direct Beneficiaries', value: '5,000+' },
                  { icon: <FiShield />, label: language === 'ur' ? 'تصدیق شدہ مہم' : 'Verified Campaign', value: language === 'ur' ? '۱۰۰٪ محفوظ' : '100% Secure' },
                ].map((marker, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#1ea05f] text-xl">
                      {marker.icon}
                    </div>
                    <div>
                      <p className={`text-[10px] font-bold text-slate-400 uppercase tracking-widest ${language === 'ur' ? 'urdu-text' : ''}`}>{marker.label}</p>
                      <p className={`text-lg font-black text-[#0f172a] ${language === 'ur' ? 'urdu-text text-base' : ''}`}>{marker.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Donation Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-[400px] flex-shrink-0 sticky top-32"
          >
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-white relative overflow-hidden">
              {/* Card Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              
              <div className={`space-y-10 relative z-10 ${language === 'ur' ? 'text-right' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-black text-slate-400 uppercase tracking-widest ${language === 'ur' ? 'urdu-text' : ''}`}>
                        {language === 'ur' ? 'جمع شدہ' : 'Raised'}
                      </span>
                      <span className="text-3xl font-black text-[#0f172a] English-text">${raised.toLocaleString()}</span>
                    </div>
                    <span className="bg-[#1ea05f]/10 text-[#1ea05f] px-4 py-1.5 rounded-xl text-xs font-black English-text">{percentage}%</span>
                  </div>
                  
                  <ProgressBar 
                    percentage={percentage} 
                    size="lg" 
                    className="!h-4 rounded-full bg-slate-100"
                  />
                  
                  <div className="flex justify-between mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>{language === 'ur' ? 'ہدف' : 'Goal'}</span>
                    <span className="English-text">${goal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href={`/donation?cause=${item.id}`} className="block">
                    <Button variant="gold" className={`w-full !rounded-2xl !py-4 font-black !bg-orange-500 hover:!bg-orange-600 shadow-xl shadow-orange-500/20 ${language === 'ur' ? 'urdu-text text-lg tracking-normal' : 'tracking-widest'}`}>
                      {language === 'ur' ? 'ابھی عطیہ کریں' : 'DONATE NOW'}
                    </Button>
                  </Link>
                  <Button variant="outline" className={`w-full !rounded-2xl !py-4 font-black flex items-center justify-center gap-3 border-slate-200 text-slate-500 hover:text-[#1ea05f] hover:border-[#1ea05f] ${language === 'ur' ? 'urdu-text text-lg' : 'tracking-widest'}`}>
                    <FiShare2 />
                    {language === 'ur' ? 'شیئر کریں' : 'SHARE CAUSE'}
                  </Button>
                </div>

                <div className="pt-4 border-t border-slate-50 space-y-4">
                  <div className="flex items-center gap-3 text-slate-400">
                    <FiShield className="text-[#1ea05f]" />
                    <span className={`text-[11px] font-bold uppercase tracking-tight ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {language === 'ur' ? 'آپ کے عطیات ۱۰۰٪ محفوظ ہیں' : 'Donations are 100% Tax Deductible'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <FiHeart className="text-[#1ea05f]" />
                    <span className={`text-[11px] font-bold uppercase tracking-tight ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {language === 'ur' ? 'آپ کی مدد زندگیاں بچا سکتی ہے' : 'Join 240+ other generous donors'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
