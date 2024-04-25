import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // private http = inject(HttpClient);

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
  }

  get(id: number) {
    return this.http.get<Cliente>('http://localhost:8080/api/clientes/$(id)');
  }

  create(cliente: Cliente) {
    return this.http.post<Cliente>('http://localhost:8080/api/clientes',cliente);
  }

  update(id: number, cliente: Cliente) {
    return this.http.post<Cliente>('http://localhost:8080/api/clientes/$(id)',cliente);
  }

  delete(id: number) {
    return this.http.delete<void>('http://localhost:8080/api/clientes/$(id)')
  }

}
