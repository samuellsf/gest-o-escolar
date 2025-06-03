const formAluno = document.getElementById('formAluno');
const listaAlunos = document.getElementById('listaAlunos');
const buscarAlunosBtn = document.getElementById('buscarAlunos');
buscarAlunosBtn.addEventListener('click', listarAlunos);

let editandoIndex = null;

// Obtém disciplinas selecionadas no select multiple
function obterDisciplinasSelecionadas() {
    const select = document.getElementById('disciplinas');
    return Array.from(select.selectedOptions).map(option => option.value);
}

// Salva array de alunos no localStorage
function salvarAlunos(alunos) {
    localStorage.setItem('alunos', JSON.stringify(alunos));
}

// Carrega lista de alunos do localStorage
function carregarAlunos() {
    return JSON.parse(localStorage.getItem('alunos')) || [];
}

// Exibe lista de alunos no HTML com todos os campos
function listarAlunos() {
    listaAlunos.innerHTML = '';
    const alunos = carregarAlunos();

    if (alunos.length === 0) {
        listaAlunos.innerHTML = `<li style="text-align:center; padding: 20px;">Nenhum aluno cadastrado ainda.</li>`;
        return;
    }

    alunos.forEach((aluno, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <span><strong>${aluno.nome}</strong></span>
            <span>Matrícula: ${aluno.matricula}</span>
            <span>Série: ${aluno.serie}</span>
            <span>Ano: ${aluno.ano}</span>
            <span>Turma: ${aluno.turma}</span>
            <span>Data de Nascimento: ${aluno.dataNascimento}</span>
            <span>Email: ${aluno.email}</span>
            <span>Telefone: ${aluno.telefone}</span>
            <span>Endereço: ${aluno.endereco}</span>
            <span>Responsável: ${aluno.responsavel}</span>
            <span>Telefone do Responsável: ${aluno.telefoneResponsavel}</span>
            <span>Disciplinas: ${aluno.disciplinas.join(', ')}</span>
            <div>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="removerAluno(${index})">Excluir</button>
            </div>
        `;
        listaAlunos.appendChild(item);
    });
}

// Preenche o formulário para editar aluno existente
function editarAluno(index) {
    const alunos = carregarAlunos();
    const aluno = alunos[index];

    document.getElementById('nome').value = aluno.nome;
    document.getElementById('matricula').value = aluno.matricula;
    document.getElementById('serie').value = aluno.serie;
    document.getElementById('ano').value = aluno.ano;
    document.getElementById('dataNascimento').value = aluno.dataNascimento;
    document.getElementById('email').value = aluno.email;
    document.getElementById('telefone').value = aluno.telefone;
    document.getElementById('endereco').value = aluno.endereco;
    document.getElementById('responsavel').value = aluno.responsavel;
    document.getElementById('telefoneResponsavel').value = aluno.telefoneResponsavel;
    document.getElementById('turma').value = aluno.turma;

    // Seleciona as disciplinas no select multiple
    const select = document.getElementById('disciplinas');
    Array.from(select.options).forEach(option => {
        option.selected = aluno.disciplinas.includes(option.value);
    });

    editandoIndex = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Remove aluno da lista e do localStorage
function removerAluno(index) {
    const alunos = carregarAlunos();
    if (confirm(`Deseja realmente excluir ${alunos[index].nome}?`)) {
        alunos.splice(index, 1);
        salvarAlunos(alunos);
        listarAlunos();
    }
}

// Quando o formulário for enviado (cadastrar ou atualizar)
formAluno.addEventListener('submit', function (event) {
    event.preventDefault();

    const aluno = {
        nome: document.getElementById('nome').value.trim(),
        matricula: document.getElementById('matricula').value.trim(),
        serie: document.getElementById('serie').value.trim(),
        ano: document.getElementById('ano').value,
        disciplinas: obterDisciplinasSelecionadas(),
        dataNascimento: document.getElementById('dataNascimento').value,
        email: document.getElementById('email').value.trim(),
        telefone: document.getElementById('telefone').value.trim(),
        endereco: document.getElementById('endereco').value.trim(),
        responsavel: document.getElementById('responsavel').value.trim(),
        telefoneResponsavel: document.getElementById('telefoneResponsavel').value.trim(),
        turma: document.getElementById('turma').value
    };

    const alunos = carregarAlunos();

    if (editandoIndex !== null) {
        alunos[editandoIndex] = aluno;
        alert('Aluno atualizado com sucesso!');
        editandoIndex = null;
    } else {
        alunos.push(aluno);
        alert('Aluno cadastrado com sucesso!');
    }

    salvarAlunos(alunos);
    formAluno.reset();
    listarAlunos();
});

// Botão "Buscar Alunos" carrega a lista
buscarAlunosBtn.addEventListener('click', function () {
    const filtro = document.getElementById('filtroAluno').value.trim().toLowerCase();
    const alunos = carregarAlunos();

    const filtrados = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(filtro) ||
        aluno.matricula.toLowerCase().includes(filtro)
    );

    function listarAlunos(listaFiltrada = null) {
    listaAlunos.innerHTML = '';
    const alunos = listaFiltrada || carregarAlunos();

    if (alunos.length === 0) {
        listaAlunos.innerHTML = `<li style="text-align:center; padding: 20px;">Nenhum aluno encontrado.</li>`;
        return;
    }

    alunos.forEach((aluno, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <span><strong>${aluno.nome}</strong></span>
            <span>Matrícula: ${aluno.matricula}</span>
            <span>Série: ${aluno.serie}</span>
            <span>Ano: ${aluno.ano}</span>
            <span>Turma: ${aluno.turma}</span>
            <span>Data de Nascimento: ${aluno.dataNascimento}</span>
            <span>Email: ${aluno.email}</span>
            <span>Telefone: ${aluno.telefone}</span>
            <span>Endereço: ${aluno.endereco}</span>
            <span>Responsável: ${aluno.responsavel}</span>
            <span>Telefone do Responsável: ${aluno.telefoneResponsavel}</span>
            <span>Disciplinas: ${aluno.disciplinas.join(', ')}</span>
            <div>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="removerAluno(${index})">Excluir</button>
            </div>
        `;
        listaAlunos.appendChild(item);
    });
}

});

// Carrega lista automaticamente ao carregar página
document.addEventListener('DOMContentLoaded', listarAlunos);

// Torna as funções editar/remover globais para uso no onclick inline
window.editarAluno = editarAluno;
window.removerAluno = removerAluno;
