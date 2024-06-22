import { Injectable } from "@angular/core";
import { Veiculo } from "../model/veiculo";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class VeiculoService {
    private readonly API = 'http://localhost:8080/api/veiculo';
    constructor(private httpClient: HttpClient) { }

    salvar(veiculo: Veiculo): Observable<Veiculo>{
        return this.httpClient.post<Veiculo>(this.API + '/novo', veiculo);  
    }

    listar(): Observable<Array<Veiculo>> {
        return this.httpClient.get<Array<Veiculo>>(this.API + '/todos');
    }
}