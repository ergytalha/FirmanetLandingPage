window.addEventListener("scroll", function () {
    const demand = document.getElementById("demand");
    if (window.scrollY > 0) {
        demand.classList.add("visible");
    } else {
        demand.classList.remove("visible");
    }
});

const swiper = new Swiper(".swiper-container", {
  loop: true, // Sonsuz döngü
  autoplay: {
    delay: 3000, // 3 saniyede bir otomatik geçiş
  },
  slidesPerView: 5, // Aynı anda 5 logo göster
  spaceBetween: 20, // Logolar arasında boşluk
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    // Küçük ekranlar için yapılandırma
    640: {
      slidesPerView: 2, // Mobilde 2 logo göster
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3, // Orta ekranlarda 3 logo göster
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 5, // Büyük ekranlarda 5 logo göster
      spaceBetween: 20,
    },
  },
});

  
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const target = document.querySelector(header.dataset.target);
      const isVisible = target.classList.contains("block");
  
      // Diğer içerikleri gizle
      document.querySelectorAll(".accordion-content").forEach((content) => {
        content.classList.remove("block");
        content.classList.add("hidden");
      });
  
      // İkonları sıfırla
      document.querySelectorAll(".accordion-icon").forEach((icon) => {
        icon.textContent = "+";
      });
  
      // Hedef içeriği göster/gizle
      if (!isVisible) {
        target.classList.remove("hidden");
        target.classList.add("block");
        header.querySelector(".accordion-icon").textContent = "-";
      }
    });
  });
  