document.getElementById("formBoletim").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página ao enviar o formulário

    const aluno = document.getElementById("aluno").value;
    const disciplina = document.getElementById("disciplina").value;
    const nota = document.getElementById("nota").value;

    if (aluno.trim() === "" || nota.trim() === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    let novoBoletim = document.createElement("li");
    novoBoletim.innerHTML = `<strong>Aluno:</strong> ${aluno} | <strong>Disciplina:</strong> ${disciplina} | <strong>Nota:</strong> ${nota}`;

    document.getElementById("listaBoletins").appendChild(novoBoletim);

    document.getElementById("formBoletim").reset();
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