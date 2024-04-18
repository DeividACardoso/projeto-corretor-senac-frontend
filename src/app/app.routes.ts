import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'seguros', pathMatch: 'full' },
  { path: 'seguros', loadChildren:() => import('./seguros/seguros.module').then((m) => m.SegurosModule) },

{
    path: 'new',
    loadComponent: () => import('./cliente-form/cliente-form.component')
},

{
    path: ':id/edit',
    loadComponent: () => import('./cliente-form/cliente-form.component')
}
];
