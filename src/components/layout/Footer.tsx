'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';

const quickLinks = [
  { label: 'nav.about', href: '/about-us' },
  { label: 'nav.timeline', href: '/timeline' },
  { label: 'nav.donationCategories', href: '/donation-category' },
  { label: 'nav.bankDetails', href: '/bank-details' },
  { label: 'nav.prayerTimes', href: '/prayer-times' },
  { label: 'nav.volunteer', href: '/volunteer' },
  { label: 'nav.contact', href: '/contact-us' },
];

interface FooterProps {
  logoUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  const { language, t } = useLanguage();
  const logoSource = logoUrl || '/logo.png';

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-[#0f172a] text-white pt-16 pb-8 relative overflow-hidden"
    >
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-green/5 rounded-full blur-[100px] -mt-48 -ml-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-blue/5 rounded-full blur-[100px] -mb-48 -mr-48" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group ml-2 mb-2">
              <div className="relative w-80 h-20 brightness-0 invert opacity-95 transition-transform group-hover:scale-105">
                <img 
                  src={logoSource} 
                  alt="JPSD Logo" 
                  className="w-full h-full object-contain object-left"
                  onError={(e) => { (e.target as any).src = '/logo.png' }}
                />
              </div>
            </Link>
            <p className={`text-gray-400 leading-relaxed text-sm ${language === 'ur' ? 'urdu-text text-right' : ''}`}>
              {t('footer.about')}
            </p>
            <div className={`flex space-x-5 ${language === 'ur' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {[
                { Icon: FiFacebook, href: 'https://www.facebook.com/jpsd.official' },
                { Icon: FiTwitter, href: 'https://twitter.com/jpsdofficial' },
                { Icon: FiInstagram, href: 'https://www.instagram.com/jpsd.media/' },
                { Icon: FiYoutube, href: 'https://www.youtube.com/channel/UC93l50wypcsmOG-wn_BHPIg' }
              ].map(({ Icon, href }, i) => (
                <motion.a 
                  key={i} 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, color: '#f39c12' }}
                  className="text-gray-500 transition-colors text-xl"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-bold mb-8 relative inline-block ${language === 'ur' ? 'urdu-text' : ''}`}>
              {t('footer.quickLinks')}
              <span className={`absolute bottom-0 ${language === 'ur' ? 'right-0' : 'left-0'} w-1/2 h-1 bg-primary-green rounded-full -mb-2`}></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-green transition-all duration-300 flex items-center group"
                  >
                    <span className={`w-0 group-hover:w-4 h-0.5 bg-primary-green transition-all ${language === 'ur' ? 'ml-0 group-hover:ml-2' : 'mr-0 group-hover:mr-2'}`}></span>
                    <span className={language === 'ur' ? 'urdu-text text-sm' : ''}>
                      {t(link.label)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className={`text-lg font-bold mb-8 relative inline-block ${language === 'ur' ? 'urdu-text' : ''}`}>
              {t('footer.contactUs')}
              <span className={`absolute bottom-0 ${language === 'ur' ? 'right-0' : 'left-0'} w-1/2 h-1 bg-accent-gold rounded-full -mb-2`}></span>
            </h3>
            <ul className="space-y-6">
              <li className={`flex items-start ${language === 'ur' ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                <div className="bg-white/5 p-3 rounded-lg text-accent-gold shadow-inner flex-shrink-0">
                  <FiMapPin className="text-lg" />
                </div>
                <span className={`text-gray-400 text-sm leading-relaxed ${language === 'ur' ? 'urdu-text text-right mr-4' : 'ml-4'}`}>
                  {t('footer.address')}
                </span>
              </li>
              <li className={`flex items-center ${language === 'ur' ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                <div className="bg-white/5 p-3 rounded-lg text-accent-gold shadow-inner flex-shrink-0">
                  <FiPhone className="text-lg" />
                </div>
                <a href="tel:+922134135826" className="text-gray-400 hover:text-white transition-colors text-sm English-text">
                  (+92) 21 34135826
                </a>
              </li>
              <li className={`flex items-center ${language === 'ur' ? 'flex-row-reverse space-x-reverse' : 'space-x-4'}`}>
                <div className="bg-white/5 p-3 rounded-lg text-accent-gold shadow-inner flex-shrink-0">
                  <FiMail className="text-lg" />
                </div>
                <a href="mailto:info@jpsd.org.pk" className="text-gray-400 hover:text-white transition-colors text-sm English-text">
                  info@jpsd.org.pk
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={`text-lg font-bold mb-8 relative inline-block ${language === 'ur' ? 'urdu-text' : ''}`}>
              {t('footer.newsletter')}
              <span className={`absolute bottom-0 ${language === 'ur' ? 'right-0' : 'left-0'} w-1/2 h-1 bg-primary-blue rounded-full -mb-2`}></span>
            </h3>
            <p className={`text-gray-400 mb-6 text-sm ${language === 'ur' ? 'urdu-text' : ''}`}>
              {t('footer.newsletterDesc')}
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <Input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:bg-white/10 transition-all rounded-xl py-6"
                />
              </div>
              <Button variant="gold" className={`w-full py-6 rounded-xl shadow-xl shadow-accent-gold/10 ${language === 'ur' ? 'urdu-text' : ''}`}>
                {t('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className={`flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
            <p className={`text-gray-500 text-sm font-medium ${language === 'ur' ? 'urdu-text' : ''}`}>
              © {new Date().getFullYear()} <span className="text-gray-300">{language === 'ur' ? 'جمعیت پنجابی سوداگرانِ دہلی (JPSD)' : 'JPSD'}</span> | {t('footer.rights')}
            </p>
            <div className={`flex flex-wrap justify-center gap-8 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
              {[
                { label: 'footer.privacy', href: '/privacy-policy' },
                { label: 'footer.terms', href: '/terms-of-service' },
                { label: 'footer.shariah', href: '/shariah-compliance' },
                { label: 'footer.zakat', href: '/zakat-policy' }
              ].map((link) => (
                <Link key={link.label} href={link.href} className={`text-gray-500 hover:text-primary-green transition-colors text-xs font-semibold tracking-wider uppercase ${language === 'ur' ? 'urdu-text text-[10px]' : ''}`}>
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
