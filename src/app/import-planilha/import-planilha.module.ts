import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportPlanilhaRoutingModule } from './import-planilha-routing.module';
import { SharingModule } from '../shared/shared.module';
import { ImportPlanilhaComponent } from './import-planilha/import-planilha.component';


@NgModule({
  declarations: [
    ImportPlanilhaComponent
  ],
  imports: [
    CommonModule,
    ImportPlanilhaRoutingModule,
    SharingModule
  ]
})
export class ImportPlanilhaModule { }
