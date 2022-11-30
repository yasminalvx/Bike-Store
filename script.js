listaProdutos = [
  {
    id: "1",
    nome: "HACKER 24",
    descricao: `Bicicleta focada para o público juvenil, a Hacker é ideal para
        ciclistas iniciantes que buscam uma bike indicada para passeios,
        lazer e para a prática de mountain bike em trilhas leves e
        moderadas. Com uma geometria que privilegia o conforto, mas sem
        abrir mão do bom desempenho, ela possui câmbio Shimano Tourney
        de 21 velocidades e excelentes componentes. Para pedalar com
        estilo, conforto e muita segurança!`,
    preco: 3000.5,
    img: "https://oggibikes.com.br/wp-content/uploads/2019/03/hacker-24-amarelo-scaled.jpg",
  },
  {
    id: "2",
    nome: "OGGI Hacker HDS",
    descricao: `OGGI Hacker HDS é indicada para aqueles que estão começando as 
        pedaladas e procuram o melhor custo beneficio!`,
    preco: 2590.0,
    img: "https://oggibikes.com.br/wp-content/uploads/2019/05/hds-azul-fb-scaled.jpg",
  },
  {
    id: "3",
    nome: "BIG WHEEL 7.0",
    descricao: `Bike de entrada para quem quer iniciar no Mountain Bike, a Big
        Wheel 7.0 2021 não necessita upgrades com frequência, pois já
        vem com tudo que é preciso para começar no MTB: Trava no guidão,
        uma boa marcha e cabeamento interno. Excelente opção que une
        baixo peso, ótima performance e na nova versão vem com um novo
        quadro e com um novo grafismo.`,
    preco: 3690.5,
    img: "https://oggibikes.com.br/wp-content/uploads/2020/10/7-0-azul-2021-fb-scaled.jpg",
  },
  {
    id: "4",
    nome: "BIG WHEEL 7.2",
    descricao: `A NOVA Big Wheel 7.2 2021 possui uma excelente configuração,
        sendo o grupo Shimano DEORE de 11 velocidades, BOOST (148mm).`,
    preco: 7590.0,
    img: "https://oggibikes.com.br/wp-content/uploads/2020/11/DSC_6481-copia-1-scaled.jpg",
  },
  {
    id: "5",
    nome: "BIG WHEEL 7.5",
    descricao: `O modelo de alta performance da marca subiu mais um nível. Além
        de contar com o novo cassete 10-52, agora a máquina vem equipada
        com o câmbio SRAM GX Lunar 12v.`,
    preco: 12380.0,
    img: "https://oggibikes.com.br/wp-content/uploads/2022/05/7.5-CV-CHAPADA.png",
  },
  {
    id: "6",
    nome: "BIG WHEEL 7.6",
    descricao: `A Big Wheel 7.6 foi desenvolvida para dominar as trilhas do
        cross country, com o máximo de performance. A top bike rígida de
        alumínio mais eficiente e capaz disponível.`,
    preco: 13990.0,
    img: "https://oggibikes.com.br/wp-content/uploads/2020/11/DSC_6481-copia-1-scaled.jpg",
  },
];

class Produto {
  id;
  nome;
  descricao;
  preco;
  img;

  constructor(id, nome, descricao, preco, img) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.preco = preco;
    this.img = img;
  }
}

function addProdutoCarrinho(id) {
  const listaCarrinho = localStorage.getItem("listaCarrinho")
    ? JSON.parse(localStorage.getItem("listaCarrinho"))
    : [];
  const produto = listaProdutos.find((x) => x.id === id);
  if (listaCarrinho.find((x) => x.id == id)) {
    const index = listaCarrinho.findIndex((x) => x.id == id);
    listaCarrinho[index].quantidade = listaCarrinho[index].quantidade + 1;
  } else {
    produto.quantidade = 1;
    listaCarrinho.push(produto);
  }

  localStorage.setItem("listaCarrinho", JSON.stringify(listaCarrinho));
  gerarCarrinho();
}

function getTotal() {
  const listaCarrinho = JSON.parse(localStorage.getItem("listaCarrinho"));

  if (listaCarrinho) {
    return listaCarrinho.reduce(
      (total, item) => total + item.quantidade * item.preco,
      0
    );
  }

  return 0;
}

function openNav() {
    gerarCarrinho();
  document.querySelector("#sidebar").style.width = "300px";
  document.getElementsByTagName("main")[0].style.marginRight = "300px";
  document.getElementsByTagName("header")[0].style.marginRight = "300px";
}

function closeNav() {
  document.querySelector("#sidebar").style.width = "0";
  document.getElementsByTagName("main")[0].style.marginRight = "0";
  document.getElementsByTagName("header")[0].style.marginRight = "0";
}

function gerarCarrinho() {
    const listaCarrinho = JSON.parse(localStorage.getItem("listaCarrinho"));

    const carrinhoUl = document.querySelector("#carrinho");
    carrinhoUl.innerHTML = '';

    for (let item of listaCarrinho) {
        carrinhoUl.innerHTML += `
            <li class="item-carrinho">
            <img src="${item.img}">
            <strong> ${item.quantidade} x </strong> 
            <span> ${item.nome} </span>
            <strong>R$ ${(item.quantidade * item.preco).toFixed(2)}</strong>
            </li>`;
    }

    document.querySelector('#valor-total').innerHTML = `R$ ${getTotal().toFixed(2)}`

}
