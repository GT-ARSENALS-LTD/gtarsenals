/* =============================================================
   GT ARSENALS LTD — main.js v3
   
   ┌─────────────────────────────────────────────────────┐
   │  FORMSPREE SETUP (do this once before going live)   │
   │                                                     │
   │  1. Go to https://formspree.io                      │
   │  2. Sign up with info@gtarsenals.com                │
   │  3. Click "New Form"                                │
   │  4. Copy the form ID (looks like: xabcdefg)         │
   │  5. Paste it below replacing YOUR_FORM_ID           │
   │  6. That's it — both forms on the site will work    │
   └─────────────────────────────────────────────────────┘
   
   ============================================================= */

'use strict';

/* ── CONFIGURATION — UPDATE THIS ───────────────────────────────
   Replace YOUR_FORM_ID with your actual Formspree form ID.
   Get it from: https://formspree.io → New Form → copy the ID
   Example: if your endpoint is https://formspree.io/f/xabcdefg
            then set FORMSPREE_ID = 'xabcdefg'
─────────────────────────────────────────────────────────────── */
const FORMSPREE_ID = 'mzdjbzqv'; // ✅ Connected to https://formspree.io/f/mzdjbzqv


document.addEventListener('DOMContentLoaded', () => {
  initAnnouncementBar();
  initNavbar();
  initMobileMenu();
  initCounters();
  initScrollAnimations();
  initFAQ();
  initContactForm();
  initBackToTop();
  initFooterYear();
  initNewsletterForm();
});


/* ─── ANNOUNCEMENT BAR ───────────────────────────────────────── */
function initAnnouncementBar() {
  const bar   = document.querySelector('.announcement-bar');
  const close = document.querySelector('.close-bar');
  if (!bar || !close) return;

  if (sessionStorage.getItem('annBarClosed')) {
    bar.style.display = 'none';
  }

  close.addEventListener('click', () => {
    bar.style.display = 'none';
    sessionStorage.setItem('annBarClosed', '1');
  });
}


