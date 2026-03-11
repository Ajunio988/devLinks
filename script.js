// Função para alternar entre os modos claro e escuro
function toggleMode() {
  const html = document.documentElement;
  const isLight = html.classList.contains("light");

  if (html.classList.contains("light")) {
    html.classList.remove("light");
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    html.classList.add("light");
    localStorage.setItem("theme", "light");
  }
}

// Inicializa o idioma ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const savedlang = localStorage.getItem("lang") || "pt-br";
  const savedTheme = localStorage.getItem("theme") || "dark";
  // updateLangButton(lang);
  updateFlagVisuals(savedlang);
  applyLanguage();

  // Adiciona o evento de clique ao botão de alternância de idioma
  document.getElementById("lang-btn").addEventListener("click", toggleLanguage);
  document.documentElement.classList.add(savedTheme);
});

// Variável para armazenar o idioma atual
function toggleLanguage() {
  let currentLang = localStorage.getItem("lang") || "pt-br";

  currentLang = currentLang === "pt-br" ? "en" : "pt-br";
  localStorage.setItem("lang", currentLang);

  updateFlagVisuals(currentLang); // Atualiza as bandeiras e setas
  applyLanguage(); // Aplica as traduções com base no idioma selecionado
}

// Função para atualizar o botão de idioma com base no idioma atual
/* function updateLangButton() {
  const btn = document.getElementById("lang-btn");
  const currentLang = localStorage.getItem("lang") || "pt-br";
  if (currentLang === "pt-br") {
    btn.innerHTML =
      '<img src="./assets/br.svg" alt="Botão de alternância de idioma"><span><ion-icon name="arrow-back-outline"></ion-icon></span>';
    localStorage.setItem("lang", "pt-br");
  } else {
    btn.innerHTML =
      '<img src="./assets/en.svg" alt="Botão de alternância de idioma"><span><ion-icon name="arrow-forward-outline"></ion-icon></span>';
    localStorage.setItem("lang", "en");
  }
} */

// Função para atualizar as bandeiras e setas com base no idioma atual
function updateFlagVisuals() {
  const flagBr = document.getElementById("flag-br");
  const flagUsa = document.getElementById("flag-usa");
  const arrow = document.getElementById("arrow");

  // Verifica se os elementos existem
  if (!flagBr || !flagUsa || !arrow) {
    {
      console.warn("Elementos de bandeira ou seta não encontrados.");
      return;
    }
  }

  // Remove a classe "active" de ambas as bandeiras
  flagBr.classList.remove("active");
  flagUsa.classList.remove("active");

  const currentLang = localStorage.getItem("lang") || "pt-br";
  if (currentLang === "pt-br") {
    flagBr.classList.add("active");
    arrowForward.classList.remove("hidden");
    arrowBack.classList.add("hidden");
  } else {
    flagUsa.classList.add("active");
    arrowForward.classList.add("hidden");
    arrowBack.classList.remove("hidden");
  }
}

// Função para aplicar as traduções com base no idioma selecionado
function applyLanguage() {
  const currentLang = localStorage.getItem("lang") || "pt-br";
  const elements = document.querySelectorAll("[data-i18n]");

  // Itera sobre os elementos com o atributo data-i18n e atualiza o texto com a tradução correspondente
  elements.forEach((element) => {
    const key = element.dataset.i18n;
    const translation = i18n[currentLang]?.[key];
    if (translation) {
      element.textContent = translation;
    } else {
      console.warn(`Translation for key ${key}" not found.`);
    }
  });
}

// Objeto de traduções para os idiomas suportados
const i18n = {
  "pt-br": {
    "profile.name": "Alexandre Felix",
    "profile.job": "Engenheiro de Software",
    "social.title": "Redes Sociais:",
    "social.linkedIn": "Meu LinkedIn",
    "social.github": "Meu GitHub",
    "certificações": "Certificações", 
    portfolio: "Veja o meu Portfólio",
    contactEmail: "Entre em contato",
    "social.description":
      "Siga-me nas redes sociais e entre em contato para projetos.",
  },
  en: {
    "profile.name": "Alexandre Felix",
    "profile.job": "Software Engineer",
    "social.title": "Social Networks:",
    "social.linkedIn": "My LinkedIn",
    "social.github": "My GitHub",
    "certificações": "Certifications", 
    portfolio: "See my Portfolio",
    contactEmail: "Contact me",
    "social.description":
      "Follow me on social media and contact me for projects.",
  },
};
