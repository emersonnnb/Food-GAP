import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pedido-produto.component.html',
  styleUrl: './pedido-produto.component.scss',
})
export class PedidoProdutoComponent {
  produto: any;

  adicionaisAcai = [
    { nome: 'Sucrilhos', preco: 2, quantidade: 0, limite: 5 },
    { nome: 'Amendoim', preco: 2, quantidade: 0, limite: 5 },
    { nome: 'Leite condensado', preco: 2, quantidade: 0, limite: 5 },
    { nome: 'Banana', preco: 2, quantidade: 0, limite: 5 },
    { nome: 'Leite em pó', preco: 2, quantidade: 0, limite: 5 },
    { nome: 'Farinha lacta', preco: 2, quantidade: 0, limite: 5 },
  ];

  adicionaisLanche = [
    { nome: 'Maionese', preco: 0, quantidade: 0, limite: 4 },
    { nome: 'Bacon', preco: 4, quantidade: 0, limite: 4 },
    { nome: 'Queijo extra', preco: 3, quantidade: 0, limite: 4 },
  ];

  observacao = '';
  acaiAberto = true;
  lancheAberto = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private carrinho: CarrinhoService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const produtoEncontrado = this.produtoService.getProdutoById(id);

    if (!produtoEncontrado) {
      alert('Produto não encontrado!');
      this.router.navigate(['/lista-produtos']);
      return;
    }

    this.produto = produtoEncontrado;
  }

  adicionar(adicional: any) {
    if (adicional.quantidade < adicional.limite) adicional.quantidade++;
  }

  remover(adicional: any) {
    if (adicional.quantidade > 0) adicional.quantidade--;
  }

  get totalAdicionais() {
    const totalAcai = this.adicionaisAcai.reduce(
      (sum, item) => sum + item.preco * item.quantidade,
      0
    );
    const totalLanche = this.adicionaisLanche.reduce(
      (sum, item) => sum + item.preco * item.quantidade,
      0
    );
    return totalAcai + totalLanche;
  }

  get total() {
    return (this.produto?.preco || 0) + this.totalAdicionais;
  }

  finalizar() {
    const pedido = {
      produto: this.produto,
      adicionais: [
        ...this.adicionaisAcai.filter((a) => a.quantidade > 0),
        ...this.adicionaisLanche.filter((a) => a.quantidade > 0),
      ],
      observacao: this.observacao,
      total: this.total,
    };

    this.carrinho.adicionarItem(pedido);
    alert('Pedido adicionado ao carrinho!');
    this.router.navigate(['/lista-produtos']);
  }
}
