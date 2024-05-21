import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguradoraRoutingModule } from './seguradora-routing.module';
import { SeguradoraListagemComponent } from './seguradora-listagem/seguradora-listagem.component';
import { SeguradoraDetalheComponent } from './seguradora-detalhe/seguradora-detalhe.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SeguradoraListagemComponent,
    SeguradoraDetalheComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SeguradoraRoutingModule,
  ]
})
export class SeguradoraModule { }
