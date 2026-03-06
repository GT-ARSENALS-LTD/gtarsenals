# GT ARSENALS LTD — Website v2
## gtarsenals.com | Research-Informed Redesign

---

## 📁 FOLDER STRUCTURE

```
gtarsenals-v2/
│
├── index.html                  ← Homepage
├── README.md                   ← This file
│
├── pages/
│   ├── services.html           ← All services detail page
│   ├── training.html           ← Training & enrollment page
│   ├── about.html              ← About, team, timeline
│   └── privacy.html            ← Privacy policy (required for trust)
│
├── css/
│   └── style.css               ← All styles (brand colors, layout, responsive)
│
├── js/
│   └── main.js                 ← All interactions + form handler
│
├── backend/
│   ├── contact.php             ← PHP email handler (Option A)
│   ├── server.js               ← Node.js email server (Option B)
│   ├── package.json            ← Node.js dependencies
│   └── .env.example            ← Copy to .env and fill in your email credentials
│
└── images/                     ← ⚠️ ADD ALL YOUR IMAGES HERE
    ADD-IMAGES-HERE.txt
```

---

## 🖼️ IMAGE NAMING GUIDE
### Rename every file EXACTLY as shown before placing in /images/

| Rename File To                | Where It's Used                             | Size         |
|-------------------------------|---------------------------------------------|--------------|
| `favicon.png`                 | Browser tab icon                            | 64×64px      |
| `logo.png`                    | Navbar logo (light backgrounds)             | 180×50px     |
| `logo-white.png`              | Navbar logo (dark/hero backgrounds)         | 180×50px     |
| `og-banner.jpg`               | WhatsApp/Facebook share preview             | 1200×630px   |
| `hero-bg.jpg`                 | Hero section background (optional)          | 1920×1080px  |
| `about-photo.jpg`             | Office/team photo on About page             | 600×700px    |
| `training-photo.jpg`          | Training session photo on homepage          | 700×500px    |
| `product-laptop.jpg`          | Laptops product card                        | 600×400px    |
| `product-accessories.jpg`     | Accessories product card                    | 600×400px    |
| `product-networking.jpg`      | Networking gear product card                | 600×400px    |
| `product-custom-pc.jpg`       | Custom PC product card                      | 600×400px    |
| `service-gadgets.jpg`         | Gadgets service section (services page)     | 800×600px    |
| `service-networking.jpg`      | Networking service section                  | 800×600px    |
| `service-cybersecurity.jpg`   | Cybersecurity service section               | 800×600px    |
| `service-software.jpg`        | Software dev section                        | 800×600px    |
| `service-pc-assembly.jpg`     | PC Assembly section                         | 800×600px    |
| `service-repairs.jpg`         | Repairs section                             | 800×600px    |
| `service-graphics.jpg`        | Graphics design section                     | 800×600px    |
| `service-contracts.jpg`       | Contracts section                           | 800×600px    |
| `team-member1.jpg`            | Team photo slot 1 (founder)                 | 300×300px    |
| `team-member2.jpg`            | Team photo slot 2                           | 300×300px    |
| `team-member3.jpg`            | Team photo slot 3                           | 300×300px    |
| `team-member4.jpg`            | Team photo slot 4                           | 300×300px    |
| `client-[company].png`        | Client logos (grayscale, transparent)       | 120×40px     |

**Photo tips:**
- Compress all photos before uploading: https://squoosh.app (free)
- JPG for photos, PNG for logos (transparent backgrounds)
- Team photos: square crop, face centered, good lighting

---

## 📞 THINGS TO UPDATE IN HTML BEFORE GOING LIVE

Search for and replace these placeholders across all HTML files:

| Search For                    | Replace With                          |
|-------------------------------|---------------------------------------|
| `+234 707 118 8890`           | ✅ Already updated in all HTML files  |
| `2348000000000`               | Your WhatsApp number (no spaces, no +)|
| `info@gtarsenals.com`         | Your real branded email               |
| `Abuja, FCT, Nigeria`         | Your full office address              |
| `Team Member Name`            | Real team member names                |
| Social `href="#"`             | Real Facebook, Instagram, Twitter URLs|

