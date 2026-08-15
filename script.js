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

        function openMenu() {

            navLinks.classList.add('active');

            menuBtn.setAttribute(
                'aria-expanded',
                'true'
            );

            menuBtn.setAttribute(
                'aria-label',
                'Close navigation menu'
            );

            menuBtn.textContent = '✕';
        }


        function closeMenu() {

            navLinks.classList.remove('active');

            menuBtn.setAttribute(
                'aria-expanded',
                'false'
            );

            menuBtn.setAttribute(
                'aria-label',
                'Open navigation menu'
            );

            menuBtn.textContent = '☰';
        }


        function toggleMenu(event) {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                navLinks.classList.contains('active');

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }


        /* Button click */
        menuBtn.addEventListener(
            'click',
            toggleMenu
        );


        /* Close after clicking navigation link */
        const links =
            navLinks.querySelectorAll('a');

        links.forEach(function (link) {

            link.addEventListener('click', function () {

                closeMenu();

            });

        });


        /* Close when clicking outside menu */
        document.addEventListener('click', function (event) {

            if (
                navLinks.classList.contains('active') &&
                !navLinks.contains(event.target) &&
                !menuBtn.contains(event.target)
            ) {
                closeMenu();
            }

        });


        /* Close menu with Escape */
        document.addEventListener('keydown', function (event) {

            if (
                event.key === 'Escape' &&
                navLinks.classList.contains('active')
            ) {
                closeMenu();
                menuBtn.focus();
            }

        });


        /* Reset menu when returning to desktop */
        window.addEventListener('resize', function () {

            if (window.innerWidth > 768) {
                closeMenu();
            }

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

                q.setAttribute(
                    'aria-expanded',
                    'false'
                );

            });

            if (!isExpanded) {

                question.setAttribute(
                    'aria-expanded',
                    'true'
                );

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
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                'in-view'
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15,
                    rootMargin: '0px 0px -50px 0px'
                }
            );


        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add('in-view');

        });

    }

});
