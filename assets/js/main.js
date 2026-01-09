// Mobile Navigation Toggle
(function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });
  }
})();

// Smooth Scroll for Navigation Links
(function() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.top-nav').offsetHeight;
          const targetPosition = target.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
})();

// Set Copyright Year
(function() {
  const copyrightYear = document.getElementById('copyrightYear');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
})();

// Viber Link Fallback
(function() {
  const viberLinks = document.querySelectorAll('[href^="viber://"]');
  
  viberLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Try to open Viber, but if it fails after a short delay, fallback to tel:
      const fallbackTimer = setTimeout(() => {
        // If still on page, Viber likely didn't open
        if (document.hasFocus()) {
          // Fallback to tel: link
          const phoneNumber = '+359887079976';
          window.location.href = 'tel:' + phoneNumber;
        }
      }, 500);
      
      // Clear timer if page loses focus (Viber opened)
      window.addEventListener('blur', () => {
        clearTimeout(fallbackTimer);
      }, { once: true });
    });
  });
})();

// Lazy loading support (native lazy loading is handled by HTML, but we can add intersection observer for older browsers)
(function() {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    return;
  }
  
  // Fallback for older browsers
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback: load all images immediately
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
})();
