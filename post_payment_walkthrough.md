# Post-Payment Experience Walkthrough – Phase 8 Task #3
## Baitussalam (JPSD) Humanitarian Platform

---

## 🎯 Objective
Provide a premium, bilingual, and operationally transparent post-payment experience for donors, with stub infrastructure ready for real email activation.

---

## 📄 Page Specifications

### Success Page (`/donation/success`)
| Element | Specification | Implementation |
|---------|--------------|----------------|
| Query Params | `txid`, `amount`, `cause`, `donor`, `timestamp` | Read via `useSearchParams()` |
| Transaction Display | Formatted PKR amount, cause name, donor name, ISO timestamp | `Number(amount).toLocaleString('en-PK')` |
| Receipt Notice | "A digital receipt will be emailed shortly." | `t('success.receiptNotice')` |
| Share Impact Button | Opens WhatsApp with pre-filled impact message | `https://wa.me/?text=${encodeURIComponent(message)}` |
| CTAs | "Return to Dashboard" → `/dashboard`, "Donate More" → `/donate` | `router.push()` |
| Animation | Framer-motion: card fade-in + checkmark spring | `initial={{opacity:0,y:20}}` → `animate={{opacity:1,y:0}}` |
| Design | Emerald accents (`bg-emerald-600`), glassmorphism (`backdrop-blur-xl bg-white/80`) | Tailwind classes |
| Bilingual | All text via `t()` keys from LanguageContext | English/Urdu toggle supported |

### Failure Page (`/donation/failed`)
| Element | Specification | Implementation |
|---------|--------------|----------------|
| Query Params | `reason` (timeout/declined/cancelled), `prefill` (encoded form data) | Read via `useSearchParams()` |
| Reason-Specific Message | Different `t()` keys per reason | `getReasonText()` switch statement |
| Reassurance Text | "Don't worry, no charges were made to your account." | `t('failed.reassurance')` |
| Try Again Button | Redirects to `/donate?prefill=<decoded-data>` | `handleTryAgain()` with `encodeURIComponent` |
| Contact Support Link | Opens `mailto:tech-lead@jpsd.org` | `<a href="mailto:...">` |
| Design | Amber/red accents (`bg-amber-500`), non-alarming tone | Professional error state |
| Bilingual | All text via `t()` keys | English/Urdu toggle supported |

---

## 📧 Email Stub Architecture

### Core Files
| File | Purpose | Key Functions |
|------|---------|--------------|
| `src/lib/emailService.ts` | Email sending stubs | `sendDonationReceipt()`, `sendImpactSummary()` |
| `src/lib/emailTemplates.ts` | Mock HTML templates | `getReceiptHtml()`, `getImpactSummaryHtml()` |

### sendDonationReceipt() Signature
```ts
export const sendDonationReceipt = async (
  donation: DonationReceiptData,
  recipientEmail: string
): Promise<EmailSendResult> => {
  // Returns: { success: true, messageId: `EMAIL-STUB-${Date.now()}` }
}
```

### Stub Behavior
• Validates email format via regex before proceeding
• Returns mock success with unique messageId
• Logs to activity_logs with type: 'EMAIL_RECEIPT_STUB'
• Console log: [Email Stub] Receipt queued for ***@***.*** (masked for privacy)
• NEVER logs full email or donation details to console

### Real Implementation Notes (For Future Activation)
// When SMTP credentials arrive:
// 1. Install provider: npm install @sendgrid/mail (or resend/nodemailer)
// 2. Replace stub return with real API call:
//    await sgMail.send({ to: recipientEmail, templateId: 'd-xxx', dynamicTemplateData: donation })
// 3. Update activity_logs type to 'EMAIL_RECEIPT_SENT'
// 4. Add error handling for failed sends

🔗 Query Param Contract

### Success Page Params
| Param | Type | Example | Purpose |
|-------|------|---------|---------|
| txid | string | JC-ABC123 | Display transaction ID |
| amount | string | 5000 | Display formatted amount |
| cause | string | Food Security | Show supported cause |
| donor | string | Ahmed Khan | Personalize message |
| timestamp | string | 2026-04-06T10:30:00Z | Show donation time |

### Failure Page Params
| Param | Type | Example | Purpose |
|-------|------|---------|---------|
| reason | enum | declined | Show reason-specific message |
| prefill | encoded JSON | %7B"name"%3A"Ahmed"...%7D | Pre-fill donation form on retry |

### Encoding/Decoding Pattern
```ts
// Encode for redirect:
const prefill = encodeURIComponent(JSON.stringify(formData));

// Decode on failure page:
const prefillData = JSON.parse(decodeURIComponent(searchParams.get('prefill') || '{}'));
```

🌐 Bilingual Implementation Notes

