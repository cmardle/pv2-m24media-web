# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the landing page for **Pattr** - a community app designed for dads. The site serves as the primary marketing and waitlist signup page for the mobile application, featuring interactive slideshows, email collection forms, and responsive design.

**Tech Stack:**
- Vanilla HTML, CSS, and JavaScript
- TailwindCSS v3.4.17 with `tw-` prefix
- GSAP v3.12.0 with ScrollTrigger for animations
- MailerLite integration for email collection
- Static file hosting (designed for simple deployment)

## Development Commands

```bash
# Build TailwindCSS (compiles tailwind.css → tailwind-build.css)
npm run build

# Start development server (http-server on port 3000)
npm run dev

# Alternative development server (Python-based)
npm run serve
```

**Note:** During development, the page uses `tailwind-build.css`. The build command must be run after making changes to Tailwind classes or the source CSS.

## Architecture & Key Components

### File Structure
- `index.html` - Main landing page
- `privacy.html` - Privacy policy page  
- `delete-account.html` - Account deletion instructions
- `css/`
  - `index.css` - Custom styles and CSS variables
  - `tailwind.css` - TailwindCSS source file
  - `tailwind-build.css` - Compiled TailwindCSS output
- `index.js` - Main JavaScript functionality
- `assets/` - Static assets organized by type

### TailwindCSS Configuration
- **Prefix:** All Tailwind classes use `tw-` prefix (e.g., `tw-flex`, `tw-bg-blue-500`)
- **Dark mode:** Configured with `class` strategy
- **Content paths:** Scans `**/*.{html,jsx,js}` files
- **PostCSS:** Uses autoprefixer plugin

### JavaScript Architecture (`index.js`)

**Core Features:**
1. **Slideshow System** - Dissolve transition slideshows for iPhone mockups
   - Automatic image discovery from directory structure
   - Preloading for smooth transitions
   - Staggered timing for multiple slideshows

2. **GSAP Animations**
   - ScrollTrigger-based reveal animations
   - Phone mockup entrance effects
   - Staggered element animations

3. **Form Handling**
   - MailerLite integration for waitlist signups
   - Validation and loading states
   - Dual forms: hero section and bottom signup

4. **Scroll Effects**
   - Header background changes on scroll
   - Smooth scrolling behavior

### Image Asset Organization
```
assets/
├── images/
│   ├── home/
│   │   ├── slideshow1/     # iPhone mockups for first slideshow
│   │   ├── slideshow2/     # iPhone mockups for second slideshow
│   │   ├── iphone-main.png # Hero section phone
│   │   └── iphone-signup.png # Signup section phone
│   └── brand-logos/        # App store badges, company logos
└── logo/
    └── pattr-logo.png      # Main Pattr logo
```

### Slideshow Implementation Details
- **Directory-based:** Images automatically discovered from `slideshow1/` and `slideshow2/` directories
- **Naming convention:** Supports `iphone1.png`, `iphone2.png`, etc., with optional `-dark` variants
- **Dissolve effect:** Uses dual image containers with opacity transitions
- **Timing:** slideshow1 starts immediately, slideshow2 has 5-second delay

## Email Collection & Marketing Integration

### MailerLite Configuration
The site uses **MailerLite** as the email marketing platform for collecting signups and managing the subscriber list.

**Account Details:**
- **Platform:** MailerLite
- **Account ID:** 1653721
- **Form ID:** 159476199801750953
- **Endpoint:** `https://assets.mailerlite.com/jsonp/1653721/forms/159476199801750953/subscribe`
- **Success Redirect:** https://pattr.app/

### Form Implementation Strategy

**Dual Form Setup:**
1. **Hero Form** (`hero-signup-form`) - Quick signup in main banner
2. **Bottom Form** (`pattr-signup-form`) - Detailed signup with benefits list

**Form Fields:**
- **Email:** `name="fields[email]"` (required, validated)
- **Hidden Fields:**
  - `ml-submit: 1` (MailerLite submission flag)
  - `anticsrf: true` (CSRF protection)

### JavaScript Handling (`handleFormSubmission`)

**Submission Flow:**
1. **Prevent Default:** Intercepts form submission
2. **Validation:** Client-side email format validation using regex
3. **Loading State:** Shows spinner, disables button
4. **API Call:** Fetch to MailerLite endpoint with `no-cors` mode
5. **User Feedback:** Success/error messages
6. **Form Reset:** Clears form on successful submission

**Error Handling:**
- Network errors caught and display user-friendly message
- Invalid email addresses rejected before submission
- Loading states prevent double-submissions

### MailerLite Integration Details

**Native Scripts:**
- `https://groot.mailerlite.com/js/w/webforms.min.js` - MailerLite's web forms library
- `ml_webform_success_28205294()` - Success callback function

**CORS Configuration:**
- Uses `mode: 'no-cors'` due to MailerLite's cross-origin restrictions
- Cannot read response status, assumes success if no error thrown
- Fallback to native MailerLite handling if custom JavaScript fails

**Security Features:**
- CSRF protection with `anticsrf` token
- Email validation prevents malformed submissions
- No sensitive data exposure (email only)

### Debugging & Maintenance

**Console Logging:**
- Form submission attempts
- Validation failures
- Network errors
- Success/failure states

**Testing Considerations:**
- Test both forms independently
- Verify MailerLite dashboard receives submissions
- Check email confirmation flow
- Test error states (invalid emails, network issues)

**Form Configuration Location:**
- HTML forms: Lines 64-84 (hero), 598-623 (bottom) in `index.html`
- JavaScript handlers: Lines 351-398 in `index.js`
- CSS styling: Responsive form layouts in `index.css`

### Alternative Form (`mailerlite.html`)
A standalone MailerLite form is available in `mailerlite.html` with different styling, likely used for testing or as a backup implementation.

### Responsive Design Patterns
- **Mobile-first:** Form layouts stack vertically on small screens
- **Breakpoint handling:** Custom media queries prevent button merging at intermediate sizes
- **Image optimization:** Phone mockups scale appropriately across devices

## Development Notes

### CSS Custom Properties
The project uses CSS custom properties for theming in `:root`:
- Color palette focused on blue-grey theme
- Consistent spacing and typography scales
- Dark mode variable support (though not fully implemented)

### Animation Performance
- GSAP animations are optimized for performance
- Elements are hidden (`opacity: 0`) until reveal animations trigger
- ScrollTrigger manages animation lifecycle based on viewport

### Email Collection Strategy
- Two signup forms: hero section (quick signup) and detailed bottom section
- MailerLite handles subscription management and confirmation emails
- Forms designed for high conversion with minimal friction
- **reCAPTCHA Integration**: Both forms include Google reCAPTCHA v2 (site key: 6Lf1KHQUAAAAAFNKEX1hdSWCS3mRMv4FlFaNslaD)
  - Responsive scaling for mobile devices (85% on small screens, 75% on very small screens)
  - JavaScript validation ensures reCAPTCHA completion before form submission
  - Auto-reset after successful form submission

This landing page is designed for easy maintenance and deployment, with minimal build dependencies and clear separation of concerns between styling, functionality, and content.