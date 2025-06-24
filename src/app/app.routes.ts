import { Routes } from '@angular/router';
import { ListaProdutosComponent } from './features/produtos/lista-produtos.component';
import { PedidoProdutoComponent } from './features/pedidos/pedido-produto.component';
import { CarrinhoComponent } from './features/carrinho/carrinho.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista-produtos',
    pathMatch: 'full',
  },
  {
    path: 'lista-produtos',
    component: ListaProdutosComponent,
  },
  {
    path: 'pedido/:id',
    component: PedidoProdutoComponent,
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent,
  },
];
