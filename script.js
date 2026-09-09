// DumeClick - Interacciones y Calculadora de Presupuesto
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

  // Calculadora de Presupuesto Dinámica
  const basePrices = {
    'landing': { name: 'Landing Page Express', price: 99 },
    'business': { name: 'Web Negocio / Corporativa', price: 180 },
    'booking': { name: 'Web de Reservas y Citas', price: 240 },
    'event': { name: 'Web para Evento / Celebración', price: 190 },
    'shop': { name: 'Tienda Online / Catálogo', price: 290 }
  };

  const extraPrices = {
    'extra-seo': { name: 'SEO Local y Google Maps', price: 40 },
    'extra-domain': { name: 'Dominio y Hosting (1 año)', price: 45 },
    'extra-payment': { name: 'Pasarela de Pago (Bizum/Tarjeta)', price: 60 },
    'extra-speed': { name: 'Optimización de Carga Ultrarrápida', price: 30 }
  };

  const projectTypeSelect = document.getElementById('calc-type');
  const extraCheckboxes = document.querySelectorAll('.calc-extra');
  const priceDisplay = document.getElementById('calc-total');
  const whatsappBtn = document.getElementById('calc-whatsapp-btn');

  function calculateTotal() {
    if (!projectTypeSelect || !priceDisplay) return;

    const selectedTypeKey = projectTypeSelect.value;
    const baseObj = basePrices[selectedTypeKey] || basePrices['landing'];
    let total = baseObj.price;
    const selectedExtras = [];

    extraCheckboxes.forEach(cb => {
      if (cb.checked && extraPrices[cb.id]) {
        total += extraPrices[cb.id].price;
        selectedExtras.push(extraPrices[cb.id].name);
      }
    });

    // Actualizar pantalla
    priceDisplay.textContent = `${total}€`;

    // Preparar mensaje de WhatsApp
    let message = `¡Hola Oliver! He usado la calculadora de DumeClick y me gustaría pedir presupuesto para:%0A%0A`;
    message += `📌 *Tipo de Web:* ${baseObj.name} (${baseObj.price}€)%0A`;

    if (selectedExtras.length > 0) {
      message += `⚡ *Extras seleccionados:*%0A`;
      selectedExtras.forEach(item => {
        message += `  • ${item}%0A`;
      });
    }

    message += `%0A💰 *Estimación total:* ${total}€ aprox.%0A%0A¿Podemos hablar de los detalles? ¡Gracias!`;

    if (whatsappBtn) {
      // Número o enlace directo de WhatsApp (WhatsApp universal)
      whatsappBtn.href = `https://wa.me/34600000000?text=${message}`;
    }
  }

  if (projectTypeSelect) {
    projectTypeSelect.addEventListener('change', calculateTotal);
  }

  extraCheckboxes.forEach(cb => {
    cb.addEventListener('change', calculateTotal);
  });

  // Inicializar cálculo al cargar
  calculateTotal();

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

  // Smooth year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
