import { cache } from 'react';

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/global_config/site-settings`;

export interface SiteSettings {
  showHero: boolean;
  heroTitleEn?: string;
  heroTitleUr?: string;
  primaryColor?: string;
  secondaryColor?: string;
  lastUpdated?: string;
  // Stats
  livesServed?: number;
  donationsReceived?: number;
  volunteersCount?: number;
  programsCount?: number;
  // Identity
  siteName?: string;
  siteDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  showHero: true,
  heroTitleEn: 'JPSD Foundation',
  heroTitleUr: 'جے پی ایس ڈی فاؤنڈیشن',
  primaryColor: '#1ea05f',
  secondaryColor: '#3b82f6',
  livesServed: 500000,
  donationsReceived: 1240000,
  volunteersCount: 1500,
  programsCount: 42,
  // Identity
  siteName: 'JPSD Foundation',
  siteDescription: 'Advancing humanity through education, health, and welfare solutions.',
  contactEmail: 'info@jpsd.org.pk',
  contactPhone: '(+92) 21 34135826 - 29',
  address: 'Jamiyat House, 9 Faran Society, Hyder Ali Road, Karachi, Pakistan',
};

/**
 * Fetches global site settings from Firestore using standard fetch for Next.js caching.
 * Included graceful fallback if Firebase is unreachable.
 */
export const getGlobalConfig = cache(async (): Promise<SiteSettings> => {
  if (!PROJECT_ID) {
    console.warn('Firebase Project ID missing. Using default settings.');
    return DEFAULT_SETTINGS;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(FIRESTORE_URL, {
      signal: controller.signal,
      next: { 
        tags: ['global-config'],
        revalidate: 3600
      },
      cache: 'force-cache'
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404 || response.status === 403) {
        console.info(`Site Settings: Document ${response.status}. Using defaults.`);
        return DEFAULT_SETTINGS;
      }
      console.warn(`Site Settings: Fetch error ${response.status}. Using defaults.`);
      return DEFAULT_SETTINGS;
    }

    const data = await response.json();
    const fields = data.fields || {};
    
    return {
      showHero: fields.showHero?.booleanValue ?? DEFAULT_SETTINGS.showHero,
      heroTitleEn: fields.heroTitleEn?.stringValue ?? DEFAULT_SETTINGS.heroTitleEn,
      heroTitleUr: fields.heroTitleUr?.stringValue ?? DEFAULT_SETTINGS.heroTitleUr,
      primaryColor: fields.primaryColor?.stringValue ?? DEFAULT_SETTINGS.primaryColor,
      secondaryColor: fields.secondaryColor?.stringValue ?? DEFAULT_SETTINGS.secondaryColor,
      livesServed: Number(fields.livesServed?.integerValue || fields.livesServed?.doubleValue || DEFAULT_SETTINGS.livesServed),
      donationsReceived: Number(fields.donationsReceived?.integerValue || fields.donationsReceived?.doubleValue || DEFAULT_SETTINGS.donationsReceived),
      volunteersCount: Number(fields.volunteersCount?.integerValue || fields.volunteersCount?.doubleValue || DEFAULT_SETTINGS.volunteersCount),
      programsCount: Number(fields.programsCount?.integerValue || fields.programsCount?.doubleValue || DEFAULT_SETTINGS.programsCount),
      lastUpdated: fields.lastUpdated?.timestampValue,
      siteName: fields.siteName?.stringValue || DEFAULT_SETTINGS.siteName,
      siteDescription: fields.siteDescription?.stringValue || DEFAULT_SETTINGS.siteDescription,
      contactEmail: fields.contactEmail?.stringValue || DEFAULT_SETTINGS.contactEmail,
      contactPhone: fields.contactPhone?.stringValue || DEFAULT_SETTINGS.contactPhone,
      address: fields.address?.stringValue || DEFAULT_SETTINGS.address,
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.warn('Site Settings: Fetch timed out. Using default fallback values.');
    } else {
      console.warn('Site Settings: Connection to Firebase failed. Using defaults.');
    }
    return DEFAULT_SETTINGS;
  }
});

