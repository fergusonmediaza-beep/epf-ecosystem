/* ============================================================
   EPF ECOSYSTEM — NAVBAR JAVASCRIPT
   assets/js/navbar.js
   ============================================================ */

function initNavbar() {
  var hamburger = document.getElementById('nav-hamburger');
  var mobileNav = document.getElementById('nav-mobile');
  var nav       = document.getElementById('epf-nav');

  if (!hamburger || !mobileNav || !nav) return;

  function closeMenu() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openMenu() {
    mobileNav.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', function() {
    if (mobileNav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileNav.querySelectorAll('.mob-link').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', function(e) {
    if (!nav.contains(e.target) && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  var page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('[data-page]').forEach(function(el) {
    if (el.dataset.page === page) el.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', initNavbar);