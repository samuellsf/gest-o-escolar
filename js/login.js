document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    const usuarios = {
        "admin": "admin123",
        "professor": "prof123",
        "aluno": "aluno123"
    };

    if (usuarios[usuario] && usuarios[usuario] === senha) {
        alert("Login bem-sucedido!");
        window.location.href = "../pages/dashboard.html";
    } else {
        document.getElementById("mensagemErro").innerText = "Usuário ou senha inválidos.";
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