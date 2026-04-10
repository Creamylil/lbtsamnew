/* ===== LTB Samui - Booking & UI Logic ===== */

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
      priceGuests.textContent = `for ${people} guest${people > 1 ? 's' : ''}${needsTransfer ? ' \u2014 with hotel transfer' : ' \u2014 without transfer'}`;
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
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (!document.getElementById('terms')?.checked) {
      showToast('Please accept the terms and conditions.', 'error');
      return;
    }

    // Format date nicely
    const dateObj = new Date(date + 'T00:00:00');
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // Build WhatsApp message
    let message = `\u{1F6A4} *New Booking Request \u2014 Long Tail Boat Koh Samui*\n\n`;
    message += `\u{1F4C5} *Date:* ${formattedDate}\n`;
    message += `\u{1F465} *Guests:* ${people}\n`;
    message += `\u23F0 *Time:* ${pickupTime}\n`;

    if (needsTransfer) {
      message += `\u{1F3E8} *Hotel Transfer:* Yes\n`;
      message += `\u{1F3E8} *Hotel:* ${hotelName}\n`;
      message += `\u{1F4CD} *Address:* ${hotelAddress}\n`;
    } else {
      message += `\u{1F3E8} *Hotel Transfer:* No (going to pier)\n`;
    }

    message += `\n\u{1F4B0} *Total Price:* \u0E3F${totalPrice.toLocaleString()} THB`;
    if (needsTransfer) {
      message += ` (boat \u0E3F${boatPrice.toLocaleString()} + transfer \u0E3F${TAXI_PRICE.toLocaleString()})`;
    }
    message += `\n`;

    message += `\n\u{1F464} *Name:* ${name}\n`;
    message += `\u{1F4E7} *Email:* ${email}\n`;
    message += `\u{1F4F1} *Phone:* ${phoneCountry} ${phone} (${phoneType})\n`;

    if (comment.trim()) {
      message += `\n\u{1F4AC} *Comments:* ${comment}\n`;
    }

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    showToast('Opening WhatsApp with your booking details!', 'success');
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
    if (stickyLabel) stickyLabel.textContent = guests === 1 ? 'guest' : 'guests';
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