/* ─── NAVBAR ─────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const annBar = document.getElementById('annBar');
  const hero   = document.querySelector('.hero');
  if (!navbar) return;

  const isTransparent = navbar.classList.contains('transparent');

  function getBarHeight() {
    if (!annBar) return 0;
    if (annBar.style.display === 'none') return 0;
    return annBar.offsetHeight;
  }

  function positionNavbar() {
    if (!isTransparent) return;
    const barH = getBarHeight();
    const navH = navbar.offsetHeight;
    navbar.style.top = barH + 'px';
    if (hero) hero.style.paddingTop = (barH + navH) + 'px';
  }

  let scrollTimer = null;
const onScroll = () => {
    if (scrollTimer) return; // throttle to once per 60ms
    scrollTimer = setTimeout(() => { scrollTimer = null; }, 80);

    const barH = getBarHeight();
    const scrolled = window.scrollY > barH + 50;

    if (scrolled) {
      if (!navbar.classList.contains('scrolled')) {
        navbar.style.transition = 'background 0.65s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.65s cubic-bezier(0.4, 0, 0.2, 1), padding 0.5s cubic-bezier(0.4, 0, 0.2, 1), top 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        navbar.classList.add('scrolled');
        if (isTransparent) {
          navbar.classList.remove('transparent');
          navbar.style.top = '0';
        }
      }
    } else {
      if (navbar.classList.contains('scrolled')) {
        navbar.style.transition = 'background 0.65s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.65s cubic-bezier(0.4, 0, 0.2, 1), padding 0.5s cubic-bezier(0.4, 0, 0.2, 1), top 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        navbar.classList.remove('scrolled');
        if (isTransparent) {
          navbar.classList.add('transparent');
          positionNavbar();
        }
      }
    }
  };

  positionNavbar();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', positionNavbar, { passive: true });
  onScroll();

  const closeBar = document.getElementById('closeBar');
  if (closeBar) {
    closeBar.addEventListener('click', () => setTimeout(positionNavbar, 30));
  }
}


/* ─── MOBILE MENU ────────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  // Inject a close (×) button fixed at the top-right of the slide-in nav panel
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('aria-label', 'Close navigation');
  closeBtn.style.cssText = `
    position:fixed; top:14px; right:14px;
    width:40px; height:40px;
    background:var(--gray-100,#f3f4f6); border:none; cursor:pointer;
    font-size:1.5rem; line-height:1; color:#1a1a1a;
    border-radius:50%; display:flex; align-items:center; justify-content:center;
    z-index:1002; transition:background 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  `;
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('mouseenter', () => closeBtn.style.background = '#e5e7eb');
  closeBtn.addEventListener('mouseleave', () => closeBtn.style.background = 'var(--gray-100,#f3f4f6)');
  document.body.appendChild(closeBtn);
  closeBtn.style.display = 'none';

  // Dark overlay behind the nav panel
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    display:none; position:fixed; inset:0;
    background:rgba(0,0,0,0.45); z-index:998;
  `;
  document.body.appendChild(overlay);

  const open = () => {
    navLinks.classList.add('open');
    overlay.style.display = 'block';
    closeBtn.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('is-open');
  };
  const close = () => {
    navLinks.classList.remove('open');
    overlay.style.display = 'none';
    closeBtn.style.display = 'none';
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('is-open');
  };

  hamburger.addEventListener('click', () => {
    navLinks.classList.contains('open') ? close() : open();
  });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}


/* ─── COUNTER ANIMATIONS ─────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start    = performance.now();

  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString();
  };
  requestAnimationFrame(step);
}


/* ─── SCROLL ANIMATIONS ──────────────────────────────────────── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  elements.forEach(el => {
    const delay = el.getAttribute('data-aos-delay');
    if (delay) el.style.transitionDelay = `${delay}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

  elements.forEach(el => observer.observe(el));
}


/* ─── FAQ ACCORDION ──────────────────────────────────────────── */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      questions.forEach(q => {
        q.classList.remove('open');
        if (q.nextElementSibling) q.nextElementSibling.style.maxHeight = '0';
      });

      if (!isOpen) {
        btn.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}


/* ─── CONTACT FORM — FORMSPREE ───────────────────────────────── */
/*
  This sends form submissions to Formspree, which emails you
  at info@gtarsenals.com. Make sure FORMSPREE_ID is set at the
  top of this file before going live.
  
  What Formspree gives you automatically:
  ✅ Email to your inbox for every submission
  ✅ Auto-reply email sent to the client
  ✅ Submission history dashboard
  ✅ Spam filtering built in
  ✅ Zapier integration (connect to Google Sheets, Notion, etc.)
*/
function initContactForm() {
  document.querySelectorAll('.contact-form').forEach(form => {
    const statusDiv = form.querySelector('.form-status');
    if (!form || !statusDiv) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name    = (form.querySelector('[name="name"]')?.value    || '').trim();
      const email   = (form.querySelector('[name="email"]')?.value   || '').trim();
      const message = (form.querySelector('[name="message"]')?.value || '').trim();

      if (!name || !email || !message) {
        showStatus(statusDiv, 'error', '⚠️ Please fill in all required fields.');
        return;
      }
      if (!isValidEmail(email)) {
        showStatus(statusDiv, 'error', '⚠️ Please enter a valid email address.');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const origText  = submitBtn.textContent;
      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending...';

      try {
        if (FORMSPREE_ID && FORMSPREE_ID !== 'YOUR_FORM_ID') {
          // ── Live: send to Formspree ──
          await submitToFormspree(form, `https://formspree.io/f/${FORMSPREE_ID}`);
        } else {
          // ── No ID set yet: simulate so UI still works during development ──
          console.warn('Formspree ID not set. Set FORMSPREE_ID in js/main.js');
          await simulateSubmit();
        }

        showStatus(statusDiv, 'success',
          '✅ Message sent! We\'ll respond within 24 hours. For faster replies, WhatsApp us on +234 707 118 8890.');
        form.reset();

      } catch (err) {
        console.error('Form error:', err);
        showStatus(statusDiv, 'error',
          '❌ Could not send. Please WhatsApp us on +234 707 118 8890 or email info@gtarsenals.com directly.');
      } finally {
        submitBtn.disabled    = false;
        submitBtn.textContent = origText;
      }
    });
  });
}

