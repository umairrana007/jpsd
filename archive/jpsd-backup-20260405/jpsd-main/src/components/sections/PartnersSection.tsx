'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const PartnersSection: React.FC = () => {
  const { language } = useLanguage();

  const partners = [
    { name: 'Partner 1', logo: '🏢' },
    { name: 'Partner 2', logo: '🏛️' },
    { name: 'Partner 3', logo: '🏗️' },
    { name: 'Partner 4', logo: '🏭' },
    { name: 'Partner 5', logo: '🏬' },
    { name: 'Partner 6', logo: '🏪' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold text-[#2c3e50] mb-4 ${language === 'ur' ? 'urdu-text' : ''}`}>
            {language === 'ur' ? 'ہمارے شراکت دار' : 'Our Partners'}
          </h2>
          <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${language === 'ur' ? 'urdu-text' : ''}`}>
            {language === 'ur' 
              ? 'ان اداروں کے ساتھ تعاون جو ہمارے وژن کا اشتراک کرتے ہیں' 
              : 'Collaborating with organizations that share our vision'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="text-6xl">{partner.logo}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
