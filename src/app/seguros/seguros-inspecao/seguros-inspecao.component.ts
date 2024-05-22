import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguro } from '../../shared/model/seguro';
import { SeguroService } from '../../shared/service/seguro.service';

@Component({
  selector: 'app-seguros-inspecao',
  templateUrl: './seguros-inspecao.component.html',
  styleUrl: './seguros-inspecao.component.scss'
})
export class SegurosInspecaoComponent implements OnInit{
  
  constructor(private SeguroService: SeguroService, private route: ActivatedRoute, private router: Router, private titleService: Title){
  }

  public seguro: Seguro = new Seguro;
  title = "Inspeção de Seguro" 
  public idSeguro: number;

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.route.params.subscribe(params =>{
      this.idSeguro = params['id'];
      this.buscarSeguros(this.idSeguro)
    })
  }
  
  buscarSeguros(id: number) {
    this.SeguroService.pesquisarPorId(id).subscribe(
      resultado => {
        this.seguro = resultado;
      },
      erro => {
        console.log('Erro ao buscar Seguros: ', erro);
      }
    )
  }

  buscarCliente(){

  }
}
