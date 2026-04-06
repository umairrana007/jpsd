'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FiDollarSign, FiActivity, FiShield, FiPercent, FiTrash2, FiInfo, FiLayers } from 'react-icons/fi';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const ZAKAT_RATE = 0.025; // 2.5%

export default function ZakatCalculator() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'assets' | 'liabilities' | 'results'>('assets');

  const [assets, setAssets] = useState({
    gold: '',
    silver: '',
    cash: '',
    bank: '',
    shares: '',
    merchandise: '',
    receivables: '',
  });

  const [liabilities, setLiabilities] = useState({
    debt: '',
    bills: '',
  });

  const calculateTotal = (obj: any) => {
    return Object.values(obj).reduce((acc: number, val: any) => acc + (parseFloat(val) || 0), 0);
  };

  const totalAssets = calculateTotal(assets);
  const totalLiabilities = calculateTotal(liabilities);
  const netWealth = Math.max(0, totalAssets - totalLiabilities);
  const zakatAmount = netWealth * ZAKAT_RATE;

  const resetCalculator = () => {
    setAssets({ gold: '', silver: '', cash: '', bank: '', shares: '', merchandise: '', receivables: '' });
    setLiabilities({ debt: '', bills: '' });
    setActiveTab('assets');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 md:pt-40 pb-32 relative overflow-hidden" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <Head>
        <title>{t('zakat.title')} | JPSD Welfare Trust</title>
      </Head>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-green/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary-blue/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary-green/10 rounded-3xl flex items-center justify-center text-primary-green text-3xl shadow-lg border border-primary-green/10">
              <FiLayers />
            </div>
          </div>
          <h1 className={`text-4xl md:text-6xl font-black text-[#1e293b] mb-4 ${language === 'ur' ? 'urdu-text' : 'English-text tracking-tight'}`}>
            {t('zakat.title')}
          </h1>
          <p className={`text-lg text-[#64748b] max-w-2xl mx-auto leading-relaxed ${language === 'ur' ? 'urdu-text opacity-90' : 'English-text'}`}>
            {t('zakat.subtitle')}
          </p>
        </motion.div>

        {/* Calculator Card */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-white relative z-10">
          {/* Navigation Tabs */}
          <div className="flex bg-slate-50 p-2 gap-2">
             {[
               { id: 'assets', label: t('zakat.assets'), icon: <FiDollarSign /> },
               { id: 'liabilities', label: t('zakat.liabilities'), icon: <FiActivity /> },
               { id: 'results', label: t('zakat.result'), icon: <FiPercent /> },
             ].map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all ${
                   activeTab === tab.id 
                     ? 'bg-white text-primary-green shadow-sm' 
                     : 'text-slate-400 hover:bg-white/50'
                 } ${language === 'ur' ? 'urdu-text text-sm' : 'text-xs uppercase tracking-widest'}`}
               >
                 {tab.icon}
                 <span>{tab.label}</span>
               </button>
             ))}
          </div>

          <div className="p-8 md:p-14">
            <AnimatePresence mode="wait">
              {activeTab === 'assets' && (
                <motion.div
                  key="assets"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
                >
                  <Input 
                    label={t('zakat.gold')} 
                    type="number" 
                    value={assets.gold} 
                    onChange={(e) => setAssets({ ...assets, gold: e.target.value })} 
                    className="!rounded-2xl" 
                    dir="ltr"
                  />
                  <Input 
                    label={t('zakat.silver')} 
                    type="number" 
                    value={assets.silver} 
                    onChange={(e) => setAssets({ ...assets, silver: e.target.value })} 
                    className="!rounded-2xl" 
                    dir="ltr"
                  />
                  <Input 
                    label={t('zakat.cash')} 
                    type="number" 
                    value={assets.cash} 
                    onChange={(e) => setAssets({ ...assets, cash: e.target.value })} 
                    className="!rounded-2xl" 
                    dir="ltr"
                  />
                  <Input 
                    label={t('zakat.bank')} 
                    type="number" 
                    value={assets.bank} 
                    onChange={(e) => setAssets({ ...assets, bank: e.target.value })} 
                    className="!rounded-2xl" 
                    dir="ltr"
                  />
                  <Input 
                    label={t('zakat.shares')} 
                    type="number" 
                    value={assets.shares} 
                    onChange={(e) => setAssets({ ...assets, shares: e.target.value })} 
                    className="!rounded-2xl" 
                    dir="ltr"
                  />
                  <Input 
                    label={t('zakat.merchandise')} 
                    type="number" 
                    value={assets.merchandise} 
                    onChange={(e) => setAssets({ ...assets, merchandise: e.target.value })} 
                    className="!rounded-2xl" 
                    dir="ltr"
                  />
                  <Input 
                    label={t('zakat.receivables')} 
                    type="number" 
                    value={assets.receivables} 
                    onChange={(e) => setAssets({ ...assets, receivables: e.target.value })} 
                    className="!rounded-2xl md:col-span-2" 
                    dir="ltr"
                  />
                </motion.div>
              )}

              {activeTab === 'liabilities' && (
                <motion.div
                  key="liabilities"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                  <Input 
                    label={t('zakat.debt')} 
                    type="number" 
                    value={liabilities.debt} 
                    onChange={(e) => setLiabilities({ ...liabilities, debt: e.target.value })} 
                    className="!rounded-2xl" 
                    dir="ltr"
                  />
                  <Input 
                    label={t('zakat.bills')} 
                    type="number" 
                    value={liabilities.bills} 
                    onChange={(e) => setLiabilities({ ...liabilities, bills: e.target.value })} 
                    className="!rounded-2xl" 
                    dir="ltr"
                  />
                </motion.div>
              )}

              {activeTab === 'results' && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                     <SummaryItem label={t('zakat.assets')} value={totalAssets} color="blue" />
                     <SummaryItem label={t('zakat.liabilities')} value={totalLiabilities} color="red" />
                     <SummaryItem label={t('zakat.netWealth')} value={netWealth} color="green" />
                  </div>

                  <div className={`p-10 rounded-[2.5rem] text-center shadow-xl ${zakatAmount > 0 ? 'bg-gradient-to-r from-primary-green to-primary-blue text-white' : 'bg-slate-50 text-slate-400'}`}>
                    <FiShield className="mx-auto mb-4 text-3xl opacity-50" />
                    <h3 className={`text-xl mb-2 ${language === 'ur' ? 'urdu-text' : 'font-bold uppercase tracking-widest'}`}>
                      {t('zakat.obligation')}
                    </h3>
                    <p className={`text-5xl font-black English-text ${zakatAmount > 0 ? 'text-white' : 'text-slate-200'}`}>
                      Rs. {Math.round(zakatAmount).toLocaleString()}
                    </p>
                    <p className={`mt-4 opacity-70 text-sm ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {zakatAmount > 0 ? '(Fixed at 2.5% of net wealth)' : t('zakat.nisabNotice')}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6">
                    <Button
                      variant="gold"
                      size="lg"
                      className={`!px-12 !py-5 !rounded-3xl shadow-xl shadow-orange-500/20 ${language === 'ur' ? 'urdu-text text-lg' : ''}`}
                      onClick={() => router.push(`/donation?amount=${Math.round(zakatAmount)}&type=zakat`)}
                    >
                      {t('zakat.donateNow')}
                    </Button>
                    <button 
                      onClick={resetCalculator}
                      className={`flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors font-bold ${language === 'ur' ? 'urdu-text' : 'text-xs uppercase tracking-widest'}`}
                    >
                      <FiTrash2 /> {t('common.reset')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
              <div className="flex gap-2">
                <div className={`w-2 h-2 rounded-full ${activeTab === 'assets' ? 'bg-primary-green' : 'bg-slate-200'}`} />
                <div className={`w-2 h-2 rounded-full ${activeTab === 'liabilities' ? 'bg-primary-green' : 'bg-slate-200'}`} />
                <div className={`w-2 h-2 rounded-full ${activeTab === 'results' ? 'bg-primary-green' : 'bg-slate-200'}`} />
              </div>

              <div className="flex gap-4">
                {activeTab !== 'assets' && (
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab(activeTab === 'results' ? 'liabilities' : 'assets')}
                    className={`!rounded-2xl !px-8 ${language === 'ur' ? 'urdu-text' : ''}`}
                  >
                    {t('common.goBack')}
                  </Button>
                )}
                {activeTab !== 'results' && (
                  <Button
                    variant="primary"
                    onClick={() => setActiveTab(activeTab === 'assets' ? 'liabilities' : 'results')}
                    className={`!rounded-2xl !px-10 shadow-lg shadow-green-600/10 ${language === 'ur' ? 'urdu-text' : ''}`}
                  >
                    {t('common.nextStep')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Guidance section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
           <GuidanceCard 
             title={t('zakat.guidance.nisab.title')} 
             desc={t('zakat.guidance.nisab.desc')}
           />
           <GuidanceCard 
             title={t('zakat.guidance.rate.title')} 
             desc={t('zakat.guidance.rate.desc')}
           />
           <GuidanceCard 
             title={t('zakat.guidance.when.title')} 
             desc={t('zakat.guidance.when.desc')}
           />
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, color }: { label: string, value: number, color: string }) {
  const { language } = useLanguage();
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    red: 'bg-red-50 text-red-500 border-red-100',
    green: 'bg-green-50 text-emerald-600 border-emerald-100',
  };

  return (
    <div className={`p-8 rounded-[2rem] border text-center ${colors[color]}`}>
      <p className={`text-[10px] font-black uppercase tracking-widest opacity-60 mb-2 ${language === 'ur' ? 'urdu-text text-xs' : ''}`}>{label}</p>
      <p className="text-2xl font-black English-text">Rs. {Math.round(value).toLocaleString()}</p>
    </div>
  );
}

function GuidanceCard({ title, desc }: { title: string, desc: string }) {
  const { language } = useLanguage();
  return (
    <div className={`p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white flex flex-col gap-4 text-center ${language === 'ur' ? 'text-right' : ''}`}>
       <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#1ea05f] shadow-sm mx-auto">
          <FiInfo />
       </div>
       <h4 className={`text-lg font-black text-slate-800 ${language === 'ur' ? 'urdu-text' : ''}`}>{title}</h4>
       <p className={`text-sm text-slate-500 leading-relaxed ${language === 'ur' ? 'urdu-text !text-[13px] opacity-80' : ''}`}>{desc}</p>
    </div>
  );
}

