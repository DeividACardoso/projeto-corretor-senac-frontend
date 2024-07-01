import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Veiculo } from "../model/veiculo";
import { Cliente } from "../model/cliente";
import { VeiculoSeletor } from "../model/seletor/veiculo.seletor";

@Injectable({
    providedIn: 'root'
})
export class VeiculoService {

    private readonly API = 'http://localhost:8080/api/veiculo';
    private readonly API_VEICULO = 'https://parallelum.com.br/fipe/api/v1';

    constructor(private httpClient: HttpClient) { }

    excluir(id: number) {
        return this.httpClient.delete<Veiculo>(this.API + '/delete/' + id);
    }
    listarComFiltro(seletor: VeiculoSeletor): Observable<Array<Veiculo>> {
        return this.httpClient.post<Array<Veiculo>>(this.API + '/filtro', seletor);
    }
    listarTodos() {
        return this.httpClient.get<Array<Veiculo>>(this.API + '/todos');
    }
    pesquisarPorId(idVeiculo: number) {
        return this.httpClient.get<Veiculo>(this.API + '/' + idVeiculo)
    }

    salvar(veiculo: Veiculo): Observable<Veiculo> {
        return this.httpClient.post<Veiculo>(this.API + '/novo', veiculo);
    }

    listar(): Observable<Array<Veiculo>> {
        return this.httpClient.get<Array<Veiculo>>(this.API + '/todos');
    }

    getListaClientes(): Observable<Array<Cliente>> {
        return this.httpClient.get<Array<Cliente>>('http://localhost:8080/api/clientes/todos');
    }

    listarPorCliente(id: number): Observable<Array<Veiculo>> {
        return this.httpClient.get<Array<Veiculo>>(this.API + '/cliente/' + id);
    }
    atualizar(idVeiculo: number, veiculo: Veiculo): Observable<Veiculo> {
        let url = this.API + '/atualizar/' + idVeiculo;
        return this.httpClient.put<Veiculo>(url, veiculo);
    }

    preencherMarcas(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.API_VEICULO + '/carros/marcas');
    }

    preencherModelos(marcaCodigo: string): Observable<any> {
        return this.httpClient.get<any>(this.API_VEICULO + '/carros/marcas/' + marcaCodigo + '/modelos');
    }

    procurarVeiculo(marcaCodigo: string, modeloCodigo: string, ano: string): Observable<any> {
        return this.httpClient.get<any>(this.API_VEICULO + '/carros/marcas/' + marcaCodigo + '/modelos/' + modeloCodigo + '/anos/' + ano);
    }
}
