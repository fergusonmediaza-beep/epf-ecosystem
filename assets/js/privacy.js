/* ============================================================
   EPF ECOSYSTEM — PRIVACY POLICY PAGE JAVASCRIPT
   assets/js/privacy.js
   ============================================================ */

/* ── LOADER ── */
function initLoader() {
  var loader = document.getElementById('epf-loader');
  if (!loader) return;

  window.addEventListener('load', function() {
    setTimeout(function() {
      loader.classList.add('hide');
    }, 2200);
  });
}

/* ── SIDEBAR ── */
function initSidebar() {
  var sidebar  = document.getElementById('epf-sidebar');
  var overlay  = document.getElementById('sb-overlay');
  var closeBtn = document.getElementById('sb-close');
  var fab      = document.getElementById('sb-fab');

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add('sb-open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('sb-open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (fab)      fab.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay)  overlay.addEventListener('click', closeSidebar);

  var page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.sb-link[data-page]').forEach(function(el) {
    if (el.dataset.page === page) el.classList.add('active');
  });
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  var elements = document.querySelectorAll('.rv');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;

      var siblings = Array.from(entry.target.parentElement.querySelectorAll('.rv'));
      var index = siblings.indexOf(entry.target);

      setTimeout(function() {
        entry.target.classList.add('in');
      }, index * 90);

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  elements.forEach(function(el) { observer.observe(el); });
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', function() {
  initLoader();
  initSidebar();
  initScrollReveal();
});
