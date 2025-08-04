import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { ProdutoService } from '../services/produto.service';
import { ProdutoDTO } from '../../../interfaces/food.model';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-produtos.component.html',
  styleUrl: './lista-produtos.component.scss',
})
export class ListaProdutosComponent  implements OnInit {
  categorias: any[] = [];
  produtos: ProdutoDTO[] = [];
  bebidas: ProdutoDTO[] = [];
  adicionais: ProdutoDTO[] = [];
  categoriaSelecionada: number = 0;

  constructor(
    private router: Router,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {    
    this.categorias = this.produtoService.getCategorias();
  }
  
  selecionarCategoria(categoriaId: number): void {
    // this.categoriaSelecionada = categoriaId;
    // this.produtos = this.produtoService.getProdutosPorCategoria(categoriaId);
    // this.bebidas = this.produtoService.getBebidas();
    // this.adicionais = this.produtoService.getAdicionais();
   
    this.router.navigate(['/pedido', categoriaId]);
  }
  
  selecionarProduto(produto: ProdutoDTO) {
    this.router.navigate(['/pedido', produto.id]);
  }
}
