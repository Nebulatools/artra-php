// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const newsletterForm = document.getElementById('newsletterForm');
const requestQuoteBtn = document.getElementById('requestQuoteBtn');
const addToFavoritesBtn = document.getElementById('addToFavoritesBtn');
const quoteModal = document.getElementById('quoteModal');
const modalClose = document.getElementById('modalClose');
const cancelQuote = document.getElementById('cancelQuote');
const quoteForm = document.getElementById('quoteForm');
const frameThumbnails = document.querySelectorAll('.frame-thumbnail');
const sizeButtons = document.querySelectorAll('.size-btn');
const colorButtons = document.querySelectorAll('.color-btn');
const priceAmount = document.getElementById('priceAmount');

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

// Frame thumbnail functionality
frameThumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
        // Remove active class from all thumbnails
        frameThumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        this.classList.add('active');
        
        // Here you could change the main image
        // For now, we'll just add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        console.log(`Selected thumbnail ${index + 1}`);
    });
});

// Size selection functionality
const sizePrices = {
    small: 89,
    medium: 129,
    large: 169,
    xlarge: 219
};

sizeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all size buttons
        sizeButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update price based on size
        const size = this.dataset.size;
        const newPrice = sizePrices[size];
        priceAmount.textContent = `$${newPrice}`;
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        console.log(`Selected size: ${size}, Price: $${newPrice}`);
    });
});

// Color selection functionality
colorButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all color buttons
        colorButtons.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get color data
        const color = this.dataset.color;
        
        // Add visual feedback
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        console.log(`Selected color: ${color}`);
    });
});

// Quote modal functionality
function openQuoteModal() {
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    const firstInput = quoteModal.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

function closeQuoteModal() {
    quoteModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    quoteForm.reset();
}

// Event listeners for modal
requestQuoteBtn.addEventListener('click', openQuoteModal);
modalClose.addEventListener('click', closeQuoteModal);
cancelQuote.addEventListener('click', closeQuoteModal);

// Close modal when clicking outside
quoteModal.addEventListener('click', (e) => {
    if (e.target === quoteModal) {
        closeQuoteModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quoteModal.classList.contains('active')) {
        closeQuoteModal();
    }
});

// Quote form submission
quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: document.getElementById('customerName').value.trim(),
        email: document.getElementById('customerEmail').value.trim(),
        phone: document.getElementById('customerPhone').value.trim(),
        artworkSize: document.getElementById('artworkSize').value.trim(),
        specialRequests: document.getElementById('specialRequests').value.trim()
    };
    
    // Validate required fields
    if (!data.name || !data.email) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Get current selections
    const selectedSize = document.querySelector('.size-btn.active')?.textContent || 'Not selected';
    const selectedColor = document.querySelector('.color-btn.active')?.dataset.color || 'Not selected';
    const currentPrice = priceAmount.textContent;
    
    // Add loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Prepare quote data
        const quoteData = {
            ...data,
            frameSize: selectedSize,
            matColor: selectedColor,
            estimatedPrice: currentPrice,
            frameModel: 'Premium Oak Frame Series',
            timestamp: new Date().toISOString()
        };
        
        console.log('Quote submitted:', quoteData);
        
        // Show success message
        showNotification('Quote request submitted successfully! We\'ll contact you soon.', 'success');
        
        // Close modal
        closeQuoteModal();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Favorites functionality
let isFavorited = false;

addToFavoritesBtn.addEventListener('click', function() {
    isFavorited = !isFavorited;
    
    const icon = this.querySelector('.favorite-icon');
    const text = this.querySelector('span:not(.favorite-icon)') || this.lastChild;
    
    if (isFavorited) {
        this.classList.add('favorited');
        icon.textContent = '♥';
        if (text && text.nodeType === Node.TEXT_NODE) {
            text.textContent = 'Added to Favorites';
        }
        showNotification('Added to favorites!', 'success');
    } else {
        this.classList.remove('favorited');
        icon.textContent = '♡';
        if (text && text.nodeType === Node.TEXT_NODE) {
            text.textContent = 'Add to Favorites';
        }
        showNotification('Removed from favorites', 'info');
    }
    
    // Add visual feedback
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
});

// Related items functionality
const relatedItems = document.querySelectorAll('.related-item');

relatedItems.forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.related-title').textContent;
        const price = this.querySelector('.related-price').textContent;
        
        // Add click animation
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Here you could navigate to the related frame details
        console.log(`Clicked on related item: ${title} - ${price}`);
        showNotification(`Viewing ${title}`, 'info');
    });
});

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
        { selector: '.frame-title', class: 'fade-in' },
        { selector: '.frame-subtitle', class: 'fade-in' },
        { selector: '.frame-details', class: 'fade-in' },
        { selector: '.frame-options', class: 'fade-in' },
        { selector: '.frame-pricing', class: 'fade-in' },
        { selector: '.frame-actions', class: 'fade-in' },
        { selector: '.spec-item', class: 'fade-in' },
        { selector: '.related-item', class: 'fade-in' },
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

