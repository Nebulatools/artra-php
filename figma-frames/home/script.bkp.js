// ARTRA Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll behavior
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Add smooth transition to header
    header.style.transition = 'transform 0.3s ease-in-out';
    
    // Banner scroll animation enhancement
    const bannerText = document.querySelector('.banner-scroll');
    if (bannerText) {
        // Duplicate the text for seamless scrolling
        const text = bannerText.textContent;
        bannerText.innerHTML = text + ' ' + text + ' ' + text;
    }
    
    // Frame collection hover effects
    const frameItems = document.querySelectorAll('.frame-item');
    
    frameItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click handler for frame items
        item.addEventListener('click', function() {
            const frameNumber = this.dataset.frame;
            console.log(`Frame ${frameNumber} clicked`);
            // Here you could add navigation to product detail page
        });
    });
    
    // Highlight cards hover effects
    const highlightCards = document.querySelectorAll('.highlight-card');
    
    highlightCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'Learn About Us') {
                console.log('Navigate to About page');
                // window.location.href = '/about';
            } else if (buttonText === 'Coming Soon') {
                console.log('Coming Soon clicked');
                // Show coming soon modal or message
                showComingSoonMessage();
            }
        });
    });
    
    // Newsletter form handling
    const emailInput = document.querySelector('.email-input');
    const submitArrow = document.querySelector('.submit-arrow');
    
    if (emailInput && submitArrow) {
        submitArrow.addEventListener('click', function(e) {
            e.preventDefault();
            handleNewsletterSubmit();
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNewsletterSubmit();
            }
        });
    }
    
    function handleNewsletterSubmit() {
        const email = emailInput.value.trim();
        
        if (!email) {
            showMessage('Please enter your email address');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address');
            return;
        }
        
        // Simulate newsletter subscription
        console.log('Newsletter subscription:', email);
        showMessage('Thank you for subscribing!');
        emailInput.value = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showComingSoonMessage() {
        showMessage('Coming Soon! Stay tuned for updates.');
    }
    
    function showMessage(message) {
        // Create a simple message overlay
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--accent-color);
            color: var(--text-color);
            padding: 20px 30px;
            border: 1px solid var(--border-color);
            z-index: 1000;
            font-family: var(--font-secondary);
            font-size: 16px;
            line-height: 1.1em;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Animate in
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            console.log(`Navigation: ${linkText}`);
            
            // Add navigation logic here
            switch(linkText) {
                case 'FRAMING STUDIO':
                    console.log('Navigate to Framing Studio');
                    break;
                case 'ABOUT':
                    console.log('Navigate to About');
                    break;
                case 'ARTWORKS':
                    console.log('Navigate to Artworks');
                    break;
                case 'ARTISTS':
                    console.log('Navigate to Artists');
                    break;
                case 'GALLERY':
                    console.log('Navigate to Gallery');
                    break;
                case 'CONTACT':
                    console.log('Navigate to Contact');
                    break;
                case 'INSTAGRAM':
                    window.open('https://instagram.com', '_blank');
                    break;
                default:
                    console.log(`Navigate to: ${linkText}`);
            }
        });
    });
    
    // Menu items in header
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const menuText = this.querySelector('.menu-text:not([style*="display: none"])');
            if (menuText) {
                const text = menuText.textContent.trim();
                console.log(`Menu clicked: ${text}`);
                
                if (text === 'MENU' || text === 'CATALOGUE') {
                    // Toggle mobile menu or navigate to catalogue
                    console.log('Toggle menu/catalogue');
                } else if (text === 'BAG ( 0 )' || text === 'CONTACT') {
                    console.log('Bag or contact clicked');
                }
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
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.highlight-card, .frame-item, .section-title');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Add keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    // Focus search (if implemented)
                    console.log('Search shortcut');
                    break;
                case 'm':
                    e.preventDefault();
                    // Toggle menu
                    console.log('Menu shortcut');
                    break;
            }
        }
        
        // Escape key to close any open overlays
        if (e.key === 'Escape') {
            const messageOverlays = document.querySelectorAll('[style*="position: fixed"]');
            messageOverlays.forEach(overlay => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            });
        }
    });
    
    // Performance optimization
    let ticking = false;
    
    function updateOnScroll() {
        // Add any scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // Touch device detection and handling
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Optimize touch interactions
        frameItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Debug mode (can be enabled for development)
    if (window.location.search.includes('debug=true')) {
        console.log('ARTRA Debug Mode Enabled');
        
        // Add visual debugging helpers
        document.body.style.position = 'relative';
        
        const debugInfo = document.createElement('div');
        debugInfo.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            border-radius: 4px;
        `;
        
        function updateDebugInfo() {
            debugInfo.innerHTML = `
                Viewport: ${window.innerWidth}x${window.innerHeight}<br>
                Scroll: ${window.pageYOffset}px<br>
                Device: ${window.innerWidth <= 768 ? 'Mobile' : 'Desktop'}
            `;
        }
        
        updateDebugInfo();
        window.addEventListener('resize', updateDebugInfo);
        window.addEventListener('scroll', updateDebugInfo);
        
        document.body.appendChild(debugInfo);
    }
    
    console.log('ARTRA Home Page loaded successfully');
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Export functions for external use if needed
window.ARTRA = {
    showMessage: function(message) {
        // This can be called from external scripts
        console.log('ARTRA Message:', message);
    },
    
    navigateTo: function(page) {
        console.log('Navigate to:', page);
        // Add navigation logic
    }
};
