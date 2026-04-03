import { Cause, CauseCategory, UrgencyLevel, Event, EventType, BlogPost, EventStatus } from '@/types';

export const MOCK_CAUSES: Cause[] = [
  {
    id: 'cause-1',
    title: 'Health Services Program',
    titleUrdu: 'صحت کی خدمات کا پروگرام',
    description: 'Providing comprehensive healthcare services including free medical camps, medicines, and health awareness programs to underprivileged communities.',
    descriptionUrdu: 'پسماندہ برادریوں کو مفت میڈیکل کیمپ، ادویات، اور صحت کے بارے میں آگاہی کے پروگرام سمیت جامع صحت کی خدمات فراہم کرنا۔',
    image: '/images/health-services.jpg',
    category: CauseCategory.HEALTH,
    urgency: UrgencyLevel.CRITICAL,
    goalAmount: 500000,
    raisedAmount: 325000,
    percentage: 65,
    location: 'Karachi, Pakistan',
    deadline: new Date('2026-06-30'),
    active: true,
    featured: true,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-03-20')
  },
  {
    id: 'cause-2',
    title: 'Education Support Initiative',
    titleUrdu: 'تعلیمی سپورٹ پہل',
    description: 'Supporting educational institutions, providing scholarships, and ensuring access to quality education for all children in our community.',
    descriptionUrdu: 'ہماری برادری کے تمام بچوں کے لیے تعلیمی اداروں کی حمایت، اسکالرشپس فراہم کرنا، اور معیاری تعلیم تک رسائی کو یقینی بنانا۔',
    image: '/images/about-us.jpg',
    category: CauseCategory.EDUCATION,
    urgency: UrgencyLevel.HIGH,
    goalAmount: 300000,
    raisedAmount: 185000,
    percentage: 62,
    location: 'Lahore & Rawalpindi',
    deadline: new Date('2026-08-15'),
    active: true,
    featured: true,
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-03-25')
  },
  {
    id: 'cause-3',
    title: 'Zakat Distribution Program',
    titleUrdu: 'زکوٰۃ تقسیم کا پروگرام',
    description: 'Distributing Zakat funds to eligible families and individuals according to Islamic Shariah guidelines for financial assistance.',
    descriptionUrdu: 'مالی امداد کے لیے اسلامی شرعی رہنما خطوط کے مطابق مستحق خاندانوں اور افراد میں زکوٰۃ فنڈز کی تقسیم۔',
    image: '/images/hero-banner.jpg',
    category: CauseCategory.FOOD,
    urgency: UrgencyLevel.HIGH,
    goalAmount: 1000000,
    raisedAmount: 650000,
    percentage: 65,
    location: 'Nationwide',
    deadline: new Date('2026-12-31'),
    active: true,
    featured: true,
    createdAt: new Date('2026-03-01'),
    updatedAt: new Date('2026-03-28')
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'event-1',
    title: '75th Jalsa e Aam',
    description: 'Join us for the 75th Annual General Meeting of JPSD. Review annual achievements, future plans, and community development initiatives.',
    descriptionUrdu: 'JPSD کی 75ویں سالانہ عام میٹنگ میں شرکت کریں۔ سالانہ کارکردگی، مستقبل کے منصوبے، اور کمیونیٹی ڈیولپمنٹ کے اقدامات کا جائزہ لیں۔',
    image: '/images/event-75th-jalsa.jpg',
    type: EventType.OTHER,
    status: EventStatus.UPCOMING,
    location: 'Jamiyat House, Karachi',
    address: '9 Faran Society, Hyder Ali Road, Karachi',
    startDate: new Date('2026-05-15T10:00:00'),
    endDate: new Date('2026-05-15T16:00:00'),
    registrationDeadline: new Date('2026-05-10'),
    maxParticipants: 1000,
    currentParticipants: 750,
    createdAt: new Date('2026-03-01')
  },
  {
    id: 'event-2',
    title: 'Free Medical Camp - Lahore',
    description: 'Comprehensive free medical camp offering health checkups, specialist consultations, and free medicines for the community.',
    descriptionUrdu: 'کمیونٹی کے لیے صحت کے چیک اپ، ماہرین سے مشاورت، اور مفت ادویات فراہم کرنے والا جامع مفت میڈیکل کیمپ۔',
    image: '/images/free-medical.jpeg',
    type: EventType.MEDICAL_CAMP,
    status: EventStatus.UPCOMING,
    location: 'Lahore Branch',
    address: 'Main Boulevard, Gulberg, Lahore',
    startDate: new Date('2026-04-20T09:00:00'),
    endDate: new Date('2026-04-20T17:00:00'),
    registrationDeadline: new Date('2026-04-18'),
    maxParticipants: 500,
    currentParticipants: 320,
    createdAt: new Date('2026-03-10')
  }
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'JPSD: 75 Years of Serving Humanity',
    excerpt: 'Celebrating seven and a half decades of dedicated service to the community through health, education, and welfare programs.',
    content: 'Full article content about JPSD history and achievements...',
    featuredImage: '/images/blog-75years.jpg',
    category: 'Community Service',
    authorId: 'admin-1',
    publishedAt: new Date('2026-03-15'),
    readTimeMinutes: 8,
    published: true,
    featured: true,
    views: 2500,
    createdAt: new Date('2026-03-10'),
    updatedAt: new Date('2026-03-15')
  },
  {
    id: 'blog-2',
    title: 'Health Services: Transforming Lives Through Medical Care',
    excerpt: 'Our comprehensive healthcare initiatives including medical camps, specialist consultations, and medicine distribution across Pakistan.',
    content: 'Detailed article about healthcare services and medical camps...',
    featuredImage: '/images/blog-health.jpg',
    category: 'Healthcare',
    authorId: 'admin-2',
    publishedAt: new Date('2026-03-28'),
    readTimeMinutes: 6,
    published: true,
    featured: true,
    views: 1850,
    createdAt: new Date('2026-03-20'),
    updatedAt: new Date('2026-03-28')
  }
];
