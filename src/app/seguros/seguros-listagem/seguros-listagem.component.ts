import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Seguro } from '../../shared/model/seguro';
import { SeguroService } from '../../shared/service/seguro.service';
import { SeguroSeletor } from '../../shared/model/seletor/seguro.seletor';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { differenceInCalendarDays } from 'date-fns';



@Component({
  selector: 'app-seguros-listagem',
  templateUrl: './seguros-listagem.component.html',
  styleUrl: './seguros-listagem.component.scss'
})
export class SegurosListagemComponent implements OnInit {

  constructor(private SeguroService: SeguroService, private router: Router, private titleService: Title) {
  }

  public seguros: Array<Seguro> = new Array();
  public idSeguro: number;
  public seguro: Seguro = new Seguro();
  fileName = "RelatorioSeguros.xlsx"


  public seletor: SeguroSeletor = new SeguroSeletor();
  title = "Listagem de Seguros"

  ngOnInit(): void {
    this.verificarToken();
    this.titleService.setTitle(this.title)
    this.buscarSeguros();

    if (this.idSeguro) {
      this.buscarSeguro();
    }
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  buscarSeguros() {
    this.SeguroService.listarTodos().subscribe(
      resultado => {
        this.seguros = resultado;

      },
      erro => {
        console.log('Erro ao buscar Seguros: ', erro);
      }
    )
  }

  buscarSeguro() {
    this.SeguroService.pesquisarPorId(this.idSeguro).subscribe(
      resultado => {
        this.seguro = resultado;
        console.log(this.seguro.cliente.nome)
      },
      erro => {
        Swal.fire('Erro', 'Erro ao buscar Seguro com ID (' + this.idSeguro + ') : ', 'error');
        return;
      }
    )
  }

  isNearExpiry(dtFimVigencia: Date): boolean {
    const today = new Date();
    return differenceInCalendarDays(new Date(dtFimVigencia), today) <= 7;
  }

  pesquisar() {
    this.SeguroService.listarComFiltro(this.seletor).subscribe(
      resultado => {
        this.seguros = resultado;
      },
      erro => {
        console.log('Erro ao buscar Seguros com filtros: ', erro);
      }
    )
  }

  inspecionar(id: number) {
    console.log('Inspeção do seguro com id: ', id);
    this.router.navigate(['seguros/inspecao', id])
  }

  editar(id: number) {
    this.router.navigate(['seguros/detalhe', id]);
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Confirma a exclusão do seguro?',
      text: 'Não será possível reverter esta ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.SeguroService.excluir(id).subscribe(
          resultado => {
            Swal.fire('Sucesso', 'Seguro excluído com sucesso!', 'success');
            this.buscarSeguros();
          },
          erro => {
            Swal.fire('Erro', 'Erro ao excluir Seguro com ID (' + id + ') : ', 'error');
            return;
          }
        )
      }
    })
  }

  exportar(){
    let data = document.getElementById("tabelaSeguros");
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  limpar() {
    this.seletor = new SeguroSeletor();
  }
}