### Translation Keys (LanguageContext.tsx)
```json
en: {
  success: {
    title: "Thank You for Your Generosity!",
    subtitle: "Your donation has been received",
    receiptNotice: "A digital receipt will be emailed shortly.",
    shareText: "I just supported {cause} via JPSD! Join me: https://jpsd.vercel.app"
  },
  failed: {
    title: "Payment Not Completed",
    reassurance: "Don't worry, no charges were made to your account.",
    reason: {
      timeout: "Connection timed out. Please try again.",
      declined: "Payment was declined by your bank.",
      cancelled: "Payment was cancelled by user."
    }
  }
},
ur: {
  success: {
    title: "آپ کی فراخدلی کا شکریہ!",
    subtitle: "آپ کی رقم موصول ہو گئی ہے",
    receiptNotice: "ایک ڈیجیٹل رسید جلد ای میل کی جائے گی۔",
    shareText: "میں نے جے پی ایس ڈی کے ذریعے {cause} کی مدد کی! شامل ہوں: https://jpsd.vercel.app"
  },
  failed: {
    title: "ادائیگی مکمل نہیں ہو سکی",
    reassurance: "فکر نہ کریں، آپ کے اکاؤنٹ سے کوئی رقم نہیں کاٹی گئی۔",
    reason: {
      timeout: "کنکشن ٹائم آؤٹ ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔",
      declined: "آپ کے بینک نے ادائیگی مسترد کر دی۔",
      cancelled: "ادائیگی صارف کی طرف سے منسوخ کر دی گئی۔"
    }
  }
}
```

### Implementation Pattern
```tsx
const { t, isUrdu } = useLanguage();
<h1 className="text-2xl font-bold">{t('success.title')}</h1>
```

🚀 Activation Checklist (When Real Email Provider Arrives)
- [ ] Install provider package: `npm install @sendgrid/mail` (or chosen provider)
- [ ] Add env vars to `.env.production`: `SENDGRID_API_KEY`, `EMAIL_FROM_ADDRESS`
- [ ] Replace stub return in `sendDonationReceipt()` with real API call
- [ ] Update `activity_logs` type from `EMAIL_RECEIPT_STUB` → `EMAIL_RECEIPT_SENT`
- [ ] Add error handling for failed sends (retry logic, fallback logging)
- [ ] Test with real email address in staging environment
- [ ] Enable GDPR/PDPA compliance: Add unsubscribe link to receipt template
- [ ] Monitor first 24 hours of email sends for delivery rates

🔐 Security & Privacy Notes
• NEVER log full recipient emails or donation amounts to console in production
• ALWAYS validate email format before attempting send (even in stub)
• Use server-side email triggering (never client-side) for real implementation
• Comply with GDPR/PDPA: Include unsubscribe link and privacy policy reference in real receipts
• Rotate API keys every 90 days in production
• Mask sensitive data in all logs: ***@***.*** pattern for emails

🧪 Testing Protocol (Local Development)

### Success Flow Test
1. Run `npm run dev`
2. Visit `/donate`, fill form, enable simulation mode
3. Complete stub donation
4. Verify:
   - Redirect to `/donation/success?txid=...&amount=...`
   - All query params display correctly
   - Language toggle switches all text
   - "Share on WhatsApp" opens correct URL
   - Console shows: `[Email Stub] Receipt queued for ***@***.***`
   - Firestore `activity_logs` has `EMAIL_RECEIPT_STUB` entry

### Failure Flow Test
1. Simulate payment decline (modify stub to return failure)
2. Verify:
   - Redirect to `/donation/failed?reason=declined&prefill=...`
   - Correct error message displays
   - "Try Again" redirects to `/donate` with form pre-filled
   - Language toggle works

### Email Stub Test
1. Import `sendDonationReceipt` in browser console
2. Call with test data: `sendDonationReceipt({id:'TEST', amount:5000}, 'test@example.com')`
3. Verify:
   - Returns `{ success: true, messageId: 'EMAIL-STUB-...' }`
   - `activity_logs` entry created
   - No real email sent

📦 File Reference Map
```
src/
├── app/
│   ├── donation/
│   │   ├── success/
│   │   │   └── page.tsx          # Success page component
│   │   └── failed/
│   │       └── page.tsx          # Failure page component
│   └── donate/
│       └── page.tsx              # Main donation flow (triggers email stub)
├── lib/
│   ├── emailService.ts           # Email stub functions
│   └── emailTemplates.ts         # Mock HTML templates
├── context/
│   └── LanguageContext.tsx       # Translation keys for post-payment pages
└── api/
    └── webhooks/
        └── payments/
            └── route.ts          # Webhook also triggers email stub
```

📞 Support Contacts
- Technical Lead: tech-lead@jpsd.org
- Email Provider Docs: https://sendgrid.com/docs / https://resend.com/docs
- Internal Escalation: #payments channel in JPSD Slack

Document Version: 1.0 | Last Updated: April 2026 | Owner: JPSD Tech Team
Batch Verification Complete | Phase 8 Task #3 – Post-Payment Experience Stub Implementation
