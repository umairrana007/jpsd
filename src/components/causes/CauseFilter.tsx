// Cause Filter Component
'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CauseCategory, UrgencyLevel } from '@/types';

interface CauseFilterProps {
  selectedCategory: CauseCategory | 'all';
  selectedUrgency: UrgencyLevel | 'all';
  selectedLocation: string | 'all';
  onCategoryChange: (category: CauseCategory | 'all') => void;
  onUrgencyChange: (urgency: UrgencyLevel | 'all') => void;
  onLocationChange: (location: string | 'all') => void;
  locations?: string[];
}

export const CauseFilter: React.FC<CauseFilterProps> = ({
  selectedCategory,
  selectedUrgency,
  selectedLocation,
  onCategoryChange,
  onUrgencyChange,
  onLocationChange,
  locations = [],
}) => {
  const { t, language } = useLanguage();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: CauseCategory.EDUCATION, label: 'Education' },
    { value: CauseCategory.HEALTH, label: 'Health' },
    { value: CauseCategory.FOOD, label: 'Food' },
    { value: CauseCategory.WATER, label: 'Water' },
    { value: CauseCategory.EMERGENCY, label: 'Emergency' },
    { value: CauseCategory.OTHER, label: 'Other' },
  ];

  const urgencies = [
    { value: 'all', label: 'All Urgency Levels' },
    { value: UrgencyLevel.CRITICAL, label: 'Critical' },
    { value: UrgencyLevel.HIGH, label: 'High' },
    { value: UrgencyLevel.MEDIUM, label: 'Medium' },
    { value: UrgencyLevel.LOW, label: 'Low' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8" dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <h3 className={`text-lg font-bold text-[#2c3e50] mb-4 ${language === 'ur' ? 'urdu-text' : ''}`}>
        {language === 'ur' ? 'مقاصد کو فلٹر کریں' : 'Filter Causes'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
            {language === 'ur' ? 'زمرہ' : 'Category'}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as CauseCategory | 'all')}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-transparent ${language === 'ur' ? 'urdu-text' : ''}`}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {language === 'ur' ? (
                  cat.value === 'all' ? 'تمام زمرہ جات' : (t(`category.${cat.value.toLowerCase()}`) || cat.label)
                ) : cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Urgency Filter */}
        <div>
          <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
            {language === 'ur' ? 'شدت کی سطح' : 'Urgency Level'}
          </label>
          <select
            value={selectedUrgency}
            onChange={(e) => onUrgencyChange(e.target.value as UrgencyLevel | 'all')}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-transparent ${language === 'ur' ? 'urdu-text' : ''}`}
          >
            {urgencies.map((urg) => (
              <option key={urg.value} value={urg.value}>
                {language === 'ur' ? (
                  urg.value === 'all' ? 'تمام شدت کی سطحیں' : (t(`urgency.${urg.value.toLowerCase()}`) || urg.label)
                ) : urg.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className={`block text-sm font-medium text-gray-700 mb-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
            {language === 'ur' ? 'مقام' : 'Location'}
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value as string | 'all')}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#27ae60] focus:border-transparent ${language === 'ur' ? 'urdu-text' : ''}`}
          >
            <option value="all">{language === 'ur' ? 'تمام مقامات' : 'All Locations'}</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
