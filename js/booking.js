/* ===== LTB Samui - Booking & UI Logic ===== */

// --- i18n ---
const LANG = document.documentElement.lang?.substring(0, 2) || 'en';

const T = {
  en: {
    forGuests: (n) => `for ${n} guest${n > 1 ? 's' : ''}`,
    withTransfer: 'with hotel transfer',
    withoutTransfer: 'without transfer',
    fillFields: 'Please fill in all required fields.',
    acceptTerms: 'Please accept the terms and conditions.',
    dateLocale: 'en-US',
    whatsappHeader: 'New Booking Request — Long Tail Boat Koh Samui',
    whatsappDate: 'Date',
    whatsappGuests: 'Guests',
    whatsappTime: 'Time',
    whatsappTransferYes: 'Yes',
    whatsappTransferNo: 'No (going to pier)',
    whatsappHotelTransfer: 'Hotel Transfer',
    whatsappHotel: 'Hotel',
    whatsappAddress: 'Address',
    whatsappTotalPrice: 'Total Price',
    whatsappBoat: 'boat',
    whatsappTransfer: 'transfer',
    whatsappName: 'Name',
    whatsappEmail: 'Email',
    whatsappPhone: 'Phone',
    whatsappComments: 'Comments',
    openingWhatsapp: 'Opening WhatsApp with your booking details!',
    guestSingular: 'guest',
    guestPlural: 'guests'
  },
  fr: {
    forGuests: (n) => `pour ${n} voyageur${n > 1 ? 's' : ''}`,
    withTransfer: 'avec transfert hôtel',
    withoutTransfer: 'sans transfert',
    fillFields: 'Veuillez remplir tous les champs obligatoires.',
    acceptTerms: 'Veuillez accepter les conditions générales.',
    dateLocale: 'fr-FR',
    whatsappHeader: 'Nouvelle demande de réservation — Long Tail Boat Koh Samui',
    whatsappDate: 'Date',
    whatsappGuests: 'Voyageurs',
    whatsappTime: 'Heure',
    whatsappTransferYes: 'Oui',
    whatsappTransferNo: 'Non (rendez-vous au pier)',
    whatsappHotelTransfer: 'Transfert hôtel',
    whatsappHotel: 'Hôtel',
    whatsappAddress: 'Adresse',
    whatsappTotalPrice: 'Prix total',
    whatsappBoat: 'bateau',
    whatsappTransfer: 'transfert',
    whatsappName: 'Nom',
    whatsappEmail: 'Email',
    whatsappPhone: 'Téléphone',
    whatsappComments: 'Commentaires',
    openingWhatsapp: 'Ouverture de WhatsApp avec votre réservation !',
    guestSingular: 'voyageur',
    guestPlural: 'voyageurs'
  },
  es: {
    forGuests: (n) => `para ${n} viajero${n > 1 ? 's' : ''}`,
    withTransfer: 'con traslado al hotel',
    withoutTransfer: 'sin traslado',
    fillFields: 'Por favor, rellene todos los campos obligatorios.',
    acceptTerms: 'Por favor, acepte los términos y condiciones.',
    dateLocale: 'es-ES',
    whatsappHeader: 'Nueva solicitud de reserva — Long Tail Boat Koh Samui',
    whatsappDate: 'Fecha',
    whatsappGuests: 'Viajeros',
    whatsappTime: 'Hora',
    whatsappTransferYes: 'Sí',
    whatsappTransferNo: 'No (ir al embarcadero)',
    whatsappHotelTransfer: 'Traslado hotel',
    whatsappHotel: 'Hotel',
    whatsappAddress: 'Dirección',
    whatsappTotalPrice: 'Precio total',
    whatsappBoat: 'barco',
    whatsappTransfer: 'traslado',
    whatsappName: 'Nombre',
    whatsappEmail: 'Email',
    whatsappPhone: 'Teléfono',
    whatsappComments: 'Comentarios',
    openingWhatsapp: '¡Abriendo WhatsApp con los detalles de su reserva!',
    guestSingular: 'viajero',
    guestPlural: 'viajeros'
  },
  de: {
    forGuests: (n) => `für ${n} ${n > 1 ? 'Gäste' : 'Gast'}`,
    withTransfer: 'mit Hoteltransfer',
    withoutTransfer: 'ohne Transfer',
    fillFields: 'Bitte füllen Sie alle Pflichtfelder aus.',
    acceptTerms: 'Bitte akzeptieren Sie die Allgemeinen Geschäftsbedingungen.',
    dateLocale: 'de-DE',
    whatsappHeader: 'New Booking Request — Long Tail Boat Koh Samui',
    whatsappDate: 'Date',
    whatsappGuests: 'Guests',
    whatsappTime: 'Time',
    whatsappTransferYes: 'Yes',
    whatsappTransferNo: 'No (going to pier)',
    whatsappHotelTransfer: 'Hotel Transfer',
    whatsappHotel: 'Hotel',
    whatsappAddress: 'Address',
    whatsappTotalPrice: 'Total Price',
    whatsappBoat: 'boat',
    whatsappTransfer: 'transfer',
    whatsappName: 'Name',
    whatsappEmail: 'Email',
    whatsappPhone: 'Phone',
    whatsappComments: 'Comments',
    openingWhatsapp: 'WhatsApp wird mit Ihren Buchungsdetails geöffnet!',
    guestSingular: 'Gast',
    guestPlural: 'Gäste'
  },
  ru: {
    forGuests: (n) => {
      if (n === 1) return 'для 1 гостя';
      if (n >= 2 && n <= 4) return `для ${n} гостей`;
      return `для ${n} гостей`;
    },
    withTransfer: 'с трансфером из отеля',
    withoutTransfer: 'без трансфера',
    fillFields: 'Пожалуйста, заполните все обязательные поля.',
    acceptTerms: 'Пожалуйста, примите условия использования.',
    dateLocale: 'ru-RU',
    whatsappHeader: 'New Booking Request — Long Tail Boat Koh Samui',
    whatsappDate: 'Date',
    whatsappGuests: 'Guests',
    whatsappTime: 'Time',
    whatsappTransferYes: 'Yes',
    whatsappTransferNo: 'No (going to pier)',
    whatsappHotelTransfer: 'Hotel Transfer',
    whatsappHotel: 'Hotel',
    whatsappAddress: 'Address',
    whatsappTotalPrice: 'Total Price',
    whatsappBoat: 'boat',
    whatsappTransfer: 'transfer',
    whatsappName: 'Name',
    whatsappEmail: 'Email',
    whatsappPhone: 'Phone',
    whatsappComments: 'Comments',
    openingWhatsapp: 'Открываем WhatsApp с деталями вашего бронирования!',
    guestSingular: 'гость',
    guestPlural: 'гостей'
  },
  zh: {
    forGuests: (n) => `${n}位客人`,
    withTransfer: '含酒店接送',
    withoutTransfer: '不含接送',
    fillFields: '请填写所有必填项。',
    acceptTerms: '请同意使用条款。',
    dateLocale: 'zh-CN',
    whatsappHeader: 'New Booking Request — Long Tail Boat Koh Samui',
    whatsappDate: 'Date',
    whatsappGuests: 'Guests',
    whatsappTime: 'Time',
    whatsappTransferYes: 'Yes',
    whatsappTransferNo: 'No (going to pier)',
    whatsappHotelTransfer: 'Hotel Transfer',
    whatsappHotel: 'Hotel',
    whatsappAddress: 'Address',
    whatsappTotalPrice: 'Total Price',
    whatsappBoat: 'boat',
    whatsappTransfer: 'transfer',
    whatsappName: 'Name',
    whatsappEmail: 'Email',
    whatsappPhone: 'Phone',
    whatsappComments: 'Comments',
    openingWhatsapp: '正在打开WhatsApp，发送您的预订信息！',
    guestSingular: '位客人',
    guestPlural: '位客人'
  }
};

