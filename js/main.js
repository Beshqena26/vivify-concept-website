// ============================================
// VIVIFY CONCEPT - Animations & Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav ---
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
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
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
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

  // --- Partners Marquee (seamless loop) ---
  const track = document.querySelector('.partners-track');
  if (track) {
    const logos = track.querySelectorAll('.partner-logo');
    const half = logos.length / 2;

    function startMarquee() {
      let totalWidth = 0;
      const gap = 60;
      for (let i = 0; i < half; i++) {
        totalWidth += logos[i].offsetWidth + gap;
      }
      if (totalWidth <= 0) return;
      const style = document.createElement('style');
      style.textContent = `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
      `;
      document.head.appendChild(style);
      track.style.animation = `marquee ${half * 3}s linear infinite`;
    }

    // Wait for all logo images to load
    let loaded = 0;
    logos.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded >= logos.length) startMarquee();
        });
      }
    });
    if (loaded >= logos.length) startMarquee();
  }

  // --- Active nav link based on current page ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\.\.\//, '').replace(/^\.\//, ''))) {
      link.classList.add('active');
    }
  });

});
