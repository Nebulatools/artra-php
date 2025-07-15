// ARTRA Catalogue Page JavaScript
// Handles dynamic grid generation and interactive features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeGrid();
    initializeInteractions();
});

/**
 * Initialize the decorative grid based on the Figma design
 */
function initializeGrid() {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) return;

    // Clear existing grid items
    gridContainer.innerHTML = '';

    // Desktop grid configuration (16x7 grid = 112 items)
    const desktopColumns = 16;
    const desktopRows = 7;
    
    // Mobile grid configuration (6x variable rows)
    const mobileColumns = 6;
    const mobileRows = 8;

    // Determine if we're on mobile
    const isMobile = window.innerWidth <= 768;
    const columns = isMobile ? mobileColumns : desktopColumns;
    const rows = isMobile ? mobileRows : desktopRows;
    const totalItems = columns * rows;

    // Grid pattern based on Figma design
    const gridPattern = createGridPattern(columns, rows, isMobile);

    // Generate grid items
    for (let i = 0; i < totalItems; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        
        // Apply pattern classes based on position
        const row = Math.floor(i / columns);
        const col = i % columns;
        const patternType = gridPattern[row] && gridPattern[row][col] ? gridPattern[row][col] : 'empty';
        
        if (patternType !== 'empty') {
            gridItem.classList.add(patternType);
        }

        gridContainer.appendChild(gridItem);
    }
}

/**
 * Create grid pattern based on Figma design
 */
function createGridPattern(columns, rows, isMobile) {
    const pattern = [];
    
    // Initialize empty pattern
    for (let row = 0; row < rows; row++) {
        pattern[row] = new Array(columns).fill('empty');
    }

    if (isMobile) {
        // Mobile pattern (simplified version)
        // Add some decorative elements at specific positions
        if (pattern[1]) {
            pattern[1][1] = 'has-line-v has-line-h';
            pattern[1][2] = 'has-line-v has-line-h';
            pattern[1][3] = 'has-line-v has-line-h';
        }
        
        if (pattern[2]) {
            pattern[2][0] = 'has-circle';
            pattern[2][1] = 'has-circle';
        }
        
        if (pattern[4]) {
            pattern[4][1] = 'has-line-v has-line-h';
            pattern[4][2] = 'has-line-v has-line-h';
            pattern[4][3] = 'has-line-v has-line-h';
        }
        
        if (pattern[5]) {
            pattern[5][4] = 'has-arc';
            pattern[5][5] = 'has-arc right';
        }
    } else {
        // Desktop pattern (more complex)
        // Based on the Figma spacer grid layout
        
        // Add grid lines at regular intervals
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                // Add some grid elements with lines
                if ((row === 1 || row === 2 || row === 4 || row === 5) && 
                    (col >= 2 && col <= 4)) {
                    pattern[row][col] = 'has-line-v has-line-h';
                }
                
                // Add circles at specific positions
                if (row === 2 && (col === 8 || col === 9)) {
                    pattern[row][col] = 'has-circle';
                }
                
                // Add arcs at specific positions
                if (row === 5 && (col === 12 || col === 13)) {
                    pattern[row][col] = col === 12 ? 'has-arc' : 'has-arc right';
                }
            }
        }
    }
    
    return pattern;
}

/**
 * Initialize interactive features
 */
function initializeInteractions() {
    // Newsletter form handling
    initializeNewsletter();
    
    // Category hover effects
    initializeCategoryEffects();
    
    // Mobile menu handling (if needed)
    initializeMobileMenu();
    
    // Resize handler for grid regeneration
    initializeResizeHandler();
}

/**
 * Newsletter form functionality
 */
function initializeNewsletter() {
    const emailInput = document.querySelector('.email-input');
    const arrowIcon = document.querySelector('.arrow-icon');
    
    if (emailInput && arrowIcon) {
        // Handle form submission
        const handleSubmit = (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate newsletter subscription
                console.log('Newsletter subscription:', email);
                emailInput.value = '';
                emailInput.placeholder = 'Thank you for subscribing!';
                
                setTimeout(() => {
                    emailInput.placeholder = 'Enter Email';
                }, 3000);
            } else {
                // Show error state
                emailInput.style.borderColor = '#ff0000';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                }, 2000);
            }
        };
        
        // Add click handler to arrow
        arrowIcon.addEventListener('click', handleSubmit);
        
        // Add enter key handler to input
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSubmit(e);
            }
        });
    }
}

/**
 * Category interaction effects
 */
function initializeCategoryEffects() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = '';
        });
        
        item.addEventListener('click', () => {
            const title = item.querySelector('.category-title');
            if (title) {
                console.log('Category selected:', title.textContent);
                // Here you would typically navigate to the category page
            }
        });
    });
}

/**
 * Mobile menu handling (placeholder for future implementation)
 */
function initializeMobileMenu() {
    const menuItem = document.querySelector('.menu-item');
    
    if (menuItem) {
        menuItem.addEventListener('click', () => {
            console.log('Mobile menu clicked');
            // Future implementation for mobile menu
        });
    }
}

/**
 * Handle window resize for responsive grid
 */
function initializeResizeHandler() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Regenerate grid on significant size changes
            const wasMobile = window.innerWidth <= 768;
            setTimeout(() => {
                const isMobile = window.innerWidth <= 768;
                if (wasMobile !== isMobile) {
                    initializeGrid();
                }
            }, 100);
        }, 250);
    });
}

/**
 * Email validation utility
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Smooth scroll utility for future navigation
 */
function smoothScrollTo(targetElement) {
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Animation utilities for future enhancements
 */
const animations = {
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    },
    
    slideUp: (element, duration = 300) => {
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 10);
    }
};

/**
 * Intersection Observer for scroll animations (future enhancement)
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.category-item, .quote-section');
    animateElements.forEach(el => observer.observe(el));
}

// Export functions for potential external use
window.ARTRACatalogue = {
    initializeGrid,
    animations,
    smoothScrollTo
};
