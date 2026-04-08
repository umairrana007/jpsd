'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { CauseSelection } from '@/components/donation/CauseSelection';
import { AmountSelection } from '@/components/donation/AmountSelection';
import { PaymentDetails } from '@/components/donation/PaymentDetails';
import { createDonation } from '@/lib/firebaseUtils';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import Link from 'next/link';
import { Suspense } from 'react';

const steps = [
  { number: 1, title: 'Select Cause' },
  { number: 2, title: 'Select Amount' },
  { number: 3, title: 'Payment Details' },
  { number: 4, title: 'Confirmation' },
];

function DonationContent() {
  const searchParams = useSearchParams();
  const initialCause = searchParams.get('cause');
  
  const { language, t } = useLanguage();
  const { setGlobalAlert } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [selectedCause, setSelectedCause] = useState<string | null>(initialCause);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [donorInfo, setDonorInfo] = useState({ name: '', email: '', phone: '' });
  const [paymentMethod, setPaymentMethod] = useState('jazzcash');
  const [isZakat, setIsZakat] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (initialCause) {
      setSelectedCause(initialCause);
    }
  }, [initialCause]);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const amount = selectedAmount || parseInt(customAmount) || 0;
      
      // Create donation record in Firebase
      const donationId = await createDonation({
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
        donorPhone: donorInfo.phone,
        amount,
        programId: selectedCause || 'general',
        programName: selectedCause || 'General Donation',
        paymentMethod,
        frequency,
        anonymous: isAnonymous,
        isZakat,
        isAnonymous,
      });

      setTransactionId(typeof donationId === 'string' ? donationId : `TXN-${Date.now()}`);
      setDonationComplete(true);
      setCurrentStep(4);
    } catch (error) {
      console.error('Error creating donation:', error);
      setGlobalAlert('Financial sync failed. Re-initiating contribution protocols.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return !!selectedCause;
    if (currentStep === 2) return selectedAmount > 0 || (customAmount && parseInt(customAmount) > 0);
    if (currentStep === 3) {
      return donorInfo.name && donorInfo.email && donorInfo.phone && paymentMethod;
    }
    return true;
  };

  const handleWhatsAppShare = () => {
    const amountStr = selectedAmount ? `Rs. ${selectedAmount.toLocaleString()}` : (customAmount ? `Rs. ${parseInt(customAmount).toLocaleString()}` : 'Custom Amount');
    const causeName = selectedCause || 'General Fund';
    const dateStr = new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
    
    const receiptMessage = `*JPSD Welfare Trust*
_Donation Receipt_ 🧾

*Transaction ID:* ${transactionId}
*Donor:* ${donorInfo.name || 'Anonymous Donor'}
*Amount:* ${amountStr}
*Project:* ${causeName}
*Date:* ${dateStr}

Thank you for your generous contribution! 💚
May Allah reward you immensely. ✨

*Verify at:* https://jpsd.org.pk/verify/${transactionId}`;

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(receiptMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-white pt-32 pb-12 px-4" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      currentStep >= step.number
                        ? 'bg-[#27ae60] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step.number}
                  </div>
                  <p className={`text-sm mt-2 font-medium text-[#2c3e50] hidden md:block ${language === 'ur' ? 'urdu-text' : ''}`}>
                    {t(`donation.step${step.number}`)}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 mb-8 ${
                      currentStep > step.number ? 'bg-[#27ae60]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <CauseSelection
                selectedCause={selectedCause}
                onSelectCause={setSelectedCause}
              />
            )}

            {currentStep === 2 && (
              <AmountSelection
                selectedAmount={selectedAmount}
                customAmount={customAmount}
                frequency={frequency}
                onSelectAmount={setSelectedAmount}
                onCustomAmountChange={setCustomAmount}
                onFrequencyChange={setFrequency}
              />
            )}

            {currentStep === 3 && (
              <PaymentDetails
                donorInfo={donorInfo}
                paymentMethod={paymentMethod}
                isZakat={isZakat}
                isAnonymous={isAnonymous}
                onInfoChange={(field, value) =>
                  setDonorInfo((prev) => ({ ...prev, [field]: value }))
                }
                onPaymentMethodChange={setPaymentMethod}
                onZakatChange={setIsZakat}
                onAnonymousChange={setIsAnonymous}
              />
            )}

            {currentStep === 4 && donationComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-[#27ae60] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className={`text-4xl font-bold text-[#27ae60] mb-4 ${language === 'ur' ? 'urdu-text' : ''}`}>
                  {t('donation.thankYou')}
                </h2>
                <p className={`text-xl text-gray-600 mb-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
                  {t('donation.successMessage')}
                </p>
                <p className={`text-gray-500 mb-8 ${language === 'ur' ? 'English-text' : ''}`}>
                  {t('donation.transactionId')}: {transactionId}
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto mb-8">
                  <p className={`text-sm text-gray-600 ${language === 'ur' ? 'urdu-text' : ''}`}>
                    {t('donation.receiptSent')} <strong>{donorInfo.email}</strong>
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/">
                    <Button variant="primary" className={language === 'ur' ? 'urdu-text' : ''}>
                      {t('donation.backToHome')}
                    </Button>
                  </Link>
                  <Button variant="gold" onClick={handleWhatsAppShare} className={language === 'ur' ? 'urdu-text' : ''}>
                    {t('donation.shareWhatsApp')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handleBack} className={language === 'ur' ? 'urdu-text' : ''}>
                  {t('donation.back')}
                </Button>
              ) : (
                <div />
              )}
              
              {currentStep < 3 ? (
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={language === 'ur' ? 'urdu-text' : ''}
                >
                  {t('donation.continue')}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={!canProceed()}
                  className={language === 'ur' ? 'urdu-text' : ''}
                >
                  {t('donation.complete')}
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function DonationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-32 pb-12"><div className="w-16 h-16 border-4 border-[#27ae60] border-t-transparent rounded-full animate-spin"></div></div>}>
      <DonationContent />
    </Suspense>
  );
}

