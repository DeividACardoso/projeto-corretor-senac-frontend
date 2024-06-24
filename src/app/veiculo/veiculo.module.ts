import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SharingModule } from '../shared/shared.module';
import { VeiculoDetalheComponent } from './veiculo-detalhe/veiculo-detalhe.component';
import { SinistroRoutingModule } from './veiculo-routing.module';


@NgModule({
    declarations: [
        VeiculoDetalheComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SinistroRoutingModule,
        SharingModule
    ]
})
export class VeiculoModule { }
