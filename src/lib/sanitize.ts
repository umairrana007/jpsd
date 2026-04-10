import DOMPurify from 'dompurify';

export const sanitizeHTML = (html: string): string => {
  if (typeof window === 'undefined') return html; // DOMPurify needs a DOM
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p','br','strong','em','u','ul','ol','li','a','h1','h2','h3','h4','blockquote'],
    ALLOWED_ATTR: ['href','target','rel']
  });
};

export const validateURL = (url: string): boolean => {
  try {
    new URL(url, 'http://dummy.com'); // added dummy base for relative URLs
    return url.startsWith('http') || url.startsWith('/');
  } catch {
    return false;
  }
};

export const validateHexColor = (hex: string): boolean =>
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
