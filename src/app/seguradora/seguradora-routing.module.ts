import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguradoraListagemComponent } from './seguradora-listagem/seguradora-listagem.component';
import { SeguradoraDetalheComponent } from './seguradora-detalhe/seguradora-detalhe.component';

const routes: Routes = [
  { path: 'lista', component: SeguradoraListagemComponent },
  { path: 'detalhe', component: SeguradoraDetalheComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguradoraRoutingModule { }
