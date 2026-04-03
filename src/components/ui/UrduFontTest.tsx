// Urdu Font Test Component - For testing and demonstration
'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './Button';

export const UrduFontTest: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="p-8 bg-gray-50 rounded-xl my-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Urdu Font Test Panel</h2>
        <p className="text-gray-600 mb-4">
          Current Language: <strong>{language === 'ur' ? 'Urdu (RTL)' : 'English (LTR)'}</strong>
        </p>
        
        <div className="flex gap-4 mb-6">
          <Button
            variant={language === 'en' ? 'primary' : 'outline'}
            onClick={() => setLanguage('en')}
          >
            Switch to English
          </Button>
          <Button
            variant={language === 'ur' ? 'primary' : 'outline'}
            onClick={() => setLanguage('ur')}
          >
            Switch to اردو
          </Button>
        </div>
      </div>

      {/* Font Display Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-4">HEADING SIZES TEST</h3>
        
        <h1 className="mb-2">Heading 1 - H1 عنوان کا ٹیسٹ</h1>
        <h2 className="mb-2">Heading 2 - H2 عنوان کا ٹیسٹ</h2>
        <h3 className="mb-2">Heading 3 - H3 عنوان کا ٹیسٹ</h3>
        <h4 className="mb-2">Heading 4 - H4 عنوان کا ٹیسٹ</h4>
        <h5 className="mb-2">Heading 5 - H5 عنوان کا ٹیسٹ</h5>
        <h6 className="mb-2">Heading 6 - H6 عنوان کا ٹیسٹ</h6>
      </div>

      {/* Body Text Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-4">BODY TEXT TEST</h3>
        
        <p className="mb-4">
          This is a paragraph in English. When you switch to Urdu, this text will change 
          direction and font to Noto Nastaliq Urdu. The line height is optimized for better 
          readability.
        </p>
        
        <p className="mb-4">
          یہ اردو میں ایک پیراگراف ہے۔ جب آپ اردو میں تبدیل کرتے ہیں، تو یہ ٹیکسٹ دائیں سے بائیں 
          طرف ہو جائے گا اور فونٹ نستعلیق میں تبدیل ہو جائے گا۔ لائن کی اونچائی بہتر پڑھنے کے لیے 
          موزوں کی گئی ہے۔
        </p>
      </div>

      {/* Form Elements Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-4">FORM ELEMENTS TEST</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {language === 'ur' ? 'نام' : 'Name'}
            </label>
            <input
              type="text"
              placeholder={language === 'ur' ? 'اپنا نام درج کریں' : 'Enter your name'}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {language === 'ur' ? 'ای میل' : 'Email'}
            </label>
            <input
              type="email"
              placeholder={language === 'ur' ? 'اپنا ای میل درج کریں' : 'Enter your email'}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              {language === 'ur' ? 'پیغام' : 'Message'}
            </label>
            <textarea
              rows={3}
              placeholder={language === 'ur' ? 'اپنا پیغام یہاں لکھیں' : 'Write your message here'}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-sm font-semibold text-gray-500 mb-4">BUTTONS TEST</h3>
        
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">
            {language === 'ur' ? 'بنیٹی بٹن' : 'Primary Button'}
          </Button>
          <Button variant="gold">
            {language === 'ur' ? 'سنہری بٹن' : 'Gold Button'}
          </Button>
          <Button variant="outline">
            {language === 'ur' ? 'آؤٹ لائن بٹن' : 'Outline Button'}
          </Button>
        </div>
      </div>

      {/* Technical Info */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-sm font-semibold text-blue-700 mb-4">TECHNICAL INFORMATION</h3>
        
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Font Family:</strong> Noto Nastaliq Urdu</p>
          <p><strong>Direction:</strong> {language === 'ur' ? 'RTL (Right-to-Left)' : 'LTR (Left-to-Right)'}</p>
          <p><strong>Line Height:</strong> {language === 'ur' ? '2.2 (body), 2.0 (headings)' : 'Normal'}</p>
          <p><strong>Source:</strong> Google Fonts CDN</p>
          <p><strong>Status:</strong> {document.fonts.check('اردو', 'Noto Nastaliq Urdu') ? '✅ Loaded' : '⏳ Loading...'}</p>
        </div>
      </div>
    </div>
  );
};
