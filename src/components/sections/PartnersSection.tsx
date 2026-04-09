'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Firestore } from 'firebase/firestore';
import { Partner } from '@/types';

export const PartnersSection: React.FC = () => {
  const { language } = useLanguage();
  const [partners, setPartners] = React.useState<Partner[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPartners() {
      if (!db) return;
      try {
        setLoading(true);
        const q = query(
          collection(db as Firestore, 'partners'), 
          where('isPublished', '==', true),
          orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Partner[];
        setPartners(fetched);
      } catch (error) {
        console.error('Partners Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-10 text-gray-400 font-medium">
            {language === 'ur' ? 'کوئی شراکت دار نہیں ملا' : 'No partners found'}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all"
              >
                {partner.logo ? (
                  <div className="text-6xl">{partner.logo}</div>
                ) : partner.image ? (
                   <div className="relative w-full h-16">
                      <Image 
                        src={partner.image} 
                        alt={partner.name} 
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100px, 150px"
                        className="object-contain grayscale hover:grayscale-0 transition-all duration-300" 
                      />
                   </div>
                ) : (
                  <div className="text-xl font-bold text-gray-400">{partner.name}</div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
