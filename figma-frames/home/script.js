// ARTRA Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    let mobileMenuOpen = false;

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuOpen = !mobileMenuOpen;
            
            if (mobileMenuOpen) {
                mobileMenuBtn.textContent = 'CLOSE';
                // Add mobile menu functionality here
                console.log('Mobile menu opened');
            } else {
                mobileMenuBtn.textContent = 'MENU';
                console.log('Mobile menu closed');
            }
        });
    }

    // Smooth Scrolling for Internal Links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Scroll Effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change header appearance on scroll
        if (scrollTop > 100) {
            header.style.background = 'rgba(242, 242, 242, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(242, 242, 242, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Frame Item Interactions
    const frameItems = document.querySelectorAll('.frame-item');
    frameItems.forEach(item => {
        item.addEventListener('click', function() {
            const frameTitle = this.querySelector('.frame-title').textContent;
            showNotification(`Selected: ${frameTitle}`, 'info');
            
            // Add selection visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });

        // Add hover sound effect (optional)
        item.addEventListener('mouseenter', function() {
            // Add subtle visual feedback
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Highlight Card Interactions
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('.card-title').textContent.replace(/\s+/g, ' ').trim();
            showNotification(`Exploring: ${cardTitle}`, 'info');
        });
    });

    // CTA Button Interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            showNotification(`${buttonText} - Coming Soon!`, 'success');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Newsletter Form Handler
    const newsletterForm = document.querySelector('.newsletter-input');
    const newsletterInput = document.querySelector('.newsletter-input input');
    const newsletterButton = document.querySelector('.newsletter-input button');

    if (newsletterButton) {
        newsletterButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = newsletterInput.value.trim();
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            newsletterButton.innerHTML = '<span style="opacity:0.5">Sending...</span>';
            newsletterInput.disabled = true;

            setTimeout(() => {
                showNotification('Thank you for subscribing!', 'success');
                newsletterInput.value = '';
                newsletterInput.disabled = false;
                newsletterButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1l7 7-7 7" stroke="currentColor" stroke-width="2"/>
                    </svg>
                `;
            }, 2000);
        });
    }

    // Enter key support for newsletter
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                newsletterButton.click();
            }
        });
    }

    // Artwork Image Loading Simulation
    const artworkImage = document.querySelector('.artwork-image .image-placeholder');
    if (artworkImage) {
        setTimeout(() => {
            artworkImage.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 1000);
    }

    // Frame Images Loading Simulation
    const frameImages = document.querySelectorAll('.frame-image .image-placeholder');
    frameImages.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, index * 200);
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.frame-item, .highlight-card, .artwork-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Footer Links Interaction
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            showNotification(`${linkText} - Page coming soon`, 'info');
        });
    });

    // Logo Click Handler
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && mobileMenuOpen) {
            mobileMenuBtn.click();
        }

        // Arrow keys for frame navigation (optional)
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const focusedFrame = document.querySelector('.frame-item:focus');
            if (focusedFrame) {
                e.preventDefault();
                const allFrames = Array.from(document.querySelectorAll('.frame-item'));
                const currentIndex = allFrames.indexOf(focusedFrame);
                
                let nextIndex;
                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : allFrames.length - 1;
                } else {
                    nextIndex = currentIndex < allFrames.length - 1 ? currentIndex + 1 : 0;
                }
                
                allFrames[nextIndex].focus();
            }
        }
    });

    // Add tabindex for keyboard navigation
    frameItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Frame ${index + 1}`);
    });

    // Performance: Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize-specific logic here
            console.log('Window resized');
        }, 250);
    });

    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });

    console.log('ARTRA Home page loaded successfully');
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    const colors = {
        'info': '#007bff',
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        line-height: 1.4;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Preload critical images (if any)
function preloadImages() {
    const imagesToPreload = [
        // Add image URLs here when available
    ];

    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Global error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

// Analytics placeholder (replace with actual analytics)
function trackEvent(category, action, label) {
    console.log('Analytics event:', { category, action, label });
    // Replace with actual analytics code (Google Analytics, etc.)
}

// Track user interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.matches('.frame-item')) {
        trackEvent('Interaction', 'Frame Click', target.querySelector('.frame-title')?.textContent);
    } else if (target.matches('.cta-button')) {
        trackEvent('Interaction', 'CTA Click', target.textContent);
    } else if (target.matches('.highlight-card')) {
        trackEvent('Interaction', 'Highlight Click', target.querySelector('.card-title')?.textContent);
    }
});
