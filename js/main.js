/* ============================================
   SREE VAGEESHWARI VIDYA PEETHAM
   Main JavaScript — Multi-Page
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Mobile Navigation ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- Header Scroll Effect ----------
    const header = document.getElementById('header');
    const sacredBar = document.querySelector('.sacred-top-bar');

    if (header && sacredBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
                sacredBar.style.transform = 'translateY(-100%)';
                sacredBar.style.transition = 'transform 0.3s ease';
                header.style.top = '0';
            } else {
                header.classList.remove('scrolled');
                sacredBar.style.transform = '';
                header.style.top = '38px';
            }
        });
    }

    // ---------- Back to Top Button ----------
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- Progress Bar Animation ----------
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = progressFill.dataset.progress;
                    progressFill.style.width = progress + '%';
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        progressObserver.observe(progressFill);
    }

    // ---------- Scroll Animations ----------
    const animateElements = document.querySelectorAll(
        '.feature-card, .value-card, .component-card, .timeline-content, ' +
        '.tier-card, .support-way, .gallery-item, .highlight-item, ' +
        '.home-about-content, .home-about-image, .about-history-content, .about-history-image, ' +
        '.guru-card, .journey-step, .team-card, ' +
        '.project-intro, .progress-section, .fund-card, .fund-overview, ' +
        '.future-vision-box, .bank-details, .contact-info, .contact-form-wrapper, ' +
        '.stat-card, .highlight-box, .about-intro, .support-intro, .support-verse'
    );

    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index % 6 * 0.1}s, transform 0.6s ease ${index % 6 * 0.1}s`;
            observer.observe(el);
        });
    }

    // Add animation class styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `.animate-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(styleSheet);

    // ---------- Gallery Filter ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                galleryItems.forEach(item => {
                    const category = item.dataset.category;
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => { item.style.display = 'none'; }, 300);
                    }
                });
            });
        });

        // Set transition for gallery items
        galleryItems.forEach(item => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }

    // ---------- Divine Floating Particles (Home page) ----------
    const particleContainer = document.getElementById('divineParticles');
    if (particleContainer) {
        const colors = ['#F0C848', '#FFD700', '#FF8C33', '#FFFFFF', '#D4A012'];
        for (let i = 0; i < 35; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (4 + Math.random() * 6) + 's';
            particle.style.animationDelay = Math.random() * 6 + 's';
            const size = (2 + Math.random() * 4) + 'px';
            particle.style.width = size;
            particle.style.height = size;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particleContainer.appendChild(particle);
        }
    }

    // ---------- Contact Form ----------
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showFormMessage('Thank you for your message! We will get back to you soon. 🙏', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    function showFormMessage(text, type) {
        const existing = document.querySelector('.form-message');
        if (existing) existing.remove();

        const msg = document.createElement('div');
        msg.className = 'form-message';
        msg.textContent = text;
        msg.style.cssText = `
            padding: 15px 20px;
            border-radius: 10px;
            margin-top: 15px;
            font-size: 0.95rem;
            font-weight: 500;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            ${type === 'success'
                ? 'background: rgba(40, 167, 69, 0.1); color: #28a745; border: 1px solid rgba(40, 167, 69, 0.2);'
                : 'background: rgba(220, 53, 69, 0.1); color: #dc3545; border: 1px solid rgba(220, 53, 69, 0.2);'
            }
        `;

        contactForm.appendChild(msg);
        requestAnimationFrame(() => {
            msg.style.opacity = '1';
            msg.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(10px)';
            setTimeout(() => msg.remove(), 300);
        }, 5000);
    }

    // ---------- Smooth scroll for anchor links on same page ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---------- Keyboard Accessibility ----------
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navToggle) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ---------- Counter Animation (for stat numbers) ----------
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const targetText = el.textContent;
                    const target = parseInt(targetText);
                    if (isNaN(target)) return;

                    const suffix = targetText.replace(target.toString(), '');
                    let current = 0;
                    const duration = 1500;
                    const step = target / (duration / 16);

                    const animate = () => {
                        current += step;
                        if (current >= target) {
                            el.textContent = target + suffix;
                        } else {
                            el.textContent = Math.floor(current) + suffix;
                            requestAnimationFrame(animate);
                        }
                    };
                    animate();
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    // ---------- Deity Showcase (Hero) ----------
    const deityShowcase = document.getElementById('deityShowcase');
    if (deityShowcase) {
        const frames = deityShowcase.querySelectorAll('.deity-frame');
        let activeIndex = 0;
        let deityInterval;

        function setActiveDeity(index) {
            frames[activeIndex].classList.remove('active');
            activeIndex = index;
            if (activeIndex >= frames.length) activeIndex = 0;
            if (activeIndex < 0) activeIndex = frames.length - 1;
            frames[activeIndex].classList.add('active');
        }

        function nextDeity() {
            setActiveDeity(activeIndex + 1);
        }

        function startDeityRotation() {
            deityInterval = setInterval(nextDeity, 3000);
        }

        function resetDeityRotation() {
            clearInterval(deityInterval);
            startDeityRotation();
        }

        // Click to select
        frames.forEach(frame => {
            frame.addEventListener('click', () => {
                const idx = parseInt(frame.dataset.index);
                setActiveDeity(idx);
                resetDeityRotation();
            });
        });

        // Pause on hover
        deityShowcase.addEventListener('mouseenter', () => clearInterval(deityInterval));
        deityShowcase.addEventListener('mouseleave', startDeityRotation);

        startDeityRotation();
    }

});
