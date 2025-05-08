function produtosGrid() {
    const produtos = [
      {
        id: 1,
        name: "K-Swiss V8 - Masculino",
        brand: "Tênis",
        originalPrice: 200,
        currentPrice: 100,
        discount: "30% OFF",
        image: "public/produc-image-1.jpeg",
      },
      {
        id: 2,
        name: "K-Swiss V8 - Masculino",
        brand: "Tênis",
        originalPrice: 200,
        currentPrice: 100,
        discount: "30% OFF",
        image: "public/produc-image-1.jpeg",
      },
      {
        id: 3,
        name: "K-Swiss V8 - Masculino",
        brand: "Tênis",
        originalPrice: 200,
        currentPrice: 100,
        discount: "30% OFF",
        image: "public/produc-image-1.jpeg",
      },
      {
        id: 4,
        name: "K-Swiss V8 - Masculino",
        brand: "Tênis",
        originalPrice: 200,
        currentPrice: 100,
        discount: "30% OFF",
        image: "public/produc-image-1.jpeg",
      },
    ]


function formataPreco(preco) {
  return preco.toLocaleString('pt-BR', 
  { 
    style: 'currency', 
    currency: 'BRL' 
  })
}

function renderizarProdutos() {
  const produtosContainer = document.getElementById('produtos');

  produtosContainer.innerHTML = '';

  const produtosHTML = produtos.map(produto => {
    const produtoCard = document.createElement('div');
    produtoCard.className = 'produto-card';

    const produtoInfo = document.createElement('div');
    produtoInfo.className = 'produto-info';

    const produtoNome = document.createElement('h3');
    produtoNome.className = 'produto-nome';
    produtoNome.textContent = produto.nome

    const produtoDescricao = document.createElement('p');
    produtoDescricao.className = 'produto-descricao';
    produtoDescricao.textContent = produto.descricao

    const produtoPreco = document.createElement('div');
    produtoPreco.className = 'produto-preco';
    
    if (produto.temDesconto) {
      const precoOriginal = document.createElement('span');
      precoOriginal.className = 'preco-original';
      precoOriginal.textContent = formataPreco(produto.precoOriginal);

      const precoDesconto = document.createElement('span');
      precoDesconto.className = 'preco-desconto';
      precoDesconto.textContent = formataPreco(produto.preco);

      produtoPreco.appendChild(precoOriginal);
      produtoPreco.appendChild(precoDesconto);
    } else {
      produtoPreco.textContent = formataPreco(produto.preco);
    }
    produtoInfo.appendChild(produtoNome);
    produtoInfo.appendChild(produtoDescricao);
    produtoInfo.appendChild(produtoPreco);

    produtoCard.appendChild(produtoInfo);

    return produtoCard;
  });

  produtosHTML.forEach(card => {
    produtosContainer.appendChild(card);
  });

}

function aplicarDesconto() {
  produtos.forEach(produto => {
    if (!produto.temDesconto) {
      produto.precoOriginal = produto.preco;
      produto.preco = produto.preco * 0.9;
      produto.temDesconto = true;
    }
  });

  renderizarProdutos()
}

document.getElementById('aplicarDesconto').addEventListener('click', aplicarDesconto);

document.addEventListener('DOMContentLoaded',  renderizarProdutos);