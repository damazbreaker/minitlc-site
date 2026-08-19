/* =========================
   MENU MOBILE
========================= */

const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuBtn && nav) {
  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", () => {
    const aberto = nav.classList.toggle("ativo");

    menuBtn.setAttribute("aria-expanded", String(aberto));
    menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
}

/* =========================
   DROPDOWN MAIS
========================= */

const dropdownButtons = document.querySelectorAll(".dropdown > .dropbtn");

dropdownButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();

    const dropdown = btn.closest(".dropdown");

    const aberto = dropdown.classList.contains("ativo");

    document.querySelectorAll(".dropdown.ativo").forEach((item) => {
      item.classList.remove("ativo");
    });

    if (!aberto) {
      dropdown.classList.add("ativo");
    }
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown.ativo").forEach((item) => {
    item.classList.remove("ativo");
  });
});

/* =========================
   CONTADOR DO EVENTO
========================= */

const contador = document.getElementById("contador");

if (contador) {
  const dataEvento = new Date("2027-10-15T23:59:59").getTime();

  const atualizarContador = () => {
    const agora = Date.now();

    const distancia = dataEvento - agora;

    if (distancia <= 0) {
      contador.innerHTML = "🎉 O evento já começou!";

      return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
      (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));

    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const anos = Math.floor(dias / 365);

    const diasRestantes = dias % 365;

    contador.innerHTML = `
    🔥 Falta ${anos} ano(s) e ${diasRestantes} dias
    <br>
    ⏰ ${horas}h ${minutos}m ${segundos}s
    `;
  };

  atualizarContador();

  setInterval(atualizarContador, 1000);
}

/* =========================
   VAGAS MINI TLC
========================= */

const apiVagas =
  "https://script.google.com/macros/s/AKfycbxFjf5mQArDBoCWDd2I3wtvnQefIAfACP1SWeXQSXgHr0Tzn1wamYvDToLaXQVkvJsl0A/exec";

fetch(apiVagas)
  .then((resposta) => {
    if (!resposta.ok) {
      throw new Error("Erro na API");
    }

    return resposta.json();
  })

  .then((dados) => {
    const vagas = document.getElementById("vagas-restantes");

    const texto = document.getElementById("texto-vagas");

    const barra = document.getElementById("progresso-vagas");

    if (vagas) {
      vagas.textContent = dados.restantes;
    }

    if (texto) {
      texto.textContent = `${dados.inscricoes} inscritos de 62 vagas`;
    }

    if (barra) {
      const porcentagem = (dados.inscricoes / 62) * 100;

      barra.style.width = `${porcentagem}%`;
    }

    const link = document.getElementById("link-inscricao");

    if (dados.encerrado && link) {
      link.textContent = "❌ Inscrições Encerradas";

      link.removeAttribute("href");
    }
  })

  .catch((erro) => {
    console.error("Erro ao carregar vagas:", erro);

    const texto = document.getElementById("texto-vagas");

    if (texto) {
      texto.textContent = "Não foi possível carregar as vagas.";
    }
  });

/* =========================
   CARROSSEL
========================= */

const slides = document.querySelectorAll(".slide");

const bolinhas = document.querySelectorAll(".bolinha");

const btnAnterior = document.querySelector(".anterior");

const btnProximo = document.querySelector(".proximo");

if (slides.length) {
  let slideAtual = 0;

  function mostrarSlide(numero) {
    slides.forEach((slide) => {
      slide.classList.remove("ativo");
    });

    bolinhas.forEach((bolinha) => {
      bolinha.classList.remove("ativa");
    });

    slides[numero].classList.add("ativo");

    if (bolinhas[numero]) {
      bolinhas[numero].classList.add("ativa");
    }

    slideAtual = numero;
  }

  function proximoSlide() {
    mostrarSlide((slideAtual + 1) % slides.length);
  }

  function voltarSlide() {
    mostrarSlide((slideAtual - 1 + slides.length) % slides.length);
  }

  btnProximo?.addEventListener("click", proximoSlide);

  btnAnterior?.addEventListener("click", voltarSlide);

  setInterval(proximoSlide, 4000);
}

