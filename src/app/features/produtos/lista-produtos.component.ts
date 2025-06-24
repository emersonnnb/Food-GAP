import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss',
})
export class ListaProdutosComponent {
  produtos = this.produtoService.listarProdutos();

  constructor(
    private router: Router,
    private produtoService: ProdutoService,
    private carrinho: CarrinhoService
  ) {}

  selecionarProduto(produto: any) {
    this.router.navigate(['/pedido', produto.id]);
  }

  get totalItensCarrinho() {
    return this.carrinho.listarItens().length;
  }

  irParaCarrinho() {
    this.router.navigate(['/carrinho']);
  }
}
