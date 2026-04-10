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

export type ContentRole = 'content_editor' | 'publisher' | 'super_admin';

export type ReviewStatus = 'draft' | 'pending_review' | 'approved' | 'rejected';

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
  status: 'draft' | 'published';
  publishedAt?: Date;
  scheduledPublishAt?: string;
  publishAt?: string;
  reviewStatus: ReviewStatus;
  reviewComments?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  userId: string;
  causeId: string;
  causeName: string;
  cause?: string;
  causeTitle?: string;
  programName?: string;
  paymentMethod: 'jazzcash' | 'easypaisa' | 'stripe' | 'bank_transfer';
  frequency: 'one-time' | 'monthly' | 'yearly';
  status: PaymentStatus;
  transactionId?: string;
  isZakat: boolean;
  isAnonymous: boolean;
  receiptSent: boolean;
  receiptConsent: boolean;
  securityHash?: string;
  type?: string;
  currency?: string;
  date?: Date;
  ref?: string;
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
  locationUrdu?: string;
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
  featured: boolean;
  views: number;
  status: 'draft' | 'published';
  publishedAt?: Date;
  scheduledPublishAt?: string;
  publishAt?: string;
  reviewStatus: ReviewStatus;
  reviewComments?: string;
  reviewedBy?: string;
  reviewedAt?: string;
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
  status: 'active' | 'inactive' | 'pending' | 'approved' | 'pending_deletion';
  contentRole?: ContentRole;
  allowedCollections?: string[];
  permissions?: string[];
  skills?: string[];
  region?: string;
  deletionRequested?: boolean;
  preferences?: {
    language: 'en' | 'ur';
    newsletter: boolean;
    notifications: boolean;
  };
}

export type AppUser = User;

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
  data: unknown;
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
  isUrdu: boolean;
  setLanguage: (lang: 'en' | 'ur') => void;
  t: (key: string) => string;
}

export interface NavItem {
  name: string;
  label?: string;
  labelUrdu?: string;
  href: string;
  icon?: React.ElementType;
  location?: 'header' | 'footer' | 'sidebar';
  subItems?: NavItem[];
}

// Payment Interface Definitions (Phase 4)
export type PaymentProcessStatus = 'pending' | 'success' | 'failed' | 'refunded';

export interface PaymentRequest {
  id?: string;
  amount: number;
  currency: string;
  donorEmail: string;
  donorPhone: string;
  causeId?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
  errorCode?: string;
  redirectUrl?: string; // Phase 6: Added for simulation & gateway redirects
  meta?: Record<string, unknown>;
}

export interface PaymentProvider {
  initiatePayment(request: PaymentRequest): Promise<PaymentResponse>;
  verifyTransaction(transactionId: string): Promise<PaymentResponse>;
  getPaymentStatus(transactionId: string): Promise<PaymentProcessStatus>;
  processRefund?(transactionId: string, amount: number): Promise<PaymentResponse>;
}
import { Timestamp } from 'firebase/firestore';

export interface DeploymentData {
  id: string;
  volunteerId: string;
  volunteerName?: string;
  missionId: string;
  title: string;
  locationName: string;
  category: string;
  difficulty: string;
  matchScore: number;
  status: 'assigned' | 'checked-in' | 'completed' | 'verified';
  checkInTime?: Date;
  checkOutTime?: Date;
  location?: { lat: number; lng: number };
  hoursLogged?: number;
  reportSubmitted?: boolean;
  verifiedBy?: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeploymentUpdate {
  status?: DeploymentData['status'];
  checkInTime?: Timestamp;
  checkOutTime?: Timestamp;
  hoursLogged?: number;
  reportSubmitted?: boolean;
  verifiedAt?: Timestamp;
  verifiedBy?: string;
  updatedAt?: Timestamp;
}

export interface JazzCashHashParams {
  [key: string]: string | number;
}

export interface EasyPaisaPayload {
  transactionId: string;
  amount: number;
  merchantId: string;
  storeId: string;
  timestamp: string;
}

export interface PaymentPayload {
  method: 'jazzcash' | 'easypaisa';
  amount: number;
  params?: Record<string, unknown>;
  data?: Record<string, unknown>;
  salt?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  status: 'success' | 'failure';
  details?: string;
  metadata?: Record<string, unknown>;
  message?: string;
  adminUid?: string;
  type?: string;
  timestamp?: Date;
  affectedUserId?: string;
  affectedUserIds?: string[];
  createdAt: Date;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  image?: string;
  website?: string;
  isPublished?: boolean;
  order?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  nameUrdu?: string;
  role: string;
  roleUrdu?: string;
  content?: string;
  text?: string;
  textUrdu?: string;
  rating?: number;
  image?: string;
  isPublished?: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  causeId: string;
  cause?: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
  status: 'active' | 'cancelled' | 'paused' | 'Active';
  nextBillingAt: Date;
  nextDate?: Date;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  type: string;
  message: string;
  time?: string;
  timestamp?: Date;
  icon?: string;
  userId?: string;
  userEmail?: string;
  action?: string;
  resource?: string;
  status?: string;
}

export type Deployment = DeploymentData;
