import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sinistro } from '../../shared/model/sinistro';
import { SinistroService } from '../../shared/service/sinistro.service';
import { SeguroService } from '../../shared/service/seguro.service';
import { Title } from '@angular/platform-browser';

// interface Seguro {
//   id: number;
//   // cliente: Cliente;
//   // seguradora: Seguradora;
//   rcfDanosMateriais: number;
//   rofDanosFisicos: number;
//   dtInicioVigencia: Date;
//   dtFimVigencia: Date;
//   numeroProposta: string;
//   franquia: number;
//   carroReserva: boolean;
//   numApolice: string;
// }

@Component({
  selector: 'app-sinistro-detalhe',
  templateUrl: './sinistro-detalhe.component.html',
  styleUrl: './sinistro-detalhe.component.scss',
})

export class SinistroDetalheComponent implements OnInit {
  public sinistro: Sinistro = new Sinistro();
  public idSinistro: number;

  listaSeguros: SeguroService[] = [];
  seguroSelecionado?: SeguroService;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(
    private sinistroService: SinistroService,
    private route: ActivatedRoute,
    private router: Router,
    private seguroService: SeguroService,
    private titleService: Title
  ) { }

  title = "Cadastro de Sinistro"

  // ngOnInit(): void {
  //   this.route.params.subscribe((params) => {
  //     this.idSinistro = params['id'];

  //     if (this.idSinistro) {
  //       this.buscarSinistro();
  //     }
  //   });
  // }
  ngOnInit(): void {
    this.titleService.setTitle(this.title)
      this.seguroService.listarTodos

    this.route.params.subscribe((params) => {
      this.idSinistro = params['id'];

      if (this.idSinistro) {
        this.buscarSinistro();
      }
    });
  }


  salvar(form: NgForm) {
    if (form.invalid) {
      Swal.fire('Erro', 'Formulário inválido', 'error');
    }
    if (this.idSinistro) {
      this.atualizar();
    } else {
      this.inserirSinistro();
    }
  }
  public voltar() {
    this.router.navigate(['/sinistro/lista']);
  }

  inserirSinistro() {
    this.sinistroService.salvar(this.sinistro).subscribe(
      (sucesso) => {
        Swal.fire('Sucesso', 'Sinistro salvo com sucesso', 'success');
        this.sinistro = new Sinistro();
      },
      (erro) => {
        Swal.fire(
          'Erro',
          'Não foi possivel salvar o sinistro: ' + erro.error.message,
          'error'
        );
      }
    );
  }

  atualizar() {
    this.sinistroService.atualizar(this.idSinistro, this.sinistro).subscribe(
      (sucesso) => {
        Swal.fire('Sucesso', 'Sinistro Atualizado com Sucesso!', 'success');
      },
      (erro) => {
        Swal.fire('Erro', 'Não foi possivel atualizar o Sinistro', 'error');
      }
    );
  }

  buscarSinistro() {
    this.sinistroService.pesquisarPorId(this.idSinistro).subscribe(
      (resultado) => {
        this.sinistro = resultado;
      },
      (erro) => {
        Swal.fire(
          'Erro',
          'Erro ao buscar Sinistro com ID (' + this.idSinistro + ') : ',
          'error'
        );
        return;
      }
    );
  }


}
