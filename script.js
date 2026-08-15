document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       1. NAVBAR SCROLL
       ========================================== */

    const navbar = document.getElementById('navbar');

    if (navbar) {
        let ticking = false;

        window.addEventListener('scroll', function () {

            if (!ticking) {
                window.requestAnimationFrame(function () {

                    navbar.classList.toggle(
                        'scrolled',
                        window.scrollY > 50
                    );

                    ticking = false;
                });

                ticking = true;
            }

        }, { passive: true });
    }


    /* ==========================================
       2. MOBILE MENU
       ========================================== */

    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {

        menuBtn.addEventListener('click', function (event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen = navLinks.classList.toggle('active');

            menuBtn.textContent = isOpen ? '✕' : '☰';

            menuBtn.setAttribute(
                'aria-expanded',
                isOpen ? 'true' : 'false'
            );

            menuBtn.setAttribute(
                'aria-label',
                isOpen
                    ? 'Close navigation menu'
                    : 'Open navigation menu'
            );

        });


        /* Close menu when a link is clicked */

        const links = navLinks.querySelectorAll('a');

        links.forEach(function (link) {

            link.addEventListener('click', function () {

                navLinks.classList.remove('active');

                menuBtn.textContent = '☰';

                menuBtn.setAttribute(
                    'aria-expanded',
                    'false'
                );

                menuBtn.setAttribute(
                    'aria-label',
                    'Open navigation menu'
                );

            });

        });

    }


    /* ==========================================
       3. FAQ
       ========================================== */

    const faqQuestions =
        document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question) {

        question.addEventListener('click', function () {

            const isExpanded =
                question.getAttribute('aria-expanded') === 'true';

            faqQuestions.forEach(function (q) {
                q.setAttribute('aria-expanded', 'false');
            });

            if (!isExpanded) {
                question.setAttribute('aria-expanded', 'true');
            }

        });

    });


    /* ==========================================
       4. SCROLL REVEAL
       ========================================== */

    const revealElements =
        document.querySelectorAll('.fade-up');

    if ('IntersectionObserver' in window) {

        const observer =
            new IntersectionObserver(function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add('in-view');

                        observer.unobserve(entry.target);

                    }

                });

            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            });


        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add('in-view');
        });

    }

});
