import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
// import { SeguroSeletor } from 'src/app/shared/model/seletor/seguro.seletor'
import { Seguradora as Seguradora } from '../model/seguradora';
import { SeguroSeletor } from "../model/seletor/seguro.seletor";

@Injectable({
  providedIn: 'root'
})
export class SeguradoraService {
  private readonly API = 'http://localhost:8080/api/seguradora'

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Array<Seguradora>> {
    return this.httpClient.get<Array<Seguradora>>(this.API + '/todos');
  }

  pesquisarPorId(id: number) {
    return this.httpClient.get<Seguradora>(this.API + '/' + id)
  }

  listarComFiltro(seguradora: Seguradora): Observable<Array<Seguradora>> {
    return this.httpClient.post<Array<Seguradora>>(this.API + '/filtro', seguradora);
  }

  salvar(seguradora: Seguradora): Observable<Seguradora> {
    return this.httpClient.post<Seguradora>(this.API, seguradora);
  }

  atualizar(id: number, seguradoraPAtualizar: Seguradora): Observable<Seguradora> {
    let url = this.API + '/atualizar/' + id;
    return this.httpClient.put<Seguradora>(url, seguradoraPAtualizar);
  }

  excluir(id: number): Observable<Seguradora> {
    return this.httpClient.delete<Seguradora>(this.API + '/delete/' + id);
  }

}
