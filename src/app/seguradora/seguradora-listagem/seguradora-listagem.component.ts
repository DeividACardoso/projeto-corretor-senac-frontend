import { Seguradora } from './../../shared/model/seguradora';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SeguradoraService } from '../../shared/service/seguradora.service';
import Swal from 'sweetalert2';
import { SeguradoraSeletor } from '../../shared/model/seletor/seguradora.seletor';
import { Title } from '@angular/platform-browser';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-seguradora-listagem',
  templateUrl: './seguradora-listagem.component.html',
  styleUrl: './seguradora-listagem.component.scss'
})
export class SeguradoraListagemComponent {
  public seguradora: Seguradora = new Seguradora();
  public idSeguradora: number;
  public seletor: SeguradoraSeletor = new SeguradoraSeletor();
  fileName = "RelatorioSeguradoras.xlsx"

  constructor(private seguradoraService: SeguradoraService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title) {
  }

  public seguradoras: Array<Seguradora> = new Array();
  title = "Listagem de Seguradoras"

  ngOnInit(): void {
    this.verificarToken();
    this.titleService.setTitle(this.title)
    this.buscarSeguradora();
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  buscarSeguradora() {
    this.seguradoraService.listarTodos().subscribe(
      resultado => {
        this.seguradoras = resultado;
      }
    )
  }

  buscarSeguradoraPorId() {
    this.seguradoraService.pesquisarPorId(this.idSeguradora).subscribe(
      resultado => {
        this.seguradora = resultado;
      },
      erro => {
        Swal.fire('Erro', 'Erro ao buscar Seguradora com ID (' + this.idSeguradora + ') : ', 'error');
        return;
      }
    )
  }

  pesquisar() {
    this.seguradoraService.listarComFiltro(this.seletor).subscribe(
      resultado => {
        this.seguradoras = resultado;
      },
      erro => {
        Swal.fire('Erro ao buscar as seguradoras com filtros: ', erro);
      }
    )
  }

  editar(id: number) {
    this.router.navigate(['seguradora/detalhe', id])
  }

  limpar() {
    this.seletor = new SeguradoraSeletor();
  }

  exportar() {
    let data = document.getElementById("tabelaSeguradora");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  excluir(id: number){
    Swal.fire({
      title: 'Confirmação',
      text: 'Deseja realmente excluir a Seguradora?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.seguradoraService.verificarSeguro(id).subscribe(
          (temSeguro) => {
            if (temSeguro) {
              Swal.fire(
                'Erro',
                'Não é possível excluir a seguradora pois possui seguro(s) associado',
                'error'
              );
            } else {
              this.seguradoraService.excluir(id).subscribe(
                (sucesso) => {
                  Swal.fire('Sucesso', 'Veguradora excluído com sucesso!', 'success');
                  this.buscarSeguradora();
                },
                (erro) => {
                  Swal.fire(
                    'Erro',
                    'Erro ao excluir o Veguradora' + erro.error.message,
                    'error'
                  );
                }
              );
            }
          },
          (erro) => {
            Swal.fire(
              'Erro',
              'Erro ao verificar seguro do veículo: ' + erro.error.message,
              'error'
            );
          }
        );
      }
    });
  }
}