async function submitToFormspree(form, endpoint) {
  const res = await fetch(endpoint, {
    method:  'POST',
    body:    new FormData(form),
    headers: { 'Accept': 'application/json' }
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
  return json;
}

function simulateSubmit() {
  return new Promise(resolve => setTimeout(resolve, 1200));
}

function showStatus(el, type, msg) {
  el.textContent = msg;
  el.className   = `form-status ${type}`;
  if (type === 'success') setTimeout(() => { el.className = 'form-status'; }, 8000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ─── NEWSLETTER FORM ────────────────────────────────────────── */
/*
  The newsletter signup on the blog page collects email addresses.
  
  TO CONNECT TO MAILCHIMP (free, recommended):
  1. Go to mailchimp.com → create free account
  2. Audience → Signup Forms → Embedded Forms
  3. Copy your form action URL (looks like:
     https://gtarsenals.us1.list-manage.com/subscribe/post?u=...&id=...)
  4. Replace MAILCHIMP_URL below with that URL
  
  TO CONNECT TO FORMSPREE INSTEAD:
  Just set NEWSLETTER_FORMSPREE_ID to a second Formspree form ID
  (create a separate form on formspree.io for newsletters)
*/
const MAILCHIMP_URL          = ''; // ← paste Mailchimp form action URL here
const NEWSLETTER_FORMSPREE_ID = ''; // ← OR paste a second Formspree form ID here

function initNewsletterForm() {
  const form  = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');
  const btn   = document.getElementById('newsletterBtn');
  const msg   = document.getElementById('newsletterMsg');
  if (!form || !input || !btn) return;

  btn.addEventListener('click', async () => {
    const email = input.value.trim();
    if (!isValidEmail(email)) {
      if (msg) { msg.textContent = '⚠️ Please enter a valid email.'; msg.style.color = '#dc2626'; }
      return;
    }

    btn.disabled    = true;
    btn.textContent = 'Subscribing...';

    try {
      if (MAILCHIMP_URL) {
        // Mailchimp JSONP submit (works cross-origin)
        const url = MAILCHIMP_URL.replace('/post?', '/post-json?') + `&EMAIL=${encodeURIComponent(email)}&c=?`;
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          window._mcCallback = (data) => {
            delete window._mcCallback;
            document.head.removeChild(script);
            data.result === 'success' ? resolve(data) : reject(data.msg);
          };
          script.src = url + '&callback=_mcCallback';
          document.head.appendChild(script);
          setTimeout(() => reject('timeout'), 8000);
        });
      } else if (NEWSLETTER_FORMSPREE_ID) {
        const res = await fetch(`https://formspree.io/f/${NEWSLETTER_FORMSPREE_ID}`, {
          method: 'POST',
          body: JSON.stringify({ email, source: 'newsletter' }),
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error('Formspree error');
      } else {
        // Neither configured — still show success UI during dev
        await simulateSubmit();
      }

      input.value     = '';
      btn.textContent = '✅ Subscribed!';
      if (msg) { msg.textContent = 'Thank you! You\'ll receive our next tech tip soon.'; msg.style.color = '#16a34a'; }

    } catch (err) {
      btn.textContent = 'Subscribe Free';
      if (msg) { msg.textContent = 'Something went wrong. Please try again.'; msg.style.color = '#dc2626'; }
      console.error('Newsletter error:', err);
    } finally {
      btn.disabled = false;
    }
  });

  // Also allow Enter key
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
  });
}


/* ─── BACK TO TOP ────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ─── FOOTER YEAR ────────────────────────────────────────────── */
function initFooterYear() {
  document.querySelectorAll('.footer-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}