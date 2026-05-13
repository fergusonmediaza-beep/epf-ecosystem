/* ============================================================
   EPF ECOSYSTEM — FOOTER JAVASCRIPT
   assets/js/footer.js
   ============================================================ */

function initFooterYear() {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', initFooterYear);
