import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../shared/model/cliente.interface';
import { ClienteService } from '../../shared/service/cliente.service';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss']
})
export class ClienteDetalheComponent implements OnInit{

  public cliente:Cliente = new Cliente();
  public idCliente: number;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(private clienteService : ClienteService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.idCliente = params['id'];

    if(this.idCliente){
      this.buscarCliente();
    }
  });
}

buscarCliente() {
  this.clienteService.pesquisarPorId(this.idCliente).subscribe(
    resultado =>{
      this.cliente = resultado;
    },
    erro =>{
      Swal.fire('Erro', 'Erro ao buscar cliente com ID (' + this.idCliente + ') : ', 'error');
      return;
    }
  )
}

salvar(form: NgForm){
  if(form.invalid){
    Swal.fire("Erro", "Formulário inválido", 'error');
  }
  if(this.idCliente){
    this.atualizar();
  } else {
    this.inserirCliente();
  }
}
inserirCliente() {
  this.clienteService.salvar(this.cliente).subscribe(
    sucesso => {
      Swal.fire("Sucesso", "Cliente salvo com sucesso", 'success');
      this.cliente = new Cliente();
    },
    erro => {
      Swal.fire("Erro", "Não foi possivel salvar o cliente: " + erro.error.message, 'error');
    }
  )
}
atualizar() {
  this.clienteService.atualizar(this.cliente).subscribe(
    sucesso => {
      Swal.fire("Sucesso", "Cliente Atualizado com Sucesso!", 'success');
    },
    erro => {
      Swal.fire("Erro", "Não foi possivel atualizar o Cliente", 'error');
    }
  )
}

public voltar(){
  this.router.navigate(['/clientes/lista'])
}

public compareById(r1: any, r2: any): boolean{
  return r1 && r2 ? r1.id === r2.id : r1 === r2;
}

}
