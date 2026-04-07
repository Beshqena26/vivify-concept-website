// ============================================
// VIVIFY CONCEPT - Animations & Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Animated Background Gradients ---
  const bgGradients = document.createElement('div');
  bgGradients.className = 'bg-gradients';
  bgGradients.innerHTML = '<div class="bg-blob bg-blob-1"></div><div class="bg-blob bg-blob-2"></div><div class="bg-blob bg-blob-3"></div><div class="bg-blob bg-blob-4"></div>';
  document.body.prepend(bgGradients);

  // --- Mobile Nav ---
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      })
    );

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('active');
      }
    });
  }

  // --- Navbar Scroll ---
  const nav = document.querySelector('.navbar');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    });
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  // --- Scroll Reveal Animations ---
  const animEls = document.querySelectorAll('.anim, .anim-scale, .anim-left, .anim-right');

  if (animEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    animEls.forEach(el => observer.observe(el));
  }

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;

    q.addEventListener('click', () => {
      const open = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        const oa = other.querySelector('.faq-a');
        if (oa) oa.style.maxHeight = null;
      });

      if (!open) {
        item.classList.add('active');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // --- Portfolio Filters ---
  const portItems = document.querySelectorAll('.portfolio-grid .port-item');
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portItems.forEach(item => {
        const cats = (item.dataset.cat || '').split(' ');
        if (filter === 'all' || cats.includes(filter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Contact Form ---
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const txt = btn.innerHTML;
      btn.innerHTML = 'გაგზავნილია! &#10003;';
      btn.style.background = '#10b981';
      btn.style.borderColor = '#10b981';
      setTimeout(() => {
        btn.innerHTML = txt;
        btn.style.background = '';
        btn.style.borderColor = '';
        form.reset();
      }, 3000);
    });
  }

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Counter Animation ---
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  const counters = document.querySelectorAll('.stat-num, .metric .num');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/^([\d.]+)/);
        if (!match) return;

        const target = parseFloat(match[1]);
        const suffix = text.replace(match[1], '');
        const isDecimal = text.includes('.');
        const duration = 2000;
        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = easeOutQuart(progress);
          const current = eased * target;
          el.innerHTML = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach(c => countObserver.observe(c));
  }

  // --- Parallax-like effect on hero ---
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll < window.innerHeight) {
        hero.style.setProperty('--scroll', scroll * 0.3 + 'px');
      }
    });
  }

  // --- Back to Top Button ---
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '&uarr;';
  backToTop.setAttribute('aria-label', 'Back to top');
  Object.assign(backToTop.style, {
    position: 'fixed',
    bottom: '28px',
    right: '28px',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: '#327FFC',
    color: '#fff',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    zIndex: '999',
    opacity: '0',
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(50,127,252,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });

  // --- Active nav link based on current page ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
      link.classList.add('active');
    }
  });

  // --- Custom Cursor (desktop only) ---
  if (window.matchMedia('(hover: hover)').matches) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .svc-card, .price-card, .blog-card, .port-item, .svc-nav-card, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
  }

  // --- Counter Pop Animation ---
  document.querySelectorAll('.stat-num').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('counted'), 2100);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
  });

  // --- Stagger Children Animation ---
  document.querySelectorAll('.stagger-children').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
  });

  // --- Card Tilt + Glow Effect (desktop only) ---
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.svc-card, .svc-nav-card, .price-card, .blog-card, .testi-card, .val-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        card.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
        card.style.background = `radial-gradient(circle at ${px}px ${py}px, rgba(50,127,252,0.06), transparent 60%), var(--white)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.background = '';
      });
    });
  }

  // --- Typewriter Effect on Hero ---
  const heroP = document.querySelector('.hero-inner > p');
  if (heroP) {
    const fullText = heroP.textContent;
    heroP.textContent = '';
    heroP.style.borderRight = '2px solid var(--blue)';
    let i = 0;
    function typeWriter() {
      if (i < fullText.length) {
        heroP.textContent += fullText.charAt(i);
        i++;
        setTimeout(typeWriter, 25);
      } else {
        heroP.style.borderRight = 'none';
      }
    }
    setTimeout(typeWriter, 800);
  }

  // --- Parallax Scroll on Background Images ---
  if (window.innerWidth > 768) {
    const parallaxEls = document.querySelectorAll('.stats-bar[style*="background-image"], .case-hero');
    if (parallaxEls.length) {
      window.addEventListener('scroll', () => {
        parallaxEls.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.3;
            const yPos = -(rect.top * speed);
            el.style.backgroundPositionY = yPos + 'px';
          }
        });
      });
    }
  }

  // --- Decorative Graphic Elements ---
  const decorSections = document.querySelectorAll('.section-head');
  decorSections.forEach((head, i) => {
    const shapes = document.createElement('div');
    shapes.className = 'decor-shapes';
    shapes.innerHTML = i % 2 === 0
      ? '<svg class="decor-shape decor-circle" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><svg class="decor-shape decor-cross" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
      : '<svg class="decor-shape decor-dots" viewBox="0 0 40 40"><circle cx="8" cy="8" r="3" fill="currentColor"/><circle cx="20" cy="8" r="3" fill="currentColor"/><circle cx="32" cy="8" r="3" fill="currentColor"/></svg><svg class="decor-shape decor-triangle" viewBox="0 0 30 30"><path d="M15 5L28 25H2Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
    head.style.position = 'relative';
    head.appendChild(shapes);
  });

});
