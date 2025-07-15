// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Gallery page loaded');
    
    // Initialize page components
    initializeHeader();
    initializeNewsletter();
    initializeAnimations();
    initializeCTA();
    initializeGrid();
});

// Header functionality
function initializeHeader() {
    const menuBtn = document.querySelector('.menu-btn');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            console.log('Menu button clicked');
            // Add menu toggle functionality here if needed
        });
    }
}

// Newsletter functionality
function initializeNewsletter() {
    const emailInput = document.querySelector('.email-input');
    const submitArrow = document.querySelector('.submit-arrow');
    
    if (emailInput && submitArrow) {
        submitArrow.addEventListener('click', function() {
            const email = emailInput.value.trim();
            
            if (email) {
                if (validateEmail(email)) {
                    console.log('Newsletter signup:', email);
                    // Add newsletter signup logic here
                    emailInput.value = '';
                    showNotification('Thank you for subscribing!');
                } else {
                    showNotification('Please enter a valid email address.');
                }
            } else {
                showNotification('Please enter your email address.');
            }
        });
        
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitArrow.click();
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #EDF851;
        color: #000000;
        padding: 16px 24px;
        border: 1px solid #000000;
        font-family: 'Century Old Style Std', serif;
        font-size: 16px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
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
    
    // Observe grid items for stagger animation
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(item);
    });
    
    // Observe other animated elements
    const animatedElements = document.querySelectorAll('.coming-soon-title, .title, .signature-svg');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// CTA functionality
function initializeCTA() {
    const ctaBtn = document.querySelector('.cta-btn');
    
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            console.log('Go back button clicked');
            // Navigate back or to specific page
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Fallback navigation
                window.location.href = '/';
            }
        });
    }
}

// Grid interactions
function initializeGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
        // Add hover effects for interactive grid items
        if (item.classList.contains('circle') || item.classList.contains('arc') || item.classList.contains('text-frame')) {
            item.style.cursor = 'pointer';
            
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            
            // Add click interaction for special grid items
            item.addEventListener('click', function() {
                if (this.classList.contains('text-frame')) {
                    // Animate text frame
                    this.style.animation = 'pulse 0.6s ease';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 600);
                }
            });
        }
    });
}

// Responsive adjustments
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    
    // Adjust grid layout for mobile
    if (isMobile) {
        adjustMobileGrid();
    } else {
        adjustDesktopGrid();
    }
}

function adjustMobileGrid() {
    const textFrame = document.querySelector('.grid-item.text-frame');
    if (textFrame) {
        // Ensure proper positioning on mobile
        textFrame.style.position = 'absolute';
        textFrame.style.left = '65px';
        textFrame.style.top = '195px';
    }
}

function adjustDesktopGrid() {
    const textFrame = document.querySelector('.grid-item.text-frame');
    if (textFrame) {
        // Ensure proper positioning on desktop
        textFrame.style.position = 'absolute';
        textFrame.style.left = '630px';
        textFrame.style.top = '225px';
    }
}

// Add pulse animation for interactive elements
const pulseKeyframes = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;

// Add keyframes to document
const styleSheet = document.createElement('style');
styleSheet.textContent = pulseKeyframes;
document.head.appendChild(styleSheet);

// Handle window resize
window.addEventListener('resize', handleResize);

// Initialize responsive layout
handleResize();

// Smooth scroll behavior for internal navigation
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger entrance animations
    setTimeout(() => {
        const title = document.querySelector('.title');
        const comingSoonTitle = document.querySelector('.coming-soon-title');
        
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }
        
        if (comingSoonTitle) {
            comingSoonTitle.style.opacity = '1';
            comingSoonTitle.style.transform = 'translateY(0)';
        }
    }, 100);
});

// Export functions for potential external use
window.GalleryPage = {
    showNotification,
    validateEmail,
    initializeAnimations,
    handleResize
};
