const botao = document.querySelector(".menu-toggle");

if (botao) {

    botao.addEventListener("click", () => {

        document.querySelector("nav")
            .classList.toggle("ativo");

    });

}

const dataEvento = new Date("2027-10-15T23:59:59").getTime();

const contador = document.getElementById("contador");

if (contador) {

    setInterval(() => {

        const agora = new Date().getTime();

        const distancia = dataEvento - agora;

        const dias = Math.floor(
            distancia / (1000 * 60 * 60 * 24)
        );

        const horas = Math.floor(
            (distancia % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutos = Math.floor(
            (distancia % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const segundos = Math.floor(
            (distancia % (1000 * 60))
            / 1000
        );

        const anos = Math.floor(dias / 365);
        const diasRestantes = dias % 365;

        contador.innerHTML =
            `🔥 Falta ${anos} ano e ${diasRestantes} dias<br>
            ⏰ ${horas}h ${minutos}m ${segundos}s`;

    }, 1000);

}

fetch("https://script.google.com/macros/s/AKfycbxFjf5mQArDBoCWDd2I3wtvnQefIAfACP1SWeXQSXgHr0Tzn1wamYvDToLaXQVkvJsl0A/exec")
.then(res => res.json())
.then(data => {

    const vagas = document.getElementById("vagas");

    if (!vagas) return;

    if (data.encerrado) {

        vagas.innerHTML =
            "⚠️ INSCRIÇÕES ENCERRADAS";

        const botao =
            document.querySelector(".inscricao-box .btn");

        if (botao) {

            botao.innerHTML =
                "INSCRIÇÕES ENCERRADAS";

            botao.removeAttribute("href");

            botao.style.opacity = "0.5";

            botao.style.pointerEvents = "none";

        }

    } else {

        vagas.innerHTML =
            `🔥 Restam ${data.restantes} vagas`;

    }

});