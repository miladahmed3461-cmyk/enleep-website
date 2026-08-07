document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. Smooth Nav Background on Scroll
       ========================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    /* ==========================================
       2. Mobile Menu Toggle
       ========================================== */
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            menuBtn.textContent = isActive ? '✕' : '☰';
            menuBtn.setAttribute('aria-expanded', isActive);
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.textContent = '☰';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ==========================================
       3. FAQ Interactive Accordion
       ========================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Close all questions
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
            });
            
            // If the clicked item wasn't expanded, open it
            if (!isExpanded) {
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ==========================================
       4. Scroll Reveal Animations (Intersection Observer)
       ========================================== */
    const revealElements = document.querySelectorAll('.fade-up');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Animate only once for performance
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('in-view'));
    }
});