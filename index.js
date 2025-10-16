// initialization
const RESPONSIVE_WIDTH = 1024;

let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;
const collapseBtn = document.getElementById("collapse-btn");
const collapseHeaderItems = document.getElementById("collapsed-header-items");

function onHeaderClickOutside(e) {
    if (!collapseHeaderItems.contains(e.target) && e.target !== collapseBtn) {
        toggleHeader();
    }
}

function toggleHeader() {
    if (isHeaderCollapsed) {
        collapseHeaderItems.classList.add("opacity-100");
        collapseHeaderItems.style.width = "60vw";
        collapseBtn.classList.remove("bi-list");
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed");
        isHeaderCollapsed = false;
        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1);
    } else {
        collapseHeaderItems.classList.remove("opacity-100");
        collapseHeaderItems.style.width = "0vw";
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed");
        collapseBtn.classList.add("bi-list");
        isHeaderCollapsed = true;
        window.removeEventListener("click", onHeaderClickOutside);
    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = "";
    } else {
        isHeaderCollapsed = true;
    }
}
window.addEventListener("resize", responsive);

// Animations
gsap.registerPlugin(ScrollTrigger);

// set initial reveal states
gsap.to(".reveal-hero-text", { opacity: 0, y: "100%" });
gsap.to(".reveal-hero-img", { opacity: 0, y: "100%" });
gsap.to("#hero-img-bg", { scale: 0 });
gsap.to(".reveal-up", { opacity: 0, y: "100%" });

window.addEventListener("load", () => {
    gsap.to(".reveal-hero-text", { opacity: 1, y: "0%", duration: 0.8, stagger: 0.5 });
    gsap.to(".reveal-hero-img", { opacity: 1, y: "0%" });
    gsap.to("#hero-img-bg", { scale: 1, duration: 0.8, delay: 0.4 });
});

// scroll reveal per section
const sections = gsap.utils.toArray("section");
sections.forEach((sec) => {
    gsap.timeline({
        paused: true,
        scrollTrigger: { trigger: sec, start: "10% 80%", end: "20% 90%" }
    }).to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1, duration: 0.8, y: "0%", stagger: 0.2
    });
});

// Swiper
new Swiper(".swiper", {
    pagination: { el: ".swiper-pagination, .pagination-container", clickable: true },
    navigation: { nextEl: ".testmonial-next", prevEl: ".testmonial-prev" }
});
