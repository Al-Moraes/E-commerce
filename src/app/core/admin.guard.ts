import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CanActivateFn } from "@angular/router";
import { AuthFacade } from "./facades/auth.facade";

export const adminGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authFacade = inject(AuthFacade);

    //! - 1) Verificar se o Usuário está logado.
    if(!authFacade.usuarioLogado()) {
        return router.createUrlTree(['/login']);
    }
    //! - 2) Verificar se o Usuário Atual(Logado), se ele tem perfil de administrador.
    if(!authFacade.admin()) {
        return router.createUrlTree(['/acesso-negado'])
    }
    //! - 3) Se o Usuário estiver logado e for administrador = ACESSO LIBERADOOOO

    return true;
};