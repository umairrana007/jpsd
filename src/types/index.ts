// Type definitions for the project

// Enums
export enum UserRole {
  DONOR = 'donor',
  VOLUNTEER = 'volunteer',
  PROFESSIONAL = 'professional',
  YOUTH = 'youth',
  ADMIN = 'admin',
  CONTENT_MANAGER = 'content_manager',
  VIEWER = 'viewer'
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum CauseCategory {
  EDUCATION = 'education',
  HEALTH = 'health',
  FOOD = 'food',
  WATER = 'water',
  EMERGENCY = 'emergency',
  OTHER = 'other'
}

export enum UrgencyLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum EventType {
  MEDICAL_CAMP = 'medical_camp',
  FOOD_DRIVE = 'food_drive',
  EDUCATION = 'education',
  EMERGENCY = 'emergency',
  OTHER = 'other'
}

export interface Program {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  image: string;
  category: CauseCategory;
  goalAmount: number;
  raisedAmount: number;
  percentage: number;
  active: boolean;
  featured: boolean;
}

export interface Cause {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  image: string;
  category: CauseCategory;
  location: string;
  goalAmount: number;
  raisedAmount: number;
  percentage: number;
  deadline: Date;
  urgency: UrgencyLevel;
  active: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  causeId: string;
  causeName: string;
  paymentMethod: 'jazzcash' | 'easypaisa' | 'stripe' | 'bank_transfer';
  frequency: 'one-time' | 'monthly' | 'yearly';
  status: PaymentStatus;
  transactionId?: string;
  isZakat: boolean;
  isAnonymous: boolean;
  receiptSent: boolean;
  createdAt: Date;
}

export interface Event {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  image: string;
  type: EventType;
  location: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  currentParticipants: number;
  registrationDeadline: Date;
  status: EventStatus;
  createdAt: Date;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  attended: boolean;
  checkedInAt?: Date;
  registeredAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  titleUrdu?: string;
  content: string;
  contentUrdu?: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  authorId: string;
  readTimeMinutes: number;
  published: boolean;
  featured: boolean;
  views: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Volunteer {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  cnic: string;
  dob: Date;
  gender: 'male' | 'female' | 'other';
  address: {
    city: string;
    province: string;
  };
  skills: string[];
  interests: string[];
  availability: {
    days: string[];
    hours: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  profilePhoto?: string;
  cvResume?: string;
  assignedEvents: string[];
  assignedCauses: string[];
  hoursLogged: number;
  rating: number;
  badges: string[];
  status: 'pending' | 'approved' | 'rejected' | 'inactive';
  community?: string;
  joinedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  cnic?: string;
  address?: string;
  role: UserRole;
  photoURL?: string;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  preferences?: {
    language: 'en' | 'ur';
    newsletter: boolean;
    notifications: boolean;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: string[];
  twoFactorEnabled: boolean;
}

export interface LiveStats {
  totalLivesServed: number;
  totalDonationsReceived: number;
  activePrograms: number;
  volunteersCount: number;
}

export interface Report {
  id: string;
  type: 'financial' | 'campaign' | 'donor' | 'event';
  title: string;
  data: any;
  generatedAt: Date;
  period: {
    start: Date;
    end: Date;
  };
}

export interface SiteSettings {
  siteName: string;
  logo: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  paymentGateways: {
    jazzcash: {
      enabled: boolean;
      merchantId: string;
      password: string;
      pin: string;
    };
    easypaisa: {
      enabled: boolean;
      storeId: string;
      apiKey: string;
    };
  };
  maintenanceMode: boolean;
  updatedAt: Date;
}

export interface LanguageContextType {
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  t: (key: string) => string;
}

export interface NavItem {
  label: string;
  labelUrdu?: string;
  href: string;
  subItems?: NavItem[];
}
