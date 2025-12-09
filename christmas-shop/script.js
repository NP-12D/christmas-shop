document.addEventListener("DOMContentLoaded", () => {
    const featuresContainer = document.querySelector(".slider__row");
    const visibleArea = document.querySelector(".slider").offsetWidth;
    const prevButton = document.querySelector(".slidbar__button1 button");
    const nextButton = document.querySelector(".slidbar__button2 button");
    let currentPosition = 0;

    function getMoveAmount() {
        const totalWidth = featuresContainer.scrollWidth;
        const screenWidth = window.innerWidth;
        const adjustedWidth = screenWidth > 780 ? totalWidth + 126 : totalWidth + 10;
        let clicks = screenWidth >= 769 ? 3 : 6;
        return (adjustedWidth - visibleArea) / clicks;
    }

    function updateSliderPosition() {
        const moveAmount = getMoveAmount();
        const maxPosition = Math.ceil((featuresContainer.scrollWidth - visibleArea) / moveAmount);
        currentPosition = Math.max(0, Math.min(currentPosition, maxPosition));
        featuresContainer.style.transform = `translateX(-${currentPosition * moveAmount}px)`;
        prevButton.disabled = currentPosition === 0;
        nextButton.disabled = currentPosition === maxPosition;
    }

    nextButton.addEventListener("click", () => {
        currentPosition++;
        updateSliderPosition();
    });

    prevButton.addEventListener("click", () => {
        currentPosition--;
        updateSliderPosition();
    });

    updateSliderPosition();
    window.addEventListener("resize", () => {
        currentPosition = 0;
        updateSliderPosition();
    });
});

function updateCountdown() {
    const now = new Date();
    const newYear = new Date("2026-01-01T00:00:00Z");
    const difference = newYear - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.querySelector(".timer__container .timer__item:nth-of-type(1) h2").textContent= days;
        document.querySelector(".timer__container .timer__item:nth-of-type(2) h2").textContent = hours;
        document.querySelector(".timer__container .timer__item:nth-of-type(3) h2").textContent = minutes;
        document.querySelector(".timer__container .timer__item:nth-of-type(4) h2").textContent = seconds;
    } else {
        clearInterval(timerInterval);
        document.querySelector(".timer__container").innerHTML = "<p>Happy New Year!</p>";
    }
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();


const row = document.querySelector(".slider__row");
const items = row.querySelectorAll("p, img"); // all text+image items
const prevBtn = document.querySelector(".slidbar__button1 button");
const nextBtn = document.querySelector(".slidbar__button2 button");

let index = 0;
const itemWidth = 300; // must match CSS width

function updateSlider() {
  const offset = -index * itemWidth;
  row.style.transform = `translateX(${offset}px)`;
}

nextBtn.addEventListener("click", () => {
  if (index < items.length - 1) {
    index++;
    updateSlider();
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});
