const navbar = document.querySelector('.navbar');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

const updateNavbar = () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 24);
};

updateNavbar();
window.addEventListener('scroll', updateNavbar, { passive: true });

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const year = document.querySelector('[data-current-year]');
if (year) year.textContent = new Date().getFullYear();
