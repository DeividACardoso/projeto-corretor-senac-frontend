import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SharingModule } from '../shared/shared.module';
import { VeiculoDetalheComponent } from './veiculo-detalhe/veiculo-detalhe.component';
import { SinistroRoutingModule } from './veiculo-routing.module';
import { VeiculoListagemComponent } from './veiculo-listagem/veiculo-listagem.component';


@NgModule({
    declarations: [
        VeiculoDetalheComponent,
        VeiculoListagemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SinistroRoutingModule,
        SharingModule
    ]
})
export class VeiculoModule { }
