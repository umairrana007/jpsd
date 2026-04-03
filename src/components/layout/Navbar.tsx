'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { FiMenu, FiX, FiChevronDown, FiPhone, FiGlobe, FiBook, FiExternalLink } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'nav.home', href: '/' },
  { label: 'nav.causes', href: '/causes' },
  { label: 'nav.events', href: '/events' },
  { label: 'nav.blog', href: '/blog' },
  { 
    label: 'nav.welfare', 
    href: '/welfare', 
    subItems: [
      { label: 'nav.welfare.projects', href: '/welfare/projects' },
      { label: 'nav.welfare.causes', href: '/welfare/causes' },
      { label: 'nav.welfare.news', href: '/welfare/news' },
    ] 
  },
  { 
    label: 'nav.education', 
    href: '/education', 
    subItems: [
      { label: 'nav.education.projects', href: '/education/projects' },
      { label: 'nav.education.causes', href: '/education/causes' },
      { label: 'nav.education.news', href: '/education/news' },
    ] 
  },
  { 
    label: 'nav.spirituality', 
    href: '/spirituality', 
    subItems: [
      { label: 'nav.spirituality.duas', href: '/spirituality/duas' },
      { label: 'nav.spirituality.bayanat', href: '/spirituality/bayanat' },
    ] 
  },
  { 
    label: 'nav.more', 
    href: '#', 
    subItems: [
      { label: 'nav.about', href: '/about-us' },
      { label: 'nav.contact', href: '/contact-us' },
      { label: 'nav.volunteer', href: '/volunteer' },
      { label: 'nav.timeline', href: '/timeline' },
      { label: 'nav.zakatCalculator', href: '/zakat-calculator' },
      { label: 'nav.askShariah', href: '/ask-shariah' },
    ] 
  }
];

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, currentUserData, logout, isAdmin, isVolunteer } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  // Bypass Navbar for tactical portals to avoid UI overlap
  if (pathname?.startsWith('/admin') || 
      pathname?.startsWith('/volunteer') || 
      pathname?.startsWith('/donor') ||
      pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 inset-x-0 z-50 pointer-events-auto"
    >
      <style>{`
        @keyframes slide-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide-infinite {
          display: flex;
          width: max-content;
          animation: slide-infinite 45s linear infinite;
        }
        .marquee-container:hover .animate-slide-infinite {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1) Black Marquee Bar */}
      <div className={`w-full bg-black text-white py-1 md:py-1.5 overflow-hidden marquee-container transition-all duration-300 pointer-events-auto flex items-center ${isScrolled ? 'opacity-0 h-0 !py-0' : 'opacity-100'}`}>
        <div className="animate-slide-infinite gap-8 md:gap-14 text-[10px] md:text-xs tracking-wider font-semibold whitespace-nowrap pl-4 w-full">
          <div className="flex gap-8 md:gap-14">
            <span className="text-gray-300">Baitussalam Masjid Namaz Time, DHA Phase 4</span>
            <span>Fajar: 5:40 am</span>
            <span>Zuhar: 1:30 pm</span>
            <span>Asar: 5:30 pm</span>
            <span>Magrib: Sunset</span>
            <span>Isha: 8:30 pm</span>
          </div>
          <div className="flex gap-8 md:gap-14 pr-8 md:pr-14">
            <span className="text-gray-300">Baitussalam Masjid Namaz Time, DHA Phase 4</span>
            <span>Fajar: 5:40 am</span>
            <span>Zuhar: 1:30 pm</span>
            <span>Asar: 5:30 pm</span>
            <span>Magrib: Sunset</span>
            <span>Isha: 8:30 pm</span>
          </div>
        </div>
      </div>

      {/* 2) Social Media Bar */}
      <div className={`w-full bg-[#1ea05f] text-white py-1.5 md:py-2 transition-all duration-300 pointer-events-auto border-b border-[#15804a] ${isScrolled ? 'opacity-0 h-0 !py-0 !border-transparent' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-end items-center gap-3 md:gap-5 text-[15px] md:text-lg">
          <a href="https://www.facebook.com/jpsd.official" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 hover:scale-110 transition-all"><FaFacebook /></a>
          <a href="https://www.instagram.com/jpsd.media/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 hover:scale-110 transition-all"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-300 hover:scale-110 transition-all"><FaTiktok /></a>
          <a href="https://www.youtube.com/channel/UC93l50wypcsmOG-wn_BHPIg" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 hover:scale-110 transition-all"><FaYoutube /></a>
          <a href="#" className="hover:text-gray-300 hover:scale-110 transition-all"><FaXTwitter /></a>
          <a href="https://wa.me/923212898200" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 hover:scale-110 transition-all"><FaWhatsapp /></a>
        </div>
      </div>

      {/* 3) Global Info Bar */}
      <div className={`w-full py-1.5 px-4 md:px-8 bg-white/40 backdrop-blur-sm transition-all duration-300 pointer-events-auto shadow-sm ${isScrolled ? 'opacity-0 h-0 !py-0 !overflow-hidden' : 'opacity-100 h-auto'}`}>
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-[10px] md:text-[11px] font-bold text-gray-600 tracking-tight">
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:+922134135826" className="flex items-center hover:text-[#1ea05f] transition-colors">
              <FiPhone className="mr-1.5 text-[#1ea05f]" /> (+92) 21 34135826
            </a>
            <div className="flex items-center font-bold">
              <FiGlobe className="mr-1.5 text-[#1ea05f]" /> {t('nav.globalOutreach')}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex bg-gray-100/80 rounded-lg p-0.5 border border-gray-200">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md transition-all ${language === 'en' ? 'bg-white shadow-sm text-[#1ea05f]' : 'hover:bg-white/50'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('ur')}
                className={`px-3 py-1 rounded-md transition-all urdu-font ${language === 'ur' ? 'bg-white shadow-sm text-[#1ea05f]' : 'hover:bg-white/50'}`}
              >
                UR
              </button>
            </div>
            
            <Link href="/shariah-advisory" className="flex items-center bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors">
              <FiBook className="mr-1.5" /> <span className="uppercase tracking-wider">{t('nav.shariahAdvisory')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full px-4 pt-2 md:pt-4 pointer-events-auto">
        <div className={`mx-auto max-w-7xl transition-all duration-300 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/40 relative z-50 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl py-1 shadow-green-600/5' : 'bg-white py-2'
        }`}>
          <div className="flex items-center gap-2 px-4 md:px-6 h-14 md:h-16 overflow-hidden" dir={language === 'ur' ? 'rtl' : 'ltr'}>
            <Link href="/" className="flex items-center group flex-shrink-0">
              <div className={`relative transition-all duration-500 group-hover:scale-105 active:scale-95 ${
                isScrolled ? 'w-48 h-12 md:w-60 md:h-14' : 'w-52 h-14 md:w-72 md:h-18'
              }`}>
                <Image 
                  src="/logo.png" 
                  alt="JPSD Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 flex-1 min-w-0 overflow-hidden justify-center">
              {navItems.map((item) => (
                <div key={item.label} 
                     className="relative group h-full flex items-center"
                     onMouseEnter={() => item.subItems && setActiveDropdown(item.label)}
                     onMouseLeave={() => setActiveDropdown(null)}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-2 py-2 text-[#334155] hover:text-[#1ea05f] font-bold text-[12px] transition-all rounded-full hover:bg-gray-50 whitespace-nowrap ${activeDropdown === item.label ? 'text-[#1ea05f]' : ''} ${language === 'ur' ? 'urdu-text' : ''}`}
                  >
                    <span>{t(item.label)}</span>
                    {item.subItems && <FiChevronDown className={`transform transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  <AnimatePresence>
                    {activeDropdown === item.label && item.subItems && (
                      <motion.div
                        dir={language === 'ur' ? 'rtl' : 'ltr'}
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-4 w-56 bg-white rounded-3xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden z-[60] p-2"
                      >
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="flex items-center justify-between px-4 py-3 text-[13px] text-gray-600 hover:bg-[#1ea05f]/5 hover:text-[#1ea05f] transition-all font-bold rounded-2xl"
                          >
                            <span>{t(subItem.label)}</span>
                            <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px]" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-1 xl:gap-2 flex-shrink-0" dir="ltr">
              {user ? (
                <div className="relative group" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
                  <button className="flex items-center gap-2 bg-gray-100 py-2 px-4 rounded-2xl border border-gray-200 hover:bg-gray-200 transition-all">
                    <div className="w-8 h-8 rounded-full bg-[#1ea05f] flex items-center justify-center text-white font-black text-xs">
                      {currentUserData?.name?.charAt(0) || user.email?.charAt(0)}
                    </div>
                    <span className="hidden md:block text-xs font-black text-slate-700 tracking-tight">{currentUserData?.name?.split(' ')[0] || 'User'}</span>
                    <FiChevronDown className="text-gray-500" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-[100]"
                      >
                        {isAdmin && (
                          <Link href="/admin" className={`block px-4 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl ${language === 'ur' ? 'urdu-text text-right' : ''}`}>
                            {t('nav.adminPortal')}
                          </Link>
                        )}
                        <Link href="/dashboard" className={`block px-4 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl ${language === 'ur' ? 'urdu-text text-right' : ''}`}>
                          {t('nav.dashboard')}
                        </Link>
                        {isVolunteer && (
                          <Link href="/dashboard/volunteer" className={`block px-4 py-3 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl ${language === 'ur' ? 'urdu-text text-right' : ''}`}>
                            {t('nav.volunteerPortal')}
                          </Link>
                        )}
                        <div className="h-px bg-gray-100 my-1"></div>
                        <button 
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className={`w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl ${language === 'ur' ? 'urdu-text text-right shadow-none' : ''}`}
                        >
                          {t('nav.logout')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden xl:flex gap-1">
                  <Link href="/login">
                    <Button variant="outline" size="sm" className={`font-black text-[10px] text-[#1ea05f] hover:bg-[#1ea05f]/5 rounded-xl px-2 border-none shadow-none uppercase tracking-widest ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline" size="sm" className={`font-black text-[10px] border-2 border-[#1ea05f] text-[#1ea05f] rounded-xl px-3 hover:bg-[#1ea05f] hover:text-white transition-all uppercase tracking-widest ${language === 'ur' ? 'urdu-text' : ''}`}>
                      {t('nav.signup')}
                    </Button>
                  </Link>
                </div>
              )}

              <Link href="/donate" className="flex-shrink-0">
                <Button 
                   variant="gold" 
                   size="sm" 
                   className={`flex !bg-orange-500 hover:!bg-orange-600 !text-white !rounded-xl !py-1.5 !px-3 xl:!px-5 shadow-lg shadow-orange-500/20 text-[10px] xl:text-xs border-none font-black whitespace-nowrap ${language === 'ur' ? 'urdu-text' : ''}`}
                >
                   {t('nav.donate')}
                </Button>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-[#334155] bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                {mobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] pointer-events-auto"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden w-[calc(100%-2rem)] mx-auto mt-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 pointer-events-auto"
            >
              <div className="p-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between">
                      <Link href={item.href} className="flex-1 px-4 py-3 text-[#334155] font-bold text-sm tracking-wide" onClick={() => !item.subItems && setMobileMenuOpen(false)}>
                        {t(item.label)}
                      </Link>
                      {item.subItems && (
                        <button onClick={() => toggleDropdown(item.label)} className="p-3 text-gray-400">
                          <FiChevronDown className={`transform transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    {activeDropdown === item.label && item.subItems && (
                      <div className="bg-gray-50 rounded-2xl mx-2 mb-2 overflow-hidden">
                        {item.subItems.map((subItem) => (
                          <Link key={subItem.label} href={subItem.href} className="block px-6 py-3 text-xs text-gray-500 font-bold hover:text-[#1ea05f]" onClick={() => setMobileMenuOpen(false)}>
                            {t(subItem.label)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isAdmin && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                    <Button variant="outline" className={`w-full !rounded-2xl border-red-500 text-red-500 hover:bg-red-50 mb-2 ${language === 'ur' ? 'urdu-text' : ''}`}>
                       {t('nav.adminPortal')}
                    </Button>
                  </Link>
                )}
                {!user && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                      <Button variant="outline" className={`w-full !rounded-2xl border-[#1ea05f] text-[#1ea05f] ${language === 'ur' ? 'urdu-text' : ''}`}>
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full">
                      <Button variant="outline" className={`w-full !rounded-2xl border-[#1ea05f] text-[#1ea05f] ${language === 'ur' ? 'urdu-text' : ''}`}>
                        {t('nav.signup')}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
