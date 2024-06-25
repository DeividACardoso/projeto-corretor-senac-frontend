import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationDTO } from '../model/authentication.dto';

@Injectable({
    providedIn: 'root'
})
export class CorretorService {

    private readonly API = 'http://localhost:8080/api/auth';

    constructor(private httpClient: HttpClient) { }

    private token: string;
    private tokenFromStorage: string;

    login(authenticationDTO: AuthenticationDTO) {
        return this.httpClient.post(this.API + '/login', authenticationDTO);
    }

    register(registerDTO: any) {
        return this.httpClient.post(this.API + '/register', registerDTO);
    }

    storeToken(token: string) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    getToken() {
        this.tokenFromStorage = localStorage.getItem('token');
        return this.tokenFromStorage;
    }

}