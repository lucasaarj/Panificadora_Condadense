var y=()=>{window.va||(window.va=function(...o){window.vaq||(window.vaq=[]),window.vaq.push(o)})},g="@vercel/analytics",b="2.0.1";function u(){return typeof window<"u"}function f(){try{let e="production";if(e==="development"||e==="test")return"development"}catch{}return"production"}function E(e="auto"){if(e==="auto"){window.vam=f();return}window.vam=e}function k(){return(u()?window.vam:f())||"production"}function d(){return k()==="development"}function S(e){return e.scriptSrc?i(e.scriptSrc):d()?"https://va.vercel-scripts.com/v1/script.debug.js":e.basePath?i(`${e.basePath}/insights/script.js`):"/_vercel/insights/script.js"}function $(e,o){var r;let t=e;if(o)try{t={...(r=JSON.parse(o))==null?void 0:r.analytics,...e}}catch{}E(t.mode);let n={sdkn:g+(t.framework?`/${t.framework}`:""),sdkv:b};return t.disableAutoTrack&&(n.disableAutoTrack="1"),t.viewEndpoint&&(n.viewEndpoint=i(t.viewEndpoint)),t.eventEndpoint&&(n.eventEndpoint=i(t.eventEndpoint)),t.sessionEndpoint&&(n.sessionEndpoint=i(t.sessionEndpoint)),d()&&t.debug===!1&&(n.debug="false"),t.dsn&&(n.dsn=t.dsn),t.endpoint?n.endpoint=t.endpoint:t.basePath&&(n.endpoint=i(`${t.basePath}/insights`)),{beforeSend:t.beforeSend,src:S(t),dataset:n}}function i(e){return e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/")?e:`/${e}`}function p(e={debug:!0},o){var r;if(!u())return;let{beforeSend:t,src:n,dataset:m}=$(e,o);if(y(),t&&((r=window.va)==null||r.call(window,"beforeSend",t)),document.head.querySelector(`script[src*="${n}"]`))return;let a=document.createElement("script");a.src=n;for(let[c,h]of Object.entries(m))a.dataset[c]=h;a.defer=!0,a.onerror=()=>{let c=d()?"Please check if any ad blockers are enabled and try again.":"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";console.log(`[Vercel Web Analytics] Failed to load script from ${n}. ${c}`)},document.head.appendChild(a)}p();var v={whatsapp:"5581974005164",mensagem:"Ol\xE1! Gostaria de informa\xE7\xF5es sobre os produtos da Panificadora Condadense."};document.getElementById("year").textContent=new Date().getFullYear();var s=document.querySelector(".menu-toggle"),l=document.querySelector(".nav");s.addEventListener("click",()=>{let e=l.classList.toggle("open");s.setAttribute("aria-expanded",String(e)),s.textContent=e?"\u2715":"\u2630"});l.querySelectorAll("a").forEach(e=>e.addEventListener("click",()=>{l.classList.remove("open"),s.setAttribute("aria-expanded","false"),s.textContent="\u2630"}));var w=document.querySelectorAll(".filter"),A=document.querySelectorAll(".product-card");w.forEach(e=>{e.addEventListener("click",()=>{w.forEach(r=>r.classList.remove("active")),e.classList.add("active");let o=e.dataset.filter;A.forEach(r=>{r.hidden=o!=="todos"&&r.dataset.category!==o})})});var j=document.getElementById("whatsapp-link");j.href=`https://wa.me/${v.whatsapp}?text=${encodeURIComponent(v.mensagem)}`;


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
