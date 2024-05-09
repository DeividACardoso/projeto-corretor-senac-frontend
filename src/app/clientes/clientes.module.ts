import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberMaskPipe } from '../shared/number-mask-pipe/number-mask.pipe';
import { PhonePipe } from '../shared/phone-pipe/phone.pipe';
import { ClienteDetalheComponent } from './cliente-detalhe/cliente-detalhe.component';
import { ClienteListagemComponent } from './cliente-listagem/cliente-listagem.component';
import { ClientesRoutingModule } from './clientes-routing.module';


@NgModule({
  declarations: [
    ClienteDetalheComponent,
    ClienteListagemComponent,
    NumberMaskPipe,
    PhonePipe
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientesModule { }
