document.getElementById("formSolicitacao").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const descricao = document.getElementById("descricao").value;

    // Criar um novo item de solicitação
    let novaSolicitacao = document.createElement("li");
    novaSolicitacao.innerHTML = `<strong>Nome:</strong> ${nome} | <strong>Tipo:</strong> ${tipo} | <strong>Descrição:</strong> ${descricao}`;

    document.getElementById("listaSolicitacoes").appendChild(novaSolicitacao);

    // Limpar o formulário após envio
    document.getElementById("formSolicitacao").reset();
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