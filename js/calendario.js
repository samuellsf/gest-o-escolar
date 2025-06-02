document.addEventListener('DOMContentLoaded', () => {
    const eventoForm = document.getElementById('eventoForm');
    const listaEventos = document.getElementById('listaEventos');
    const btnListar = document.getElementById('listarEventos');
    const btnBuscar = document.getElementById('buscarEvento');

    // Função para salvar evento
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

        let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        eventos.push(novoEvento);
        localStorage.setItem('eventos', JSON.stringify(eventos));

        alert('Evento adicionado com sucesso!');
        eventoForm.reset();
    });

    // Função para listar eventos
    btnListar.addEventListener('click', () => {
        exibirEventos();
    });

    // Função para buscar evento
    btnBuscar.addEventListener('click', () => {
        const termo = prompt("Digite o título do evento que deseja buscar:");
        if (!termo) return;

        const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        const filtrados = eventos.filter(e => e.titulo.toLowerCase().includes(termo.toLowerCase()));

        if (filtrados.length === 0) {
            listaEventos.innerHTML = `<li>Nenhum evento encontrado com o título: <strong>${termo}</strong></li>`;
        } else {
            exibirEventos(filtrados);
        }
    });

    function exibirEventos(eventos = JSON.parse(localStorage.getItem('eventos')) || []) {
        listaEventos.innerHTML = "";

        if (eventos.length === 0) {
            listaEventos.innerHTML = "<li>Nenhum evento cadastrado.</li>";
            return;
        }

        eventos.forEach((evento, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${evento.titulo}</strong> - ${evento.data}<br>
                <em>${evento.descricao}</em>
            `;
            listaEventos.appendChild(li);
        });
    }

});
