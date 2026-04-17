'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { 
  FiMenu, FiX, FiChevronDown, FiGlobe, FiUser, 
  FiHeart, FiLogOut, FiLayout, FiMaximize2,
  FiBell, FiCalendar, FiBook, FiImage, FiUserPlus, FiMail,
  FiMoreHorizontal
} from 'react-icons/fi';
import { NavItemConfig } from '@/lib/settings';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

interface NavbarProps {
  navMenu?: NavItemConfig[];
  logoUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ navMenu: propsNavMenu, logoUrl: propsLogoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMoreDesktop, setShowMoreDesktop] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();
  const { user, currentUserData, logout, loading: authLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { navigation, siteConfig } = useSiteConfig();

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setShowMoreDesktop(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const navItems = navigation.filter(n => n.isVisible && n.requiredRole === 'public').map(item => ({
    name: item.label,
    href: item.href
  }));

  const logoSource = siteConfig?.logoUrl || propsLogoUrl || '/logo.png';

  const moreItems = [
    { name: t('nav.events'), href: '/events', icon: <FiCalendar /> },
    { name: t('nav.blog'), href: '/blog', icon: <FiBook /> },
    { name: t('nav.gallery'), href: '/gallery', icon: <FiImage /> },
    { name: t('nav.volunteer'), href: '/volunteer', icon: <FiUserPlus /> },
    { name: t('nav.contact'), href: '/contact-us', icon: <FiMail /> },
  ];

  const isUrdu = language === 'ur';

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const getDashboardLink = () => {
    if (!currentUserData?.role) return '/dashboard';
    switch (currentUserData.role) {
      case 'admin': return '/admin';
      case 'volunteer': return '/volunteer/dashboard';
      case 'donor': return '/donor/dashboard';
      default: return '/dashboard';
    }
  };

  const isPortal = pathname?.startsWith('/donor') || pathname?.startsWith('/admin') || pathname?.startsWith('/volunteer');
  if (isPortal) return null;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className={`flex items-center justify-between ${isUrdu ? 'flex-row-reverse' : ''}`}>
          
          {/* Logo */}
          <Link href="/" className={`relative z-10 flex items-center gap-3 group ${isUrdu ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-2xl bg-white shadow-lg p-1.5 transition-transform group-hover:scale-105 active:scale-95 duration-500">
                <img 
                 src={logoSource} 
                 alt="JPSD Logo" 
                 className="w-full h-full object-contain"
                 onError={(e) => { (e.target as any).src = '/logo.png' }}
               />
            </div>
            <div className={`flex flex-col ${isUrdu ? 'items-end text-right' : 'items-start text-left'}`}>
              <span className={`text-xl md:text-2xl font-black tracking-tighter leading-none ${scrolled ? 'text-slate-900' : 'text-slate-800'} ${isUrdu ? 'font-urdu' : ''}`}>
                JPSD
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 text-[#1ea05f]`}>
                {isUrdu ? 'خدمت کی روایت' : 'Heritage of Service'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2.5 rounded-2xl text-[13px] font-extrabold transition-all duration-300 relative group overflow-hidden ${
                    scrolled 
                      ? isActive ? 'text-[#1ea05f] bg-[#1ea05f]/5 shadow-sm' : 'text-slate-600 hover:text-[#1ea05f]' 
                      : isActive ? 'text-[#1ea05f] bg-[#1ea05f]/5' : 'text-slate-600 hover:text-[#1ea05f]'
                  }`}
                >
                  <span className={`relative z-10 ${isUrdu ? 'urdu-text text-[15px]' : ''}`}>{item.name}</span>
                  {isActive && (
                    <motion.div layoutId="nav-pill" className="absolute inset-0 bg-[#1ea05f]/10 dark:bg-white/10 -z-0" />
                  )}
                </Link>
              );
            })}

            {/* Desktop More Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowMoreDesktop(!showMoreDesktop)}
                onMouseEnter={() => setShowMoreDesktop(true)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[13px] font-black transition-all ${
                  scrolled 
                    ? 'text-slate-900 hover:text-[#1ea05f]' 
                    : 'text-slate-700 hover:text-[#1ea05f]'
                }`}
              >
                <FiMoreHorizontal className="text-lg" />
                <span className={isUrdu ? 'urdu-text text-[15px]' : ''}>{t('nav.more')}</span>
                <FiChevronDown className={`transition-transform duration-300 ${showMoreDesktop ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showMoreDesktop && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    onMouseLeave={() => setShowMoreDesktop(false)}
                    className={`absolute ${isUrdu ? 'right-0' : 'left-0'} mt-3 w-64 bg-white rounded-[2rem] shadow-2xl p-4 border border-slate-50 overflow-hidden z-50`}
                  >
                    <div className="grid grid-cols-1 gap-2">
                       {moreItems.map((item) => (
                         <Link 
                          key={item.href} 
                          href={item.href}
                          className={`flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group ${isUrdu ? 'flex-row-reverse text-right' : ''}`}
                         >
                           <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#1ea05f]/10 group-hover:text-[#1ea05f] transition-colors">{item.icon}</div>
                           <span className={`text-[12px] font-black text-slate-600 group-hover:text-slate-900 ${isUrdu ? 'urdu-text' : ''}`}>{item.name}</span>
                         </Link>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Area */}
          <div className={`hidden lg:flex items-center gap-6 ${isUrdu ? 'flex-row-reverse' : ''}`}>
            
            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className={`flex items-center gap-2.5 px-4 py-2.0 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${
                scrolled ? 'bg-slate-50 text-slate-600 hover:bg-slate-100' : 'bg-slate-50/50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FiGlobe className="text-[14px]" />
              {language === 'en' ? 'اردو' : 'English'}
            </button>

            {/* Auth Area */}
            {authLoading ? (
              <div className="w-10 h-10 rounded-full border-2 border-[#1ea05f] border-t-transparent animate-spin" />
            ) : user ? (
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-3 p-1 rounded-full transition-all border-2 ${scrolled ? 'border-slate-100' : 'border-white/20'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#1ea05f] flex items-center justify-center text-white text-lg font-black uppercase">
                    {user.email?.[0] || 'U'}
                  </div>
                </button>
                
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className={`absolute top-full mt-4 w-60 bg-white rounded-[2rem] shadow-3xl p-4 border border-slate-100 z-50 ${isUrdu ? 'left-0' : 'right-0'}`}
                    >
                      <div className={`px-4 py-3 mb-2 border-b border-slate-50 ${isUrdu ? 'text-right' : ''}`}>
                        <p className={`text-[10px] font-black text-slate-400 uppercase tracking-widest ${isUrdu ? 'urdu-text' : ''}`}>{t('nav.welcome')}</p>
                        <p className="text-[12px] font-black text-slate-800 truncate">{(currentUserData?.name || user?.displayName) || user?.email}</p>
                      </div>
                      <div className="grid gap-1">
                        <Link href={getDashboardLink()} className={`flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 text-[12px] font-bold ${isUrdu ? 'flex-row-reverse' : ''}`}>
                          <FiLayout className="text-[#1ea05f]" />
                          <span className={isUrdu ? 'urdu-text' : ''}>{t('nav.dashboard')}</span>
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-[#f43f5e] text-[12px] font-bold ${isUrdu ? 'flex-row-reverse' : ''}`}
                        >
                          <FiLogOut />
                          <span className={isUrdu ? 'urdu-text' : ''}>{t('nav.logout')}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className={`flex items-center gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <Link href="/login">
                  <Button variant="outline" className={`!px-6 !py-2.5 !rounded-2xl !text-[12px] !font-black !tracking-widest ${scrolled ? '!border-slate-200 !text-slate-600' : '!border-slate-200 !text-slate-600 hover:!bg-slate-50'}`}>
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" className="!px-7 !py-3 !rounded-[1.3rem] !text-[11px] !font-black !tracking-widest !bg-[#1ea05f] hover:!bg-[#198a51] hover:-translate-y-1 shadow-lg shadow-[#1ea05f]/20">
                    {t('nav.signup')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-2xl transition-all shadow-md active:scale-90 ${
              scrolled ? 'bg-[#1ea05f] text-white' : 'bg-slate-100/80 text-slate-700 backdrop-blur-md'
            }`}
          >
            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-3xl z-[150] overflow-y-auto ${isUrdu ? 'left-0 right-auto' : 'right-0'}`}
          >
            <div className="p-8 space-y-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center p-2">
                   <img src={logoSource} alt="Logo" className="w-full h-full object-contain" onError={(e) => { (e.target as any).src = '/logo.png' }} />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              <div className="grid gap-2">
                {[...navItems, ...moreItems].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    className={`p-5 rounded-2xl flex items-center justify-between group transition-all hover:bg-[#1ea05f]/5 ${isUrdu ? 'flex-row-reverse' : ''}`}
                  >
                    <span className={`text-lg font-black text-slate-800 tracking-tight group-hover:text-[#1ea05f] ${isUrdu ? 'urdu-text' : ''}`}>
                      {item.name}
                    </span>
                    <FiChevronDown className={`text-slate-300 group-hover:text-[#1ea05f] ${isUrdu ? 'rotate-90' : '-rotate-90'}`} />
                  </Link>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-50 grid gap-4">
                 <button 
                  onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                  className={`w-full p-5 rounded-2xl bg-slate-50 flex items-center justify-between text-slate-600 font-bold ${isUrdu ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex items-center gap-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                     <FiGlobe className="text-xl text-[#1ea05f]" />
                     <span className={isUrdu ? 'urdu-text' : ''}>{language === 'en' ? 'اردو' : 'English'}</span>
                  </div>
                  <FiMaximize2 className="text-slate-300" />
                </button>

                {user ? (
                   <button 
                    onClick={handleLogout}
                    className="w-full p-5 rounded-2xl bg-rose-50 text-rose-500 flex items-center gap-4 font-black"
                   >
                     <FiLogOut />
                     <span>Logout</span>
                   </button>
                ) : (
                  <div className="grid gap-3">
                    <Link href="/login" className="block"><Button variant="outline" className="w-full !rounded-2xl !py-4">Login</Button></Link>
                    <Link href="/signup" className="block"><Button variant="primary" className="w-full !rounded-2xl !py-4 shadow-lg shadow-[#1ea05f]/20">Join the Mission</Button></Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
