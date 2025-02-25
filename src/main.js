// Navbar and Logo Operations
const navbar = document.querySelector("#header");
const logo = document.querySelectorAll(".logo-white");
const logoBlack = document.querySelectorAll(".logo-black");
const links = document.getElementsByClassName('scrool');
const demandButton = document.getElementById("demand");
const menuIconWhite = document.querySelector(".mobile-menu-white");
const menuIconDark = document.querySelector(".mobile-menu-dark");

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

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
      menuIconWhite.classList.add('hidden');
      menuIconDark.classList.remove('hidden');
  } else {
      menuIconWhite.classList.remove('hidden');
      menuIconDark.classList.add('hidden');
  }
});


document.getElementById('menu-toggle').addEventListener('click', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.add('hidden');
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".icon-bg");
  const colors = ["#0054A1", "#fec802", "#ff8d39"];
  icons.forEach((icon) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    icon.style.backgroundColor = randomColor;
  });
});

// Scroll Section Highlight
var focusSectionLink = function (event) {
  for (const link of links) {
    var id = link.hash.slice(1);
    var section = document.getElementById(id);

    if (!section) {
      console.warn(`Section ${id} not found.`);
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

// Swiper Settings
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

// Google Tag Manager dataLayer
window.dataLayer = window.dataLayer || [];

// Base and Discount Price Lists
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

// Calculate Price Function
function calculatePrice() {
  const userCountElement = document.getElementById("priceUserCount");
  const totalPriceElement = document.getElementById("totalPrice");
  const discountPriceElement = document.getElementById("discountPrice");
  const kdvElement = document.querySelector(".kdv-element"); 

  if (!userCountElement || !totalPriceElement || !discountPriceElement || !kdvElement) {
    console.error("Fiyat hesaplaması için gerekli HTML öğeleri bulunamadı!");
    return;
  }

  const userCount = userCountElement.value;

  if (userCount === "50+") {
    totalPriceElement.textContent = "";
    discountPriceElement.textContent = "Lütfen bizimle iletişime geçin.";
    discountPriceElement.style.fontSize = "2rem"; 
    kdvElement.style.display = "none"; 
  } else {
    const parsedUserCount = parseInt(userCount) || 0;
    const price = basePrice[parsedUserCount] || 0;
    const discountPrice = discountPriceList[parsedUserCount] || 0;

    totalPriceElement.textContent = `${price.toLocaleString()} TL`;
    discountPriceElement.textContent = `${discountPrice.toLocaleString()} TL`;
    discountPriceElement.style.fontSize = ""; 
    kdvElement.style.display = "block"; 
  }
}


// Validate Form and Scroll to Price Section
function validateForm() {
  let valid = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const userCount = document.getElementById("userCount").value;
  const sector = document.getElementById("sector").value;
  const kvkkCheckbox = document.getElementById("kvkkCheckbox").checked;
  const demandBtn = document.querySelector(".demand-btn");

  // Hata mesajlarını temizle
  clearErrors();

  const nameRegex = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]+$/;
  if (!nameRegex.test(name)) {
    document.getElementById("name-error").textContent = "Lütfen geçerli bir ad soyad giriniz.";
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("email-error").textContent = "Lütfen geçerli bir e-posta adresi giriniz.";
    valid = false;
  }

  // Telefon numarası doğrulama
  const phoneRegex = /^5\d{9}$/; // Sadece 10 haneli ve 5 ile başlayan Türk GSM numarası
  if (!phoneRegex.test(phone)) {
    document.getElementById("phone-error").textContent = "Lütfen geçerli bir Türk GSM numarası giriniz (örnek: 5551234567).";
    valid = false;
  }

  if (userCount === "") {
    document.getElementById("userCount-error").textContent = "Lütfen kullanıcı sayısını seçiniz.";
    valid = false;
  }

  if (sector === "") {
    document.getElementById("sector-error").textContent = "Lütfen bir sektör seçiniz.";
    valid = false;
  }

  if (!kvkkCheckbox) {
    document.getElementById("kvkk-error").textContent = "Aydınlatma ve rıza metnini kabul etmelisiniz.";
    valid = false;
  }

  if (!valid) {
    return false;
  }

  demandBtn.style.display = "none";

  const priceSection = document.querySelector("#price-area");
  priceSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  return true;
}

// Hata mesajlarını temizlemek için olay dinleyicilerinin bağlanması
function clearErrors() {
  document.getElementById("name").addEventListener("input", () => {
    document.getElementById("name-error").textContent = "";
  });

  document.getElementById("email").addEventListener("input", () => {
    document.getElementById("email-error").textContent = "";
  });

  document.getElementById("phone").addEventListener("input", () => {
    const phone = document.getElementById("phone").value.trim();
    const phoneRegex = /^5\d{9}$/;
    if (!phoneRegex.test(phone)) {
      document.getElementById("phone-error").textContent = "Lütfen geçerli bir GSM numarası giriniz (örnek: 5551234567).";
    } else {
      document.getElementById("phone-error").textContent = "";
    }
  });

  document.getElementById("userCount").addEventListener("change", () => {
    document.getElementById("userCount-error").textContent = "";
  });

  document.getElementById("sector").addEventListener("change", () => {
    document.getElementById("sector-error").textContent = "";
  });

  document.getElementById("kvkkCheckbox").addEventListener("change", () => {
    document.getElementById("kvkk-error").textContent = "";
  });
}

// Sayfa yüklendiğinde hata temizleme olaylarını bağla
document.addEventListener("DOMContentLoaded", clearErrors);


// Go to Price Step Function
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

  dataLayer.push({
    event: "success1",
    user: { name, email, phone, userCount, sector },
  });

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

  const priceUserCountElement = document.getElementById("priceUserCount");
  if (priceUserCountElement) {
    priceUserCountElement.value = userCount;
    calculatePrice();
  }
}

// Submit Second Step Function
function submitSecondStep() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const userCount = document.getElementById("priceUserCount").value;
  const sector = document.getElementById("sector").value;

  dataLayer.push({
    event: "success2",
    user: { name, email, phone, userCount, sector },
  });

  const confirmationMessage = document.getElementById("confirmationMessage");
  if (confirmationMessage) {
    confirmationMessage.classList.remove("hidden");
  }

  document.getElementById("form-area").classList.add("hidden");
  document.getElementById("price-area").classList.add("hidden");
}

// Modal Operations
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const closeModalFooter = document.getElementById('closeModalFooter');
const popupModal = document.getElementById('popupModal');

let scrollPosition = 0;

openModal.addEventListener('click', () => {
    scrollPosition = window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    popupModal.classList.remove('hidden');
});

const closeModalFunction = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
    popupModal.classList.add('hidden');
};

closeModal.addEventListener('click', closeModalFunction);
closeModalFooter.addEventListener('click', closeModalFunction);

window.addEventListener('click', (e) => {
    if (e.target === popupModal) {
        closeModalFunction();
    }
});