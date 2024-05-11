import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../shared/service/cliente.service';
import { Cliente } from '../../shared/model/cliente';
import Swal from 'sweetalert2';

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

  editar(id: number){
    this.router.navigate(['clientes/detalhe', id])
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
      title: 'Você está certo disso?',
      text: 'Deseja excluir o cliente #' + id + "?",
      icon: 'warning',
      showCancelButton: true,
    }).then(r => {
      this.ClienteService.excluir(id).subscribe(
        sucesso => {
          Swal.fire("Sucesso", "Cliente excluido com sucesso!", 'success');
          this.buscarClientes();
        },
        erro => {
          Swal.fire("Erro", "Erro ao excluir o cliente: " + erro, 'error')
        }
      )
    })
  }
}
