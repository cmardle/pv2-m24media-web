// Simple GDPR Cookie Consent for PV2 (Information-only website)
class SimpleGDPRManager {
  constructor() {
    this.overlay = null;
    this.banner = null;
    this.settingsBtn = null;
    
    this.consentKey = 'gdpr_cookie_consent_pv2';
    this.consentVersion = '1.0';
    
    // Simple consent categories for info-only site
    this.categories = {
      essential: { required: true, enabled: true }
    };
    
    this.init();
  }

  init() {
    this.createElements();
    this.bindEvents();
    this.loadSavedConsent();
    
    // Show banner if no consent exists or consent is older than 1 year
    if (!this.hasValidConsent()) {
      this.showBanner();
    } else {
      this.showSettingsButton();
      this.loadCookies();
    }
  }

  createElements() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.id = 'gdpr-overlay';
    this.overlay.className = 'gdpr-overlay';
    document.body.appendChild(this.overlay);

    // Create banner
    this.banner = document.createElement('div');
    this.banner.id = 'gdpr-banner';
    this.banner.className = 'gdpr-banner';
    this.banner.innerHTML = `
      <div class="gdpr-banner-content">
        <div class="gdpr-banner-text">
          <h5 class="gdpr-banner-title">
            <svg class="gdpr-cookie-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-2a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"/>
            </svg>
            Cookie Consent Required
          </h5>
          <p class="gdpr-banner-description">
            <strong>Please acknowledge our cookie usage.</strong> This website only uses essential cookies to ensure proper functionality. No analytics or tracking cookies are used.
          </p>
          <p class="gdpr-banner-description">
            <a href="/privacy.html" class="gdpr-banner-privacy-link">View our Privacy Policy</a>
            |
            <a href="/terms.html" class="gdpr-banner-privacy-link">View our Terms</a>
          </p>
        </div>
        <div class="gdpr-banner-buttons">
          <button id="gdpr-accept" class="gdpr-btn gdpr-btn-accept">
            Accept Essential Cookies
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(this.banner);

    // Create settings button
    this.settingsBtn = document.createElement('button');
    this.settingsBtn.id = 'gdpr-settings-btn';
    this.settingsBtn.className = 'gdpr-settings-btn';
    this.settingsBtn.title = 'Cookie Settings';
    this.settingsBtn.innerHTML = `
      <svg class="gdpr-cookie-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-2a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"/>
      </svg>
    `;
    document.body.appendChild(this.settingsBtn);
  }

  bindEvents() {
    // Banner button
    document.getElementById('gdpr-accept')?.addEventListener('click', () => this.acceptEssential());
    
    // Settings button
    this.settingsBtn?.addEventListener('click', () => this.showBanner());
    
    // Prevent overlay click from closing banner (force user to choose)
    this.overlay?.addEventListener('click', (e) => e.preventDefault());
    
    // Banner click prevention
    this.banner?.addEventListener('click', (e) => e.stopPropagation());
    
    // Prevent ESC key from closing banner
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.banner && this.banner.style.display === 'block') {
        e.preventDefault();
      }
    });
  }

  hasValidConsent() {
    const consent = this.getConsent();
    if (!consent) return false;
    
    // Check if consent is less than 1 year old
    const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
    return consent.timestamp > oneYearAgo && consent.version === this.consentVersion;
  }

  getConsent() {
    try {
      const consent = localStorage.getItem(this.consentKey);
      return consent ? JSON.parse(consent) : null;
    } catch (e) {
      return null;
    }
  }

  saveConsent(categories) {
    const consent = {
      categories: categories,
      timestamp: Date.now(),
      version: this.consentVersion,
      userAgent: navigator.userAgent,
      domain: window.location.hostname
    };
    
    localStorage.setItem(this.consentKey, JSON.stringify(consent));
    this.categories = { ...this.categories, ...categories };
  }

  loadSavedConsent() {
    const consent = this.getConsent();
    if (consent && consent.categories) {
      this.categories = { ...this.categories, ...consent.categories };
    }
  }

  acceptEssential() {
    const essentialOnly = {};
    Object.keys(this.categories).forEach(category => {
      essentialOnly[category] = { 
        ...this.categories[category], 
        enabled: this.categories[category].required 
      };
    });
    
    this.saveConsent(essentialOnly);
    this.hideBanner();
    this.showSettingsButton();
    this.loadCookies();
    this.logConsent('essential_accepted');
  }

  isPrivacyOrTermsPage() {
    // Check if current page is privacy.html or terms.html
    const pathname = window.location.pathname;
    return pathname.includes('privacy.html') || pathname.endsWith('/privacy') ||
           pathname.includes('terms.html') || pathname.endsWith('/terms');
  }

  showBanner() {
    this.banner.style.display = 'block';
    this.overlay.style.display = 'block';
    
    // Check if we're on the privacy or terms page and make overlay transparent + allow interaction
    if (this.isPrivacyOrTermsPage()) {
      this.overlay.style.background = 'transparent';
      this.overlay.style.pointerEvents = 'none'; // Allow clicking through overlay
      // Don't block scrolling on privacy/terms pages
    } else {
      this.overlay.style.background = 'rgba(0, 0, 0, 0.8)';
      this.overlay.style.pointerEvents = 'auto'; // Block interaction on other pages
      // Block page scrolling until consent is given
      document.body.style.overflow = 'hidden';
    }
    
    // Add animation class after a brief delay for smooth animation
    setTimeout(() => {
      this.banner.classList.add('gdpr-show');
    }, 10);
  }

  hideBanner() {
    this.banner.style.display = 'none';
    this.overlay.style.display = 'none';
    this.banner.classList.remove('gdpr-show');
    
    // Restore page scrolling and overlay settings
    document.body.style.overflow = '';
    this.overlay.style.pointerEvents = 'auto';
  }

  showSettingsButton() {
    this.settingsBtn.style.display = 'flex';
  }

  loadCookies() {
    // Only essential cookies are loaded (no analytics)
    this.logConsent('cookies_loaded');
  }

  logConsent(action) {
    console.log('GDPR Consent (PV2):', {
      action: action,
      timestamp: new Date().toISOString(),
      categories: this.categories,
      userAgent: navigator.userAgent,
      domain: window.location.hostname
    });
  }

  withdrawConsent() {
    localStorage.removeItem(this.consentKey);
    this.categories = {
      essential: { required: true, enabled: true }
    };
    this.showBanner();
    this.settingsBtn.style.display = 'none';
    this.logConsent('withdraw_consent');
  }

  hasConsent(category) {
    return this.categories[category]?.enabled || false;
  }
}

// Initialize GDPR Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.gdprManager = new SimpleGDPRManager();
});

// Expose methods for external use
window.gdprWithdrawConsent = () => {
  if (window.gdprManager) {
    window.gdprManager.withdrawConsent();
  }
};

window.gdprHasConsent = (category) => {
  return window.gdprManager ? window.gdprManager.hasConsent(category) : false;
};