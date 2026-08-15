document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       SETUP JS-DEPENDENT ANIMATIONS (Safe Fallback)
       ========================================== */
    // Add class to body so CSS knows JS is active and elements can be hidden before revealing.
    // If JS fails, this class is never added, and elements remain fully visible.
    document.body.classList.add('js-ready');

    /* ==========================================
       NAVBAR SCROLL EFFECT
       ========================================== */
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    /* ==========================================
       MOBILE NAVIGATION MENU (Fully Fixed)
       ========================================== */
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        
        // Toggle menu on button click
        menuBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent document click from immediately closing it
            const isOpen = navLinks.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when a navigation link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside of it
        document.addEventListener('click', function (event) {
            if (
                navLinks.classList.contains('active') && 
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ==========================================
       SCROLL REVEAL (Cleaned Up)
       ========================================== */
    const fadeElements = document.querySelectorAll('.fade-up');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        // Optional: Unobserve after revealing if you only want it to animate once
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        fadeElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        // Fallback for very old browsers: immediately show elements
        fadeElements.forEach(function (element) {
            element.classList.add('in-view');
        });
    }

    /* ==========================================
       FAQ ACCORDION
       ========================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question) {
        question.addEventListener('click', function () {
            const currentlyExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all others
            faqQuestions.forEach(function (item) {
                item.setAttribute('aria-expanded', 'false');
            });

            // Toggle clicked item
            if (!currentlyExpanded) {
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

});