const t = T[LANG] || T.en;

// --- Pricing ---
const TAXI_PRICE = 1600;
const WHATSAPP_NUMBER = '33767028161';

function getBoatPrice(people) {
  if (people <= 3) return 3200;
  if (people <= 4) return 4200;
  if (people <= 7) return 5000;
  return 6000;
}

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  initBookingForm();
  initFAQ();
  initCarousel();
  initStickyBar();
});

// =====================
// BOOKING FORM
// =====================
function initBookingForm() {
  const form = document.getElementById('booking-form-el');
  if (!form) return;

  const peopleSelect = document.getElementById('people');
  const transferCheckbox = document.getElementById('transfer');
  const hotelFields = document.getElementById('hotel-fields');
  const pickupWithTransfer = document.getElementById('pickup-with-transfer');
  const pickupWithoutTransfer = document.getElementById('pickup-without-transfer');
  const priceSummary = document.getElementById('price-summary');
  const priceTotal = document.getElementById('price-total');
  const priceGuests = document.getElementById('price-guests');
  const priceTransferLine = document.getElementById('price-transfer-line');
  const dateInput = document.getElementById('date');

  // Set minimum date to today + 2 days
  if (dateInput) {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    dateInput.min = minDate.toISOString().split('T')[0];
  }

  // Update price on people change
  if (peopleSelect) {
    peopleSelect.addEventListener('change', updatePrice);
  }

  // Toggle hotel fields and pickup times based on transfer
  if (transferCheckbox) {
    transferCheckbox.addEventListener('change', () => {
      const checked = transferCheckbox.checked;
      if (hotelFields) hotelFields.classList.toggle('hidden', !checked);
      if (pickupWithTransfer) pickupWithTransfer.classList.toggle('hidden', !checked);
      if (pickupWithoutTransfer) pickupWithoutTransfer.classList.toggle('hidden', checked);

      // Make hotel fields required/not
      const hotelName = document.getElementById('hotelName');
      const hotelAddress = document.getElementById('hotelAddress');
      if (hotelName) hotelName.required = checked;
      if (hotelAddress) hotelAddress.required = checked;

      updatePrice();
    });
  }

  function updatePrice() {
    const people = parseInt(peopleSelect?.value || '2');
    const needsTransfer = transferCheckbox?.checked || false;
    const boatPrice = getBoatPrice(people);
    const totalPrice = needsTransfer ? boatPrice + TAXI_PRICE : boatPrice;

    if (priceTotal) priceTotal.textContent = `\u0E3F${totalPrice.toLocaleString()} THB`;
    if (priceGuests) {
      priceGuests.textContent = `${t.forGuests(people)} — ${needsTransfer ? t.withTransfer : t.withoutTransfer}`;
    }
    if (priceTransferLine) {
      priceTransferLine.classList.toggle('hidden', !needsTransfer);
    }

    // Update sticky bar price too
    updateStickyPrice();
  }

  // Initial price update
  updatePrice();

  // Form submission → WhatsApp
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const people = peopleSelect?.value || '2';
    const date = dateInput?.value || '';
    const needsTransfer = transferCheckbox?.checked || false;
    const boatPrice = getBoatPrice(parseInt(people));
    const totalPrice = needsTransfer ? boatPrice + TAXI_PRICE : boatPrice;

    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phoneCountry = document.getElementById('phoneCountry')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const phoneType = document.getElementById('phoneType')?.value || '';
    const hotelName = document.getElementById('hotelName')?.value || '';
    const hotelAddress = document.getElementById('hotelAddress')?.value || '';
    const comment = document.getElementById('comment')?.value || '';

    // Get the right pickup time based on transfer
    const pickupTimeSelect = needsTransfer
      ? document.getElementById('pickupTime-transfer')
      : document.getElementById('pickupTime-pier');
    const pickupTime = pickupTimeSelect?.value || '';

    // Validate required fields
    if (!date || !name || !email || !phone || !phoneType || !pickupTime) {
      showToast(t.fillFields, 'error');
      return;
    }

    if (!document.getElementById('terms')?.checked) {
      showToast(t.acceptTerms, 'error');
      return;
    }

    // Format date nicely
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString(t.dateLocale, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Build WhatsApp message
    let message = `\u{1F6A4} *${t.whatsappHeader}*\n\n`;
    message += `\u{1F4C5} *${t.whatsappDate}:* ${formattedDate}\n`;
    message += `\u{1F465} *${t.whatsappGuests}:* ${people}\n`;
    message += `\u23F0 *${t.whatsappTime}:* ${pickupTime}\n`;

    if (needsTransfer) {
      message += `\u{1F3E8} *${t.whatsappHotelTransfer}:* ${t.whatsappTransferYes}\n`;
      message += `\u{1F3E8} *${t.whatsappHotel}:* ${hotelName}\n`;
      message += `\u{1F4CD} *${t.whatsappAddress}:* ${hotelAddress}\n`;
    } else {
      message += `\u{1F3E8} *${t.whatsappHotelTransfer}:* ${t.whatsappTransferNo}\n`;
    }

    message += `\n\u{1F4B0} *${t.whatsappTotalPrice}:* \u0E3F${totalPrice.toLocaleString()} THB`;
    if (needsTransfer) {
      message += ` (${t.whatsappBoat} \u0E3F${boatPrice.toLocaleString()} + ${t.whatsappTransfer} \u0E3F${TAXI_PRICE.toLocaleString()})`;
    }
    message += `\n`;

    message += `\n\u{1F464} *${t.whatsappName}:* ${name}\n`;
    message += `\u{1F4E7} *${t.whatsappEmail}:* ${email}\n`;
    message += `\u{1F4F1} *${t.whatsappPhone}:* ${phoneCountry} ${phone} (${phoneType})\n`;

    if (comment.trim()) {
      message += `\n\u{1F4AC} *${t.whatsappComments}:* ${comment}\n`;
    }

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    showToast(t.openingWhatsapp, 'success');
  });
}

