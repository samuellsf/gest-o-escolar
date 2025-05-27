document.getElementById("formProfessor").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const disciplina = document.getElementById("disciplina").value;

    let novoProfessor = document.createElement("li");
    novoProfessor.innerText = `Professor: ${nome} - Disciplina: ${disciplina}`;
    document.getElementById("listaProfessores").appendChild(novoProfessor);

    document.getElementById("formProfessor").reset();
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