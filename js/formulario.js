function voltarParaLobby() {
    window.location.href = "index.html";
}

document.getElementById('voltar').addEventListener('click', function () {
    window.history.back();
});

// Array para guardar mensagens como objetos {nome, email, mensagem}
let mensagensArray = [];

// Atualiza textarea com todas as mensagens cadastradas
function atualizarTextarea() {
    const textarea = document.getElementById('mensagens');
    if (mensagensArray.length === 0) {
        textarea.value = 'Nenhuma mensagem cadastrada.';
        return;
    }

    textarea.value = mensagensArray.map((m, i) => 
        `#${i+1} - Nome: ${m.nome}\nEmail: ${m.email}\nMensagem: ${m.mensagem}\n---`
    ).join('\n');
}

// Evento Enviar formulário (botão Enviar)
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagemTexto = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagemTexto) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    mensagensArray.push({ nome: nome, email: email, mensagem: mensagemTexto });
    atualizarTextarea();

    alert(`Formulário enviado!\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagemTexto}`);

    this.reset();
});

// Botão Adicionar Mensagem — adiciona via prompt
document.getElementById('adicionarMensagem').addEventListener('click', function () {
    const nome = prompt('Digite o nome da mensagem:');
    if (!nome) return alert('Nome inválido!');

    const email = prompt('Digite o email da mensagem:');
    if (!email) return alert('Email inválido!');

    const mensagem = prompt('Digite o texto da mensagem:');
    if (!mensagem) return alert('Mensagem inválida!');

    mensagensArray.push({ nome, email, mensagem });
    atualizarTextarea();
    alert('Mensagem adicionada com sucesso!');
});

// Botão Listar Mensagens — alerta com todas as mensagens
document.getElementById('listarMensagens').addEventListener('click', function () {
    if (mensagensArray.length === 0) {
        alert('Nenhuma mensagem cadastrada.');
        return;
    }

    const lista = mensagensArray.map((m, i) => 
        `#${i+1} - Nome: ${m.nome}\nEmail: ${m.email}\nMensagem: ${m.mensagem}`
    ).join('\n\n');

    alert('Mensagens cadastradas:\n\n' + lista);
});

// Botão Buscar Mensagem — busca por texto em nome, email ou mensagem
document.getElementById('buscarMensagem').addEventListener('click', function () {
    const termo = prompt('Digite o texto para buscar nas mensagens:');
    if (!termo) return;

    const resultados = mensagensArray.filter(m => 
        m.nome.toLowerCase().includes(termo.toLowerCase()) ||
        m.email.toLowerCase().includes(termo.toLowerCase()) ||
        m.mensagem.toLowerCase().includes(termo.toLowerCase())
    );

    if (resultados.length === 0) {
        alert('Nenhuma mensagem encontrada com esse termo.');
        return;
    }

    const lista = resultados.map((m, i) => 
        `Nome: ${m.nome}\nEmail: ${m.email}\nMensagem: ${m.mensagem}`
    ).join('\n\n');

    alert('Mensagens encontradas:\n\n' + lista);
});

// Botão Remover Mensagem — remove mensagens que contenham termo em nome, email ou mensagem
document.getElementById('removerMensagem').addEventListener('click', function () {
    const termo = prompt('Digite o texto da mensagem que deseja remover:');
    if (!termo) return;

    const novaLista = mensagensArray.filter(m => 
        !(
            m.nome.toLowerCase().includes(termo.toLowerCase()) ||
            m.email.toLowerCase().includes(termo.toLowerCase()) ||
            m.mensagem.toLowerCase().includes(termo.toLowerCase())
        )
    );

    if (novaLista.length === mensagensArray.length) {
        alert('Nenhuma mensagem removida (não encontrada).');
        return;
    }

    mensagensArray = novaLista;
    atualizarTextarea();
    alert('Mensagem(s) removida(s) com sucesso!');
});

// Inicializa textarea vazia ao carregar a página
atualizarTextarea();
