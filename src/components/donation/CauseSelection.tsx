'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { FiHeart, FiDroplet, FiBook, FiHome, FiUsers, FiActivity } from 'react-icons/fi';

const causes = [
  { id: 'education', name: 'Education', nameUrdu: 'تعلیم', icon: FiBook, color: '#2980b9' },
  { id: 'health', name: 'Health', nameUrdu: 'صحت', icon: FiHeart, color: '#e74c3c' },
  { id: 'food', name: 'Food (Dastarkhwan)', nameUrdu: 'خوراک (دسترخوان)', icon: FiUsers, color: '#27ae60' },
  { id: 'water', name: 'Clean Water', nameUrdu: 'صاف پانی', icon: FiDroplet, color: '#3498db' },
  { id: 'emergency', name: 'Emergency Relief', nameUrdu: 'ہنگامی امداد', icon: FiActivity, color: '#e67e22' },
  { id: 'shelter', name: 'Shelter', nameUrdu: 'پناہ گاہ', icon: FiHome, color: '#9b59b6' },
];

interface Step1Props {
  selectedCause: string | null;
  onSelectCause: (cause: string) => void;
}

export const CauseSelection: React.FC<Step1Props> = ({ selectedCause, onSelectCause }) => {
  const { language, t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold text-[#2c3e50] mb-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
          {t('donation.cause.title')}
        </h2>
        <p className={`text-gray-600 ${language === 'ur' ? 'urdu-text' : ''}`}>
          {t('donation.cause.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {causes.map((cause, index) => (
          <motion.div
            key={cause.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => onSelectCause(cause.id)}
              className={`w-full p-6 rounded-lg border-2 transition-all duration-200 ${
                selectedCause === cause.id
                  ? 'border-[#27ae60] bg-[#27ae60]/10 shadow-lg'
                  : 'border-gray-200 hover:border-[#27ae60] hover:bg-gray-50'
              }`}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${cause.color}20` }}
              >
                <cause.icon className="text-3xl" style={{ color: cause.color }} />
              </div>
              <h3 className={`font-bold text-lg text-[#2c3e50] mb-1 ${language === 'ur' ? 'urdu-text' : ''}`}>
                {language === 'ur' ? cause.nameUrdu : cause.name}
              </h3>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
