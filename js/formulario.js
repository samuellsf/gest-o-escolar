// Redireciona para o lobby
function voltarParaLobby() {
  window.location.href = "index.html";
}

// Botão Voltar
document.getElementById("voltar").addEventListener("click", () => {
  window.history.back();
});

// Array de professores
let professores = [];
carregarProfessores(); // Carrega do localStorage ao iniciar

// Atualiza a lista de professores no HTML
function atualizarLista() {
  const lista = document.getElementById("listaProfessores");
  lista.innerHTML = "";

  if (professores.length === 0) {
    lista.innerHTML = "<p>Nenhum professor cadastrado.</p>";
    return;
  }

  professores.forEach((prof, index) => {
    const bolha = document.createElement("div");
    bolha.className = "bolha";

    bolha.innerHTML = `
      <strong>${prof.nome}</strong><br>
      <span class="tag">${prof.disciplina}</span><br>
      <small>Registrado em: ${prof.dataRegistro}</small>
      <div class="botoes-bolha">
        <button class="botao-editar" onclick="editarProfessor(${index})">Editar</button>
        <button class="botao-excluir" onclick="excluirProfessor(${index})">Excluir</button>
      </div>
    `;

    lista.appendChild(bolha);
  });
}

// Cadastrar novo professor
document.getElementById("formProfessor").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const disciplina = document.getElementById("disciplina").value;

  if (!nome || !disciplina) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const dataRegistro = new Date().toLocaleString("pt-BR");
  professores.push({ nome, disciplina, dataRegistro });
  salvarProfessores();
  atualizarLista();
  this.reset();
  alert("Professor cadastrado com sucesso!");
});

// Listar professores
document.getElementById("listarProfessores").addEventListener("click", () => {
  if (professores.length === 0) {
    alert("Nenhum professor cadastrado.");
    return;
  }

  const lista = professores.map(
    (p, i) => `#${i + 1} - Nome: ${p.nome}\nDisciplina: ${p.disciplina}\nRegistrado em: ${p.dataRegistro}`
  ).join("\n\n");

  alert("Professores cadastrados:\n\n" + lista);
});

// Buscar professor
document.getElementById("buscarProfessor").addEventListener("click", () => {
  const termo = prompt("Digite o nome ou disciplina para buscar:");
  if (!termo) return;

  const encontrados = professores.filter(p =>
    p.nome.toLowerCase().includes(termo.toLowerCase()) ||
    p.disciplina.toLowerCase().includes(termo.toLowerCase())
  );

  if (encontrados.length === 0) {
    alert("Nenhum professor encontrado.");
    return;
  }

  const lista = encontrados.map(
    (p) => `Nome: ${p.nome}\nDisciplina: ${p.disciplina}\nRegistrado em: ${p.dataRegistro}`
  ).join("\n\n");

  alert("Professores encontrados:\n\n" + lista);
});

// Remover professor
document.getElementById("removerProfessor").addEventListener("click", () => {
  const termo = prompt("Digite o nome do professor que deseja remover:");
  if (!termo) return;

  const antes = professores.length;
  professores = professores.filter(p =>
    !p.nome.toLowerCase().includes(termo.toLowerCase())
  );

  if (professores.length === antes) {
    alert("Nenhum professor removido.");
  } else {
    salvarProfessores();
    atualizarLista();
    alert("Professor(es) removido(s) com sucesso!");
  }
});

// Editar professor
function editarProfessor(index) {
  const atual = professores[index];
  const novoNome = prompt("Editar nome:", atual.nome);
  if (!novoNome) return;

  const novaDisciplina = prompt("Editar disciplina:", atual.disciplina);
  if (!novaDisciplina) return;

  professores[index] = {
    nome: novoNome.trim(),
    disciplina: novaDisciplina.trim(),
    dataRegistro: atual.dataRegistro
  };

  salvarProfessores();
  atualizarLista();
  alert("Professor editado com sucesso!");
}

// Excluir professor individual
function excluirProfessor(index) {
  const confirmado = confirm(`Deseja excluir ${professores[index].nome}?`);
  if (!confirmado) return;

  professores.splice(index, 1);
  salvarProfessores();
  atualizarLista();
  alert("Professor excluído.");
}

// LocalStorage - salvar
function salvarProfessores() {
  localStorage.setItem("professores", JSON.stringify(professores));
}

// LocalStorage - carregar
function carregarProfessores() {
  const dados = localStorage.getItem("professores");
  if (dados) {
    professores = JSON.parse(dados);
  }
}
// Abrir/fechar menu com botão hamburguer
document.getElementById("menuToggle").addEventListener("click", function () {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("ativo");
});

// Inicializar lista ao carregar
atualizarLista();
