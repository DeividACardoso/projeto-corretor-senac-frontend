import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SegurosListagemComponent } from './seguros-listagem/seguros-listagem.component';
import { SeguroDetalheComponent } from './seguros-detalhe/seguros-detalhe.component';
import { SegurosInspecaoComponent } from './seguros-inspecao/seguros-inspecao.component';

const routes: Routes = [
  { path: 'lista', component: SegurosListagemComponent },
  { path: 'detalhe', component: SeguroDetalheComponent },
  { path: 'inspecao', component: SegurosInspecaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurosRoutingModule { }
