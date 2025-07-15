// ARTRA Artists Page - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initBannerAnimation();
    initMenuInteractions();
    initCTAFunctionality();
    initResponsiveHandling();
    initAccessibility();
    initAnimations();
    
    console.log('ARTRA Artists page loaded successfully');
});

/**
 * Banner scrolling animation
 */
function initBannerAnimation() {
    const bannerText = document.querySelector('.banner__text');
    
    if (bannerText) {
        // Pause animation on hover
        bannerText.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        bannerText.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Respect reduced motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            bannerText.style.animation = 'none';
            bannerText.style.transform = 'none';
        }
    }
}

/**
 * Menu interactions and navigation
 */
function initMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        // Add click handlers for menu items
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            handleMenuClick(text);
        });
        
        // Add keyboard navigation
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make menu items focusable
        if (!item.hasAttribute('tabindex')) {
            item.setAttribute('tabindex', '0');
        }
    });
}

/**
 * Handle menu item clicks
 */
function handleMenuClick(menuText) {
    console.log(`Menu clicked: ${menuText}`);
    
    // Define navigation mappings
    const navigationMap = {
        'MENU': () => toggleMobileMenu(),
        'ABOUT': () => navigateTo('/about'),
        'ABOUT US': () => navigateTo('/about'),
        'ARTWORKS': () => navigateTo('/artworks'),
        'ARTISTS': () => navigateTo('/artists'),
        'GALLERY': () => navigateTo('/gallery'),
        'SEARCH': () => toggleSearch(),
        'PERSONALIZE': () => navigateTo('/personalize'),
        'FRAMING STUDIO': () => navigateTo('/framing'),
        'FRAMES CATALOGUE': () => navigateTo('/catalogue'),
        'CONTACT': () => navigateTo('/contact'),
        'INSTAGRAM': () => openExternalLink('https://instagram.com/artra'),
        'TERMS & CONDITIONS': () => navigateTo('/terms'),
        'PRIVACY': () => navigateTo('/privacy'),
        'COOKIES': () => navigateTo('/cookies'),
        'FAQ': () => navigateTo('/faq')
    };
    
    const action = navigationMap[menuText.toUpperCase()];
    if (action) {
        action();
    }
}

/**
 * CTA button functionality
 */
function initCTAFunctionality() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Go back functionality
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Fallback navigation
                navigateTo('/');
            }
        });
        
        // Make CTA button focusable
        ctaButton.setAttribute('tabindex', '0');
        
        // Add keyboard support
        ctaButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

/**
 * Responsive handling and viewport changes
 */
function initResponsiveHandling() {
    let resizeTimer;
    
    // Handle window resize with debouncing
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            handleViewportChange();
        }, 250);
    });
    
    // Initial viewport setup
    handleViewportChange();
}

/**
 * Handle viewport changes
 */
function handleViewportChange() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Update body classes for responsive styling
    document.body.classList.toggle('mobile-view', isMobile);
    document.body.classList.toggle('tablet-view', isTablet);
    document.body.classList.toggle('desktop-view', window.innerWidth > 1024);
    
    // Adjust layout specific elements
    adjustLayoutForViewport(isMobile, isTablet);
}

/**
 * Adjust layout based on viewport
 */
function adjustLayoutForViewport(isMobile, isTablet) {
    const backgroundImages = document.querySelector('.background-images');
    const titleSection = document.querySelector('.title-section');
    
    if (backgroundImages) {
        // Adjust background positioning for mobile
        if (isMobile) {
            backgroundImages.style.top = '462px';
        } else {
            backgroundImages.style.top = '515px';
        }
    }
    
    // Handle title text switching
    const desktopTitle = document.querySelector('.title-text.desktop-only');
    const mobileTitle = document.querySelector('.title-text.mobile-only');
    
    if (desktopTitle && mobileTitle) {
        if (isMobile) {
            desktopTitle.style.display = 'none';
            mobileTitle.style.display = 'block';
        } else {
            desktopTitle.style.display = 'block';
            mobileTitle.style.display = 'none';
        }
    }
}

/**
 * Newsletter subscription handling
 */
