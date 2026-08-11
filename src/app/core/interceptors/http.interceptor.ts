import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs"; 
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const httpInterceptor: HttpInterceptorFn = (req, next) =>{

    const authService = inject(AuthService);
    //!NOVO METODO TOKEN
    const token = authService.obterToken();
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
    }
    
    if(error.status === 500){
        console.warn('Erro Interno do Servidor!');
    }
    return throwError(() => error);
    }),
    );
};