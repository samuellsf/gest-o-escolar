// secretaria.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSolicitacao");
  const listaSolicitacoes = document.getElementById("listaSolicitacoes");
  const btnListar = document.getElementById("listarSolicitacoes");
  const btnBuscar = document.getElementById("buscarSolicitacao");
  const btnRemover = document.getElementById("removerSolicitacao");

  let solicitacoes = [];

  function exibirSolicitacoes(lista) {
    listaSolicitacoes.innerHTML = "";
    if (lista.length === 0) {
      listaSolicitacoes.innerHTML = "<li>Nenhuma solicitação encontrada.</li>";
      return;
    }
    lista.forEach((sol) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Nome:</strong> ${sol.nome} <br>
        <strong>Tipo:</strong> ${sol.tipo} <br>
        <strong>Descrição:</strong> ${sol.descricao}
      `;
      listaSolicitacoes.appendChild(li);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const tipo = form.tipo.value;
    const descricao = form.descricao.value.trim();

    if (!nome || !descricao) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    solicitacoes.push({ nome, tipo, descricao });
    alert("Solicitação enviada com sucesso!");
    form.reset();
    exibirSolicitacoes(solicitacoes);
  });

  btnListar.addEventListener("click", () => {
    exibirSolicitacoes(solicitacoes);
  });

  btnBuscar.addEventListener("click", () => {
    const nomeBusca = prompt("Digite o nome para buscar a solicitação:");
    if (!nomeBusca) return;
    const resultados = solicitacoes.filter(sol =>
      sol.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );
    exibirSolicitacoes(resultados);
  });

  btnRemover.addEventListener("click", () => {
    const nomeRemover = prompt("Digite o nome da solicitação a remover:");
    if (!nomeRemover) return;

    const index = solicitacoes.findIndex(sol =>
      sol.nome.toLowerCase() === nomeRemover.toLowerCase()
    );

    if (index === -1) {
      alert("Solicitação não encontrada.");
    } else {
      solicitacoes.splice(index, 1);
      alert("Solicitação removida com sucesso.");
      exibirSolicitacoes(solicitacoes);
    }
  });
});
// Botão Voltar
document.getElementById("voltar").addEventListener("click", function() {
    window.history.back(); 
});