function initNewsletterSubscription() {
    const newsletterInput = document.querySelector('.newsletter-input');
    const inputContainer = document.querySelector('.input-container');
    
    if (inputContainer) {
        inputContainer.addEventListener('click', function() {
            // Create actual input field
            const emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.placeholder = 'Enter Email';
            emailInput.className = 'newsletter-email-input';
            
            // Replace the static text
            const staticText = this.querySelector('span');
            if (staticText) {
                this.replaceChild(emailInput, staticText);
                emailInput.focus();
                
                // Handle submission
                emailInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        handleNewsletterSubscription(this.value);
                    }
                });
                
                emailInput.addEventListener('blur', function() {
                    if (!this.value) {
                        // Restore static text if empty
                        const span = document.createElement('span');
                        span.textContent = 'Enter Email';
                        inputContainer.replaceChild(span, this);
                    }
                });
            }
        });
        
        // Handle arrow click
        const arrow = inputContainer.querySelector('.arrow-icon');
        if (arrow) {
            arrow.addEventListener('click', function(e) {
                e.stopPropagation();
                const emailInput = inputContainer.querySelector('.newsletter-email-input');
                if (emailInput && emailInput.value) {
                    handleNewsletterSubscription(emailInput.value);
                }
            });
        }
    }
}

/**
 * Handle newsletter subscription
 */
function handleNewsletterSubscription(email) {
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Here you would typically send the email to your backend
    console.log(`Newsletter subscription: ${email}`);
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    
    // Reset the input
    const inputContainer = document.querySelector('.input-container');
    const emailInput = inputContainer.querySelector('.newsletter-email-input');
    if (emailInput) {
        const span = document.createElement('span');
        span.textContent = 'Enter Email';
        inputContainer.replaceChild(span, emailInput);
    }
}

/**
 * Accessibility enhancements
 */
function initAccessibility() {
    // Add ARIA labels
    const logo = document.querySelector('.logotype');
    if (logo) {
        logo.setAttribute('aria-label', 'ARTRA - Gallery and Framing Studio');
        logo.setAttribute('role', 'img');
    }
    
    // Add skip navigation link
    addSkipNavigation();
    
    // Enhance keyboard navigation
    enhanceKeyboardNavigation();
    
    // Add screen reader announcements
    addScreenReaderSupport();
}

/**
 * Add skip navigation for accessibility
 */
function addSkipNavigation() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-nav';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add id to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

/**
 * Enhance keyboard navigation
 */
function enhanceKeyboardNavigation() {
    // Tab order management
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((element, index) => {
        element.addEventListener('keydown', function(e) {
            // Escape key handling
            if (e.key === 'Escape') {
                this.blur();
            }
        });
    });
}

/**
 * Screen reader support
 */
function addScreenReaderSupport() {
    // Add live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
    `;
    document.body.appendChild(liveRegion);
    
    // Store reference for announcements
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

/**
 * Initialize animations and interactive effects
 */
function initAnimations() {
    // Initialize intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.title-section, .signature-section, .coming-soon-section'
        );
        
        animateElements.forEach(el => {
            animationObserver.observe(el);
        });
    }
    
    // Initialize signature animation
    initSignatureAnimation();
    
    // Initialize title icon interaction
    initTitleIconInteraction();
}

/**
 * Signature floating animation
 */
function initSignatureAnimation() {
    const signatureIcon = document.querySelector('.signature-icon');
    
    if (signatureIcon && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Add subtle mouse follow effect
        document.addEventListener('mousemove', function(e) {
            const rect = signatureIcon.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) * 0.01;
            const deltaY = (e.clientY - centerY) * 0.01;
            
            signatureIcon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    }
}

/**
 * Title icon interaction
 */
function initTitleIconInteraction() {
    const titleIcon = document.querySelector('.title-icon');
    
    if (titleIcon) {
        titleIcon.addEventListener('click', function() {
            // Add special interaction
            this.style.transform = 'rotate(360deg) scale(1.1)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 600);
            
            // Announce to screen readers
            if (window.announceToScreenReader) {
                window.announceToScreenReader('Artists page icon activated');
            }
        });
    }
}

/**
 * Utility Functions
 */

/**
 * Navigate to a page
 */
function navigateTo(path) {
    console.log(`Navigating to: ${path}`);
    // In a real application, you would use your router here
    // For now, we'll just log the navigation
    if (window.announceToScreenReader) {
        window.announceToScreenReader(`Navigating to ${path}`);
    }
}

/**
 * Open external link
 */
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    console.log('Mobile menu toggled');
    // Implementation would depend on your mobile menu design
    if (window.announceToScreenReader) {
        window.announceToScreenReader('Mobile menu toggled');
    }
}

/**
 * Toggle search functionality
 */
function toggleSearch() {
    console.log('Search toggled');
    // Implementation for search functionality
    if (window.announceToScreenReader) {
        window.announceToScreenReader('Search activated');
    }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    
    // Announce to screen readers
    if (window.announceToScreenReader) {
        window.announceToScreenReader(message);
    }
}

/**
 * Validate email address
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize newsletter after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNewsletterSubscription();
});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .newsletter-email-input {
        border: none;
        background: transparent;
        outline: none;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        width: 100%;
    }
`;
document.head.appendChild(style);
