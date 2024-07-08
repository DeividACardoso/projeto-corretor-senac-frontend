import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListagemComponent } from './cliente-listagem/cliente-listagem.component';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { ClienteInspecaoComponent } from './cliente-inspecao/cliente-inspecao.component';
import { ClienteDadosComponent } from './cliente-dados/cliente-dados.component';

const routes: Routes = [
  { path: 'lista', component: ClienteListagemComponent },
  { path: 'detalhe', component: ClienteDetalheComponent },
  { path: 'detalhe/:id', component: ClienteDetalheComponent },
  { path: 'inspecao/:id', component: ClienteInspecaoComponent },
  { path: 'dados/:id', component: ClienteDadosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
