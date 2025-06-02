document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "#FFD700";
        });

        link.addEventListener("mouseout", () => {
            link.style.color = "white"; 
        });

        
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const botaoVoltar = document.getElementById("voltar");

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function() {
            if (window.history.length > 1) {
                window.history.back(); 
            } else {
                window.location.href = "../index.html"; 
            }
        });
    }
});
document.getElementById('menu-toggle').addEventListener('click', function () {
    var menu = document.getElementById('menu');
    
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        menu.classList.remove('menu-aberto'); 
    } else {
        menu.style.display = 'block';
        menu.classList.add('menu-aberto');
    }
});


<script>
    function voltarParaLobby() {
        window.location.href == window.location.origin + "index.html"
    }
</script>

document.getElementById("enviarPergunta").addEventListener("click", responderPergunta);

window.location.href = "pages/index.html";
const mensagem = document.getElementById('mensagens').value;

