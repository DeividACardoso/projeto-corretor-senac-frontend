import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Seguro } from "../model/seguro";
import { Observable } from "rxjs";
// import { SeguroSeletor } from 'src/app/shared/model/seletor/seguro.seletor'
import { Cliente } from "../model/cliente";
import { SeguroSeletor } from "../model/seletor/seguro.seletor";
import { Seguradora } from "../model/seguradora";
import { Sinistro } from "../model/sinistro";

@Injectable({
  providedIn: 'root'
})
export class SeguroService {
  constructor(private httpClient: HttpClient) { }

  private readonly API = 'http://localhost:8080/api/seguros'

  listarTodos(): Observable<Array<Seguro>> {
    return this.httpClient.get<Array<Seguro>>(this.API + '/todos');
  }

  getListaClientes(): Observable<Array<Cliente>> {
    return this.httpClient.get<Array<Cliente>>('http://localhost:8080/api/clientes/todos');
  }

  getListaSeguradoras(): Observable<Array<Seguradora>> {
    return this.httpClient.get<Array<Seguradora>>('http://localhost:8080/api/seguradora/todos');
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

  public encontrarSeguroPorCliente(id: number): Observable<Seguro[]> {
    return this.httpClient.get<Array<Seguro>>(this.API + '/seg-cliente/' + id);
  }

  public encontrarSeguroPorVeiculo(id: number): Observable<Seguro> {
    return this.httpClient.get<Seguro>(this.API + '/seg-veiculo/' + id);
  }

  public encontrarSeguroPorSinistro(id: number): Observable<Sinistro[]> {
    return this.httpClient.get<Array<Sinistro>>(this.API + '/seg-sinistro/' + id);
  }
}
