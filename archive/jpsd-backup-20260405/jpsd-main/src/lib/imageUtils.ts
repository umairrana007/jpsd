/**
 * Utility functions for image handling and localization
 */

// Mapping of Unsplash photo IDs to local filenames
// This was generated from IMAGE_URLS_REFERENCE.md
const UNSPLASH_MAPPING: Record<string, string> = {
  '1488521787991-ed7bbaae773c': 'jpsd_food.jpg', // Food
  '1576091160550-217359f4ecf8': 'jpsd_health.jpg', // Health
  '1516550893923-42d28e5677af': 'jpsd_ambulance.jpg', // Ambulance
  '1503676260728-1c00da094a0b': 'jpsd_education.jpg', // Education
  '1580582932707-520aed937b7b': 'jpsd_rozgaar.jpg', // Rozgaar
  '1472099645785-5658abf4ff4e': 'jpsd_main.jpg',
  '1516321318423-f06f85e504b3': 'jpsd_food.jpg',
  '1427504494785-3a9ca7044f45': 'jpsd_education.jpg',
  '1497633762265-9d179a990aa6': 'jpsd_rozgaar.jpg',
  '1524178232363-1fb2b075b655': 'jpsd_main.jpg',
  '1565557623262-b51c2513a641': 'jpsd_ambulance.jpg',
  '1576091160399-112ba8d25d1d': 'jpsd_health.jpg',
  '1544027993-37dbfe43562a': 'jpsd_food.jpg',
  '1585036156171-384164a8c675': 'jpsd_education.jpg',
  '1609599006353-e629aaabfeae': 'jpsd_main.jpg',
  '1564769625905-50e93615e769': 'jpsd_ambulance.jpg',
  '1507003211169-0a1dd7228f2d': 'jpsd_health.jpg',
  '1594968853612-da736c46eb0f': 'jpsd_rozgaar.jpg',
  '1547683905-f686c993aae5': 'jpsd_food.jpg',
  '1469571486292-0ba58a3f068b': 'jpsd_main.jpg',
  '1593113630400-ea4288922497': 'jpsd_ambulance.jpg',
  '1541544537156-7627a7a4aa1c': 'jpsd_health.jpg',
  '1584515933487-779824d29309': 'jpsd_education.jpg',
  '1504754524776-8f4f37790ca0': 'jpsd_rozgaar.jpg',
  '1460317442991-0ec209397118': 'jpsd_main.jpg',
  '1509099836639-18ba1795216d': 'jpsd_food.jpg',
  '1511795409834-ef04bbd61622': 'jpsd_ambulance.jpg',
  '1494790108377-be9c29b29330': 'jpsd_health.jpg',
  '1500648767791-00dcc994a43e': 'jpsd_education.jpg',
  '1438761681033-6461ffad8d80': 'jpsd_rozgaar.jpg',
};

/**
 * Localizes an external Unsplash URL to a local public image if it exists.
 * Falls back to a local generic image if no mapping is found.
 */
export const getSafeImageUrl = (url: string | undefined): string => {
  if (!url) return '/images/fallback.jpg';
  
  // If it's already a local path, return it
  if (url.startsWith('/') || url.startsWith('http://localhost') || url.startsWith('https://JPSD')) {
    return url;
  }

  // Handle Unsplash localization
  if (url.includes('unsplash.com')) {
    // Extract ID from URL (e.g. photo-1488521787991-ed7bbaae773c)
    const match = url.match(/photo-([a-zA-Z0-9-]+)/);
    if (match && match[1]) {
      const photoId = match[1];
      if (UNSPLASH_MAPPING[photoId]) {
        return `/images/${UNSPLASH_MAPPING[photoId]}`;
      }
    }
    
    // Generic fallback for any other Unsplash image
    return '/images/jpsd_main.jpg';
  }

  // Handle other known external domains by falling back to local images
  if (url.includes('jpsd.org.pk') && !url.includes('email')) {
     // If we have a hero banner or something, we could map it here
     if (url.includes('banner')) return '/images/hero-banner.JPG';
     return '/images/about-us.jpg';
  }

  // Default fallback for anything else remote
  if (url.startsWith('http')) {
    return '/images/jpsd_main.jpg';
  }

  return url;
};

