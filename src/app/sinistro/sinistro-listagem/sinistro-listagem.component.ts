import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Sinistro } from '../../shared/model/sinistro';
import { SinistroService } from '../../shared/service/sinistro.service';
import { SinistroSeletor } from '../../shared/model/seletor/sinistro.seletor';

@Component({
  selector: 'app-sinistro-listagem',
  templateUrl: './sinistro-listagem.component.html',
  styleUrl: './sinistro-listagem.component.scss',
})
export class SinistroListagemComponent {
  public sinistro: Sinistro = new Sinistro();
  public seletor: SinistroSeletor = new SinistroSeletor();

  public idSinistro: number;

  constructor(
    private sinistroService: SinistroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public sinistros: Array<Sinistro> = new Array();

  ngOnInit(): void {
    this.buscarSinistro();
  }

  buscarSinistro() {
    this.sinistroService.listarTodos().subscribe(
      (resultado) => {
        this.sinistros = resultado;
      },
      (erro) => {
        Swal.fire('Erro', 'Erro ao buscar todos os Sinistros: ', 'error');
        return;
      }
    );
  }

  buscarSinistroPorId() {
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

  editar(id: number) {
    this.router.navigate(['sinistro/detalhe', id]);
  }

  pesquisar(){
    this.sinistroService.listarComFiltro(this.seletor).subscribe(
      resultado => {
        this.sinistros = resultado;
      },
      erro =>{
        console.log('Erro ao buscar os Sinistros com filtros: ', erro);
      }
    )
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja excluir o sinistro #' + id + '?',
      icon: 'warning',
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        this.sinistroService.excluir(id).subscribe(
          (sucesso) => {
            Swal.fire('Sucesso', 'Sinistro excluído com sucesso!', 'success');
            this.buscarSinistro();
          },
          (erro) => {
            Swal.fire(
              'Erro',
              'Erro ao excluir o sinistro' + erro.error.message,
              'error'
            );
          }
        );
      }
    });
  }
}
