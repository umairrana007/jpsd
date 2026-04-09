# Baitussalam Welfare Trust - Technical Walkthrough

## 1. Tactical Initialization (BTBI)
- **Environment**: Next.js 14 (App Router) + TailwindCSS.
- **Identity**: Firebase Auth (Google & Email/Password).
- **Persistence**: Cloud Firestore.

## 2. Dynamic Identity Orchestration (BTDO)
- **State Management**: React Context API (`AuthContext`).
- **Authorization**: Role-based access (USER, VOLUNTEER, ADMIN).
- **Security Logic**: `get_current_user_data` retrieves tactical metadata from `/users` collection.

## 3. Mission-Critical Navigation (BTNC)
- **Bilingual Core**: Integrated `LanguageContext` (En/Ur).
- **Control Plane**: Admin Navigation Manager allows live updates to site structure.
- **Components**: Framer Motion powered floating headers and drawer-style mobile hubs.

## 4. Financial Logistics - Donation Flow (BTFL)
- **Capture**: Interactive 4-step wizard (`Cause Selection` → `Amount` → `Identity` → `Processing`).
- **Integrations**: 
  - **JazzCash**: Server-side hash generation (HMAC-SHA256).
  - **EasyPaisa**: API security token verification.
- **Reporting**: Automated receipt dispatch (Simulated) and activity logging.

## 5. Administrative Reconnaissance (BTAR)
- **Dashboard**: Real-time stats engine (Live Stats collection).
- **User Management**: Privilege escalation and status enforcement.
- **Safety**: "Danger Zone" user deletion requests with manual admin verification.

## 6. Development Philosophy
- **Tactical Modularity**: Atomic components in `src/components`.
- **High-Stakes Reliability**: Type-safe data mapping in `src/lib/firebaseUtils.ts`.
- **Aesthetic Excellence**: Premium glassmorphic UI with Outfit/Inter typography.

---
**Status**: 100% Mission Ready.
**Verification Code**: PHASE-9-SUCCESS-BHPGP
