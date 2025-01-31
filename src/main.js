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
      continue; 
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


// ✅ Google Tag Manager için dataLayer tanımlandı
window.dataLayer = window.dataLayer || [];


// ✅ Kullanıcı sayısı liste ve indirimli fiyatlar
const basePrice = {
  10: 650000,
  15: 900000,
  20: 1150000,
  25: 1400000,
  30: 1650000,
  35: 1900000,
  40: 2150000,
  45: 2400000,
  50: 2650000,
};

const discountPriceList = {
  10: 520000,
  15: 705000,
  20: 880000,
  25: 1045000,
  30: 1200000,
  35: 1345000,
  40: 1480000,
  45: 1605000,
  50: 1720000,
};

// ✅ Fiyat hesaplama fonksiyonu
function calculatePrice() {
  const userCountElement = document.getElementById("priceUserCount");
  const totalPriceElement = document.getElementById("totalPrice");
  const discountPriceElement = document.getElementById("discountPrice");

  if (!userCountElement || !totalPriceElement || !discountPriceElement) {
    console.error("Fiyat hesaplama için gerekli HTML elemanları bulunamadı!");
    return;
  }

  const userCount = parseInt(userCountElement.value) || 0;
  const price = basePrice[userCount] || 0;
  const discountPrice = discountPriceList[userCount] || 0;

  // Liste ve indirimli fiyatı göster
  totalPriceElement.textContent = `₺${price.toLocaleString()}`;
  discountPriceElement.textContent = `₺${discountPrice.toLocaleString()}`;
}

// ✅ Formdan fiyatlandırmaya geçiş
function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const userCount = document.getElementById("userCount").value;
  const sector = document.getElementById("sector").value;

  // Ad Soyad Doğrulama (sadece harf ve boşluk)
  const nameRegex = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]+$/;
  if (!nameRegex.test(name)) {
    alert("Lütfen geçerli bir ad soyad giriniz (sadece harf ve boşluk).");
    return false;
  }

  // E-posta Doğrulama
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Lütfen geçerli bir e-posta adresi giriniz.");
    return false;
  }

  // Telefon Doğrulama (örnek: 555-555-5555 veya 5555555555)
  const phoneRegex = /^(\d{10}|\d{3}-\d{3}-\d{4})$/;
  if (!phoneRegex.test(phone)) {
    alert("Lütfen geçerli bir telefon numarası giriniz (örnek: 5555555555 veya 555-555-5555).");
    return false;
  }

  // Kullanıcı Sayısı ve Sektör Seçimi Doğrulama
  if (userCount === "" || sector === "") {
    alert("Lütfen kullanıcı sayısı ve sektör seçiniz.");
    return false;
  }

  // Eğer doğrulama başarılıysa, price alanını en üstte göster
  const priceSection = document.querySelector("#price-area");
  priceSection.scrollIntoView({
    behavior: "smooth", // Yumuşak geçiş
    block: "start"      // En üstte konumlandır
  });

  return true;
}

function goToPriceStep() {
  if (!validateForm()) {
    return; 
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const userCount = document.getElementById("userCount").value;
  const sector = document.getElementById("sector").value;
  const moduleListContainer = document.getElementById("module-list");

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


let scrollPosition = 0;

    function openModal() {
      // Mevcut kaydırma pozisyonunu al ve sabitle
      scrollPosition = window.scrollY;
      document.body.style.top = `-${scrollPosition}px`;
      document.body.classList.add("modal-open");

      // Modal ve arka planı göster
      document.getElementById("static-modal").classList.remove("hidden");
      document.getElementById("modalBackdrop").classList.remove("hidden");
    }

    function closeModal() {
      // Modal ve arka planı gizle
      document.getElementById("static-modal").classList.add("hidden");
      document.getElementById("modalBackdrop").classList.add("hidden");

      // Sayfayı eski pozisyonuna döndür ve kaydırmayı tekrar etkinleştir
      document.body.classList.remove("modal-open");
      document.body.style.top = "";
      window.scrollTo(0, scrollPosition);
    }