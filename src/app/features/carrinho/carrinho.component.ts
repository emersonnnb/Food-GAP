import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarrinhoService } from '../services/carrinho.service';
import { Router } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatTooltipModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss',
})
export class CarrinhoComponent {
  itens = this.carrinho.listarItens();

  form!: FormGroup;

  formasPagamento = ['Pix', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'];

  constructor(
    private carrinho: CarrinhoService, 
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      observacaoEntrega: [''],
      formaPagamento: ['', Validators.required],
      trocoPara: [''],
    });
  }

  get totalCarrinho() {
    return this.itens.reduce((sum, item) => sum + item.total, 0);
  }

  removerItem(index: number) {
    debugger;
    this.itens.splice(index, 1);
    this.carrinho.atualizarItens(this.itens);    
    if (this.itens.length == 1) {
      this.router.navigate(['/lista-produtos']);
    }
  }

  limparCarrinho() {
    this.carrinho.limparCarrinho();
    this.itens = [];
    this.router.navigate(['/lista-produtos']);
  }

  finalizarPedido() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const pedidoFinal = {
      cliente: {
        nome: this.form.value.nome,
        telefone: this.form.value.telefone,
      },
      entrega: {
        endereco: this.form.value.endereco,
        observacao: this.form.value.observacaoEntrega,
      },
      pagamento: {
        forma: this.form.value.formaPagamento,
        trocoPara: this.form.value.formaPagamento === 'Dinheiro' ? this.form.value.trocoPara : null,
      },
      itens: this.itens,
      total: this.totalCarrinho,
    };

    const mensagemWhatsApp = this.gerarMensagemWhatsApp(pedidoFinal);
    const numeroWhatsAppLoja = '5521970397985'; // Número do WhatsApp da loja
    window.open(`https://wa.me/${numeroWhatsAppLoja}?text=${encodeURIComponent(mensagemWhatsApp)}`, '_blank');

    this.carrinho.limparCarrinho();
    this.itens = [];
    this.form.reset();
  }

  gerarMensagemWhatsApp(pedido: any): string {
    let mensagem = `*🍔 GAP FOOD - NOVO PEDIDO 🍔*\n\n`;
    mensagem += `*Cliente:* ${pedido.cliente.nome}\n`;
    mensagem += `*Telefone:* ${pedido.cliente.telefone}\n\n`;
    mensagem += `📍 *Endereço:* ${pedido.entrega.endereco}\n`;
    if (pedido.entrega.observacao) {
      mensagem += `*Observações:* ${pedido.entrega.observacao}\n`;
    }
    mensagem += `\n💳 *Pagamento:* ${pedido.pagamento.forma}`;
    if (pedido.pagamento.trocoPara) {
      mensagem += ` (Troco para: R$${pedido.pagamento.trocoPara})\n`;
    } else {
      mensagem += `\n`;
    }
    mensagem += `\n🛒 *Itens do Pedido:*\n`;

    pedido.itens.forEach((item: any) => {
      mensagem += `- ${item.quantidade || 1}x ${item.produto.nome} `;
      mensagem += `(R$${item.total.toFixed(2)})\n`;

      if (item.adicionais && item.adicionais.length > 0) {
        mensagem += `   Adicionais:\n`;
        item.adicionais.forEach((adicional: any) => {
          mensagem += `   • ${adicional.quantidade}x ${adicional.nome} `;
          mensagem += adicional.preco > 0 ? `(R$${(adicional.preco * adicional.quantidade).toFixed(2)})\n` : `(Grátis)\n`;
        });
      }

      if (item.observacao) {
        mensagem += `   Obs: ${item.observacao}\n`;
      }
    });

    mensagem += `\n💰 *Total do Pedido:* R$${pedido.total.toFixed(2)}\n\n`;
    mensagem += `Obrigado pelo seu pedido! 😉`;

    return mensagem;
  }

  onBack() {    
    this.router.navigate(['/lista-produtos']);
  }
}
