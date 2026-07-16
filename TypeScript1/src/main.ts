type Lembrete = [
    number,
    string,
    string,
    string,
    string
];

const form = document.getElementById("formLembrete") as HTMLFormElement;
const inputTitulo = document.getElementById("titulo") as HTMLInputElement;
const inputDataLimite = document.getElementById("dataLimite") as HTMLInputElement;
const inputDescricao = document.getElementById("descricao") as HTMLTextAreaElement;
const lista = document.getElementById("listaLembretes") as HTMLUListElement;

let lembretes: Lembrete[] = [];
//vaariavel de edição
let idEditando: number | null = null;

form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = inputTitulo.value;
    const dataLimite = inputDataLimite.value;
    const descricao = inputDescricao.value;
    const dataInsercao = new Date().toLocaleString("pt-BR");

    if (titulo === "") {
        alert("Digite o título do lembrete.");
        return;
    }

    if (idEditando === null) {
        criarLembrete(titulo, dataInsercao, dataLimite, descricao);
    } else {
        editarLembrete(
            idEditando,
            titulo,
            dataInsercao,
            dataLimite,
            descricao
        );
    }

    inputTitulo.value = "";
    inputDataLimite.value = "";
    inputDescricao.value = "";

    listarLembretes();
});

function criarLembrete(
    titulo: string,
    dataInsercao: string,
    dataLimite: string,
    descricao: string
): void {
    const id = Date.now();

    const novoLembrete: Lembrete = [
        id,
        titulo,
        dataInsercao,
        dataLimite,
        descricao
    ];

    lembretes.push(novoLembrete);

    console.log(lembretes);
}

// Função para listar os lembretes na tela
function listarLembretes(): void {
    lista.innerHTML = "";

    lembretes.forEach(function (lembrete) {
        const id = lembrete[0];
        const titulo = lembrete[1];
        const dataInsercao = lembrete[2];
        const dataLimite = lembrete[3];
        const descricao = lembrete[4];

        const item = document.createElement("li");

        item.innerHTML = `
        <strong>${titulo}</strong><br>
        Data de inserção: ${dataInsercao}<br>
        Data limite: ${dataLimite || "Não informada"}<br>
        Descrição: ${descricao || "Sem descrição"}<br>

        <button onclick="prepararEdicao(${id})">Editar</button>
        <button onclick="apagarLembrete(${id})">Apagar</button>

        <br><br>
`;

        lista.appendChild(item);
    });
}

// Função para preparar a edição de um lembrete
function prepararEdicao(id: number): void {
    const lembrete = lembretes.find(function (item) {
        return item[0] === id;
    });

    if (lembrete) {
        inputTitulo.value = lembrete[1];
        inputDataLimite.value = lembrete[3];
        inputDescricao.value = lembrete[4];

        idEditando = id;
    }
}

// Função para editar um lembrete existente
function editarLembrete(
    id: number,
    titulo: string,
    dataInsercao: string,
    dataLimite: string,
    descricao: string
): void {

    lembretes = lembretes.map(function (lembrete) {

        if (lembrete[0] === id) {

            return [
                id,
                titulo,
                dataInsercao,
                dataLimite,
                descricao
            ];

        }

        return lembrete;
    });

    idEditando = null;
}

(window as any).prepararEdicao = prepararEdicao;
(window as any).apagarLembrete = apagarLembrete;

// Função para apagar um lembrete
function apagarLembrete(id: number): void {

    lembretes = lembretes.filter(function (lembrete) {
        return lembrete[0] !== id;
    });
    listarLembretes();
}
