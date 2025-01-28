const navbar = document.querySelector('#header');

window.addEventListener('scroll', () => { 
  if (window.scrollY > 0) {
    navbar.classList.add('nav-bg');
  } else {
    navbar.classList.remove('nav-bg');
  }

} )

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
 
  const basePrice = {
    "10": 300000,
    "15": 427500,
    "20": 540000,
    "25": 637500,
    "35": 840000,
    "50": 1050000
  };
  
  const modulesData = {
    general: [
      "Ofis Yönetimi", "Müşteri İlişkileri Yönetimi (CRM)", "Satış Yönetimi", "Yardım Masası", 
      "Araç Yönetimi", "Malzeme ve Stok Yönetimi", "Tedarik Zinciri Yönetimi", "Malzeme İhtiyaç Yönetimi (MRP)",
      "Servis Yönetimi", "Dokümantasyon Yönetimi", "Hukuk Yönetimi", "İnsan Kaynakları Yönetimi", 
      "Ön Muhasebe Yönetimi", "Finans Yönetimi", "Raporlar ve Dashboard", "Proje Yönetimi", "Üretim Yönetimi", 
      "Ar-ge Yönetimi", "Bakım/Onarım", "Kantar Yönetimi", "Resmi Muhasebe Yönetimi", "Demirbaş Yönetimi", 
      "Bütçe Yönetimi", "Bordro Yönetimi"
    ],
    lab: [
      "Laboratuvar Modülü"
    ],
    realEstate: [
      "Emlak Modülü"
    ]
  };
  
  function updateModules() {
    const userCount = document.getElementById('userCount').value;
    const sector = document.getElementById('sector').value;
    const price = basePrice[userCount];
    const modules = [...modulesData.general]; // Başlangıçta tüm modülleri al
  
    // Seçilen sektöre göre ek modüller ekle
    if (sector === 'lab') {
      modules.unshift("Laboratuvar Modülü"); // Laboratuvar modülünü ekle
    } else if (sector === 'realEstate') {
      modules.unshift("Emlak Modülü"); // Emlak modülünü ekle
    }
  
    // Modülleri tabloya ekle
    const moduleContainer = document.getElementById('modulesList');
    moduleContainer.innerHTML = "";
    let count = 0;
    let row = "<tr>";
  
    modules.forEach((module) => {
      if (count < 4) {
        row += `<td class=\"border p-4 text-gray-700\">${module}</td>`;
        count++;
      } else {
        row += `</tr><tr><td class=\"border p-4 text-gray-700\">${module}</td>`;
        count = 1;
      }
    });
  
    row += "</tr>";
    moduleContainer.innerHTML = row;
  
    // Brüt fiyatı hesapla (Seçilen kullanıcı sayısı + 5 kullanıcı + 30000 * 1.25)
    let grossPrice = (parseInt(userCount) + (document.getElementById('extraUser').checked ? 5 : 0)) * 30000 * 1.25;
  
    // İndirimli fiyatı güncelle
    document.getElementById('discountPrice').textContent = grossPrice.toLocaleString();
    document.getElementById('totalPrice').textContent = price.toLocaleString();
  }
  
  function updatePrice() {
    const extraUser = document.getElementById('extraUser').checked;
    let userCount = parseInt(document.getElementById('userCount').value);
    let totalPrice = basePrice[userCount];
  
    // +5 kullanıcı kutusu işaretli ise fiyatı ₺135.000 artır
    if (extraUser) {
      totalPrice += 135000; // 5 ek kullanıcı için ₺135.000 ekle
    }
  
    // Toplam fiyatı güncelle
    document.getElementById('totalPrice').textContent = `${totalPrice.toLocaleString()}`;
  }
  
  // Kullanıcı sayısı değiştiğinde +5 kullanıcı kutusunun işaretini kaldır
  function resetExtraUser() {
    document.getElementById('extraUser').checked = false;
    updatePrice();
  }
  
  // İlk yüklemede modülleri güncelle
  window.onload = updateModules;
  