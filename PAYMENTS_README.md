# Payment Gateway Integration Guide (BHPGP)
## Baitussalam Humanitarian Payment Gateway Protocol

⚠️ Current Status: SIMULATION MODE ONLY
Real credentials are NOT available. All payment flows currently use mock/simulated responses.

Credential Requirements (For Future Live Integration)

JazzCash Merchant Credentials:
| Variable | Description | Example |
| NEXT_PUBLIC_JAZZCASH_MERCHANT_ID | Merchant ID from JazzCash portal | MC12345 |
| JAZZCASH_PASSWORD | API password for authentication | ******** |
| JAZZCASH_INTEGRITY_SALT | Salt for signature generation | ******** |
| PAYMENT_MODE | sandbox or production | sandbox |

EasyPaisa Merchant Credentials:
| Variable | Description | Example |
| NEXT_PUBLIC_EASYPAISA_MERCHANT_ID | Merchant ID from EasyPaisa portal | EP12345 |
| EASYPAISA_API_KEY | API key for authentication | ******** |
| EASYPAISA_STORE_ID | Store identifier | ST001 |
| PAYMENT_MODE | sandbox or production | sandbox |

Sandbox vs Production Setup:
Step 1: Environment Configuration
PAYMENT_MODE=sandbox
NEXT_PUBLIC_JAZZCASH_MERCHANT_ID=your_sandbox_merchant_id
JAZZCASH_PASSWORD=your_sandbox_password
NEXT_PUBLIC_EASYPAISA_MERCHANT_ID=your_sandbox_merchant_id
EASYPAISA_API_KEY=your_sandbox_api_key

Step 2: Testing Credentials
| Provider | Test Number | Expected Result |
| JazzCash | 03001234567 | Success |
| JazzCash | 03009999999 | Failure |
| EasyPaisa | 03451234567 | Success |
| EasyPaisa | 03459999999 | Failure |

Step 3: Switch to Production
PAYMENT_MODE=production (ONLY after credential verification)

Webhook Setup Guide:
Step 1: Register Webhook URL
Webhook Endpoint: https://jpsd.vercel.app/api/webhooks/payments
Supported Events: payment.success, payment.failed, refund.processed

Step 2: Verify Signature
const signature = req.headers['x-payment-signature'];
const isValid = verifySignature(req.body, signature, WEBHOOK_SECRET);

Step 3: Handle Events
Log all events to activity_logs collection with type: 'PAYMENT_WEBHOOK'

Testing Simulation Mode:
1. Visit /donate page
2. Enable "Simulation Protocol" toggle (top-right)
3. Select JazzCash or EasyPaisa payment method
4. Enter donation amount and donor details
5. Click "Pay Now"
6. Verify: Mock transaction ID generated, Custom success modal appears, activity_logs entry created, Firestore donations collection updated

File Structure:
src/lib/payments/
├── jazzcash.ts          # JazzCash provider stub
├── easypaisa.ts         # EasyPaisa provider stub
├── paymentService.ts    # Unified payment interface
└── simulateWebhook.ts   # Webhook simulation utility

Security Notes:
❌ NEVER commit real credentials to Git
✅ Use .env.local for all secrets
✅ Add .env.local to .gitignore
✅ Rotate credentials every 90 days
✅ Monitor activity_logs for suspicious activity
