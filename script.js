// DumeClick - Interacciones y Contacto por Instagram
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

  // Planificador de Proyecto para Instagram
  const projectTypeSelect = document.getElementById('project-type');
  const featureCheckboxes = document.querySelectorAll('.project-feature');
  const igSummary = document.getElementById('project-summary-text');
  const copyBtn = document.getElementById('copy-ig-btn');
  const copySuccess = document.getElementById('copy-success');

  function updateSummary() {
    if (!projectTypeSelect || !igSummary) return;

    const selectedType = projectTypeSelect.options[projectTypeSelect.selectedIndex].text;
    const selectedFeatures = [];

    featureCheckboxes.forEach(cb => {
      if (cb.checked) {
        const labelText = cb.closest('label').querySelector('.feature-label').textContent.trim();
        selectedFeatures.push(labelText);
      }
    });

    let message = `¡Hola Oliver! Te escribo desde la web de DumeClick para consultar sobre una página web:\n\n`;
    message += `📌 Tipo de proyecto: ${selectedType}\n`;

    if (selectedFeatures.length > 0) {
      message += `⚡ Características de interés:\n`;
      selectedFeatures.forEach(item => {
        message += `  • ${item}\n`;
      });
    }

    message += `\n¿Podemos hablar de los detalles por aquí en Instagram? ¡Gracias!`;

    igSummary.value = message;
  }

  if (projectTypeSelect) {
    projectTypeSelect.addEventListener('change', updateSummary);
  }

  featureCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateSummary);
  });

  if (copyBtn && igSummary) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(igSummary.value).then(() => {
        if (copySuccess) {
          copySuccess.classList.remove('hidden');
          setTimeout(() => {
            copySuccess.classList.add('hidden');
          }, 3000);
        }
      });
    });
  }

  // Inicializar resumen
  updateSummary();

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

  // Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
