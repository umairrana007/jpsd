'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { getPrograms } from '@/lib/firebaseUtils';
import { Program as ProgramType, CauseCategory } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample programs data (will be replaced with Firebase data)
const samplePrograms: ProgramType[] = [
  {
    id: '1',
    title: 'STEM Library',
    titleUrdu: 'سٹیم لائبریری',
    description: 'The STEM Library offers children hands-on access to science, technology, engineering, and math resources.',
    descriptionUrdu: 'سٹیم لائبریری بچوں کو سائنس، ٹیکنالوجی، انجینئرنگ اور ریاضی کے وسائل تک عملی رسد فراہم کرتی ہے۔',
    image: '/images/jpsd_education.jpg',
    category: CauseCategory.EDUCATION,
    goalAmount: 5000000,
    raisedAmount: 127694,
    percentage: 2.55,
    active: true,
    featured: true,
  },
  {
    id: '2',
    title: 'Free Ambulance Service',
    titleUrdu: 'مفت ایمبولینس سروس',
    description: 'Emergency medical transportation service for those who cannot afford it.',
    descriptionUrdu: 'ان لوگوں کے لیے ہنگامی طبی نقل و حمل کی سہولت جو اسے برداشت نہیں کر سکتے۔',
    image: '/images/jpsd_ambulance.jpg',
    category: CauseCategory.HEALTH,
    goalAmount: 3000000,
    raisedAmount: 1850000,
    percentage: 61.67,
    active: true,
    featured: true,
  },
  {
    id: '3',
    title: 'Clean Water Initiative',
    titleUrdu: 'صاف پانی کا منصوبہ',
    description: 'Providing clean drinking water to communities in need through wells and filtration plants.',
    descriptionUrdu: 'کنوؤں اور فلٹریشن پلانٹس کے ذریعے ضرورت مند برادریوں کو صاف پینے کا پانی فراہم کرنا۔',
    image: '/images/jpsd_main.jpg',
    category: CauseCategory.WATER,
    goalAmount: 2000000,
    raisedAmount: 1950000,
    percentage: 97.5,
    active: true,
    featured: false,
  },
  {
    id: '4',
    title: 'Food Distribution (Dastarkhwan)',
    titleUrdu: 'خوراک کی تقسیم (دسترخوان)',
    description: 'Daily food distribution to homeless and underprivileged families.',
    descriptionUrdu: 'بے گھر اور کم آمدنی والے خاندانوں میں روزانہ کھانے کی تقسیم۔',
    image: '/images/jpsd_food.jpg',
    category: CauseCategory.FOOD,
    goalAmount: 4000000,
    raisedAmount: 3200000,
    percentage: 80,
    active: true,
    featured: true,
  },
];

export const ProgramsSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [programs, setPrograms] = useState<ProgramType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const fetchedPrograms = await getPrograms();
        if (fetchedPrograms && fetchedPrograms.length > 0) {
          setPrograms(fetchedPrograms as ProgramType[]);
        } else {
          // Use sample data if Firebase is not configured
          setPrograms(samplePrograms);
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
        // Fallback to sample data
        setPrograms(samplePrograms);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = filter === 'all' 
    ? programs 
    : programs.filter(p => p.category === filter);

  const categories = ['all', 'education', 'health', 'food', 'water'];

  return (
    <section className="py-32 bg-[#f8fafc] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#27ae60 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl space-y-6"
            dir={language === 'ur' ? 'rtl' : 'ltr'}
          >
            <span className={`text-primary-blue font-bold inline-block bg-primary-blue/5 px-4 py-2 rounded-lg ${language === 'ur' ? 'urdu-text text-lg' : 'tracking-[0.3em] uppercase text-xs'}`}>
              {t('programs.badge')}
            </span>
            <h2 className={`text-4xl md:text-5xl font-black text-[#1e293b] leading-tight tracking-tight ${language === 'ur' ? 'urdu-text !leading-[2.0] py-4' : 'english-text'}`}>
              {t('programs.title')}
            </h2>
            <p className={`text-gray-500 text-xl font-light ${language === 'ur' ? 'urdu-text' : 'english-text'}`}>
              {t('programs.subtitle')}
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-500 ${
                  filter === cat
                    ? 'gradient-primary text-white shadow-[0_15px_30px_-5px_rgba(39,174,96,0.4)] scale-105'
                    : 'bg-white text-[#64748b] hover:bg-gray-50 border border-gray-100 hover:border-primary-green/30'
                } ${language === 'ur' ? 'urdu-text text-sm' : 'text-xs uppercase tracking-widest'}`}
              >
                {language === 'ur' ? (t(`category.${cat}`) || cat) : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))
          ) : (
            filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  image={program.image}
                  title={program.title}
                  titleUrdu={language === 'ur' ? program.titleUrdu : undefined}
                  description={program.description}
                  descriptionUrdu={language === 'ur' ? program.descriptionUrdu : undefined}
                >
                  <div className="mb-4">
                    <ProgressBar
                      percentage={program.percentage}
                      goalAmount={program.goalAmount}
                      raisedAmount={program.raisedAmount}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/donation?program=${program.id}`} className="flex-1">
                      <Button
                        variant="gold"
                        size="sm"
                        className={`w-full ${language === 'ur' ? 'urdu-text' : ''}`}
                      >
                        {t('programs.donate')}
                      </Button>
                    </Link>
                    <Link href={`/causes/${program.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`w-full ${language === 'ur' ? 'urdu-text' : ''}`}
                      >
                        {t('programs.details')}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* View All Button */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/causes">
              <button className={`bg-[#1ea05f] text-white px-10 py-5 rounded-[2rem] font-black hover:shadow-2xl transition-all duration-500 transform hover:scale-105 shadow-xl shadow-[#1ea05f]/20 relative z-10 ${language === 'ur' ? 'urdu-text text-lg tracking-normal' : 'text-xs uppercase tracking-[0.3em]'}`}>
                {t('programs.viewAll')} {language === 'ur' ? '⬅️' : '➔'}
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
