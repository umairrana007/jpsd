// Cause Sort Component
'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export type SortOption = 'newest' | 'most-funded' | 'ending-soon' | 'highest-percentage';

interface CauseSortProps {
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const CauseSort: React.FC<CauseSortProps> = ({
  sortBy,
  onSortChange,
}) => {
  const { t, language } = useLanguage();

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'most-funded', label: 'Most Funded' },
    { value: 'ending-soon', label: 'Ending Soon' },
    { value: 'highest-percentage', label: 'Highest Percentage' },
  ];

  return (
    <div className={`flex items-center gap-4 mb-8 ${language === 'ur' ? 'flex-row-reverse' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <label className={`text-sm font-medium text-gray-700 ${language === 'ur' ? 'urdu-text' : ''}`}>
        {language === 'ur' ? 'ترتیب دیں:' : 'Sort by:'}
      </label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className={`px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-transparent bg-white ${language === 'ur' ? 'urdu-text text-sm' : ''}`}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {language === 'ur' ? (t(`sort.${option.value.replace('-', '_')}`) || option.label) : option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
