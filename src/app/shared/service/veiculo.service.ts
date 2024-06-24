import { Injectable } from "@angular/core";
import { Veiculo } from "../model/veiculo";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { VeiculoSeletor } from "../model/seletor/veiculo.seletor";

@Injectable({
    providedIn: 'root'
})
export class VeiculoService {

    private readonly API = 'http://localhost:8080/api/veiculo';
    constructor(private httpClient: HttpClient) { }

    excluir(id: number) {
        return this.httpClient.delete<Veiculo>(this.API+'/delete/'+id);
    }
    listarComFiltro(seletor: VeiculoSeletor): Observable<Array<Veiculo>>{
        return this.httpClient.post<Array<Veiculo>>(this.API+'/filtro', seletor);
    }
    listarTodos() {
        return this.httpClient.get<Array<Veiculo>>(this.API+'/todos');
    }
    pesquisarPorId(idVeiculo: number) {
        return this.httpClient.get<Veiculo>(this.API+'/'+idVeiculo)
    }
    
    salvar(veiculo: Veiculo): Observable<Veiculo>{
        return this.httpClient.post<Veiculo>(this.API + '/novo', veiculo);  
    }

    listar(): Observable<Array<Veiculo>> {
        return this.httpClient.get<Array<Veiculo>>(this.API + '/todos');
    }

    atualizar(idVeiculo: number, veiculo: Veiculo): Observable<Veiculo>{
        let url = this.API + '/atualizar/' + idVeiculo;
        return this.httpClient.put<Veiculo>(url, veiculo);
      }
}