import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { ClienteListagemComponent } from './cliente-listagem/cliente-listagem.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { SharingModule } from '../shared/shared.module';
import { ClienteInspecaoComponent } from './cliente-inspecao/cliente-inspecao.component';


@NgModule({
  declarations: [
    ClienteDetalheComponent,
    ClienteListagemComponent,
    ClienteInspecaoComponent
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
