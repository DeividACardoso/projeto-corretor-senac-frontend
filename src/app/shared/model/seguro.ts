import { Cliente } from "./cliente"

export class Seguro {
  id: number;
  // corretor: Corretor;
  cliente: Cliente;
  rcfDanosMateriais: number;
  rofDanosFisicos: number;
  dtInicioVigencia: Date;
  dtFimVigencia: Date;
  numeroProposta: string;
  franquia: number;
  carroReserva: boolean;
  numApolice: string;
}
