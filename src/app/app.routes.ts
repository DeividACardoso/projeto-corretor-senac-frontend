import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
  { path: 'corretor', loadChildren:() => import('./corretor/corretor.module').then((m) => m.CorretorModule)},
  { path: 'clientes', loadChildren:() => import('./clientes/clientes.module').then((m) => m.ClientesModule) },
  { path: 'seguros', loadChildren:() => import('./seguros/seguros.module').then((m) => m.SegurosModule) },
  { path: 'veiculos', loadChildren:() => import('./veiculo/veiculo.module').then((m) => m.VeiculoModule) },
  { path: 'sinistro', loadChildren:() => import('./sinistro/sinistro.module').then((m) => m.SinistroModule)},
  { path: 'seguradora', loadChildren:() => import('./seguradora/seguradora.module').then((m) => m.SeguradoraModule)},
  { path: 'planilha', loadChildren: () => import('./import-planilha/import-planilha.module').then((m) => m.ImportPlanilhaModule) },
];
