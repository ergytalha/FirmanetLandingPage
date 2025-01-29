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
  general: [
    "Ofis Yönetimi", "Müşteri İlişkileri Yönetimi (CRM)", "Satış Yönetimi",
    "Yardım Masası", "Araç Yönetimi", "Malzeme ve Stok Yönetimi",
    "Tedarik Zinciri Yönetimi", "Malzeme İhtiyaç Yönetimi (MRP)", 
    "Servis Yönetimi", "Dokümantasyon Yönetimi", "Hukuk Yönetimi",
    "İnsan Kaynakları Yönetimi", "Ön Muhasebe Yönetimi", "Finans Yönetimi",
    "Raporlar ve Dashboard", "Proje Yönetimi", "Üretim Yönetimi",
    "Ar-ge Yönetimi", "Bakım/Onarım", "Kantar Yönetimi",
    "Resmi Muhasebe Yönetimi", "Demirbaş Yönetimi", "Bütçe Yönetimi",
    "Bordro Yönetimi"
  ],
  lab: ["Laboratuvar Modülü"],
  realEstate: ["Emlak Modülü"],
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

  if (name && email && phone) {
    // 📌 GTM Event Gönderimi
    dataLayer.push({
      event: "success1",
      user: { name, email, phone, userCount, sector },
    });

    // 📌 Formu gizle, fiyatlandırmayı göster
    document.getElementById("form-area").classList.add("hidden");

    const priceArea = document.getElementById("price-area");
    if (priceArea) {
      priceArea.classList.remove("hidden");
      console.log("✅ Fiyatlandırma alanı açıldı!");
    } else {
      console.error("❌ Fiyatlandırma alanı bulunamadı!");
    }

    // 📌 Kullanıcı sayısını güncelle
    const priceUserCountElement = document.getElementById("priceUserCount");
    if (priceUserCountElement) {
      priceUserCountElement.value = userCount;
      calculatePrice(); // 📌 Fiyatı hesapla
    } else {
      console.error("❌ Kullanıcı sayısı seçimi alanı bulunamadı!");
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

  alert("Bilgileriniz başarıyla gönderildi! Ekibimiz sizinle iletişime geçecektir.");
}

// ✅ Modül listesini güncelleme
function updateModules() {
  const sector = document.getElementById("sector").value;
  let modules = [...modulesData.general];

  if (sector === "lab") {
    modules.unshift("Laboratuvar Modülü");
  } else if (sector === "realEstate") {
    modules.unshift("Emlak Modülü");
  }

  const moduleContainer = document.getElementById("modulesList");
  if (!moduleContainer) {
    console.error("❌ Modül listesi bulunamadı!");
    return;
  }

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
}

// ✅ Sayfa yüklendiğinde modülleri güncelle
window.onload = updateModules;
