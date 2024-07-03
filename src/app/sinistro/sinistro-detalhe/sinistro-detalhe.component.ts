import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Sinistro } from '../../shared/model/sinistro';
import { SinistroService } from '../../shared/service/sinistro.service';
import { SeguroService } from '../../shared/service/seguro.service';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { Seguro } from '../../shared/model/seguro';


@Component({
  selector: 'app-sinistro-detalhe',
  templateUrl: './sinistro-detalhe.component.html',
  styleUrl: './sinistro-detalhe.component.scss',
})

export class SinistroDetalheComponent implements OnInit {
  public sinistro: Sinistro = new Sinistro();
  public idSinistro: number;

  public listaSeguros: Array<Seguro> = new Array();
  public displaySeguro: string;
  // public seguroSelecionado?: SeguroService;

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
      this.seguroService.listarTodos;
      this.preencherListaSeguros();

    this.route.params.subscribe((params) => {
      this.idSinistro = params['id'];

      if (this.idSinistro) {
        this.buscarSinistro();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.idSinistro) {
      this.preencherListaSeguros();
    }
  }

  preencherListaSeguros() {
    this.sinistroService.getListaSeguros().subscribe(
        (seguros) => {
            this.listaSeguros = seguros;
            console.log(this.listaSeguros)
        },
        (error) => {
            console.error('Erro ao obter lista de clientes', error);
        }
    );
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

  // formatDate(date: Date): string {
  //   return formatDate(date, 'yyyy-MM-dd');
  // }

  formatDate(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'UTC-8');
  }

  formatHora(time: string): string {
    const timeFormat = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeFormat.test(time)) {
      throw new Error('Invalid time format. Expected format is HH:mm:ss.');
    }
    return time;
  }

  onDateChange(event: any): void {
    this.sinistro.data = event.target.value;
  }

  onTimeChange(event: any): void {
    try {
      this.sinistro.horario = this.formatHora(event.target.value);
    } catch (error) {
      console.error(error.message);
      // Adicione manipulação de erro apropriada, por exemplo, mostrar uma mensagem de erro ao usuário
    }
  }

  onInputChange(event: any) {
    const input = event.target.value;
    const selectedClient = this.listaSeguros.find(seguro => `${seguro.cliente.cpf} | ${seguro.numApolice}` === input);
    if (selectedClient) {
        this.sinistro.seguro = selectedClient;
    } else {
        this.sinistro.seguro.cliente = null;
    }
  }

  ngOnChanges() {
    if (this.sinistro.seguro.cliente) {
        this.displaySeguro = `${this.sinistro.seguro}`;
    } else {
        this.displaySeguro = '';
    }
}

}
