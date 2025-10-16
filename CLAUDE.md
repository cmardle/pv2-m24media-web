# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static marketing website for **Perfumers Vault 2**, a professional perfumery management application. The site showcases app features, FAQ, privacy policy, and terms of service.

## Technology Stack

- **Pure HTML/CSS/JavaScript** - No build process or framework
- **Tailwind CSS** - Pre-compiled (`css/tailwind-build.css`)
- **GSAP** - For scroll animations and reveal effects
- **Swiper** - For carousel/slider components
- **Bootstrap Icons** - Icon library

## File Structure

- `index.html` - Main landing page with hero section and feature showcases
- `faq.html` - Frequently asked questions page with accordion UI
- `privacy.html` - App privacy policy
- `terms.html` - App terms of service
- `index.js` - Main page animations and header toggle logic
- `js/` - Modular JavaScript files:
  - `gdpr-consent.js` - GDPR cookie consent banner management
  - `faq-accordion.js` - FAQ accordion functionality
  - `faq-navigation.js` - FAQ page navigation
  - `theme-and-header.js` - Header collapse/expand logic
- `css/` - Stylesheets:
  - `tailwind-build.css` - Pre-compiled Tailwind utilities
  - `index.css` - Custom styles and overrides
  - `faq.css` - FAQ-specific styles
  - `gdpr-consent.css` - GDPR banner styles
  - `mobile-fixes.css` - Mobile-specific fixes
- `assets/` - Images, logos, and brand assets

## Development Workflow

### Setup

```bash
npm install
```

### Local Development

```bash
npm run dev
```

This starts Cloudflare Wrangler Pages dev server on http://localhost:8788

### Responsive Breakpoints

- Desktop: `>= 1024px` (defined as `RESPONSIVE_WIDTH` in `index.js`)
- Mobile/Tablet: `< 1024px`

## Key Architecture Patterns

### Header Collapse/Expand

The mobile header uses a collapsible menu controlled by `toggleHeader()` in `index.js`. The header automatically collapses on small screens and expands on desktop. Click-outside detection closes the menu on mobile.

### Scroll Animations

GSAP ScrollTrigger is used throughout:
- `.reveal-hero-text` - Text reveals on page load with stagger
- `.reveal-hero-img` - Image reveal with scale animation on background element
- `.reveal-up` - Section-based scroll reveals (opacity + translateY)

Each `<section>` automatically animates its `.reveal-up` elements when scrolled into view.

### GDPR Consent

`SimpleGDPRManager` class handles cookie consent:
- Stores consent in localStorage (`gdpr_cookie_consent_pv2`)
- Version-based consent (v1.0)
- Shows banner if no valid consent exists
- Only essential cookies for this information-only site

### FAQ Accordion

FAQ sections use custom accordion logic in `js/faq-accordion.js` with smooth expand/collapse animations.

## Deployment

### Cloudflare Pages (via Dashboard)

Connect your Git repository to Cloudflare Pages with these settings:

- **Build command:** `npm run build` (or leave empty)
- **Build output directory:** `.` (root directory)
- **Root directory:** `/` (default)
- **Framework preset:** None

The site will auto-deploy on every push to your main branch.

### Manual Deployment (via CLI)

```bash
npm run deploy
```

This manually deploys the current directory to Cloudflare Pages using Wrangler.

**Note:** This is a static site with no build process. All files are served as-is from the root directory.

## External Dependencies

All loaded via CDN:
- GSAP (3.12.0)
- Swiper (v11)
- Bootstrap Icons (1.11.3)
- Google Material Icons

## Important URLs

- App Store: https://apps.apple.com/us/app/perfumers-vault-2/id6748814424
- Developer: https://perfodynelabs.com
- Google Play: Coming soon (badge shows toast notification)
