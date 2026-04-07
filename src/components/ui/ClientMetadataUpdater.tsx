'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ClientMetadataUpdater() {
  const { language } = useLanguage();

  useEffect(() => {
    const meta = {
      en: {
        title: "JPSD Global - Jamiyat Punjabi Saudagran-e-Delhi",
        description: "Support humanitarian causes across Pakistan with JPSD.",
        ogTitle: "JPSD Global",
        ogDescription: "Trusted humanitarian platform for donations and volunteer work."
      },
      ur: {
        title: "ساؤتگریان - جمیعت پنجابی سوداگراں دہلی - پاکستان",
        description: "پاکستان میں فلاحی کاموں میں حصہ ڈالیں۔",
        ogTitle: "جے پی ایس ڈی گلوبل",
        ogDescription: "فلاحی کاموں اور رضاکاری کے لیے قابل اعتماد پلیٹ فارم۔"
      }
    };

    const data = meta[language as keyof typeof meta] || meta.en;
    document.title = data.title;

    const setMeta = (name: string, content: string, property = false) => {
      let tag = document.querySelector(`meta[${property ? 'property' : 'name'}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        if (property) tag.setAttribute('property', name);
        else tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', data.description);
    setMeta('og:title', data.ogTitle, true);
    setMeta('og:description', data.ogDescription, true);
    setMeta('twitter:title', data.ogTitle, true);
    setMeta('twitter:description', data.ogDescription, true);

    return () => { };
  }, [language]);

  return null;
}
