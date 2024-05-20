import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurosRoutingModule } from './seguros-routing.module';
import { SegurosListagemComponent } from './seguros-listagem/seguros-listagem.component';
import { SeguroDetalheComponent } from './seguros-detalhe/seguros-detalhe.component'
import { FormsModule } from '@angular/forms';
import { NumberMaskPipe } from '../shared/number-mask-pipe/number-mask.pipe';


@NgModule({
  declarations: [
    SegurosListagemComponent,
    SeguroDetalheComponent,
    NumberMaskPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SegurosRoutingModule,
  ]
})
export class SegurosModule { }
