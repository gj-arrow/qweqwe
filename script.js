/* ============================================
   NADI STUDIO — JAVASCRIPT
   ============================================ */

// --- DIKIDI WIDGET (PLACEHOLDER) ---
// TODO: подключить Dikidi widget
// Когда будет API-ключ, заменить заглушку на:
// Dikidi.loadWidget({ clientId: 'XXX', shopId: 'YYY' });

let bookingWidgetInitialized = false;

function openBookingWidget() {
  // TODO: заменить на реальное открытие виджета Dikidi
  // Пример:
  // if (window.Dikidi && window.Dikidi.openWidget) {
  //   window.Dikidi.openWidget();
  // }

  // Показываем модальное окно-заглушку
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Отправка события аналитики
  if (typeof gtag !== 'undefined') {
    gtag('event', 'widget_open', {
      event_category: 'booking',
      event_label: 'dikidi_placeholder'
    });
  }
  if (typeof ym !== 'undefined') {
    ym(XXXXXX, 'reachGoal', 'widget_open');
  }
}

function closeBookingWidget() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// --- MODAL ---
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

modalClose.addEventListener('click', closeBookingWidget);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeBookingWidget();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingWidget();
    closeMobileMenu();
  }
});

// --- STICKY HEADER ---
const header = document.getElementById('header');
let lastScrollY = 0;

function handleScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScrollY = scrollY;
}

window.addEventListener('scroll', handleScroll, { passive: true });

// --- MOBILE MENU ---
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

function closeMobileMenu() {
  burger.classList.remove('active');
  nav.classList.remove('open');
}

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.header__link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// --- SCROLL REVEAL ANIMATION ---
const revealElements = document.querySelectorAll('.service-card, .review-card, .gallery__item, .contacts__item, .about__text, .about__image, .masters__placeholder');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// --- REVIEWS CAROUSEL ---
let reviewIndex = 0;
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewCards = reviewsTrack ? reviewsTrack.querySelectorAll('.review-card') : [];
const totalReviews = reviewCards.length;

function slideReviews(direction) {
  reviewIndex += direction;

  if (reviewIndex < 0) {
    reviewIndex = totalReviews - 1;
  } else if (reviewIndex >= totalReviews) {
    reviewIndex = 0;
  }

  if (reviewsTrack) {
    reviewsTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
  }
}

// Auto-slide every 5 seconds
let autoSlide = setInterval(() => slideReviews(1), 5000);

// Pause on hover
const reviewsCarousel = document.getElementById('reviewsCarousel');
if (reviewsCarousel) {
  reviewsCarousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
  reviewsCarousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => slideReviews(1), 5000);
  });
}

// --- BOOKING FORM ---
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;

    if (!name || !phone || !service) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // TODO: подключить отправку данных на сервер
    // Пример:
    // fetch('/api/booking', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, phone, service })
    // });

    alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами для подтверждения записи.`);
    bookingForm.reset();

    // Событие аналитики
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        event_category: 'booking',
        event_label: service
      });
    }
    if (typeof ym !== 'undefined') {
      ym(XXXXXX, 'reachGoal', 'form_submit');
    }
  });
}

// --- PHONE MASK ---
const phoneInput = document.getElementById('phone');

if (phoneInput) {
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length === 0) {
      e.target.value = '';
      return;
    }

    // Если начинается с 375 — убираем 375 и добавляем +375
    if (value.startsWith('375')) {
      value = value.substring(3);
    }
    if (value.startsWith('8')) {
      value = value.substring(1);
    }

    let formatted = '+375';
    if (value.length > 0) formatted += ' (' + value.substring(0, 2);
    if (value.length >= 2) formatted += ') ' + value.substring(2, 5);
    if (value.length >= 5) formatted += '-' + value.substring(5, 7);
    if (value.length >= 7) formatted += '-' + value.substring(7, 9);

    e.target.value = formatted;
  });

  phoneInput.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' && e.target.value.length <= 4) {
      e.target.value = '';
      e.preventDefault();
    }
  });

  phoneInput.addEventListener('focus', function() {
    if (!this.value) this.value = '+375';
  });

  phoneInput.addEventListener('blur', function() {
    if (this.value === '+375') this.value = '';
  });
}

// --- ACTIVE NAV LINK ON SCROLL ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header__link');

function highlightNav() {
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });

// --- TOUCH SWIPE FOR REVIEWS ---
let touchStartX = 0;
let touchEndX = 0;

if (reviewsCarousel) {
  reviewsCarousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  reviewsCarousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        slideReviews(1);
      } else {
        slideReviews(-1);
      }
    }
  }, { passive: true });
}
