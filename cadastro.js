/* =========================================================
   MINI TLC - CADASTRO
========================================================= */

/* =========================================================
   ELEMENTOS
========================================================= */

const registerForm = document.getElementById("registerForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const phoneInput = document.getElementById("phone");

const passwordInput = document.getElementById("password");

const confirmPasswordInput = document.getElementById("confirmPassword");

const termsInput = document.getElementById("terms");

const passwordToggle = document.getElementById("passwordToggle");

const registerButton = document.getElementById("registerButton");

const formMessage = document.getElementById("formMessage");

const passwordStrength = document.getElementById("passwordStrength");

const strengthText = document.getElementById("strengthText");

/* =========================================================
   ERROS
========================================================= */

const nameError = document.getElementById("nameError");

const emailError = document.getElementById("emailError");

const phoneError = document.getElementById("phoneError");

const passwordError = document.getElementById("passwordError");

const confirmPasswordError = document.getElementById("confirmPasswordError");

/* =========================================================
   MOSTRAR SENHA
========================================================= */

passwordToggle.addEventListener("click", () => {
  const showing = passwordInput.type === "text";

  if (showing) {
    passwordInput.type = "password";

    confirmPasswordInput.type = "password";

    passwordToggle.classList.remove("showing");

    passwordToggle.setAttribute("aria-label", "Mostrar senha");
  } else {
    passwordInput.type = "text";

    confirmPasswordInput.type = "text";

    passwordToggle.classList.add("showing");

    passwordToggle.setAttribute("aria-label", "Esconder senha");
  }
});

/* =========================================================
   E-MAIL
========================================================= */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================================================
   TELEFONE
========================================================= */

function formatPhone(value) {
  value = value.replace(/\D/g, "");

  value = value.substring(0, 11);

  if (value.length <= 2) {
    return value;
  }

  if (value.length <= 7) {
    return value.replace(/^(\d{2})(\d+)/, "($1) $2");
  }

  if (value.length <= 11) {
    return value.replace(/^(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
  }

  return value;
}

phoneInput.addEventListener("input", () => {
  phoneInput.value = formatPhone(phoneInput.value);
});

/* =========================================================
   FORÇA DA SENHA
========================================================= */

function updatePasswordStrength() {
  const password = passwordInput.value;

  const length = password.length;

  passwordStrength.className = "password-strength";

  if (!password) {
    strengthText.textContent = "Mínimo de 6 caracteres";

    return;
  }

  if (length < 6) {
    passwordStrength.classList.add("weak");

    strengthText.textContent = "Senha muito fraca";

    return;
  }

  let score = 0;

  if (length >= 6) {
    score++;
  }

  if (length >= 8) {
    score++;
  }

  if (/[A-Z]/.test(password)) {
    score++;
  }

  if (/[0-9]/.test(password)) {
    score++;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  }

  if (score <= 1) {
    passwordStrength.classList.add("weak");

    strengthText.textContent = "Senha fraca";
  } else if (score === 2) {
    passwordStrength.classList.add("medium");

    strengthText.textContent = "Senha razoável";
  } else if (score === 3) {
    passwordStrength.classList.add("good");

    strengthText.textContent = "Senha boa";
  } else {
    passwordStrength.classList.add("strong");

    strengthText.textContent = "Senha forte";
  }
}

passwordInput.addEventListener("input", updatePasswordStrength);

/* =========================================================
   LIMPAR ERROS
========================================================= */

function clearErrors() {
  const inputs = [
    nameInput,
    emailInput,
    phoneInput,
    passwordInput,
    confirmPasswordInput,
  ];

  inputs.forEach((input) => {
    input.classList.remove("input-error");
  });

  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";
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
    registerButton.classList.add("loading");
  } else {
    registerButton.classList.remove("loading");
  }
}

/* =========================================================
   VALIDAÇÃO
========================================================= */

function validateForm() {
  clearErrors();

  let valid = true;

  const name = nameInput.value.trim();

  const email = emailInput.value.trim();

  const phone = phoneInput.value.replace(/\D/g, "");

  const password = passwordInput.value;

  const confirmPassword = confirmPasswordInput.value;

  /* NOME */

  if (!name) {
    nameInput.classList.add("input-error");

    nameError.textContent = "Digite seu nome completo.";

    valid = false;
  } else if (name.split(" ").length < 2) {
    nameInput.classList.add("input-error");

    nameError.textContent = "Digite seu nome e sobrenome.";

    valid = false;
  }

  /* EMAIL */

  if (!email) {
    emailInput.classList.add("input-error");

    emailError.textContent = "Digite seu e-mail.";

    valid = false;
  } else if (!isValidEmail(email)) {
    emailInput.classList.add("input-error");

    emailError.textContent = "Digite um e-mail válido.";

    valid = false;
  }

  /* TELEFONE */

  if (!phone) {
    phoneInput.classList.add("input-error");

    phoneError.textContent = "Digite seu WhatsApp.";

    valid = false;
  } else if (phone.length < 10) {
    phoneInput.classList.add("input-error");

    phoneError.textContent = "Digite um número válido.";

    valid = false;
  }

  /* SENHA */

  if (!password) {
    passwordInput.classList.add("input-error");

    passwordError.textContent = "Crie uma senha.";

    valid = false;
  } else if (password.length < 6) {
    passwordInput.classList.add("input-error");

    passwordError.textContent = "A senha precisa ter pelo menos 6 caracteres.";

    valid = false;
  }

  /* CONFIRMAÇÃO */

  if (!confirmPassword) {
    confirmPasswordInput.classList.add("input-error");

    confirmPasswordError.textContent = "Confirme sua senha.";

    valid = false;
  } else if (password !== confirmPassword) {
    confirmPasswordInput.classList.add("input-error");

    confirmPasswordError.textContent = "As senhas não coincidem.";

    valid = false;
  }

  /* TERMOS */

  if (!termsInput.checked) {
    showMessage(
      "Você precisa aceitar os termos de uso e a política de privacidade.",
      "error",
    );

    valid = false;
  }

  return valid;
}

/* =========================================================
   ENVIO
========================================================= */

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  hideMessage();

  if (!validateForm()) {
    return;
  }

  setLoading(true);

  try {
    /*
     * =================================================
     * LOGIN DEMONSTRATIVO
     *
     * Esta parte ainda não cria uma conta real.
     * Posteriormente podemos conectar ao Supabase,
     * Firebase ou outro sistema de autenticação.
     * =================================================
     */

    await fakeRegister();

    showMessage(
      "Cadastro validado com sucesso! Agora podemos conectar esta tela ao sistema de contas.",
      "success",
    );

    registerForm.reset();

    updatePasswordStrength();
  } catch (error) {
    showMessage("Não foi possível criar sua conta. Tente novamente.", "error");
  } finally {
    setLoading(false);
  }
});

