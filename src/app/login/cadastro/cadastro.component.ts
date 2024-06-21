import { Component } from '@angular/core';
import { RegisterDTO } from '../../shared/model/register.dto';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  public dto: RegisterDTO = new RegisterDTO();
  public confirmarSenha: string;


  cadastrar() {
    //TODO: Implementar a chamada para o serviço de cadastro
  }

}
