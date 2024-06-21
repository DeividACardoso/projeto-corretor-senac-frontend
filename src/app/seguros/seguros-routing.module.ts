import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguroDetalheComponent } from './seguros-detalhe/seguros-detalhe.component';
import { SegurosInspecaoComponent } from './seguros-inspecao/seguros-inspecao.component';
import { SegurosListagemComponent } from './seguros-listagem/seguros-listagem.component';

const routes: Routes = [
  { path: 'lista', component: SegurosListagemComponent },
  { path: 'detalhe', component: SeguroDetalheComponent },
  { path: 'detalhe/:id', component: SeguroDetalheComponent },
  { path: 'inspecao/:id', component: SegurosInspecaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurosRoutingModule { }
