//import { Routes } from '@angular/router';
//import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos'; import Legado
//import { Carrinho } from './features/carrinho/carrinho/carrinho';
//import { Home } from './features/home/home/home';
//
//export const routes: Routes = [
//   {
//        path: '',
//        component: Home, 
//    },
//    //Código Legado Router
//    //{
//    //    path: 'produtos',
//    //    component: ListaProdutos,
//    //},
//    {
//        path:'produtos',
//        loadComponent: () =>
//            import('./features/produtos/lista-produtos/lista-produtos').then((m) => m.ListaProdutos)
//    },
//    {
//        path: 'carrinho',
//        component: Carrinho,
//    },
//];

//!Código Final LazyLoading e LoadComponent

import { Routes } from "@angular/router";
import { authGuard } from "./core/auth.guard";
import { adminGuard } from "./core/admin.guard";

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./features/home/home/home').then((m) => m.Home),
    },
    {   path:'produtos',
        loadComponent: () =>
            import('./features/produtos/lista-produtos/lista-produtos').then((m) => m.ListaProdutos),
    },
    {
        path: 'carrinho',
        canActivate:[authGuard],
        loadComponent: () =>
            import('./features/carrinho/carrinho/carrinho').then((m) => m.Carrinho),
    },
    {
        path: 'checkout',
        canActivate:[authGuard],
        loadComponent: () =>
            import ('./features/checkout/checkout/checkout').then((m) => m.Checkout),
    },
    {
        path:'login',
        loadComponent:() =>
            import ('./features/login/login/login').then((m) => m.Login),
    },
    {
        path: 'admin',
        canActivate:[adminGuard],
        loadComponent: () =>
            import ('./features/admin/admin/admin').then((m) => m.Admin),
    },
    {
        path: 'acesso-negado',
        loadComponent: () =>
        import('./features/acesso-negado/acesso-negado/acesso-negado').then(m => m.AcessoNegado),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
