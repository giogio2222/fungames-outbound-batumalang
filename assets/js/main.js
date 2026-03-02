/**
 * Fun Games Outbound Batu Malang – Main JavaScript
 * Author: Ahmad
 */

document.addEventListener('DOMContentLoaded', function () {

  /* ========== NAVBAR SCROLL EFFECT ========== */
  const navbar = document.getElementById('mainNavbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ========== SCROLL TO TOP ========== */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ========== AUTO TOC GENERATOR ========== */
  const tocContent = document.getElementById('tocContent');
  const tocToggle = document.getElementById('tocToggle');
  const tocIcon = document.getElementById('tocIcon');

  if (tocContent && tocToggle) {
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
      const headings = articleContent.querySelectorAll('h2, h3');
      if (headings.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'toc-list';

        headings.forEach(function (heading, idx) {
          // Auto-assign ID if not present
          if (!heading.id) {
            heading.id = 'heading-' + idx;
          }
          const li = document.createElement('li');
          li.className = heading.tagName === 'H3' ? 'toc-h3' : 'toc-h2';
          const a = document.createElement('a');
          a.href = '#' + heading.id;
          a.innerHTML = (heading.tagName === 'H2' ? '📌 ' : '▸ ') + heading.textContent;
          a.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById(heading.id);
            if (target) {
              const offset = 80;
              const top = target.getBoundingClientRect().top + window.scrollY - offset;
              window.scrollTo({ top: top, behavior: 'smooth' });
            }
          });
          li.appendChild(a);
          ul.appendChild(li);
        });
        tocContent.appendChild(ul);
      }
    }

    // Toggle TOC open/close
    let tocOpen = true;
    tocToggle.addEventListener('click', function () {
      tocOpen = !tocOpen;
      if (tocOpen) {
        tocContent.style.display = 'block';
        tocIcon.className = 'bi bi-chevron-up';
      } else {
        tocContent.style.display = 'none';
        tocIcon.className = 'bi bi-chevron-down';
      }
    });
  }

  /* ========== SHARE BUTTONS ========== */
  const currentUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  const shareWa = document.getElementById('shareWa');
  if (shareWa) {
    shareWa.href = 'https://wa.me/?text=' + pageTitle + '%20' + currentUrl;
  }

  const shareFb = document.getElementById('shareFb');
  if (shareFb) {
    shareFb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + currentUrl;
  }

  const shareTw = document.getElementById('shareTw');
  if (shareTw) {
    shareTw.href = 'https://twitter.com/intent/tweet?text=' + pageTitle + '&url=' + currentUrl;
  }

  const shareTg = document.getElementById('shareTg');
  if (shareTg) {
    shareTg.href = 'https://t.me/share/url?url=' + currentUrl + '&text=' + pageTitle;
  }

  const shareCopy = document.getElementById('shareCopy');
  if (shareCopy) {
    shareCopy.addEventListener('click', function (e) {
      e.preventDefault();
      navigator.clipboard.writeText(window.location.href).then(function () {
        const original = shareCopy.innerHTML;
        shareCopy.innerHTML = '<i class="bi bi-check2"></i> Tersalin!';
        setTimeout(function () {
          shareCopy.innerHTML = original;
        }, 2000);
      }).catch(function () {
        // Fallback for older browsers
        const el = document.createElement('input');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        shareCopy.innerHTML = '<i class="bi bi-check2"></i> Tersalin!';
        setTimeout(function () {
          shareCopy.innerHTML = '<i class="bi bi-clipboard"></i> Salin Link';
        }, 2000);
      });
    });
  }

  /* ========== WA FLOATING BUTTON PULSE ========== */
  const waFloat = document.getElementById('waFloat');
  if (waFloat) {
    // Already handled by CSS animation
  }

  /* ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ========== NAVBAR COLLAPSE ON MOBILE LINK CLICK ========== */
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navMenu');
  if (navbarCollapse) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }

  /* ========== FAQ ACCORDION ACTIVE STATE ========== */
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(function (item) {
    const btn = item.querySelector('.accordion-button');
    if (btn && !btn.classList.contains('collapsed')) {
      item.classList.add('active');
    }
    if (btn) {
      btn.addEventListener('click', function () {
        accordionItems.forEach(function (i) { i.classList.remove('active'); });
        if (!this.classList.contains('collapsed')) {
          item.classList.add('active');
        }
      });
    }
  });

  /* ========== ANIMATION ON SCROLL (Intersection Observer) ========== */
  const animateElements = document.querySelectorAll('.blog-card, .service-card, .testi-card, .related-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    animateElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

});
