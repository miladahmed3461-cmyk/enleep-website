document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       SETUP JS-DEPENDENT ANIMATIONS
       ========================================== */
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
       MOBILE NAVIGATION MENU
       ========================================== */
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        
        menuBtn.addEventListener('click', function (e) {
            e.stopPropagation(); 
            const isOpen = navLinks.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isOpen);
            menuBtn.innerHTML = isOpen ? '&#10005;' : '&#9776;'; 
        });

        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.innerHTML = '&#9776;';
            });
        });

        document.addEventListener('click', function (event) {
            if (
                navLinks.classList.contains('active') && 
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.innerHTML = '&#9776;';
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.innerHTML = '&#9776;';
            }
        });
    }

    /* ==========================================
       SCROLL REVEAL 
       ========================================== */
    const fadeElements = document.querySelectorAll('.fade-up');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
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

            faqQuestions.forEach(function (item) {
                item.setAttribute('aria-expanded', 'false');
            });

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

                const fieldName = (input.name || '').toLowerCase();
                if (fieldName === 'name' || fieldName === 'email') {
                    input.required = enable;
                } else {
                    input.required = false;
                }
            });
        }

        toggleFields(fieldsBrand, false);
        toggleFields(fieldsCreator, false);

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
