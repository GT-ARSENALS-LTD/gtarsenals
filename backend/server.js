/**
 * GT ARSENALS LTD — Node.js Backend Server
 * File: backend/server.js
 *
 * HOW TO USE:
 * 1. Install Node.js on your server (https://nodejs.org)
 * 2. Run: npm install
 * 3. Copy .env.example to .env and fill in your SMTP credentials
 * 4. Run: node server.js
 *    OR for production use PM2: pm2 start server.js --name gtarsenals
 * 5. In js/main.js, uncomment:
 *    await submitToBackend(form, 'http://yourserver:3001/api/contact');
 *
 * SMTP OPTIONS (pick one):
 * - Gmail: Use an App Password (not your real Gmail password)
 *          See: https://support.google.com/accounts/answer/185833
 * - Zoho Mail: Works great with Nigerian hosting, free plan available
 * - Your hosting SMTP: Check cPanel → Email Accounts for SMTP settings
 */

require('dotenv').config();
const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── MIDDLEWARE ──────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));

// CORS — only allow your own domain
app.use(cors({
  origin: [
    'https://gtarsenals.com',
    'https://www.gtarsenals.com',
    'http://localhost:3000', // For local development
  ],
  methods: ['POST'],
}));

// Rate limiting — max 5 form submissions per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      5,
  message:  { success: false, message: 'Too many requests. Please try again later.' }
});
app.use('/api/contact', limiter);


// ── EMAIL TRANSPORTER ───────────────────────────────────────────
/*
  .env file should contain:
  ─────────────────────────────────────
  SMTP_HOST=smtp.zoho.com          (or smtp.gmail.com)
  SMTP_PORT=465
  SMTP_SECURE=true
  SMTP_USER=info@gtarsenals.com
  SMTP_PASS=yourpassword
  TO_EMAIL=info@gtarsenals.com
  FROM_EMAIL=info@gtarsenals.com
  ─────────────────────────────────────
*/
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.zoho.com',
  port:   parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


// ── CONTACT FORM ENDPOINT ───────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, message, website } = req.body;

  // Honeypot spam check
  if (website) {
    return res.json({ success: true, message: 'Received!' }); // silently reject bots
  }

  // Validation
  if (!name || !email || !message) {
    return res.status(422).json({ success: false, message: 'Name, email, and message are required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(422).json({ success: false, message: 'Invalid email address.' });
  }
  if (message.length < 10) {
    return res.status(422).json({ success: false, message: 'Message is too short.' });
  }

  // Build email content
  const toEmail   = process.env.TO_EMAIL   || 'info@gtarsenals.com';
  const fromEmail = process.env.FROM_EMAIL || 'info@gtarsenals.com';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
      <div style="background: #1E5FB9; padding: 28px 32px;">
        <h2 style="color: #fff; margin: 0;">GT Arsenals Ltd — New Inquiry</h2>
        <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 0.85rem;">Received from website contact form</p>
      </div>
      <div style="padding: 32px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Name:</strong></td><td>${sanitize(name)}</td></tr>
          <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td><td><a href="mailto:${sanitize(email)}">${sanitize(email)}</a></td></tr>
          ${phone    ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td><td>${sanitize(phone)}</td></tr>` : ''}
          ${service  ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;"><strong>Service:</strong></td><td style="color: #1E5FB9; font-weight: 600;">${sanitize(service)}</td></tr>` : ''}
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-left: 3px solid #1E5FB9; border-radius: 0 8px 8px 0;">
          <strong>Message:</strong><br><br>
          ${sanitize(message).replace(/\n/g, '<br>')}
        </div>
        <p style="margin-top: 20px; font-size: 0.78rem; color: #94a3b8;">
          Sent: ${new Date().toUTCString()} | From: gtarsenals.com
        </p>
      </div>
      <div style="background: #060b18; padding: 16px 32px; text-align: center;">
        <p style="color: rgba(255,255,255,0.35); font-size: 0.75rem; margin: 0;">GT Arsenals Ltd · RC: 8340467 · Abuja, FCT</p>
      </div>
    </div>
  `;

  try {
    // Send notification to GT Arsenals
    await transporter.sendMail({
      from:    `"GT Arsenals Website" <${fromEmail}>`,
      to:      toEmail,
      replyTo: `"${name}" <${email}>`,
      subject: `New Inquiry: ${service || 'General'} — from ${name}`,
      text:    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nService: ${service || 'N/A'}\n\nMessage:\n${message}`,
      html:    htmlBody,
    });

    // Send auto-reply to client
    await transporter.sendMail({
      from:    `"GT Arsenals Ltd" <${fromEmail}>`,
      to:      `"${name}" <${email}>`,
      subject: 'We received your inquiry — GT Arsenals Ltd',
      text:    `Hello ${name},\n\nThank you for contacting GT Arsenals Ltd.\n\nWe have received your inquiry${service ? ` about ${service}` : ''} and will respond within 24 hours.\n\nFor faster help, reach us on WhatsApp.\n\nBest regards,\nGT Arsenals Ltd\nhttps://gtarsenals.com`,
    });

    return res.json({ success: true, message: 'Message sent successfully!' });

  } catch (err) {
    console.error('Email error:', err);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please contact us directly.' });
  }
});


// ── HEALTH CHECK ────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', company: 'GT Arsenals Ltd', time: new Date().toISOString() });
});


// ── SANITIZE HELPER ─────────────────────────────────────────────
function sanitize(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


// ── START SERVER ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ GT Arsenals API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});
