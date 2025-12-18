window.addEventListener("scroll", function () {
  if (window.innerWidth < 750 && window.scrollY > 900) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
});
document.getElementById("myBtn").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const ful = document.querySelector(".container");
const list = document.querySelector(".container__list");

document.querySelector(".nav__burger").addEventListener("click", function() {
  ful.classList.toggle("container");
  ful.classList.toggle("fullpagemenu");

  list.classList.toggle("container__list")
  list.classList.toggle("fullpagemenu_list");
  document.querySelector(".nav__burger").classList.toggle("active");

  document.body.classList.toggle("no-scroll");

});
list.addEventListener("click", function () {
  if (list.classList.contains("fullpagemenu_list")) {
    ful.classList.toggle("container");
    ful.classList.toggle("fullpagemenu");

    list.classList.toggle("container__list");
    list.classList.toggle("fullpagemenu_list");
    document.querySelector(".nav__burger").classList.toggle("active");

    document.body.classList.toggle("no-scroll");
  }
});

window.addEventListener("scroll", function() {
  const burger = document.querySelector(".nav__burger");

  if (  window.innerWidth > 750){
    burger.style.display = "none";}

    else if(window.scrollY > 10 ) {

    burger.style.display = "none";
  } else {
 
    burger.style.display = "flex"; 
  }
});

function updateCountdown() {
  const now = new Date();
  const newYear = new Date("2026-01-01T00:00:00Z");
  const difference = newYear - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.querySelector(
      ".timer__container .timer__item:nth-of-type(1) h2"
    ).textContent = days;
    document.querySelector(
      ".timer__container .timer__item:nth-of-type(2) h2"
    ).textContent = hours;
    document.querySelector(
      ".timer__container .timer__item:nth-of-type(3) h2"
    ).textContent = minutes;
    document.querySelector(
      ".timer__container .timer__item:nth-of-type(4) h2"
    ).textContent = seconds;
  } else {
    clearInterval(timerInterval);
    document.querySelector(".timer__container").innerHTML =
      "<p>Happy New Year!</p>";
  }
}

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();


const row = document.querySelector(".slider__row");
const items = document.querySelectorAll(".slider__row div");
const nextBtn = document.querySelector(".slidbar__button2 button");
const prevBtn = document.querySelector(".slidbar__button1 button");

let index = 1;
let itemWidth;
if(window.innerWidth<600){
itemWidth = 200;
}
else{
  itemWidth = 350;
}

function updateSlider() {
  const offset = -index* itemWidth;
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


window.addEventListener("resize", updateSlider);
const cards = document.querySelectorAll(".cards");

const modalContent = document.querySelector(".modals");
const modalOverlay = document.querySelector(".modalcontainer");
cards.forEach(card => {
  card.addEventListener("click", function () {
    const giftName = card.querySelector("h3").textContent.trim().toLowerCase();

    fetch("gifts.json")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => item.name.toLowerCase() === giftName);

        if (filtered.length > 0) {
          const item = filtered[0]; 

        
          const imgurl = getImageByCategory(item.category);

          modalContent.innerHTML = `
            <div class="modal_img"><img src="${imgurl}"></div>
            <div>
              <h4 class="${item.categoryClass}"><a href="#">${item.category}</a></h4>
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <h4>Adds superpowers to:</h4>
              <div class="stars">
                <div><p>Live</p><p class="power">${item.superpowers.live}</p></div>
                <div><p>Create</p><p class="power">${item.superpowers.create}</p></div>
                <div><p>Love</p><p class="power">${item.superpowers.love}</p></div>
                <div><p>Dream</p><p class="power">${item.superpowers.dream}</p></div>
              </div>
              <button class="close">X</button>
            </div>
          `;

          
          modalContent.querySelectorAll(".power").forEach(p => {
            const value = parseInt(p.textContent.replace(/\D/g, ""), 10);
            const starCount = Math.min(Math.floor(value / 100), 5);

            const starContainer = document.createElement("div");
            starContainer.classList.add("star_layt");

            for (let i = 0; i < 5; i++) {
              const star = document.createElement("img");
              star.src = "../christmas-shop/images/icon.svg";
              star.style.opacity = i < starCount ? "1" : "0.1";
              starContainer.appendChild(star);
            }

            p.parentElement.appendChild(starContainer);
          });

          // Show modal
          modalOverlay.style.display = "flex";
          document.body.classList.add("no-scroll");

          // Close button
          modalContent.querySelector(".close").addEventListener("click", () => {
            document.body.classList.remove("no-scroll");
            modalOverlay.style.display = "none";
          });
        }
      });
  });
});

// Close modal when clicking outside content
modalOverlay.addEventListener("click", e => {
  if (e.target === modalOverlay) {
    document.body.classList.remove("no-scroll");
    modalOverlay.style.display = "none";
  }
});

function getImageByCategory(category) {
  switch (category.toLowerCase()) {
    case "for work":
      return "../christmas-shop/images/gift-for-work.png";
    case "for health":
      return "../christmas-shop/images/gift-for-health.png";
    case "for harmony":
      return "../christmas-shop/images/gift-for-harmony.png";
    default:
      return "../christmas-shop/images/default.png"; // fallback
  }
}
