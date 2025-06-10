document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formProfessor");
  const lista = document.getElementById("listaProfessores");
  const btnListar = document.getElementById("btnListarProfessores");
  const btnBuscar = document.getElementById("buscarProfessor");
  const btnRemover = document.getElementById("removerProfessor");

  // Envia formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const disciplina = form.disciplina.value;

    if (!nome || !disciplina) {
      alert("Preencha todos os campos.");
      return;
    }

    const professores = getProfessores();
    const jaExiste = professores.some(p => p.nome.toLowerCase() === nome.toLowerCase());

    if (jaExiste) {
      alert("Este professor já está cadastrado.");
      return;
    }

    const dataHora = new Date().toLocaleString("pt-BR");
    professores.push({ nome, disciplina, dataHora });

    salvarProfessores(professores);
    form.reset();
    alert("Professor cadastrado com sucesso!");
    renderizarProfessores();
  });

  // Listar professores
  btnListar.addEventListener("click", renderizarProfessores);

  // Buscar professor por nome
  btnBuscar.addEventListener("click", () => {
    const nome = prompt("Digite o nome do professor a buscar:");
    if (!nome) return;

    const professores = getProfessores();
    const resultado = professores.find(p => p.nome.toLowerCase() === nome.toLowerCase());

    if (resultado) {
      alert(`Encontrado: ${resultado.nome} - ${resultado.disciplina}`);
    } else {
      alert("Professor não encontrado.");
    }
  });

  // Remover professor por nome
  btnRemover.addEventListener("click", () => {
    const nome = prompt("Digite o nome do professor a remover:");
    if (!nome) return;

    let professores = getProfessores();
    const inicial = professores.length;
    professores = professores.filter(p => p.nome.toLowerCase() !== nome.toLowerCase());

    if (professores.length === inicial) {
      alert("Professor não encontrado.");
    } else {
      salvarProfessores(professores);
      alert("Professor removido.");
      renderizarProfessores();
    }
  });

  document.getElementById("voltar").addEventListener("click", voltarParaLobby);

  // Carrega a lista ao iniciar
  renderizarProfessores();
});

function getProfessores() {
  return JSON.parse(localStorage.getItem("professores")) || [];
}

function salvarProfessores(lista) {
  localStorage.setItem("professores", JSON.stringify(lista));
}

function renderizarProfessores() {
  const professores = getProfessores();
  const lista = document.getElementById("listaProfessores");
  lista.innerHTML = "";

  if (professores.length === 0) {
    lista.innerHTML = "<p>Nenhum professor cadastrado.</p>";
    return;
  }

  const container = document.createElement("div");
  container.className = "bolhas-professores";

  professores.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "bolha";
    div.innerHTML = `
      <strong>${p.nome}</strong>
      <span class="tag">${p.disciplina}</span>
      <small class="data-hora">Cadastrado em: ${p.dataHora || "Data desconhecida"}</small>
    `;

    const botoes = document.createElement("div");
    botoes.className = "botoes-bolha";

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "botao-editar";
    btnEditar.onclick = () => editarProfessor(index);

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.className = "botao-excluir";
    btnExcluir.onclick = () => excluirProfessor(index);

    botoes.appendChild(btnEditar);
    botoes.appendChild(btnExcluir);

    div.appendChild(botoes);
    container.appendChild(div);
  });

  lista.appendChild(container);
}

function editarProfessor(index) {
  const lista = getProfessores();
  const professor = lista[index];

  document.getElementById("nome").value = professor.nome;
  document.getElementById("disciplina").value = professor.disciplina;

  lista.splice(index, 1);
  salvarProfessores(lista);
  renderizarProfessores();
}

function excluirProfessor(index) {
  const lista = getProfessores();
  if (confirm("Tem certeza que deseja excluir este professor?")) {
    lista.splice(index, 1);
    salvarProfessores(lista);
    renderizarProfessores();
  }
}

function voltarParaLobby() {
  window.location.href = "index.html";
}
