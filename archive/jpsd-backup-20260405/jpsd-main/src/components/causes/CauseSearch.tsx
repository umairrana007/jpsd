// Cause Search Component
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CauseSearchProps {
  onSearch: (query: string) => void;
}

export const CauseSearch: React.FC<CauseSearchProps> = ({ onSearch }) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative mb-8" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={language === 'ur' ? 'مقاصد تلاش کریں (عنوان یا تفصیل)...' : 'Search causes by title or description...'}
        className={`w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#27ae60] focus:border-transparent transition-all ${language === 'ur' ? 'urdu-text pr-14 pl-12' : 'pl-14 pr-12'}`}
      />
      <svg
        className={`absolute ${language === 'ur' ? 'right-5' : 'left-5'} top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className={`absolute ${language === 'ur' ? 'left-5' : 'right-5'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
