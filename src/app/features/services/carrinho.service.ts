import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private itens = new BehaviorSubject<any[]>([]);
  itens$ = this.itens.asObservable();

  adicionarItem(item: any) {
    const atual = this.itens.value;
    this.itens.next([...atual, item]);
  }

  listarItens() {
    return this.itens.value;
  }

  atualizarItens(itens: any[]) {
    this.itens.next(itens);
  }

  limparCarrinho() {
    this.itens.next([]);
  }
}
