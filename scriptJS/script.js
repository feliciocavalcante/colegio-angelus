// Aguarda o HTML da página ser completamente carregado antes de executar o código.
document.addEventListener('DOMContentLoaded', function() {

    // ===================================================================
    // SELEÇÃO DOS ELEMENTOS DO HTML
    // ===================================================================
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const items = document.querySelectorAll('.item');
    const dots = document.querySelectorAll('.dot');
    const toggleButton = document.getElementById('menu-toggle');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav a');
    const heroButton = document.getElementById('hero-button');
    const produtosSection = document.getElementById('produtos');
    const mapOverlay = document.querySelector('.map-overlay');
    const socialIcons = document.querySelectorAll('.social-bar a');

 // #################################################################
    // ## COLE O NOVO CÓDIGO AQUI ##
    // #################################################################
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Adiciona a classe 'visible' um pouco depois do carregamento
        // para ativar a animação de entrada do CSS.
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 200); 
    }
    // #################################################################
    // ## FIM DO NOVO CÓDIGO ##
    // #################################################################

    // ===================================================================
    // LÓGICA DO CARROSSEL
    // ===================================================================
    let active = 0;
    const totalItems = items.length;
    let slideInterval;

    function showSlide(direction) {
        if (items.length === 0) return; // Não faz nada se não houver slides
        
        document.querySelector('.item.active')?.classList.remove('active');
        document.querySelector('.dot.active')?.classList.remove('active');

        if (direction === 'next') {
            active = (active + 1) % totalItems;
        } else if (direction === 'prev') {
            active = (active - 1 + totalItems) % totalItems;
        }
        
        items[active]?.classList.add('active');
        dots[active]?.classList.add('active');

        resetSlideTimer();
    }

    function resetSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => showSlide('next'), 9000);
    }

    function goToSlide(index) {
        if (items.length === 0 || index < 0 || index >= totalItems) return;

        document.querySelector('.item.active')?.classList.remove('active');
        document.querySelector('.dot.active')?.classList.remove('active');

        active = index;

        items[active]?.classList.add('active');
        dots[active]?.classList.add('active');

        resetSlideTimer();
    }

    // ===================================================================
    // FUNÇÃO PARA FEEDBACK DE TOQUE
    // ===================================================================
    function setupTouchFeedback(element, activeClass) {
        element.addEventListener('touchstart', () => {
            element.classList.add(activeClass);
        }, { passive: true });
        element.addEventListener('touchend', () => {
            element.classList.remove(activeClass);
        });
        element.addEventListener('touchcancel', () => {
            element.classList.remove(activeClass);
        });
    }

    // ===================================================================
    // EVENTOS (AÇÕES DO USUÁRIO)
    // ===================================================================

    // --- Lógica para o deslize (swipe) no mobile ---
    const carouselContainer = document.getElementById('cursos');
    let touchStartX = 0;
    let touchEndX = 0;

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            showSlide('next');
        } else if (touchEndX - touchStartX > swipeThreshold) {
            showSlide('prev');
        }
    }

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function(event) {
            touchStartX = event.changedTouches[0].screenX;
        }, { passive: true });
        carouselContainer.addEventListener('touchend', function(event) {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    // --- Evento especial para o link "Nosso Ensino" ---
    const navLinkCursos = document.getElementById('nav-link-cursos');
    if (navLinkCursos) {
        navLinkCursos.addEventListener('click', function(event) {
            event.preventDefault();
            goToSlide(2);
            const cursosSection = document.getElementById('cursos');
            if (cursosSection) {
                cursosSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // --- Eventos dos botões do Carrossel ---
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => showSlide('prev'));
        nextButton.addEventListener('click', () => showSlide('next'));
        setupTouchFeedback(prevButton, 'arrow-feedback-active');
        setupTouchFeedback(nextButton, 'arrow-feedback-active');
    }

    // --- Eventos dos Ícones Sociais ---
    socialIcons.forEach(icon => {
        icon.addEventListener('click', () => icon.blur());
        if (icon.href.includes('facebook')) {
            setupTouchFeedback(icon, 'facebook-feedback-active');
        } else if (icon.href.includes('wa.me')) {
            setupTouchFeedback(icon, 'whatsapp-feedback-active');
        } else if (icon.href.includes('instagram')) {
            setupTouchFeedback(icon, 'instagram-feedback-active');
        }
    });

    // --- Evento do Menu Hamburger ---
    if (toggleButton && header) {
        toggleButton.addEventListener('click', () => {
            header.classList.toggle('open');
            toggleButton.classList.toggle('active');
        });
    }

    // --- Evento para fechar o menu ao clicar em um link ---
    navLinks.forEach(link => {
        // Apenas adiciona o evento se NÃO for o link especial "Nosso Ensino"
        if (link.id !== 'nav-link-cursos') {
            link.addEventListener('click', () => {
                header.classList.remove('open');
                toggleButton.classList.remove('active');
            });
        }
    });

    // --- Evento do botão "Conheça Nosso Ensino" ---
    if (heroButton && produtosSection) {
        heroButton.addEventListener('click', (event) => {
            event.preventDefault();
            produtosSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Evento da sobreposição do mapa ---
    if (mapOverlay) {
        mapOverlay.addEventListener('click', () => mapOverlay.classList.add('hidden'));
    }

    // --- Evento para controle do carrossel pelo teclado ---
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            showSlide('prev');
        } else if (event.key === 'ArrowRight') {
            showSlide('next');
        }
    });

// EFEITO FADE NO SCROLL E INICIALIZAÇÃO
// ===================================================================
const heroSection = document.getElementById('hero');
const heroBgFadeLayer = document.querySelector('.hero-background-fade-overlay');

if (heroSection && heroBgFadeLayer) {
    window.addEventListener('scroll', () => {
        const sectionRect = heroSection.getBoundingClientRect();
        const scrollDistance = -sectionRect.top;

        // Ajuste estes valores se necessário
        const fadeStart = 100; 
        const fadeEndDistance = heroSection.offsetHeight * 0.75; 

        let opacity = 0;
        if (scrollDistance > fadeStart) {
            opacity = Math.min(1, Math.max(0, (scrollDistance - fadeStart) / fadeEndDistance));
        }

        heroBgFadeLayer.style.opacity = opacity;
    });
}   
    
    // Inicia o carrossel automático
    resetSlideTimer();

    // ===================================================================
    // LÓGICA DO BANNER DE CONSENTIMENTO (LGPD/COOKIES)
    // ===================================================================
    const consentBanner = document.getElementById('consent-banner');
    const acceptBtn = document.getElementById('accept-consent-btn');

    if (consentBanner && acceptBtn) {
        const consentGiven = localStorage.getItem('artsConsultoriaConsent');
        if (!consentGiven) {
            setTimeout(() => {
                consentBanner.classList.remove('hidden');
            }, 1000);
        }
        acceptBtn.addEventListener('click', () => {
            consentBanner.classList.add('hidden');
            localStorage.setItem('artsConsultoriaConsent', 'true');
        });
    }
});