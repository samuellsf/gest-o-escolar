document.addEventListener("DOMContentLoaded", function () {
    const perguntaInput = document.getElementById("pergunta");
    const botaoEnviar = document.getElementById("enviarPergunta");
    const respostaChatbot = document.getElementById("respostaChatbot");

    // Banco de respostas baseado em palavras-chave

    function obterResposta(pergunta) {
        pergunta = pergunta.toLowerCase();
        for (let palavra in {
            "matemática": "A matemática é incrível! Precisa de ajuda com equações ou conceitos?",
            "história": "A história nos ensina sobre o passado. Algum período específico te interessa?",
            "cálculo": "O cálculo envolve derivadas e integrais. Quer um exemplo de aplicação?",
            "ciências": "A ciência explica o mundo ao nosso redor! Alguma área específica, como biologia ou física?",
            "programação": "A programação é essencial hoje em dia! Quer dicas sobre JavaScript?",
            "geografia": "A geografia estuda o planeta Terra. Alguma dúvida sobre países ou climas?",
            "física": "A física estuda as leis do universo. Alguma dúvida sobre movimento ou energia?",
            "default": "Não entendi sua pergunta. Tente reformular ou perguntar sobre temas como matemática, história, ciências ou programação!"
        }) {
            if (pergunta.includes(palavra)) {
                return {
                    "matemática": "A matemática é incrível! Precisa de ajuda com equações ou conceitos?",
                    "história": "A história nos ensina sobre o passado. Algum período específico te interessa?",
                    "cálculo": "O cálculo envolve derivadas e integrais. Quer um exemplo de aplicação?",
                    "ciências": "A ciência explica o mundo ao nosso redor! Alguma área específica, como biologia ou física?",
                    "programação": "A programação é essencial hoje em dia! Quer dicas sobre JavaScript?",
                    "geografia": "A geografia estuda o planeta Terra. Alguma dúvida sobre países ou climas?",
                    "física": "A física estuda as leis do universo. Alguma dúvida sobre movimento ou energia?",
                    "default": "Não entendi sua pergunta. Tente reformular ou perguntar sobre temas como matemática, história, ciências ou programação!"
                }[palavra];
            }
        }
        return {
            "matemática": "A matemática é incrível! Precisa de ajuda com equações ou conceitos?",
            "história": "A história nos ensina sobre o passado. Algum período específico te interessa?",
            "cálculo": "O cálculo envolve derivadas e integrais. Quer um exemplo de aplicação?",
            "ciências": "A ciência explica o mundo ao nosso redor! Alguma área específica, como biologia ou física?",
            "programação": "A programação é essencial hoje em dia! Quer dicas sobre JavaScript?",
            "geografia": "A geografia estuda o planeta Terra. Alguma dúvida sobre países ou climas?",
            "física": "A física estuda as leis do universo. Alguma dúvida sobre movimento ou energia?",
            "default": "Não entendi sua pergunta. Tente reformular ou perguntar sobre temas como matemática, história, ciências ou programação!"
        }["default"];
    }

    botaoEnviar.addEventListener("click", function () {
        const perguntaTexto = perguntaInput.value.trim();
        
        if (perguntaTexto !== "") {
            respostaChatbot.innerHTML += `<p><strong>Você:</strong> ${perguntaTexto}</p>`;
            respostaChatbot.innerHTML += `<p><strong>Chatbot:</strong> ${obterResposta(perguntaTexto)}</p>`;
            perguntaInput.value = ""; // Limpa o campo de entrada
        }
    });

    // Botão para voltar à página anterior
    const botaoVoltar = document.getElementById("voltar");
    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function () {
            if (document.referrer) {
                window.history.back();
            } else {
                window.location.href = "../index.html";
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const botaoVoltar = document.getElementById("voltar");

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function() {
            if (window.history.length > 1) {
                window.history.back(); // Volta para a página anterior
            } else {
                window.location.href = "../index.html"; // Caso não tenha histórico, retorna à página inicial
            }
        });
    }
});