import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Sinistro as Sinistro} from '../model/sinistro';

@Injectable({
  providedIn :'root'
})
export class SinistroService{
  private readonly API = 'http://localhost:8080/api/sinistro'

  constructor(private httpClient: HttpClient) {}

  listarTodos(): Observable<Array<Sinistro>>{
    return this.httpClient.get<Array<Sinistro>>(this.API+'/todos');
  }

  pesquisarPorId(id: number){
    return this.httpClient.get<Sinistro>(this.API+'/'+id)
  }

  // listarComFiltro(seletor: SinistroSeletor): Observable<Array<Sinistro>>{
  //   return this.httpClient.post<Array<Sinistro>>(this.API+'/filtro', seletor);
  // }

  salvar(sinistro: Sinistro): Observable<Sinistro>{
    return this.httpClient.post<Sinistro>(this.API + '/novo', sinistro);
  }

  atualizar(idSinistro: number, sinistro: Sinistro): Observable<Sinistro>{
    return this.httpClient.put<Sinistro>(this.API, sinistro +'/atualizar/'+idSinistro);
  }

  excluir(id: number): Observable<Sinistro>{
    return this.httpClient.delete<Sinistro>(this.API+'/delete/'+id);
  }
}
