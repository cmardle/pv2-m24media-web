/**
 * FAQ Navigation Functionality
 * Handles smooth scrolling and active navigation highlighting
 */

class FAQNavigation {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupNavigation());
        } else {
            this.setupNavigation();
        }
    }

    setupNavigation() {
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        console.log('FAQ Navigation initialized');
    }

    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80; // Account for sticky header and navigation
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupActiveNavigation() {
        // Update active navigation highlighting based on scroll position
        const updateActiveNav = () => {
            const sections = document.querySelectorAll('[id^="getting-started"], [id^="features"], [id^="subscription"], [id^="technical"]');
            const navLinks = document.querySelectorAll('.faq-nav a[href^="#"]');
            
            let currentSection = '';
            const scrollPosition = window.pageYOffset + 120; // Offset for better detection
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.id;
                }
            });
            
            // Update active states
            navLinks.forEach(link => {
                const href = link.getAttribute('href').substring(1);
                link.classList.remove('active');
                
                if (href === currentSection) {
                    link.classList.add('active');
                }
            });
        };

        // Throttle scroll events for better performance
        let scrollTimeout;
        const throttledUpdateActiveNav = () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(updateActiveNav, 10);
        };

        // Update on scroll and initial load
        window.addEventListener('scroll', throttledUpdateActiveNav);
        updateActiveNav(); // Initial call
    }

    // Public method to scroll to a specific section
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize FAQ Navigation
const faqNavigation = new FAQNavigation();

// Export for global access if needed
window.FAQNavigation = faqNavigation;
