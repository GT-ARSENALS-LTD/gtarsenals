# GT Arsenals Website — Complete Setup Guide
**Version 3 | Last updated: February 2026**

This guide covers everything you need to do to go from this zip file to a
fully live, working website. Follow the steps in order.

---

## TABLE OF CONTENTS
1. [Files Overview](#1-files-overview)
2. [Before You Upload — Update These First](#2-before-you-upload)
3. [Connect the Contact Form (Formspree)](#3-connect-the-contact-form)
4. [Set Up Email Automations (Zapier)](#4-set-up-email-automations)
5. [Connect the Newsletter (Mailchimp)](#5-connect-the-newsletter)
6. [Deploy to Your Hosting](#6-deploy-to-your-hosting)
7. [Submit to Google](#7-submit-to-google)
8. [Set Up Google Business Profile](#8-set-up-google-business-profile)
9. [Add Your Photos](#9-add-your-photos)
10. [Add Team Names and Photos](#10-add-team-names-and-photos)
11. [Update the Google Map](#11-update-the-google-map)
12. [Update Social Media Links](#12-update-social-media-links)
13. [Write More Blog Articles](#13-write-more-blog-articles)
14. [Monthly Maintenance Checklist](#14-monthly-maintenance-checklist)

---

## 1. FILES OVERVIEW

```
gtarsenals-v2/
│
├── index.html              ← Homepage
├── sitemap.xml             ← Tells Google about your pages
├── robots.txt              ← Search engine instructions
│
├── pages/
│   ├── services.html       ← Services page
│   ├── training.html       ← Training & courses page
│   ├── pricing.html        ← Pricing page
│   ├── about.html          ← About us page
│   ├── blog.html           ← Blog listing page
│   ├── privacy.html        ← Privacy policy
│   ├── 404.html            ← Error page (missing links)
│   │
│   └── blog/
│       ├── cybersecurity-warning-signs.html   ← Full article 1
│       └── laptop-buying-guide.html           ← Full article 2
│
├── css/
│   └── style.css           ← All website styling
│
├── js/
│   └── main.js             ← All website behaviour + form logic
│
├── images/
│   └── (add your photos here — see Section 9)
│
└── backend/                ← Only needed if you use Node.js hosting
    ├── contact.php         ← PHP form handler (for cPanel hosting)
    ├── server.js           ← Node.js form handler (for VPS hosting)
    ├── package.json        ← Node.js dependencies
    └── .env.example        ← Environment variable template
```

---

## 2. BEFORE YOU UPLOAD

These are the things still using placeholder values. Update them before
the site goes live. Everything is in the file and line noted.

### A. Your branded email address
**Current:** `info@gtarsenals.com`
**Status:** ✅ Already set correctly — but make sure this email actually exists.
**How to create it:** Register at Zoho Mail (free) or Google Workspace with
your domain. Then create the info@gtarsenals.com mailbox.

### B. Your website domain
**Current:** `https://gtarsenals.com` in meta tags, sitemap.xml, canonical links
**Action:** If your domain is different (e.g. gtarsenalsltd.com), do a
find-and-replace across ALL files:
- Find: `gtarsenals.com`
- Replace with: `youractualdomain.com`

### C. Team member names and photos
**Files to update:** `index.html` (team section) and `pages/about.html`
**Search for:** `Team Member Name`
**Replace with:** Real names, roles, and short bios
**See Section 10 for full instructions**

### D. Social media links
**Files to update:** `index.html` and all pages in `pages/`
**Search for:** `href="#"` near Facebook, Instagram, Twitter
**Replace with:** Your real social media profile URLs
**See Section 12 for full instructions**

### E. Testimonials
**File:** `index.html` — search for "What Our Clients Say" section
**Action:** Replace the placeholder testimonials with real quotes from
real clients. Add their name, role, and company if possible.

### F. Stats bar numbers
**File:** `index.html`
**Search for:** `data-target="200"` (Clients Served), `data-target="10"` (Services)
**Action:** Change these to your actual numbers. Don't inflate them —
clients notice when the numbers are unrealistic for a new company.
A better approach for a new company: use "50+ Clients Served", "10+ Services", etc.

---

## 3. CONNECT THE CONTACT FORM

The contact form on the homepage currently simulates sending (it shows
a success message but doesn't actually send anything). Here's how to
make it real in 10 minutes using Formspree.

### Step-by-step:

1. Go to **https://formspree.io** and click "Get Started Free"

2. Sign up using **info@gtarsenals.com** (or whichever email you want
   to receive inquiries)

3. Click **"+ New Form"** → Give it a name like "GT Arsenals Contact"

4. Formspree will show you a form ID. It looks like: `xabcdefg`
   (yours will be different letters)

5. Open the file: **`js/main.js`**

6. Find this line near the top (line ~25):
   ```javascript
   const FORMSPREE_ID = 'YOUR_FORM_ID'; // ← REPLACE THIS
   ```

7. Replace `YOUR_FORM_ID` with your actual ID:
   ```javascript
   const FORMSPREE_ID = 'xabcdefg'; // ← your real ID here
   ```

8. Save the file. That's it.

### What happens now when someone submits the form:
- ✅ They see a success message on the website
- ✅ You receive an email at info@gtarsenals.com with their details
- ✅ They receive an automatic reply email (set this up in Formspree dashboard)
- ✅ The submission is saved in your Formspree dashboard forever

### Set up the auto-reply (important for professionalism):
1. In Formspree dashboard → click your form → Settings → Email Notifications
2. Enable "Send confirmation email to submitter"
3. Write a friendly auto-reply like:
   > "Hello [name], thank you for contacting GT Arsenals Ltd!
   > We've received your message and will respond within 24 hours.
   > For urgent matters, WhatsApp us on +234 707 118 8890.
   > — GT Arsenals Team"

---

## 4. SET UP EMAIL AUTOMATIONS (ZAPIER)

Once Formspree is connected, you can automate follow-up actions using
Zapier (free plan available at zapier.com).

### Automation 1: Save all inquiries to Google Sheets (client database)

This creates a live log of every person who contacts you — their name,
email, phone, service interest, and message. Invaluable for follow-ups.

1. Go to **zapier.com** → "Create Zap"
2. **Trigger:** Search for "Formspree" → Event: "New Submission"
3. Connect your Formspree account → select your GT Arsenals form
4. **Action:** Search for "Google Sheets" → Event: "Create Spreadsheet Row"
5. Connect your Google account → select a spreadsheet (create one called
   "GT Arsenals — Client Inquiries")
6. Map the fields: Name → Name column, Email → Email column, etc.
7. Turn the Zap on.

Every contact form submission now automatically adds a row to your sheet.

### Automation 2: WhatsApp notification when a new inquiry arrives

This sends you a WhatsApp message the moment someone submits the form.

1. In Zapier, create a new Zap
2. **Trigger:** Formspree → New Submission
3. **Action:** Search "CallMeBot" or "WhatsApp Business" → Send Message
4. Follow the WhatsApp notification setup for your chosen service
5. Message template: "🔔 New GT Arsenals inquiry from {{name}}!
   Email: {{email}} | Service: {{service}} | Phone: {{phone}}"

### Automation 3: Follow-up email sequence

Send a sequence of helpful emails to every new inquiry:
- Day 0: Automatic auto-reply (set up in Formspree — see Section 3)
- Day 2: "Did you get our reply? We're still available to help."
- Day 7: "Here are 3 ways GT Arsenals can help your business this month"

Use **Mailchimp Automations** or **Brevo (free)** for this sequence.
1. Add new contacts from Formspree to a Mailchimp "Leads" audience via Zapier
2. Set up a Welcome automation series in Mailchimp with the above emails
3. Each email builds trust and reminds the lead that you exist

---

## 5. CONNECT THE NEWSLETTER

The newsletter signup box on the blog page collects email addresses for
your monthly tech tips newsletter.

### Option A: Mailchimp (recommended — free up to 500 contacts)

1. Go to **mailchimp.com** → create a free account
2. Create an Audience called "GT Arsenals Newsletter"
3. Go to: Audience → Signup Forms → Embedded Forms
4. Copy the **form action URL** (looks like:
   `https://gtarsenals.us1.list-manage.com/subscribe/post?u=abc&id=xyz`)
5. Open **`js/main.js`** and find this line:
   ```javascript
   const MAILCHIMP_URL = ''; // ← paste Mailchimp form action URL here
   ```
6. Paste your URL between the quotes:
   ```javascript
   const MAILCHIMP_URL = 'https://gtarsenals.us1.list-manage.com/subscribe/post?u=abc&id=xyz';
   ```
7. Save the file.

### Option B: Use a second Formspree form (simpler)

1. Create a second form on formspree.io called "Newsletter"
2. Copy the form ID (e.g. `xnewsltr`)
3. In `js/main.js`, find:
   ```javascript
   const NEWSLETTER_FORMSPREE_ID = ''; // ← OR paste a second Formspree form ID here
   ```
4. Set it:
   ```javascript
   const NEWSLETTER_FORMSPREE_ID = 'xnewsltr';
   ```

### What to send your newsletter subscribers:
- Monthly: 1 tech tip relevant to Nigerian businesses
- Occasional: New training cohort announcements
- Seasonal: Special offers (e.g. "Back to school laptop deals")
- Keep it short: 3 paragraphs maximum, one clear call to action

---

## 6. DEPLOY TO YOUR HOSTING

### Option A: cPanel Hosting (Whogohost, DomainKing, Qservers, Smartweb, etc.)

This is the most common Nigerian hosting setup. Steps:

1. Log in to your hosting cPanel
2. Open **File Manager**
3. Navigate to `public_html` (this is your website root)
4. Upload the contents of this zip file (not the folder — the contents inside)
   - Your files should be: `index.html`, `sitemap.xml`, `robots.txt`, `pages/`, `css/`, `js/`, `images/`
5. Make sure `index.html` is directly inside `public_html/` (not in a subfolder)
6. Visit your domain — the site should load immediately

**For the contact form on cPanel:**
We recommend Formspree (see Section 3) — it's easier than PHP.
If you prefer the PHP backend: upload `backend/contact.php` and update
the endpoint in `js/main.js`:
```javascript
// Replace the Formspree line with:
await submitToBackend(form, '/backend/contact.php');
```

### Option B: Netlify (free, fast, no cPanel needed)

1. Go to **netlify.com** and create a free account
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the entire `gtarsenals-v2/` folder into the upload box
4. Netlify gives you a free URL like `gtarsenals.netlify.app`
5. To use your real domain: Site Settings → Domain Management → Add custom domain
6. SSL is automatic — no extra steps needed

**Note:** On Netlify you cannot use the PHP backend. Use Formspree instead.

### Option C: VPS (DigitalOcean, AWS, Render)

Use the `backend/server.js` Node.js backend. See `backend/` folder for
full setup instructions. Recommended only if you have developer experience.

### After deploying — test this checklist:
- [ ] Homepage loads at your domain
- [ ] All page links work (Services, Training, Pricing, About, Blog)
- [ ] Contact form submits and you receive an email
- [ ] WhatsApp button opens the right number
- [ ] Site loads on mobile (check on your phone)
- [ ] HTTPS padlock shows in browser address bar

---

## 7. SUBMIT TO GOOGLE

Do this within 24 hours of going live. It tells Google your site exists
and starts the ranking process.

1. Go to **https://search.google.com/search-console**
2. Sign in with your Google account
3. Click "Add Property" → enter `https://gtarsenals.com`
4. Verify ownership (easiest method: HTML file upload — they give you a file,
   upload it to your `public_html/` folder)
5. In the left menu → **Sitemaps** → enter `sitemap.xml` → Submit

Google will begin crawling and indexing your pages. You'll start appearing
in search results within 1–4 weeks for your business name, and over 2–6
months for competitive keywords like "IT company Abuja."

---

## 8. SET UP GOOGLE BUSINESS PROFILE

This is **the single highest-impact free thing** you can do for GT Arsenals.
It puts you on Google Maps and shows your business in search results with
your address, phone number, hours, and star ratings.

1. Go to **https://business.google.com**
2. Sign in with your Google account
3. Search for "GT Arsenals" — if it doesn't exist, click "Add your business"
4. Enter:
   - Business name: GT Arsenals Ltd
   - Category: IT Services & Computer Repair
   - Address: Old Secretariat, Garki 1, Abuja, FCT
   - Phone: +234 707 118 8890
   - Website: https://gtarsenals.com
   - Hours: Monday–Saturday 8:00 AM – 6:00 PM
5. Google will send a verification postcard or allow phone/email verification
6. Once verified, add photos (office interior, exterior, team, work samples)

**After setting up — ask every client for a Google review.** Even 10 reviews
with an average of 4.5 stars will significantly boost your visibility in
Abuja search results.

---

## 9. ADD YOUR PHOTOS

All photo placeholders in the website will be replaced when you add real images.
Place all photos in the `/images/` folder with the exact filenames below.

| Filename | Size | Where it appears |
|---|---|---|
| `favicon.png` | 64×64px | Browser tab icon |
| `logo.png` | 180×50px | Navbar (light backgrounds) |
| `logo-white.png` | 180×50px | Navbar (dark/hero backgrounds) |
| `og-banner.jpg` | 1200×630px | WhatsApp/Facebook share preview |
| `hero-bg.jpg` | 1920×1080px | Homepage hero background (optional) |
| `team-member1.jpg` | 300×300px | Team section — Founder/CEO |
| `team-member2.jpg` | 300×300px | Team section — Lead Engineer |
| `team-member3.jpg` | 300×300px | Team section — member 3 |
| `team-member4.jpg` | 300×300px | Team section — member 4 |
| `gallery-office.jpg` | 700×480px | Gallery — office interior |
| `gallery-training.jpg` | 700×480px | Gallery — training session |
| `gallery-repair.jpg` | 700×480px | Gallery — repair/tech work |
| `gallery-team.jpg` | 700×480px | Gallery — team photo |
| `gallery-networking.jpg` | 700×480px | Gallery — network installation |
| `gallery-project.jpg` | 700×480px | Gallery — client project |
| `product-1.jpg` | 600×400px | Shop — product 1 |
| `product-2.jpg` | 600×400px | Shop — product 2 |
| `product-3.jpg` | 600×400px | Shop — product 3 |
| `product-4.jpg` | 600×400px | Shop — product 4 |
| `blog-cybersecurity.jpg` | 760×400px | Blog article 1 hero |
| `blog-laptops.jpg` | 760×400px | Blog article 2 hero |
| `client-1.png` | 120×40px | Client logos (grayscale PNG) |
| `client-2.png` | 120×40px | Client logos |
| `about-photo.jpg` | 600×700px | About page hero photo |

**Free tools to resize/edit photos:**
- **Canva.com** — free, drag and drop, no software to install
- **Squoosh.app** — free, compress photos without losing quality
- **Remove.bg** — free, remove photo backgrounds for team headshots

---

## 10. ADD TEAM NAMES AND PHOTOS

### In `index.html` — Team section

Search for `Team Member Name` and replace with real names.
Also add the LinkedIn URL for each team member.

Example — change this:
```html
<h4>Team Member Name</h4>
<div class="team-role">Founder / CEO</div>
<p class="team-bio">Technology professional with expertise in IT infrastructure and business solutions.</p>
```

To this:
```html
<h4>Chukwuemeka Okafor</h4>
<div class="team-role">Founder / CEO</div>
<p class="team-bio">IT professional with 8+ years experience in networking and cybersecurity. Founded GT Arsenals to bring quality IT services to Abuja.</p>
```

Then replace each `img-placeholder` block with a real image:
```html
<!-- Delete the placeholder div and add this instead: -->
<img src="images/team-member1.jpg" alt="Chukwuemeka Okafor — Founder GT Arsenals" class="team-photo" />
```

Do the same in `pages/about.html` — search for "Team Member Name" there too.

---

## 11. UPDATE THE GOOGLE MAP

The map on the homepage contact section currently shows a general Garki 1
pin. To get your exact office location:

1. Go to **maps.google.com**
2. Search for your exact office address:
   `Old Secretariat Garki 1 Abuja FCT Nigeria`
3. Find the correct pin. If it's slightly off, right-click → "Add your business"
4. Once you see the right location, click **Share** → **Embed a map**
5. Click **Copy HTML**
6. Open `index.html` and search for: `class="map-wrap"`
7. Replace the `<iframe>` inside that div with the one you just copied

---

## 12. UPDATE SOCIAL MEDIA LINKS

**Files:** `index.html` and all pages in `pages/`

Search for this in each file:
```html
<a href="#" class="social-btn" target="_blank" rel="noopener">📘 Facebook</a>
<a href="#" class="social-btn" target="_blank" rel="noopener">📷 Instagram</a>
<a href="#" class="social-btn" target="_blank" rel="noopener">🐦 Twitter/X</a>
```

Replace each `href="#"` with your real social media URL:
```html
<a href="https://facebook.com/gtarsenals" ...>📘 Facebook</a>
<a href="https://instagram.com/gtarsenals" ...>📷 Instagram</a>
<a href="https://twitter.com/gtarsenals" ...>🐦 Twitter/X</a>
```

**Recommended social handles to register:**
- Facebook page: facebook.com/gtarsenals
- Instagram: instagram.com/gtarsenals
- LinkedIn company page: linkedin.com/company/gtarsenals
- Twitter/X: twitter.com/gtarsenals

Also update the footer social icons in each page:
```html
<a href="https://facebook.com/gtarsenals" ...>📘</a>
<a href="https://instagram.com/gtarsenals" ...>📷</a>
```

---

## 13. WRITE MORE BLOG ARTICLES

Two full articles are already written (`cybersecurity-warning-signs.html`
and `laptop-buying-guide.html`). Here are the next 5 article ideas that
will bring you Google traffic:

| Title | Target keyword | Estimated difficulty |
|---|---|---|
| Why Your Office Wi-Fi Is Slow — 6 Fixes | "slow office wifi Nigeria" | Low |
| How Nigerian Scammers Use Phishing Emails | "email scam Nigeria business" | Low |
| 5 Tech Skills That Pay Most in Nigeria 2026 | "tech skills Nigeria salary" | Medium |
| RAM or New Laptop? How to Decide | "upgrade RAM or buy new laptop Nigeria" | Low |
| Does My Business Need a Website in 2026? | "small business website Nigeria" | Medium |

**To write and publish an article:**
1. Copy the file `pages/blog/cybersecurity-warning-signs.html`
2. Rename it to match your article (e.g. `slow-wifi-fixes.html`)
3. Update the `<title>`, `<meta name="description">`, and article content
4. Update the article link in `pages/blog.html` (find the matching card's `href="#"`)
5. Add the new URL to `sitemap.xml`
6. Go live — Google will index the new page automatically within a few days

**Aim for:** 600–1200 words per article. Write like you're explaining to a
client sitting in front of you. No jargon. No fluff. Just useful.

---

## 14. MONTHLY MAINTENANCE CHECKLIST

Run through this list once a month:

- [ ] Check that contact form is still delivering emails (send a test)
- [ ] Review Formspree dashboard for any missed submissions
- [ ] Check Google Search Console for new search queries and fix any errors
- [ ] Respond to any new Google Business Profile reviews
- [ ] Update announcement bar text if you have a new promo or cohort
- [ ] Update pricing if rates have changed (especially repairs and gadget prices)
- [ ] Add at least one new blog article
- [ ] Post on social media at least 2–3 times per week (link back to blog)
- [ ] Back up your website files locally

---

## CONTACTS & SUPPORT

**GT Arsenals Ltd**
Old Secretariat, Garki 1, Abuja, FCT
📱 +234 707 118 8890
📧 info@gtarsenals.com
🌐 gtarsenals.com
RC Number: 8340467

---

*This guide was generated specifically for GT Arsenals Ltd v3 website build.*
*Last updated: February 2026*
