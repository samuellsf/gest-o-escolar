document.getElementById("matriculaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const turma = document.getElementById("turma").value;

    let item = document.createElement("li");
    item.innerText = `Aluno: ${nome} - Turma: ${turma}`;
    document.getElementById("listaMatriculados").appendChild(item);
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