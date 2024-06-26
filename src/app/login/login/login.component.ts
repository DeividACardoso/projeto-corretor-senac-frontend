import { Component } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { AuthenticationDTO } from '../../shared/model/authentication.dto';
import { CommonModule } from '@angular/common';
import { CorretorService } from '../../shared/service/corretor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Corretor } from '../../shared/model/corretor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public dto: AuthenticationDTO = new AuthenticationDTO();
  public idCorretor: number;
  public corretor: Corretor = new Corretor();

  constructor(
    private corretorService: CorretorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public login() {
    console.log('Fazendo login: ', this.dto);
    this.corretorService.login(this.dto).subscribe(
      (resultado: any) => {
        console.log('Login realizado com sucesso: ', resultado.token);
        this.corretorService.storeToken(resultado.token);
        this.router.navigate(['/clientes/lista']);
      },
      (erro: any) => {
        console.log('Erro ao fazer login: ', erro);
      }
    );
  }

  public cadastro() {
    this.router.navigate(['login/cadastro']);
  }

  public recuperarSenha() {
    this.corretorService.enviarEmail(this.idCorretor, this.corretor).subscribe(
        (sucesso) => {
          Swal.fire('Sucesso', 'Senha atualizada com Sucesso!', 'success'); },
        (erro) => {
          Swal.fire('Erro', 'Não foi possivel atualizar a sua senha', 'error');}
      );
  }
}
