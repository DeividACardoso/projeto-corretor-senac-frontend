import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharingModule } from '../shared/shared.module';
import { ClienteDadosComponent } from './cliente-dados/cliente-dados.component';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { ClienteInspecaoComponent } from './cliente-inspecao/cliente-inspecao.component';
import { ClienteListagemComponent } from './cliente-listagem/cliente-listagem.component';
import { ClientesRoutingModule } from './clientes-routing.module';


@NgModule({
  declarations: [
    ClienteDetalheComponent,
    ClienteListagemComponent,
    ClienteInspecaoComponent,
    ClienteDadosComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //Import abaixo necessário para utilizar de Pipes
    SharingModule
  ]
})
export class ClientesModule { }
