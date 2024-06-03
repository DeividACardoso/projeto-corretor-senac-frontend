import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Seguro } from "../model/seguro";
import { Observable } from "rxjs";
// import { SeguroSeletor } from 'src/app/shared/model/seletor/seguro.seletor'
import { Cliente } from "../model/cliente";
import { SeguroSeletor } from "../model/seletor/seguro.seletor";

@Injectable({
  providedIn: 'root'
})
export class SeguroService {
  private readonly API = 'http://localhost:8080/api/seguros'

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Array<Seguro>> {
    return this.httpClient.get<Array<Seguro>>(this.API + '/todos');
  }
  getListaClientes(): Observable<Array<Cliente>> {
    return this.httpClient.get<Array<Cliente>>('http://localhost:8080/api/clientes/todos');
  }

  pesquisarPorId(id: number) {
    return this.httpClient.get<Seguro>(this.API + '/' + id)
  }

  listarComFiltro(seletor: SeguroSeletor): Observable<Array<Seguro>> {
    return this.httpClient.post<Array<Seguro>>(this.API + '/filtro', seletor);
  }

  salvar(seguro: Seguro): Observable<Seguro> {
    return this.httpClient.post<Seguro>(this.API, seguro);
  }

  atualizar(seguro: Seguro): Observable<Seguro> {
    return this.httpClient.post<Seguro>(this.API, seguro);
  }

  excluir(id: number): Observable<Seguro> {
    return this.httpClient.delete<Seguro>(this.API + '/delete-id/' + id);
  }
}
