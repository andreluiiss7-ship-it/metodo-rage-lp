document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animation is triggered
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // Magnetic Buttons & Glow Tracking
    const magneticButtons = document.querySelectorAll('.btn-primary');
    
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            // Calculate magnet effect (pulling the button towards the cursor slightly)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const distanceX = (x - centerX) * 0.15; // The multiplier changes the magnetic strength
            const distanceY = (y - centerY) * 0.15;
            
            // Set CSS variables
            btn.style.setProperty('--tx', `${distanceX}px`);
            btn.style.setProperty('--ty', `${distanceY}px`);
            btn.style.setProperty('--mouse-x', `${x}px`);
            btn.style.setProperty('--mouse-y', `${y}px`);
        });

        btn.addEventListener('mouseleave', () => {
            // Reset position when mouse leaves
            btn.style.setProperty('--tx', '0px');
            btn.style.setProperty('--ty', '0px');
            btn.style.setProperty('--mouse-x', '50%');
            btn.style.setProperty('--mouse-y', '50%');
        });
    });
});
