import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cliente } from "../model/cliente.interface";
// import { ClienteSeletor } from 'src/app/shared/model/seletor/cliente.seletor'

@Injectable({
  providedIn :'root'
})
export class ClienteService{
  private readonly API = 'http://localhost:8080/api/clientes'

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Array<Cliente>>{
    return this.httpClient.get<Array<Cliente>>(this.API+'/todos');
  }

  pesquisarPorId(id: number){
    return this.httpClient.get<Cliente>(this.API+'/'+id)
  }

  // listarComFiltro(seletor: ClienteSeletor): Observable<Array<Cliente>>{
  //   return this.httpClient.post<Array<Cliente>>(this.API+'/filtro', seletor);
  // }

  salvar(cliente: Cliente): Observable<Cliente>{
    return this.httpClient.post<Cliente>(this.API+'/novo', cliente);
  }

  atualizar(cliente : Cliente): Observable<Cliente>{
    return this.httpClient.post<Cliente>(this.API, cliente);
  }

  excluir(id: number): Observable<Cliente>{
    return this.httpClient.delete<Cliente>(this.API+'/delete-id/'+id);
  }
}
