// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const newsletterForm = document.getElementById('newsletterForm');
const categoryBtns = document.querySelectorAll('.category-btn');

// Menu functionality
function toggleMenu() {
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMenu() {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for menu
menuBtn.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', closeMenu);

// Close menu when clicking outside
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        closeMenu();
    }
});

// Close menu with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        closeMenu();
    }
});

// Category button functionality
categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get category data
        const category = this.dataset.category;
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Here you could add logic to filter/show content based on category
        console.log(`Selected category: ${category}`);
        
        // Example: You could emit an event or call a function to handle category selection
        handleCategorySelection(category);
    });
});

// Handle category selection
function handleCategorySelection(category) {
    // This function could be expanded to:
    // - Filter artwork content
    // - Update URL
    // - Load category-specific content
    // - Animate content transitions
    
    console.log(`Loading content for category: ${category}`);
    
    // Example implementation:
    switch(category) {
        case 'timeless':
            console.log('Loading timeless artworks...');
            break;
        case 'less-is-more':
            console.log('Loading minimalist artworks...');
            break;
        case 'new-era':
            console.log('Loading contemporary artworks...');
            break;
        default:
            console.log('Loading all artworks...');
    }
}

// Newsletter form functionality
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    const submitBtn = this.querySelector('.newsletter-btn');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Proceed with subscription
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        emailInput.value = '';
        showNotification('Successfully subscribed to newsletter!', 'success');
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes and observe elements
function initAnimations() {
    const animateElements = [
        { selector: '.main-title', class: 'fade-in' },
        { selector: '.title-icon', class: 'fade-in' },
        { selector: '.signature-text', class: 'fade-in' },
        { selector: '.category-btn', class: 'fade-in' },
        { selector: '.spacer-grid', class: 'fade-in' },
        { selector: '.footer-section', class: 'slide-in-left' }
    ];
    
    animateElements.forEach(({ selector, class: className }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add(className);
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
}

// Spacer dots animation
function initSpacerAnimation() {
    const spacerDots = document.querySelectorAll('.spacer-dot');
    
    spacerDots.forEach((dot, index) => {
        // Stagger the animation
        setTimeout(() => {
            dot.style.animation = `pulse 2s ease-in-out ${index * 0.1}s infinite`;
        }, index * 100);
    });
}

// Add pulse animation to CSS
const pulseAnimation = `
@keyframes pulse {
    0%, 100% { 
        opacity: 0.3; 
        transform: scale(1); 
    }
    50% { 
        opacity: 1; 
        transform: scale(1.2); 
    }
}
`;

// Inject pulse animation
const style = document.createElement('style');
style.textContent = pulseAnimation;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
}

// Debounce function for performance
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

// Apply debounced scroll handler
window.addEventListener('scroll', debounce(handleScroll, 10));

// Keyboard navigation for category buttons
categoryBtns.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
        let nextIndex;
        
        switch(e.key) {
            case 'ArrowRight':
                nextIndex = (index + 1) % categoryBtns.length;
                categoryBtns[nextIndex].focus();
                e.preventDefault();
                break;
            case 'ArrowLeft':
                nextIndex = (index - 1 + categoryBtns.length) % categoryBtns.length;
                categoryBtns[nextIndex].focus();
                e.preventDefault();
                break;
            case 'Enter':
            case ' ':
                btn.click();
                e.preventDefault();
                break;
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#4CAF50';
            break;
        case 'error':
            notification.style.background = '#f44336';
            break;
        default:
            notification.style.background = '#333';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initSpacerAnimation();
    
    // Add keyboard accessibility
    categoryBtns.forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-label', `Select ${btn.dataset.category} category`);
    });
    
    // Add focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .category-btn:focus {
            outline: 2px solid #000;
            outline-offset: 2px;
        }
        
        .menu-btn:focus {
            outline: 2px solid #000;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(focusStyle);
});

// Page visibility handling
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any heavy animations
        const spacerDots = document.querySelectorAll('.spacer-dot');
        spacerDots.forEach(dot => {
            dot.style.animationPlayState = 'paused';
        });
    } else {
        // Page is visible, resume animations
        const spacerDots = document.querySelectorAll('.spacer-dot');
        spacerDots.forEach(dot => {
            dot.style.animationPlayState = 'running';
        });
    }
});
