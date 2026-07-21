import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; //Remove importação do RouterOutlet
//import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  nomeLoja = 'Jumbinha Tecnologia'; 
}
