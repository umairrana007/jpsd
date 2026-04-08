# JPSD Payment Gateway Integration Plan - Phase 8 Tactical synchronization

## 1. Objective
Synchronize the Baitussalam (JPSD) humanitarian platform with localized and international payment protocols (JazzCash, EasyPaisa, Stripe) ensuring Shariah-compliant asset deployment.

## 2. Architecture (BHPGP - Baitussalam Humanitarian Payment Gateway Protocol)
- **Primary Orchestrator**: `/donate` and `/donation` gateways.
- **Verification Hub**: `PaymentInfoModal` (Bilingual support for localized operational clarity).
- **Asset Trackers**: Firebase `donations` collection + BTAT (Baitussalam Tactical Analytics Tracker).
- **Communication Dispatch**: BTCC (Baitussalam Tactical Communications Center) for instant PDF receipts.

## 3. Localization & Compliance
- **Bilingual Interface**: Full Urdu/English toggle for all payment instructions.
- **Shariah Compliance**: Explicit toggles for Zakat vs. Sadaqah asset classification.
- **Operational Clarity**:
  - JazzCash: 1.5% fee sync, instant processing.
  - EasyPaisa: 1.2% fee sync, international card bridge.
  - Stripe: Encrypted international credit/debit corridor.

## 4. User Flow & Consent
1. **Magnitude Calibration**: Donor selects impact amount.
2. **Identity Directive**: Donor chooses anonymity or dedication.
3. **Protocol Selection**: Choice of payment channel with "How it Works" operational clarity.
4. **Impact Consent**: Mandatory confirmation for receipt and impact reporting (Validation enforced).
5. **Asset Deployment**: Confirmation and redirection to success metrics.

## 5. Security Protocols
- AES-256 tactical encryption for all data inflight.
- PCI-DSS compliant Stripe corridor.
- Manual Bank Transfer instructions for high-security manual deployment.
- Simulation Mode for tactical testing without asset burn.

## 🔏 Hash/Signature Generation (Stub Implementation)

### 1. Functional Signatures (hashUtils.ts)
- `generateJazzCashHash(params, salt)`:
  - **Stub**: Returns `JCHASH-<timestamp>-<random>`.
  - **Real**: Requires SHA256 hashing of concatenated params + Salt.
- `generateEasyPaisaSignature(payload, apiKey)`:
  - **Stub**: Returns `EPSIG-<base64_payload>`.
  - **Real**: Requires HMAC-SHA256 signing of the request payload.
- `verifyWebhookSignature(payload, signature, secret)`:
  - **Stub**: Always returns `true` in simulation mode.
  - **Real**: Must use `crypto.timingSafeEqual` for secure verification.

### 2. Operational Logic
- All hashes are generated **Server-Side** to prevent credential exposure.
- Validation warnings are logged if `mode === 'production'` but secrets are missing.
- Verification logic is bypassed in **Simulation Mode** to facilitate tactical front-end development.

### 3. Security Requirements for Phase 9+
- [ ] Migrate to `node:crypto` from stub implementation.
- [ ] Integrate real Secure Salts and API Keys from encrypted environment vault.
- [ ] Enforce constant-time comparisons for all incoming webhook signatures.
- [ ] Implement key rotation schedule (90-day cycle).

> [!WARNING]
> **STUB MODE** – Currently active for Phase 8. DO NOT use for live production transactions until cryptographic modules and real credentials are authorized and integrated.

## 📧 Email Notification System (Stub Implementation)

### Architectural Flow
1. **Activation Point**: Triggered via `sendDonationReceipt()` in `donate/page.tsx` (Direct) or `webhooks/payments/route.ts` (Webhook callback).
2. **Logic Processing**:
   - `src/lib/emailService.ts`: Core orchestration hub.
   - `src/lib/emailTemplates.ts`: Bilingual HTML base templates.
3. **Stub Behavior**:
   - Returns `{ success: true, messageId: 'EMAIL-STUB-...' }`.
   - Logs event to Firebase `activity_logs` with type `EMAIL_RECEIPT_STUB`.
   - Developer-mode console logging using masked recipient emails.

### Real Provider Integration (Future)
- **SMTP Option**: Use `nodemailer` with Google Workspace or local SMTP server.
- **API Option**: Use `@sendgrid/mail` or `resend` for high-throughput transactional emails.
- **Templates**: Convert current HTML stubs to `React Email` or `MJML` for responsive delivery.

---
*Created by Antigravity AI for Baitussalam Welfare Trust.*
*Plan Updated: April 8, 2026 (Phase 8 Task 3 Complete)*
