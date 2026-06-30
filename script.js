// Hero slideshow
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let heroIndex = 0;
let heroTimer;

function showHeroSlide(i) {
  heroSlides.forEach(s => s.classList.remove('is-active'));
  heroDots.forEach(d => d.classList.remove('is-active'));
  heroSlides[i].classList.add('is-active');
  heroDots[i].classList.add('is-active');
  heroIndex = i;
}

function startHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    showHeroSlide((heroIndex + 1) % heroSlides.length);
  }, 5000);
}

heroDots.forEach(dot => {
  dot.addEventListener('click', () => {
    showHeroSlide(parseInt(dot.dataset.slide, 10));
    startHeroTimer();
  });
});

if (heroSlides.length) startHeroTimer();
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  burger.classList.toggle('is-open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-triggered fade-up reveals
const revealEls = document.querySelectorAll('.fade-up');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// Waitlist form submission (placeholder — wire up to your backend/email service)
const waitlistForm = document.getElementById('waitlistForm');
const waitlistSuccess = document.getElementById('waitlistSuccess');

waitlistForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: connect this to an email service (e.g. Formspree, Netlify Forms) or your own backend.
  waitlistForm.style.display = 'none';
  waitlistSuccess.classList.add('is-visible');
  waitlistSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});