import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatAnchor } from "@angular/material/button";
import { AuthFacade } from '../../../core/facades/auth.facade';

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatAnchor],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {
  private authFacade = inject (AuthFacade);
  private router = inject(Router);

  sair() {
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
    return;
  }
}
