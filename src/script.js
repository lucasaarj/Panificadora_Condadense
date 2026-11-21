import { inject } from '@vercel/analytics';

// Initialize Vercel Web Analytics
inject();

const CONFIG = {
  whatsapp: "5581974005164",
  mensagem: "Olá! Gostaria de informações sobre os produtos da Panificadora Condadense."
};

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "☰";
}));

const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    productCards.forEach(card => {
      card.hidden = category !== "todos" && card.dataset.category !== category;
    });
  });
});

// WhatsApp: atualize o telefone acima antes de publicar.
const whatsappLink = document.getElementById("whatsapp-link");
whatsappLink.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensagem)}`;


// Métricas de conversão: ações importantes dos visitantes.
const trackEvent = (name, data = {}) => {
  if (typeof window.va === "function") {
    window.va("event", { name, data });
  }
};

document.addEventListener("click", event => {
  const element = event.target.closest("a, button");
  if (!element) return;

  if (element.matches('a[href*="wa.me"]')) {
    trackEvent("whatsapp_click", {
      placement: element.classList.contains("whatsapp-float") ? "floating" : "contact_section"
    });
    return;
  }

  if (element.matches('a[href*="google.com/maps"]')) {
    trackEvent("maps_click", {
      placement: element.closest(".visit") ? "visit_section" : "location_section"
    });
    return;
  }

  if (element.matches('a[href*="instagram.com"]')) {
    trackEvent("instagram_click", { placement: element.closest("footer") ? "footer" : "page" });
    return;
  }

  if (element.matches(".filter")) {
    trackEvent("product_filter", { category: element.dataset.filter || "unknown" });
  }
});

// Mede interesse nas principais seções sem registrar dados pessoais.
// Cada seção é contabilizada no máximo uma vez por carregamento da página.
if ("IntersectionObserver" in window) {
  const observedSections = new Set();
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || observedSections.has(entry.target.id)) return;
      observedSections.add(entry.target.id);
      trackEvent("section_view", { section: entry.target.id });
      sectionObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  ["produtos", "galeria", "novidades", "depoimentos", "visite", "contato"].forEach(id => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
}
