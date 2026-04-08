'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageContextType } from '@/types';

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.welfare': 'Welfare',
    'nav.education': 'Education',
    'nav.spirituality': 'Spirituality',
    'nav.gallery': 'Gallery',
    'nav.more': 'More',
    'nav.donate': 'Donate Now',
    'nav.projects': 'Projects',
    'nav.causes': 'Causes',
    'nav.news': 'News',
    'nav.events': 'Events',
    'nav.blog': 'Blog',
    'nav.publication': 'Publication',
    'nav.images': 'Images',
    'nav.videos': 'Videos',
    'nav.inflight': 'Inflight',
    'nav.zakatCalculator': 'Zakat Calculator',
    'nav.askShariah': 'Ask Shariah Advisor',
    'nav.shariahAdvisory': 'Shariah Advisory',
    'nav.globalOutreach': 'Global Outreach',
    'nav.volunteer': 'Be a Volunteer',
    'nav.contact': 'Contact Us',
    'nav.about': 'About Us',
    'nav.timeline': 'Timeline',
    'nav.duas': 'Duas',
    'nav.bayanat': 'Bayanat',
    'nav.login': 'Login',
    'nav.signup': 'Be a Donor',
    'nav.dashboard': 'My Dashboard',
    'nav.adminPortal': 'Admin Portal',
    'nav.volunteerPortal': 'Volunteer Portal',
    'nav.logout': 'Logout',
    'nav.donationCategories': 'Donation Categories',
    'nav.bankDetails': 'Bank Details',
    'nav.prayerTimes': 'Prayer Times',
    'donation.oneTime': 'One Time',
    'donation.monthly': 'Monthly',

    // Welfare Sub-Menu
    'nav.welfare.projects': 'Welfare Projects',
    'nav.welfare.causes': 'Welfare Causes',
    'nav.welfare.news': 'Welfare News',

    // Education Sub-Menu
    'nav.education.projects': 'Education Projects',
    'nav.education.causes': 'Education Causes',
    'nav.education.news': 'Education News',

    // Spirituality Sub-Menu
    'nav.spirituality.duas': 'Duas & Supplications',
    'nav.spirituality.bayanat': 'Bayanat & Lectures',
    
    // Common
    'common.readMore': 'Read more',
    'common.donate': 'Donate',
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.JPSD': 'JPSD',
    'common.management': 'Management',
    'common.rs': 'Rs.',
    'common.perMonth': 'per month',
    'common.reset': 'Reset Inputs',
    'common.goBack': 'Back',
    'common.nextStep': 'Next Step',
    
    // Home
    'home.hero.title': 'Empowering Humanity, Serving the Needy',
    'home.hero.subtitle': 'Join us in making a difference in the lives of those who need it most',
    'home.hero.badge': 'Official Humanitarian Platform',
    'home.hero.title.part1': 'Empowering',
    'home.hero.title.highlight': 'Humanity',
    'home.hero.title.part3': 'One Life at a Time.',
    'home.hero.subtitle.full': 'Join us in a global mission to alleviate human suffering through sustainable welfare, advanced education, and rapid disaster relief.',
    'home.hero.cta.donate': 'Start Donating Now',
    'home.hero.cta.programs': 'Our Programs',
    'home.hero.stat.beneficiaries': 'Beneficiaries',
    'home.hero.stat.volunteers.label': 'Volunteers',
    'home.hero.stat.countries.label': 'Countries',
    'home.hero.floating.peace': 'Peace & Hope',
    'home.hero.floating.taxFree': '100% Tax Free',
    'home.hero.floating.certified': 'Certified Donations',
    'home.stats.livesServed': 'Lives Served',
    'home.stats.donationsReceived': 'Donations Received',
    'home.stats.activePrograms': 'Active Programs',
    'home.stats.volunteers': 'Volunteers',

    // Programs Section
    'causes.missionBadge': 'Our Mission',
    'causes.title': 'Humanitarian Causes',
    'causes.subtitle': 'Support our global initiatives and bring hope to communities in desperate need of aid and relief.',
    'causes.noCampaignsFound': 'No active campaigns found',
    'causes.tryAdjustingFilters': 'Try adjusting your filters or search query.',
    'programs.badge': 'Impact Categories',
    'programs.title': 'Our Ongoing Welfare Projects',
    'programs.subtitle': 'Explore our diverse range of humanitarian initiatives designed to create sustainable change.',
    'programs.viewAll': 'View All Programs',
    'programs.donate': 'Donate Now',
    'programs.details': 'View Details',
    
    // Donation
    'donation.step1': 'Select Cause',
    'donation.step2': 'Select Amount',
    'donation.step3': 'Payment Details',
    'donation.step4': 'Confirmation',
    'donation.thankYou': 'Thank You!',
    'donation.successMessage': 'Your donation has been received',
    'donation.transactionId': 'Transaction ID',
    'donation.receiptSent': 'A receipt has been sent to ',
    'donation.backToHome': 'Back to Home',
    'donation.shareWhatsApp': 'Share on WhatsApp',
    'donation.back': 'Back',
    'donation.continue': 'Continue',
    'donation.complete': 'Complete Donation',
    'donation.cause.title': 'Select Your Cause',
    'donation.cause.subtitle': 'Choose where you want to make an impact',
    'donation.amount.title': 'Select Amount',
    'donation.amount.subtitle': 'Choose your donation amount',
    'donation.amount.placeholder': 'Enter amount',
    'donation.amount.impactMessage': 'Your donation will help provide vital resources to those in need!',
    'donation.customAmount': 'Custom Amount',
    'donation.payment.subtitle': 'Enter your information securely',
    'donation.donor.name': 'Full Name',
    'donation.donor.namePlaceholder': 'Enter your name',
    'donation.donor.email': 'Email Address',
    'donation.donor.emailPlaceholder': 'your@email.com',
    'donation.donor.phone': 'Phone Number',
    'donation.donor.phonePlaceholder': '+92-XXX-XXXXXXX',
    'donation.payment.methodTitle': 'Select Payment Method',
    'donation.payment.transferInstructions': 'Please securely transfer your donation to the following account:',
    'donation.payment.accountTitle': 'Account Title',
    'donation.payment.accountNo': 'Account No.',
    'donation.payment.bankName': 'Bank Name',
    'donation.payment.jazzcash': 'Transfer via Personal JazzCash',
    'donation.payment.jazzcashNumber': 'JazzCash Number',
    'donation.payment.easypaisa': 'Transfer via Personal EasyPaisa',
    'donation.payment.easypaisaNumber': 'EasyPaisa Number',
    'donation.payment.bankTransfer': 'Bank Account Transfer',
    'donation.payment.finalInstruction': 'After making the transfer from your app or bank, simply click "Complete Donation" below.',
    'donation.options.title': 'Donation Options',
    'donation.options.zakatLabel': 'Mark as Zakat/Sehmi',
    'donation.options.zakatDesc': 'This donation will be treated as Zakat or Sehmi',
    'donation.options.anonymousLabel': 'Make Anonymous',
    'donation.options.anonymousDesc': 'Your name will not be displayed publicly',
    'donation.security.notice': 'Your payment information is secure and encrypted',
    'donation.payment.mode.sandbox': 'Test Mode Active',
    'donation.payment.info.title': 'Payment Method Information',
    'donation.payment.info.button': 'How it works',
    'donation.options.receiptConsentLabel': 'Receive Email Receipt',
    'donation.options.receiptConsentDesc': 'I agree to receive a PDF receipt and impact updates via email.',
    'payment.info.operational.title': 'Operational Details',
    'payment.info.jazzcash.title': 'How JazzCash Works',
    'payment.info.jazzcash.step1': 'Enter your registered JazzCash mobile number',
    'payment.info.jazzcash.step2': "You'll receive an OTP for verification",
    'payment.info.jazzcash.step3': 'Confirm payment in JazzCash app',
    'payment.info.jazzcash.fees': 'Processing fee: 1.5% (max Rs. 150)',
    'payment.info.jazzcash.time': 'Processing time: Instant - 5 minutes',
    'payment.info.jazzcash.regions': 'Supported: All Pakistan',
    'payment.info.easypaisa.title': 'How EasyPaisa Works',
    'payment.info.easypaisa.step1': 'Enter your EasyPaisa account number',
    'payment.info.easypaisa.step2': 'Verify via OTP or app approval',
    'payment.info.easypaisa.step3': 'Complete payment confirmation',
    'payment.info.easypaisa.fees': 'Processing fee: 1.2% (max Rs. 120)',
    'payment.info.easypaisa.time': 'Processing time: Instant - 3 minutes',
    'payment.info.easypaisa.regions': 'Supported: All Pakistan + International cards',

    // Welfare Page
    'welfare.badge': 'HUMANITARIAN RELIEF',
    'welfare.title': 'Our Welfare Initiatives',
    'welfare.subtitle': 'Dedicated to alleviating poverty, providing emergency response, and building sustainable futures for the underprivileged.',
    'welfare.service.projects.title': 'Active Projects',
    'welfare.service.projects.desc': 'Explore our ongoing welfare projects aimed at uplifting communities and providing sustainable relief.',
    'welfare.service.causes.title': 'Current Causes',
    'welfare.service.causes.desc': 'Support immediate humanitarian causes. Your contributions can bring instant relief to those in crisis.',
    'welfare.service.news.title': 'Welfare News',
    'welfare.service.news.desc': 'Stay updated with the latest news, impact reports, and updates on how your donations change lives.',
    'welfare.cta.explore': 'Explore',
    'welfare.impact.title': 'Together we can do more',
    'welfare.impact.desc': 'Your support enables us to continue our vital welfare work locally and internationally.',
    'welfare.impact.btn': 'Donate to Welfare Fund',

    // Footer
    'footer.about': 'Jamiyat Punjabi Saudagran-e-Delhi (JPSD) is a divine gift from Allah Ta\'ala, which has become a beacon of hope & mercy for the needy in our beloved country.',
    'footer.quickLinks': 'Quick Links',
    'footer.contactUs': 'Contact Us',
    'footer.newsletter': 'Newsletter',
    'footer.newsletterDesc': 'Subscribe to our newsletter to receive updates on our latest initiatives.',
    'footer.emailPlaceholder': 'Your email address',
    'footer.subscribe': 'Subscribe Now',
    'footer.rights': 'All Rights Reserved',
    'footer.address': '128 - O, Block 2 PECHS, Karachi, Pakistan - 75400',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.shariah': 'Shariah Compliance',
    'footer.zakat': 'Zakat Policy',
    
    // Zakat
    'zakat.title': 'Zakat Calculator',
    'zakat.subtitle': 'Determine your Zakat obligation with our easy-to-use calculator based on shariah principles.',
    'zakat.assets': 'Your Assets',
    'zakat.liabilities': 'Liabilities',
    'zakat.gold': 'Gold & Jewelry',
    'zakat.silver': 'Silver',
    'zakat.cash': 'Cash on Hand',
    'zakat.bank': 'Bank Balance',
    'zakat.shares': 'Shares & Stocks',
    'zakat.merchandise': 'Business Merchandise',
    'zakat.receivables': 'Receivables',
    'zakat.debt': 'Short-term Debt',
    'zakat.bills': 'Bills Payable',
    'zakat.result': 'Calculation Summary',
    'zakat.netWealth': 'Net Wealth',
    'zakat.obligation': 'Your Zakat Obligation',
    'zakat.nisabNotice': 'Nisab threshold not met',
    'zakat.donateNow': 'Donate Zakat Now',
    'zakat.guidance.nisab.title': 'What is Nisab?',
    'zakat.guidance.nisab.desc': 'Minimum wealth threshold that makes Zakat calculation mandatory.',
    'zakat.guidance.rate.title': 'What is the rate?',
    'zakat.guidance.rate.desc': 'The rate is fixed at 2.5% of your annual surplus wealth.',
    'zakat.guidance.when.title': 'When to pay?',
    'zakat.guidance.when.desc': 'Paid once a lunar year on savings that have been held for full year.',
    
    // Categories
    'category.all': 'All',
    'category.food': 'Food',
    'category.health': 'Health',
    'category.education': 'Education',
    'category.water': 'Water',
    
    'sort.highest_percentage': 'Highest Percentage',

    // Admin HQ
    'admin.hq.title': 'JPSD HQ Intel',
    'admin.hq.subtitle': 'Global Humanitarian Command Center',
    'admin.search.placeholder': 'Find Donor / Volunteer (Phone or CNIC)',
    'admin.stats.activeMissions': 'Active Missions',
    'admin.stats.impactMagnitude': 'Impact Magnitude',
    'admin.activity.stream': 'Recent Activity Stream',

    // Volunteer Portal
    'volunteer.hub.title': 'Volunteer Hub',
    'volunteer.hub.subtitle': 'Field Deployment Unit',
    'volunteer.stats.hours': 'Hours Deployed',
    'volunteer.stats.rank': 'Active Rank',
    'volunteer.mission.initiate': 'Initiate Mission',
    'volunteer.mission.status.open': 'Open for Mission',

    // Donor Portal
    'donor.heritage.title': 'Impact Heritage',
    'donor.heritage.welcome': 'Welcome, Humanitarian',
    'donor.stats.lives': 'Lives Sustained',
    'donor.stats.impact': 'Impact Score',
    'donor.transactions.title': 'Impact Transactions',
    'donor.receipt.download': 'Download Official Receipt',

    // Chatbot
    // Chatbot
    'chatbot.title': 'JPSD Assistant',
    'signup.title': 'Join the Mission',
    'signup.joinMission': 'Join the Strategic Mission',
    'signup.subtitle': 'Help us reach those who need it most.',
    'signup.donor': 'Be a Donor',
    'signup.volunteer': 'Be a Volunteer',
    'signup.professional': 'Be a Professional',
    'signup.youth': 'Be a Youth Member',
    'signup.fullName': 'Full Identity Name',
    'signup.fullNamePlaceholder': 'Full Name',
    'signup.email': 'Email Directive',
    'signup.emailPlaceholder': 'Email Address',
    'signup.cnicPlaceholder': 'CNIC (00000-0000000-0)',
    'signup.communityPlaceholder': 'Community / Biradri',
    'signup.phone': 'Mobile Number',
    'signup.phonePlaceholder': 'Phone (03XX-XXXXXXX)',
    'signup.password': 'Choose a Strong Password',
    'signup.passwordPlaceholder': '••••••••',
    'signup.skills': 'Expertise / Skills',
    'signup.skillsPlaceholder': 'What is your profession or contribution area?',
    'signup.institution': 'Educational Institution',
    'signup.institutionPlaceholder': 'Where do you study? (For Youth Member)',
    'signup.next': 'Next Step',
    'signup.submit': 'Complete Signup',
    'signup.loading': 'Creating Account...',
    'signup.error': 'Form Data Correction Required',
    'signup.alreadyRegistered': 'Already registered?',
    'signup.signIn': 'Sign in here',
    'signup.success.title': 'Verification Sent',
    'signup.success.donor': 'Account created! You can now log in and start your journey.',
    'signup.success.volunteer': 'Account created! Please check your email for verification. Once verified, an admin will review your profile.',
    'signup.success.professional': 'Account created! You can now offer your specialized services to the community.',
    'signup.success.youth': 'Account created! Welcome to the JPSD Youth Division. We have exciting opportunities for you.',
    'signup.success.button': 'Proceed to Login',
    'chatbot.status': 'Active',
    'chatbot.placeholder': 'Type your query here...',
    
    // Login
    'login.title': 'Welcome Back',
    'login.subtitle': 'Continue your journey of making an impact.',
    'login.emailLabel': 'Email Address',
    'login.passwordLabel': 'Secure Password',
    'login.staySignedIn': 'Stay Signed In',
    'login.forgotPassword': 'Forgot Password?',
    'login.signIn': 'Sign In',
    'login.authenticating': 'Authenticating...',
    'login.noAccount': "Don't have an account?",
    'login.joinMission': 'Join the Mission',
    'login.resetSent': 'Password reset link has been sent to ',
    'login.enterEmail': 'Please enter your email to reset password.',

    // Success Page
    'success.title': 'Payment Successful',
    'success.subtitle': 'Your contribution is making a world of difference.',
    'success.orderSummary': 'Donation Summary',
    'success.receiptNotice': 'A digital receipt will be emailed shortly.',
    'success.shareImpact': 'Share Your Impact',
    'success.returnDashboard': 'Return to Dashboard',
    'success.donateMore': 'Donate More',
    'success.shareText': 'I just donated to Baitussalam (JPSD) for {cause}. Join me in making an impact!',
    
    // Failure Page
    'failed.title': 'Payment Incomplete',
    'failed.subtitle': "We couldn't process your donation at this time.",
    'failed.reason.timeout': 'Transaction timed out. Connection was lost.',
    'failed.reason.declined': 'The payment was declined by your bank or provider.',
    'failed.reason.cancelled': 'The transaction was cancelled.',
    'failed.reassurance': 'Don\'t worry, no charges were made to your account.',
    'failed.tryAgain': 'Try Again',
    'failed.contactSupport': 'Contact Support',
    
    // Email/System Stubs
    'email.stubNotice': 'SYSTEM STUB: Real emails will be active once SMTP credentials are provided.',
    'email.receiptQueued': '[Email Stub] Receipt queued for {email}',
  },
  ur: {
    // Navigation
    'nav.home': 'ہوم',
    'nav.welfare': 'فلاح',
    'nav.education': 'تعلیم',
    'nav.spirituality': 'روحانیت',
    'nav.gallery': 'گیلری',
    'nav.more': 'مزید',
    'nav.donate': 'ابھی عطیہ کریں',
    'nav.projects': 'منصوبے',
    'nav.causes': 'مقاصد',
    'nav.news': 'خبریں',
    'nav.events': 'ایونٹس',
    'nav.blog': 'بلاگ',
    'nav.duas': 'دعائیں',
    'nav.bayanat': 'بیانات',
    'nav.shariahAdvisory': 'شرعی مشورہ',
    'nav.globalOutreach': 'گلوبل آؤٹ ریچ',
    'nav.publication': 'اشاعت',
    'nav.images': 'تصاویر',
    'nav.videos': 'ویڈیوز',
    'nav.inflight': 'ان فلائٹ',
    'nav.zakatCalculator': 'زکوٰۃ کیلکولیٹر',
    'nav.askShariah': 'شریعہ ایڈوائزر سے پوچھیں',
    'nav.volunteer': 'رضاکار بنیں',
    'nav.contact': 'رابطہ کریں',
    'nav.about': 'ہمارے بارے میں',
    'nav.timeline': 'ٹائم لائن',
    'nav.login': 'لاگ ان',
    'nav.signup': 'ڈونر بنیں',
    'nav.dashboard': 'میرا ڈیش بورڈ',
    'nav.adminPortal': 'ایڈمن پورٹل',
    'nav.volunteerPortal': 'رضاکار پورٹل',
    'nav.logout': 'لاگ آؤٹ',
    'nav.donationCategories': 'عطیہ کی اقسام',
    'nav.bankDetails': 'بینک تفصیلات',
    'nav.prayerTimes': 'نماز کے اوقات',
    'donation.oneTime': 'ایک بار',
    'donation.monthly': 'ماہانہ',

    // Welfare Sub-Menu
    'nav.welfare.projects': 'فلاحی منصوبے',
    'nav.welfare.causes': 'فلاحی مقاصد',
    'nav.welfare.news': 'فلاحی خبریں',

    // Education Sub-Menu
    'nav.education.projects': 'تعلیمی منصوبے',
    'nav.education.causes': 'تعلیمی مقاصد',
    'nav.education.news': 'تعلیمی خبریں',

    // Spirituality Sub-Menu
    'nav.spirituality.duas': 'دعائیں و اذکار',
    'nav.spirituality.bayanat': 'بیانات و دروس',
    
    // Common
    'common.readMore': 'مزید پڑھیں',
    'common.donate': 'عطیہ کریں',
    'common.learnMore': 'مزید جانیں',
    'common.viewAll': 'سب دیکھیں',
    'common.loading': 'لوڈ ہو رہا ہے...',
    'common.error': 'خرابی',
    'common.success': 'کامیابی',
    'common.JPSD': 'جمعیت پنجابی سوداگرانِ دہلی (JPSD)',
    'common.management': 'مینجمنٹ',
    'common.rs': 'روپے',
    'common.perMonth': 'ماہانہ',
    'common.reset': 'دوبارہ شروع کریں',
    'common.goBack': 'پیچھے جائیں',
    'common.nextStep': 'اگلا قدم',
    
    // Home
    'home.hero.title': 'انسانیت کو بااختیار بنانا، ضرورت مندوں کی خدمت',
    'home.hero.subtitle': 'ان لوگوں کی زندگیوں میں فرق لانے کے لیے ہمارے شامل ہوں جنہیں اس کی سب سے زیادہ ضرورت ہے',
    'home.hero.badge': 'آفیشل ہیومینیٹیرین پلیٹ فارم',
    'home.hero.title.part1': 'انسانیت کو',
    'home.hero.title.highlight': 'بااختیار بنانا',
    'home.hero.title.part3': 'برائے خدمتِ خلق',
    'home.hero.subtitle.full': 'ان لوگوں کی زندگیوں میں فرق لانے کے لیے ہمارے شامل ہوں جنہیں اس کی سب سے زیادہ ضرورت ہے',
    'home.hero.cta.donate': 'ابھی عطیہ شروع کریں',
    'home.hero.cta.programs': 'ہمارے پروگرام',
    'home.hero.stat.beneficiaries': 'مستحقین',
    'home.hero.stat.volunteers.label': 'رضاکار',
    'home.hero.stat.countries.label': 'ممالک',
    'home.hero.floating.peace': 'امن اور امید',
    'home.hero.floating.taxFree': '۱۰۰٪ ٹیکس فری',
    'home.hero.floating.certified': 'تصدیق شدہ عطیات',
    'home.stats.livesServed': 'زندگیاں متاثر ہوئیں',
    'home.stats.donationsReceived': 'وصول شدہ عطیات',
    'home.stats.activePrograms': 'فعال پروگرام',
    'home.stats.volunteers': 'رضاکار',

    // Programs Section
    'causes.missionBadge': 'ہمارا مشن',
    'causes.title': 'انسانیت کے مقاصد',
    'causes.subtitle': 'ہمارے عالمی اقدامات کی حمایت کریں اور شدید ضرورت مند برادریوں کے لیے امید اور امداد لائیں۔',
    'causes.noCampaignsFound': 'کوئی فعال مہم نہیں ملی',
    'causes.tryAdjustingFilters': 'براہ کرم اپنے فلٹرز یا سرچ کیوری کو ایڈجسٹ کریں۔',
    'programs.badge': 'اثرات کے زمرے',
    'programs.title': 'ہمارے جاری فلاحی منصوبے',
    'programs.subtitle': 'پائیدار تبدیلی لانے کے لیے تیار کردہ ہمارے متنوع انسانی فلاحی منصوبوں کو دریافت کریں۔',
    'programs.viewAll': 'تمام پروگرام دیکھیں',
    'programs.donate': 'ابھی عطیہ کریں',
    'programs.details': 'تفصیل دیکھیں',
    
    // Donation
    'donation.step1': 'مقصد منتخب کریں',
    'donation.step2': 'رقم منتخب کریں',
    'donation.step3': 'ادائیگی کی تفصیلات',
    'donation.step4': 'تصدیق',
    'donation.thankYou': 'آپ کا شکریہ!',
    'donation.successMessage': 'آپ کا عطیہ موصول ہو گیا ہے',
    'donation.transactionId': 'ٹرانزیکشن آئی ڈی',
    'donation.receiptSent': 'عطیہ کی رسید اس ای میل پر بھیج دی گئی ہے: ',
    'donation.backToHome': 'ہوم پیج پر جائیں',
    'donation.shareWhatsApp': 'واٹس ایپ پر شیئر کریں',
    'donation.back': 'واپس جائیں',
    'donation.continue': 'جاری رکھیں',
    'donation.complete': 'عطیہ مکمل کریں',
    'donation.cause.title': 'اپنا مقصد منتخب کریں',
    'donation.cause.subtitle': 'منتخب کریں کہ آپ کہاں اثر ڈالنا چاہتے ہیں',
    'donation.amount.title': 'رقم منتخب کریں',
    'donation.amount.subtitle': 'اپنی عطیہ کی رقم منتخب کریں',
    'donation.amount.placeholder': 'رقم درج کریں',
    'donation.amount.impactMessage': 'آپ کا عطیہ ضرورت مندوں کو اہم وسائل فراہم کرنے میں مدد کرے گا!',
    'donation.customAmount': 'اپنی رقم',
    'donation.payment.subtitle': 'اپنی معلومات محفوظ طریقے سے درج کریں',
    'donation.donor.name': 'مکمل نام',
    'donation.donor.namePlaceholder': 'اپنا نام درج کریں',
    'donation.donor.email': 'ای میل ایڈریس',
    'donation.donor.emailPlaceholder': 'ای میل ایڈریس',
    'donation.donor.phone': 'فون نمبر',
    'donation.donor.phonePlaceholder': 'فون نمبر',
    'donation.payment.methodTitle': 'ادائیگی کا طریقہ منتخب کریں',
    'donation.payment.transferInstructions': 'براہ کرم اپنا عطیہ درج ذیل اکاؤنٹ میں منتقل کریں:',
    'donation.payment.accountTitle': 'اکاؤنٹ ٹائٹل',
    'donation.payment.accountNo': 'اکاؤنٹ نمبر',
    'donation.payment.bankName': 'بینک کا نام',
    'donation.payment.jazzcash': 'پرسنل جاز کیش کے ذریعے منتقل کریں',
    'donation.payment.jazzcashNumber': 'جاز کیش نمبر',
    'donation.payment.easypaisa': 'پرسنل ایزی پیسہ کے ذریعے منتقل کریں',
    'donation.payment.easypaisaNumber': 'ایزی پیسہ نمبر',
    'donation.payment.bankTransfer': 'بینک اکاؤنٹ ٹرانسفر',
    'donation.payment.finalInstruction': 'اپنے ایپ یا بینک سے رقم منتقل کرنے کے بعد، نیچے "عطیہ مکمل کریں" پر کلک کریں۔ ہماری ٹیم آپ کے نام سے ادائیگی کی تصدیق کرے گی۔',
    'donation.options.title': 'عطیہ کے اختیارات',
    'donation.options.zakatLabel': 'بطور زکوٰۃ/سہمی نشان زد کریں',
    'donation.options.zakatDesc': 'یہ عطیہ زکوٰۃ یا سہمی کے طور پر استعمال کیا جائے گا',
    'donation.options.anonymousLabel': 'گمنام عطیہ کریں',
    'donation.options.anonymousDesc': 'آپ کا نام عوامی طور پر ظاہر نہیں کیا جائے گا',
    'donation.security.notice': 'آپ کی معلومات مکمل محفوظ اور انکرپٹڈ ہے',
    'donation.payment.mode.sandbox': 'ٹیسٹ موڈ فعال ہے',
    'donation.payment.info.title': 'ادائیگی کے طریقے کی معلومات',
    'donation.payment.info.button': 'یہ کیسے کام کرتا ہے؟',
    'donation.options.receiptConsentLabel': 'ای میل رسید وصول کریں',
    'donation.options.receiptConsentDesc': 'میں ای میل کے ذریعے پی ڈی ایف رسید اور اپ ڈیٹس وصول کرنے پر راضی ہوں۔',
    'payment.info.operational.title': 'آپریشنل تفصیلات',
    'payment.info.jazzcash.title': 'جیزکیش کیسے کام کرتا ہے',
    'payment.info.jazzcash.step1': 'اپنا رجسٹرڈ جیزکیش نمبر درج کریں',
    'payment.info.jazzcash.step2': 'تصدیق کے لیے آپ کو OTP موصول ہوگا',
    'payment.info.jazzcash.step3': 'جیزکیش ایپ میں ادائیگی کی تصدیق کریں',
    'payment.info.jazzcash.fees': 'پروسسنگ فیس: 1.5% (زیادہ سے زیادہ 150 روپے)',
    'payment.info.jazzcash.time': 'پروسسنگ وقت: فوری - 5 منٹ',
    'payment.info.jazzcash.regions': 'سپورٹڈ: پورے پاکستان میں',
    'payment.info.easypaisa.title': 'ایزی پیسہ کیسے کام کرتا ہے',
    'payment.info.easypaisa.step1': 'اپنا ایزی پیسہ اکاؤنٹ نمبر درج کریں',
    'payment.info.easypaisa.step2': 'OTP یا ایپ کے ذریعے تصدیق کریں',
    'payment.info.easypaisa.step3': 'ادائیگی کی تصدیق مکمل کریں',
    'payment.info.easypaisa.fees': 'پروسسنگ فیس: 1.2% (زیادہ سے زیادہ 120 روپے)',
    'payment.info.easypaisa.time': 'پروسسنگ وقت: فوری - 3 منٹ',
    'payment.info.easypaisa.regions': 'سپورٹڈ: پورے پاکستان + بین الاقوامی کارڈز',

    // Welfare Page
    'welfare.badge': 'انسانی ہمدردی کی بنیاد پر امداد',
    'welfare.title': 'ہمارے فلاحی اقدامات',
    'welfare.subtitle': 'غربت کے خاتمے، ہنگامی امداد فراہم کرنے، اور پسماندہ افراد کے لیے پائیدار مستقبل بنانے کے لیے وقف۔',
    'welfare.service.projects.title': 'فعال منصوبے',
    'welfare.service.projects.desc': 'ہمارے جاری فلاحی منصوبوں کو دریافت کریں جن کا مقصد کمیونٹیز کو اوپر اٹھانا اور پائیدار امداد فراہم کرنا ہے۔',
    'welfare.service.causes.title': 'موجودہ مقاصد',
    'welfare.service.causes.desc': 'فوری انسانی مقاصد کی حمایت کریں۔ آپ کے عطیات بحران کا سامنا کرنے والوں کو فوری راحت پہنچا سکتے ہیں۔',
    'welfare.service.news.title': 'فلاحی خبریں',
    'welfare.service.news.desc': 'تازہ ترین خبروں، رپورٹوں، اور اپ ڈیٹس کے ساتھ باخبر رہیں کہ آپ کے عطیات کس طرح زندگیاں بدل رہے ہیں۔',
    'welfare.cta.explore': 'دریافت کریں',
    'welfare.impact.title': 'مل کر ہم مزید کام کر سکتے ہیں',
    'welfare.impact.desc': 'آپ کا تعاون ہمیں اپنے اہم فلاحی کاموں کو مقامی اور بین الاقوامی سطح پر جاری رکھنے کے قابل بناتا ہے۔',
    'welfare.impact.btn': 'فلاحی فنڈ میں عطیہ کریں',

    // Footer
    'footer.about': 'جمعیت پنجابی سوداگرانِ دہلی (JPSD) اللہ تعالیٰ کی ایک الہی تحفہ ہے، جو ہمارے پیارے ملک میں ضرورت مندوں کے لیے امید اور رحمت کی کرن بن گیا ہے۔',
    'footer.quickLinks': 'فوری لنکس',
    'footer.contactUs': 'رابطہ کریں',
    'footer.newsletter': 'نیوز لیٹر',
    'footer.newsletterDesc': 'ہمارے تازہ ترین اقدامات کے بارے میں اپ ڈیٹس حاصل کرنے کے لیے ہمارے نیوز لیٹر کو سبسکرائب کریں۔',
    'footer.emailPlaceholder': 'آپ کا ای میل پتہ',
    'footer.subscribe': 'ابھی سبسکرائب کریں',
    'footer.rights': 'جملہ حقوق محفوظ ہیں',
    'footer.address': '128 - O، بلاک 2 پی ای سی ایچ ایس، کراچی، پاکستان - 75400',
    'footer.privacy': 'پرائیویسی پالیسی',
    'footer.terms': 'شرائط و ضوابط',
    'footer.shariah': 'شرعی تعمیل',
    'footer.zakat': 'زکوٰۃ پالیسی',
    
    // Zakat
    'zakat.title': 'زکوٰۃ کیلکولیٹر',
    'zakat.subtitle': 'شریعت کے اصولوں کے مطابق ہمارے آسان کیلکولیٹر کے ذریعے اپنی زکوٰۃ کی ذمہ داری معلوم کریں۔',
    'zakat.assets': 'آپ کے اثاثے',
    'zakat.liabilities': 'واجبات',
    'zakat.gold': 'سونا اور زیورات',
    'zakat.silver': 'چاندی',
    'zakat.cash': 'نقد رقم',
    'zakat.bank': 'بینک بیلنس',
    'zakat.shares': 'حصص اور اسٹاک',
    'zakat.merchandise': 'تجارتی مال',
    'zakat.receivables': 'قابل وصول رقم',
    'zakat.debt': 'قرضہ جات',
    'zakat.bills': 'واجب الادا بل',
    'zakat.result': 'حساب کا خلاصہ',
    'zakat.netWealth': 'کل مالیت',
    'zakat.obligation': 'آپ کی زکوٰۃ کی رقم',
    'zakat.nisabNotice': 'نصاب کی حد پوری نہیں ہوئی',
    'zakat.donateNow': 'ابھی زکوٰۃ ادا کریں',
    'zakat.guidance.nisab.title': 'نصاب کیا ہے؟',
    'zakat.guidance.nisab.desc': 'نصاب دولت کی وہ کم از کم رقم ہے جس پر زکوٰۃ واجب ہوتی ہے۔',
    'zakat.guidance.rate.title': 'شرح کیا ہے؟',
    'zakat.guidance.rate.desc': 'زکوٰۃ کی شرح آپ کی کل بچت کا ۲.۵ فیصد مقرر کی گئی ہے۔',
    'zakat.guidance.when.title': 'کب ادا کریں؟',
    'zakat.guidance.when.desc': 'زکوٰۃ ہر سال اسلامی مہینے کے مطابق ادا کی جانی چاہیے۔',
    
    // Categories
    'category.all': 'تمام',
    'category.food': 'خوراک',
    'category.health': 'صحت',
    'category.education': 'تعلیم',
    'category.water': 'پانی',
    
    'sort.highest_percentage': 'اعلی فیصد',

    // Admin HQ
    'admin.hq.title': 'جے پی ایس ڈی ہیڈ کوارٹر انٹیل',
    'admin.hq.subtitle': 'عالمی انسانی کمانڈ سینٹر',
    'admin.search.placeholder': 'ڈونر یا رضاکار تلاش کریں (فون یا شناختی کارڈ)',
    'admin.stats.activeMissions': 'فعال مشنز',
    'admin.stats.impactMagnitude': 'عطیہ کی کل مقدار',
    'admin.activity.stream': 'سسٹم کی سرگرمیوں کی تفصیل',

    // Volunteer Portal
    'volunteer.hub.title': 'رضاکار ہب',
    'volunteer.hub.subtitle': 'فیلڈ آپریشن یونٹ',
    'volunteer.stats.hours': 'خدمت کے گھنٹے',
    'volunteer.stats.rank': 'فعال رینک',
    'volunteer.mission.initiate': 'مشن شروع کریں',
    'volunteer.mission.status.open': 'مشن کے لیے دستیاب',

    // Donor Portal
    'donor.heritage.title': 'آپ کی خدمات کا ریکارڈ',
    'donor.heritage.welcome': 'خوش آمدید، خدمتِ خلق کے ساتھی',
    'donor.stats.lives': 'متاثرہ زندگیاں',
    'donor.stats.impact': 'آپ کا سکور',
    'donor.transactions.title': 'خیراتی لین دین',
    'donor.receipt.download': 'رسید ڈاؤن لوڈ کریں',

    // Chatbot
    // Chatbot
    'chatbot.title': 'جے پی ایس ڈی ہیڈ کوارٹر انٹیلی جنس',
    'signup.title': 'مشق میں شامل ہوں',
    'signup.subtitle': 'ان لوگوں تک پہنچنے میں ہماری مدد کریں جنہیں اس کی سب سے زیادہ ضرورت ہے۔',
    'signup.donor': 'عطیہ دہندہ بنیں',
    'signup.volunteer': 'رضاکار بنیں',
    'signup.professional': 'پروفیشنل بنیں',
    'signup.youth': 'نوجوان رکن بنیں',
    'signup.fullName': 'مکمل شناختی نام',
    'signup.fullNamePlaceholder': 'مکمل نام',
    'signup.email': 'ای میل ایڈریس',
    'signup.emailPlaceholder': 'ای میل ایڈریس',
    'signup.cnicPlaceholder': 'شناختی کارڈ نمبر (XXXXX-XXXXXXX-X)',
    'signup.communityPlaceholder': 'برادری / کمیونٹی',
    'signup.phone': 'موبائل نمبر',
    'signup.phonePlaceholder': 'فون نمبر (03XX-XXXXXXX)',
    'signup.password': 'ایک مضبوط پاس ورڈ منتخب کریں',
    'signup.passwordPlaceholder': '••••••••',
    'signup.skills': 'مہارتیں اور تجربہ',
    'signup.skillsPlaceholder': 'آپ کا پیشہ یا مہارت کا شعبہ کیا ہے؟',
    'signup.institution': 'تعلیمی ادارہ',
    'signup.institutionPlaceholder': 'آپ کہاں تعلیم حاصل کرتے ہیں؟ (صرف نوجوان اراکین کے لیے)',
    'signup.next': 'اگلا مرحلہ',
    'signup.submit': 'رجسٹریشن مکمل کریں',
    'signup.loading': 'اکاؤنٹ بنایا جا رہا ہے...',
    'signup.error': 'فارم ڈیٹا کی تصحیح درکار ہے',
    'signup.alreadyRegistered': 'پہلے سے رجسٹرڈ ہیں؟',
    'signup.signIn': 'یہاں سائن ان کریں',
    'signup.success.title': 'تصدیق ای میل ارسال کر دی گئی',
    'signup.success.donor': 'اکاؤنٹ بن گیا ہے! اب آپ لاگ ان کر کے اپنا سفر شروع کر سکتے ہیں۔',
    'signup.success.volunteer': 'اکاؤنٹ بن گیا ہے! براہ کرم تصدیق کے لیے اپنی ای میل چیک کریں۔ تصدیق کے بعد، ایک ایڈمن آپ کے پروفائل کا جائزہ لے گا۔',
    'signup.success.professional': 'اکاؤنٹ بن گیا ہے! اب آپ کمیونٹی کو اپنی خصوصی خدمات پیش کر سکتے ہیں۔',
    'signup.success.youth': 'اکاؤنٹ بن گیا ہے! جے پی ایس ڈی یوتھ ڈویژن میں خوش آمدید۔ ہمارے پاس آپ کے لیے دلچسپ مواقع ہیں۔',
    'signup.success.button': 'لاگ ان کی طرف بڑھیں',
    'chatbot.status': 'فعال',
    'chatbot.placeholder': 'اپنی درخواست یہاں لکھیں...',

    // Login
    'login.title': 'خوش آمدید',
    'login.subtitle': 'خیر کے اس سفر میں اپنی شراکت جاری رکھیں۔',
    'login.emailLabel': 'ای میل ایڈریس',
    'login.passwordLabel': 'پاس ورڈ',
    'login.staySignedIn': 'سائن ان رہیں',
    'login.forgotPassword': 'پاس ورڈ بھول گئے؟',
    'login.signIn': 'لاگ ان کریں',
    'login.authenticating': 'تصدیق ہو رہی ہے...',
    'login.noAccount': 'اکاؤنٹ نہیں ہے؟',
    'login.joinMission': 'خیر کے کاموں کا حصہ بنیں',
    'login.resetSent': 'پاس ورڈ ری سیٹ لنک اس ای میل پر بھیج دیا گیا ہے: ',
    'login.enterEmail': 'پاس ورڈ ری سیٹ کرنے کے لیے براہ کرم اپنا ای میل درج کریں۔',

    // Success Page
    'success.title': 'ادائیگی کامیاب',
    'success.subtitle': 'آپ کا عطیہ دنیا بدلنے میں مددگار ثابت ہو رہا ہے۔',
    'success.orderSummary': 'عطیہ کا خلاصہ',
    'success.receiptNotice': 'عطیہ کی ڈیجیٹل رسید جلد ہی ای میل کر دی جائے گی۔',
    'success.shareImpact': 'اپنی نیکی شیئر کریں',
    'success.returnDashboard': 'ڈیش بورڈ پر واپس جائیں',
    'success.donateMore': 'مزید عطیہ کریں',
    'success.shareText': 'میں نے ابھی بیت السلام (JPSD) کو {cause} کے لیے عطیہ دیا ہے۔ آپ بھی میرے ساتھ مل کر نیکی کا حصہ بنیں!',
    
    // Failure Page
    'failed.title': 'ادائیگی نامکمل',
    'failed.subtitle': 'ہم اس وقت آپ کی ادائیگی پروسس نہیں کر سکے۔',
    'failed.reason.timeout': 'ٹرانزیکشن کا وقت ختم ہو گیا۔ رابطہ منقطع ہو گیا۔',
    'failed.reason.declined': 'آپ کے بینک یا فراہم کنندہ نے ادائیگی مسترد کر دی۔',
    'failed.reason.cancelled': 'ٹرانزیکشن منسوخ کر دی گئی۔',
    'failed.reassurance': 'پریشان نہ ہوں، آپ کے اکاؤنٹ سے کوئی کٹوتی نہیں کی گئی۔',
    'failed.tryAgain': 'دوبارہ کوشش کریں',
    'failed.contactSupport': 'سپورٹ سے رابطہ کریں',
    
    // Email/System Stubs
    'email.stubNotice': 'سسٹم سٹب: SMTP کریڈینشلز ملنے کے بعد اصل ای میلز فعال ہو جائیں گی۔',
    'email.receiptQueued': '[ای میل سٹب] رسید {email} کے لیے قطار میں لگا دی گئی ہے',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  isUrdu: false,
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'ur'>('en');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ur' | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
      document.documentElement.dir = savedLanguage === 'ur' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLanguage;
      
      // Apply Urdu font class to body when language is Urdu
      if (savedLanguage === 'ur') {
        document.body.classList.add('urdu-language');
      } else {
        document.body.classList.remove('urdu-language');
      }
    }
  }, []);

  const setLanguage = (lang: 'en' | 'ur') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Add/remove Urdu language class for font switching
    if (lang === 'ur') {
      document.body.classList.add('urdu-language');
    } else {
      document.body.classList.remove('urdu-language');
    }
  };

  const t = (key: string): string => {
    // @ts-ignore - Handle missing keys gracefully
    return translations[language][key] || key;
  };

  const isUrdu = language === 'ur';

  return (
    <LanguageContext.Provider value={{ language, isUrdu, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

