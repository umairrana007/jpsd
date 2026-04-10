import React, { useState } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { RichTextEditor } from './RichTextEditor';

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
  error
}) => {
  const [showUrdu, setShowUrdu] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrdu(!showUrdu)}
          className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline ${showUrdu ? 'text-[#1ea05f]' : 'text-slate-400'}`}
        >
          <FiGlobe /> {showUrdu ? 'Hide Urdu' : 'Add Urdu Translation'}
        </button>
      </div>

      <div className="space-y-3">
        {/* English Input */}
        <div>
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
              className={`w-full px-6 py-4 bg-slate-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-[#1ea05f]/5 focus:bg-white focus:border-[#1ea05f]/20 transition-all outline-none ${error ? 'border-red-500' : ''}`}
            />
          )}
        </div>

        {/* Urdu Input */}
        {showUrdu && (
          <div className="animate-in fade-in slide-in-from-top-2">
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
      {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
    </div>
  );
};
