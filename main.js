/* ================================================
   ANOTHER LEVEL AGENCY — Shared JS
   ================================================ */

// Page fade-in
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Nav scroll state
const nav = document.querySelector('.nav');
const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 16);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Active nav link
const currentFile = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentFile || (!currentFile && href === 'index.html')) {
    a.classList.add('active');
  }
});

// Mobile menu
const toggle  = document.querySelector('.nav__toggle');
const mobileNav = document.querySelector('.mobile-nav');
let open = false;

const setMenu = (state) => {
  open = state;
  mobileNav?.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  const [s1, s2, s3] = toggle?.querySelectorAll('span') ?? [];
  if (s1) s1.style.transform = open ? 'rotate(45deg) translate(3.5px, 4.5px)' : '';
  if (s2) s2.style.opacity = open ? '0' : '';
  if (s3) s3.style.transform = open ? 'rotate(-45deg) translate(3.5px, -4.5px)' : '';
};

toggle?.addEventListener('click', () => setMenu(!open));
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Animated counters
const animateCounter = (el) => {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix   ?? '';
  const prefix   = el.dataset.prefix   ?? '';
  const decimals = parseInt(el.dataset.decimals ?? '0');
  const duration = 1800;
  const start    = performance.now();

  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Portfolio filter
const filterBtns = document.querySelectorAll('[data-filter]');
const portfolioCards = document.querySelectorAll('[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.display = show ? '' : 'none';
      if (show) {
        card.style.animation = 'fadeUp 0.5s var(--ease-expo) forwards';
      }
    });
  });
});

// Smooth parallax on hero (subtle)
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    const heroContent = hero.querySelector('.hero__content');
    if (heroContent && offset < window.innerHeight) {
      heroContent.style.transform = `translateY(${offset * 0.18}px)`;
      heroContent.style.opacity = `${1 - offset / (window.innerHeight * 0.8)}`;
    }
  }, { passive: true });
}

// Contact form submit
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#2D6A4F';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// Stagger children on reveal
document.querySelectorAll('.stagger-children').forEach(parent => {
  const children = parent.children;
  Array.from(children).forEach((child, i) => {
    child.classList.add('reveal');
    child.style.transitionDelay = `${i * 0.08}s`;
  });
  revealObserver.observe(parent);
});

// @keyframes for filter animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
