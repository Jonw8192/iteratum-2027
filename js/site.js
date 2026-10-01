(() => {
  const revealTargets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('active'));
  }

  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 36), { passive: true });

  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  const closeMenu = () => {
    mainNav?.classList.remove('show');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    mobileToggle?.setAttribute('aria-label', 'Open navigation');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', () => {
    const isOpen = mainNav?.classList.toggle('show');
    mobileToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
    mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mainNav?.classList.contains('show')) {
      closeMenu();
      mobileToggle?.focus();
    }
  });
})();

// Resource pages can expose a print/save control without inline JavaScript.
document.querySelectorAll('[data-print-page]').forEach((button) => {
  button.addEventListener('click', () => window.print());
});
