const botao = document.querySelector(".menu-toggle");

if (botao) {

    botao.addEventListener("click", () => {

        document.querySelector("nav")
            .classList.toggle("ativo");

    });

}