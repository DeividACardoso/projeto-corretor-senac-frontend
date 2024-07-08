import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthenticationDTO } from '../../shared/model/authentication.dto';
import { CommonModule } from '@angular/common';
import { CorretorService } from '../../shared/service/corretor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Corretor } from '../../shared/model/corretor';
import Swal from 'sweetalert2';
import { Cliente } from '../../shared/model/cliente';
import { LoginResponseDTO } from '../../shared/model/loginResponse.dto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public dto: AuthenticationDTO = new AuthenticationDTO();
  public loginResponseDTO: LoginResponseDTO = new LoginResponseDTO();
  public corretor: Corretor = new Corretor();
  public cliente: Cliente = new Cliente();
  public isLoggedIn: boolean = false;
  title = 'Login';
  private wrongAttempts: number = 0;

  constructor(
    private corretorService: CorretorService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    localStorage.removeItem('token');
    this.wrongAttempts = Number(localStorage.getItem('wrongAttempts')) || 0;
  }

  public login() {
    localStorage.removeItem('token');
    this.corretorService.login(this.dto).subscribe(
      (resultado: LoginResponseDTO) => {
        this.wrongAttempts = 0;
        this.corretorService.storeToken(resultado.token);
        this.isLoggedIn = true;
        if (resultado.role === 'ADMIN') {
          this.router.navigate(['/clientes/lista']);
        } else if (resultado.role === '' || resultado.role === 'USER' || resultado.role === null) {
          this.encontrarClientePorEmail(this.dto.login);
        }
      },
      (erro: any) => {
        if (this.dto.login == '' || this.dto.password == '') {
          alert('Preencha todos os campos!');
        }
        if (erro.status == 403 || erro.status == 400) {
          this.wrongAttempts++;
          Swal.fire({
            icon: 'error',
            title: 'Tente novamente!',
            text: 'Usuário ou senha inválidos.',
          });
        }
      }
    );
  }

  public cadastro() {
    this.router.navigate(['login/cadastro']);
  }

  public recuperarSenha() {
    this.corretorService.recuperarSenha(this.corretor.id, this.corretor).subscribe(
      (sucesso) => {
        Swal.fire('Sucesso', 'Senha atualizada com Sucesso!', 'success');
      },
      (erro) => {
        Swal.fire('Erro', 'Não foi possível atualizar a sua senha', 'error');
      }
    );
  }

  public loginWithTimeout() {
    if (this.wrongAttempts >= 5 && this.wrongAttempts < 7) {
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


  ngOnDestroy() {
    localStorage.setItem('wrongAttempts', String(this.wrongAttempts));
  }

  encontrarClientePorEmail(login: string) {
    this.corretorService.encontrarClientePorEmail(login).subscribe(
      (resultado: Cliente) => {
        if (resultado == null) {
          Swal.fire({
            icon: 'error',
            title: 'Dados não encontrados',
            text: 'Seu seguro pode não ter sido criado ainda. Entre em contato com o seu corretor.',
          });
        } else {
          this.router.navigate(['/clientes/dados/', resultado.id]);
        }
      },
      (erro: any) => {
        console.log('Erro ao buscar Cliente por Email: ', erro);
      }
    );
  }
}
