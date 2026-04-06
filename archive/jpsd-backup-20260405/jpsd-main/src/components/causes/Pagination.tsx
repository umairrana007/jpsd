// Pagination Component
'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { language } = useLanguage();
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center items-center gap-4 mt-12 ${language === 'ur' ? 'flex-row-reverse' : ''}`} dir={language === 'ur' ? 'rtl' : 'ltr'}>
      <Button
        variant="outline"
        size="md"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={language === 'ur' ? 'urdu-text' : ''}
      >
        {language === 'ur' ? 'پچھلا' : 'Previous'}
      </Button>

      <div className={`flex items-center gap-2 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400 font-bold">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page as number)}
              className={`min-w-[48px] h-12 rounded-2xl font-black transition-all duration-300 English-text ${
                currentPage === page
                  ? 'bg-[#1ea05f] text-white shadow-lg shadow-[#1ea05f]/20 scale-110'
                  : 'bg-white text-slate-400 hover:text-[#1ea05f] hover:bg-slate-50 border border-slate-100 shadow-sm'
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="md"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={language === 'ur' ? 'urdu-text' : ''}
      >
        {language === 'ur' ? 'اگلا' : 'Next'}
      </Button>
    </div>
  );
};
