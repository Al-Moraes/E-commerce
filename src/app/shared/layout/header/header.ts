import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { inject } from '@angular/core';
import { CarrinhoService } from '../../../core/services/carrinho.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbarModule, RouterLink, MatIconModule, UpperCasePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    nomeLoja = 'Lojas Estadunidenses';

    private carrinhoService = inject(CarrinhoService);
    quantidade = this.carrinhoService.quantidadeItens;
    private authService = inject(AuthService);
    usuarioLogado = this.authService.usuarioLogado;
    usuarioAtual = this.authService.usuarioAtual;
    
    sair() {
      this.authService.logout();
    }
    
}
