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
  initFoodOrdering();
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

/* ══════════════════════════════════════════
   FOOD ORDERING SYSTEM
   ============================================================ */
function initFoodOrdering() {
  let cart = [];
  
  // Elements
  const cartTrigger = document.getElementById('cart-trigger');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartCount = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartDeliveryCharge = document.getElementById('cart-delivery-charge');
  const deliveryRow = document.getElementById('delivery-row');
  const cartTotal = document.getElementById('cart-total');
  
  const orderTypeSelect = document.getElementById('order-type');
  const tableGroup = document.getElementById('table-number-group');
  const tableInput = document.getElementById('table-num');
  const deliveryGroup = document.getElementById('delivery-address-group');
  const deliveryAddressInput = document.getElementById('del-address');
  
  const btnPlaceOrder = document.getElementById('btn-place-order');
  const orderLoader = document.getElementById('order-loader');
  const loaderStatus = document.getElementById('loader-status');
  
  const successModal = document.getElementById('success-modal');
  const receiptOrderId = document.getElementById('receipt-order-id');
  const receiptTime = document.getElementById('receipt-time');
  const receiptItemsList = document.getElementById('receipt-items-list');
  const receiptOrderType = document.getElementById('receipt-order-type');
  const receiptCustInfo = document.getElementById('receipt-cust-info');
  const receiptTotalPaid = document.getElementById('receipt-total-paid');
  
  const btnSuccessWa = document.getElementById('btn-success-wa');
  const btnSuccessClose = document.getElementById('btn-success-close');
  const checkoutForm = document.getElementById('checkout-form');
  
  // Image assets map
  const dishImages = {
    biriyani: 'images/dish_biriyani.jpg',
    grill: 'images/dish_grill_chicken.jpg',
    shawarma: 'images/dish_shawarma.jpg',
    mojito: 'images/dish_mojito.jpg'
  };

  // Load cart from LocalStorage
  const loadCart = () => {
    try {
      const saved = localStorage.getItem('nebula_cart');
      if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    }
  };

  // Save cart to LocalStorage
  const saveCart = () => {
    localStorage.setItem('nebula_cart', JSON.stringify(cart));
  };

  // Open Drawer
  const openDrawer = () => {
    cartDrawer.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  };

  // Close Drawer
  const closeDrawer = () => {
    cartDrawer.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  };

  // Add Item to Cart
  const addToCart = (id, name, price) => {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price: parseInt(price),
        quantity: 1,
        img: dishImages[id] || ''
      });
    }
    saveCart();
    updateCartUI();
    openDrawer();
  };

  // Quantity updates
  const changeQuantity = (id, delta) => {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart();
    updateCartUI();
  };

  // Remove Item
  const removeItem = (id) => {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
  };

  // Update Cart UI
  const updateCartUI = () => {
    // Total count calculation
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = count;
    
    // Toggle trigger visibility
    if (count > 0) {
      cartTrigger.classList.add('visible');
    } else {
      cartTrigger.classList.remove('visible');
      closeDrawer();
    }
    
    // Render list
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🍳</div>
          <p>Your cart is empty</p>
          <span class="cart-empty-sub">Choose from our signature dishes to get started!</span>
        </div>
      `;
      cartSubtotal.textContent = '₹0';
      cartTotal.textContent = '₹0';
      return;
    }
    
    let html = '';
    let subtotal = 0;
    
    cart.forEach(item => {
      const cost = item.price * item.quantity;
      subtotal += cost;
      html += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%231c1c1c%22/><text y=%2250%25%22 x=%2250%25%22 font-size=%2228%22 text-anchor=%22middle%22 dy=%22.3em%22>🍛</text></svg>'" />
          <div class="cart-item-info">
            <h5 class="cart-item-name">${item.name}</h5>
            <span class="cart-item-price">₹${item.price} × ${item.quantity}</span>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-action="minus" data-id="${item.id}">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
            <button class="cart-item-remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;
    });
    
    cartItemsContainer.innerHTML = html;
    cartSubtotal.textContent = `₹${subtotal}`;
    
    // Handles Delivery Type calculation
    const type = orderTypeSelect.value;
    let total = subtotal;
    if (type === 'delivery') {
      deliveryRow.style.display = 'flex';
      total += 30; // ₹30 delivery fee
    } else {
      deliveryRow.style.display = 'none';
    }
    cartTotal.textContent = `₹${total}`;
  };

  // Bind cart item controls click event listener dynamically
  cartItemsContainer.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');
    if (!id) return;
    
    if (e.target.classList.contains('qty-btn')) {
      const action = e.target.getAttribute('data-action');
      changeQuantity(id, action === 'plus' ? 1 : -1);
    } else if (e.target.classList.contains('cart-item-remove')) {
      removeItem(id);
    }
  });

  // Attach Order Type changes
  orderTypeSelect.addEventListener('change', () => {
    const val = orderTypeSelect.value;
    if (val === 'dinein') {
      tableGroup.style.display = 'flex';
      tableInput.setAttribute('required', 'required');
      deliveryGroup.style.display = 'none';
      deliveryAddressInput.removeAttribute('required');
    } else if (val === 'delivery') {
      tableGroup.style.display = 'none';
      tableInput.removeAttribute('required');
      deliveryGroup.style.display = 'flex';
      deliveryAddressInput.setAttribute('required', 'required');
    } else {
      tableGroup.style.display = 'none';
      tableInput.removeAttribute('required');
      deliveryGroup.style.display = 'none';
      deliveryAddressInput.removeAttribute('required');
    }
    updateCartUI();
  });

  // Bind add-to-cart-btn clicks
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');
      const price = btn.getAttribute('data-price');
      addToCart(id, name, price);
      
      // Floating visual effect
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => btn.style.transform = '', 120);
    });
  });

  // Toggle buttons
  cartTrigger.addEventListener('click', openDrawer);
  cartClose.addEventListener('click', closeDrawer);
  cartBackdrop.addEventListener('click', closeDrawer);
  
  // Checkout Order Processing Simulator
  const processCheckout = () => {
    if (cart.length === 0) return;
    
    // Run HTML Form validation
    if (!checkoutForm.reportValidity()) return;
    
    // Open loading overlay
    closeDrawer();
    orderLoader.style.display = 'flex';
    orderLoader.setAttribute('aria-hidden', 'false');
    
    const steps = [
      'Securing your culinary choices...',
      'Transmitting order to NEBULA Kitchen...',
      'Preparing your dining receipt...'
    ];
    
    let stepIndex = 0;
    loaderStatus.textContent = steps[stepIndex];
    
    const loaderInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        loaderStatus.textContent = steps[stepIndex];
      } else {
        clearInterval(loaderInterval);
        completeOrder();
      }
    }, 850);
  };

  // Complete Checkout Order
  const completeOrder = () => {
    // Generate order stats
    const orderIdVal = 'NEB-2026-' + Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    const timeVal = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ', ' + date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    // Receipt Details
    receiptOrderId.textContent = `Order ID: ${orderIdVal}`;
    receiptTime.textContent = timeVal;
    
    // Items
    let itemsHtml = '';
    cart.forEach(item => {
      itemsHtml += `
        <div class="receipt-item-row">
          <span>${item.name} × ${item.quantity}</span>
          <span>₹${item.price * item.quantity}</span>
        </div>
      `;
    });
    receiptItemsList.innerHTML = itemsHtml;
    
    // Details
    const type = orderTypeSelect.value;
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    
    let typeLabel = '';
    if (type === 'dinein') {
      typeLabel = `Dine-In (Table ${tableInput.value})`;
    } else if (type === 'takeaway') {
      typeLabel = 'Takeaway (Pre-Order)';
    } else {
      typeLabel = 'Home Delivery';
    }
    
    receiptOrderType.textContent = typeLabel;
    receiptCustInfo.textContent = `${name} · ${phone}`;
    
    // Totals
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = type === 'delivery' ? subtotal + 30 : subtotal;
    receiptTotalPaid.textContent = `₹${total}`;
    
    // Compile WhatsApp Link
    let waText = `*🌌 NEBULA Restaurant — Order Receipt*\n`;
    waText += `-------------------------------------------\n`;
    waText += `*Order ID:* ${orderIdVal}\n`;
    waText += `*Date:* ${timeVal}\n`;
    waText += `*Order Type:* ${typeLabel}\n\n`;
    waText += `*Items Ordered:*\n`;
    
    cart.forEach(item => {
      waText += `- ${item.quantity}x ${item.name} (₹${item.price * item.quantity})\n`;
    });
    
    if (type === 'delivery') {
      waText += `\n*Subtotal:* ₹${subtotal}\n`;
      waText += `*Delivery Fee:* ₹30\n`;
    }
    waText += `*Total Amount:* ₹${total}\n\n`;
    waText += `*Customer Details:*\n`;
    waText += `- Name: ${name}\n`;
    waText += `- Phone: ${phone}\n`;
    if (type === 'delivery') {
      waText += `- Address: ${deliveryAddressInput.value}\n`;
    }
    waText += `-------------------------------------------\n`;
    waText += `Thank you for choosing NEBULA!`;
    
    const waUrl = `https://wa.me/918778844002?text=${encodeURIComponent(waText)}`;
    btnSuccessWa.setAttribute('onclick', `window.open('${waUrl}', '_blank')`);
    
    // Hide loader, show Modal
    orderLoader.style.display = 'none';
    orderLoader.setAttribute('aria-hidden', 'true');
    successModal.style.display = 'flex';
    successModal.setAttribute('aria-hidden', 'false');
    
    // Reset Cart array
    cart = [];
    saveCart();
    updateCartUI();
    checkoutForm.reset();
  };

  btnPlaceOrder.addEventListener('click', processCheckout);

  btnSuccessClose.addEventListener('click', () => {
    successModal.style.display = 'none';
    successModal.setAttribute('aria-hidden', 'true');
  });

  // Run Immediately on page load
  loadCart();
}

