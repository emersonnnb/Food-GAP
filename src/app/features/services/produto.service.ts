import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  produtos = [
    {
      id: 1,
      nome: 'X-tudo duplo',
      descricao: '2 Hambúrgueres, 2 ovos, 2 queijos, 2 presunto, bacon, batata e salada.',
      preco: 18.99,
      imagem: 'assets/images/x-tudo-duplo.jpeg',
    },
    {
      id: 2,
      nome: 'X-tudo',
      descricao: '1 Hambúrguer, 1 ovo, 1 queijo, 1 presunto, bacon, batata e salada.',
      preco: 13.99,
      imagem: 'assets/images/x-tudo-duplo.jpeg',
    },
    {
      id: 3,
      nome: 'X-Bacon',
      descricao: 'Pão brioche, hambúrguer 170g, queijo, bacon e maionese.',
      preco: 25.99,
      imagem: 'https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png',
    },
    {
      id: 4,
      nome: 'Açaí 500ml',
      descricao: 'Açaí com até 5 adicionais.',
      preco: 19.99,
      imagem: 'assets/images/acai.jpg',
    },
    {
      id: 5,
      nome: 'misto quente',
      descricao: 'Pão de forma, queijo e presunto.',
      preco: 19.99,
      imagem: 'assets/images/misto-quente.jpg',
    },
    {
      id: 1,
      nome: 'X-tudo duplo',
      descricao: '2 Hambúrgueres, 2 ovos, 2 queijos, 2 presunto, bacon, batata e salada.',
      preco: 18.99,
      imagem: 'assets/images/x-tudo-duplo.jpeg',
    },
    {
      id: 2,
      nome: 'X-tudo',
      descricao: '1 Hambúrguer, 1 ovo, 1 queijo, 1 presunto, bacon, batata e salada.',
      preco: 13.99,
      imagem: 'assets/images/x-tudo-duplo.jpeg',
    },
    {
      id: 3,
      nome: 'X-Bacon',
      descricao: 'Pão brioche, hambúrguer 170g, queijo, bacon e maionese.',
      preco: 25.99,
      imagem: 'https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png',
    },
    {
      id: 4,
      nome: 'Açaí 500ml',
      descricao: 'Açaí com até 5 adicionais.',
      preco: 19.99,
      imagem: 'assets/images/acai.jpg',
    },
    {
      id: 5,
      nome: 'misto quente',
      descricao: 'Pão de forma, queijo e presunto.',
      preco: 19.99,
      imagem: 'assets/images/misto-quente.jpg',
    },
    {
      id: 1,
      nome: 'X-tudo duplo',
      descricao: '2 Hambúrgueres, 2 ovos, 2 queijos, 2 presunto, bacon, batata e salada.',
      preco: 18.99,
      imagem: 'assets/images/x-tudo-duplo.jpeg',
    },
    {
      id: 2,
      nome: 'X-tudo',
      descricao: '1 Hambúrguer, 1 ovo, 1 queijo, 1 presunto, bacon, batata e salada.',
      preco: 13.99,
      imagem: 'assets/images/x-tudo-duplo.jpeg',
    },
    {
      id: 3,
      nome: 'X-Bacon',
      descricao: 'Pão brioche, hambúrguer 170g, queijo, bacon e maionese.',
      preco: 25.99,
      imagem: 'https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png',
    },
    {
      id: 4,
      nome: 'Açaí 500ml',
      descricao: 'Açaí com até 5 adicionais.',
      preco: 19.99,
      imagem: 'assets/images/acai.jpg',
    },
    {
      id: 5,
      nome: 'misto quente',
      descricao: 'Pão de forma, queijo e presunto.',
      preco: 19.99,
      imagem: 'assets/images/misto-quente.jpg',
    },
  ];

  getProdutoById(id: number) {
    return this.produtos.find((p) => p.id === id);
  }

  listarProdutos() {
    return this.produtos;
  }
}
