import { Component, OnInit, inject } from '@angular/core';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export default class ClienteListComponent implements OnInit {
  private clienteService = inject(ClienteService);

  ngOnInit() {
    this.clienteService.list()
    .subscribe(clientes =>
      {console.log(clientes);
      });
  }
}
