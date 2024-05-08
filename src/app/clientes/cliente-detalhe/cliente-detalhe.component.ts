import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from '../../shared/model/cliente';
import { ClienteService } from '../../shared/service/cliente.service';
import { HttpClient } from '@angular/common/http';

interface DadosDoJSON {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
}

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss']
})
export class ClienteDetalheComponent implements OnInit{
  
  public cliente:Cliente = new Cliente();
  public idCliente: number;
  dados: DadosDoJSON;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(private clienteService : ClienteService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {}

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

public viaCep(cepInformado: string){
  //'document' é uma variável global que representa todo o HTML e seus elementos (a árvore DOM - Document Object Model)
  var txtCep = document.getElementById('txtCep');

  fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
  .then(resultado => resultado.json())
  .then(json => {
    if(json.erro){
      Swal.fire("Erro", "Não foi possível preencher os campos de endereço", 'warning')
      }else{
          this.preencherCamposComJSON(json);
      }
  })
  .catch(erro => {
  })
}

public voltar(){
  this.router.navigate(['/clientes/lista'])
}

public compareById(r1: any, r2: any): boolean{
  return r1 && r2 ? r1.id === r2.id : r1 === r2;
}

public preencherCamposComJSON(json: any) {
  this.cliente.uf = json.uf;
  this.cliente.cidade = json.localidade;
  this.cliente.bairro = json.bairro;
  this.cliente.rua = json.logradouro;
}
}

