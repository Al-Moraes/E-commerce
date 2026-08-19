import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink, MatButtonModule, PrecoFormatadoPipe],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  public carrinhoFacade = inject(CarrinhoFacade);
  private router = inject(Router);
  private authFacade = inject(AuthFacade);

  removerItem (rmvItem: number) {
    this.carrinhoFacade.limparCarrinho();
  }

  limparCarrinho() {
    this.carrinhoFacade.limparCarrinho();
  }

  cancelarCompra() {
    this.authFacade.sair();
    this.carrinhoFacade.limparCarrinho();
    this.router.navigateByUrl('/login');
  }
}
