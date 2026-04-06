'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const quickAmounts = [1000, 5000, 10000, 50000];

interface Step2Props {
  selectedAmount: number;
  customAmount: string;
  frequency: 'one-time' | 'monthly';
  onSelectAmount: (amount: number) => void;
  onCustomAmountChange: (amount: string) => void;
  onFrequencyChange: (freq: 'one-time' | 'monthly') => void;
}

export const AmountSelection: React.FC<Step2Props> = ({
  selectedAmount,
  customAmount,
  frequency,
  onSelectAmount,
  onCustomAmountChange,
  onFrequencyChange,
}) => {
  const { language, t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className={`text-2xl sm:text-3xl font-bold text-[#2c3e50] mb-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
          {t('donation.amount.title')}
        </h2>
        <p className={`text-gray-600 ${language === 'ur' ? 'urdu-text' : ''}`}>
          {t('donation.amount.subtitle')}
        </p>
      </div>

      {/* Frequency Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => onFrequencyChange('one-time')}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base transition-all ${
              frequency === 'one-time'
                ? 'bg-[#27ae60] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('donation.oneTime')}
          </button>
          <button
            onClick={() => onFrequencyChange('monthly')}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base transition-all ${
              frequency === 'monthly'
                ? 'bg-[#27ae60] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('donation.monthly')}
          </button>
        </div>
      </div>

      {/* Quick Amounts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickAmounts.map((amount, index) => (
          <motion.button
            key={amount}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectAmount(amount)}
            className={`py-4 px-6 rounded-lg font-bold text-lg transition-all ${
              selectedAmount === amount && !customAmount
                ? 'bg-[#f39c12] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('common.rs')} {amount.toLocaleString()}
          </motion.button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="pt-6 border-t border-gray-200">
        <p className="text-center text-gray-600 mb-4">{t('donation.customAmount')}</p>
        <Input
          type="number"
          placeholder={t('donation.amount.placeholder')}
          value={customAmount}
          onChange={(e) => onCustomAmountChange(e.target.value)}
          className="max-w-md mx-auto block"
          id="custom-amount"
        />
      </div>

      {/* Impact Message */}
      {(selectedAmount || customAmount) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#27ae60]/10 p-6 rounded-lg text-center"
        >
          <p className={`text-[#27ae60] font-semibold ${language === 'ur' ? 'urdu-text' : ''}`}>
            {t('common.rs')} {(selectedAmount || parseInt(customAmount)).toLocaleString()}{' '}
            {frequency === 'monthly' ? t('common.perMonth') : ''} - {t('donation.amount.impactMessage')}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
