// Função para voltar para a página inicial
function voltarParaLobby() {
  window.location.href = "index.html";
}

// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  // Se os elementos existirem, adiciona a funcionalidade
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const isVisible = menu.style.display === "block";
      menu.style.display = isVisible ? "none" : "block";
      menu.classList.toggle("menu-aberto", !isVisible);
    });
  }
});
