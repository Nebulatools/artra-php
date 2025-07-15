// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const newsletterForm = document.getElementById('newsletterForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const artworkItems = document.querySelectorAll('.artwork-item');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const artworksGrid = document.getElementById('artworksGrid');

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

// Filter functionality
let currentFilter = 'all';

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filter = this.dataset.filter;
        currentFilter = filter;
        
        // Filter artworks
        filterArtworks(filter);
        
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

function filterArtworks(filter) {
    artworkItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
            item.classList.remove('filtered-out');
            item.classList.add('filtered-in');
            item.style.display = 'block';
        } else {
            item.classList.remove('filtered-in');
            item.classList.add('filtered-out');
            setTimeout(() => {
                if (item.classList.contains('filtered-out')) {
                    item.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Artwork item click functionality
artworkItems.forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.artwork-title').textContent;
        const artist = this.querySelector('.artwork-artist').textContent;
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // You could open a modal or navigate to a detail page here
        console.log(`Clicked on artwork: ${title} by ${artist}`);
        
        // Example: Show more details
        showArtworkDetails(this);
    });
});

function showArtworkDetails(artworkElement) {
    const title = artworkElement.querySelector('.artwork-title').textContent;
    const artist = artworkElement.querySelector('.artwork-artist').textContent;
    const medium = artworkElement.querySelector('.artwork-medium').textContent;
    const dimensions = artworkElement.querySelector('.artwork-dimensions').textContent;
    
    // Here you could implement a modal or detail view
    // For now, we'll just show a notification
    showNotification(`${title} by ${artist} - ${medium}, ${dimensions}`, 'info');
}

// Load More functionality
let loadMoreCounter = 0;
const additionalArtworks = [
    {
        title: "Midnight Reflections",
        artist: "Victoria Clarke",
        medium: "Oil on Canvas",
        dimensions: "90 x 70 cm",
        category: "paintings"
    },
    {
        title: "Digital Harmony",
        artist: "Chris Johnson",
        medium: "Digital Art",
        dimensions: "120 x 80 cm",
        category: "digital"
    },
    {
        title: "Stone Dance",
        artist: "Roberto Martinez",
        medium: "Marble",
        dimensions: "60 x 40 x 30 cm",
        category: "sculptures"
    },
    {
        title: "Urban Stories",
        artist: "Nina Andersson",
        medium: "Photography",
        dimensions: "70 x 50 cm",
        category: "photography"
    }
];

loadMoreBtn.addEventListener('click', function() {
    // Add loading state
    this.classList.add('loading');
    const originalText = this.querySelector('.load-more-text').textContent;
    this.querySelector('.load-more-text').textContent = 'Loading';
    
    // Simulate loading delay
    setTimeout(() => {
        loadMoreArtworks();
        
        // Remove loading state
        this.classList.remove('loading');
        this.querySelector('.load-more-text').textContent = originalText;
        
        // Hide button if no more items
        loadMoreCounter++;
        if (loadMoreCounter >= 2) {
            this.style.display = 'none';
            showNotification('All artworks loaded', 'info');
        }
    }, 1500);
});

