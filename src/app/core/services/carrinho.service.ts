import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";
import { ItemCarrinho } from "../models/item-carrinho";
import { effect } from "@angular/core";
import { inject } from "@angular/core";
import { PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})

export class CarrinhoService{

//! Estado Global
private carrinho = signal<ItemCarrinho[]>(this.carregarcarrinhoSalvo());


//? Seletores

itens = computed(() => this.carrinho());
quantidadeItens = computed(() => this.carrinho().length); //!Quantidade de itens do carrinho
totalItens = computed(() =>
    this.carrinho().reduce((total, item) => total + item.preco, 0));
carrinhoVazio = computed(() => this.carrinho().length === 0);

//! ================ PERSISTÊNCIA CARRINHO ======================

private platformId = inject(PLATFORM_ID);

//! Chave de recuperação LocalStorage
private readonly chaveStorage = 'carrinho-storage';

constructor() {
    effect(() => {
        this.salvarCarrinho(this.carrinho());
    });
}

private estaNoNavegador(): boolean{
    return isPlatformBrowser(this.platformId);
}

private carregarcarrinhoSalvo(): ItemCarrinho[]{
    if(!this.estaNoNavegador()){
        return[];
    }

    const dadosSalvos = localStorage.getItem(this.chaveStorage);

    if(!dadosSalvos){
        return [];
    }

    try {
        return JSON.parse(dadosSalvos) as ItemCarrinho[];
    } catch {
        return[];
    }
}

private salvarCarrinho (item: ItemCarrinho[]) {
    if(!this.estaNoNavegador()) {
        return;
    }
    localStorage.setItem(this.chaveStorage, JSON.stringify(item));
}


// TODO: Ações
adicionar(produto:ItemCarrinho){
    this.carrinho.update(lista => [...lista, produto]);
}

limpar(){
    this.carrinho.set([]);
}

removerItem(rmvItem:number) {
    this.carrinho.update((listaAtual) => listaAtual.filter((_, index) => index !== rmvItem));
}
}
