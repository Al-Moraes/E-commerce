import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { AuthFacade } from '../../../core/facades/auth.facade';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, RouterLink, MatIconModule, UpperCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

    nomeLoja = 'Lojas Estadunidenses';  

    private carrinhoService = inject(CarrinhoFacade);
    quantidade = this.carrinhoService.quantidadeCarrinho;

    private authFacade = inject(AuthFacade);
    usuarioLogado = this.authFacade.usuarioLogado;
    usuarioAtual = this.authFacade.usuarioAtual;

    private router = inject(Router);
    
    sair() {
      this.authFacade.sair();
      this.router.navigateByUrl('/login');
    }
    
}
