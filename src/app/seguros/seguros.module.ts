import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SeguroDetalheComponent } from './seguros-detalhe/seguros-detalhe.component';
import { SegurosListagemComponent } from './seguros-listagem/seguros-listagem.component';
import { SegurosRoutingModule } from './seguros-routing.module';
import { SharingModule } from '../shared/shared.module';
import { Title } from '@angular/platform-browser';
import { SegurosInspecaoComponent } from './seguros-inspecao/seguros-inspecao.component';


@NgModule({
  declarations: [
    SegurosListagemComponent,
    SeguroDetalheComponent,
    SegurosInspecaoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SegurosRoutingModule,
    //Import abaixo necessário para utilizar de Pipes
    SharingModule
  ],
  providers: [
    Title
  ]
})
export class SegurosModule { }