/* =========================================================
   CADASTRO DEMONSTRATIVO
========================================================= */

function fakeRegister() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1200);
  });
}

/* =========================================================
   LIMPAR ERROS AO DIGITAR
========================================================= */

nameInput.addEventListener("input", () => {
  nameInput.classList.remove("input-error");

  nameError.textContent = "";

  hideMessage();
});

emailInput.addEventListener("input", () => {
  emailInput.classList.remove("input-error");

  emailError.textContent = "";

  hideMessage();
});

phoneInput.addEventListener("input", () => {
  phoneInput.classList.remove("input-error");

  phoneError.textContent = "";

  hideMessage();
});

passwordInput.addEventListener("input", () => {
  passwordInput.classList.remove("input-error");

  passwordError.textContent = "";

  hideMessage();
});

confirmPasswordInput.addEventListener("input", () => {
  confirmPasswordInput.classList.remove("input-error");

  confirmPasswordError.textContent = "";

  hideMessage();
});

/* =========================================================
   CONFIRMAR SENHA EM TEMPO REAL
========================================================= */

confirmPasswordInput.addEventListener("input", () => {
  if (
    confirmPasswordInput.value &&
    passwordInput.value !== confirmPasswordInput.value
  ) {
    confirmPasswordError.textContent = "As senhas não coincidem.";
  } else {
    confirmPasswordError.textContent = "";
  }
});
