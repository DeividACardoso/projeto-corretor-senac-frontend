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
export class ClienteDetalheComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public idCliente: number;
  dados: DadosDoJSON;
  public listaEstados: string[] = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO"
  ];

  listaEstadoCivil: ["Solteiro", "Casado", "Viúvo", "Divorciado"];

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.verificarToken();
    this.route.params.subscribe(params => {
      this.idCliente = params['id'];

      if (this.idCliente) {
        this.buscarCliente();
      }
    });
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  buscarCliente() {
    this.clienteService.pesquisarPorId(this.idCliente).subscribe(
      resultado => {
        this.cliente = resultado;
      },
      erro => {
        Swal.fire('Erro', 'Erro ao buscar cliente com ID (' + this.idCliente + ') : ', 'error');
        return;
      }
    )
  }

  salvar(form: NgForm) {
    this.validarData();
    this.removerMascaraCep();
    if (form.invalid) {
      Swal.fire("Erro", "Formulário inválido", 'error');
    } else {
      if (this.idCliente) {
        this.atualizar();
      } else {
        this.inserirCliente();
      }
    }
  }

  removerMascaraCep(){
    this.cliente.cep = this.cliente.cep.replace(/\D/g, '');
  }

  validarData() {
    const currentDate = new Date();
    const birthDate = new Date(this.cliente.dtNascimento);

    if (birthDate > currentDate) {
      Swal.fire("Erro", "Data de nascimento não pode ser no futuro", 'error');
      return;
    }

    let ageDifference = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      ageDifference--;
    }

    if (ageDifference < 18) {
      Swal.fire("Erro", "A pessoa deve ter pelo menos 18 anos", 'error');
      return;
    }
  }

  formatarDataParaYYYYMMDD(data: Date): Date {
    const year = data.getFullYear();
    const month = ('0' + (data.getMonth() + 1)).slice(-2);
    const day = ('0' + data.getDate()).slice(-2);
    return new Date(`${year}-${month}-${day}`)
  }

  inserirCliente() {
    this.clienteService.salvar(this.cliente).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Cliente salvo com sucesso", 'success');
        this.cliente = new Cliente();
      },
      erro => {
        Swal.fire("Erro", erro.error + ".", 'error');
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

  public viaCep(cepInformado: string) {
    //'document' é uma variável global que representa todo o HTML e seus elementos (a árvore DOM - Document Object Model)
    var txtCep = document.getElementById('txtCep');

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
      .then(resultado => resultado.json())
      .then(json => {
        if (json.erro) {
          Swal.fire("Erro", "Não foi possível preencher os campos de endereço", 'warning')
        } else {
          this.preencherCamposComJSON(json);
        }
      })
      .catch(erro => {
      })
  }

  public voltar() {
    this.router.navigate(['/clientes/lista'])
  }

  public compareById(r1: any, r2: any): boolean {
    return r1 && r2 ? r1.id === r2.id : r1 === r2;
  }

  public preencherCamposComJSON(json: any) {
    this.cliente.uf = json.uf;
    this.cliente.cidade = json.localidade;
    this.cliente.bairro = json.bairro;
    this.cliente.rua = json.logradouro;
  }
}

