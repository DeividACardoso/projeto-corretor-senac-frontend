import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { LoginRoutingModule } from './login-routing.module';
import { SharingModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { CodigoComponent } from './codigo/codigo.component';


@NgModule({
  declarations: [
    LoginComponent,
    CadastroComponent,
    RecuperarComponent,
    CodigoComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    HttpClientModule,
    FormsModule,
    SharingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class LoginModule {}
