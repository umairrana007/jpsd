'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw, FiMail, FiArrowLeft, FiShieldOff, FiInfo } from 'react-icons/fi';
import { useLanguage } from '@/contexts/LanguageContext';

const FailureContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { t } = useLanguage();

    const reason = searchParams.get('reason') || 'unknown';
    const prefill = searchParams.get('prefill') || '';

    const getReasonText = () => {
        switch (reason) {
            case 'timeout': return t('failed.reason.timeout');
            case 'declined': return t('failed.reason.declined');
            case 'cancelled': return t('failed.reason.cancelled');
            default: return t('failed.subtitle');
        }
    };

    const handleTryAgain = () => {
        if (prefill) {
            router.push(`/donate?prefill=${prefill}`);
        } else {
            router.push('/donate');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl"
            >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-amber-100">
                    <div className="bg-amber-500 p-10 text-center relative">
                        <motion.div 
                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, repeatDelay: 1 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6"
                        >
                            <FiAlertTriangle className="text-white text-4xl" />
                        </motion.div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-wider">
                            {t('failed.title')}
                        </h1>
                    </div>

                    <div className="p-8 md:p-12 text-center">
                        <div className="mb-8">
                            <p className="text-gray-600 font-medium mb-2 leading-relaxed">
                                {getReasonText()}
                            </p>
                            <div className="inline-flex items-center space-x-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                                <FiInfo /> <span>{t('failed.reassurance')}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button 
                                onClick={handleTryAgain}
                                className="w-full flex items-center justify-center space-x-2 py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg active:scale-95"
                            >
                                <FiRefreshCw /> <span>{t('failed.tryAgain')}</span>
                            </button>
                            
                            <a 
                                href="mailto:tech-lead@jpsd.org"
                                className="w-full flex items-center justify-center space-x-2 py-4 border-2 border-gray-100 text-gray-700 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all"
                            >
                                <FiMail /> <span>{t('failed.contactSupport')}</span>
                            </a>
                        </div>

                        <button 
                            onClick={() => router.push('/donate')}
                            className="mt-8 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-600 flex items-center justify-center mx-auto transition-colors"
                        >
                            <FiArrowLeft className="mr-1" /> {t('common.goBack')}
                        </button>
                    </div>

                    {/* Security Footnote */}
                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-center space-x-2 text-gray-400">
                        <FiShieldOff className="text-lg" />
                        <p className="text-[10px] font-medium leading-relaxed uppercase tracking-tighter">
                            Security Protocol Segmented | Data Integrity Verified
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const FailurePage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Restoration in progress...</div>}>
            <FailureContent />
        </Suspense>
    );
};

export default FailurePage;
