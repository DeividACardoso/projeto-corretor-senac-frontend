import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { Corretor } from '../../shared/model/corretor';
import { CorretorService } from '../../shared/service/corretor.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {

  public email: string = '';
  public message: string = '';
  public corretor: Corretor = new Corretor();
  public idCorretor: number;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(private corretorService: CorretorService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  title = "Recuperação de Senha";

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  recuperar(form: NgForm) {
    if (form.invalid) {
      Swal.fire("Erro", "Formulário inválido", 'error');
      return;
    }

    this.corretorService.recuperarSenha(this.idCorretor, this.corretor).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Código de recuperação enviado com sucesso", 'success');
        this.message = 'Código de recuperação enviado com sucesso!';
      },
      erro => {
        Swal.fire("Erro", "Erro ao enviar o código de recuperação. Verifique se o email está cadastrado.", 'error');
        this.message = 'Erro ao enviar o código de recuperação. Verifique se o email está cadastrado.';
      }
    );
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}
