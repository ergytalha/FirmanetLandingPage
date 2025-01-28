// Navbar ve Logo İşlemleri
const navbar = document.querySelector("#header");
const logo = document.querySelectorAll(".logo-white");
const logoBlack = document.querySelectorAll(".logo-black");

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

// Gizli Bölüm (Hidden Section) İşlemleri
const button = document.querySelector('a[href="#hidden-section"]');
const hiddenSection = document.querySelector("#hidden-section");

button.addEventListener("click", (e) => {
  e.preventDefault();
  hiddenSection.classList.remove("hidden");
  hiddenSection.scrollIntoView({ behavior: "smooth" });
});

// Scroll İşlemleri
window.addEventListener("scroll", () => {
  const demand = document.getElementById("demand");
  if (window.scrollY > 0) {
    demand.classList.add("visible");
  } else {
    demand.classList.remove("visible");
  }
});

// Swiper Ayarları
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
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

// Akordeon İşlemleri
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

// Fiyatlandırma İşlemleri
const basePrice = {
  10: 300000,
  15: 427500,
  20: 540000,
  25: 637500,
  35: 840000,
  50: 1050000,
};

const modulesData = {
  general: [
    "Ofis Yönetimi",
    "Müşteri İlişkileri Yönetimi (CRM)",
    "Satış Yönetimi",
    "Yardım Masası",
    "Araç Yönetimi",
    "Malzeme ve Stok Yönetimi",
    "Tedarik Zinciri Yönetimi",
    "Malzeme İhtiyaç Yönetimi (MRP)",
    "Servis Yönetimi",
    "Dokümantasyon Yönetimi",
    "Hukuk Yönetimi",
    "İnsan Kaynakları Yönetimi",
    "Ön Muhasebe Yönetimi",
    "Finans Yönetimi",
    "Raporlar ve Dashboard",
    "Proje Yönetimi",
    "Üretim Yönetimi",
    "Ar-ge Yönetimi",
    "Bakım/Onarım",
    "Kantar Yönetimi",
    "Resmi Muhasebe Yönetimi",
    "Demirbaş Yönetimi",
    "Bütçe Yönetimi",
    "Bordro Yönetimi",
  ],
  lab: ["Laboratuvar Modülü"],
  realEstate: ["Emlak Modülü"],
};

function updateModules() {
  const userCount = document.getElementById("userCount").value;
  const sector = document.getElementById("sector").value;
  const price = basePrice[userCount];
  const modules = [...modulesData.general];

  if (sector === "lab") {
    modules.unshift("Laboratuvar Modülü");
  } else if (sector === "realEstate") {
    modules.unshift("Emlak Modülü");
  }

  const moduleContainer = document.getElementById("modulesList");
  moduleContainer.innerHTML = "";
  let count = 0;
  let row = "<tr>";

  modules.forEach((module) => {
    if (count < 4) {
      row += `<td class="border p-4 text-gray-700">${module}</td>`;
      count++;
    } else {
      row += `</tr><tr><td class="border p-4 text-gray-700">${module}</td>`;
      count = 1;
    }
  });

  row += "</tr>";
  moduleContainer.innerHTML = row;

  let grossPrice =
    (parseInt(userCount) +
      (document.getElementById("extraUser").checked ? 5 : 0)) *
    30000 *
    1.25;

  document.getElementById("discountPrice").textContent =
    grossPrice.toLocaleString();
  document.getElementById("totalPrice").textContent = price.toLocaleString();
}

function updatePrice() {
  const extraUser = document.getElementById("extraUser").checked;
  let userCount = parseInt(document.getElementById("userCount").value);
  let totalPrice = basePrice[userCount];

  if (extraUser) {
    totalPrice += 135000;
  }
  document.getElementById(
    "totalPrice"
  ).textContent = `${totalPrice.toLocaleString()}`;
}

function resetExtraUser() {
  document.getElementById("extraUser").checked = false;
  updatePrice();
}

window.onload = updateModules;

// Step İşlemleri (Form -> Fiyatlandırma)
function goToPriceStep() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (name && email && phone) {
    document.getElementById("form-area").classList.add("hidden");
    document.getElementById("price-area").classList.remove("hidden");
  } else {
    alert("Lütfen tüm alanları doldurun!");
  }
}

function goToFormStep() {
  document.getElementById("price-area").classList.add("hidden");
  document.getElementById("form-area").classList.remove("hidden");
}
