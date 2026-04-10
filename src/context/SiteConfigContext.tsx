'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface SiteConfig {
  foundationName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  maintenanceMode: boolean;
  logoUrl: string;
  lastUpdated?: any;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  fontFamily: string;
  active: boolean;
}

export interface NavItemType {
  id: string;
  label: string;
  href: string;
  icon: string;
  order: number;
  isVisible: boolean;
  requiredRole: 'public' | 'donor' | 'volunteer' | 'admin';
  isActive: boolean;
}

interface SiteConfigContextType {
  siteConfig: SiteConfig | null;
  theme: ThemeSettings | null;
  navigation: NavItemType[];
  loading: boolean;
}

const defaultSiteConfig: SiteConfig = {
  foundationName: 'JPSD Foundation',
  tagline: 'Advancing humanity through education, health, and welfare solutions.',
  email: 'info@jpsd.org.pk',
  phone: '+92 21 34135826 - 29',
  address: 'Jamiyat House, 9 Faran Society, Hyder Ali Road, Karachi, Pakistan',
  maintenanceMode: false,
  logoUrl: '/logo.png'
};

const defaultTheme: ThemeSettings = {
  primaryColor: '#1e40af',
  secondaryColor: '#059669',
  backgroundColor: '#ffffff',
  textColor: '#1e293b',
  borderRadius: '0.5rem',
  fontFamily: 'Inter',
  active: true
};

const defaultNavigation: NavItemType[] = [
  { id: '1', label: 'Home', href: '/', icon: 'home', order: 1, isVisible: true, requiredRole: 'public', isActive: true },
  { id: '2', label: 'Welfare', href: '/welfare', icon: 'heart', order: 2, isVisible: true, requiredRole: 'public', isActive: true },
  { id: '3', label: 'Education', href: '/education', icon: 'book', order: 3, isVisible: true, requiredRole: 'public', isActive: true },
  { id: '4', label: 'Causes', href: '/causes', icon: 'globe', order: 4, isVisible: true, requiredRole: 'public', isActive: true }
];

const SiteConfigContext = createContext<SiteConfigContextType>({
  siteConfig: defaultSiteConfig,
  theme: defaultTheme,
  navigation: defaultNavigation,
  loading: true
});

export const SiteConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [theme, setTheme] = useState<ThemeSettings | null>(null);
  const [navigation, setNavigation] = useState<NavItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to load from localStorage first
    const cachedConfig = localStorage.getItem('jpsd_site_config');
    const cachedTheme = localStorage.getItem('jpsd_theme_settings');
    const cachedNav = localStorage.getItem('jpsd_navigation');
    
    if (cachedConfig) setSiteConfig(JSON.parse(cachedConfig));
    if (cachedTheme) setTheme(JSON.parse(cachedTheme));
    if (cachedNav) setNavigation(JSON.parse(cachedNav));

    if (!db) {
        setSiteConfig(defaultSiteConfig);
        setTheme(defaultTheme);
        setNavigation(defaultNavigation);
        setLoading(false);
        return;
    }

    // Real-time listener for site config
    const unsubConfig = onSnapshot(doc(db, 'site_config', 'main'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as SiteConfig;
        setSiteConfig(data);
        localStorage.setItem('jpsd_site_config', JSON.stringify(data));
      } else {
        setSiteConfig(defaultSiteConfig);
      }
    }, (error) => {
      console.error('Error fetching site_config:', error);
      if (!siteConfig) setSiteConfig(defaultSiteConfig);
    });

    // Real-time listener for theme config
    const unsubTheme = onSnapshot(doc(db, 'theme_settings', 'main'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as ThemeSettings;
        setTheme(data);
        localStorage.setItem('jpsd_theme_settings', JSON.stringify(data));
        
        // Inject CSS Variables dynamically
        document.documentElement.style.setProperty('--primary', data.primaryColor || '#1e40af');
        document.documentElement.style.setProperty('--secondary', data.secondaryColor || '#059669');
      } else {
        setTheme(defaultTheme);
      }
    }, (error) => {
      console.error('Error fetching theme_settings:', error);
      if (!theme) setTheme(defaultTheme);
    });

    import('firebase/firestore').then(({ collection, onSnapshot, query, orderBy }) => {
      const q = query(collection(db!, 'navigation'), orderBy('order', 'asc'));
      const unsubNav = onSnapshot(q, (snapshot) => {
        const navData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NavItemType[];
        if (navData.length > 0) {
          setNavigation(navData);
          localStorage.setItem('jpsd_navigation', JSON.stringify(navData));
        } else {
          setNavigation(defaultNavigation);
        }
        setLoading(false);
      }, (error) => {
        console.error('Error fetching navigation:', error);
        if (navigation.length === 0) setNavigation(defaultNavigation);
        setLoading(false);
      });
      // @ts-ignore
      window._unsubNav = unsubNav;
    });

    return () => {
      unsubConfig();
      unsubTheme();
      // @ts-ignore
      if (window._unsubNav) window._unsubNav();
    };
  }, []);

  return (
    <SiteConfigContext.Provider value={{ siteConfig, theme, navigation, loading }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);
