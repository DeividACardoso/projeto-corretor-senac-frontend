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
export class SegurosInspecaoComponent implements OnInit {

  constructor(private SeguroService: SeguroService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
  }

  public seguro: Seguro = new Seguro;
  title = "Inspeção de Seguro"
  public idSeguro: number;
  public sinistros: Array<any> = new Array();

  ngOnInit(): void {
    this.verificarToken();
    this.titleService.setTitle(this.title);
    this.route.params.subscribe(params => {
      this.idSeguro = params['id'];
      this.buscarSeguros(this.idSeguro)
    })
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
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

  voltar(){
    this.router.navigate(['seguros/lista'])
  }

  // buscarSinistrosPorSeguro(id: number) {
  //   this.SeguroService.buscarSinistrosPorSeguro(id).subscribe(
  //     resultado => {
  //       this.sinistros = resultado;
  //     },
  //     erro => {
  //       console.log('Erro ao buscar Sinistros: ', erro);
  //     }
  //   )
  // }
}