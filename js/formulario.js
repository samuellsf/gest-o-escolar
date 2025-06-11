let mensagens = [];
carregarMensagens();
atualizarListaMensagens();

// Adicionar mensagem
document.getElementById("adicionarMensagem").addEventListener("click", () => {
  const conteudo = prompt("Digite a mensagem:");
  if (!conteudo) return;

  const dataRegistro = new Date().toLocaleString("pt-BR");
  mensagens.push({ conteudo, dataRegistro });
  salvarMensagens();
  atualizarListaMensagens();
  alert("Mensagem adicionada com sucesso!");
});

// Listar mensagens
document.getElementById("listarMensagens").addEventListener("click", () => {
  if (mensagens.length === 0) {
    alert("Nenhuma mensagem cadastrada.");
    return;
  }

  const lista = mensagens.map(
    (m, i) => `#${i + 1} - ${m.conteudo}\nRegistrada em: ${m.dataRegistro}`
  ).join("\n\n");

  alert("Mensagens cadastradas:\n\n" + lista);
});

// Buscar mensagem
document.getElementById("buscarMensagem").addEventListener("click", () => {
  const termo = prompt("Digite um trecho da mensagem para buscar:");
  if (!termo) return;

  const encontradas = mensagens.filter(m =>
    m.conteudo.toLowerCase().includes(termo.toLowerCase())
  );

  if (encontradas.length === 0) {
    alert("Nenhuma mensagem encontrada.");
    return;
  }

  const lista = encontradas.map(
    (m) => `Mensagem: ${m.conteudo}\nRegistrada em: ${m.dataRegistro}`
  ).join("\n\n");

  alert("Mensagens encontradas:\n\n" + lista);
});

// Remover mensagem
document.getElementById("removerMensagem").addEventListener("click", () => {
  const termo = prompt("Digite um trecho da mensagem que deseja remover:");
  if (!termo) return;

  const antes = mensagens.length;
  mensagens = mensagens.filter(m =>
    !m.conteudo.toLowerCase().includes(termo.toLowerCase())
  );

  if (mensagens.length === antes) {
    alert("Nenhuma mensagem removida.");
  } else {
    salvarMensagens();
    atualizarListaMensagens();
    alert("Mensagem(ns) removida(s) com sucesso!");
  }
});

// Funções de localStorage
function salvarMensagens() {
  localStorage.setItem("mensagens", JSON.stringify(mensagens));
}

function carregarMensagens() {
  const dados = localStorage.getItem("mensagens");
  if (dados) mensagens = JSON.parse(dados);
}

// Atualizar lista visual (caso deseje exibir no HTML)
function atualizarListaMensagens() {
  const lista = document.getElementById("listaMensagens");
  if (!lista) return;

  lista.innerHTML = "";
  if (mensagens.length === 0) {
    lista.innerHTML = "<p>Nenhuma mensagem cadastrada.</p>";
    return;
  }

  mensagens.forEach((msg, index) => {
    const div = document.createElement("div");
    div.className = "bolha";
    div.innerHTML = `
      <p>${msg.conteudo}</p>
      <small>Registrada em: ${msg.dataRegistro}</small>
    `;
    lista.appendChild(div);
  });
}
function voltarParaLobby() {
    window.location.href = "../pages/index.html"; 
}


document.getElementById("voltar").addEventListener("click", function () {
    window.history.back();
});

