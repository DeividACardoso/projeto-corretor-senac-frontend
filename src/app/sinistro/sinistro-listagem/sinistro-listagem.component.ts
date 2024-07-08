import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Sinistro } from '../../shared/model/sinistro';
import { SinistroService } from '../../shared/service/sinistro.service';
import { SinistroSeletor } from '../../shared/model/seletor/sinistro.seletor';
import { Title } from '@angular/platform-browser';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sinistro-listagem',
  templateUrl: './sinistro-listagem.component.html',
  styleUrl: './sinistro-listagem.component.scss',
})
export class SinistroListagemComponent {
  public sinistro: Sinistro = new Sinistro();
  public seletor: SinistroSeletor = new SinistroSeletor();

  public idSinistro: number;
  fileName = "RelatorioSinistros.xlsx"

  constructor(
    private sinistroService: SinistroService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}
  title="Listagem de Sinistros"
  public sinistros: Array<Sinistro> = new Array();

  ngOnInit(): void {
    this.verificarToken();
    this.titleService.setTitle(this.title)
    this.buscarSinistro();
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
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

  limpar() {
    this.seletor = new SinistroSeletor();
  }
  exportar() {
    let data = document.getElementById("tabelaSeguros");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb, this.fileName);

  }

  excluir(sinistro: Sinistro) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja excluir o sinistro do: ' + sinistro.seguro.cliente.cpf + '?',
      icon: 'warning',
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        this.sinistroService.excluir(sinistro.id).subscribe(
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
