const messages = {
  umum: 'Halo AIPRENEUR, saya ingin berkonsultasi tentang kebutuhan AI untuk bisnis saya.',
  audit: 'Halo AIPRENEUR, saya ingin mendiskusikan hambatan kerja di bisnis saya dan mengetahui langkah AI yang tepat.',
  automation: 'Halo AIPRENEUR, saya ingin membahas AI automation atau AI agent untuk bisnis saya.',
  software: 'Halo AIPRENEUR, saya ingin membahas custom software atau dashboard untuk bisnis saya.',
  training: 'Halo AIPRENEUR, saya ingin membahas Corporate Training AI untuk tim saya.',
  marketing: 'Halo AIPRENEUR, saya ingin membahas AI Marketing dan Growth Lab untuk bisnis saya.',
  academy: 'Halo AIPRENEUR, saya ingin tahu lebih lanjut tentang AIPRENEUR Academy.'
};

document.querySelectorAll('.wa-link[data-wa]').forEach(link => {
  const message = messages[link.dataset.wa] || messages.umum;
  link.href = `https://wa.me/6285169064129?text=${encodeURIComponent(message)}`;
});

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Buka menu');
  mobileNav.classList.remove('open');
  mobileNav.inert = true;
}

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Tutup menu' : 'Buka menu');
  mobileNav.classList.toggle('open', opening);
  mobileNav.inert = !opening;
});

mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!header.contains(event.target) && menuButton.getAttribute('aria-expanded') === 'true') closeMenu();
});
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 14); }
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 30px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('visible'));
}

if ('IntersectionObserver' in window) {
  const navLinks = document.querySelectorAll('.desktop-nav a');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));
}

document.getElementById('year').textContent = new Date().getFullYear();
