import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportPlanilhaComponent } from './import-planilha/import-planilha.component';

const routes: Routes = [
  { path: 'import', component: ImportPlanilhaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportPlanilhaRoutingModule { }
