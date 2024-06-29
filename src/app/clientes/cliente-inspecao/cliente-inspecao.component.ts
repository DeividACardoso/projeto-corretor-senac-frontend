import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguro } from '../../shared/model/seguro';
import { SeguroService } from '../../shared/service/seguro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-inspecao',
  templateUrl: './cliente-inspecao.component.html',
  styleUrl: './cliente-inspecao.component.scss'
})
export class ClienteInspecaoComponent implements OnInit {

  constructor(private SeguroService: SeguroService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
  }

  title = "Inspeção de Seguro"
  public seguros: Array<Seguro> = new Array();
  public idCliente: number;
  public sinistros: Array<any> = new Array();

  ngOnInit(): void {
    this.verificarToken();
    this.titleService.setTitle(this.title);
    this.route.params.subscribe(params => {
      this.idCliente = params['id'];
      this.buscarSeguros(this.idCliente)
    })
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  buscarSeguros(id: number) {
    this.SeguroService.encontrarSeguroPorCliente(id).subscribe(
      resultado => {
        this.seguros = resultado;
        console.log('Seguros: ', this.seguros);
      },
      erro => {
        console.log('Erro ao buscar Seguros: ', erro);
      }
    )
  }

  voltar(){
    Swal.fire({
      title: 'Deseja voltar?',
      text: "Você será redirecionado a tela de login!",
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: `Sim`,
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['login'])
      }
    })
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