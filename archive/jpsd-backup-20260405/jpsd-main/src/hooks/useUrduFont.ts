// Custom hook for Urdu language and font handling
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export const useUrduFont = () => {
  const { language, setLanguage } = useLanguage();

  const isUrdu = language === 'ur';

  const toggleUrdu = () => {
    setLanguage(isUrdu ? 'en' : 'ur');
  };

  return {
    isUrdu,
    language,
    setLanguage,
    toggleUrdu,
    // Font class for conditional styling
    fontClass: isUrdu ? 'font-urdu' : 'font-default',
  };
};
