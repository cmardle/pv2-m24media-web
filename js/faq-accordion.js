/**
 * FAQ Accordion Functionality
 * Handles the dropdown/accordion behavior for FAQ items
 */

class FAQAccordion {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupAccordion());
        } else {
            this.setupAccordion();
        }
    }

    setupAccordion() {
        const faqButtons = document.querySelectorAll('.faq-button');
        
        if (faqButtons.length === 0) {
            console.warn('No FAQ buttons found');
            return;
        }

        faqButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFAQClick(e, button));
        });

        console.log(`FAQ Accordion initialized with ${faqButtons.length} items`);
    }

    handleFAQClick(event, clickedButton) {
        event.preventDefault();
        
        const targetId = clickedButton.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        const icon = clickedButton.querySelector('.faq-icon');
        
        if (!targetContent) {
            console.error(`FAQ content with ID '${targetId}' not found`);
            return;
        }

        const isCurrentlyOpen = this.isContentVisible(targetContent);
        
        // Close all other FAQ items first
        this.closeAllFAQItems(clickedButton);
        
        // Toggle the clicked item
        if (!isCurrentlyOpen) {
            this.openFAQItem(targetContent, icon);
        } else {
            this.closeFAQItem(targetContent, icon);
        }
    }

    isContentVisible(content) {
        return content.style.display === 'block' || 
               (!content.style.display && !content.classList.contains('tw-hidden') && !content.classList.contains('faq-content'));
    }

    openFAQItem(content, icon) {
        // Remove hidden classes and show content
        content.classList.remove('tw-hidden');
        content.style.display = 'block';
        content.classList.add('show');
        
        // Rotate icon
        if (icon) {
            icon.classList.add('tw-rotate-180');
            icon.style.transform = 'rotate(180deg)';
        }
        
        // Smooth scroll to content with offset for sticky header
        setTimeout(() => {
            const rect = content.getBoundingClientRect();
            const offset = 80; // Account for sticky header
            window.scrollTo({
                top: window.pageYOffset + rect.top - offset,
                behavior: 'smooth'
            });
        }, 100);
    }

    closeFAQItem(content, icon) {
        // Hide content
        content.classList.add('tw-hidden');
        content.style.display = 'none';
        content.classList.remove('show');
        
        // Reset icon rotation
        if (icon) {
            icon.classList.remove('tw-rotate-180');
            icon.style.transform = 'rotate(0deg)';
        }
    }

    closeAllFAQItems(exceptButton = null) {
        const allButtons = document.querySelectorAll('.faq-button');
        
        allButtons.forEach(button => {
            if (button === exceptButton) return;
            
            const targetId = button.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = button.querySelector('.faq-icon');
            
            if (content) {
                this.closeFAQItem(content, icon);
            }
        });
    }

    // Public method to open a specific FAQ item by ID
    openFAQById(faqId) {
        const button = document.querySelector(`[data-target="${faqId}"]`);
        if (button) {
            this.handleFAQClick({ preventDefault: () => {} }, button);
        }
    }

    // Public method to close all FAQ items
    closeAll() {
        this.closeAllFAQItems();
    }
}

// Initialize FAQ Accordion
const faqAccordion = new FAQAccordion();

// Export for global access if needed
window.FAQAccordion = faqAccordion;
