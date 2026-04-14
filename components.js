/**
 * SHAJEB KHAN PORTFOLIO - CORE LOGIC
 * Implements premium interactions and responsive behavior.
 * Built to ECC Professional Standards.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initSmoothScroll();
    initHeaderScroll();
});

/**
 * Scroll Reveal Animation
 * Uses Intersection Observer to trigger animations only when elements enter the viewport.
 */
function initScrollReveal() {
    // 1. Find all elements that should animate
    const animateElements = document.querySelectorAll('.animate-in');
    
    // 2. Pause animations initially by ensuring they don't play until 'is-visible' is added
    // CSS should be updated so .animate-in doesn't run the keyframe until .is-visible is present
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger the animation
                entry.target.classList.add('is-visible');
                // Stop observing once revealed (run once)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Smooth Scrolling for Anchor Links
 * Provides a fluid scroll experience for internal navigation.
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header height
                const headerOffset = 90;
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

/**
 * Header Scroll Effects
 * Applies glassmorphism background when scrolling down.
 */
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Initial check
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
}
