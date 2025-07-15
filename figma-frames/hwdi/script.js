// DOM Elements
const menuButton = document.querySelector('.menu-button');
const bannerText = document.querySelector('.banner-text');
const newsletterForm = document.querySelector('.newsletter-form');
const ctaButtons = document.querySelectorAll('.cta-button');

// Mobile Menu Toggle (placeholder for future implementation)
if (menuButton) {
    menuButton.addEventListener('click', function() {
        console.log('Menu button clicked');
        // Add mobile menu functionality here
    });
}

// Newsletter Form Submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            // Simulate newsletter subscription
            console.log('Newsletter subscription:', email);
            emailInput.value = '';
            
            // Show success message (placeholder)
            alert('Thank you for subscribing to our newsletter!');
        }
    });
}

// CTA Button Interactions
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log('CTA button clicked:', buttonText);
        
        // Add specific actions based on button text
        if (buttonText === 'Learn About Us') {
            console.log('Redirecting to About page');
            // window.location.href = '/about';
        } else if (buttonText === 'Coming Soon') {
            console.log('Coming soon functionality');
            // Show coming soon modal or message
        }
    });
});

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Responsive Image Loading
function loadImages() {
    const images = document.querySelectorAll('img[src="#"]');
    
    images.forEach(img => {
        // Placeholder for actual image loading logic
        img.addEventListener('error', function() {
            this.style.backgroundColor = '#e0e0e0';
            this.style.display = 'block';
        });
    });
}

// Initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    loadImages();
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Responsive adjustments if needed
    const windowWidth = window.innerWidth;
    
    if (windowWidth <= 768) {
        // Mobile specific adjustments
        console.log('Mobile view');
    } else {
        // Desktop specific adjustments
        console.log('Desktop view');
    }
});

// Add loading state for frame images
function handleFrameImageLoading() {
    const frameImages = document.querySelectorAll('.frame-image img');
    
    frameImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.parentElement.style.backgroundColor = '#f0f0f0';
            this.style.display = 'none';
        });
    });
}

// Initialize frame image loading
handleFrameImageLoading();

// Add hover effects for interactive elements
document.querySelectorAll('.frame-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Banner text animation control
if (bannerText) {
    bannerText.addEventListener('animationiteration', function() {
        console.log('Banner text animation iteration');
    });
}

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        '.header',
        '.main-title',
        '.footer'
    ];
    
    requiredElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Required element missing: ${selector}`);
        }
    });
}

// Initialize error handling
handleMissingElements();
