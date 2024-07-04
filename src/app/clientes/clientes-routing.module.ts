import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListagemComponent } from './cliente-listagem/cliente-listagem.component';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { ClienteInspecaoComponent } from './cliente-inspecao/cliente-inspecao.component';

const routes: Routes = [
  { path: 'lista', component: ClienteListagemComponent },
  { path: 'detalhe', component: ClienteDetalheComponent },
  { path: 'detalhe/:id', component: ClienteDetalheComponent },
  { path: 'inspecao/:id', component: ClienteInspecaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
