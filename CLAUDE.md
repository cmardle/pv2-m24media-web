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

### Preview Build Locally

```bash
npm run preview
```

Runs Wrangler dev server to simulate Cloudflare Workers environment.

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

### Cloudflare Workers (via Wrangler)

This site deploys as a Cloudflare Worker with static assets.

**Configuration files:**
- `wrangler.json` - Cloudflare Workers configuration
- `package.json` - Contains deploy script

**Deploy command:**
```bash
npm run deploy
```

This runs `wrangler deploy` which:
1. Uploads static assets from the root directory
2. Creates a Cloudflare Worker to serve the files
3. Deploys to Cloudflare's edge network

**Authentication:**
First time setup requires Cloudflare login:
```bash
npx wrangler login
```

**Cloudflare Pages Dashboard Settings:**
- **Build command:** `npm run build`
- **Deploy command:** `npm run deploy`
- **Build output directory:** `.` (root)

The build command is a no-op (just echoes a message), and deploy uses Wrangler to push static assets to Cloudflare Workers.

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
