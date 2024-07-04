import { AfterViewInit, OnInit, ViewChild, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguro } from '../../shared/model/seguro';
import { SeguroService } from '../../shared/service/seguro.service';
import { Cliente } from '../../shared/model/cliente';
import Swal from 'sweetalert2';
import { VeiculoService } from '../../shared/service/veiculo.service';
import { Veiculo } from '../../shared/model/veiculo';
import { Seguradora } from '../../shared/model/seguradora';

@Component({
  selector: 'app-seguro-detalhe',
  templateUrl: './seguros-detalhe.component.html',
  styleUrls: ['./seguros-detalhe.component.scss']
})
export class SeguroDetalheComponent implements OnInit, AfterViewInit {
  public seguro: Seguro = new Seguro();
  public seguros: Array<Seguro> = new Array();
  public idSeguro: number;
  public listaSeguradoras: Array<Seguradora> = new Array();
  public listaClientes: Array<Cliente> = new Array();
  public listaVeiculos: Array<Veiculo> = new Array();
  displayCliente: string;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(private seguroService: SeguroService,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.verificarToken();
    this.route.params.subscribe(params => {
      this.idSeguro = params['id'];
      this.carregarListaSeguradoras();
      if (this.idSeguro) {
        console.log("Modo atualizar: ID do seguro:", this.idSeguro);
        this.carregarListaVeiculos();
        this.buscarSeguro();
      } else {
        this.carregarListaClientes();
      }
    });
  }

  verificarToken(){
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  ngAfterViewInit(): void {
    if (this.idSeguro) {
      this.carregarListaClientes();
      this.carregarListaVeiculos();

    }
  }

  onInputChange(event: any) {
    const input = event.target.value;
    const selectedClient = this.listaClientes.find(cliente => `${cliente.nome}` === input);
    if (selectedClient) {
      this.seguro.cliente = selectedClient;
    } else {
      this.seguro.cliente = null;
    }
  }

  ngOnChanges() {
    if (this.seguro.cliente) {
      this.displayCliente = `${this.seguro.cliente.cpf}`;
    } else {
      this.displayCliente = '';
    }
  }

  carregarListaClientes() {
    this.seguroService.getListaClientes().subscribe(
      (clientes) => {
        this.listaClientes = clientes;
        console.log("Lista de clientes carregada:", this.listaClientes);
      },
      (error) => {
        console.error('Erro ao obter lista de clientes', error);
      }
    );
  }

  onClienteSelected(clienteId: number): void {
    this.seguro.cliente = this.listaClientes.find(cliente => cliente.id === clienteId);
    if (this.seguro.cliente) {
      this.carregarListaVeiculos();
    }
  }

  carregarListaVeiculos() {
    if (this.idSeguro) {
      this.seguroService.pesquisarPorId(this.idSeguro).subscribe(
        (seguro) => {
          this.seguro = seguro;
          this.veiculoService.listarPorCliente(this.seguro.cliente.id).subscribe(
            (veiculos) => {
              this.listaVeiculos = veiculos;
              console.log("Lista de veiculos carregada com seguro.id:", this.seguro.id);
            },
            (error) => {
              console.error('Erro ao obter lista de veiculos', error);
            }
          );
          console.log("Seguro carregado com idSeguro:", this.seguro, ' id: ', this.seguro.id);
        },
        (error) => {
          console.error('Erro ao obter lista de veiculos', error);
        }
      );
    } else {
      this.veiculoService.listarPorCliente(this.seguro.cliente.id).subscribe(
        (veiculos) => {
          this.listaVeiculos = veiculos;
          console.log("Lista de veiculos carregada com seguro.cliente.id:", this.listaVeiculos);
        },
        (error) => {
          console.error('Erro ao obter lista de veiculos', error);
        }
      );
    }
  }

  carregarListaSeguradoras() {
    this.seguroService.getListaSeguradoras().subscribe(
      (seguradoras) => {
        this.listaSeguradoras = seguradoras;
        console.log("Lista de seguradoras carregada:", this.listaSeguradoras);
      },
      (error) => {
        console.error('Erro ao obter lista de seguradoras', error);
      }
    );
  }

  buscarSeguro() {
    this.seguroService.pesquisarPorId(this.idSeguro).subscribe(
      resultado => {
        this.seguro = resultado;
        this.displayCliente = this.seguro.cliente ? this.seguro.cliente.nome : '';
        console.log("Seguro encontrado:", this.seguro);
      },
      erro => {
        Swal.fire('Erro', 'Erro ao buscar seguro com ID (' + this.idSeguro + ') : ', 'error');
        return;
      }
    );
  }

  voltar() {
    this.router.navigate(['/seguros/lista']);
  }

  salvar(form: NgForm) {

    if (form.invalid) {
      Swal.fire("Erro", "Formulário inválido", 'error');
      return;
    } else {
      if (this.idSeguro) {
        this.atualizar();
      } else {
        this.inserirSeguro();
      }
    }
  }

  public compareById(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  inserirSeguro() {
    if (this.seguro.carroReserva === null) {
      this.seguro.carroReserva = false;
    }
    this.seguroService.salvar(this.seguro).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Seguro salvo com sucesso", 'success');
        this.seguro = new Seguro();
      },
      erro => {
        Swal.fire("Erro", "Não foi possível salvar o seguro: " + erro.error.message, 'error');
      }
    );
  }

  atualizar() {
    this.seguroService.atualizar(this.seguro).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Seguro Atualizado com Sucesso!", 'success');
      },
      erro => {
        Swal.fire("Erro", "Não foi possível atualizar o seguro", 'error');
      }
    );
  }
}
