import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { ProdutoDTO } from '../../../interfaces/food.model';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pedido-produto.component.html',
  styleUrl: './pedido-produto.component.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
})
export class PedidoProdutoComponent {

  produtos: ProdutoDTO[] = []; 
  idCateregoria!: number;  
  categoriaSelecionada:any;
  bebidas: ProdutoDTO[] = [];
  adicionais: ProdutoDTO[] = [];
  togledbatata = true;
  toggleAdicional = true;
  toggleBebida = true;
  observacao = '';

  constructor(
    private route: ActivatedRoute,    
    private produtoService: ProdutoService, 
    private router: Router,  
    private cd: ChangeDetectorRef, 
  ) {
    this.idCateregoria = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {    
    this.categoriaSelecionada = this.produtoService.getCategoriaById(this.idCateregoria);
    this.produtos = this.produtoService.getProdutosPorCategoria(this.idCateregoria);
    this.bebidas = this.produtoService.getBebidas();
    this.adicionais = this.produtoService.getAdicionais();  
    console.log("Produtos: ",this.produtos);
    console.log("Bebidas: ",this.bebidas);
    console.log("Adicionais: ",this.adicionais);
    console.log("Categoria Selecionada: ",this.categoriaSelecionada);  
    this.cd.detectChanges(); 
  }

  next() {
    this.router.navigate(['/lista-produtos']);
  }  


  get total() {
    // const precoPrincipal =
    //   this.produto?.categoria === 'cuscuzNordestino' ? this.cuscuzSelecionado?.preco || 0 :
    //   this.produto?.categoria === 'caldosESopas' ? this.caldoSelecionado?.preco || 0 :
    //   this.batataSelecionada?.preco || 0;

    // return precoPrincipal + this.totalAdicionais;
    return '';
  }

}
