import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs"; 
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { AuthFacade } from "../facades/auth.facade";

export const httpInterceptor: HttpInterceptorFn = (req, next) =>{

    const authFacade = inject(AuthFacade);
    const router = inject (Router);
    //!NOVO METODO TOKEN
    const token = authFacade.obterToken();
    //! Requisição de LOG
    console.log('Interceptando requisição: ', req.url);
    //!TOKEN
    const novaReq = token ? 
    req.clone ({
        setHeaders: {
        Authorization: `Bearer ${token}`
        },
    }):req;
    
    //! NOVA REQUISIÇÃO + RESPOSTA DE LOG
    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('RESPONDE: ', event),
            error: (error) => console.log('ERRO', error)
        }),
    
    
    catchError((error) => {
        console.error('ERRO GLOBAL: ', error);
    
    if(error.status === 401){
        console.warn('Não Autorizado!');
        authFacade.sair();
        router.navigateByUrl('/login');
    }
    
    if(error.status === 403){
        console.warn('Acesso negado, perfil sem permissão');
        router.navigateByUrl('/produtos');
    }
    
    if(error.status === 500){
        console.warn('Erro Interno do Servidor!');
    }
    return throwError(() => error);
    }),
    );
};