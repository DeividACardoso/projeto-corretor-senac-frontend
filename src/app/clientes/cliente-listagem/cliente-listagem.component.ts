import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../shared/service/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../shared/model/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-listagem.component.html',
  styleUrl: './cliente-listagem.component.scss'
})

export class ClienteListagemComponent implements OnInit {
seletor: any;

  constructor(private clienteService: ClienteService, private router: Router){
  }

public clientes: Array<Cliente> = new Array();

  ngOnInit(): void {
    this.buscarClientes();
  }

  buscarClientes() {
    this.clienteService.listarTodos().subscribe(
      resultado => {
        this.clientes = resultado;
      },
      erro => {
        console.log('Erro ao buscar Clientes: ', erro);
      }
    )
  }
  editar(id: number){
    this.router.navigate(['clientes/detalhe', id])
  }

  excluir(id: number){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja excluir o cliente #' + id + "?",
      icon: 'warning',
      showCancelButton: true,
    }).then(r => {
      if(r.isConfirmed){
      this.clienteService.excluir(id).subscribe(
        sucesso => {
          Swal.fire("Sucesso", "Cliente excluído com sucesso!", 'success');
          this.buscarClientes();
        },
        erro => {
          Swal.fire("Erro", "Erro ao excluir o cliente: " + erro.error.message, 'error')
        }
      )
    }
    })
  }
}
