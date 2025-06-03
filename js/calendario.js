document.addEventListener('DOMContentLoaded', () => {
    const eventoForm = document.getElementById('eventoForm');
    const listaEventos = document.getElementById('listaEventos');
    const btnListar = document.getElementById('listarEventos');
    const btnBuscar = document.getElementById('buscarEvento');

    let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    let editIndex = -1; // índice do evento que está sendo editado

    // Função para salvar ou editar evento
    eventoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value.trim();
        const data = document.getElementById('data').value;
        const descricao = document.getElementById('descricao').value.trim();

        if (!titulo || !data || !descricao) {
            alert('Preencha todos os campos!');
            return;
        }

        const novoEvento = { titulo, data, descricao };

        if (editIndex === -1) {
            // Adicionar novo evento
            eventos.push(novoEvento);
            alert('Evento adicionado com sucesso!');
        } else {
            // Editar evento existente
            eventos[editIndex] = novoEvento;
            alert('Evento atualizado com sucesso!');
            editIndex = -1; // resetar índice de edição
            eventoForm.querySelector('button[type="submit"]').textContent = 'Adicionar Evento'; // mudar texto do botão
        }

        localStorage.setItem('eventos', JSON.stringify(eventos));
        eventoForm.reset();
        exibirEventos();
    });

    // Função para listar eventos
    btnListar.addEventListener('click', () => {
        exibirEventos();
    });

    // Função para buscar evento
    btnBuscar.addEventListener('click', () => {
        const termo = prompt("Digite o título do evento que deseja buscar:");
        if (!termo) return;

        const filtrados = eventos.filter(e => e.titulo.toLowerCase().includes(termo.toLowerCase()));

        if (filtrados.length === 0) {
            listaEventos.innerHTML = `<li>Nenhum evento encontrado com o título: <strong>${termo}</strong></li>`;
        } else {
            exibirEventos(filtrados);
        }
    });

    function exibirEventos(eventosList = eventos) {
        listaEventos.innerHTML = "";

        if (eventosList.length === 0) {
            listaEventos.innerHTML = "<li>Nenhum evento cadastrado.</li>";
            return;
        }

        eventosList.forEach((evento, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${evento.titulo}</strong> - ${evento.data}<br>
                <em>${evento.descricao}</em><br>
                <button class="editar-btn" data-index="${index}">Editar</button>
                <button class="excluir-btn" data-index="${index}">Excluir</button>
            `;
            listaEventos.appendChild(li);
        });

        // Eventos dos botões Editar
        document.querySelectorAll('.editar-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                carregarEventoParaEdicao(idx);
            });
        });

        // Eventos dos botões Excluir
        document.querySelectorAll('.excluir-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                if (confirm('Tem certeza que deseja excluir este evento?')) {
                    eventos.splice(idx, 1);
                    localStorage.setItem('eventos', JSON.stringify(eventos));
                    exibirEventos();
                }
            });
        });
    }

    function carregarEventoParaEdicao(index) {
        const evento = eventos[index];
        document.getElementById('titulo').value = evento.titulo;
        document.getElementById('data').value = evento.data;
        document.getElementById('descricao').value = evento.descricao;
        editIndex = index;
        eventoForm.querySelector('button[type="submit"]').textContent = 'Salvar Alterações';
    }
btnListar.addEventListener('click', () => {
    exibirEventos(eventos);
});

    // Exibe os eventos inicialmente
    exibirEventos();
});
