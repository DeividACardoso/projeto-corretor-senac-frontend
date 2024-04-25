import { CommonModule } from '@angular/common';
import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Cliente } from '../model/cliente.interface';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})

export default class ClienteListComponent implements OnInit {

// private clienteService = inject(ClienteService);
clientes: any[] = [];

constructor(private clienteService: ClienteService, private router: Router) {}

trackById: TrackByFunction<any> = (index, item) => {
    return item.id;
}

ngOnInit(): void {
  this.clienteService.list().subscribe(clientes => {
    this.clientes = clientes;
    });
  }

deleteCliente(cliente: Cliente) {
    this.clienteService.delete(cliente.id).subscribe(() => console.log(''));
  }
}