// =====================
// TOAST NOTIFICATIONS
// =====================
function showToast(message, type = 'info') {
  // Remove existing toast
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification';

  const bgColor = type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500';

  toast.innerHTML = `
    <div class="fixed top-4 right-4 z-[100] ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium max-w-sm animate-fade-in">
      ${message}
    </div>
  `;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// =====================
// FAQ ACCORDION
// =====================
function initFAQ() {
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// =====================
// IMAGE CAROUSEL
// =====================
function initCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const slides = track.querySelectorAll('.carousel-slide');
  let current = 0;
  const total = slides.length;

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Auto-advance every 5 seconds
  setInterval(() => goTo(current + 1), 5000);

  // Touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
  }, { passive: true });
}

// =====================
// STICKY PRICE BAR
// =====================
function initStickyBar() {
  const minusBtn = document.getElementById('sticky-minus');
  const plusBtn = document.getElementById('sticky-plus');
  const guestCount = document.getElementById('sticky-guest-count');
  const stickyPrice = document.getElementById('sticky-price');
  const stickyLabel = document.getElementById('sticky-guest-label');

  if (!minusBtn || !plusBtn) return;

  let guests = 2;

  function updateStickyDisplay() {
    guestCount.textContent = guests;
    stickyPrice.textContent = `\u0E3F${getBoatPrice(guests).toLocaleString()}`;
    if (stickyLabel) stickyLabel.textContent = guests === 1 ? t.guestSingular : t.guestPlural;
  }

  minusBtn.addEventListener('click', () => {
    if (guests > 1) { guests--; updateStickyDisplay(); }
  });

  plusBtn.addEventListener('click', () => {
    if (guests < 10) { guests++; updateStickyDisplay(); }
  });

  updateStickyDisplay();
}

function updateStickyPrice() {
  // Called from booking form price update to keep in sync
  // The sticky bar has its own independent guest counter
}

// =====================
// SMOOTH SCROLL
// =====================
function scrollToBooking() {
  const el = document.getElementById('booking-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
