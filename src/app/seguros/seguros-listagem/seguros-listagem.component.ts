import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Seguro } from '../../shared/model/seguro';
import { SeguroService } from '../../shared/service/seguro.service';
import { SeguroSeletor } from '../../shared/model/seletor/seguro.seletor';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-seguros-listagem',
  templateUrl: './seguros-listagem.component.html',
  styleUrl: './seguros-listagem.component.scss'
})
export class SegurosListagemComponent implements OnInit{

  constructor(private SeguroService: SeguroService, private router: Router, private titleService: Title){
  }

  public seguros: Array<Seguro> = new Array();
  public seletor: SeguroSeletor = new SeguroSeletor();
  title = "Listagem de Seguros"

  ngOnInit(): void {
    this.titleService.setTitle(this.title)
    this.buscarSeguros();
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
  pesquisar(){
    this.SeguroService.listarComFiltro(this.seletor).subscribe(
      resultado => {
        this.seguros = resultado;
      },
      erro =>{
        console.log('Erro ao buscar Seguros com filtros: ', erro);
      }
    )
  }
  inspecionar(id: number){
    this.router.navigate(['seguros/inspecao', id])
  }
}
