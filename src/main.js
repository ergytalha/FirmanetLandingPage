// ✅ Navbar ve Logo İşlemleri
const navbar = document.querySelector("#header");
const logo = document.querySelectorAll(".logo-white");
const logoBlack = document.querySelectorAll(".logo-black");
const links = document.getElementsByClassName('scrool');
const demandButton = document.getElementById("demand");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    demandButton.classList.add("visible");
  } else {
    demandButton.classList.remove("visible");
  }
});
logoBlack.forEach((logoBlack) => {
  logoBlack.classList.add("hidden");
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    navbar.classList.add("nav-bg");
    logo.forEach((logo) => {
      logo.classList.add("hidden");
    });
    logoBlack.forEach((logoBlack) => {
      logoBlack.classList.remove("hidden");
    });
  } else {
    navbar.classList.remove("nav-bg");
    logo.forEach((logo) => {
      logo.classList.remove("hidden");
    });
    logoBlack.forEach((logoBlack) => {
      logoBlack.classList.add("hidden");
    });
  }
});
document.getElementById('menu-toggle').addEventListener('click', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});

// Scroll Section Highlight
var focusSectionLink = function (event) {
  for (const link of links) {
    var id = link.hash.slice(1);
    var section = document.getElementById(id);

    if (!section) {
      console.warn(`Section ${id} bulunamadı.`);
      continue; // Section yoksa atla
    }

    var position = window.scrollY + (window.innerHeight / 1);
    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
      link.ariaCurrent = 'page';
      link.classList.add('active');
    } else {
      link.ariaCurrent = null;
      link.classList.remove('active');
    }
  }
};

var focusSection = function (event) {
  event.preventDefault();
  var id = event.target.hash.slice(1);
  var section = document.getElementById(id);
  if (section) {
      window.scrollTo({
          top: section.offsetTop - navbar.offsetHeight,
          behavior: 'smooth'
      });
  }
};

window.addEventListener('scroll', focusSectionLink);

for (const link of links) {
  link.addEventListener('click', focusSection);
}
const button = document.querySelector('a[href="#hidden-section"]');
if (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    hiddenSection.classList.remove("hidden");
    hiddenSection.scrollIntoView({ behavior: "smooth" });
  });
} else {
  console.error("Button bulunamadı!");
}
// ✅ Swiper Ayarları
const swiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000,
  },
  slidesPerView: 5,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 10 },
    768: { slidesPerView: 3, spaceBetween: 15 },
    1024: { slidesPerView: 5, spaceBetween: 20 },
  },
});

// ✅ Akordeon İşlemleri
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const target = document.querySelector(header.dataset.target);
    const isVisible = target.classList.contains("block");

    document.querySelectorAll(".accordion-content").forEach((content) => {
      content.classList.remove("block");
      content.classList.add("hidden");
    });

    document.querySelectorAll(".accordion-icon").forEach((icon) => {
      icon.textContent = "+";
    });

    if (!isVisible) {
      target.classList.remove("hidden");
      target.classList.add("block");
      header.querySelector(".accordion-icon").textContent = "-";
    }
  });
});

// ✅ Google Tag Manager için dataLayer tanımlandı
window.dataLayer = window.dataLayer || [];


// ✅ Kullanıcı sayısı baz fiyatları
const basePrice = {
  10: 300000,
  15: 427500,
  20: 540000,
  25: 637500,
  35: 840000,
  50: 1050000,
};

// ✅ Modül verileri
const modulesData = {
  lab: "Laboratuvar Modülü",
  realEstate: "Emlak Modülü",
};

// ✅ Fiyat hesaplama fonksiyonu
function calculatePrice() {
  const userCountElement = document.getElementById("priceUserCount");
  const priceElement = document.getElementById("totalPrice");

  if (!userCountElement || !priceElement) {
    console.error("Fiyat hesaplama için gerekli HTML elemanları bulunamadı!");
    return;
  }

  const userCount = userCountElement.value;
  let price = basePrice[userCount] || 0;

  priceElement.textContent = `₺${price.toLocaleString()}`;
}

// ✅ Formdan fiyatlandırmaya geçiş
function goToPriceStep() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const userCount = document.getElementById("userCount").value;
  const sector = document.getElementById("sector").value;
  const moduleListContainer = document.getElementById("module-list");

  if (name && email && phone) {
    // 📌 GTM Event Gönderimi
    dataLayer.push({
      event: "success1",
      user: { name, email, phone, userCount, sector },
    });

    // 📌 Formu gizle, fiyatlandırmayı göster
    document.getElementById("form-area").classList.add("hidden");

    document.querySelectorAll(".dynamic-module").forEach((el) => el.remove());

    if (sector === "lab" || sector === "realEstate") {
      const dynamicModule = `
        <div class="text-gray-700 font-bold flex items-center dynamic-module">
          <span class="w-4 h-4 flex items-center justify-center bg-[#8bc34a3d] text-[#8bc34a] rounded-[100%] p-3">✓</span>
          <span class="ml-2 text-sm">${modulesData[sector]}</span>
        </div>
      `;
      moduleListContainer.insertAdjacentHTML("afterbegin", dynamicModule);
    }
  

    const priceArea = document.getElementById("price-area");
    if (priceArea) {
      priceArea.classList.remove("hidden");
    }

    // 📌 Kullanıcı sayısını güncelle
    const priceUserCountElement = document.getElementById("priceUserCount");
    if (priceUserCountElement) {
      priceUserCountElement.value = userCount;
      calculatePrice(); // 📌 Fiyatı hesapla
    }
  } else {
    alert("Lütfen tüm alanları doldurun!");
  }
}

// ✅ Fiyatlandırmayı onaylama (teklif gönderme)
function submitSecondStep() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const userCount = document.getElementById("priceUserCount").value;
  const sector = document.getElementById("sector").value;

  // 📌 GTM Event Gönderimi
  dataLayer.push({
    event: "success2",
    user: { name, email, phone, userCount, sector },
  });

  // 📌 Bilgilendirme mesajını göster
  const confirmationMessage = document.getElementById("confirmationMessage");
  if (confirmationMessage) {
    confirmationMessage.classList.remove("hidden"); // Mesajı görünür yap
  }

  // 📌 Formu ve fiyat bölümünü gizle
  document.getElementById("form-area").classList.add("hidden");
  document.getElementById("price-area").classList.add("hidden");
}


// Sayfa yüklendiğinde modülleri güncelle
window.onload = updateModules;
