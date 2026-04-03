'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCauses } from '@/lib/firebaseUtils';
import { Cause, CauseCategory, UrgencyLevel } from '@/types';
import { CauseCard } from '@/components/causes/CauseCard';
import { CauseFilter } from '@/components/causes/CauseFilter';
import { CauseSearch } from '@/components/causes/CauseSearch';
import { CauseSort, SortOption } from '@/components/causes/CauseSort';
import { Pagination } from '@/components/causes/Pagination';
import { CardSkeleton } from '@/components/ui/Skeleton';

const ITEMS_PER_PAGE = 9;

export default function CausesPage() {
  const { t, language } = useLanguage();
  const [causes, setCauses] = useState<Cause[]>([]);
  const [filteredCauses, setFilteredCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<CauseCategory | 'all'>('all');
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevel | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    loadCauses();
  }, []);

  const loadCauses = async () => {
    try {
      setLoading(true);
      const data = await getCauses();
      setCauses(data);
      setFilteredCauses(data);
      
      const uniqueLocations = Array.from(new Set(data.map(c => c.location)));
      setLocations(uniqueLocations);
    } catch (error) {
      console.error('Error loading causes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...causes];

    if (selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory);
    }

    if (selectedUrgency !== 'all') {
      result = result.filter(c => c.urgency === selectedUrgency);
    }

    if (selectedLocation !== 'all') {
      result = result.filter(c => c.location === selectedLocation);
    }

    if (searchQuery) {
      result = result.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'most-funded':
          return b.raisedAmount - a.raisedAmount;
        case 'ending-soon':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'highest-percentage':
          return b.percentage - a.percentage;
        default:
          return 0;
      }
    });

    setFilteredCauses(result);
    setCurrentPage(1);
  }, [selectedCategory, selectedUrgency, selectedLocation, searchQuery, sortBy, causes]);

  const totalPages = Math.ceil(filteredCauses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCauses = filteredCauses.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#fcfdfe] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-24 space-y-6 ${language === 'ur' ? 'urdu-text' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-[#1ea05f] font-black tracking-[0.4em] uppercase text-xs ${language === 'ur' ? 'tracking-normal text-lg' : ''}`}
          >
            {t('causes.missionBadge')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-6xl md:text-8xl font-black text-[#0f172a] leading-[1.1] tracking-tight ${language === 'ur' ? 'text-5xl md:text-7xl' : ''}`}
          >
            {language === 'ur' ? (
              <span className="urdu-text">{t('causes.title')}</span>
            ) : (
              <>{t('causes.title').split(' ')[0]} <span className="text-[#1ea05f]">{t('causes.title').split(' ')[1]}</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-xl text-slate-500 font-medium max-w-2xl mx-auto opacity-70 ${language === 'ur' ? 'urdu-text text-lg' : ''}`}
          >
            {t('causes.subtitle')}
          </motion.p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 mb-16 shadow-2xl shadow-slate-200/40 border border-slate-50 space-y-10">
          <CauseSearch onSearch={setSearchQuery} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-end border-t border-slate-50 pt-10">
            <div className="lg:col-span-2">
              <CauseFilter
                selectedCategory={selectedCategory}
                selectedUrgency={selectedUrgency}
                selectedLocation={selectedLocation}
                onCategoryChange={setSelectedCategory}
                onUrgencyChange={setSelectedUrgency}
                onLocationChange={setSelectedLocation}
                locations={locations}
              />
            </div>
            <CauseSort sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Results Metadata */}
        <div className={`flex justify-between items-center mb-10 px-4 ${language === 'ur' ? 'flex-row-reverse urdu-text' : ''}`}>
          <div className={`flex items-center space-x-3 text-slate-400 font-bold uppercase text-[11px] tracking-widest ${language === 'ur' ? 'space-x-reverse tracking-normal text-xs' : ''}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#1ea05f]" />
            <span>
              {language === 'ur' 
                ? (
                  <>نمایاں ہو رہے ہیں <span className="English-text px-1 uppercase">{currentCauses.length}</span> میں سے <span className="English-text px-1 uppercase">{filteredCauses.length}</span> فلاحی پروگرام</>
                )
                : `Showing ${currentCauses.length} of ${filteredCauses.length} Impact Programs`}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {currentCauses.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[4rem] shadow-sm border border-slate-50">
                  <div className="w-24 h-24 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className={`text-2xl font-black text-[#0f172a] opacity-80 ${language === 'ur' ? 'urdu-text' : ''}`}>
                    {t('causes.noCampaignsFound')}
                  </p>
                  <p className={`text-slate-400 font-medium mt-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
                    {t('causes.tryAdjustingFilters')}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {currentCauses.map((cause) => (
                    <CauseCard key={cause.id} cause={cause} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-20">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
