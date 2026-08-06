import { inject, Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

type ProdutoApi = {
    title: string;
    price: number;
};
type Produto = {
    nome: string;
    preco: number;
};

@Injectable({providedIn: 'root'})
export class produtoService {
   
    private http = inject(HttpClient);
    private API = 'https://fakestoreapi.com/products';
    
    buscarProdutos(){
        return this.http.get<ProdutoApi []>(this.API);
    }
    
    transformarProdutos(dados: ProdutoApi[]):Produto[]{
        return dados.map((p) => ({
            nome: p.title,
            preco: p.price,
        }));
    }
    
}