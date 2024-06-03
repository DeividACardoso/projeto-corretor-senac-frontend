import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorretorDetalheComponent } from './corretor-detalhe/corretor-detalhe.component';

const routes: Routes = [
  { path: 'detalhe', component: CorretorDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorretorRoutingModule { }
