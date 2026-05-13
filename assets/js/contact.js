/* ============================================================
   EPF ECOSYSTEM — CONTACT PAGE JAVASCRIPT
   assets/js/contact.js
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

/* ── INQUIRY TABS ── */
function initInquiryTabs() {
  var tabs = document.querySelectorAll('.inquiry-tab');
  var textarea = document.getElementById('contact-message');

  var placeholders = {
    partnership: 'Tell us about your organisation and how you would like to partner with the EPF Ecosystem...',
    investment:  'Tell us about your investment mandate, fund size, and what aspects of the EPF portfolio interest you most...',
    solutions:   'Tell us about the challenge you are trying to solve and which solution you would like to see demonstrated...',
    procurement: 'Tell us about your municipality or government entity, the challenge you face, and the type of solution you need...',
    general:     'Tell us about your goals, challenges, or how you would like to work with the EPF Ecosystem...'
  };

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var type = tab.dataset.type;
      if (textarea && placeholders[type]) {
        textarea.placeholder = placeholders[type];
      }
    });
  });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  emailjs.init('9FEuiw6awosAhcPRI');

  var submitBtn   = document.getElementById('form-submit-btn');
  var btnText     = document.querySelector('.form-btn-text');
  var formInner   = document.getElementById('contact-form-inner');
  var formSuccess = document.getElementById('form-success');

  if (!submitBtn) return;

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    if (btnText) btnText.textContent = isLoading ? 'Sending...' : 'Send Message';
  }

  function shakeBtn() {
    submitBtn.classList.remove('shake');
    void submitBtn.offsetWidth;
    submitBtn.classList.add('shake');
    setTimeout(function() { submitBtn.classList.remove('shake'); }, 400);
  }

  function showError(fieldId, errorId) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(errorId);
    if (field) field.classList.add('invalid');
    if (error) error.classList.add('show');
  }

  function clearError(fieldId, errorId) {
    var field = document.getElementById(fieldId);
    var error = document.getElementById(errorId);
    if (field) field.classList.remove('invalid');
    if (error) error.classList.remove('show');
  }

  function clearAllErrors() {
    var fields = formInner.querySelectorAll('.invalid');
    fields.forEach(function(f) { f.classList.remove('invalid'); });
    var errors = formInner.querySelectorAll('.form-error.show');
    errors.forEach(function(e) { e.classList.remove('show'); });
    var consentGroup = document.getElementById('consent-group');
    if (consentGroup) consentGroup.classList.remove('invalid');
  }

  /* Live clear errors on input */
  ['contact-first-name', 'contact-email', 'contact-phone', 'contact-message'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function() {
        el.classList.remove('invalid');
        var errId = 'error-' + id.replace('contact-', '');
        var errEl = document.getElementById(errId);
        if (errEl) errEl.classList.remove('show');
      });
    }
  });

  var consentBox = document.getElementById('contact-consent');
  if (consentBox) {
    consentBox.addEventListener('change', function() {
      clearError('contact-consent', 'error-consent');
      var consentGroup = document.getElementById('consent-group');
      if (consentGroup) consentGroup.classList.remove('invalid');
    });
  }

  submitBtn.addEventListener('click', function() {
    clearAllErrors();

    var firstName    = document.getElementById('contact-first-name').value.trim();
    var lastName     = document.getElementById('contact-last-name').value.trim();
    var email        = document.getElementById('contact-email').value.trim();
    var phone        = document.getElementById('contact-phone').value.trim();
    var organisation = document.getElementById('contact-organisation').value.trim();
    var role         = document.getElementById('contact-role').value;
    var message      = document.getElementById('contact-message').value.trim();
    var consent      = document.getElementById('contact-consent').checked;

    var hasError = false;
    var firstErrorField = null;

    /* First name */
    if (!firstName) {
      showError('contact-first-name', 'error-first-name');
      hasError = true;
      if (!firstErrorField) firstErrorField = document.getElementById('contact-first-name');
    }

    /* Email */
    if (!email || !emailRegex.test(email)) {
      var errEl = document.getElementById('error-email');
      if (errEl) errEl.querySelector('i').nextSibling.textContent = !email ? ' Email address is required' : ' Please enter a valid email address';
      showError('contact-email', 'error-email');
      hasError = true;
      if (!firstErrorField) firstErrorField = document.getElementById('contact-email');
    }

    /* Phone (only validate if filled in) */
    if (phone && !phoneRegex.test(phone)) {
      showError('contact-phone', 'error-phone');
      hasError = true;
      if (!firstErrorField) firstErrorField = document.getElementById('contact-phone');
    }

    /* Message */
    if (!message) {
      showError('contact-message', 'error-message');
      hasError = true;
      if (!firstErrorField) firstErrorField = document.getElementById('contact-message');
    }

    /* Consent */
    if (!consent) {
      document.getElementById('error-consent').classList.add('show');
      var consentGroup = document.getElementById('consent-group');
      if (consentGroup) consentGroup.classList.add('invalid');
      hasError = true;
      if (!firstErrorField) firstErrorField = document.getElementById('contact-consent');
    }

    if (hasError) {
      shakeBtn();
      if (firstErrorField) firstErrorField.focus();
      return;
    }

    var activeTab   = document.querySelector('.inquiry-tab.active');
    var inquiryType = activeTab ? activeTab.dataset.type : 'general';

    var templateParams = {
      from_name:    firstName + (lastName ? ' ' + lastName : ''),
      first_name:   firstName,
      last_name:    lastName,
      reply_to:     email,
      phone:        phone || 'Not provided',
      organisation: organisation || 'Not provided',
      role:         role || 'Not provided',
      message:      message,
      inquiry_type: inquiryType
    };

    setLoading(true);

    emailjs.send('service_i5h4bqn', 'template_f0837zz', templateParams)
      .then(function() {
        formInner.style.display = 'none';
        formSuccess.classList.add('show');
      })
      .catch(function() {
        setLoading(false);
        shakeBtn();
      });
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
  initInquiryTabs();
  initContactForm();
  initScrollReveal();
});
