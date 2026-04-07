'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export async function updateSiteSettings(formData: {
  showHero: boolean;
  heroTitleEn: string;
  heroTitleUr: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily?: string;
  borderRadius?: number;
  livesServed?: number;
  donationsReceived?: number;
  volunteersCount?: number;
  programsCount?: number;
}) {
  try {
    if (!db) {
      throw new Error('Firebase not configured');
    }
    
    const settingsRef = doc(db, 'global_config', 'site-settings');
    
    await setDoc(settingsRef, {
      showHero: formData.showHero,
      heroTitleEn: formData.heroTitleEn,
      heroTitleUr: formData.heroTitleUr,
      primaryColor: formData.primaryColor,
      secondaryColor: formData.secondaryColor,
      fontFamily: formData.fontFamily || 'Inter',
      borderRadius: formData.borderRadius || 12,
      livesServed: formData.livesServed || 0,
      donationsReceived: formData.donationsReceived || 0,
      volunteersCount: formData.volunteersCount || 0,
      programsCount: formData.programsCount || 0,
      lastUpdated: serverTimestamp(),
    }, { merge: true });

    // Revalidate for high performance and low-latency updates
    revalidatePath('/', 'layout');

    return { success: true, message: 'Settings published successfully!' };
  } catch (error) {
    console.error('Failed to update settings:', error);
    return { success: false, message: 'Failed to update settings.' };
  }
}
