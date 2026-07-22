import { signal } from "@angular/core";

//!Define valor inicial do signal usuarioLogado como (false).
export const usuarioLogado = signal(false);

//!Define signal usuarioLoagado como (true), permite acesso as rotas.
export function login(){
    usuarioLogado.set(true);
}

//!Define signal usuarioLogado como (false), bloqueia acesso imediatamente.
export function logout(){
    usuarioLogado.set(false);
}