document.addEventListener('DOMContentLoaded', function () {

    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function () {
            const open = navLinks.classList.toggle('active');

            menuBtn.textContent = open ? '✕' : '☰';
            menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                menuBtn.textContent = '☰';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.querySelectorAll('.faq-question').forEach(function (question) {
        question.addEventListener('click', function () {
            const expanded = question.getAttribute('aria-expanded') === 'true';

            document.querySelectorAll('.faq-question').forEach(function (q) {
                q.setAttribute('aria-expanded', 'false');
            });

            if (!expanded) {
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

});
