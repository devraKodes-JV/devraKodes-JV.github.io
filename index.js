(function() {
  'use strict';

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const copyButtons = document.querySelectorAll('.btn-copy');
  const contactForm = document.getElementById('contactForm');
  const sections = document.querySelectorAll('.section, .hero');

  // Toggle menú móvil
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // Smooth scroll con offset para navbar fija
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = 70;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Highlight del enlace activo según scroll
  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (id && scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // Copiar dirección crypto
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const address = button.getAttribute('data-clipboard');
      try {
        await navigator.clipboard.writeText(address);
        const originalText = button.textContent;
        button.textContent = '¡Copiado!';
        button.style.color = 'var(--accent)';
        button.style.borderColor = 'var(--accent)';
        setTimeout(() => {
          button.textContent = originalText;
          button.style.color = '';
          button.style.borderColor = '';
        }, 2000);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = address;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        const originalText = button.textContent;
        button.textContent = '¡Copiado!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    });
  });

  // Animaciones al hacer scroll (IntersectionObserver)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar fade-in a elementos clave
  const animatedElements = document.querySelectorAll(
    '.tech-card, .service-card, .project-card, .donation-card, .info-card, .section-title, .section-desc'
  );

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Validación y envío del formulario
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido.');
      return;
    }

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulación de envío (aquí iría la integración real)
    setTimeout(() => {
      alert('¡Mensaje enviado con éxito! Te responderé a la brevedad.');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }, 1500);
  });

  // Efecto parallax sutil en el hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
      const code = document.querySelector('.hero-code');
      if (code) {
        code.style.transform = `translateY(${scrolled * 0.15}px)`;
      }
    }
  });

})();
