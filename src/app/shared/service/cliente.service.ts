import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'http://localhost:8080/api/clientes'

  constructor(private http: HttpClient) {}

  listarTodos() {
    return this.http.get<Array<Cliente>>(this.API+'/todos');
  }

  get(id: number) {
    return this.http.get<Cliente>('http://localhost:8080/api/clientes/$(id)');
  }

  create(cliente: Cliente) {
    return this.http.post<Cliente>('http://localhost:8080/api/clientes',cliente);
  }

  update(id: number, cliente: Cliente) {
    return this.http.post<void>('http://localhost:8080/api/clientes/$(id)',cliente);
  }

  delete(id: number) {
    return this.http.delete('http://localhost:8080/api/clientes/$(id)')
  }

}
