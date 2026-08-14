import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-acesso-negado',
  imports: [RouterLink, MatAnchor],
  templateUrl: './acesso-negado.html',
  styleUrl: './acesso-negado.css',
})
export class AcessoNegado {
  private authService = inject (AuthService);
  private router = inject(Router);

  sair() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    return;
  }
}
