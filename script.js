document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('fotos-track');
    if (!track) return;

    const slides = Array.from(track.getElementsByClassName('slide'));
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProximo = document.getElementById('btn-proximo');
    const wrapper = document.querySelector('.carrosel-3d-wrapper');

    if (slides.length === 0 || !btnAnterior || !btnProximo) return;

    let currentIndex = 1;
    let autoPlayInterval = null;

    // Atualiza as classes CSS nos slides
    function updateCarouselClasses() {
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });

        const total = slides.length;
        const prevIndex = (currentIndex - 1 + total) % total;
        const nextIndex = (currentIndex + 1) % total;

        slides[currentIndex].classList.add('active');
        slides[prevIndex].classList.add('prev');
        slides[nextIndex].classList.add('next');
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarouselClasses();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarouselClasses();
    }

    // 1. Cliques nos botões
    btnProximo.addEventListener('click', showNext);
    btnAnterior.addEventListener('click', showPrev);

    // 2. Clique direto na foto lateral para focar nela
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (slide.classList.contains('prev')) {
                showPrev();
            } else if (slide.classList.contains('next')) {
                showNext();
            }
        });
    });

    // 3. Navegação por teclado (Seta Esquerda / Seta Direita)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    // 4. Autoplay (Passa fotos sozinho e pausa no hover)
    function startAutoPlay() {
        autoPlayInterval = setInterval(showNext, 4000); // Muda a cada 4s
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopAutoPlay);
        wrapper.addEventListener('mouseleave', startAutoPlay);
    }

    // Inicialização
    updateCarouselClasses();
    startAutoPlay();
});