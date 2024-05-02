import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'seguros', pathMatch: 'full' },
  { path: 'seguros', loadChildren:() => import('./seguros/seguros.module').then((m) => m.SegurosModule) },
  { path: 'clientes', loadChildren:() => import('./clientes/clientes.module').then((m) => m.ClientesModule) },
];
