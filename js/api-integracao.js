// Simulação de consulta a uma API de alunos e exibição na página
async function buscarAlunos() {
    try {
        const response = await fetch("https://api.exemplo.com/alunos"); // URL fictícia
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const dados = await response.json();

        const listaAlunos = document.getElementById("listaAlunos"); // Pegando o elemento HTML da lista

        listaAlunos.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

        dados.forEach(aluno => {
            const li = document.createElement("li");
            li.textContent = `${aluno.nome} - Matrícula: ${aluno.matricula}`;
            listaAlunos.appendChild(li); // Adiciona aluno à lista
        });

    } catch (error) {
        console.error("Erro ao buscar alunos:", error.message);
    }
}

// Adicionando evento ao botão
document.getElementById("buscarAlunos").addEventListener("click", buscarAlunos);


// Simulação de envio de e-mail via API externa
async function enviarEmail(destinatario, assunto, mensagem) {
    try {
        const response = await fetch("https://api.exemplo.com/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ destinatario, assunto, mensagem })
        });

        if (response.ok) {
            console.log("E-mail enviado com sucesso para:", destinatario);
        } else {
            console.error("Falha ao enviar e-mail.");
        }
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
    }
}

// Simulação de API de geolocalização de escolas
async function buscarEscolasPorLocalizacao(lat, lon) {
    try {
        const response = await fetch(`https://api.exemplo.com/escolas?lat=${lat}&lon=${lon}`);
        const dados = await response.json();
        console.log("Escolas próximas:", dados);
    } catch (error) {
        console.error("Erro ao buscar escolas:", error);
    }
}

// Chamadas simuladas
buscarAlunos();
enviarEmail("exemplo@escola.com", "Aviso Escolar", "Olá, segue seu boletim atualizado.");
buscarEscolasPorLocalizacao(-15.7801, -47.9292);
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



