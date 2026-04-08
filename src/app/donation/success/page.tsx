'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiShare2, FiHome, FiArrowRight, FiHeart, FiClock, FiDollarSign } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { t, language } = useLanguage();

    const txid = searchParams.get('txid') || 'STUB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const amount = searchParams.get('amount') || '0';
    const cause = searchParams.get('cause') || 'General Donation';
    const donor = searchParams.get('donor') || 'Humanitarian';
    const timestamp = searchParams.get('timestamp') || new Date().toLocaleString();

    const shareImpact = () => {
        const text = t('success.shareText').replace('{cause}', cause);
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                {/* Main Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl overflow-hidden">
                    {/* Success Header */}
                    <div className="bg-emerald-600 p-8 text-center relative overflow-hidden">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-4"
                        >
                            <FiCheckCircle className="text-white text-4xl" />
                        </motion.div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
                            {t('success.title')}
                        </h1>
                        <p className="text-emerald-100 font-medium mt-2">
                            {t('success.subtitle')}
                        </p>

                        {/* Abstract Shapes */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Summary Section */}
                        <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-6 mb-8">
                            <h3 className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-4 flex items-center">
                                <FiArrowRight className="mr-2" /> {t('success.orderSummary')}
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm">
                                        <FiHeart className="text-emerald-600 mr-2 flex-shrink-0" />
                                        <span className="text-gray-500 mr-2">{t('donation.step1')}:</span>
                                        <span className="font-bold text-gray-900">{cause}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <FiDollarSign className="text-emerald-600 mr-2 flex-shrink-0" />
                                        <span className="text-gray-500 mr-2">{t('donation.step2')}:</span>
                                        <span className="font-bold text-gray-900">PKR {Number(amount).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm">
                                        <FiClock className="text-emerald-600 mr-2 flex-shrink-0" />
                                        <span className="text-gray-500 mr-2">{t('donation.transactionId')}:</span>
                                        <span className="font-bold text-gray-900 text-xs font-mono">{txid}</span>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <FiShare2 className="text-emerald-600 mr-2 flex-shrink-0" />
                                        <span className="text-gray-500 mr-2">Timestamp:</span>
                                        <span className="font-bold text-gray-900">{timestamp}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notice */}
                        <div className="flex items-center justify-center space-x-2 text-emerald-700 font-bold text-sm mb-10 text-center">
                            <FiCheckCircle className="animate-pulse" />
                            <span>{t('success.receiptNotice')}</span>
                        </div>

                        {/* CTAs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button 
                                onClick={shareImpact}
                                className="flex items-center justify-center space-x-2 py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl hover:-translate-y-1 active:scale-95"
                            >
                                <FiShare2 /> <span>{t('success.shareImpact')}</span>
                            </button>
                            <button 
                                onClick={() => router.push('/dashboard')}
                                className="flex items-center justify-center space-x-2 py-4 border-2 border-gray-200 text-gray-900 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all active:scale-95"
                            >
                                <FiHome /> <span>{t('success.returnDashboard')}</span>
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <button 
                                onClick={() => router.push('/donate')}
                                className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center justify-center mx-auto"
                            >
                                {t('success.donateMore')} <FiArrowRight className="ml-1" />
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-gray-400 text-xs mt-8 font-medium">
                    {t('email.stubNotice')}
                </p>
            </motion.div>
        </div>
    );
};

const SuccessPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading tactical sync...</div>}>
            <SuccessContent />
        </Suspense>
    );
};

export default SuccessPage;
