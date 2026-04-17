'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useLanguage } from '@/contexts/LanguageContext';
import { subscribeToNewsletter } from '@/lib/firebaseUtils';

interface NewsletterSectionProps {
  titleEn?: string;
  titleUr?: string;
  subtitleEn?: string;
  subtitleUr?: string;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  titleEn,
  titleUr,
  subtitleEn,
  subtitleUr
}) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    await subscribeToNewsletter(email);
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  // Use CMS titles if available, fallback to hardcoded
  const sectionTitle = language === 'ur'
    ? (titleUr || 'ہماری سرگرمیوں سے باخبر رہیں')
    : (titleEn || 'Stay Updated with Our Work');
  const sectionSubtitle = language === 'ur'
    ? (subtitleUr || 'تازہ ترین اپڈیٹس اور اثرات کی رپورٹس کے لیے ہمارے نیوز لیٹر کو سبسکرائب کریں')
    : (subtitleEn || 'Subscribe to our newsletter for the latest updates, success stories, and impact reports');

  return (
    <section className="py-20 bg-gradient-to-br from-primary-green/10 to-primary-blue/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className={`text-4xl font-bold text-[#2c3e50] mb-4 ${language === 'ur' ? 'urdu-text' : ''}`}>
            {sectionTitle}
          </h2>
          <p className={`text-xl text-gray-600 mb-8 ${language === 'ur' ? 'urdu-text' : ''}`}>
            {sectionSubtitle}
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-100 border border-green-500 text-green-700 px-6 py-4 rounded-xl"
            >
              <p className={`font-semibold ${language === 'ur' ? 'urdu-text' : ''}`}>
                {language === 'ur' ? 'سبسکرائب کرنے کا شکریہ!' : 'Thank you for subscribing!'}
              </p>
              <p className={`text-sm ${language === 'ur' ? 'urdu-text mt-2' : ''}`}>
                {language === 'ur' ? 'ہم آپ کو اپنی تازہ ترین خبروں سے باخبر رکھیں گے۔' : "We'll keep you updated with our latest news."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" dir={language === 'ur' ? 'rtl' : 'ltr'}>
              <Input
                type="email"
                placeholder={language === 'ur' ? 'اپنا ای میل درج کریں' : 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white border-slate-200 text-slate-800 focus:border-[#1ea05f] focus:ring-[#1ea05f]/20 shadow-sm"
                id="newsletter-email"
                label=""
              />
              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className={`flex-shrink-0 ${language === 'ur' ? 'urdu-text px-12 !rounded-2xl !tracking-normal !normal-case' : ''}`}
              >
                {language === 'ur' ? 'سبسکرائب کریں' : 'Subscribe'}
              </Button>
            </form>
          )}

          <p className={`text-sm text-gray-500 mt-4 ${language === 'ur' ? 'urdu-text' : ''}`}>
            {language === 'ur' ? 'ہم آپ کی پرائیویسی کا احترام کرتے ہیں۔ کسی بھی وقت ان سبسکرائب کریں۔' : 'We respect your privacy. Unsubscribe at any time.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
