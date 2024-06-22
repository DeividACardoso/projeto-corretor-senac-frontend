import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CorretorService {

    private readonly API = 'http://localhost:8080/api/auth';

    constructor(private httpClient: HttpClient) { }

    private token: string;
    private tokenFromStorage: string;

    login(authenticationDTO: any) {
        return this.httpClient.post(this.API + '/login', authenticationDTO);
    }

    storeToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    getToken() {
        this.tokenFromStorage = localStorage.getItem('token');
        return this.tokenFromStorage;
    }

    initRefresh() {
        return this.tokenFromStorage;
    }
}