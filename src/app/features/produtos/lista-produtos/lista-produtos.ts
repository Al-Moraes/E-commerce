import { Component} from '@angular/core';
import { signal } from '@angular/core';
import { Produto } from '../produto/produto';
import { computed } from '@angular/core';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { effect } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { produtoService } from '../../../core/services/produtos.service';
import { inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { ItemCarrinho } from '../../../core/models/item-carrinho';
import { RouterLink } from '@angular/router';
import { ProdutoLoja } from '../../../core/models/produto-loja';


@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})

export class ListaProdutos {

  produtos = signal < ProdutoLoja []> ([]);
  carregando = signal(true);
  produtoSelecionado = signal< string | null> (null);   
  erro = signal < string | null > (null);

  carregarProdutos(){
    this.carregando.set(true);
    this.erro.set(null); 

    this.produtoService.buscarProdutos().subscribe({
      next: (dados) => {
        const produtos= this.produtoService.transformarProdutos(dados);
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar os Produtos:, ', erro);
        this.erro.set('Erro ao carregar Produtos. Verifique sua conexão e tente novamente!');
        this.carregando.set(false);
      },
    });
  }
    
  

  exibirProduto (nome: string){
    console.log ('Produto Selecionado: ', nome);
    this.produtoSelecionado.set(nome);
  }
  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual, {nome:'Processador Intel Core i5 14550FS', preco: 2500}]);
  }


  totalProdutos = computed (() => this.produtos().length);
  valorTotal = computed (() => { return this.produtos().reduce((total, item) => total + item.preco,0)});
  valorTotalFormatado = computed(() => this.valorTotal().toFixed(2));
  
    
    substituirProdutos (){
      this.produtos.set([
        {nome: 'Teclado', preco: 40},
        {nome: 'Mouse', preco: 10},
        {nome: 'Monitor', preco: 100},
        {nome: 'Desktop', preco: 500},
        {nome: 'Headset', preco: 25}
      ]);
    
    }
    
    
    constructor(){
      
      this.carregarProdutos();
      
      effect(() => {
        if (typeof document !== 'undefined') {
          document.title = `(${this.totalProdutos()}) Minha Loja`;
        }
      });
    }
   
    
    
    adicionarAocarrinho(produto:ItemCarrinho){
      this.carrinhoFacade.adicionarProdutoCarrinho(produto);
    }    
    
    private produtoService = inject(produtoService);
    public carrinhoFacade = inject(CarrinhoFacade);

    quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
    totalCarrinho = this.carrinhoFacade.totalCarrinho;
}
