/**
 * Portfolio Main JavaScript
 * Handles navigation, scroll animations, and interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initScrollReveal();
    initSmoothScroll();
    initParallax();
    initMagneticButtons();
    initBackToTop();
    initReadingProgress();
    initActiveNavTracking();
});

/**
 * Navigation Toggle & Scroll Behavior
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Scroll-triggered Animations using Intersection Observer
 */
function initScrollAnimations() {
    // Add reveal class to elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.section-header, .about-text, .skills-grid, .project-card, .testimonial-card, .contact-content, .contact-cta'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Add stagger effect
        if (el.parentElement?.classList.contains('projects-grid') ||
            el.parentElement?.classList.contains('testimonials-grid')) {
            el.classList.add(`stagger-${(index % 4) + 1}`);
        }
    });
}

/**
 * Initialize Scroll Reveal with Intersection Observer
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally stop observing after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax effect for floating cards
 * Enables subtle mouse-following effect
 */
function initParallax() {
    const floatingCards = document.querySelectorAll('.floating-card');

    if (!floatingCards.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        floatingCards.forEach((card, index) => {
            const depth = (index + 1) * 12;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;

            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

/**
 * Magnetic Button Effect
 * Buttons subtly follow cursor within their bounds
 */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');

    if (!magneticButtons.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Utility: Debounce function for performance
 */
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

/**
 * Back to Top Button
 * Shows a floating button when scrolled down
 */
function initBackToTop() {
    // Create back to top button if not exists
    let backToTop = document.querySelector('.back-to-top');

    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18,15 12,9 6,15"></polyline></svg>';
        document.body.appendChild(backToTop);
    }

    // Show/hide button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100, false));

    // Scroll to top when clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Reading Progress Bar
 * Shows progress through the page
 */
function initReadingProgress() {
    // Only add on case study pages
    if (!document.querySelector('.case-hero')) return;

    // Create progress bar if not exists
    let progressBar = document.querySelector('.reading-progress');

    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);
    }

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Active Navigation Tracking
 * Highlights current section in navigation
 */
function initActiveNavTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}
