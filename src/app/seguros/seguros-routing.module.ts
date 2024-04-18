import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SegurosListagemComponent } from './seguros-listagem/seguros-listagem.component';
import { SegurosDetalheComponent } from './seguros-detalhe/seguros-detalhe.component';

const routes: Routes = [
  { path: 'lista', component: SegurosListagemComponent },
  { path: 'detalhe', component: SegurosDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurosRoutingModule { }
