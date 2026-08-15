document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       NAVBAR SCROLL EFFECT
       ========================================== */
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }


    /* ==========================================
       MOBILE NAVIGATION MENU
       ========================================== */
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {

        menuBtn.addEventListener('click', function () {

            const isOpen = navLinks.classList.toggle('active');

            menuBtn.setAttribute('aria-expanded', isOpen);

        });


        /* Close menu when a navigation link is clicked */
        navLinks.querySelectorAll('a').forEach(function (link) {

            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });

        });


        /* Close menu when clicking outside */
        document.addEventListener('click', function (event) {

            if (
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
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
                threshold: 0.1
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

            const currentlyExpanded =
                question.getAttribute('aria-expanded') === 'true';

            faqQuestions.forEach(function (item) {
                item.setAttribute('aria-expanded', 'false');
            });

            question.setAttribute(
                'aria-expanded',
                currentlyExpanded ? 'false' : 'true'
            );

        });

    });

});
