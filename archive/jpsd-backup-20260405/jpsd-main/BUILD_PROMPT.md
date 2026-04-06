# WELFARE TRUST - EXPERT BUILD PROMPT
## Full-Stack Development Specification (Next.js & Firebase)

### Project Overview
- **Website Name:** Welfare Trust (Saylani Style)
- **Architecture:** Multi-page SEO-Ready Application (Next.js Framework).
- **Primary Goal:** High-speed donation portal, real-time welfare stats, and program transparency.
- **Tech Stack:**
  - **Framework:** Next.js (App Router) - *Expert Recommendation for SEO & Performance*.
  - **Styling:** Tailwind CSS (Modern, Responsive, Premium).
  - **Animations:** Framer Motion (Impact counters & Smooth Transitions).
  - **Backend:** Firebase (Firestore for Data, Storage for Media, Auth for Donors).
  - **Multi-language:** i18n support (English/Urdu toggle required).
  - **Mobile-First:** 100% Responsive Design for Mobile/Tablet/Desktop.

---

### DESIGN SYSTEM & VISUAL IDENTITY

#### Brand Identity
- **Logo:** Typographic logo in a professional green/blue accent box (#27ae60).
- **Tagline:** "Empowering Humanity, Serving the Needy."

#### Expert Color Palette (Saylani Inspired)
- `--primary-green`: #27ae60 (Vitality & Welfare)
- `--primary-blue`: #2980b9 (Global Trust & Transparency)
- `--accent-gold`: #f39c12 (Primary Call-to-Action / Donation)
- `--urgent-red`: #c0392b (Emergency appeals & alerts)
- `--bg-light`: #f8f9fa (Clean, minimalist background)
- `--text-dark`: #2c3e50 (Professional headlines)

#### Typography
- **Primary:** 'Montserrat' (Headlines) & 'Inter' (Body).
- **Secondary (Urdu):** 'Noto Nastaliq Urdu' for localized support.

---

### PAGE & ROUTING STRUCTURE

#### Core Navigation Pages (Multi-page Layout)
1. **Home (`/`)**: Hero Slider, Live Stats, Program Overview, Testimonials.
2. **About Us (`/about`)**: History, Chairman's Message, Mission & Vision.
3. **Programs (`/programs/[:id]`)**: Detailed pages for Health, Education, Food (Dastarkhwan), Clean Water.
4. **Media (`/media`)**: Gallery, News Updates, YouTube Video Integration.
5. **Donate Now (`/donate`)**: Multi-step high-converting donation flow.
6. **Volunteer (`/volunteer`)**: Signup form for on-ground support.
7. **Contact (`/contact`)**: Map, International Numbers, Contact Form.

#### 1. TOP UTILITY BAR
- **Multi-language Switching:** Clear toggle for English (LTR) and Urdu (RTL).
- **Zakat/Sadaqah Calculator:** Interactive tool for donation calculation.

---

### EXPERT DONATION MODULE (Next.js Optimized)

#### Functional Flow:
- **Phase 1: Cause Selection**: Interactive icons/list for 10+ welfare categories.
- **Phase 2: Amount Selection**: One-click quick amounts (1k, 5k, 10k) or custom field.
- **Phase 3: Checkout**:
  - **Local:** PayFast / JazzCash / EasyPaisa integration.
  - **International:** Stripe (Credit/Debit Card) for overseas pakistani donors.
- **Phase 4: Confirmation**: Real-time generation of Donation Receipt (PDF).

---

### BACKEND & REAL-TIME DATA (Firebase / Supabase)

#### Firestore Collections:
- **`donations`**: Stores detailed donor history & payment status.
- **`programs`**: Real-time data of funding goals vs actual collection.
- **`live_stats`**: High-performance counters for "Total Lives Served".
- **`users`**: Auth-protected donor profiles and admin credentials.

#### Real-time Integration:
- On the homepage, Use Firebase Listeners to show a "Latest Donations" ticker (Anonymous protected).

---

### ADVANCED PRO FEATURES (Level Up)
1. **Transparency & Social Proof:**
   - **Live Donation Ticker:** A non-intrusive notification showing recent anonymous donations (e.g., "Someone from Dubai just donated Rs. 10k").
   - **Impact Map:** Interactive JS-based map showing locations where the welfare is actively serving.
2. **Automated Donor Engagement:**
   - **WhatsApp Integration:** Auto-send a thank-you message and PDF Receipt to the donor's WhatsApp number after a successful transaction.
3. **Marketing & Growth Analytics:**
   - **Campaign Tracking:** Integration of Facebook Pixel and Google Analytics 4 (GA4) for tracking donation conversion rates.
4. **Trust & Compliance Branding:**
   - **Shariah Compliance Badge:** Dedicated section or badge in the footer/donate page showing Shariah certificate (for Zakat/Sadaqah trust).
   - **Donor Privacy:** GDPR-compliant data handling for international donors.

---

### QUALITY STANDARDS & PERFORMANCE
- **Mobile-First Experience:** 100% flawless functionality on mobile (iOS/Android).
- **SEO Optimization:** SSR (Server Side Rendering) using Next.js for all service pages.
- **Lighthouse Score:** Aim for 95+ in Performance, Accessibility, and SEO.
- **Skeleton Loading:** Use CSS skeletons while fetching program cards.
- **Security:** Ensure SSL, Firebase Security Rules, and secure API handling for payments.

---

### IMPLEMENTATION CHECKLIST
- [ ] Initialize Next.js project with Tailwind CSS.
- [ ] Setup Firebase Project & API Keys (Protected in `.env`).
- [ ] Create Global Components (Header, Footer, Navbar).
- [ ] Build Multi-step Donation Form logic.
- [ ] Implement Dynamic Routing for Welfare Programs.
- [ ] Setup Admin Dashboard for Site Management.
- [ ] Integrate Multi-Language (Urdu/English) i18n logic.
- [ ] Deploy to Vercel/Netlify for staging.
