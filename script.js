// DumeClick - Interacciones
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        
        // Cerrar todos
        document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });

  // Scroll Reveal Animations
  initScrollReveal();

  // Flip-Fade Text Animation (VengeanceUI)
  initFlipFadeText();
});

// Flip-Fade Text Animation (Basado en VengeanceUI flip-fade-text)
function initFlipFadeText() {
  const target = document.getElementById('flip-fade-target');
  if (!target) return;

  const rawWords = target.getAttribute('data-words');
  let words = [
    "se digitalice con un solo click.",
    "automatice sus reservas.",
    "multiplique sus clientes.",
    "crezca en el mundo digital."
  ];
  if (rawWords) {
    try {
      const parsed = JSON.parse(rawWords);
      if (Array.isArray(parsed) && parsed.length > 0) words = parsed;
    } catch (e) {}
  }

  const interval = parseInt(target.getAttribute('data-interval') || '3200', 10);
  const letterDuration = 0.5; // segundos de duración de cada letra
  const staggerDelay = 0.03;  // retardo entre letras al entrar
  const exitStaggerDelay = 0.015; // retardo entre letras al salir
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentIndex = 0;
  let isTransitioning = false;

  // Función para construir el HTML de la frase dividida en palabras y letras
  function renderLetters(text, stateClass = 'is-active') {
    target.innerHTML = '';
    const wordsArr = text.split(' ');
    let globalCharIndex = 0;

    wordsArr.forEach((wordStr, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'flip-fade-word';

      for (let i = 0; i < wordStr.length; i++) {
        const char = wordStr[i];
        const letterSpan = document.createElement('span');
        letterSpan.className = `flip-fade-letter ${stateClass}`;
        letterSpan.textContent = char;
        letterSpan.style.transitionDelay = `${(globalCharIndex * staggerDelay).toFixed(3)}s`;
        wordSpan.appendChild(letterSpan);
        globalCharIndex++;
      }

      target.appendChild(wordSpan);

      // Espacio entre palabras que nunca colapsa
      if (wordIdx < wordsArr.length - 1) {
        const space = document.createElement('span');
        space.className = 'flip-fade-space';
        target.appendChild(space);
        globalCharIndex++;
      }
    });
  }

  // Render inicial
  renderLetters(words[0], 'is-active');

  // Si el usuario prefiere movimiento reducido, solo cambiar texto sin 3D
  if (prefersReducedMotion) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length;
      target.textContent = words[currentIndex];
    }, interval);
    return;
  }

  // Ciclo continuo de flip-fade
  setInterval(() => {
    if (isTransitioning) return;
    isTransitioning = true;

    const currentLetters = target.querySelectorAll('.flip-fade-letter');

    // 1. Fase de salida (exit vertical suave hacia arriba con rotación)
    currentLetters.forEach((letter, i) => {
      letter.style.transitionDelay = `${(i * exitStaggerDelay).toFixed(3)}s`;
      letter.classList.remove('is-active', 'is-enter');
      letter.classList.add('is-exit');
    });

    const totalExitTime = (currentLetters.length * exitStaggerDelay + 0.35) * 1000;

    setTimeout(() => {
      // 2. Preparar siguiente frase en estado 'is-enter'
      currentIndex = (currentIndex + 1) % words.length;
      renderLetters(words[currentIndex], 'is-enter');

      // Forzar reflow del navegador para registrar el estado inicial
      void target.offsetWidth;

      // 3. Fase de entrada (animar a 'is-active')
      requestAnimationFrame(() => {
        const newLetters = target.querySelectorAll('.flip-fade-letter');
        newLetters.forEach((letter) => {
          letter.classList.remove('is-enter');
          letter.classList.add('is-active');
        });

        setTimeout(() => {
          isTransitioning = false;
        }, (newLetters.length * staggerDelay + letterDuration) * 1000);
      });
    }, totalExitTime);

  }, interval);
}

// Scroll Reveal Observer (Efecto de aparición progresiva al scrollear)
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  // Fallback si no hay soporte para IntersectionObserver o si el usuario prefiere movimiento reducido
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  });

  revealElements.forEach(el => observer.observe(el));
}

