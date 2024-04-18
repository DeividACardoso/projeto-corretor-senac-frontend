import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SeguroService } from '../../services/seguro.service';
import { Seguro } from '../../model/seguro';

@Component({
  selector: 'app-seguros-listagem',
  templateUrl: './seguros-listagem.component.html',
  styleUrl: './seguros-listagem.component.scss'
})
export class SegurosListagemComponent implements OnInit{

  constructor(private SeguroService: SeguroService, private router: Router){
  }

  public seguros: Array<Seguro> = new Array();

  ngOnInit(): void {
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
}
