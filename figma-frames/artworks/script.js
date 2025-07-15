// ARTRA Artworks Page JavaScript
// Basado en los frames de Figma para desktop y mobile

document.addEventListener('DOMContentLoaded', function() {
    
    // Variables globales
    const body = document.body;
    const header = document.querySelector('.header');
    const menuItem = document.querySelector('.menu-item');
    const ctaButton = document.querySelector('.cta-button');
    const emailInput = document.querySelector('.email-input');
    const footerLinks = document.querySelectorAll('.footer-link');
    const productCards = document.querySelectorAll('.product-card');
    
    // Configuración de responsive
    let isMobile = window.innerWidth <= 768;
    
    // Detectar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        isMobile = window.innerWidth <= 768;
        handleResponsiveChanges();
    });
    
    // Función para manejar cambios responsivos
    function handleResponsiveChanges() {
        if (isMobile) {
            // Configuraciones específicas para mobile
            adjustMobileLayout();
        } else {
            // Configuraciones específicas para desktop
            adjustDesktopLayout();
        }
    }
    
    // Ajustes para layout mobile
    function adjustMobileLayout() {
        // Ajustar grid de productos a layout vertical
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.style.display = 'block';
        }
        
        // Asegurar que el footer esté en orden correcto para mobile
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            footerContent.style.flexDirection = 'column';
        }
    }
    
    // Ajustes para layout desktop
    function adjustDesktopLayout() {
        // Restaurar grid de productos
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.style.display = 'grid';
        }
        
        // Restaurar layout del footer
        const footerContent = document.querySelector('.footer-content');
        if (footerContent) {
            footerContent.style.flexDirection = 'row';
        }
    }
    
    // Funcionalidad del menú
    if (menuItem) {
        menuItem.addEventListener('click', function() {
            // Aquí se puede implementar la lógica del menú hamburguesa
            console.log('Menu clicked');
            
            // Añadir efecto de hover/click
            this.style.opacity = '0.6';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);
        });
        
        // Efecto hover para el menu item
        menuItem.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transition = 'opacity 0.3s ease';
        });
        
        menuItem.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    }
    
    // Funcionalidad del botón CTA "Go back"
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Lógica para volver atrás
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Si no hay historia, ir a home
                window.location.href = '/';
            }
        });
        
        // Efecto hover para el botón CTA
        ctaButton.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
            this.style.transition = 'opacity 0.3s ease';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    }
    
    // Funcionalidad del input de newsletter
    if (emailInput) {
        // Focus y blur effects
        emailInput.addEventListener('focus', function() {
            const inputLine = document.querySelector('.input-line');
            if (inputLine) {
                inputLine.style.backgroundColor = '#333';
                inputLine.style.transition = 'background-color 0.3s ease';
            }
        });
        
        emailInput.addEventListener('blur', function() {
            const inputLine = document.querySelector('.input-line');
            if (inputLine) {
                inputLine.style.backgroundColor = '#000';
            }
        });
        
        // Validación simple del email
        emailInput.addEventListener('input', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.color = '#ff6b6b';
            } else {
                this.style.color = '#000';
            }
        });
        
        // Submit del newsletter
        const inputWrapper = document.querySelector('.input-wrapper');
        if (inputWrapper) {
            inputWrapper.addEventListener('click', function(e) {
                if (e.target.tagName === 'svg' || e.target.tagName === 'path') {
                    const email = emailInput.value;
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    
                    if (email && emailRegex.test(email)) {
                        // Simular envío de newsletter
                        console.log('Newsletter subscription:', email);
                        emailInput.value = '';
                        emailInput.placeholder = 'Subscribed!';
                        
                        setTimeout(() => {
                            emailInput.placeholder = 'Enter Email';
                        }, 2000);
                    } else {
                        // Mostrar error
                        emailInput.style.borderBottom = '1px solid #ff6b6b';
                        setTimeout(() => {
                            emailInput.style.borderBottom = 'none';
                        }, 1000);
                    }
                }
            });
        }
    }
    
    // Funcionalidad de los links del footer
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const linkText = this.textContent.trim();
            console.log('Footer link clicked:', linkText);
            
            // Aquí se puede implementar navegación específica
            switch(linkText) {
                case 'ARTWORKS':
                    // Ya estamos en artworks, no hacer nada
                    break;
                case 'ARTISTS':
                    // Navegar a artists
                    window.location.href = '/artists';
                    break;
                case 'GALLERY':
                    // Navegar a gallery
                    window.location.href = '/gallery';
                    break;
                case 'FRAMING STUDIO':
                    // Navegar a framing studio
                    window.location.href = '/framing-studio';
                    break;
                case 'ABOUT':
                    // Navegar a about
                    window.location.href = '/about';
                    break;
                case 'SEARCH':
                    // Implementar funcionalidad de búsqueda
                    openSearch();
                    break;
                case 'PERSONALIZE':
                    // Navegar a personalización
                    window.location.href = '/personalize';
                    break;
                default:
                    // Para otros links como términos, privacidad, etc.
                    console.log('Navigating to:', linkText);
                    break;
            }
        });
        
        // Efecto hover para links del footer
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.textDecoration = 'underline';
                this.style.transition = 'text-decoration 0.2s ease';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.textDecoration = 'none';
            }
        });
    });
    
    // Funcionalidad de las tarjetas de productos
    productCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Navegar a la página del producto específico
            console.log('Product card clicked:', index + 1);
            // window.location.href = `/artwork/${index + 1}`;
        });
        
        // Efecto hover para las tarjetas de productos
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Función para abrir búsqueda (placeholder)
    function openSearch() {
        console.log('Opening search functionality...');
        // Aquí se implementaría la lógica de búsqueda
        // Por ejemplo, mostrar un modal de búsqueda o navegar a página de búsqueda
    }
    
    // Funcionalidad de scroll suave
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Lazy loading para imágenes (si se implementan en el futuro)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Funcionalidad de detección de scroll para efectos
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Detectar dirección del scroll
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
    
    // Inicialización
    function init() {
        // Configurar layout inicial basado en el tamaño de pantalla
        handleResponsiveChanges();
        
        // Inicializar lazy loading si hay imágenes
        lazyLoadImages();
        
        // Log de inicialización
        console.log('ARTRA Artworks page initialized');
        console.log('Mobile mode:', isMobile);
    }
    
    // Ejecutar inicialización
    init();
    
    // Funciones de utilidad
    const utils = {
        // Debounce function para eventos de resize
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        // Función para detectar dispositivo táctil
        isTouchDevice: function() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        },
        
        // Función para obtener viewport dimensions
        getViewportDimensions: function() {
            return {
                width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
                height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
            };
        }
    };
    
    // Exponer utils globalmente si es necesario
    window.ARTRA = window.ARTRA || {};
    window.ARTRA.utils = utils;
    
    // Event listeners adicionales para dispositivos táctiles
    if (utils.isTouchDevice()) {
        // Añadir clases específicas para dispositivos táctiles
        body.classList.add('touch-device');
        
        // Remover efectos hover en dispositivos táctiles
        productCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }
});

// Función global para navegación (disponible desde HTML)
function navigateTo(page) {
    console.log('Navigating to:', page);
    window.location.href = page;
}

// Función global para mostrar/ocultar loading states
function toggleLoading(show = true) {
    const body = document.body;
    if (show) {
        body.style.cursor = 'wait';
    } else {
        body.style.cursor = 'default';
    }
}
