import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router'; //Remove importação do RouterOutlet
//import { Produto } from './components/produto/produto'; //Importa o componente Produto
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
@Component({
  selector: 'app-root',
  imports: [ListaProdutos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
}
