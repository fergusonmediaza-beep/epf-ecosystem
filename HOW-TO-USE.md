# EPF Ecosystem — Component System
## How to Use on Every Page

---

### FILES IN THIS PACKAGE

| File | Purpose |
|------|---------|
| `epf-global.css` | Shared tokens, reset, utilities — load on EVERY page |
| `navbar.html` | Fixed top navbar — paste into every page |
| `sidebar.html` | Left sidebar (optional per page) — paste after navbar |
| `footer.html` | Site footer — paste at bottom of every page |
| `index.html` | Home page example with light theme |

---

### PAGE TEMPLATE (copy this for every new page)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title | EPF Ecosystem</title>

  <!-- 1. Global CSS (always first) -->
  <link rel="stylesheet" href="epf-global.css" />

  <!-- 2. Font Awesome (always) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

  <!-- 3. Page-specific styles go here -->
  <style>
    /* your page CSS */
  </style>
</head>

<body>
  <!-- 4. NAVBAR — paste full contents of navbar.html here -->


  <!-- 5. PAGE WRAP -->
  <div class="page-wrap">

    <!-- 6. SIDEBAR (optional — remove if not needed) -->
    <!-- paste full contents of sidebar.html here -->
    <!-- also add class "has-sidebar" to <body> if using sidebar -->

    <!-- 7. MAIN CONTENT -->
    <main class="main-content" id="main">

      <!-- If using sidebar, wrap this in: -->
      <!-- <div class="sidebar-push"> -->

        <!-- YOUR PAGE SECTIONS GO HERE -->

      <!-- </div> -->

    </main>
  </div>

  <!-- 8. FOOTER — paste full contents of footer.html here -->

  <!-- 9. Page-specific JS -->
  <script>
    // scroll reveal (copy from index.html)
  </script>
</body>
</html>
```

---

### WITH SIDEBAR — add this to `<body>` tag:

```html
<body class="has-sidebar">
```

Then wrap your `<main>` content:
```html
<main class="main-content sidebar-push" id="main">
```

---

### ACTIVE PAGE HIGHLIGHTING

Both navbar and sidebar auto-detect the current page by matching
`window.location.pathname` to `data-page` attributes.

**Filename must match the data-page value:**
- `index.html`        → `data-page="index"`
- `about.html`        → `data-page="about"`
- `how-it-works.html` → `data-page="how-it-works"`
- `solutions.html`    → `data-page="solutions"`
- `impact.html`       → `data-page="impact"`
- `investment.html`   → `data-page="investment"`
- `contact.html`      → `data-page="contact"`

---

### COLOUR VARIABLES (use these everywhere)

```css
--teal:    #00c2cb   /* Primary brand accent */
--coral:   #e63946   /* Secondary accent / CTAs */
--orange:  #f4a620   /* Tertiary accent */

/* Light theme backgrounds */
--bg-page:  #f5f7fa   /* Page background */
--bg-white: #ffffff   /* Card / section backgrounds */
--bg-muted: #edf0f5   /* Alternate section bg */

/* Text */
--tx-heading: #0d1628
--tx-body:    #374558
--tx-muted:   #7a8fa8
```

---

### SECTION BACKGROUND PATTERN (light theme)

Alternate sections to create visual rhythm:
1. `background: var(--bg-white)` — white
2. `background: var(--bg-muted)` — soft grey
3. `background: var(--bg-dark)` — dark (for CTA / hero)

---

### MOBILE BEHAVIOUR

- **Navbar**: hamburger appears at 900px, slides down a full drawer
- **Sidebar**: collapses off-screen at 1024px, opens via floating teal FAB button (bottom-right)
- **Overlay**: dark backdrop appears behind open sidebar on mobile

---

### SCROLL REVEAL

Add class `rv` to any element you want to fade up on scroll:
```html
<div class="rv">This fades in when scrolled into view</div>
```

Then include this JS on every page:
```javascript
const items = document.querySelectorAll('.rv');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.rv')];
      const i = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('in'), i * 90);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
items.forEach(el => obs.observe(el));
```
