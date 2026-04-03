# 🕵️ Baitussalam Ecosystem: Deep-Dive QA Inspection Report

**Date:** April 1, 2026  
**Inspector:** Antigravity (QA Mode)  
**Objective:** Identify inconsistencies, UI/UX gaps, and bilingual support failures across the platform.

---

## 📊 Summary of Findings
The internal **Dashboard (Overview, Volunteer, Settings)** has been successfully modernized to a "Professional Minimalism" standard. However, the **Public Landing Pages** (Home, Welfare, Donation) are currently lagging behind, creating a fragmented user experience.

---

## 🛑 Critical Issues (Must Fix First)

### 1. Bilingual "Skin" vs. "Full Experience" (Urdu Mode)
*   **Donation Page:** The core of the website—the donation process—remains almost entirely in English even when Urdu is selected. Cause categories like "Education" and "Health" are not translated.
*   **Hero Sections:** The main impact statements on the Home and Welfare pages do not switch to Urdu.
*   **Button Consistency:** Global actions like "LOGIN", "JOIN US", and "EXPLORE" remain in English across most pages.

### 2. UI/UX Fragmentation
*   **Header Sync:** The language switcher (EN/UR) disappears or changes position when navigating from the Home page to the Donation page. 
*   **Navigation Hierarchy:** The "Admin Panel" link is only visible in the Sidebar but not easily accessible for authorized users from the main site navigation.
*   **Branding Localization:** The "Baitussalam Management" logo text is static English. It should be "بیت السلام مینجمنٹ" in Urdu mode.

### 3. RTL (Right-to-Left) Refinement
*   **Punctuation Shifting:** In some mixed-language sentences, periods and commas are jumping to the wrong side of the line.
*   **Sidebar Spacing:** In Urdu Mode, some icons in the dashboard sidebar are not perfectly aligned with the text labels, leading to a "loose" feel.

---

## 🔍 Module-by-Module Inspection

| Module | Status | Primary Issues |
| :--- | :--- | :--- |
| **Home Page** | ⚠️ At Risk | Hero text and main CTA buttons are English-only in Urdu mode. |
| **Welfare/Causes** | ⚠️ At Risk | Descriptions are in English. "Volunteer" button on cause cards is missing Urdu translation. |
| **Donation Flow** | 🚨 Critical | High friction for Urdu-only users. Payment categories and labels are English. |
| **User Dashboard** | ✅ Good | "Professional Minimalism" style is consistent. Sidebar is functional in both modes. |
| **Volunteer Portal** | ✅ Good | Recent UI updates have fixed the "Ajeeb" feeling. Support Modal is functional. |
| **Settings** | ✅ Good | Language switcher and Notification tab are now working correctly. |

---

## 🛠️ Action Plan (The Road to Perfection)

### Phase 1: High-Impact Localization (Immediate)
- [ ] Translate all Hero section titles and subtitles in `app/page.tsx` and `app/welfare/page.tsx`.
- [ ] Implement a unified "Global Header" that persists across all routes with a consistent EN/UR switcher.
- [ ] Translate all Donation categories and cause titles in Firestore or the frontend map.

### Phase 2: UI/UX Polishing
- [ ] Fix the "shaking" or "shifting" of elements when switching languages (Font Fallbacks).
- [ ] Standardize all buttons (Primary/Secondary) to use the "Baitussalam Green" (#1ea05f) palette.
- [ ] Localize the Branding/Logo area for Urdu mode.

### Phase 3: Final QA
- [ ] Conduct a mobile-responsive test for RTL layouts (ensuring cards don't overlap on smaller screens).
- [ ] Verify the "Support Comms" button links to a real contact point or a functional chat.

---

> [!IMPORTANT]
> **Inspector's Note:** The website is currently a "Premium English Site" with an "Urdu Layout". To reach the user's goal of a truly localized ecosystem, we must move from *Visual Translation* to *Content Translation*.

---
