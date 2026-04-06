/**
 * JPSD Tactical Analytics Tracker (JTAT)
 * Integrated support for Google Analytics 4 (GA4) and Facebook Pixel events.
 */

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

export const logImpactEvent = (eventName: string, params: any) => {
  console.log(`[JTAT] Logging tactical impact event: ${eventName}`, params);

  // GA4 Tactical Dispatch
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...params,
      platform: 'JPSD HQ',
      deployment_version: 'v2.4'
    });
  }

  // FB Pixel Protocol
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

/**
 * Higher-Order Analytics Protocols
 */
export const trackDonationCompletion = (amount: number, currency: string, method: string) => {
  logImpactEvent('purchase', {
    value: amount,
    currency: currency,
    payment_type: method,
    items: [{ item_name: 'Humanitarian Donation' }]
  });
};

export const trackVolunteerDeployment = (missionTitle: string, points: number) => {
  logImpactEvent('volunteer_registration', {
    mission_name: missionTitle,
    reward_points: points
  });
};
