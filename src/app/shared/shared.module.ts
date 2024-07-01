import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { NumberMaskPipe } from "./number-mask-pipe/number-mask.pipe";
import { PhonePipe } from "./phone-pipe/phone.pipe";
import { ClienteService } from "./service/cliente.service";
import { CNPJPipe } from './cnpj-mask/cnpj-mask.pipe';
import { OnlyNumbersDirective } from "./only-number/only-numbers.directive";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { TimeFormat} from "./time-format/time-mask.pipe";

@NgModule({
imports: [
    CommonModule,
],
declarations: [
    NumberMaskPipe, PhonePipe, CNPJPipe, NavBarComponent, OnlyNumbersDirective, TimeFormat
],
exports: [
    NumberMaskPipe, PhonePipe, CNPJPipe, NavBarComponent, OnlyNumbersDirective, TimeFormat
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
