document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right')
        .forEach(el => observer.observe(el));

    // Vacancy meter — anima o fill quando entra em viewport
    const vacancyFill = document.querySelector('.vacancy-fill');
    if (vacancyFill) {
        const vacancyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    vacancyFill.classList.add('filled');
                    vacancyObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        vacancyObserver.observe(vacancyFill);
    }

    // Magnetic Buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            btn.style.setProperty('--tx', `${(x - rect.width / 2) * 0.15}px`);
            btn.style.setProperty('--ty', `${(y - rect.height / 2) * 0.15}px`);
            btn.style.setProperty('--mouse-x', `${x}px`);
            btn.style.setProperty('--mouse-y', `${y}px`);
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.setProperty('--tx', '0px');
            btn.style.setProperty('--ty', '0px');
            btn.style.setProperty('--mouse-x', '50%');
            btn.style.setProperty('--mouse-y', '50%');
        });
    });

    // Sticky bar — aparece após scroll do hero
    const stickyBar = document.getElementById('stickyBar');
    const hero = document.querySelector('.hero');
    if (stickyBar && hero) {
        const showSticky = () => {
            const heroBottom = hero.getBoundingClientRect().bottom;
            stickyBar.classList.toggle('visible', heroBottom < 0);
        };
        window.addEventListener('scroll', showSticky, { passive: true });
    }

    // Scroll depth tracking — dispara ViewContent quando lead engaja
    let viewContentFired = false;
    const fireViewContent = () => {
        if (viewContentFired || typeof fbq === 'undefined') return;
        const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
        if (scrolled >= 0.5) {
            fbq('track', 'ViewContent', { content_name: 'metodo-rage-lp', engagement: 'scroll_50' });
            viewContentFired = true;
            window.removeEventListener('scroll', fireViewContent);
        }
    };
    window.addEventListener('scroll', fireViewContent, { passive: true });

    // CTA tracking granular — identifica qual botão converteu
    document.querySelectorAll('a[href*="form.respondi.app"]').forEach(cta => {
        cta.addEventListener('click', () => {
            if (typeof fbq === 'undefined') return;
            let source = 'unknown';
            if (cta.classList.contains('btn-sticky')) source = 'sticky_bar';
            else if (cta.closest('.hero')) source = 'hero';
            else if (cta.closest('.cta-section')) source = 'final_cta';
            fbq('trackCustom', 'CTAClick', { source });
        });
    });

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            // Fecha todos
            document.querySelectorAll('.faq-question').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling.classList.remove('open');
            });
            // Abre o clicado (se estava fechado)
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                btn.nextElementSibling.classList.add('open');
            }
        });
    });

});
