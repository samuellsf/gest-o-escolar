class Aluno {
    constructor(nome, matricula, notas) {
        this.nome = nome;
        this.matricula = matricula;
        this._notas = notas; // Atributo privado
    }

    calcularMedia() {
        const soma = this._notas.reduce((acc, nota) => acc + nota, 0);
        return soma / this._notas.length;
    }

    getInfo() {
        return `Aluno: ${this.nome}, Matrícula: ${this.matricula}, Média: ${this.calcularMedia()}`;
    }
}

const aluno1 = new Aluno("Carlos Silva", 12345, [8, 9, 7]);
console.log(aluno1.getInfo());
document.addEventListener("DOMContentLoaded", function() {
    const botaoVoltar = document.getElementById("voltar");

    if (botaoVoltar) {
        botaoVoltar.addEventListener("click", function() {
            if (window.history.length > 1) {
                window.history.back(); // Volta para a página anterior
            } else {
                window.location.href = "../index.html"; // Caso não tenha histórico, retorna à página inicial
            }
        });
    }
});
// Classe base Pessoa
class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    exibirInfo() {
        return `Nome: ${this.nome}, Idade: ${this.idade}`;
    }
}

// Classe Aluno (herda de Pessoa)
class Aluno extends Pessoa {
    constructor(nome, idade, matricula) {
        super(nome, idade);
        this.matricula = matricula;
        this.notas = [];
    }

    adicionarNota(nota) {
        this.notas.push(nota);
    }

    calcularMedia() {
        const total = this.notas.reduce((acc, nota) => acc + nota, 0);
        return this.notas.length ? (total / this.notas.length).toFixed(2) : "Sem notas";
    }

    exibirInfo() {
        return `${super.exibirInfo()}, Matrícula: ${this.matricula}, Média: ${this.calcularMedia()}`;
    }
}

// Classe Professor (herda de Pessoa)
class Professor extends Pessoa {
    constructor(nome, idade, disciplina) {
        super(nome, idade);
        this.disciplina = disciplina;
    }

    exibirInfo() {
        return `${super.exibirInfo()}, Disciplina: ${this.disciplina}`;
    }
}

// Classe Turma
class Turma {
    constructor(nome, professor) {
        this.nome = nome;
        this.professor = professor;
        this.alunos = [];
    }

    adicionarAluno(aluno) {
        this.alunos.push(aluno);
    }

    listarAlunos() {
        return this.alunos.map(aluno => aluno.exibirInfo()).join("\n");
    }

    exibirInfo() {
        return `Turma: ${this.nome}, Professor: ${this.professor.exibirInfo()}, Total de alunos: ${this.alunos.length}`;
    }
}

// Simulação de instância das classes
const professor1 = new Professor("Carlos Silva", 40, "Matemática");
const aluno = new Aluno("João Pereira", 16, "A000");
const aluno2 = new Aluno("Maria Oliveira", 15, "A002");

aluno1.adicionarNota(8.5);
aluno1.adicionarNota(9.0);
aluno2.adicionarNota(7.5);
aluno2.adicionarNota(8.0);

const turma1 = new Turma("Turma A", professor1);
turma1.adicionarAluno(aluno1);
turma1.adicionarAluno(aluno2);

console.log(turma1.exibirInfo());
console.log("Lista de alunos da turma:");
console.log(turma1.listarAlunos());
