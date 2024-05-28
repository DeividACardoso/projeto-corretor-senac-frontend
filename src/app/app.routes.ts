import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'seguros', pathMatch: 'full' },
  { path: 'seguros', loadChildren:() => import('./seguros/seguros.module').then((m) => m.SegurosModule) },
  { path: 'clientes', loadChildren:() => import('./clientes/clientes.module').then((m) => m.ClientesModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
];
