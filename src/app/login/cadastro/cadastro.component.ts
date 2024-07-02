import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterDTO } from '../../shared/model/register.dto';
import { CorretorService } from '../../shared/service/corretor.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'] // Corrected this line
})
export class CadastroComponent {

  constructor(private corretorService: CorretorService,
    private router: Router,
    private route: ActivatedRoute) { }

  public dto: RegisterDTO = new RegisterDTO();
  public confirmarSenha: string;

  public cadastrar(form: NgForm) {
    try {
      if (this.validCPF(this.dto.cpf) == false || this.validTelefone(this.dto.telefone) == false) {
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

  validCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    console.log('Cpf: ', cpf);
    if (cpf.length !== 11) {
      return false;
    }
    return true;
  }

  validTelefone(telefone: string): boolean {
    telefone = telefone.replace(/\D/g, '');
    console.log('Telefone: ', telefone);
    if (telefone.length !== 11) {
      return false;
    }
    return true;
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}
