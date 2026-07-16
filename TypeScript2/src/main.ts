//classe para representar um aluno
class Aluno {
    private id: number;
    private nome: string;
    private idade: number;
    private altura: number;
    private peso: number;

    constructor(
        id: number,
        nome: string,
        idade: number,
        altura: number,
        peso: number
    ) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }

    getId(): number {
        return this.id;
    }

    getNome(): string {
        return this.nome;
    }

    getIdade(): number {
        return this.idade;
    }

    getAltura(): number {
        return this.altura;
    }

    getPeso(): number {
        return this.peso;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    setIdade(idade: number): void {
        this.idade = idade;
    }

    setAltura(altura: number): void {
        this.altura = altura;
    }

    setPeso(peso: number): void {
        this.peso = peso;
    }
}

//classe para representar uma turma de alunos
class Turma {
    private id: number;
    private nome: string;
    private alunos: Aluno[];

    constructor(id: number, nome: string) {
        this.id = id;
        this.nome = nome;
        this.alunos = [];
    }

    adicionarAluno(aluno: Aluno): void {
        this.alunos.push(aluno);
    }
    //remover aluno por id
    removerAluno(id: number): void {
        this.alunos = this.alunos.filter(function (aluno) {
            return aluno.getId() !== id;
        });

    }

    getAlunos(): Aluno[] {
        return this.alunos;
    }

    getNumAlunos(): number {
        return this.alunos.length;
    }

    //calcular médias
    getMediaIdades(): number {
        if (this.alunos.length === 0) {
            return 0;
        }

        let soma = 0;
        this.alunos.forEach(function (aluno) { soma += aluno.getIdade(); });
        return soma / this.alunos.length;
    }

    getMediaAlturas(): number {
        if (this.alunos.length === 0) {
            return 0;
        }

        let soma = 0;
        this.alunos.forEach(function (aluno) { soma += aluno.getAltura(); });
        return soma / this.alunos.length;
    }

    getMediaPesos(): number {
        if (this.alunos.length === 0) {
            return 0;
        }

        let soma = 0;
        this.alunos.forEach(function (aluno) { soma += aluno.getPeso(); });
        return soma / this.alunos.length;
    }

}

const form = document.getElementById("formAluno") as HTMLFormElement;

const inputNome = document.getElementById("nome") as HTMLInputElement;
const inputIdade = document.getElementById("idade") as HTMLInputElement;
const inputAltura = document.getElementById("altura") as HTMLInputElement;
const inputPeso = document.getElementById("peso") as HTMLInputElement;
const listaAlunos = document.getElementById("listaAlunos") as HTMLUListElement;
const turma = new Turma(1, "Turma TypeScript");
//varavel para armazenar o id do aluno editado
let idEditando: number | null = null;

//Capturar elementos para exibir as médias
const totalAlunos = document.getElementById("totalAlunos") as HTMLSpanElement;
const mediaIdades = document.getElementById("mediaIdades") as HTMLSpanElement;
const mediaAlturas = document.getElementById("mediaAlturas") as HTMLSpanElement;
const mediaPesos = document.getElementById("mediaPesos") as HTMLSpanElement;

form.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const nome = inputNome.value;
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    //verifica se está editando ou adicioando um aluno
    if (idEditando === null) {

        const aluno = new Aluno(
            Date.now(),
            nome,
            idade,
            altura,
            peso
        );

        turma.adicionarAluno(aluno);

    } else {
        const aluno = turma.getAlunos().find(function (aluno) {
            return aluno.getId() === idEditando;
        });

        if (aluno) {
            aluno.setNome(nome);
            aluno.setIdade(idade);
            aluno.setAltura(altura);
            aluno.setPeso(peso);
        }
        idEditando = null;
    }

    listarAlunos();
    //atualizar estatisticas
    atualizarEstatisticas();

    form.reset();
});

//função para listar alunos
function listarAlunos(): void {
    listaAlunos.innerHTML = "";
    turma.getAlunos().forEach(function (aluno) {

        const item = document.createElement("li");

        item.className = "list-group-item";
        item.innerHTML = `
      <strong>${aluno.getNome()}</strong><br>
      Idade: ${aluno.getIdade()}<br>
      Altura: ${aluno.getAltura()}<br>
      Peso: ${aluno.getPeso()}<br><br>

      <button
      class="btn btn-warning btn-sm"
      onclick="prepararEdicao(${aluno.getId()})">
       Editar
      </button>

      <button
       class="btn btn-danger btn-sm ms-2"
       onclick="apagarAluno(${aluno.getId()})">
       Apagar
      </button>
    `;
        listaAlunos.appendChild(item);
    });

}

//função para atualizar estatisticas
function atualizarEstatisticas(): void {

    totalAlunos.textContent = turma.getNumAlunos().toString();
    mediaIdades.textContent = turma.getMediaIdades().toFixed(2);
    mediaAlturas.textContent = turma.getMediaAlturas().toFixed(2);
    mediaPesos.textContent = turma.getMediaPesos().toFixed(2);
}

//função para preparar edição de um aluno
function prepararEdicao(id: number): void {

    const aluno = turma.getAlunos().find(function (aluno) {
        return aluno.getId() === id;
    });

    if (aluno) {
        inputNome.value = aluno.getNome();
        inputIdade.value = aluno.getIdade().toString();
        inputAltura.value = aluno.getAltura().toString();
        inputPeso.value = aluno.getPeso().toString();
        idEditando = id;
    }
}

(window as any).prepararEdicao = prepararEdicao;

//função para apagar luno
function apagarAluno(id: number): void {

    turma.removerAluno(id);
    listarAlunos();
    atualizarEstatisticas();
}

(window as any).apagarAluno = apagarAluno;