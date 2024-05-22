import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { NumberMaskPipe } from "./number-mask-pipe/number-mask.pipe";
import { PhonePipe } from "./phone-pipe/phone.pipe";
import { ClienteService } from "./service/cliente.service";
import { CNPJPipe } from './cnpj-mask/cnpj-mask.pipe';

@NgModule({
imports: [
    CommonModule,
],
declarations: [
    NumberMaskPipe, PhonePipe, CNPJPipe
],
exports: [
    NumberMaskPipe, PhonePipe, CNPJPipe
]
})
export class SharingModule {
    static forRoot(): ModuleWithProviders<SharingModule> {
      return {
        ngModule: SharingModule,
        providers: [ ClienteService ]
      };
    }
  }
