import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { NumberMaskPipe } from "./number-mask-pipe/number-mask.pipe";
import { PhonePipe } from "./phone-pipe/phone.pipe";
import { ClienteService } from "./service/cliente.service";
import { CNPJPipe } from './cnpj-mask/cnpj-mask.pipe';
import { OnlyNumbersDirective } from "./only-number/only-numbers.directive";
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@NgModule({
imports: [
    CommonModule,
],
declarations: [
    NumberMaskPipe, PhonePipe, CNPJPipe, NavBarComponent, OnlyNumbersDirective
],
exports: [
    NumberMaskPipe, PhonePipe, CNPJPipe, NavBarComponent, OnlyNumbersDirective
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
