import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurosRoutingModule } from './seguros-routing.module';
import { SegurosListagemComponent } from './seguros-listagem/seguros-listagem.component';
import { SeguroDetalheComponent } from './seguros-detalhe/seguros-detalhe.component'


@NgModule({
  declarations: [
    SegurosListagemComponent,
    SeguroDetalheComponent
  ],
  imports: [
    CommonModule,
    SegurosRoutingModule
  ]
})
export class SegurosModule { }
