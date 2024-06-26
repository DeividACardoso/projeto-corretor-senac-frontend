import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculoDetalheComponent } from './veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoListagemComponent } from './veiculo-listagem/veiculo-listagem.component';

const routes: Routes = [
    { path: 'detalhe', component: VeiculoDetalheComponent },
    { path: 'lista', component: VeiculoListagemComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SinistroRoutingModule { }
