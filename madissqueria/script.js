/* ============================================
   MADISSQUERÍA - script.js
   ============================================ */

/* ---- NAVBAR: scroll + hamburguesa ---- */
(function () {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Scroll → navbar sólida
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // ejecutar al cargar

  // Hamburguesa
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cerrar menú al hacer clic en un link
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
})();


/* ---- TABS DE MENÚ ---- */
(function () {
  const tabs  = document.querySelectorAll('.tab-btn');
  const grids = document.querySelectorAll('.menu-grid');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Actualizar botones
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      // Mostrar grid correcto
      grids.forEach(g => {
        g.classList.remove('active');
        if (g.id === `tab-${target}`) {
          g.classList.add('active');
        }
      });
    });
  });
})();


/* ---- FORMULARIO DE CONTACTO ---- */
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre   = form.nombre.value.trim();
    const telefono = form.telefono.value.trim();
    const mensaje  = form.mensaje.value.trim();

    // Armar mensaje para WhatsApp
    const wa = encodeURIComponent(
      `Hola, mi nombre es ${nombre}.\n` +
      (telefono ? `Teléfono: ${telefono}\n` : '') +
      `Mensaje: ${mensaje}`
    );

    // Mostrar confirmación
    note.textContent = '✅ ¡Mensaje recibido! Redirigiendo a WhatsApp…';
    note.style.display = 'block';
    note.style.color = '#4ade80';

    // Abrir WhatsApp tras un momento
    setTimeout(() => {
      window.open(`https://wa.me/521234567890?text=${wa}`, '_blank', 'noopener,noreferrer');
      form.reset();
      setTimeout(() => { note.style.display = 'none'; }, 3000);
    }, 800);
  });
})();


/* ---- SCROLL REVEAL ---- */
(function () {
  // Agregar clase 'reveal' a los elementos que queremos animar
  const targets = [
    '.menu-card',
    '.review-card',
    '.gallery-item',
    '.about-text',
    '.about-visual',
    '.location-info',
    '.location-map',
    '.section-header',
    '.stat',
    '.location-item',
  ];

  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Retraso escalonado para elementos hermanos
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ---- HIGHLIGHT LINK ACTIVO EN SCROLL ---- */
(function () {
  const sections = document.querySelectorAll('section[id], header[id]');
  const links    = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= 100) current = sec.id;
    });
    links.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}`
        ? 'var(--turquoise)'
        : '';
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ---- NAVBAR siempre sólida cuando el menú está abierto ---- */
// (cubierto por la clase scrolled que se mantiene)
