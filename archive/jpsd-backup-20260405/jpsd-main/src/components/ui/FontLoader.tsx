// Font Loader Component - Preloads Noto Nastaliq Urdu font
'use client';

import { useEffect } from 'react';

export const FontLoader: React.FC = () => {
  useEffect(() => {
    // Preload Noto Nastaliq Urdu font
    const linkElement = document.createElement('link');
    linkElement.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap';
    linkElement.rel = 'preload';
    linkElement.as = 'style';
    document.head.appendChild(linkElement);

    // Also create a link element for the actual font fetch
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Add font-display: optional for better performance
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @font-face {
        font-family: 'Noto Nastaliq Urdu';
        font-style: normal;
        font-weight: 400;
        font-display: optional;
        src: url('https://fonts.gstatic.com/s/notonastaliqurdu/v3/v8JQfWZG9XqM8zFmKjHqLqKqKqKq.woff2') format('woff2');
        unicode-range: U+0600-06FF, U+0750-077F, U+08A0-08B9, U+FB50-FDFF, U+FE70-FEFF;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      // Cleanup not necessary for font links
    };
  }, []);

  return null;
};
