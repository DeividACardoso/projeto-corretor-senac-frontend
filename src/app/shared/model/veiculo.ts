import { Cliente } from "./cliente";

export class Veiculo {
    id: number;
    preco: string;
    modelo: string;
    marca: string;
    anoModelo: number;
    tipoCombustivel: string;
    rua: string;
    bairro: string;
    complemento: string;
    numero: number;
    cidade: string;
    uf: string;
    cep: string;
    cliente: Cliente;
}