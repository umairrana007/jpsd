import React, { useState } from 'react';
import { FiGlobe, FiZap, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { RichTextEditor } from './RichTextEditor';
import { suggestTranslation } from '@/lib/translationService';

interface Props {
  label: string;
  name: string;
  valueEn: string;
  valueUr?: string;
  onChangeEn: (val: string) => void;
  onChangeUr: (val: string) => void;
  isTextArea?: boolean;
  placeholderEn?: string;
  placeholderUr?: string;
  error?: string;
  translationSource?: 'manual' | 'auto' | 'reviewed';
}

export const BilingualInput: React.FC<Props> = ({
  label,
  name,
  valueEn,
  valueUr = '',
  onChangeEn,
  onChangeUr,
  isTextArea = false,
  placeholderEn = '',
  placeholderUr = '',
  error,
  translationSource = 'manual'
}) => {
  const [showUrdu, setShowUrdu] = useState(!!valueUr);
  const [translating, setTranslating] = useState(false);

  const handleAutoTranslate = async () => {
    if (!valueEn) return;
    setTranslating(true);
    try {
      const translated = await suggestTranslation(valueEn, 'ur');
      onChangeUr(translated);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center group">
        <div className="flex items-center gap-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
          {showUrdu && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100">
               {translationSource === 'reviewed' ? (
                 <><FiCheckCircle className="text-[#1ea05f] text-[10px]" /> <span className="text-[8px] font-black uppercase text-[#1ea05f]">Verified Code</span></>
               ) : translationSource === 'auto' ? (
                 <><FiAlertCircle className="text-amber-500 text-[10px]" /> <span className="text-[8px] font-black uppercase text-amber-500">Auto Pattern</span></>
               ) : (
                 <><FiGlobe className="text-blue-500 text-[10px]" /> <span className="text-[8px] font-black uppercase text-blue-500">Manual Sync</span></>
               )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {showUrdu && (
            <button 
              type="button"
              onClick={handleAutoTranslate}
              disabled={translating || !valueEn}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#1ea05f] hover:opacity-80 disabled:opacity-30 transition-all"
            >
              <FiZap /> {translating ? 'Processing...' : '✨ Signal Sync'}
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowUrdu(!showUrdu)}
            className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline ${showUrdu ? 'text-red-500' : 'text-slate-400'}`}
          >
            <FiGlobe /> {showUrdu ? 'Deactivate Urdu' : 'Add Translation Matrix'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* English Input */}
        <div className="relative">
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500/20 rounded-full" />
          {isTextArea ? (
            <div className={error ? 'border border-red-500 rounded-lg p-1' : ''}>
              <RichTextEditor
                value={valueEn}
                onChange={onChangeEn}
                placeholder={placeholderEn}
                name={`${name}_en`}
              />
            </div>
          ) : (
            <input
              type="text"
              value={valueEn}
              onChange={(e) => onChangeEn(e.target.value)}
              placeholder={placeholderEn}
              className={`w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-blue-500/20 transition-all outline-none ${error ? 'border-red-500' : ''}`}
            />
          )}
        </div>

        {/* Urdu Input */}
        {showUrdu && (
          <div className="animate-in fade-in slide-in-from-top-2 relative">
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#1ea05f]/20 rounded-full" />
            {isTextArea ? (
              <div dir="rtl" className={`urdu-font text-right ${error ? 'border border-red-500 rounded-lg p-1' : ''}`}>
                <RichTextEditor
                  value={valueUr}
                  onChange={onChangeUr}
                  placeholder={placeholderUr}
                  name={`${name}_ur`}
                />
              </div>
            ) : (
              <input
                dir="rtl"
                type="text"
                value={valueUr}
                onChange={(e) => onChangeUr(e.target.value)}
                placeholder={placeholderUr}
                className="w-full px-6 py-4 bg-slate-50 border-[#1ea05f]/20 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none urdu-font text-right border"
              />
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs font-bold px-2">{error}</p>}
    </div>
  );
};
