/**
 * Header Functionality
 * Handles responsive header behavior
 */

class HeaderController {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupHeader());
        } else {
            this.setupHeader();
        }

        // Setup resize listener immediately
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('load', () => this.handleResize());
    }

    setupHeader() {
        this.setupHeaderToggle();
        this.handleResize(); // Initial setup
        console.log('Header controller initialized');
    }

    setupHeaderToggle() {
        // Make toggleHeader function globally available for onclick attribute
        window.toggleHeader = () => this.toggleHeader();
    }

    toggleHeader() {
        const collapseBtn = document.getElementById("collapse-btn");
        const collapseHeaderItems = document.getElementById("collapsed-header-items");
        
        if (!collapseHeaderItems) return;
        
        const isVisible = collapseHeaderItems.style.display === "flex";
        
        if (isVisible) {
            collapseHeaderItems.style.display = "none";
            if (collapseBtn) {
                collapseBtn.classList.remove("bi-x");
                collapseBtn.classList.add("bi-list");
            }
        } else {
            collapseHeaderItems.style.display = "flex";
            if (collapseBtn) {
                collapseBtn.classList.remove("bi-list");
                collapseBtn.classList.add("bi-x");
            }
        }
    }

    handleResize() {
        const collapseBtn = document.getElementById("collapse-btn");
        const collapseHeaderItems = document.getElementById("collapsed-header-items");
        
        if (!collapseBtn || !collapseHeaderItems) return;
        
        if (window.innerWidth > 1024) {
            // Desktop: show nav, hide button
            collapseBtn.style.display = "none";
            collapseHeaderItems.style.display = "flex";
        } else {
            // Mobile: show button, hide nav by default
            collapseBtn.style.display = "block";
            collapseHeaderItems.style.display = "none";
            // Reset button icon
            collapseBtn.classList.remove("bi-x");
            collapseBtn.classList.add("bi-list");
        }
    }
}

// Initialize controllers
const headerController = new HeaderController();

// Export for global access if needed
window.HeaderController = headerController;
