/* =============================================
   HASIRIA MARKETING SDN BHD
   Main JavaScript — v2.0
   ============================================= */

(function() {
  'use strict';

  // ---- PRELOADER ----
  window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function() {
        preloader.classList.add('hidden');
        // Trigger hero reveals after preloader
        document.querySelectorAll('.hero .reveal').forEach(function(el, i) {
          setTimeout(function() { el.classList.add('visible'); }, i * 150);
        });
      }, 1400);
    }
  });

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  // ---- REVEAL ON SCROLL ----
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function(el) { observer.observe(el); });
  }
  initReveal();

  // ---- COUNTER ANIMATION ----
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target') || el.textContent) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.stat-num[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(el) { observer.observe(el); });
  }
  initCounters();

  // ---- PRODUCT TABS ----
  function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.product-tab');
    if (!tabBtns.length) return;

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const target = btn.getAttribute('data-tab');

        // Update buttons
        tabBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Update panels
        tabPanels.forEach(function(panel) {
          panel.classList.remove('active');
          if (panel.id === 'tab-' + target) {
            panel.classList.add('active');
          }
        });
      });
    });
  }
  initTabs();

  // ---- CONTACT FORM ----
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function() {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = '#2d7a3a';

        setTimeout(function() {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }, 1000);
    });
  }
  initContactForm();

  // ---- SMOOTH ACTIVE NAV ----
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinksAll.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navLinksAll.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(function(s) { observer.observe(s); });
  }
  initActiveNav();

  // ---- MARKET CARD HOVER EFFECT ----
  document.querySelectorAll('.market-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      const img = card.querySelector('img');
      if (img) img.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', function() {
      const img = card.querySelector('img');
      if (img) img.style.transform = 'scale(1)';
    });
  });

})();
