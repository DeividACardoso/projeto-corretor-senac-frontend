import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinistroRoutingModule } from './sinistro-routing.module';
import { SinistroListagemComponent } from './sinistro-listagem/sinistro-listagem.component';
import { FormsModule } from '@angular/forms';
import { SharingModule } from '../shared/shared.module';
import { SinistroDetalheComponent } from './sinistro-detalhe/sinistro-detalhe.component';


@NgModule({
  declarations: [
    SinistroListagemComponent,
    SinistroDetalheComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SinistroRoutingModule,
    SharingModule
  ]
})
export class SinistroModule { }
