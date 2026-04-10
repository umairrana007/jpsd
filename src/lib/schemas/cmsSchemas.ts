import { z } from 'zod';
import { validateURL, validateHexColor } from '@/lib/sanitize';

export const siteConfigSchema = z.object({
  foundationName: z.string().min(1, 'Name required').max(100),
  tagline: z.string().max(200),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^\+?[0-9\s\-()]{10,}/, 'Invalid phone'),
  address: z.string().max(500),
  logoUrl: z.string().refine(validateURL, { message: 'Invalid URL' }),
  maintenanceMode: z.boolean()
});

export const themeSchema = z.object({
  primaryColor: z.string().refine(validateHexColor, { message: 'Invalid hex color' }),
  secondaryColor: z.string().refine(validateHexColor),
  backgroundColor: z.string().refine(validateHexColor),
  textColor: z.string().refine(validateHexColor)
});

export const causeSchema = z.object({
  title: z.string().min(1).max(100),
  titleUrdu: z.string().max(100).optional(),
  description: z.string().min(1),
  descriptionUrdu: z.string().optional(),
  image: z.string().refine(validateURL),
  category: z.enum(['food','water','health','education','emergency']),
  location: z.string().min(1),
  goalAmount: z.number().min(1),
  raisedAmount: z.number().min(0),
  deadline: z.string().refine(val => !isNaN(Date.parse(val)), 'Invalid date'),
  urgency: z.enum(['low','medium','high','critical']),
  active: z.boolean(),
  featured: z.boolean(),
  status: z.enum(['draft','published']),
  scheduledPublishAt: z.string().nullable().optional(),
  reviewStatus: z.enum(['draft', 'pending_review', 'approved', 'rejected']).optional(),
  publishedAt: z.string().optional()
});

export const navItemSchema = z.object({
  label: z.string().min(1).max(50),
  href: z.string().refine((val) => val === '/' || val.startsWith('/') || validateURL(val), 'Invalid URL'),
  icon: z.string().optional(),
  order: z.number().int().min(0),
  isVisible: z.boolean(),
  requiredRole: z.enum(['public','donor','volunteer','admin'])
});
