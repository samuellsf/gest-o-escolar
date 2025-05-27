document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "#FFD700"; // Muda cor ao passar mouse
        });

        link.addEventListener("mouseout", () => {
            link.style.color = "white"; // Volta ao normal
        });

        
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
document.getElementById('menu-toggle').addEventListener('click', function () {
    var menu = document.getElementById('menu');
    
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        menu.classList.remove('menu-aberto'); // Remove classe quando fecha
    } else {
        menu.style.display = 'block';
        menu.classList.add('menu-aberto'); // Adiciona classe quando abre
    }
});

