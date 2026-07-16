interface IProduto {
    getModelo(): string;
    getFabricante(): string;
    getValor(): number;
}

class Produto implements IProduto {
    constructor(
        private modelo: string,
        private fabricante: string,
        private valor: number
    ) { }

    getModelo(): string { return this.modelo; }
    getFabricante(): string { return this.fabricante; }
    getValor(): number { return this.valor; }

}

//Classe Tv
class TV extends Produto {
    constructor(
        modelo: string,
        fabricante: string,
        valor: number
    ) {
        super(modelo, fabricante, valor);
    }

}

//Class Celular
class Celular extends Produto {
    constructor(
        modelo: string,
        fabricante: string,
        valor: number
    ) {
        super(modelo, fabricante, valor);
    }

}

//Class bicicleta
class Bicicleta extends Produto {
    constructor(
        modelo: string,
        fabricante: string,
        valor: number
    ) {
        super(modelo, fabricante, valor);
    }

}

//Class carrinho de compras
class Carrinho<T extends Produto> {
    private produtos: T[];

    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto: T): void {
        this.produtos.push(produto);
    }

    listarProdutos(): T[] {
        return this.produtos;
    }

    getQuantidadeProdutos(): number {
        return this.produtos.length;
    }

    getValorTotal(): number {
        let total = 0;

        this.produtos.forEach(function (produto) {
            total += produto.getValor();
        });
        return total;
    }

}
//Captura de elementos do html
const form = document.getElementById("formProduto") as HTMLFormElement;
const tipoProduto = document.getElementById("tipoProduto") as HTMLSelectElement;
const modelo = document.getElementById("modelo") as HTMLInputElement;
const fabricante = document.getElementById("fabricante") as HTMLInputElement;
const valor = document.getElementById("valor") as HTMLInputElement;
const listaProdutos = document.getElementById("listaProdutos") as HTMLUListElement;
const quantidadeProdutos = document.getElementById("quantidadeProdutos") as HTMLSpanElement;
const valorTotal = document.getElementById("valorTotal") as HTMLSpanElement;

//Criando carrinho
const carrinho = new Carrinho<Produto>();

//captura o envio do formulario
form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const tipo = tipoProduto.value;
    const modeloDigitado = modelo.value;
    const fabricanteDigitado = fabricante.value;
    const valorDigitado = Number(valor.value);

    let produto: Produto;

    if (tipo === "tv") {

        produto = new TV(
            modeloDigitado,
            fabricanteDigitado,
            valorDigitado
        );

    } else if (tipo === "celular") {

        produto = new Celular(
            modeloDigitado,
            fabricanteDigitado,
            valorDigitado
        );

    } else {

        produto = new Bicicleta(
            modeloDigitado,
            fabricanteDigitado,
            valorDigitado
        );
    }
    carrinho.adicionarProduto(produto);
    listarProdutos();
    atualizarEstatisticas();
    form.reset();
});

//Adiciona o produto pelo formulario
function listarProdutos(): void {
    listaProdutos.innerHTML = "";

    carrinho.listarProdutos().forEach(function (produto) {
        const item = document.createElement("li");

        item.className =
            "list-group-item d-flex justify-content-between align-items-center";

        item.innerHTML = `
            <div>
                <strong>${produto.getModelo()}</strong><br>
                Fabricante: ${produto.getFabricante()}
            </div>

            <span class="badge bg-success fs-6">
                R$ ${produto.getValor().toFixed(2)}
            </span>
        `;
        listaProdutos.appendChild(item);
    });
}

//Atualiza estatistica
function atualizarEstatisticas(): void {
    quantidadeProdutos.textContent = carrinho.getQuantidadeProdutos().toString();
    valorTotal.textContent = carrinho.getValorTotal().toFixed(2);
}