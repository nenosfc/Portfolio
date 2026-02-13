document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling mejorado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin ms-2"></i>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '¡Mensaje Enviado! <i class="fas fa-check ms-2"></i>';
                btn.classList.replace('btn-primary', 'btn-success');
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-success', 'btn-primary');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // CSS dinámico para las animaciones de scroll
    const style = document.createElement('style');
    style.innerHTML = '.animate-active { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    // Lógica del CV
    const toggleBtn = document.getElementById('toggle-cv');
    const cvPreview = document.getElementById('cv-preview');

    if (toggleBtn && cvPreview) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = cvPreview.style.display === 'none';
            cvPreview.style.display = isHidden ? 'block' : 'none';
            toggleBtn.innerHTML = isHidden ? '👁️ Ocultar CV' : '👁️ Ver Online';
        });
    }
});