/* =========================
   ANIMAÇÃO DAS SEÇÕES
========================= */

const secoes = document.querySelectorAll("section");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("mostrar");

          observer.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  secoes.forEach((secao) => {
    observer.observe(secao);
  });
} else {
  secoes.forEach((secao) => {
    secao.classList.add("mostrar");
  });
}

/* Segurança caso alguma animação falhe */

setTimeout(() => {
  secoes.forEach((secao) => {
    secao.classList.add("mostrar");
  });
}, 4000);

/* =========================
   LIGHTBOX GALERIA
========================= */

const imagens = document.querySelectorAll(".galeria img");

const lightbox = document.getElementById("lightbox");

const imagemAmpliada = document.getElementById("imagem-ampliada");

const fecharLightbox = document.getElementById("fechar");

if (imagens.length && lightbox && imagemAmpliada) {
  imagens.forEach((imagem) => {
    imagem.addEventListener("click", () => {
      lightbox.style.display = "flex";

      imagemAmpliada.src = imagem.src;

      imagemAmpliada.alt = imagem.alt || "Imagem ampliada";
    });
  });
}

fecharLightbox?.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox?.addEventListener("click", (evento) => {
  if (evento.target === lightbox) {
    lightbox.style.display = "none";
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && lightbox?.style.display === "flex") {
    lightbox.style.display = "none";
  }
});

/* =========================
   CONTADORES ANIMADOS
========================= */

const numeros = document.querySelectorAll(".contador-numero");

if (numeros.length && "IntersectionObserver" in window) {
  const contadorObserver = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const elemento = entrada.target;

        const valorFinal = Number(elemento.dataset.alvo);

        let valorAtual = 0;

        const incremento = Math.ceil(valorFinal / 60);

        const animacao = setInterval(() => {
          valorAtual += incremento;

          if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;

            clearInterval(animacao);
          }

          elemento.textContent = valorAtual.toLocaleString("pt-BR");
        }, 30);

        contadorObserver.unobserve(elemento);
      });
    },
    {
      threshold: 0.5,
    },
  );

  numeros.forEach((numero) => {
    contadorObserver.observe(numero);
  });
} else {
  numeros.forEach((numero) => {
    numero.textContent = Number(numero.dataset.alvo).toLocaleString("pt-BR");
  });
}

/* =========================
   LINK ATIVO DO MENU
========================= */

const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a").forEach((link) => {
  const destino = link.getAttribute("href");

  if (destino === paginaAtual) {
    link.classList.add("ativo");
    link.setAttribute("aria-current", "page");
  }
});

/* =========================
   LOADER
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

const listaTestemunhos = [
  "O TLC me ajudou a crescer na fé e encontrar amigos para toda a vida.",

  "O Mini TLC foi uma experiência que marcou profundamente minha caminhada.",

  "Aprendi que o esporte também pode ser um caminho de evangelização.",

  "Conheci pessoas que hoje considero uma segunda família.",

  "Foi um dos momentos mais importantes da minha adolescência.",
];

const textoTestemunho = document.getElementById("texto-testemunho");

const botaoAnteriorTestemunho = document.getElementById("anterior-testemunho");

const botaoProximoTestemunho = document.getElementById("proximo-testemunho");

if (textoTestemunho && botaoAnteriorTestemunho && botaoProximoTestemunho) {
  let indiceTestemunho = 0;

  function atualizarTestemunho() {
    textoTestemunho.textContent = `"${listaTestemunhos[indiceTestemunho]}"`;
  }

  botaoProximoTestemunho.addEventListener("click", () => {
    indiceTestemunho = (indiceTestemunho + 1) % listaTestemunhos.length;

    atualizarTestemunho();
  });

  botaoAnteriorTestemunho.addEventListener("click", () => {
    indiceTestemunho =
      (indiceTestemunho - 1 + listaTestemunhos.length) %
      listaTestemunhos.length;

    atualizarTestemunho();
  });

  setInterval(() => {
    indiceTestemunho = (indiceTestemunho + 1) % listaTestemunhos.length;

    atualizarTestemunho();
  }, 5000);
}

/* =========================
   DARK MODE
========================= */

const botaoDark = document.getElementById("dark-mode-btn");

if (botaoDark) {
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo === "dark") {
    document.body.classList.add("dark");
  }

  botaoDark.setAttribute(
    "aria-pressed",
    String(document.body.classList.contains("dark")),
  );

  botaoDark.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const temaAtual = document.body.classList.contains("dark")
      ? "dark"
      : "light";

    localStorage.setItem("tema", temaAtual);
    botaoDark.setAttribute("aria-pressed", String(temaAtual === "dark"));
  });
}

/* =========================
   BOTÃO VOLTAR AO TOPO
========================= */

const botaoTopo = document.querySelector(".topo");

if (botaoTopo) {
  const atualizarBotaoTopo = () => {
    botaoTopo.classList.toggle("visivel", window.scrollY > 500);
  };

  atualizarBotaoTopo();
  window.addEventListener("scroll", atualizarBotaoTopo, { passive: true });

  botaoTopo.addEventListener("click", (evento) => {
    evento.preventDefault();

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

/* =========================
   ESTRUTURA E ACESSIBILIDADE COMPARTILHADAS
========================= */

const conteudoPrincipal = document.querySelector("main");

if (conteudoPrincipal && !conteudoPrincipal.id) {
  conteudoPrincipal.id = "conteudo";
}

if (conteudoPrincipal && !document.querySelector(".pular-conteudo")) {
  const pularConteudo = document.createElement("a");

  pularConteudo.className = "pular-conteudo";
  pularConteudo.href = "#conteudo";
  pularConteudo.textContent = "Pular para o conteúdo";

  document.body.prepend(pularConteudo);
}

document.querySelectorAll("nav").forEach((menu) => {
  if (!menu.hasAttribute("aria-label")) {
    menu.setAttribute("aria-label", "Navegação principal");
  }
});

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  const relAtual = link.getAttribute("rel") || "";

  if (!relAtual.includes("noopener")) {
    link.setAttribute("rel", `${relAtual} noopener noreferrer`.trim());
  }
});

/* =========================
   FORMULÁRIO DE CONTATO
========================= */

const formularioContato = document.getElementById("form-contato");

if (formularioContato) {
  formularioContato.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formularioContato.checkValidity()) {
      formularioContato.reportValidity();
      return;
    }

    const dados = new FormData(formularioContato);
    const aviso = formularioContato.querySelector(".form-aviso");
    const assunto = "Contato pelo site TLC";
    const mensagem = `Nome: ${dados.get("nome")}\nE-mail: ${dados.get("email")}\n\nMensagem:\n${dados.get("mensagem")}`;

    if (aviso) {
      aviso.textContent = "Abrindo seu aplicativo de e-mail para enviar a mensagem.";
    }

    window.location.href = `mailto:contato@tlc.com.br?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(mensagem)}`;
  });
}

/* =========================
   FECHAR MENU MOBILE AO CLICAR
   EM UM LINK
========================= */

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("ativo");

    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

/* =========================
   ANO AUTOMÁTICO FOOTER
========================= */

const anoAtual = document.querySelector(".footer-bottom");

if (anoAtual) {
  anoAtual.innerHTML = anoAtual.innerHTML.replace(
    "2026",
    new Date().getFullYear(),
  );
}

/* =========================
   PROTEÇÃO CONTRA ERROS
========================= */

window.addEventListener("error", (evento) => {
  console.warn("Erro capturado:", evento.message);
});


