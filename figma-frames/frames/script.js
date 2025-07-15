// Frame Details Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu Button Functionality
    const menuButton = document.querySelector('.menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            console.log('Menu clicked');
            // Add menu functionality here
        });
    }

    // CTA Buttons Functionality
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            
            switch(buttonText) {
                case 'Go back':
                    handleGoBack();
                    break;
                case 'Get a Quote':
                    handleGetQuote();
                    break;
                case 'Save For Later':
                    handleSaveForLater();
                    break;
                default:
                    console.log('Button clicked:', buttonText);
            }
        });
    });

    // Newsletter Form Functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button');
        
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleNewsletterSubmit(emailInput.value);
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNewsletterSubmit(this.value);
            }
        });
    }

    // Product Item Interactions
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            handleProductClick(index + 1);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax Effect for Hero Image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroImage.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.frame-details, .product-grid, .discover-next, .spacer-section');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Frame Image Gallery
    const frameImages = document.querySelectorAll('.gallery-frame img, .small-frame img');
    frameImages.forEach(img => {
        img.addEventListener('click', function() {
            openImageModal(this.src, this.alt);
        });
    });

    // Initialize banner animation
    initBannerAnimation();
    
    // Initialize responsive handlers
    handleResponsiveChanges();
});

// Function Implementations
function handleGoBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = '../catalogue/index.html';
    }
}

function handleGetQuote() {
    // Simulate quote request
    console.log('Quote requested for Roman 239 frame');
    
    // Show success message
    showNotification('Quote request submitted! We\'ll contact you soon.', 'success');
    
    // Track event (if analytics are available)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quote_request', {
            'frame_name': 'Roman 239',
            'artist': 'Anne Klein'
        });
    }
}

function handleSaveForLater() {
    // Simulate saving to favorites
    console.log('Frame saved for later');
    
    // Store in localStorage
    const savedFrames = JSON.parse(localStorage.getItem('savedFrames') || '[]');
    const frameData = {
        id: 'roman-239',
        name: 'Roman 239',
        artist: 'Anne Klein',
        savedAt: new Date().toISOString()
    };
    
    if (!savedFrames.find(frame => frame.id === frameData.id)) {
        savedFrames.push(frameData);
        localStorage.setItem('savedFrames', JSON.stringify(savedFrames));
        showNotification('Frame saved to your favorites!', 'success');
    } else {
        showNotification('Frame already in your favorites!', 'info');
    }
}

function handleNewsletterSubmit(email) {
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    console.log('Newsletter subscription:', email);
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        document.querySelector('.newsletter-form input').value = '';
    }, 1000);
}

function handleProductClick(productNumber) {
    console.log(`Product ${productNumber} clicked`);
    
    // Navigate to product details (simulate)
    showNotification(`Loading Frame ${productNumber} details...`, 'info');
    
    // In a real application, you would navigate to the product page
    // window.location.href = `frame-${productNumber}.html`;
}

function openImageModal(src, alt) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="${src}" alt="${alt}" class="modal-image">
                <p class="modal-caption">${alt}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
        }
        .modal-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .modal-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
        }
        .modal-image {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
        }
        .modal-caption {
            color: white;
            text-align: center;
            margin-top: 10px;
        }
    `;
    
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Close modal functionality
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.className === 'modal-overlay' || e.target.className === 'modal-close') {
            document.body.removeChild(modal);
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const styles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            font-family: 'Sohne', sans-serif;
            font-size: 14px;
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        .notification-success { background-color: #28a745; }
        .notification-error { background-color: #dc3545; }
        .notification-info { background-color: #17a2b8; }
        .notification.show { transform: translateX(0); }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initBannerAnimation() {
    const bannerText = document.querySelector('.banner-text');
    if (bannerText) {
        // Pause animation on hover
        bannerText.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        bannerText.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
}

function handleResponsiveChanges() {
    let isMobile = window.innerWidth <= 768;
    
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        
        if (isMobile !== newIsMobile) {
            isMobile = newIsMobile;
            
            // Adjust spacer grid for mobile
            const spacerGrid = document.querySelector('.spacer-grid');
            if (spacerGrid) {
                if (isMobile) {
                    spacerGrid.style.gridTemplateColumns = 'repeat(6, 65px)';
                } else {
                    spacerGrid.style.gridTemplateColumns = 'repeat(16, 90px)';
                }
            }
            
            // Adjust product grid
            const productGrid = document.querySelector('.product-grid');
            if (productGrid) {
                if (isMobile) {
                    productGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                } else {
                    productGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(340px, 1fr))';
                }
            }
        }
    });
}

// Add CSS animations
const animationStyles = `
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
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .frame-details,
    .product-grid,
    .discover-next,
    .spacer-section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .product-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .product-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

// Inject animation styles
if (!document.querySelector('#animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll handler if needed
window.addEventListener('scroll', debounce(function() {
    // Additional scroll-based animations can be added here
}, 16)); // ~60fps