function loadMoreArtworks() {
    additionalArtworks.forEach((artwork, index) => {
        setTimeout(() => {
            const artworkHTML = `
                <article class="artwork-item fade-in" data-category="${artwork.category}">
                    <div class="artwork-image">
                        <div class="artwork-placeholder">
                            <span class="artwork-placeholder-text">Artwork ${9 + loadMoreCounter * 4 + index}</span>
                        </div>
                    </div>
                    <div class="artwork-info">
                        <h3 class="artwork-title">${artwork.title}</h3>
                        <p class="artwork-artist">${artwork.artist}</p>
                        <p class="artwork-medium">${artwork.medium}</p>
                        <p class="artwork-dimensions">${artwork.dimensions}</p>
                    </div>
                </article>
            `;
            
            artworksGrid.insertAdjacentHTML('beforeend', artworkHTML);
            
            // Get the newly added item
            const newItem = artworksGrid.lastElementChild;
            
            // Add click event listener to new item
            newItem.addEventListener('click', function() {
                const title = this.querySelector('.artwork-title').textContent;
                const artist = this.querySelector('.artwork-artist').textContent;
                
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                showArtworkDetails(this);
            });
            
            // Apply current filter to new item
            if (currentFilter !== 'all' && newItem.dataset.category !== currentFilter) {
                newItem.style.display = 'none';
                newItem.classList.add('filtered-out');
            }
            
            // Trigger animation
            setTimeout(() => {
                newItem.classList.add('visible');
            }, 100);
        }, index * 200);
    });
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
        { selector: '.filter-btn', class: 'fade-in' },
        { selector: '.artwork-item', class: 'fade-in' },
        { selector: '.load-more-btn', class: 'fade-in' },
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

// Search functionality (bonus feature)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search artworks...';
    searchInput.className = 'search-input';
    
    // Add search styles
    const searchStyles = `
        .search-input {
            width: 100%;
            max-width: 300px;
            padding: 0.75rem 1rem;
            border: 2px solid transparent;
            border-radius: var(--border-radius);
            background: var(--white);
            font-size: 0.9rem;
            margin-bottom: 1rem;
            transition: var(--transition);
        }
        
        .search-input:focus {
            outline: none;
            border-color: var(--text-color);
        }
        
        .search-container {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = searchStyles;
    document.head.appendChild(style);
    
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.appendChild(searchInput);
    
    // Insert search before filter controls
    const filterContainer = document.querySelector('.filter-container');
    filterContainer.insertBefore(searchContainer, filterContainer.firstChild);
    
    // Search functionality
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = this.value.toLowerCase().trim();
            searchArtworks(searchTerm);
        }, 300);
    });
}

function searchArtworks(searchTerm) {
    artworkItems.forEach(item => {
        const title = item.querySelector('.artwork-title').textContent.toLowerCase();
        const artist = item.querySelector('.artwork-artist').textContent.toLowerCase();
        const medium = item.querySelector('.artwork-medium').textContent.toLowerCase();
        
        const matches = title.includes(searchTerm) || 
                       artist.includes(searchTerm) || 
                       medium.includes(searchTerm);
        
        if (searchTerm === '' || matches) {
            item.style.display = 'block';
            item.classList.remove('filtered-out');
            item.classList.add('filtered-in');
        } else {
            item.classList.remove('filtered-in');
            item.classList.add('filtered-out');
            setTimeout(() => {
                if (item.classList.contains('filtered-out')) {
                    item.style.display = 'none';
                }
            }, 300);
        }
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

// Keyboard navigation for filter buttons
filterBtns.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
        let nextIndex;
        
        switch(e.key) {
            case 'ArrowRight':
                nextIndex = (index + 1) % filterBtns.length;
                filterBtns[nextIndex].focus();
                e.preventDefault();
                break;
            case 'ArrowLeft':
                nextIndex = (index - 1 + filterBtns.length) % filterBtns.length;
                filterBtns[nextIndex].focus();
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
    addSearchFunctionality();
    
    // Add keyboard accessibility
    filterBtns.forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-label', `Filter by ${btn.textContent}`);
    });
    
    artworkItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View ${item.querySelector('.artwork-title').textContent}`);
    });
    
    // Add focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .filter-btn:focus,
        .artwork-item:focus {
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

// Artwork hover effects
artworkItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Filter counter
function updateFilterCounter() {
    const visibleItems = document.querySelectorAll('.artwork-item:not(.filtered-out)').length;
    const totalItems = document.querySelectorAll('.artwork-item').length;
    
    // You could display this information somewhere in the UI
    console.log(`Showing ${visibleItems} of ${totalItems} artworks`);
}

// Call updateFilterCounter whenever filter changes
const originalFilterArtworks = filterArtworks;
filterArtworks = function(filter) {
    originalFilterArtworks(filter);
    setTimeout(updateFilterCounter, 350);
};
