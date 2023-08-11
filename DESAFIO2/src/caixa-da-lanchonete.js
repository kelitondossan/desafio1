class CaixaDaLanchonete {
    constructor() {
        this.cardapio = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
            { codigo: 'suco1', descricao: 'Suco de Maracuja', valor: 4.50 },
            { codigo: 'suco2', descricao: 'Suco de Limão', valor: 4.50 },
            { codigo: 'suco3', descricao: 'Suco de Mangaba', valor: 4.50 },
            { codigo: 'babidaGas1', descricao: 'Guarana em Lata', valor: 4.50 },
            { codigo: 'babidaGas2', descricao: 'Coca-cola em Lata', valor: 5.50 },
            { codigo: 'salgadosSortidos1', descricao: 'Coxinha', valor: 3.50 },
            { codigo: 'salgadosSortidos2', descricao: 'Pizza', valor: 3.50 },
            { codigo: 'salgadosSortidos3', descricao: 'Pastel', valor: 3.50 },
            { codigo: 'doce1', descricao: 'Torta de Morango', valor: 7.50 },
            { codigo: 'doce2', descricao: 'Torta de Limão', valor: 7.50 },
            { codigo: 'doce3', descricao: 'Pudim', valor: 5.50 },
        ];
        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
    }

    
calcularValorDaCompra(formaDePagamento, itens) {
    if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
    }

    const itensDoCarrinho = [];

    for (const item of itens) {
        const [codigo, quantidade] = item.split(',');

        const itemCardapio = this.cardapio.find(item => item.codigo === codigo);

        if (!itemCardapio) {
            return 'Item inválido!';
        }

        itensDoCarrinho.push({ ...itemCardapio, quantidade: parseInt(quantidade) });
    }

    const descontoDinheiro = formaDePagamento === 'dinheiro' ? 0.05 : 0;
    const acrescimoCredito = formaDePagamento === 'credito' ? 0.03 : 0;

    let valorTotal = 0;

    for (const item of itensDoCarrinho) {
        valorTotal += item.valor * item.quantidade;
    }

    valorTotal *= 1 + acrescimoCredito;
    valorTotal *= 1 - descontoDinheiro;

    return `Total: R$ ${valorTotal.toFixed(2)}`;
}

 calcularValorDaCompra(formaDePagamento, itens) {
    if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
    }

    const itensDoCarrinho = [];
    const itensExtras = [];

    for (const item of itens) {
        const [codigo, quantidade] = item.split(',');

        const itemCardapio = this.cardapio.find(item => item.codigo === codigo);

        if (!itemCardapio) {
            return 'Item inválido!';
        }

        if (itemCardapio.codigo.endsWith('extra')) {
            const itemPrincipal = this.cardapio.find(item => item.codigo === codigo.replace('extra', ''));

            if (!itensDoCarrinho.some(item => item.codigo === itemPrincipal.codigo)) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            itensExtras.push({ ...itemCardapio, quantidade: parseInt(quantidade) });
        } else {
            itensDoCarrinho.push({ ...itemCardapio, quantidade: parseInt(quantidade) });
        }
    }

    if (itensDoCarrinho.length === 0) {
        return 'Não há itens no carrinho de compra!';
    }

    const descontoDinheiro = formaDePagamento === 'dinheiro' ? 0.05 : 0;
    const acrescimoCredito = formaDePagamento === 'credito' ? 0.03 : 0;

    let valorTotal = 0;

    for (const item of itensDoCarrinho) {
        valorTotal += item.valor * item.quantidade;
    }

    for (const itemExtra of itensExtras) {
        valorTotal += itemExtra.valor * itemExtra.quantidade;
    }

    valorTotal *= 1 + acrescimoCredito;
    valorTotal *= 1 - descontoDinheiro;

    return `Total: R$ ${valorTotal.toFixed(2)}`;

}

    atualizarTotal(valorTotal) {
        const totalElement = document.getElementById('total');
        totalElement.textContent = valorTotal;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const caixa = new CaixaDaLanchonete();

    const form = document.getElementById('order-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const itemSelect = document.getElementById('item');
        const quantityInput = document.getElementById('quantity');
        const paymentSelect = document.getElementById('payment');

        const itemValue = itemSelect.value;
        const quantityValue = quantityInput.value;
        const paymentValue = paymentSelect.value;

        const total = caixa.calcularValorDaCompra(paymentValue, [`${itemValue},${quantityValue}`]);
        caixa.atualizarTotal(total);
    });
});

const caixa = new CaixaDaLanchonete();
console.log(caixa.calcularValorDaCompra('debito', ['doce1,17']));
console.log(caixa.calcularValorDaCompra('credito', ['doce1,4', 'salgado,1', 'cafe,2']));
console.log(caixa.calcularValorDaCompra('debito', ['doce1,10']));

