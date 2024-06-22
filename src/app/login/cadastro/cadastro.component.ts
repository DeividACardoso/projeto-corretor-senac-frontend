import { Component } from '@angular/core';
import { RegisterDTO } from '../../shared/model/register.dto';
import { CorretorService } from '../../shared/service/corretor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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


  public cadastrar() {
    try {
      if (this.dto.senha !== this.confirmarSenha) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'As senhas não coincidem!'
        });
      } else {
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
            console.error(error);
          }
        );
      }

    } catch (error) {
      console.error(error);
    }
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}
