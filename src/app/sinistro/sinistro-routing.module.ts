import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinistroListagemComponent } from './sinistro-listagem/sinistro-listagem.component';
import { SinistroDetalheComponent } from './sinistro-detalhe/sinistro-detalhe.component';

const routes: Routes = [
  {path: 'lista', component: SinistroListagemComponent },
  { path: 'detalhe', component: SinistroDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SinistroRoutingModule { }
