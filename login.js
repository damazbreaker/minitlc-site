/* =========================================================
   MINI TLC - LOGIN
   ========================================================= */

/* =========================================================
   ELEMENTOS
   ========================================================= */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const passwordToggle = document.getElementById("passwordToggle");

const loginButton = document.getElementById("loginButton");

const formMessage = document.getElementById("formMessage");

const emailError = document.getElementById("emailError");

const passwordError = document.getElementById("passwordError");

const rememberInput = document.getElementById("remember");

const forgotPassword = document.getElementById("forgotPassword");

/* =========================================================
   MOSTRAR / ESCONDER SENHA
   ========================================================= */

passwordToggle.addEventListener("click", () => {
  const showing = passwordInput.type === "text";

  if (showing) {
    passwordInput.type = "password";

    passwordToggle.classList.remove("showing");

    passwordToggle.setAttribute("aria-label", "Mostrar senha");
  } else {
    passwordInput.type = "text";

    passwordToggle.classList.add("showing");

    passwordToggle.setAttribute("aria-label", "Esconder senha");
  }
});

/* =========================================================
   VALIDAÇÃO DE E-MAIL
   ========================================================= */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================================================
   LIMPAR ERROS
   ========================================================= */

function clearErrors() {
  emailInput.classList.remove("input-error");

  passwordInput.classList.remove("input-error");

  emailError.textContent = "";

  passwordError.textContent = "";
}

/* =========================================================
   MENSAGEM
   ========================================================= */

function showMessage(message, type = "error") {
  formMessage.textContent = message;

  formMessage.className = `form-message show ${type}`;
}

function hideMessage() {
  formMessage.textContent = "";

  formMessage.className = "form-message";
}

/* =========================================================
   LOADING
   ========================================================= */

function setLoading(loading) {
  if (loading) {
    loginButton.classList.add("loading");
  } else {
    loginButton.classList.remove("loading");
  }
}

/* =========================================================
   VALIDAÇÃO
   ========================================================= */

function validateForm() {
  clearErrors();

  let valid = true;

  const email = emailInput.value.trim();

  const password = passwordInput.value;

  /* E-MAIL */

  if (!email) {
    emailInput.classList.add("input-error");

    emailError.textContent = "Digite seu e-mail.";

    valid = false;
  } else if (!isValidEmail(email)) {
    emailInput.classList.add("input-error");

    emailError.textContent = "Digite um e-mail válido.";

    valid = false;
  }

  /* SENHA */

  if (!password) {
    passwordInput.classList.add("input-error");

    passwordError.textContent = "Digite sua senha.";

    valid = false;
  } else if (password.length < 6) {
    passwordInput.classList.add("input-error");

    passwordError.textContent = "A senha deve ter pelo menos 6 caracteres.";

    valid = false;
  }

  return valid;
}

/* =========================================================
   LOGIN
   ========================================================= */

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  hideMessage();

  if (!validateForm()) {
    return;
  }

  const email = emailInput.value.trim();

  const password = passwordInput.value;

  setLoading(true);

  /*
      ======================================================
      IMPORTANTE

      Atualmente este código faz apenas a validação visual.

      Quando você tiver um sistema de autenticação,
      substitua a parte abaixo pela chamada da API/Firebase/
      Supabase/etc.
      ======================================================
    */

  try {
    await fakeLogin();

    /*
        LOGIN DEMONSTRATIVO

        Não é um sistema de autenticação real.
      */

    showMessage(
      "Login validado! Agora podemos conectar esta tela ao sistema de contas.",
      "success",
    );

    if (rememberInput.checked) {
      localStorage.setItem("miniTlcRememberEmail", email);
    } else {
      localStorage.removeItem("miniTlcRememberEmail");
    }
  } catch (error) {
    showMessage("Não foi possível realizar o login. Tente novamente.", "error");
  } finally {
    setLoading(false);
  }
});

/* =========================================================
   LOGIN DEMONSTRATIVO
   ========================================================= */

function fakeLogin() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

/* =========================================================
   RECUPERAR E-MAIL SALVO
   ========================================================= */

function loadRememberedEmail() {
  const savedEmail = localStorage.getItem("miniTlcRememberEmail");

  if (savedEmail) {
    emailInput.value = savedEmail;

    rememberInput.checked = true;
  }
}

loadRememberedEmail();

/* =========================================================
   ESQUECI MINHA SENHA
   ========================================================= */

forgotPassword.addEventListener("click", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (email && isValidEmail(email)) {
    showMessage(
      `Se existir uma conta para ${email}, enviaremos instruções para recuperar sua senha.`,
      "success",
    );
  } else {
    emailInput.focus();

    emailInput.classList.add("input-error");

    emailError.textContent = "Digite seu e-mail para recuperar a senha.";
  }
});

/* =========================================================
   LIMPAR ERRO AO DIGITAR
   ========================================================= */

emailInput.addEventListener("input", () => {
  emailInput.classList.remove("input-error");

  emailError.textContent = "";

  hideMessage();
});

passwordInput.addEventListener("input", () => {
  passwordInput.classList.remove("input-error");

  passwordError.textContent = "";

  hideMessage();
});

/* =========================================================
   ENTER / ESC
   ========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideMessage();
  }
});

/* =========================================================
   PREVENIR ENVIO ACIDENTAL
   ========================================================= */

window.addEventListener("pageshow", () => {
  setLoading(false);
});
