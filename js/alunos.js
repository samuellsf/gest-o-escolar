document.addEventListener("DOMContentLoaded", function() {
    const formAluno = document.getElementById("formAluno");
    const listaAlunos = document.getElementById("listaAlunos");
    const botaoBuscar = document.getElementById("buscarAlunos");

    const STORAGE_KEY = "alunosCadastro";

    let alunos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Variável para controlar edição
    let alunoEditandoIndex = null;

    function salvarAlunos() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
    }

    function preencherFormulario(aluno) {
        document.getElementById("nome").value = aluno.nome;
        document.getElementById("matricula").value = aluno.matricula;
        document.getElementById("serie").value = aluno.serie;
        document.getElementById("ano").value = aluno.ano;

        const disciplinasSelect = document.getElementById("disciplinas");
        // Limpa seleção anterior
        for (let i = 0; i < disciplinasSelect.options.length; i++) {
            disciplinasSelect.options[i].selected = aluno.disciplinas.includes(disciplinasSelect.options[i].value);
        }

        document.getElementById("dataNascimento").value = aluno.dataNascimento;
        document.getElementById("email").value = aluno.email;
        document.getElementById("telefone").value = aluno.telefone;
        document.getElementById("endereco").value = aluno.endereco;
        document.getElementById("responsavel").value = aluno.responsavel;
        document.getElementById("telefoneResponsavel").value = aluno.telefoneResponsavel;
        document.getElementById("turma").value = aluno.turma;
    }

    function renderizarLista(alunosParaMostrar) {
        listaAlunos.innerHTML = "";

        if (alunosParaMostrar.length === 0) {
            listaAlunos.innerHTML = "<li>Nenhum aluno cadastrado.</li>";
            return;
        }

        alunosParaMostrar.forEach((aluno, index) => {
            const li = document.createElement("li");

            const disciplinasStr = aluno.disciplinas.join(", ");

            li.innerHTML = `
                <strong>Nome:</strong> ${aluno.nome} |
                <strong>Matrícula:</strong> ${aluno.matricula} |
                <strong>Série:</strong> ${aluno.serie} |
                <strong>Ano:</strong> ${aluno.ano} |
                <strong>Disciplinas:</strong> ${disciplinasStr} |
                <strong>Data Nasc.:</strong> ${aluno.dataNascimento} |
                <strong>Email:</strong> ${aluno.email} |
                <strong>Telefone:</strong> ${aluno.telefone} |
                <strong>Endereço:</strong> ${aluno.endereco} |
                <strong>Responsável:</strong> ${aluno.responsavel} |
                <strong>Tel. Responsável:</strong> ${aluno.telefoneResponsavel} |
                <strong>Turma:</strong> ${aluno.turma}
                <br>
                <button class="editar" data-index="${index}">Editar</button>
                <button class="excluir" data-index="${index}">Excluir</button>
            `;

            listaAlunos.appendChild(li);
        });

        // Eventos para botões editar
        document.querySelectorAll(".editar").forEach(botao => {
            botao.addEventListener("click", function() {
                const index = parseInt(this.getAttribute("data-index"));
                alunoEditandoIndex = index;
                preencherFormulario(alunos[index]);
                window.scrollTo({ top: 0, behavior: "smooth" }); // Rola para o formulário

                const botaoSubmit = formAluno.querySelector('button[type="submit"]');
                botaoSubmit.textContent = "Salvar";

                // Adiciona botão cancelar se não existir
                if (!document.getElementById("cancelarEdicao")) {
                    const btnCancelar = document.createElement("button");
                    btnCancelar.type = "button";
                    btnCancelar.id = "cancelarEdicao";
                    btnCancelar.textContent = "Cancelar";
                    btnCancelar.style.marginLeft = "10px";

                    btnCancelar.addEventListener("click", () => {
                        alunoEditandoIndex = null;
                        formAluno.reset();
                        botaoSubmit.textContent = "Cadastrar";
                        btnCancelar.remove();
                    });

                    botaoSubmit.insertAdjacentElement("afterend", btnCancelar);
                }
            });
        });

        // Eventos para botões excluir
        document.querySelectorAll(".excluir").forEach(botao => {
            botao.addEventListener("click", function() {
                const index = parseInt(this.getAttribute("data-index"));
                if (confirm(`Deseja realmente excluir o aluno ${alunos[index].nome}?`)) {
                    alunos.splice(index, 1);
                    salvarAlunos();
                    renderizarLista(alunos);
                }
            });
        });
    }

    formAluno.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const matricula = document.getElementById("matricula").value.trim();
        const serie = document.getElementById("serie").value.trim();
        const ano = document.getElementById("ano").value;
        const disciplinasSelect = document.getElementById("disciplinas");
        const dataNascimento = document.getElementById("dataNascimento").value;
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const endereco = document.getElementById("endereco").value.trim();
        const responsavel = document.getElementById("responsavel").value.trim();
        const telefoneResponsavel = document.getElementById("telefoneResponsavel").value.trim();
        const turma = document.getElementById("turma").value;

        if (!nome) {
            alert("O nome do aluno não pode estar vazio!");
            return;
        }

        const disciplinas = Array.from(disciplinasSelect.selectedOptions).map(opt => opt.value);
        if (disciplinas.length === 0) {
            alert("Selecione pelo menos uma disciplina!");
            return;
        }

        const aluno = {
            nome,
            matricula,
            serie,
            ano,
            disciplinas,
            dataNascimento,
            email,
            telefone,
            endereco,
            responsavel,
            telefoneResponsavel,
            turma
        };

        if (alunoEditandoIndex !== null) {
            // Edita aluno existente
            alunos[alunoEditandoIndex] = aluno;
            alunoEditandoIndex = null;
        } else {
            // Novo aluno
            alunos.push(aluno);
        }

        salvarAlunos();
        renderizarLista(alunos);

        formAluno.reset();

        // Ajusta botão submit e remove cancelar se existir
        const botaoSubmit = formAluno.querySelector('button[type="submit"]');
        botaoSubmit.textContent = "Cadastrar";

        const btnCancelar = document.getElementById("cancelarEdicao");
        if (btnCancelar) {
            btnCancelar.remove();
        }
    });

    function buscarAlunos() {
        let termoBusca = prompt("Digite o nome do aluno para buscar (deixe vazio para mostrar todos):");
        if (termoBusca === null) return;

        termoBusca = termoBusca.trim().toLowerCase();

        if (termoBusca === "") {
            renderizarLista(alunos);
        } else {
            const filtrados = alunos.filter(aluno => aluno.nome.toLowerCase().includes(termoBusca));
            if (filtrados.length === 0) {
                alert("Nenhum aluno encontrado com esse nome.");
            }
            renderizarLista(filtrados);
        }
    }

    if (botaoBuscar) {
        botaoBuscar.addEventListener("click", buscarAlunos);
    }

    renderizarLista(alunos);
});
