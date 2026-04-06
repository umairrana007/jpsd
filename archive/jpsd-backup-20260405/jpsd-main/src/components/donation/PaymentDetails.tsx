'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FiCreditCard, FiDollarSign, FiUser, FiMail, FiPhone } from 'react-icons/fi';

interface Step3Props {
  donorInfo: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: string;
  isZakat: boolean;
  isAnonymous: boolean;
  onInfoChange: (field: string, value: string) => void;
  onPaymentMethodChange: (method: string) => void;
  onZakatChange: (isZakat: boolean) => void;
  onAnonymousChange: (isAnonymous: boolean) => void;
}

export const PaymentDetails: React.FC<Step3Props> = ({
  donorInfo,
  paymentMethod,
  isZakat,
  isAnonymous,
  onInfoChange,
  onPaymentMethodChange,
  onZakatChange,
  onAnonymousChange,
}) => {
  const { language, t } = useLanguage();

  const paymentMethods = [
    { id: 'jazzcash', name: 'JazzCash', icon: FiDollarSign },
    { id: 'easypaisa', name: 'EasyPaisa', icon: FiDollarSign },
    { id: 'stripe', name: 'Bank Transfer (Card)', icon: FiCreditCard },
  ];

  const getPaymentDetails = () => {
    switch (paymentMethod) {
      case 'jazzcash':
        return {
          title: t('donation.payment.jazzcash'),
          iconText: 'JC',
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          fields: [
            { label: t('donation.payment.accountTitle'), value: 'Muhammad Umair' },
            { label: t('donation.payment.jazzcashNumber'), value: '0300-1234567' }
          ]
        };
      case 'easypaisa':
        return {
          title: t('donation.payment.easypaisa'),
          iconText: 'EP',
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          fields: [
            { label: t('donation.payment.accountTitle'), value: 'Muhammad Umair' },
            { label: t('donation.payment.easypaisaNumber'), value: '0300-7654321' }
          ]
        };
      case 'stripe':
        return {
          title: t('donation.payment.bankTransfer'),
          iconText: '🏦',
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          fields: [
            { label: t('donation.payment.bankName'), value: 'Askari Bank' },
            { label: t('donation.payment.accountTitle'), value: 'Muhammad Umair' },
            { label: t('donation.payment.accountNo'), value: '0001 23456 7890' }
          ]
        };
      default:
        return null;
    }
  };

  const activeDetails = getPaymentDetails();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold text-[#2c3e50] mb-2 ${language === 'ur' ? 'urdu-text' : ''}`}>{t('donation.paymentDetails')}</h2>
        <p className={`text-gray-600 ${language === 'ur' ? 'urdu-text' : ''}`}>{t('donation.payment.subtitle')}</p>
      </div>

      {/* Donor Information */}
      <div className="space-y-4">
        <Input
          label={t('donation.donor.name')}
          placeholder={t('donation.donor.namePlaceholder')}
          value={donorInfo.name}
          onChange={(e) => onInfoChange('name', e.target.value)}
          icon={<FiUser />}
          id="donor-name"
        />
        <Input
          label={t('donation.donor.email')}
          type="email"
          placeholder={t('donation.donor.emailPlaceholder')}
          value={donorInfo.email}
          onChange={(e) => onInfoChange('email', e.target.value)}
          icon={<FiMail />}
          id="donor-email"
        />
        <Input
          label={t('donation.donor.phone')}
          type="tel"
          placeholder={t('donation.donor.phonePlaceholder')}
          value={donorInfo.phone}
          onChange={(e) => onInfoChange('phone', e.target.value)}
          icon={<FiPhone />}
          id="donor-phone"
        />
      </div>

      {/* Payment Method Selection */}
      <div className="pt-6 border-t border-gray-200">
        <h3 className={`text-xl font-semibold text-[#2c3e50] mb-4 ${language === 'ur' ? 'urdu-text' : ''}`}>{t('donation.payment.methodTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method, index) => (
            <motion.button
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onPaymentMethodChange(method.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                paymentMethod === method.id
                  ? 'border-[#27ae60] bg-[#27ae60]/10 shadow-md'
                  : 'border-gray-200 hover:border-[#27ae60]'
              }`}
            >
              <method.icon className="text-3xl mx-auto mb-2 text-[#27ae60]" />
              <p className="font-semibold text-[#2c3e50]">{method.name}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dynamic Payment Instructions */}
      <AnimatePresence mode="wait">
        {activeDetails && (
          <motion.div
            key={paymentMethod}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${activeDetails.bgColor} border ${activeDetails.borderColor} rounded-xl p-5 overflow-hidden`}
          >
            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-100">
                <span className={`text-lg font-black ${activeDetails.iconColor}`}>{activeDetails.iconText}</span>
              </div>
              <div className={`space-y-2 w-full ${language === 'ur' ? 'text-right' : ''}`}>
                <h4 className={`text-lg font-bold text-gray-900 ${language === 'ur' ? 'urdu-text' : ''}`}>{activeDetails.title}</h4>
                <p className={`text-sm text-gray-600 leading-relaxed ${language === 'ur' ? 'urdu-text' : ''}`}>
                  {t('donation.payment.transferInstructions')}
                </p>
                
                <div className="bg-white p-4 rounded-lg border border-gray-100 mt-2 space-y-2 shadow-sm" dir="ltr">
                  {activeDetails.fields.map((field, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className={`text-gray-500 text-sm font-medium ${language === 'ur' ? 'urdu-text' : ''}`}>{field.label}:</span>
                      <span className={`font-mono font-black text-lg ${index === activeDetails.fields.length - 1 ? 'text-[#27ae60] tracking-wider' : 'text-gray-900'} select-all`}>
                        {field.value}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2">
                  <p className={`text-xs text-gray-700 bg-white/50 px-3 py-2 rounded-md font-medium border border-gray-200/50 ${language === 'ur' ? 'urdu-text' : ''}`}>
                    ℹ️ <span className="underline">{language === 'ur' ? 'ہدایات:' : 'Instructions:'}</span> {t('donation.payment.finalInstruction')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donation Options */}
      <div className="pt-6 border-t border-gray-200 space-y-4">
        <h3 className={`text-xl font-semibold text-[#2c3e50] mb-4 ${language === 'ur' ? 'urdu-text' : ''}`}>
          {t('donation.options.title')}
        </h3>
        
        {/* Zakat/Sehmi Checkbox */}
        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#27ae60] transition-colors">
          <input
            type="checkbox"
            checked={isZakat}
            onChange={(e) => onZakatChange(e.target.checked)}
            className="w-5 h-5 text-[#27ae60] focus:ring-[#27ae60] rounded"
          />
          <div className={language === 'ur' ? 'text-right' : ''}>
            <p className={`font-semibold text-[#2c3e50] ${language === 'ur' ? 'urdu-text' : ''}`}>{t('donation.options.zakatLabel')}</p>
            <p className={`text-sm text-gray-600 ${language === 'ur' ? 'urdu-text' : ''}`}>{t('donation.options.zakatDesc')}</p>
          </div>
        </label>

        {/* Anonymous Donation Checkbox */}
        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#27ae60] transition-colors">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => onAnonymousChange(e.target.checked)}
            className="w-5 h-5 text-[#27ae60] focus:ring-[#27ae60] rounded"
          />
          <div className={language === 'ur' ? 'text-right' : ''}>
            <p className={`font-semibold text-[#2c3e50] ${language === 'ur' ? 'urdu-text' : ''}`}>{t('donation.options.anonymousLabel')}</p>
            <p className={`text-sm text-gray-600 ${language === 'ur' ? 'urdu-text' : ''}`}>{t('donation.options.anonymousDesc')}</p>
          </div>
        </label>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3 rtl:space-x-reverse"
      >
        <svg className="w-6 h-6 text-[#27ae60]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className={`text-sm text-gray-600 ${language === 'ur' ? 'urdu-text' : ''}`}>
          {t('donation.security.notice')}
        </p>
      </motion.div>
    </motion.div>
  );
};
