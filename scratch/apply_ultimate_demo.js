const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    for (let line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let key = match[1];
        let value = (match[2] || '').trim();
        if (value.startsWith('"') && value.endsWith('"')) value = value.substring(1, value.length - 1);
        value = value.replace(/\\n/g, '\n');
        process.env[key] = value;
      }
    }
  }
}

async function run() {
  loadEnv();

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      })
    });
  }

  const db = admin.firestore();

  const demoData = {
    events: [
      { id: "e1", title: "Nationwide Health Camp 2026", description: "Providing free screenings and essential medicine to 5,000+ citizens in a single day.", image: "/images/demo/health_camp.png", type: "medical_camp", status: "upcoming", startDate: "2026-06-15T09:00:00Z" },
      { id: "e2", title: "Youth Leadership Summit", description: "Empowering the next generation of changemakers through tactical leadership training.", image: "/images/demo/seminar.png", type: "education", status: "upcoming", startDate: "2026-07-20T10:00:00Z" },
      { id: "e3", title: "Emergency Kitchen Drive", description: "A massive logistics exercise preparing 20,000 hot meals for disaster-prone regions.", image: "/images/demo/kitchen.png", type: "food_drive", status: "completed", startDate: "2026-04-10T08:00:00Z" },
      { id: "e4", title: "Mobile Clinic Launch", description: "Inauguration of our 10th solar-powered mobile medical unit.", image: "/images/demo/ambulance.png", type: "medical_camp", status: "upcoming", startDate: "2026-05-05T11:00:00Z" },
      { id: "e5", title: "Winter Ration Distribution", description: "Ensuring no child goes hungry this winter season in the northern plateaus.", image: "/images/demo/food.png", type: "food_drive", status: "completed", startDate: "2025-12-15T09:00:00Z" },
      { id: "e6", title: "Clean Water Awareness Walk", description: "Community engagement event to promote sustainable water usage and hygiene.", image: "/images/demo/water.png", type: "other", status: "upcoming", startDate: "2026-08-10T17:00:00Z" },
      { id: "e7", title: "Scholar-Professional Meetup", description: "Bridging the gap between traditional wisdom and modern corporate excellence.", image: "/images/demo/expert.png", type: "education", status: "upcoming", startDate: "2026-09-12T18:00:00Z" },
      { id: "e8", title: "Youth Tech BootCamp", description: "Intensive 3-day workshop for young developers and digital innovators.", image: "/images/demo/youth.png", type: "education", status: "ongoing", startDate: "2026-04-16T09:00:00Z" }
    ],
    testimonials: [
      { id: "t1", name: "Amna Bibi", role: "Health Project Beneficiary", text: "The mobile clinic came to our village when my son was very ill. I am forever grateful for the free treatment.", image: "/images/demo/health_camp.png", rating: 5, isPublished: true },
      { id: "t2", name: "Mustafa Kamal", role: "Ration Pack Recipient", text: "Quality of food and respect shown by the team is unparalleled. JPSD truly cares about our dignity.", image: "/images/demo/food.png", rating: 5, isPublished: true },
      { id: "t3", name: "Sara Jahangir", role: "Professional Mentor", text: "Serving as a mentor through the Expert Portal has been the most rewarding experience of my career.", image: "/images/demo/expert.png", rating: 5, isPublished: true },
      { id: "t4", name: "Bilal Sheikh", role: "Youth Leader", text: "The Tech Bootcamp gave me the skills to launch my own small business. JPSD empowered me when I needed it most.", image: "/images/demo/youth.png", rating: 5, isPublished: true }
    ],
    causes: [
      { id: "c1", title: "Flood Resilience 2026", image: "/images/demo/ambulance.png", category: "emergency", goalAmount: 10000000, raisedAmount: 4500000, deadline: "2026-10-31T00:00:00Z", urgency: "critical", status: "published", featured: true },
      { id: "c2", title: "Education for All", image: "/images/demo/seminar.png", category: "education", goalAmount: 5000000, raisedAmount: 2100000, deadline: "2026-12-31T00:00:00Z", urgency: "high", status: "published", featured: true },
      { id: "c3", title: "Zero Hunger Initiative", image: "/images/demo/kitchen.png", category: "food", goalAmount: 3000000, raisedAmount: 1200000, deadline: "2026-08-30T00:00:00Z", urgency: "high", status: "published", featured: false },
      { id: "c4", title: "Clean Water Thar", image: "/images/demo/water.png", category: "water", goalAmount: 2000000, raisedAmount: 1950000, deadline: "2026-05-15T00:00:00Z", urgency: "medium", status: "published", featured: false },
      { id: "c5", title: "Healthcare for Rural Center", image: "/images/demo/health_camp.png", category: "health", goalAmount: 8000000, raisedAmount: 500000, deadline: "2026-11-20T00:00:00Z", urgency: "high", status: "published", featured: false },
      { id: "c6", title: "Youth Skill Lab", image: "/images/demo/youth.png", category: "education", goalAmount: 1500000, raisedAmount: 1450000, deadline: "2026-04-30T00:00:00Z", urgency: "low", status: "published", featured: true }
    ],
    blog_posts: [
      { id: "b1", title: "AI in Philanthropy", content: "Exploring how technology is driving efficiency...", featuredImage: "/images/demo/expert.png", status: "published", featured: true, createdAt: "2026-04-10T00:00:00Z" },
      { id: "b2", title: "Thar Water Crisis Solved?", content: "Our deep-well project has reached a new milestone...", featuredImage: "/images/demo/water.png", status: "published", featured: true, createdAt: "2026-04-12T00:00:00Z" },
      { id: "b3", title: "Volunteer Spotlight: Raza", content: "Meet the man who logged 500 hours this year...", featuredImage: "/images/demo/seminar.png", status: "published", featured: false, createdAt: "2026-04-14T00:00:00Z" },
      { id: "b4", title: "Healthy Pakistan 2030", content: "Charting the path to universal health access...", featuredImage: "/images/demo/health_camp.png", status: "published", featured: false, createdAt: "2026-04-15T00:00:00Z" }
    ]
  };

  const collections = Object.keys(demoData);
  for (const col of collections) {
    console.log(`Processing ${col}...`);
    const batch = db.batch();
    for (const record of demoData[col]) {
      const { id, ...data } = record;
      // For demo, we use a prefix to keep IDs unique and identifiable
      const docRef = db.collection(col).doc(`demo-${id}`);
      
      const processedData = { ...data };
      for (const [key, val] of Object.entries(processedData)) {
        if (typeof val === 'string' && val.includes('T') && !isNaN(Date.parse(val))) {
          processedData[key] = admin.firestore.Timestamp.fromDate(new Date(val));
        }
      }

      processedData.__isDemo = true;
      processedData.__demoImportedAt = admin.firestore.FieldValue.serverTimestamp();
      processedData.reviewStatus = 'approved'; // Force approval for demo context

      batch.set(docRef, processedData, { merge: true });
    }
    await batch.commit();
    console.log(`Imported ${col}`);
  }

  console.log('--- ALL EXPANDED DEMO DATA IMPORTED ---');
}

run().catch(console.error);