---

## 📧 CONNECTING THE CONTACT FORM TO REAL EMAIL

### Option A — PHP (For cPanel Hosting — Easiest for Nigerian hosting)
1. Upload `backend/contact.php` to your hosting server
2. Update `TO_EMAIL` and `FROM_EMAIL` in the file
3. In `js/main.js`, find `submitToBackend` comment and uncomment it
4. Change the URL to: `/backend/contact.php`
5. Delete the `simulateSubmit()` line

### Option B — Formspree (No backend needed, free)
1. Go to https://formspree.io → sign up
2. Create a form → copy the endpoint URL
3. In `js/main.js`, uncomment `submitToFormspree()`
4. Replace `YOUR_FORM_ID` with your Formspree form ID

### Option C — Node.js (Advanced, for VPS hosting)
1. Install Node.js on your server
2. Copy `.env.example` to `.env` and fill in SMTP details
3. Run: `cd backend && npm install && node server.js`
4. Use PM2 for production: `pm2 start server.js --name gtarsenals`

---

## 🌐 HOW TO GO LIVE (Deploy Options)

### Option 1 — cPanel Hosting (Most Nigerian hosts)
1. Log in → File Manager → public_html
2. Delete default files (index.html, etc.)
3. Upload everything EXCEPT the backend folder (upload separately)
4. Point your domain gtarsenals.com to public_html

### Option 2 — Netlify (Free, fast, easy)
1. Go to https://netlify.com
2. Drag and drop the entire `gtarsenals-v2` folder (minus /backend)
3. Add custom domain: gtarsenals.com
4. SSL is automatic and free

### Option 3 — VPS (for backend + frontend together)
Set up Nginx with Node.js on your VPS. Contact GT Arsenals IT team.

---

## ✅ PRE-LAUNCH CHECKLIST

- [ ] Replace all image placeholders with real photos
- [ ] Update phone number everywhere
- [ ] Update WhatsApp number in all href links
- [ ] Update full office address
- [ ] Add team member names and photos
- [ ] Update social media links
- [ ] Connect contact form to real email (Formspree or PHP)
- [ ] Set up Google Business Profile (https://business.google.com) — FREE
- [ ] Add client logos to the clients section
- [ ] Test on mobile phone before going live
- [ ] Test contact form sends emails
- [ ] Add real testimonials as you collect them
- [ ] Update stats numbers (clients served, etc.)

---

## 🎨 BRAND REFERENCE

| Element      | Value              |
|--------------|--------------------|
| Blue         | `#1E5FB9`          |
| White        | `#FFFFFF`          |
| Black        | `#000000`          |
| Font         | Montserrat (Google Fonts) |
| WhatsApp     | `#25D366`          |

---

## 🔍 RESEARCH NOTES (What informed this redesign)

Competitors studied:
- Neo Cloud Technologies (Abuja) — techneo.ng
- Bizmarrow Technologies (Abuja) — bizmarrow.com
- Brandwone ICT (Nigeria) — brandwoneict.com

Key findings applied to GT Arsenals v2:
1. ✅ WhatsApp floating button — Nigerian clients expect this, drives conversions
2. ✅ Trust bar (CAC, SSL, physical address) — immediately after hero
3. ✅ Client logos section — B2B trust signal #1
4. ✅ Team photos — humanizes the brand, major Nigerian trust signal
5. ✅ FAQ section — reduces pre-inquiry friction
6. ✅ WhatsApp pre-filled product inquiry links — makes it 1-click to ask
7. ✅ Announcement bar — promotes current offers
8. ✅ Privacy Policy page — required for credibility and Google trust
9. ✅ Breadcrumbs on inner pages — better navigation and SEO
10. ✅ Pricing signal text — showing willingness to quote builds trust

---

*GT Arsenals Ltd — RC: 8340467 | Abuja, FCT, Nigeria | gtarsenals.com*
