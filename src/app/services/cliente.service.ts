import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);

  list() {
    return this.http.get('http://localhost:8080/api/clientes');
  }

  get(id: number) {
    return this.http.get('http://localhost:8080/api/clientes/$(id)');
  }

  create(cliente: any) {
    return this.http.post('http://localhost:8080/api/clientes',cliente);
  }

  update(id: number, cliente: any) {
    return this.http.post('http://localhost:8080/api/clientes/$(id)',cliente);
  }

  delete(id: number) {
    return this.http.delete('http://localhost:8080/api/clientes/$(id)');
  }

}
