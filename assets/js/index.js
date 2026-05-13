/* ============================================================
   EPF ECOSYSTEM — INDEX PAGE JAVASCRIPT
   assets/js/index.js
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
  var sidebar = document.getElementById('epf-sidebar');
  var overlay = document.getElementById('sb-overlay');
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

/* ── VIDEO CROSSFADE ── */
function initVideoCrossfade() {
  var v1 = document.getElementById('hero-vid-1');
  var v2 = document.getElementById('hero-vid-2');

  if (!v1 || !v2) return;

  var FADE_START = 1.5;
  var fading = false;

  function crossfade(fromVideo, toVideo) {
    if (fading) return;
    fading = true;
    toVideo.currentTime = 0;
    toVideo.play();

    var opacity = 0;
    var interval = setInterval(function() {
      opacity = Math.min(1, opacity + 0.05);
      toVideo.style.opacity   = opacity;
      fromVideo.style.opacity = 1 - opacity;

      if (opacity >= 1) {
        clearInterval(interval);
        fromVideo.pause();
        fromVideo.currentTime = 0;
        fading = false;
      }
    }, 50);
  }

  function checkVideoTime(activeVideo, standbyVideo) {
    if (activeVideo.duration && activeVideo.currentTime >= activeVideo.duration - FADE_START) {
      crossfade(activeVideo, standbyVideo);
    }
  }

  v1.addEventListener('timeupdate', function() { checkVideoTime(v1, v2); });
  v2.addEventListener('timeupdate', function() { checkVideoTime(v2, v1); });
}

/* ── PARTNER CAROUSEL ── */
function initCarousel() {
  var track    = document.getElementById('carousel-track');
  var dotsEl   = document.getElementById('carousel-dots');
  var prevBtn  = document.getElementById('c-prev');
  var nextBtn  = document.getElementById('c-next');

  if (!track) return;

  var cards       = track.querySelectorAll('.partner-card');
  var totalCards  = cards.length;
  var current     = 0;
  var autoTimer   = null;
  var isPaused    = false;
  var startX      = 0;

  function getVisibleCount() {
    var w = track.parentElement.offsetWidth;
    if (w < 480)  return 2;
    if (w < 768)  return 3;
    if (w < 1024) return 4;
    return 5;
  }

  function getCardWidth() {
    return cards[0] ? cards[0].offsetWidth + 20 : 220;
  }

  function getMaxSlide() {
    return Math.max(0, totalCards - getVisibleCount());
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    var pageCount = getMaxSlide() + 1;

    for (var i = 0; i < pageCount; i++) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', (function(index) {
        return function() {
          goToSlide(index);
          resetAutoplay();
        };
      })(i));
      dotsEl.appendChild(dot);
    }
  }

  function goToSlide(n) {
    if (n > getMaxSlide()) n = 0;
    if (n < 0) n = getMaxSlide();
    current = n;
    track.style.transform = 'translateX(-' + (current * getCardWidth()) + 'px)';
    buildDots();
  }

  function startAutoplay() {
    autoTimer = setInterval(function() {
      if (!isPaused) goToSlide(current + 1);
    }, 3000);
  }

  function resetAutoplay() {
    clearInterval(autoTimer);
    startAutoplay();
  }

  prevBtn.addEventListener('click', function() { goToSlide(current - 1); resetAutoplay(); });
  nextBtn.addEventListener('click', function() { goToSlide(current + 1); resetAutoplay(); });

  track.addEventListener('mouseenter', function() { isPaused = true; });
  track.addEventListener('mouseleave', function() { isPaused = false; });

  track.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isPaused = true;
  }, { passive: true });

  track.addEventListener('touchend', function(e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goToSlide(diff > 0 ? current + 1 : current - 1);
    isPaused = false;
    resetAutoplay();
  });

  window.addEventListener('resize', function() {
    goToSlide(Math.min(current, getMaxSlide()));
  });

  buildDots();
  startAutoplay();
}

/* ── COUNTDOWN TIMER ── */
function initCountdown() {
  var cdDays  = document.getElementById('cd_days');
  var cdHours = document.getElementById('cd_hours');
  var cdMins  = document.getElementById('cd_mins');
  var cdSecs  = document.getElementById('cd_secs');

  if (!cdDays) return;

  var target = new Date('December 31, 2026 23:59:59').getTime();

  function padNum(n, width) {
    var str = String(n);
    while (str.length < width) { str = '0' + str; }
    return str;
  }

  function tickCountdown() {
    var now  = new Date().getTime();
    var diff = target - now;

    if (diff <= 0) {
      cdDays.textContent  = '000';
      cdHours.textContent = '00';
      cdMins.textContent  = '00';
      cdSecs.textContent  = '00';
      return;
    }

    cdDays.textContent  = padNum(Math.floor(diff / (1000 * 60 * 60 * 24)), 3);
    cdHours.textContent = padNum(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 2);
    cdMins.textContent  = padNum(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)), 2);
    cdSecs.textContent  = padNum(Math.floor((diff % (1000 * 60)) / 1000), 2);
  }

  tickCountdown();
  setInterval(tickCountdown, 1000);
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
  initVideoCrossfade();
  initCarousel();
  initCountdown();
  initScrollReveal();
});