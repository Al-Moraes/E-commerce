import { Component, signal } from '@angular/core';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    {nome: 'Teclado Gamer', preco:49.99},
    {nome: 'Mouse Gamer', preco:29.99},
    {nome: 'Monitor Gamer', preco:599.99},
    {nome: 'Desktop Gamer', preco:49.99},
    {nome: 'Headset Gamer', preco:100.50}
  ]);
  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
  }
  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual, {nome:'Sony Playstation 5', preco: 10000}]);
  }
}
