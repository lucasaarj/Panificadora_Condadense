// Ajuste aqui os dados oficiais da Panificadora Condadense.
const CONFIG = {
  // Use somente números: código do país + DDD + telefone.
  whatsapp: "5581974005164",
  mensagem: "Olá! Gostaria de informações sobre os produtos da Panificadora Condadense."
};

document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
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

// Filtro de categorias do catálogo
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
