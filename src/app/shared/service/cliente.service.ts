import { HttpClient, withInterceptors } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { Cliente } from "../model/cliente";
// import { ClienteSeletor } from 'src/app/shared/model/seletor/cliente.seletor'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly API = 'http://localhost:8080/api/clientes';

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Array<Cliente>> {
    return this.httpClient.get<Array<Cliente>>(this.API + '/todos');
  }

  pesquisarPorId(id: number) {
    return this.httpClient.get<Cliente>(this.API + '/' + id);
  }

  // listarComFiltro(seletor: ClienteSeletor): Observable<Array<Cliente>>{
  //   return this.httpClient.post<Array<Cliente>>(this.API+'/filtro', seletor);
  // }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.API + '/novo', cliente);
  }

  atualizar(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.API, cliente);
  }

  excluir(id: number): Observable<Cliente> {
    return this.httpClient.delete<Cliente>(this.API + '/delete-id/' + id);
  }

  verificarClienteTemSeguro(id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(this.API + '/verificar-seg-ativo/' + id);
  }

  public uploadfile(file: File) {
    let formParams = new FormData();
    formParams.append('file', file);
    return this.httpClient.post(this.API + '/importar', formParams);
  }

}
