/* =========================
   MENU MOBILE
========================= */
const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("ativo");
  });
}

/* =========================
   CONTADOR EVENTO
========================= */
const contador = document.getElementById("contador");

if (contador) {
  const dataEvento = new Date("2027-10-15T23:59:59").getTime();

  setInterval(() => {
    const agora = Date.now();
    const distancia = dataEvento - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const anos = Math.floor(dias / 365);
    const diasRestantes = dias % 365;

    contador.innerHTML = `🔥 Falta ${anos} ano(s) e ${diasRestantes} dias<br>
            ⏰ ${horas}h ${minutos}m ${segundos}s`;
  }, 1000);
}

/* =========================
   VAGAS MINI TLC
========================= */
fetch(
  "https://script.google.com/macros/s/AKfycbxFjf5mQArDBoCWDd2I3wtvnQefIAfACP1SWeXQSXgHr0Tzn1wamYvDToLaXQVkvJsl0A/exec",
)
  .then((res) => res.json())
  .then((dados) => {
    const vagas = document.getElementById("vagas-restantes");
    const texto = document.getElementById("texto-vagas");
    const barra = document.getElementById("progresso-vagas");

    if (vagas) vagas.textContent = dados.restantes;
    if (texto) texto.textContent = `${dados.inscricoes} inscritos de 62 vagas`;
    if (barra) barra.style.width = `${(dados.inscricoes / 62) * 100}%`;

    const link = document.getElementById("link-inscricao");
    if (dados.encerrado && link) {
      link.textContent = "❌ Inscrições Encerradas";
      link.removeAttribute("href");
    }
  })
  .catch(() => console.log("Erro ao carregar vagas"));

/* =========================
   CARROSSEL
========================= */
const slides = document.querySelectorAll(".slide");
const bolinhas = document.querySelectorAll(".bolinha");
const btnAnterior = document.querySelector(".anterior");
const btnProximo = document.querySelector(".proximo");

if (slides.length) {
  let slideAtual = 0;

  function mostrarSlide(i) {
    slides.forEach((s) => s.classList.remove("ativo"));
    bolinhas.forEach((b) => b.classList.remove("ativa"));

    slides[i].classList.add("ativo");
    if (bolinhas[i]) bolinhas[i].classList.add("ativa");

    slideAtual = i;
  }

  function proximo() {
    mostrarSlide((slideAtual + 1) % slides.length);
  }

  function anterior() {
    mostrarSlide((slideAtual - 1 + slides.length) % slides.length);
  }

  btnProximo?.addEventListener("click", proximo);
  btnAnterior?.addEventListener("click", anterior);

  setInterval(proximo, 4000);
}

/* =========================
   SCROLL ANIMAÇÃO (ÚNICA E LIMPA)
========================= */
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("mostrar");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

sections.forEach((sec) => observer.observe(sec));

/* =========================
   LIGHTBOX
========================= */
const imagens = document.querySelectorAll(".galeria img");
const lightbox = document.getElementById("lightbox");
const imagemAmpliada = document.getElementById("imagem-ampliada");
const fechar = document.getElementById("fechar");

if (imagens.length && lightbox) {
  imagens.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      imagemAmpliada.src = img.src;
    });
  });
}

fechar?.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

/* =========================
   CONTADORES ANIMADOS
========================= */
const numeros = document.querySelectorAll(".contador-numero");

const contadorObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const alvo = parseInt(el.dataset.alvo);

    let atual = 0;
    const inc = Math.ceil(alvo / 50);

    const anim = setInterval(() => {
      atual += inc;

      if (atual >= alvo) {
        atual = alvo;
        clearInterval(anim);
      }

      el.textContent = atual.toLocaleString("pt-BR");
    }, 30);

    contadorObserver.unobserve(el);
  });
});

numeros.forEach((n) => contadorObserver.observe(n));

/* =========================
   LINK ATIVO
========================= */
const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a").forEach((link) => {
  if (link.getAttribute("href") === paginaAtual) {
    link.classList.add("ativo");
  }
});

/* =========================
   LOADER (CORRIGIDO 100%)
========================= */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("esconder");

    setTimeout(() => {
      loader.style.display = "none";
    }, 700);
  }, 800);
});

/* =========================
   TESTEMUNHOS
========================= */
const testemunhos = [
  "O TLC me ajudou a crescer na fé e encontrar amigos para toda a vida.",
  "O Mini TLC foi uma experiência que marcou profundamente minha caminhada.",
  "Aprendi que o esporte também pode ser um caminho de evangelização.",
  "Conheci pessoas que hoje considero uma segunda família.",
  "Foi um dos momentos mais importantes da minha adolescência.",
];

const textoTestemunho = document.getElementById("texto-testemunho");
const btnAnt = document.getElementById("anterior-testemunho");
const btnProx = document.getElementById("proximo-testemunho");

if (textoTestemunho && btnAnt && btnProx) {
  let i = 0;

  function atualizar() {
    textoTestemunho.textContent = testemunhos[i];
  }

  btnProx.addEventListener("click", () => {
    i = (i + 1) % testemunhos.length;
    atualizar();
  });

  btnAnt.addEventListener("click", () => {
    i = (i - 1 + testemunhos.length) % testemunhos.length;
    atualizar();
  });

  setInterval(() => {
    i = (i + 1) % testemunhos.length;
    atualizar();
  }, 5000);
}

/* =========================
   DARK MODE
========================= */
const darkBtn = document.getElementById("dark-mode-btn");

if (darkBtn) {
  const tema = localStorage.getItem("tema");

  if (tema === "dark") document.body.classList.add("dark");

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "tema",
      document.body.classList.contains("dark") ? "dark" : "light",
    );
  });
}
