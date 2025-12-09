fetch("gifts.json")
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector(".Gifts__container");
    const modalContent = document.querySelector(".modals");
    const modalOverlay = document.querySelector(".modalcontainer");

    data.forEach(element => {
      const div = document.createElement("div");
      div.classList.add("cards");

      let imgurl, categoryClass;
      if (element.category === "For Work") {
        imgurl = "../christmas-shop/images/gift-for-work.png";
        categoryClass = "work";
      } else if (element.category === "For Health") {
        imgurl = "../christmas-shop/images/gift-for-health.png";
        categoryClass = "health";
      } else {
        imgurl = "../christmas-shop/images/gift-for-harmony.png";
        categoryClass = "harmony";
      }

      div.innerHTML = `
        <img src="${imgurl}">
        <div>
          <h4 class="${categoryClass}"><a href="#">${element.category}</a></h4>
          <h3>${element.name}</h3>
        </div>
      `;

      container.appendChild(div);

      // Card click → open modal
      div.addEventListener("click", () => {
        modalContent.innerHTML = `
          <div class="modal_img"><img src="${imgurl}"></div>
          <div>
            <h4 class="${categoryClass}"><a href="#">${element.category}</a></h4>
            <h3>${element.name}</h3>
            <p>${element.description}</p>
            <h4>Adds superpowers to:</h4>
            <div class="stars">
              <div><p>Live</p><p class="power">${element.superpowers.live}</p></div>
              <div><p>Create</p><p class="power">${element.superpowers.create}</p></div>
              <div><p>Love</p><p class="power">${element.superpowers.love}</p></div>
              <div><p>Dream</p><p class="power">${element.superpowers.dream}</p></div>
            </div>
            <button class="close">X</button>
          </div>
        `;

        // Add stars dynamically
       modalContent.querySelectorAll(".power").forEach(p => {
  const value = parseInt(p.textContent.replace(/\D/g, ""), 10); // extract number
  const starCount = Math.min(Math.floor(value / 100), 5); // e.g. 300 → 3 stars

  const starContainer = document.createElement("div");
  starContainer.classList.add("star_layt");

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("img");
    star.src = "../christmas-shop/images/icon.svg";
    // First N stars full opacity, rest faded
    star.style.opacity = i < starCount ? "1" : "0.1";
    starContainer.appendChild(star);
  }

  p.parentElement.appendChild(starContainer);
});


        modalOverlay.style.display = "flex";
        document.body.classList.add("no-scroll");

        modalContent.querySelector(".close").addEventListener("click", () => {
          document.body.classList.remove("no-scroll");
          modalOverlay.style.display = "none";
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

    // Filters
    document.querySelector(".forwork").addEventListener("click", () => {
      document.querySelectorAll(".cards").forEach(item => {
        const h4 = item.querySelector("h4");
        item.style.display = h4.classList.contains("work") ? "block" : "none";
      });
    });

    document.querySelector(".forhealth").addEventListener("click", () => {
      document.querySelectorAll(".cards").forEach(item => {
        const h4 = item.querySelector("h4");
        item.style.display = h4.classList.contains("health") ? "block" : "none";
      });
    });

    document.querySelector(".forharmony").addEventListener("click", () => {
      document.querySelectorAll(".cards").forEach(item => {
        const h4 = item.querySelector("h4");
        item.style.display = h4.classList.contains("harmony") ? "block" : "none";
      });
    });

    document.querySelector(".all").addEventListener("click", () => {
      document.querySelectorAll(".cards").forEach(item => {
        item.style.display = "block";
      });
    });
  })
  .catch(error => console.error("Error loading JSON:", error));

// Nav active link toggle
document.querySelectorAll(".nav__item").forEach(but => {
  but.addEventListener("click", () => {
    document.querySelectorAll(".nav__item").forEach(item => {
      item.classList.remove("activelink");
    });
    but.classList.add("activelink");
  });
});

// Scroll-to-top button
window.addEventListener("scroll", () => {
  if (window.innerWidth < 750 && window.scrollY > 500) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
});

document.getElementById("myBtn").addEventListener("click", () => {
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
  
})
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
