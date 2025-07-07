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

  batataSelecionada: any = null;
  cuscuzSelecionado: any = null;
  caldoSelecionado: any = null;

  batatasRecheadas = [
    { nome: 'Camarão', preco: 27.00 },
    { nome: 'Bacon e Calabresa', preco: 23.00 },
    { nome: 'Strogonoff de Carne', preco: 24.00 },
    { nome: 'Strogonoff de Frango', preco: 22.00 },
    { nome: 'Carne Seca', preco: 24.00 },
    { nome: 'Costela', preco: 23.00 }
  ];

  cuscuzNordestinos = [
    { nome: 'Frango Desfiado', preco: 17.00 },
    { nome: 'Linguiça Calabresa', preco: 17.00 },
    { nome: 'Ovos Mexidos', preco: 17.00 },
    { nome: 'Carne Seca', preco: 19.00 },
    { nome: 'Costela', preco: 19.00 }
  ];

  caldosESopas = [
    { nome: 'Caldo Verde', preco: 15.00 },
    { nome: 'Caldo de Abóbora com Carne Seca', preco: 16.00 }
  ];

  adicionaisBatata = [
    { nome: 'Cream Cheese', preco: 0, quantidade: 0, limite: 1 },
    { nome: 'Manteiga com Salsa', preco: 0, quantidade: 0, limite: 1 },
    { nome: 'Queijo Coalho', preco: 4, quantidade: 0, limite: 5 },
    { nome: 'Bacon', preco: 4, quantidade: 0, limite: 5 },
    { nome: 'Ovo', preco: 2, quantidade: 0, limite: 5 }
  ];

  adicionaisCuscuz = [
    { nome: 'Cream Cheese', preco: 0, quantidade: 0, limite: 1 },
    { nome: 'Vinagrete', preco: 0, quantidade: 0, limite: 1 },
    { nome: 'Queijo Coalho', preco: 4, quantidade: 0, limite: 5 },
    { nome: 'Bacon', preco: 4, quantidade: 0, limite: 5 },
    { nome: 'Ovo', preco: 2, quantidade: 0, limite: 5 }
  ];

  bebidas = [
    { nome: 'Pepsi Lata', preco: 5, quantidade: 0, limite: 5 },
    { nome: 'Guaraná Lata', preco: 5, quantidade: 0, limite: 5 }
  ];

  observacao = '';
  acaiAberto = true;
  lancheAberto = true;
  bebidaAberto = true;

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

  adicionar(item: any) {
    if (item.quantidade < item.limite) item.quantidade++;
  }

  remover(item: any) {
    if (item.quantidade > 0) item.quantidade--;
  }

  get totalAdicionais() {
    const totalBatata = this.adicionaisBatata.reduce((sum, a) => sum + a.preco * a.quantidade, 0);
    const totalCuscuz = this.adicionaisCuscuz.reduce((sum, a) => sum + a.preco * a.quantidade, 0);
    const totalBebidas = this.bebidas.reduce((sum, b) => sum + b.preco * b.quantidade, 0);
    return totalBatata + totalCuscuz + totalBebidas;
  }

  get total() {
    const precoPrincipal =
      this.produto?.categoria === 'cuscuzNordestino' ? this.cuscuzSelecionado?.preco || 0 :
      this.produto?.categoria === 'caldosESopas' ? this.caldoSelecionado?.preco || 0 :
      this.batataSelecionada?.preco || 0;

    return precoPrincipal + this.totalAdicionais;
  }

  finalizar() {
    if (this.produto?.categoria === 'cuscuzNordestino' && !this.cuscuzSelecionado) {
      alert('Selecione o tipo de Cuscuz Nordestino.');
      return;
    }

    if (this.produto?.categoria === 'caldosESopas' && !this.caldoSelecionado) {
      alert('Selecione o tipo de Caldo.');
      return;
    }

    if (
      this.produto?.categoria !== 'cuscuzNordestino' &&
      this.produto?.categoria !== 'caldosESopas' &&
      !this.batataSelecionada
    ) {
      alert('Selecione o tipo de Batata Recheada.');
      return;
    }

    const principal =
      this.produto?.categoria === 'cuscuzNordestino' ? this.cuscuzSelecionado :
      this.produto?.categoria === 'caldosESopas' ? this.caldoSelecionado :
      this.batataSelecionada;

    const categoria =
      this.produto?.categoria === 'cuscuzNordestino' ? 'Cuscuz Nordestino' :
      this.produto?.categoria === 'caldosESopas' ? 'Caldos e Sopas' :
      'Batata Recheada';

    const adicionaisSelecionados = [
      ...(this.produto?.categoria === 'cuscuzNordestino'
        ? this.adicionaisCuscuz.filter(a => a.quantidade > 0)
        : this.produto?.categoria === 'caldosESopas'
          ? []
          : this.adicionaisBatata.filter(a => a.quantidade > 0)),
      ...this.bebidas.filter(b => b.quantidade > 0)
    ];

    const pedido = {
      produto: {
        nome: `${categoria} - ${principal.nome}`,
        preco: principal.preco,
        categoria,
        imagem: this.produto.imagem
      },
      adicionais: adicionaisSelecionados,
      observacao: this.observacao,
      total: this.total
    };

    this.carrinho.adicionarItem(pedido);
    alert('Pedido adicionado ao carrinho!');
    this.router.navigate(['/lista-produtos']);
  }
}
