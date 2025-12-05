// VK Bouwmaster - Modern Interactive Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Logo animation on page load
    const logo = document.querySelector('.logo');
    
    // Add loading animation to logo when page loads
    window.addEventListener('load', function() {
        if (logo) {
            logo.classList.add('loading');
            setTimeout(() => {
                logo.classList.remove('loading');
            }, 2000); // Animation duration
        }
    });
    
    // Header scroll effect and dynamic gradient
    const header = document.getElementById('header');
    const body = document.body;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Header scroll effect
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Keep background using CSS variables for consistency
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Mobile theme toggle
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.style.background = '';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            updateMobileThemeIcon(newTheme);
            showThemeNotification(newTheme);
        });
    }
    
    // Mobile language toggle
    const mobileLangBtn = document.getElementById('mobileLangBtn');
    if (mobileLangBtn) {
        mobileLangBtn.addEventListener('click', function() {
            // Cycle through languages on mobile
            const languages = ['en', 'ru', 'uk', 'pl', 'es', 'nl', 'de', 'fr', 'da', 'it', 'pt', 'sv', 'no'];
            const currentLang = localStorage.getItem('language') || 'en';
            const currentIndex = languages.indexOf(currentLang);
            const nextIndex = (currentIndex + 1) % languages.length;
            const nextLang = languages[nextIndex];
            
            updateLanguage(nextLang);
            updateMobileLanguage(nextLang);
            localStorage.setItem('language', nextLang);
        });
    }
    
    function updateMobileThemeIcon(theme) {
        if (mobileThemeToggle) {
            const icon = mobileThemeToggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
        }
    }
    
    function updateMobileLanguage(lang) {
        if (mobileLangBtn) {
            const flagIcon = mobileLangBtn.querySelector('.flag-icon');
            const langCode = mobileLangBtn.querySelector('.lang-code');
            
            if (flagIcon && langCode) {
                flagIcon.textContent = languageFlags[lang];
                langCode.textContent = lang.toUpperCase();
            }
        }
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Enhanced parallax effects
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const opacity = 1 - scrolled / window.innerHeight;
            
            // Hero parallax with 3D transform
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            
            // Floating elements with different speeds
            floatingElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = scrolled * speed;
                const rotation = scrolled * 0.1 * (index + 1);
                element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
            });
            
            // Fade out hero content on scroll
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = Math.max(0.3, opacity);
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Enhanced service card hover effects with 3D
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateX(-5deg) rotateY(5deg) translateY(-15px) translateZ(50px)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)';
            this.style.zIndex = '1';
        });
        
        // Add mouse tracking for 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) translateZ(50px)`;
        });
    });
    
    // Add click tracking for analytics (placeholder)
    const ctaButtons = document.querySelectorAll('.cta-button, .service-link');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Here you would typically send analytics data
            console.log('Button clicked:', this.textContent);
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            if (navMenu && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2563eb';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Performance optimization: Lazy load images (if any are added later)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #10b981);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Language switcher functionality
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Initialize language
    updateLanguage(currentLang);
    
    if (languageBtn && languageDropdown) {
        languageBtn.addEventListener('click', function() {
            languageDropdown.classList.toggle('active');
            languageBtn.classList.toggle('active');
        });
        
        // Language option selection
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const selectedLang = this.getAttribute('data-lang');
                updateLanguage(selectedLang);
                localStorage.setItem('language', selectedLang);
                
                languageDropdown.classList.remove('active');
                languageBtn.classList.remove('active');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('active');
                languageBtn.classList.remove('active');
            }
        });
    }
    
    function updateLanguage(lang) {
        // Update desktop language button
        if (languageBtn) {
            const flagIcon = languageBtn.querySelector('.flag-icon');
            const langCode = languageBtn.querySelector('.lang-code');
            
            if (flagIcon && langCode) {
                flagIcon.textContent = languageFlags[lang];
                langCode.textContent = lang.toUpperCase();
            }
        }
        
        // Update mobile language button
        updateMobileLanguage(lang);
        
        // Update page content
        translatePage(lang);
    }
    
    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = getTranslation(key, lang);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update specific elements
        const heroTitle = document.querySelector('.hero h1');
        const heroSubtitle = document.querySelector('.hero p');
        const ctaButton = document.querySelector('.cta-button');
        const servicesTitle = document.querySelector('#services .section-title h2');
        const servicesSubtitle = document.querySelector('#services .section-title p');
        
        if (translations[lang]) {
            if (heroTitle) heroTitle.textContent = translations[lang].hero.title;
            if (heroSubtitle) heroSubtitle.textContent = translations[lang].hero.subtitle;
            if (ctaButton) ctaButton.textContent = translations[lang].hero.cta;
            if (servicesTitle) servicesTitle.textContent = translations[lang].services.title;
            if (servicesSubtitle) servicesSubtitle.textContent = translations[lang].services.subtitle;
        }
    }
    
    function getTranslation(key, lang) {
        const keys = key.split('.');
        let translation = translations[lang];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                return null;
            }
        }
        
        return translation;
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Force initial background update
    setTimeout(() => {
        body.style.background = '';
        body.setAttribute('data-theme', currentTheme);
    }, 100);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Clear any inline styles first
            body.style.background = '';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Add animation to toggle button
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show theme change notification
            showThemeNotification(newTheme);
        });
    }
    
    
    function updateThemeIcon(theme) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
            
            // Add active class for visual feedback
            if (theme === 'dark') {
                themeToggle.classList.add('active');
            } else {
                themeToggle.classList.remove('active');
            }
        }
        
        // Update mobile theme button too
        updateMobileThemeIcon(theme);
    }
    
    function showThemeNotification(theme) {
        // Remove existing notification
        const existingNotification = document.querySelector('.theme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${theme === 'dark' ? '🌙' : '☀️'}</span>
                <span class="notification-text">${theme === 'dark' ? 'Dark theme activated' : 'Light theme activated'}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${theme === 'dark' ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
            color: ${theme === 'dark' ? '#f8fafc' : '#1f2937'};
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(15px);
            border: 1px solid ${theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(102, 126, 234, 0.3)'};
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-size: 0.9rem;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 2000);
    }
    
    // Enhanced scroll animations with Intersection Observer
    const enhancedObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const enhancedObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('testimonial-card') || 
                    entry.target.classList.contains('portfolio-item')) {
                    const items = entry.target.parentElement.children;
                    Array.from(items).forEach((item, index) => {
                        if (item === entry.target) {
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, index * 100);
                        }
                    });
                }
            }
        });
    }, enhancedObserverOptions);
    
    // Observe testimonials and portfolio items
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    [...testimonialCards, ...portfolioItems].forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        enhancedObserver.observe(item);
    });
    
    // Portfolio item click handlers
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Here you could open a modal or navigate to a detailed view
            console.log('Portfolio item clicked:', this.querySelector('h3').textContent);
        });
    });
    
    // Add subtle animation to hero text
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 1000);
    }
    
    // Enhanced interactive particle system
    const particles = document.querySelectorAll('.particle');
    
    // Mouse interaction with particles
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            particles.forEach((particle, index) => {
                const particleRect = particle.getBoundingClientRect();
                const particleX = particleRect.left - rect.left + particleRect.width / 2;
                const particleY = particleRect.top - rect.top + particleRect.height / 2;
                
                const distance = Math.sqrt(Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2));
                const maxDistance = 200;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    const angle = Math.atan2(particleY - mouseY, particleX - mouseX);
                    const moveX = Math.cos(angle) * force * 30;
                    const moveY = Math.sin(angle) * force * 30;
                    
                    particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.5})`;
                    particle.style.opacity = 0.8 + force * 0.2;
                } else {
                    particle.style.transform = 'translate(0, 0) scale(1)';
                    particle.style.opacity = 0.4;
                }
            });
        });
        
        hero.addEventListener('mouseleave', function() {
            particles.forEach(particle => {
                particle.style.transform = 'translate(0, 0) scale(1)';
                particle.style.opacity = 0.4;
            });
        });
    }
    
    // Add floating elements animation
    floatingElements.forEach((element, index) => {
        // Add random rotation and movement
        setInterval(() => {
            const randomRotation = Math.random() * 360;
            const randomScale = 0.8 + Math.random() * 0.4;
            element.style.transform = `rotate(${randomRotation}deg) scale(${randomScale})`;
        }, 4000 + index * 1000);
    });
    
    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Counter animation function
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Add CSS for revealed sections
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        section.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll-based animations here
        }, 10);
    });
    
    // Custom cursor effects
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.2) 70%, transparent 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    cursorTrail.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.2s ease;
    `;
    document.body.appendChild(cursorTrail);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        
        cursorTrail.style.left = e.clientX - 20 + 'px';
        cursorTrail.style.top = e.clientY - 20 + 'px';
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursorTrail.style.transform = 'scale(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursorTrail.style.transform = 'scale(1)';
        });
    });
    
    // Add ripple effect on click
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            animation: rippleEffect 0.6s ease-out;
        `;
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    // Add CSS for ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    console.log('VK Bouwmaster website loaded successfully! 🏠✨');
    console.log('Dark mode:', body.getAttribute('data-theme'));
    console.log('Features: 3D effects, interactive particles, custom cursor, parallax, advanced animations');
});