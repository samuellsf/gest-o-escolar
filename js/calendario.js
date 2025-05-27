const eventos = [
    { titulo: "Reunião de Pais", data: "2025-06-10" },
    { titulo: "Prova de Matemática", data: "2025-06-15" },
];

const listaEventos = document.getElementById("listaEventos");

eventos.forEach(evento => {
    let item = document.createElement("li");
    item.innerText = `${evento.titulo} - ${evento.data}`;
    listaEventos.appendChild(item);
});

document.getElementById("eventoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const data = document.getElementById("data").value;

    let novoEvento = document.createElement("li");
    novoEvento.innerText = `${titulo} - ${data}`;
    listaEventos.appendChild(novoEvento);
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