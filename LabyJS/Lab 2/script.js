document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

function goToSlide(n) {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${-n * 100}%)`;
    });
    currentSlide = n;
    updateDots();
}

document.querySelector('.next-slide').addEventListener('click', () => {
    if (currentSlide === slides.length - 1) {
        goToSlide(0);
    } else {
        goToSlide(currentSlide + 1);
    }
});

document.querySelector('.prev-slide').addEventListener('click', () => {
    if (currentSlide === 0) {
        goToSlide(slides.length - 1);
    } else {
        goToSlide(currentSlide - 1);
    }
});
    goToSlide(0);
});


