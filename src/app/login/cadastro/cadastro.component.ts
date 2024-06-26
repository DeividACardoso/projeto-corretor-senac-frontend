import { Component } from '@angular/core';
import { RegisterDTO } from '../../shared/model/register.dto';
import { CorretorService } from '../../shared/service/corretor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  constructor(private corretorService: CorretorService,
    private router: Router,
    private route: ActivatedRoute) { }

  public dto: RegisterDTO = new RegisterDTO();
  public confirmarSenha: string;
  public emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  public cadastrar(form: NgForm) {
    try {
      console.log(form)
      if (form.invalid) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Preencha todos os campos corretamente!'
        });
        return;
      }
      if (this.dto.senha !== this.confirmarSenha) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'As senhas não coincidem!'
        });
      } else {
        this.dto.cpf = this.dto.cpf.replace(/\D/g, '');
        this.dto.telefone = this.dto.telefone.replace(/\D/g, '');
        this.corretorService.register(this.dto).subscribe(
          (data: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Cadastro realizado com sucesso! Você será redirecionado para a tela de login.'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/login']);
              }
            });
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.'
            });
          }
        );
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.'
      });
    }
  }

  validCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) {
      return false;
    }
  }

  validTelefone(telefone: string) {
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length !== 11) {
      return false;
    }
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}
