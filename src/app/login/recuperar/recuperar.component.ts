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

  // public email: string = '';
  // public message: string = '';
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

  enviarEmail(form: NgForm) {
    if (form.invalid) {
      Swal.fire("Erro", "Formulário inválido", 'error');
      return;
    }

    this.corretorService.enviarEmail(this.corretor).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Se o email inserido equivale a algum no nosso banco de dados, sua senha chegará logo!", 'success');
      },
      erro => {
        Swal.fire("Sucesso", "Se o email inserido equivale a algum no nosso banco de dados, sua senha chegará logo!", 'success');
      }
    );
  }

  voltar() {
    this.router.navigate(['/login']);
  }
}
