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
    localStorage.removeItem('token');
    this.corretorService.login(this.dto).subscribe(
      (resultado: any) => {
        console.log('Login realizado com sucesso: ', resultado.token);
        this.wrongAttempts = 0;
        this.corretorService.storeToken(resultado.token);
        this.router.navigate(['/clientes/lista'])
      },
      (erro: any) => {
        if(this.dto.login == '' || this.dto.password == ''){
          alert('Preencha todos os campos!');
        }
        if(erro.status == 403 || erro.status == 400){
          this.wrongAttempts++;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuário ou senha inválidos!',
          })
        }
      }
    );
  }

  public cadastro() {
    this.router.navigate(['login/cadastro']);
  }

  public recuperarSenha() {
    this.router.navigate(['login/recuperar']);
  }

  private wrongAttempts: number = 0;

  public loginWithTimeout() {
    if (this.wrongAttempts >= 5) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você excedeu o número de tentativas de login permitidas. Tente novamente em 1 minuto.',
      });
      setTimeout(() => {
        this.wrongAttempts = 0;
      }, 60000);
      return;
    }

    if (this.wrongAttempts >= 7) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você excedeu o número de tentativas de login permitidas. Tente novamente em 10 minutos.',
      });
      setTimeout(() => {
        this.wrongAttempts = 0;
      }, 600000);
      return;
    }

    this.login();
  }

  ngOnInit() {
    localStorage.removeItem('token');
    this.wrongAttempts = Number(localStorage.getItem('wrongAttempts')) || 0;
  }

  ngOnDestroy() {
    localStorage.setItem('wrongAttempts', String(this.wrongAttempts));
  }

}
