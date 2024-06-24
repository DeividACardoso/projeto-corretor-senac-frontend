import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculoDetalheComponent } from './veiculo-detalhe/veiculo-detalhe.component';

const routes: Routes = [
    { path: 'detalhe', component: VeiculoDetalheComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SinistroRoutingModule { }
