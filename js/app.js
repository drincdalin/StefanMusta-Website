/* ═══════════════════════════════════════
   Concursul „Ștefan Musta" — JavaScript
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile menu ───
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link tap
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Scroll fade-in ───
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 70);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    faders.forEach(el => obs.observe(el));
  } else {
    faders.forEach(el => el.classList.add('visible'));
  }

  // ─── Smooth anchor scroll ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

});

// ─── Lightbox for school photos ───
(function () {
  // Build overlay DOM once
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-inner">
      <img src="" alt="" id="lightboxImg">
    </div>
    <button class="lightbox-close" id="lightboxClose" aria-label="Închide">✕</button>
    <div class="lightbox-caption" id="lightboxCaption"></div>
  `;
  document.body.appendChild(overlay);

  const lbImg     = overlay.querySelector('#lightboxImg');
  const lbCaption = overlay.querySelector('#lightboxCaption');
  const lbClose   = overlay.querySelector('#lightboxClose');

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lbCaption.textContent = alt || '';
    lbCaption.style.display = alt ? 'block' : 'none';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    // Clear src after transition to avoid flash on re-open
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  // Attach click to all current & future .school-photo-slot img
  function bindSlots() {
    document.querySelectorAll('.school-photo-slot img').forEach(img => {
      if (img.dataset.lightboxBound) return;
      img.dataset.lightboxBound = '1';
      img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });
  }

  document.addEventListener('DOMContentLoaded', bindSlots);
  // Also bind immediately in case DOM is already ready
  if (document.readyState !== 'loading') bindSlots();

  // Close handlers
  lbClose.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
})();

// ─── Archive Accordion (Year Cards) ───
function toggleYear(header) {
  // Finds the parent element with the class 'year-card'
  const card = header.closest('.year-card');
  
  if (!card) return;

  // Toggle between 'closed' and 'open' classes
  if (card.classList.contains('closed')) {
    card.classList.remove('closed');
    card.classList.add('open');
  } else {
    card.classList.remove('open');
    card.classList.add('closed');
  }
}