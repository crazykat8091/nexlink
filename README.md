# NexLink · Expert On-Site Tech Support v2.0.0

Professional in-home tech support for Chicago and the surrounding suburbs. This repository contains the source code for the NexLink web platform and high-performance branding assets.

## 🚀 Project Overview

NexLink makes high-end tech support feel personal again. Instead of waiting weeks for a repair shop, I bring 30 years of engineering experience directly to your door.

### Key Features
- **Modular Architecture:** Refactored for maintainability with separated HTML, CSS, and JS components.
- **World-Class Branding:** Fully synchronized SVG design system for dark/light modes and print.
- **Performance Driven:** Lightweight HTML5/CSS3 architecture with zero external framework dependencies for sub-second load times.
- **Responsive Experience:** Seamless transitions from desktop browsers to mobile devices.

## 🎨 Brand Identity
- **Typography:** Plus Jakarta Sans (Brand), Inter (UI), JetBrains Mono (Technical), Caveat (Signature).
- **OG Image:** 1200 x 630 pixels.
- **Color Palette:** 
  - **Primary Accent:** `#ff8a2a` (International Orange - optimized for Dark Mode)
  - **Accessible Accent:** `#bf5a00` (Deep Orange - optimized for Light Mode)
  - **Dark Surface:** `#0e0e0e` (Charcoal)
  - **Light Surface:** `#fcfaf8` (Snow)

## 🛠 Tech Stack
- **Frontend:** HTML5, CSS3 (Modern Flexbox/Grid), Vanilla JavaScript (ES6+).
- **Graphics:** Vector XML (SVG).

## 📂 Project Structure
- `NexLink.html`: The core structural shell and SEO metadata.
- `styles.css`: The complete design system and responsive layouts.
- `app.js`: Core interactivity, theme management, and AI integration.

##  Getting Started

### Installation
```bash
npm install
```

### Running Locally
```bash
npm start
```

The server will start at `http://localhost:3000`

### GitHub Pages Deployment

#### Option 1: GitHub Pages Static Site (Recommended for Testing)
1. Push code to GitHub repository
2. Go to repository **Settings → Pages**
3. Select `main` branch as source
4. Site will be available at: `https://crazykat8091.github.io/nexlink/`

**Note:** The `<base>` tag in `NexLink.html` is configured for `/nexlink/`. The Node.js backend (chatbot API) won't work on GitHub Pages static hosting; you'll need a backend service like Vercel for the AI features to function.

## 📋 Deployment Checklist

### Before Going Live:
- [ ] **Update Phone Number:** Replace `+1-773-555-TECH` in `NexLink.html` (Search for "tel:" links in Hero and Contact sections)
- [ ] **Configure Formspree:** 
  - Sign up at [formspree.io](https://formspree.io)
  - Create a new form and get your form ID
  - Replace `YOUR_FORMSPREE_ID` in `NexLink.html` (Contact Modal form action)
  - Test email submissions in contact modal
- [ ] **Add Google Site Verification:** Update `google-site-verification` meta tag
- [ ] **Social Media Links:** Update links in both the Contact Modal and the Footer
- [ ] **Ensure `og-image.jpg` is present** for social media link previews (1200 x 630 pixels)
- [ ] **Custom Domain:** 
  - Add a `CNAME` file containing `nexlink.tech` to root (if using GitHub Pages)
  - Update absolute URLs in meta tags from `https://www.nexlink.tech/` to your domain
- [ ] **API Key Security:** 
  - Use environment variables in production
  - Never commit API keys to repository
  - Rotate keys if accidentally exposed

### Testing & Validation:
- [ ] **Performance:** Run [PageSpeed Insights](https://pagespeed.web.dev/) - Target: 90+/100
- [ ] **Social Preview:** Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to verify OG image
- [ ] **Mobile Responsive:** Test on iPhone/Android in Chrome DevTools
- [ ] **Chatbot:** Test AI chat with `/api/chat` endpoint
- [ ] **Accessibility:** Check WCAG 2.1 AA compliance with [axe DevTools](https://www.deque.com/axe/devtools/)
- [ ] **DNS:** Verify domain resolves correctly and SSL cert is valid

### 🛠 Production Tools
- **Social Debugger:** [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (Use "Scrape Again" if preview doesn't update)
- **Performance Check:** [PageSpeed Insights](https://pagespeed.web.dev/)
- **SEO Check:** [Google Search Console](https://search.google.com/search-console/)
- **Accessibility:** [axe DevTools](https://www.deque.com/axe/devtools/)
- **SSL/HTTPS:** [SSL Labs](https://www.ssllabs.com/ssltest/)

## 🤝 Contact
**Bodin Praphanthongchai**  
Email: info@nexlink.tech  
Website: www.nexlink.tech

---
*Developed by Bodin Praphanthongchai · Version 2.0.0*