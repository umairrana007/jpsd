// Cause Card Component
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Cause, UrgencyLevel } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiCalendar, FiAlertCircle } from 'react-icons/fi';

interface CauseCardProps {
  cause: Cause;
}

export const CauseCard: React.FC<CauseCardProps> = ({ cause }) => {
  const { t, language } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const getUrgencyStyles = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case UrgencyLevel.CRITICAL:
        return 'bg-red-500 text-white shadow-red-200';
      case UrgencyLevel.HIGH:
        return 'bg-orange-500 text-white shadow-orange-200';
      case UrgencyLevel.MEDIUM:
        return 'bg-yellow-500 text-slate-800 shadow-yellow-100';
      case UrgencyLevel.LOW:
        return 'bg-green-500 text-white shadow-green-100';
      default:
        return 'bg-slate-500 text-white shadow-slate-100';
    }
  };

  const raisedAmount = cause.raisedAmount ?? 0;
  const goalAmount = cause.goalAmount ?? 1;
  const currentPercentage = cause.percentage ?? Math.min(100, Math.round((raisedAmount / goalAmount) * 100));
  const isActive = cause.active !== false;
  const isFeatured = cause.featured ?? false;
  const urgencyLevel = cause.urgency ?? 'low';
  const deadlineDate = cause.deadline ? new Date(cause.deadline) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group cause-card bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={imgError || !cause.image ? '/images/jpsd_main.jpg' : cause.image}
          alt={cause.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgError(true)}
          priority={isFeatured}
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Urgency Badge */}
        <div className="absolute top-6 left-6">
          <div className={`${getUrgencyStyles(urgencyLevel as UrgencyLevel)} px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center space-x-1.5`}>
            {urgencyLevel === UrgencyLevel.CRITICAL && <FiAlertCircle className="text-xs" />}
            <span>{urgencyLevel}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4 flex flex-row justify-center w-full" dir="ltr">
          <span className={`text-[10px] font-black text-[#1ea05f] uppercase tracking-widest bg-[#1ea05f]/5 px-3 py-1 rounded-lg ${language === 'ur' ? 'urdu-text text-[11px]' : ''}`}>
            {language === 'ur' ? t(`category.${cause.category.toLowerCase()}`) || cause.category : cause.category}
          </span>
        </div>
        
        {language === 'ur' && cause.titleUrdu ? (
          <h3 className="card-title-urdu text-[#0f172a] mb-4 group-hover:text-[#1ea05f] transition-colors line-clamp-2 !leading-[1.8] py-1">{cause.titleUrdu}</h3>
        ) : (
          <h3 className="card-title-english text-[#0f172a] mb-3 group-hover:text-[#1ea05f] transition-colors line-clamp-1">{cause.title}</h3>
        )}
        
        {language === 'ur' && cause.descriptionUrdu ? (
          <p className="urdu-text text-slate-500 opacity-80 mb-6 line-clamp-2 !leading-[1.8]">{cause.descriptionUrdu}</p>
        ) : (
          <p className="english-text text-slate-500 opacity-80 mb-6 line-clamp-2 text-center">{cause.description}</p>
        )}

        {/* Progress Section */}
        <div className="mt-auto space-y-4">
          <div className={`flex justify-between items-end mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {language === 'ur' ? 'جمع شدہ' : 'Raised'}
              </span>
              <span className="text-lg font-black text-[#0f172a] English-text">PKR {raisedAmount.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {language === 'ur' ? 'ہدف' : 'Goal'}
              </span>
              <span className="text-lg font-black text-slate-400 English-text">PKR {goalAmount.toLocaleString()}</span>
            </div>
          </div>
          
          <ProgressBar 
            percentage={currentPercentage || 0} 
            size="md"
            className="!h-3 overflow-hidden rounded-full bg-slate-100"
          />
          
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className={`flex items-center text-slate-400 text-xs font-bold uppercase tracking-tight ${language === 'ur' ? 'urdu-text gap-4' : 'space-x-4'}`}>
              <div className="flex items-center gap-1.5">
                <FiMapPin className="text-[#1ea05f]" />
                {cause.location}
              </div>
              <div className="flex items-center gap-1.5">
                <FiCalendar className="text-[#1ea05f]" />
                {deadlineDate ? deadlineDate.toLocaleDateString() : 'Ongoing'}
              </div>
            </div>
          </div>

          <Link href={`/donation?cause=${cause.id}`} className="w-full donate-btn">
            <Button
              variant="primary"
              size="md"
              className={`w-full !rounded-2xl !py-4 mt-4 font-black shadow-lg shadow-[#1ea05f]/10 ${language === 'ur' ? 'urdu-text tracking-normal' : 'tracking-widest'}`}
              disabled={!isActive}
            >
              {isActive 
                ? (language === 'ur' ? 'ابھی عطیہ کریں' : 'CONTRIBUTE NOW') 
                : (language === 'ur' ? 'مہم ختم ہوگئی' : 'CAMPAIGN ENDED')}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
