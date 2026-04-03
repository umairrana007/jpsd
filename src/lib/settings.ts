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
}

const DEFAULT_SETTINGS: SiteSettings = {
  showHero: true,
  heroTitleEn: 'JPSD Foundation',
  heroTitleUr: 'جے پی ایس ڈی فاؤنڈیشن',
  primaryColor: '#1ea05f',
  secondaryColor: '#3b82f6',
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
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const response = await fetch(FIRESTORE_URL, {
      signal: controller.signal,
      next: { 
        tags: ['global-config'],
        revalidate: 3600 // Cache for 1 hour by default, or until tag revalidation
      },
      cache: 'force-cache'
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404 || response.status === 403) {
        console.info(`Config document returned ${response.status} from Firestore. Using defaults.`);
        return DEFAULT_SETTINGS;
      }
      console.warn(`Firestore Fetch Error: ${response.statusText}. Falling back to defaults.`);
      return DEFAULT_SETTINGS;
    }

    const data = await response.json();
    
    // Parse Firestore REST API format to regular JSON
    const fields = data.fields || {};
    
    return {
      showHero: fields.showHero?.booleanValue ?? DEFAULT_SETTINGS.showHero,
      heroTitleEn: fields.heroTitleEn?.stringValue ?? DEFAULT_SETTINGS.heroTitleEn,
      heroTitleUr: fields.heroTitleUr?.stringValue ?? DEFAULT_SETTINGS.heroTitleUr,
      primaryColor: fields.primaryColor?.stringValue ?? DEFAULT_SETTINGS.primaryColor,
      secondaryColor: fields.secondaryColor?.stringValue ?? DEFAULT_SETTINGS.secondaryColor,
      lastUpdated: fields.lastUpdated?.timestampValue,
    };
  } catch (error) {
    console.error('Graceful Fallback Engaged: Connection to Firebase failed.', error);
    return DEFAULT_SETTINGS;
  }
});

