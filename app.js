/* ============================================================
   NEBULA (நெபுலா) — Premium Family Restaurant
   Complete JavaScript — Interactions, Animations & Behaviour
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initPageEntrance();
  initNavbar();
  initMobileNav();
  initScrollReveal();
  initFAQ();
  initScrollSpy();
  initHeroParallax();
  initSmoothScroll();
  initStoreStatus();
  initButtonRipple();
  initGalleryHover();
});

/* ══════════════════════════════════════════
   PAGE ENTRANCE
════════════════════════════════════════════ */
function initPageEntrance() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    });
  });
}

/* ══════════════════════════════════════════
   NAVBAR — Transparent → Solid on scroll
════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  const updateNav = () => {
    if (window.scrollY > 60) {
      navbar.classList.remove('transparent');
      navbar.classList.add('solid');
    } else {
      navbar.classList.remove('solid');
      navbar.classList.add('transparent');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Run immediately
  updateNav();
}

/* ══════════════════════════════════════════
   MOBILE NAVIGATION
════════════════════════════════════════════ */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  let isOpen = false;

  const openNav = () => {
    isOpen = true;
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    isOpen = false;
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    isOpen ? closeNav() : openNav();
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeNav();
  });

  document.addEventListener('click', e => {
    if (isOpen && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      closeNav();
    }
  });
}

/* ══════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = [...(entry.target.parentElement?.children || [])].filter(
            el => el.classList.contains('reveal') ||
                  el.classList.contains('reveal-left') ||
                  el.classList.contains('reveal-right') ||
                  el.classList.contains('reveal-scale')
          );
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx * 90, 450);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  els.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════
   FAQ ACCORDION
════════════════════════════════════════════ */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(fi => {
        fi.classList.remove('open');
        const q = fi.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        setTimeout(() => {
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
    });
  });
}

/* ══════════════════════════════════════════
   SCROLL SPY — Active nav links
════════════════════════════════════════════ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-70px 0px -70px 0px' }
  );

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════════
   HERO PARALLAX
════════════════════════════════════════════ */
function initHeroParallax() {
  // Only on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const heroBokeh = document.querySelectorAll('.bokeh-dot');
  if (!heroBokeh.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        heroBokeh.forEach((dot, i) => {
          const rate = 0.1 + i * 0.05;
          dot.style.transform = `translateY(${scrolled * rate}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ══════════════════════════════════════════
   SMOOTH SCROLL
════════════════════════════════════════════ */
function initSmoothScroll() {
  const navH = 72;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ══════════════════════════════════════════
   LIVE STORE STATUS
════════════════════════════════════════════ */
function initStoreStatus() {
  const hoursEl = document.getElementById('hours-display');
  if (!hoursEl) return;

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 5.5 * 3600000);
  const totalMins = ist.getHours() * 60 + ist.getMinutes();

  // Open: 0:00 → 22:30 (10:30 PM)
  const isOpen = totalMins < 22 * 60 + 30;

  const badge = document.createElement('span');
  badge.style.cssText = `
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-ui);
    font-size: .72rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 999px;
    margin-left: 10px;
    background: ${isOpen ? 'rgba(34,197,94,.12)' : 'rgba(239,68,68,.12)'};
    color: ${isOpen ? '#16a34a' : '#dc2626'};
    vertical-align: middle;
  `;
  badge.innerHTML = `<span style="width:6px;height:6px;background:${isOpen ? '#22c55e' : '#ef4444'};border-radius:50%;display:inline-block;${isOpen ? 'animation:pulse 2s infinite' : ''}"></span>${isOpen ? 'Open Now' : 'Closed'}`;

  // Append to the value div
  const valueDiv = hoursEl;
  valueDiv.appendChild(badge);

  // Add pulse keyframe if not already
  if (!document.getElementById('pulse-kf')) {
    const style = document.createElement('style');
    style.id = 'pulse-kf';
    style.textContent = `@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.5)} }`;
    document.head.appendChild(style);
  }
}

/* ══════════════════════════════════════════
   BUTTON RIPPLE
════════════════════════════════════════════ */
function initButtonRipple() {
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `@keyframes nebRipple { to { width:220px;height:220px;opacity:0; } }`;
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; left:${x}px; top:${y}px;
        width:0; height:0;
        background:rgba(255,255,255,0.25);
        border-radius:50%;
        transform:translate(-50%,-50%);
        animation:nebRipple 0.55s linear;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ══════════════════════════════════════════
   GALLERY ITEMS — open Instagram on click
════════════════════════════════════════════ */
function initGalleryHover() {
  document.querySelectorAll('.gal-item').forEach(item => {
    item.addEventListener('click', () => {
      // In a real implementation, this would open a lightbox or Instagram
      // For now, it triggers a WhatsApp conversation
      window.open('https://wa.me/918778844002?text=Hi NEBULA! I saw your food gallery and I am interested in visiting.', '_blank', 'noopener,noreferrer');
    });
  });
}

/* ══════════════════════════════════════════
   DISH CARDS — keyboard accessibility
════════════════════════════════════════════ */
document.querySelectorAll('.dish-card').forEach(card => {
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const link = card.querySelector('a');
      if (link) link.click();
    }
  });
});

/* ══════════════════════════════════════════
   STAT COUNTERS — animate on scroll
════════════════════════════════════════════ */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (!statNums.length) return;

  const animated = new Set();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated.has(entry.target)) {
        animated.add(entry.target);
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const start = performance.now();

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;
          el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════
   ANNOUNCEMENT BAR — pause on hover
════════════════════════════════════════════ */
const annMarquee = document.querySelector('.ann-marquee');
if (annMarquee) {
  annMarquee.parentElement.addEventListener('mouseenter', () => {
    annMarquee.style.animationPlayState = 'paused';
  });
  annMarquee.parentElement.addEventListener('mouseleave', () => {
    annMarquee.style.animationPlayState = 'running';
  });
}

/* ══════════════════════════════════════════
   TESTIMONIALS TRACK — pause on hover / visibility
════════════════════════════════════════════ */
const testiTrack = document.querySelector('.testi-track');
if (testiTrack) {
  document.addEventListener('visibilitychange', () => {
    testiTrack.style.animationPlayState = document.hidden ? 'paused' : 'running';
  });
}

/* ══════════════════════════════════════════
   HERO FLOAT CARD — hover pause
════════════════════════════════════════════ */
const heroFloat = document.querySelector('.hero-float');
if (heroFloat) {
  heroFloat.addEventListener('mouseenter', () => heroFloat.style.animationPlayState = 'paused');
  heroFloat.addEventListener('mouseleave', () => heroFloat.style.animationPlayState = 'running');
}

/* ══════════════════════════════════════════
   SERVICE CARDS — icon color on hover
════════════════════════════════════════════ */
document.querySelectorAll('.svc-card').forEach(card => {
  const icon = card.querySelector('.svc-card-icon');
  card.addEventListener('mouseenter', () => {
    if (icon) icon.style.fontSize = '2.3rem';
  });
  card.addEventListener('mouseleave', () => {
    if (icon) icon.style.fontSize = '2rem';
  });
});

console.log('%c NEBULA 🌌 ', 'background:#c9a84c;color:#0a0a0a;font-size:14px;font-weight:bold;padding:4px 12px;border-radius:4px;');
console.log('%c Where Flavor Meets Experience · Puliampatti ', 'color:#c9a84c;font-size:11px;');
