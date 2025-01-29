window.dataLayer = window.dataLayer || {};

// Kullanıcı fiyatlandırma tablosu
const basePrice = {
  10: 300000,
  15: 427500,
  20: 540000,
  25: 637500,
  35: 840000,
  50: 1050000,
};

// Fiyatlandırmayı hesaplama fonksiyonu
function calculatePrice() {
  const userCount = document.getElementById("priceUserCount").value;
  let price = basePrice[userCount];

  // Güncellenen fiyatı ekrana yazdır
  document.getElementById("totalPrice").textContent = `₺${price.toLocaleString()}`;
}

// **1. Aşamadan 2. Aşamaya Geçiş (Formu Gönder ve Fiyatı Gör)**
function goToPriceStep() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const userCount = document.getElementById("userCount").value;
  const sector = document.getElementById("sector").value;

  if (name && email && phone) {
    // **Google Tag Manager (GTM) - İlk Event Gönderimi**
    window.dataLayer.push({
      event: "success1",
      user: {
        name: name,
        email: email,
        phone: phone,
        userCount: userCount,
        sector: sector
      },
    });

    // **Seçilen kullanıcı sayısını 2. aşamadaki select alanına taşı**
    document.getElementById("priceUserCount").value = userCount;
    
    // **Fiyatı güncelle**
    calculatePrice();

    // **Formu gizle, fiyat alanını göster**
    document.getElementById("form-area").classList.add("hidden");
    document.getElementById("price-area").classList.remove("hidden");
  } else {
    alert("Lütfen tüm alanları doldurun!");
  }
}

// **2. Aşama: Teklifi Onayla ve Gönder**
function submitSecondStep() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const userCount = document.getElementById("priceUserCount").value;
  const sector = document.getElementById("sector").value;

  // **Google Tag Manager (GTM) - İkinci Event Gönderimi**
  window.dataLayer.push({
    event: "success2",
    user: {
      name: name,
      email: email,
      phone: phone,
      userCount: userCount,
      sector: sector
    },
  });

  alert("Bilgileriniz başarıyla gönderildi! Ekibimiz sizinle iletişime geçecektir.");
}