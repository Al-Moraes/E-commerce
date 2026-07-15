import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { UpperCasePipe, CurrencyPipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe'; 

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  //Entrada de dado de lista-produto.ts
 @Input() nome:string = '';
 @Input() preco:number = 0;
 //Saída de dados de produtos selecionados para lista-produtos.ts
 @Output() produtoSelecionado = new EventEmitter<string>();
 
 selecionarProduto() {
  this.produtoSelecionado.emit(this.nome);
 }
}
