// ========== COUPLE SLIDER ==========
(function() {
    const track = document.getElementById('sliderTrack');
    const slider = document.getElementById('coupleSlider');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    if (!track || !slider) return;

    let currentIndex = 0;
    const slidesCount = 2; // We have 2 images
    let startX = 0;
    let endX = 0;
    let intervalId;

    function showSlide(index) {
        if (index < 0) index = slidesCount - 1;
        if (index >= slidesCount) index = 0;
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        intervalId = setInterval(nextSlide, 3000); // 3 seconds
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide();
        });
    }

    slider.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
        stopAutoSlide();
    }, {passive: true});

    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        if (startX - endX > 30) {
            nextSlide(); // swiped left
        } else if (endX - startX > 30) {
            prevSlide(); // swiped right
        }
        startAutoSlide();
    }, {passive: true});

    startAutoSlide();
})();
