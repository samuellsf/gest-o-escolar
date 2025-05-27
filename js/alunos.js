document.addEventListener("DOMContentLoaded", function() {
    const formAluno = document.getElementById("formAluno");
    const listaAlunos = document.getElementById("listaAlunos");

    // Evento de envio do formulário
    formAluno.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita recarregar a página ao enviar

        const nome = document.getElementById("nome").value;
        const turma = document.getElementById("turma").value;

        if (nome.trim() === "") {
            alert("O nome do aluno não pode estar vazio!");
            return;
        }

        // Criando um novo item na lista
        let novoAluno = document.createElement("li");
        novoAluno.innerHTML = `<strong>Aluno:</strong> ${nome} | <strong>Turma:</strong> ${turma}`;

        listaAlunos.appendChild(novoAluno);

        // Limpa o formulário
        formAluno.reset();
    });
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