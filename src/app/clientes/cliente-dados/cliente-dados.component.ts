import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Seguro } from '../../shared/model/seguro';
import { Veiculo } from '../../shared/model/veiculo';
import { SeguroService } from '../../shared/service/seguro.service';
import { VeiculoService } from '../../shared/service/veiculo.service';
import { ClienteService } from '../../shared/service/cliente.service';
import { Cliente } from '../../shared/model/cliente';

@Component({
  selector: 'app-cliente-dados',
  templateUrl: './cliente-dados.component.html',
  styleUrl: './cliente-dados.component.scss'
})
export class ClienteDadosComponent implements OnInit {

  constructor(private seguroService: SeguroService, private clienteService: ClienteService, private veiculoService: VeiculoService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
  }

  title = "Dados do Cliente"
  public seguros: Array<Seguro> = new Array();
  public veiculos: Array<Veiculo> = new Array();
  public idCliente: number;
  public sinistros: Array<any> = new Array();
  public cliente: Cliente;

  ngOnInit(): void {
    this.verificarToken();
    this.titleService.setTitle(this.title);
    this.route.params.subscribe(params => {
      this.idCliente = params['id'];
      this.buscarSeguros(this.idCliente)
      this.buscarVeiculos(this.idCliente)
      this.buscarCliente(this.idCliente)
    })
  }

  buscarCliente(id: number) {
    this.clienteService.pesquisarPorId(id).subscribe(
      (resultado: Cliente) => {
        this.cliente = resultado;
        console.log('Cliente: ', this.cliente);
      },
      erro => {
        Swal.fire('Erro ao buscar Cliente', 'Erro ao buscar Cliente', 'error');
      }
    )
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  buscarSeguros(id: number) {
    this.seguroService.encontrarSeguroPorCliente(id).subscribe(
      resultado => {
        this.seguros = resultado;
        console.log('Seguros: ', this.seguros);
      },
      erro => {
        console.log('Erro ao buscar Seguros: ', erro);
      }
    )
  }

  buscarSeguroPorVeiculo(id: number){
    this.seguroService.encontrarSeguroPorVeiculo(id).subscribe(
      resultado => {
        console.log('Seguro por Veiculo: ', resultado);
      },
      erro => {
        console.log('Erro ao buscar Seguro por Veiculo: ', erro);
      }
    )
  }

  buscarVeiculos(id: number) {
    this.veiculoService.listarPorCliente(id).subscribe(
      resultado => {
        this.veiculos = resultado;
      },
      erro => {
        console.log('Erro ao buscar Veiculos: ', erro);
      }
    )
  }

  voltar(){
    Swal.fire({
      title: 'Deseja sair?',
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