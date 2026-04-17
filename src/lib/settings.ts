import { cache } from 'react';

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/global_config/site-settings`;

export interface NavItemConfig {
  label: string;
  labelUrdu?: string;
  href: string;
}

export interface SiteSettings {
  showHero: boolean;
  heroTitleEn?: string;
  heroTitleUr?: string;
  heroImage?: string; // Phase 10: Dynamic Hero
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string; // Phase 10: Dynamic Logo
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
  fontFamily?: string;
  borderRadius?: number;
  // Navigation
  navMenu?: NavItemConfig[]; // Phase 10: Dynamic Navigation
  // Homepage Sections
  homepageSections?: string[]; // ['hero', 'stats', 'programs', 'events', 'testimonials', 'partners', 'newsletter']
  // Section Titles (Bilingual)
  programsTitleEn?: string;
  programsTitleUr?: string;
  programsSubtitleEn?: string;
  programsSubtitleUr?: string;
  eventsTitleEn?: string;
  eventsTitleUr?: string;
  eventsSubtitleEn?: string;
  eventsSubtitleUr?: string;
  testimonialsTitleEn?: string;
  testimonialsTitleUr?: string;
  testimonialsSubtitleEn?: string;
  testimonialsSubtitleUr?: string;
  newsletterTitleEn?: string;
  newsletterTitleUr?: string;
  newsletterSubtitleEn?: string;
  newsletterSubtitleUr?: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  showHero: true,
  heroTitleEn: 'JPSD Foundation',
  heroTitleUr: 'جے پی ایس ڈی فاؤنڈیشن',
  heroImage: '/images/jpsd_hero.png',
  primaryColor: '#1ea05f',
  secondaryColor: '#3b82f6',
  logoUrl: '/logo.png',
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
  fontFamily: 'Inter',
  borderRadius: 12,
  navMenu: [
    { label: 'Home', labelUrdu: 'ہوم', href: '/' },
    { label: 'Welfare', labelUrdu: 'فلاح و بہبود', href: '/welfare' },
    { label: 'Education', labelUrdu: 'تعلیم', href: '/education' },
    { label: 'Causes', labelUrdu: 'مقاصد', href: '/causes' },
  ],
  // Homepage Sections (default order)
  homepageSections: ['hero', 'stats', 'programs', 'events', 'testimonials', 'partners', 'newsletter'],
  // Section Titles - Programs
  programsTitleEn: 'Our Programs & Initiatives',
  programsTitleUr: 'ہمارے پروگرام اور اقدامات',
  programsSubtitleEn: 'Discover how we are transforming communities through targeted welfare programs',
  programsSubtitleUr: 'دیکھیں کہ ہم کس طرح ہدف والے فلاحی پروگراموں کے ذریعے کمیونٹیز کو تبدیل کر رہے ہیں',
  // Section Titles - Events
  eventsTitleEn: 'Recent Events & Activities',
  eventsTitleUr: 'حالیہ ایونٹس اور سرگرمیاں',
  eventsSubtitleEn: 'See how we\'re making a difference in communities across Pakistan',
  eventsSubtitleUr: 'دیکھیں کہ ہم پاکستان بھر کی کمیونٹیز میں کس طرح مثبت تبدیلی لا رہے ہیں',
  // Section Titles - Testimonials
  testimonialsTitleEn: 'Success Stories & Trust',
  testimonialsTitleUr: 'کامیابی کی کہانیاں اور اعتماد',
  testimonialsSubtitleEn: 'Hear from our global community of donors, volunteers, and the lives we\'ve touched together.',
  testimonialsSubtitleUr: 'ہمارے ڈونرز، رضاکاروں اور ان لوگوں کی کہانیاں سنیں جن کی ہم نے مل کر مدد کی ہے۔',
  // Section Titles - Newsletter
  newsletterTitleEn: 'Stay Connected',
  newsletterTitleUr: 'جڑے رہیں',
  newsletterSubtitleEn: 'Subscribe to receive updates on our mission and impact stories',
  newsletterSubtitleUr: 'ہمارے مشن اور اثر کی کہانیوں پر اپ ڈیٹس وصول کرنے کے لیے سبسکرائب کریں',
};

/**
 * Fetches global site settings from Firestore using standard fetch for Next.js caching.
 * Falls back to defaults if Firebase is unreachable.
 */
export const getGlobalConfig = cache(async (): Promise<SiteSettings> => {
  if (!PROJECT_ID) {
    return DEFAULT_SETTINGS;
  }

  try {
    // 3-second timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(FIRESTORE_URL, {
      signal: controller.signal,
      next: { 
        tags: ['global-config'],
        revalidate: 60 // Cache for 1 minute, admin updates will revalidate
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return DEFAULT_SETTINGS;
    }

    const data = await response.json();
    
    // Parse Firestore response format
    const fields = data.fields || {};
    
    return {
      showHero: fields.showHero?.booleanValue ?? DEFAULT_SETTINGS.showHero,
      heroTitleEn: fields.heroTitleEn?.stringValue ?? DEFAULT_SETTINGS.heroTitleEn,
      heroTitleUr: fields.heroTitleUr?.stringValue ?? DEFAULT_SETTINGS.heroTitleUr,
      heroImage: fields.heroImage?.stringValue ?? DEFAULT_SETTINGS.heroImage,
      primaryColor: fields.primaryColor?.stringValue ?? DEFAULT_SETTINGS.primaryColor,
      secondaryColor: fields.secondaryColor?.stringValue ?? DEFAULT_SETTINGS.secondaryColor,
      logoUrl: fields.logoUrl?.stringValue ?? DEFAULT_SETTINGS.logoUrl,
      livesServed: fields.livesServed?.integerValue ? Number(fields.livesServed.integerValue) : DEFAULT_SETTINGS.livesServed,
      donationsReceived: fields.donationsReceived?.integerValue ? Number(fields.donationsReceived.integerValue) : DEFAULT_SETTINGS.donationsReceived,
      volunteersCount: fields.volunteersCount?.integerValue ? Number(fields.volunteersCount.integerValue) : DEFAULT_SETTINGS.volunteersCount,
      programsCount: fields.programsCount?.integerValue ? Number(fields.programsCount.integerValue) : DEFAULT_SETTINGS.programsCount,
      siteName: fields.siteName?.stringValue ?? DEFAULT_SETTINGS.siteName,
      siteDescription: fields.siteDescription?.stringValue ?? DEFAULT_SETTINGS.siteDescription,
      contactEmail: fields.contactEmail?.stringValue ?? DEFAULT_SETTINGS.contactEmail,
      contactPhone: fields.contactPhone?.stringValue ?? DEFAULT_SETTINGS.contactPhone,
      address: fields.address?.stringValue ?? DEFAULT_SETTINGS.address,
      fontFamily: fields.fontFamily?.stringValue ?? DEFAULT_SETTINGS.fontFamily,
      borderRadius: fields.borderRadius?.integerValue ? Number(fields.borderRadius.integerValue) : DEFAULT_SETTINGS.borderRadius,
      navMenu: fields.navMenu?.arrayValue?.values?.map((item: any) => ({
        label: item.mapValue?.fields?.label?.stringValue || '',
        labelUrdu: item.mapValue?.fields?.labelUrdu?.stringValue || '',
        href: item.mapValue?.fields?.href?.stringValue || ''
      })) ?? DEFAULT_SETTINGS.navMenu,
      homepageSections: fields.homepageSections?.arrayValue?.values?.map((item: any) => item.stringValue) ?? DEFAULT_SETTINGS.homepageSections,
      programsTitleEn: fields.programsTitleEn?.stringValue ?? DEFAULT_SETTINGS.programsTitleEn,
      programsTitleUr: fields.programsTitleUr?.stringValue ?? DEFAULT_SETTINGS.programsTitleUr,
      programsSubtitleEn: fields.programsSubtitleEn?.stringValue ?? DEFAULT_SETTINGS.programsSubtitleEn,
      programsSubtitleUr: fields.programsSubtitleUr?.stringValue ?? DEFAULT_SETTINGS.programsSubtitleUr,
      eventsTitleEn: fields.eventsTitleEn?.stringValue ?? DEFAULT_SETTINGS.eventsTitleEn,
      eventsTitleUr: fields.eventsTitleUr?.stringValue ?? DEFAULT_SETTINGS.eventsTitleUr,
      eventsSubtitleEn: fields.eventsSubtitleEn?.stringValue ?? DEFAULT_SETTINGS.eventsSubtitleEn,
      eventsSubtitleUr: fields.eventsSubtitleUr?.stringValue ?? DEFAULT_SETTINGS.eventsSubtitleUr,
      testimonialsTitleEn: fields.testimonialsTitleEn?.stringValue ?? DEFAULT_SETTINGS.testimonialsTitleEn,
      testimonialsTitleUr: fields.testimonialsTitleUr?.stringValue ?? DEFAULT_SETTINGS.testimonialsTitleUr,
      testimonialsSubtitleEn: fields.testimonialsSubtitleEn?.stringValue ?? DEFAULT_SETTINGS.testimonialsSubtitleEn,
      testimonialsSubtitleUr: fields.testimonialsSubtitleUr?.stringValue ?? DEFAULT_SETTINGS.testimonialsSubtitleUr,
      newsletterTitleEn: fields.newsletterTitleEn?.stringValue ?? DEFAULT_SETTINGS.newsletterTitleEn,
      newsletterTitleUr: fields.newsletterTitleUr?.stringValue ?? DEFAULT_SETTINGS.newsletterTitleUr,
      newsletterSubtitleEn: fields.newsletterSubtitleEn?.stringValue ?? DEFAULT_SETTINGS.newsletterSubtitleEn,
      newsletterSubtitleUr: fields.newsletterSubtitleUr?.stringValue ?? DEFAULT_SETTINGS.newsletterSubtitleUr,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    // Silently fall back to defaults (Firestore not configured yet)
    return DEFAULT_SETTINGS;
  }
});

