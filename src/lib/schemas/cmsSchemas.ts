import { z } from 'zod';
import { validateURL, validateHexColor } from '../sanitize';

export const siteConfigSchema = z.object({
  foundationName: z.string().min(1).max(100),
  tagline: z.string().max(200),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9\s\-()]{10,}$/),
  address: z.string().max(500),
  logoUrl: z.string().refine(validateURL, { message: 'Invalid URL' }),
  maintenanceMode: z.boolean()
});

export const themeSchema = z.object({
  primaryColor: z.string().refine(validateHexColor, { message: 'Invalid hex color' }),
  secondaryColor: z.string().refine(validateHexColor, { message: 'Invalid hex color' }),
  backgroundColor: z.string().refine(validateHexColor, { message: 'Invalid hex color' }),
  textColor: z.string().refine(validateHexColor, { message: 'Invalid hex color' })
});

export const navItemSchema = z.object({
  label: z.string().min(1).max(50),
  href: z.string().refine((val) => val === '/' || val.startsWith('/') || validateURL(val), { message: 'Invalid URL or path' }),
  icon: z.string().optional(),
  order: z.number().int().min(0),
  isVisible: z.boolean(),
  requiredRole: z.enum(['public', 'donor', 'volunteer', 'admin'])
});
