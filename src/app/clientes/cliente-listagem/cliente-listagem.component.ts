import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClienteService } from '../../shared/service/cliente.service';
import { Cliente } from '../../shared/model/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-listagem.component.html',
  styleUrl: './cliente-listagem.component.scss'
})
export class ClienteListagemComponent implements OnInit {
seletor: any;

  constructor(private ClienteService: ClienteService, private router: Router){
  }

public clientes: Array<Cliente> = new Array();

  ngOnInit(): void {
    this.buscarClientes();
  }

  buscarClientes() {
    this.ClienteService.listarTodos().subscribe(
      resultado => {
        this.clientes = resultado;
      },
      erro => {
        console.log('Erro ao buscar Clientes: ', erro);
      }
    )
  }
}

