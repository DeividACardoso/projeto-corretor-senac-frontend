import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Seguro } from '../../model/seguro'; 
import { SeguroService } from '../../services/seguro.service';
// import Swal from sweetalert2';
// import { Veiculo } from 'src/app/shared/model/veiculo';
// import { VeiculoService } from 'src/app/shared/service/veiculo.service';
// import { VeiculoSeletor } from 'src/app/shared/model/seletor/veiculo.seletor';
import { Cliente } from '../../model/cliente.interface';  

@Component({
  selector: 'app-seguro-detalhe',
  templateUrl: './seguros-detalhe.component.html',
  styleUrls: ['./seguros-detalhe.component.scss']
})
export class SeguroDetalheComponent implements OnInit{
  public seguro: Seguro = new Seguro();
  public seguros: Array<Seguro> = new Array();
  public idSeguro: number;
  public listaClientes: Array<Cliente> = new Array();
  // public listaVeiculos: Array<Veiculo> = new Array();

  @ViewChild('ngForm')
  public ngForm: NgForm;


  constructor(private seguroService : SeguroService,
              // private veiculoService: VeiculoService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.carregarListaClientes();
    // this.route.params.subscribe(params => {
    //   this.idSeguro = params['id'];


    //   if(this.idSeguro){
    //     this.buscarSeguro();
    //   }
    // });
  }

  // buscarVeiculosDoCliente(){
  //   let veiculoSeletor: VeiculoSeletor = new VeiculoSeletor();
  //   veiculoSeletor.idCliente = this.seguro.cliente.id;
  //   this.veiculoService.listarComFiltro(veiculoSeletor).subscribe(
  //     (veiculos) => {
  //       this.listaVeiculos = veiculos; // Mantém a lista de objetos de cliente
  //     },
  //     (error) => {
  //       console.error('Erro ao obter lista de veículos de um cliente', error);
  //     }
  //   );
  // }

  voltar(){
    this.router.navigate(['/seguros/lista'])
  }

  // carregarListaClientes() {
  //   this.seguroService.getListaClientes().subscribe(
  //     (clientes) => {
  //       this.listaClientes = clientes; // Mantém a lista de objetos de cliente
  //     },
  //     (error) => {
  //       console.error('Erro ao obter lista de clientes', error);
  //     }
  //   );
  // }


  // buscarSeguro() {
  //   this.seguroService.pesquisarPorId(this.idSeguro).subscribe(
  //     resultado =>{
  //       this.seguro = resultado;
  //     },
  //     erro =>{
  //       Swal.fire('Erro', 'Erro ao buscar seguro com ID (' + this.idSeguro + ') : ', 'error');
  //       return;
  //     }
  //   )
  // }

// salvar(form: NgForm){
//   if(form.invalid){
//     Swal.fire("Erro", "Formulário inválido", 'error');
//   }
//   if(this.idSeguro){
//     this.atualizar();
//   } else {
//     this.inserirSeguro();
//   }
// }

public compareById(r1: any, r2: any): boolean {
  return r1 && r2 ? r1.id === r2.id : r1 === r2;
}

// inserirSeguro() {
//     this.seguroService.salvar(this.seguro).subscribe(
//     sucesso => {
//       Swal.fire("Sucesso", "Seguro salvo com sucesso", 'success');
//       this.seguro = new Seguro();
//     },
//     erro => {
//       Swal.fire("Erro", "Não foi possivel salvar o seguro: " + erro.error.message, 'error');
//     }
//   )
// }
// atualizar() {
//   this.seguroService.atualizar(this.seguro).subscribe(
//     sucesso => {
//       Swal.fire("Sucesso", "Seguro Atualizado com Sucesso!", 'success');
//     },
//     erro => {
//       Swal.fire("Erro", "Não foi possivel atualizar o seguro", 'error');
//     }
//   )
// }
}