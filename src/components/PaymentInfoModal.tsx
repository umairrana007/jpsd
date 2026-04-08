'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiX, FiInfo, FiCheckCircle, FiShield, FiDollarSign, FiClock, FiGlobe } from 'react-icons/fi';

interface PaymentInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: string;
}

const PaymentInfoModal: React.FC<PaymentInfoModalProps> = ({ isOpen, onClose, method }) => {
  const { language, t } = useLanguage();

  const getMethodDetails = () => {
    switch (method) {
      case 'jazzcash':
        return {
          id: 'jazzcash',
          title: t('payment.info.jazzcash.title'),
          steps: [
            t('payment.info.jazzcash.step1'),
            t('payment.info.jazzcash.step2'),
            t('payment.info.jazzcash.step3')
          ],
          color: 'text-red-500',
          bgColor: 'bg-red-50'
        };
      case 'easypaisa':
        return {
          id: 'easypaisa',
          title: t('payment.info.easypaisa.title'),
          steps: [
            t('payment.info.easypaisa.step1'),
            t('payment.info.easypaisa.step2'),
            t('payment.info.easypaisa.step3')
          ],
          color: 'text-green-500',
          bgColor: 'bg-green-50'
        };
      case 'stripe':
      case 'card':
        return {
            id: 'stripe',
            title: 'International Credit/Debit Corridor',
            steps: [
              'Powered by Stripe for global humanitarian outreach.',
              'Accepts all major international cards (Visa, MasterCard, Amex).',
              'End-to-end encryption ensures data integrity.'
            ],
            color: 'text-blue-500',
            bgColor: 'bg-blue-50'
        };
      default:
        return { id: 'unknown', title: 'Unknown Protocol', steps: [], color: 'text-gray-500', bgColor: 'bg-gray-50' };
    }
  };

  const details = getMethodDetails();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-[1000] overflow-hidden"
            dir={language === 'ur' ? 'rtl' : 'ltr'}
          >
            <div className="relative p-6 md:p-8">
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <FiX className="text-xl text-gray-400" />
              </button>

              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                <div className={`p-3 rounded-xl ${details.bgColor} ${details.color}`}>
                  <FiInfo className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 leading-none">
                    {details.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 uppercase tracking-widest font-bold">
                    {t('donation.payment.info.title')}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {details.steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 rtl:space-x-reverse"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <FiCheckCircle className={`text-lg ${details.color}`} />
                    </div>
                    <p className="text-gray-700 font-medium">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Operational Details Section - Fix #1 Issue C */}
              {(details.id === 'jazzcash' || details.id === 'easypaisa') && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-4">
                    {t('payment.info.operational.title')}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600">
                      <FiDollarSign className={details.color} />
                      <span>{t(`payment.info.${details.id}.fees`)}</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600">
                      <FiClock className={details.color} />
                      <span>{t(`payment.info.${details.id}.time`)}</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-600">
                      <FiGlobe className={details.color} />
                      <span>{t(`payment.info.${details.id}.regions`)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 bg-gray-50 rounded-xl p-4 flex items-center space-x-3 rtl:space-x-reverse">
                <FiShield className="text-xl text-green-600 flex-shrink-0" />
                <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                  {t('donation.security.notice')}
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-[0.98] uppercase tracking-widest text-xs"
                >
                  {language === 'ur' ? 'سمجھ آگیا' : 'Understood'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentInfoModal;