// Keyboard navigation for options
sizeButtons.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
        let nextIndex;
        
        switch(e.key) {
            case 'ArrowRight':
                nextIndex = (index + 1) % sizeButtons.length;
                sizeButtons[nextIndex].focus();
                e.preventDefault();
                break;
            case 'ArrowLeft':
                nextIndex = (index - 1 + sizeButtons.length) % sizeButtons.length;
                sizeButtons[nextIndex].focus();
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

colorButtons.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
        let nextIndex;
        
        switch(e.key) {
            case 'ArrowRight':
                nextIndex = (index + 1) % colorButtons.length;
                colorButtons[nextIndex].focus();
                e.preventDefault();
                break;
            case 'ArrowLeft':
                nextIndex = (index - 1 + colorButtons.length) % colorButtons.length;
                colorButtons[nextIndex].focus();
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
        z-index: 4000;
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

// Image zoom functionality for main frame image
const frameMainImage = document.querySelector('.frame-main-image');

frameMainImage.addEventListener('click', function() {
    // Create zoom overlay
    const zoomOverlay = document.createElement('div');
    zoomOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 5000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
    `;
    
    const zoomedImage = this.cloneNode(true);
    zoomedImage.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    zoomOverlay.appendChild(zoomedImage);
    document.body.appendChild(zoomOverlay);
    
    // Close on click or ESC
    zoomOverlay.addEventListener('click', () => {
        document.body.removeChild(zoomOverlay);
    });
    
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(zoomOverlay);
            document.removeEventListener('keydown', handleEsc);
        }
    };
    
    document.addEventListener('keydown', handleEsc);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    
    // Add keyboard accessibility
    sizeButtons.forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-label', `Select size ${btn.textContent}`);
    });
    
    colorButtons.forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-label', `Select ${btn.dataset.color} color`);
    });
    
    frameThumbnails.forEach((thumb, index) => {
        thumb.setAttribute('tabindex', '0');
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('aria-label', `View image ${index + 1}`);
    });
    
    // Add focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .size-btn:focus,
        .color-btn:focus,
        .frame-thumbnail:focus,
        .btn-primary:focus,
        .btn-secondary:focus {
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

// Page visibility handling for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause animations
        const bannerText = document.querySelector('.banner-text');
        if (bannerText) {
            bannerText.style.animationPlayState = 'paused';
        }
    } else {
        // Page is visible, resume animations
        const bannerText = document.querySelector('.banner-text');
        if (bannerText) {
            bannerText.style.animationPlayState = 'running';
        }
    }
});

// Local storage for favorites
function saveFavorites() {
    const favorites = JSON.parse(localStorage.getItem('arttraFavorites') || '[]');
    const frameId = 'premium-oak-frame'; // Unique identifier for this frame
    
    if (isFavorited && !favorites.includes(frameId)) {
        favorites.push(frameId);
    } else if (!isFavorited && favorites.includes(frameId)) {
        const index = favorites.indexOf(frameId);
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('arttraFavorites', JSON.stringify(favorites));
}

// Load favorites on page load
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('arttraFavorites') || '[]');
    const frameId = 'premium-oak-frame';
    
    if (favorites.includes(frameId)) {
        isFavorited = true;
        addToFavoritesBtn.classList.add('favorited');
        const icon = addToFavoritesBtn.querySelector('.favorite-icon');
        if (icon) icon.textContent = '♥';
    }
}

// Update favorites functionality to include storage
const originalFavoritesHandler = addToFavoritesBtn.onclick;
addToFavoritesBtn.addEventListener('click', function() {
    // Wait for the existing handler to complete
    setTimeout(() => {
        saveFavorites();
    }, 0);
});

// Load favorites when page loads
document.addEventListener('DOMContentLoaded', loadFavorites);

// Frame configurator (advanced feature)
class FrameConfigurator {
    constructor() {
        this.selectedSize = 'small';
        this.selectedColor = 'white';
        this.basePrice = 89;
    }
    
    updateConfiguration() {
        const sizeMultiplier = {
            small: 1,
            medium: 1.45,
            large: 1.9,
            xlarge: 2.46
        };
        
        const colorPremium = {
            white: 0,
            cream: 5,
            gray: 10,
            black: 15
        };
        
        const newPrice = Math.round(this.basePrice * sizeMultiplier[this.selectedSize] + colorPremium[this.selectedColor]);
        priceAmount.textContent = `$${newPrice}`;
        
        return {
            size: this.selectedSize,
            color: this.selectedColor,
            price: newPrice
        };
    }
    
    setSize(size) {
        this.selectedSize = size;
        return this.updateConfiguration();
    }
    
    setColor(color) {
        this.selectedColor = color;
        return this.updateConfiguration();
    }
}

// Initialize configurator
const configurator = new FrameConfigurator();

// Update size buttons to use configurator
sizeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const config = configurator.setSize(this.dataset.size);
        console.log('Updated configuration:', config);
    });
});

// Update color buttons to use configurator
colorButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const config = configurator.setColor(this.dataset.color);
        console.log('Updated configuration:', config);
    });
});
