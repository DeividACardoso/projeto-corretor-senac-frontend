import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { SharingModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';


@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    SharingModule
  ]
})
export class LoginModule {}
