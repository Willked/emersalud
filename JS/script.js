// MENÚ MÓVIL
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    
    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', function() {
            navMobile.classList.toggle('active');
        });
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    const navMobileLinks = document.querySelectorAll('.nav-mobile-link');
    navMobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMobile.classList.remove('active');
        });
    });
});

// NAVEGACIÓN SUAVE
function navigateTo(url) {
    window.location.href = url;
}

// SCROLL SUAVE AL HACER CLIC EN ENLACES
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// HEADER STICKY CON SOMBRA AL HACER SCROLL
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ANIMACIÓN AL HACER SCROLL (aparecer elementos)
function animateOnScroll() {
    const elements = document.querySelectorAll('.content-card, .contact-card, .valor-card, .contact-info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Ejecutar animación al cargar la página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// BOTÓN VER MÁS CON EFECTO
const btnPrimary = document.querySelector('.btn-primary');
if (btnPrimary) {
    btnPrimary.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    btnPrimary.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// VALIDACIÓN PARA ENLACES DE TELÉFONO Y EMAIL
document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // En navegadores modernos, esto debería funcionar automáticamente
        // Este listener es principalmente para analytics o tracking si se necesita
        console.log('Contacto iniciado:', this.getAttribute('href'));
    });
});

// ============================================
// CARRUSEL DE IMÁGENES
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const carouselWrapper = document.getElementById('carouselWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carouselWrapper) return; // Si no existe el carrusel, salir
    
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    let autoSlideInterval = 0;
    
    // Función para mostrar una diapositiva específica
    function showSlide(index) {
        // Asegurarse de que el índice esté dentro del rango
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Remover clase active de todas las diapositivas
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Agregar clase active a la diapositiva actual
        slides[currentSlide].classList.add('active');
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
    }
    
    // Función para ir a la siguiente diapositiva
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Función para ir a la diapositiva anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Iniciar el carrusel automático (cada 5 segundos)
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Detener el carrusel automático
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners para los botones
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Reiniciar el temporizador
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Reiniciar el temporizador
        });
    }
    
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Reiniciar el temporizador
        });
    });
    
    // Pausar el carrusel cuando el mouse está sobre él
    carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
    carouselWrapper.addEventListener('mouseleave', startAutoSlide);
    
    // Iniciar el carrusel automático al cargar la página
    startAutoSlide();
});

// ============================================
// LIGHTBOX PARA GALERÍA
// ============================================
let currentLightboxIndex = 0;
const galleryImages = [];

// Recolectar todas las imágenes de la galería
document.addEventListener('DOMContentLoaded', function() {
    const masonryItems = document.querySelectorAll('.masonry-item:not(.masonry-video) img');
    masonryItems.forEach(img => {
        galleryImages.push(img.src);
    });
});

// Abrir lightbox
function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (lightbox && lightboxImage && galleryImages[index]) {
        lightboxImage.src = galleryImages[index];
        lightbox.classList.add('active');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
}

// Cerrar lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Siguiente imagen en lightbox
function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    const lightboxImage = document.getElementById('lightboxImage');
    if (lightboxImage) {
        lightboxImage.src = galleryImages[currentLightboxIndex];
    }
}

// Imagen anterior en lightbox
function prevLightbox() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    const lightboxImage = document.getElementById('lightboxImage');
    if (lightboxImage) {
        lightboxImage.src = galleryImages[currentLightboxIndex];
    }
}

// Cerrar lightbox con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        nextLightbox();
    } else if (e.key === 'ArrowLeft') {
        prevLightbox();
    }
});

// Cerrar lightbox al hacer clic fuera de la imagen
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
