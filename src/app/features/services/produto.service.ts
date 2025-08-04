import { Injectable } from '@angular/core';
import { ProdutoDTO } from '../../../interfaces/food.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  categorias = [
    {
      id: 1,
      nome: 'Batata Recheada',
      imagem: 'assets/images/batata_recheada.png',
      descricao:
        'A união perfeita entre sabor, cremosidade e conforto! Nossa batata é assada até ficar douradinha por fora e macia por dentro, servindo de base para um recheio à sua escolha, sempre preparado com ingredientes frescos e selecionados. Para completar, adicionamos um toque especial de cream cheese e manteiga com salsa, criando uma combinação irresistível e cheia de personalidade. Ideal para quem ama uma refeição caseira, bem servida e cheia de sabor.',
    },
    {
      id: 2,
      nome: 'Cuscuz Nordestino',
      imagem: 'assets/images/cuscuz_nordestino.png',
      descricao:
        'Tradicional, saboroso e com aquele toque de aconchego que só a comida nordestina tem. Nosso cuscuz é preparado no vapor, garantindo leveza e maciez em cada garfada. Acompanhado do recheio de sua escolha, ele ganha ainda mais sabor com a combinação perfeita de manteiga derretida e um toque de carinho caseiro. Uma opção que alimenta o corpo e conforta a alma, ideal para qualquer hora do dia.',
    },
    {
      id: 3,
      nome: 'Caldo e Sopa',
      imagem: 'assets/images/caldos_sopas.png',
      descricao:
        'Aqui, cada dia é uma surpresa especial! Nosso cardápio de caldos e sopas varia diariamente, sempre com uma receita única, feita com ingredientes frescos e muito sabor. Cremosos, bem temperados e com aquele toque caseiro que conforta, nossas opções do dia são ideais para esquentar o coração e alimentar com carinho. Escolha o sabor disponível e aproveite uma experiência diferente a cada visita!',
    },
  ];

  produtos: ProdutoDTO[] = [
    { id: 1, nome: 'Camarão', preco: 27.0, categoriaId: 1 },
    { id: 2, nome: 'Bacon e Calabresa', preco: 23.0, categoriaId: 1 },
    {
      id: 3,
      nome: 'Strogonoff de Carne c/ Batata Palha',
      preco: 24.0,
      categoriaId: 1,
    },
    { id: 4, nome: 'Frango Desfiado', preco: 17.0, categoriaId: 2 },
    { id: 5, nome: 'Linguiça Calabresa', preco: 17.0, categoriaId: 2 },
    { id: 6, nome: 'Ovos Mexidos', preco: 17.0, categoriaId: 2 },
    { id: 7, nome: 'Caldo Verde', preco: 15.0, categoriaId: 3 },
    {
      id: 8,
      nome: 'Caldo de Abóbora com Carne Seca',
      preco: 16.0,
      categoriaId: 3,
    },
  ];

  bebidas = [
    { id: 9, nome: 'Pepsi Lata', preco: 5, categoriaId: 4 },
    { id: 10, nome: 'Guaraná Lata', preco: 5, categoriaId: 4 },
  ];

  adicionais = [
    { id: 11, nome: 'Cream Cheese', preco: 0, categoriaId: 5 },
    { id: 12, nome: 'Queijo Coalho', preco: 4, categoriaId: 5 },
    { id: 13, nome: 'Bacon', preco: 4, categoriaId: 5 },
    { id: 14, nome: 'Ovo', preco: 2, categoriaId: 5 },
  ];

  getCategorias() {
    return this.categorias;
  }
  
  getCategoriaById(id: number) {
    return this.categorias.find((categoria) => categoria.id === id);
  }

  getProdutosPorCategoria(categoriaId: number) {
    return this.produtos.filter(
      (produto) => produto.categoriaId === categoriaId
    );
  }

  getBebidas() {
    return this.bebidas;
  }

  getAdicionais() {
    return this.adicionais;
  }

  getProdutoByCodigo(codigo: number) {
    return [...this.produtos, ...this.bebidas, ...this.adicionais].find(
      (produto) => produto.id === codigo
    );
  }
}
