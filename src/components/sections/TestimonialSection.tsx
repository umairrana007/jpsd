'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

export const TestimonialSection: React.FC = () => {
  const { language } = useLanguage();
  const [testimonials, setTestimonials] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchTestimonials() {
      if (!db) return;
      try {
        setLoading(true);
        const q = query(
          collection(db as any, 'testimonials'), 
          where('isPublished', '==', true),
          orderBy('createdAt', 'desc'),
          limit(4)
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTestimonials(fetched);
      } catch (error) {
        console.error('Testimonial Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1ea05f]/5 rounded-full blur-[100px] -mr-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-[100px] -ml-48" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-24 space-y-6"
           dir={language === 'ur' ? 'rtl' : 'ltr'}
        >
          <span className={`text-[#1ea05f] font-black uppercase inline-block ${language === 'ur' ? 'urdu-text text-lg' : 'tracking-[0.3em] text-xs'}`}>
            {language === 'ur' ? 'کمیونٹی کی آوازیں' : 'Community Voices'}
          </span>
          <h2 className={`text-5xl md:text-7xl font-black text-[#0f172a] leading-tight tracking-tight ${language === 'ur' ? 'urdu-text' : 'english-text'}`}>
            {language === 'ur' ? (
              <>کامیابی کی کہانیاں اور <span className="text-[#1ea05f]">اعتماد</span></>
            ) : (
              <>Success Stories & <span className="text-[#1ea05f]">Trust</span></>
            )}
          </h2>
          <p className={`text-xl text-slate-500 font-medium max-w-2xl mx-auto opacity-70 ${language === 'ur' ? 'urdu-text' : 'english-text'}`}>
            {language === 'ur' 
              ? 'ہمارے ڈونرز، رضاکاروں اور ان لوگوں کی کہانیاں سنیں جن کی ہم نے مل کر مدد کی ہے۔'
              : "Hear from our global community of donors, volunteers, and the lives we've touched together."}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-[3rem] p-10 border border-slate-100 h-80 animate-pulse bg-slate-50"></div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium">
            {language === 'ur' ? 'کوئی تاثرات نہیں مل سکے' : 'No testimonials found'}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#1ea05f]/10 hover:-translate-y-2 transition-all duration-500"
              >
                {/* Rating Stars */}
                <div className="flex mb-8 space-x-1" dir="ltr">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-orange-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className={`text-slate-600 font-medium italic mb-10 leading-relaxed opacity-90 min-h-[120px] ${language === 'ur' ? 'urdu-text text-base' : 'text-lg'}`}>
                  "{language === 'ur' && testimonial.textUrdu ? testimonial.textUrdu : testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center pt-6 border-t border-slate-50 mt-auto">
                  <div className={`relative w-14 h-14 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 ${language === 'ur' ? 'ml-5' : 'mr-5'}`}>
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={language === 'ur' ? (testimonial.nameUrdu || testimonial.name) : testimonial.name}
                        fill
                        loading="lazy"
                        sizes="56px"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[#1ea05f] font-black uppercase text-xs">
                        {(testimonial.name || '?').substring(0, 2)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className={`font-extrabold text-[#0f172a] text-lg truncate ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {language === 'ur' ? (testimonial.nameUrdu || testimonial.name) : testimonial.name}
                    </h4>
                    <p className="text-[10px] font-bold text-[#1ea05f] uppercase tracking-widest mt-1 opacity-70 truncate">
                      {language === 'ur' ? (testimonial.roleUrdu || testimonial.role) : testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mt-24"
         >
           <Link href="/contact-us">
             <button className={`inline-flex items-center space-x-3 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-[#1ea05f] transition-all duration-500 shadow-2xl shadow-slate-900/20 hover:shadow-[#1ea05f]/30 ${language === 'ur' ? 'flex-row-reverse space-x-reverse' : ''}`}>
               <span className={language === 'ur' ? 'urdu-text' : ''}>{language === 'ur' ? 'اپنی کہانی شیئر کریں' : 'Share Your Journey'}</span>
               <svg className={`w-5 h-5 ${language === 'ur' ? 'ml-3 rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
             </button>
           </Link>
         </motion.div>
      </div>
    </section>
  );
};
