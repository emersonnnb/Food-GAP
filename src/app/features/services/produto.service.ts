import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  produtos = [
    {
      id: 1,
      nome: 'Batatas Recheadas',
      descricao: 'A união perfeita entre sabor, cremosidade e conforto! Nossa batata é assada até ficar douradinha por fora e macia por dentro, servindo de base para um recheio à sua escolha, sempre preparado com ingredientes frescos e selecionados. Para completar, adicionamos um toque especial de cream cheese e manteiga com salsa, criando uma combinação irresistível e cheia de personalidade. Ideal para quem ama uma refeição caseira, bem servida e cheia de sabor.',
      preco: 22.00,
      imagem: 'assets/images/batata_recheada.png',
      categoria: 'batataRecheada'
    },
    {
      id: 2,
      nome: 'Cuscuz Nordestinos',
      descricao: 'Tradicional, saboroso e com aquele toque de aconchego que só a comida nordestina tem. Nosso cuscuz é preparado no vapor, garantindo leveza e maciez em cada garfada. Acompanhado do recheio de sua escolha, ele ganha ainda mais sabor com a combinação perfeita de manteiga derretida e um toque de carinho caseiro. Uma opção que alimenta o corpo e conforta a alma, ideal para qualquer hora do dia.',
      preco: 17.00,
      imagem: 'assets/images/cuscuz_nordestino.png',
      categoria: 'cuscuzNordestino'
    },
    {
      id: 3,
      nome: 'Caldos e Sopas',
      descricao: 'Aqui, cada dia é uma surpresa especial! Nosso cardápio de caldos e sopas varia diariamente, sempre com uma receita única, feita com ingredientes frescos e muito sabor. Cremosos, bem temperados e com aquele toque caseiro que conforta, nossas opções do dia são ideais para esquentar o coração e alimentar com carinho. Escolha o sabor disponível e aproveite uma experiência diferente a cada visita!',
      preco: 15.00,
      imagem: 'assets/images/caldos_sopas.png',
      categoria: 'caldosESopas'
    },
    {
      id: 4,
      nome: 'Bebidas',
      descricao: '',
      preco: 5.00,
      imagem: 'assets/images/bebidas.png',
      categoria: 'bebidas'
    }
  ];

  getProdutoById(id: number) {
    return this.produtos.find((p) => p.id === id);
  }

  listarProdutos() {
    return this.produtos;
  }
}
