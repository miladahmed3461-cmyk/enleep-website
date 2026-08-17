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
/* =========================================================
   DYNAMIC CONTACT FORM
   ========================================================= */

const checkBrand = document.getElementById('check-brand');
const checkCreator = document.getElementById('check-creator');
const fieldsBrand = document.getElementById('dynamic-fields-brand');
const fieldsCreator = document.getElementById('dynamic-fields-creator');
const roleError = document.getElementById('role-error');
const contactForm = document.getElementById('contact-form');

if (
    checkBrand &&
    checkCreator &&
    fieldsBrand &&
    fieldsCreator &&
    contactForm
) {

    function toggleFields(container, enable) {
        container.querySelectorAll('input, textarea').forEach(input => {
            input.disabled = !enable;
            input.required = enable;
        });
    }

    // Start with both sections hidden
    toggleFields(fieldsBrand, false);
    toggleFields(fieldsCreator, false)function toggleFields(container, enable) {
    container.querySelectorAll('input, textarea').forEach(input => {
        input.disabled = !enable;

        // Only Name and Email are mandatory
        if (input.name === 'name' || input.name === 'email') {
            input.required = enable;
        } else {
            input.required = false;
        }
    });
}

    // Brand selection
    checkBrand.addEventListener('change', function () {

        if (this.checked) {
            checkCreator.checked = false;

            fieldsBrand.classList.add('is-visible');
            fieldsCreator.classList.remove('is-visible');

            toggleFields(fieldsBrand, true);
            toggleFields(fieldsCreator, false);

            if (roleError) {
                roleError.style.display = 'none';
            }

        } else {
            fieldsBrand.classList.remove('is-visible');
            toggleFields(fieldsBrand, false);
        }
    });

    // Creator selection
    checkCreator.addEventListener('change', function () {

        if (this.checked) {
            checkBrand.checked = false;

            fieldsCreator.classList.add('is-visible');
            fieldsBrand.classList.remove('is-visible');

            toggleFields(fieldsCreator, true);
            toggleFields(fieldsBrand, false);

            if (roleError) {
                roleError.style.display = 'none';
            }

        } else {
            fieldsCreator.classList.remove('is-visible');
            toggleFields(fieldsCreator, false);
        }
    });

    // Require Brand or Creator selection
    contactForm.addEventListener('submit', function (e) {

        if (!checkBrand.checked && !checkCreator.checked) {
            e.preventDefault();

            if (roleError) {
                roleError.style.display = 'flex';
            }
        }
    });
}
});
