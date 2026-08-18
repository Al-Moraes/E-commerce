import { Component } from '@angular/core';
import { computed } from '@angular/core';
import { inject } from '@angular/core';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '../../../core/facades/auth.facade';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin',
  imports: [MatButtonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})

export class Admin {
  private authFacade = inject(AuthFacade);
  private router = inject(Router);

  totalProdutosCadastrados = signal(20);
  pedidosPendentes = signal(3);
  usuariosCadastrados = signal(8);

  usuarioAtual = this.authFacade.usuarioAtual;

  mensagemPerfil = computed(() => {
    const usuario = this.usuarioAtual();

    if (!usuario) {
      return 'Nenhum usuário autenticado.';
    }

    return `Usuário autenticado como ${usuario.perfil}.`;
  });

  sair() {

    this.authFacade.sair();
    this.router.navigateByUrl('/login');
  }
}
