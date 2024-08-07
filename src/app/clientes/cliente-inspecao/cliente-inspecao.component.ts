import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguro } from '../../shared/model/seguro';
import { SeguroService } from '../../shared/service/seguro.service';
import Swal from 'sweetalert2';
import { Veiculo } from '../../shared/model/veiculo';
import { VeiculoService } from '../../shared/service/veiculo.service';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';

@Component({
  selector: 'app-cliente-inspecao',
  templateUrl: './cliente-inspecao.component.html',
  styleUrl: './cliente-inspecao.component.scss'
})
export class ClienteInspecaoComponent implements OnInit {

  constructor(private seguroService: SeguroService, private clienteService: ClienteService, private veiculoService: VeiculoService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
  }

  title = "Inspeção de Cliente"
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
      this.buscarCliente(this.idCliente)
      this.buscarSeguros(this.idCliente)
      this.buscarVeiculos(this.idCliente)
    })
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  buscarCliente(id: number) {
    this.clienteService.pesquisarPorId(id).subscribe(
      (resultado: Cliente) => {
        this.cliente = resultado;
      },
      erro => {
        Swal.fire('Erro ao buscar Cliente', 'Erro ao buscar Cliente', 'error');
      }
    )
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
    this.router.navigate(['clientes/lista']);
  }

}