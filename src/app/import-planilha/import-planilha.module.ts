import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportPlanilhaRoutingModule } from './import-planilha-routing.module';
import { SharingModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImportPlanilhaRoutingModule,
    SharingModule
  ]
})
export class ImportPlanilhaModule { }
