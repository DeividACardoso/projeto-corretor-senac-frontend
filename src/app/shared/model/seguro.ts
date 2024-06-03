import { Cliente } from "./cliente"
import { Seguradora } from "./seguradora";

export class Seguro {
  id: number;
  cliente: Cliente;
  seguradora: Seguradora;
  rcfDanosMateriais: number;
  rofDanosFisicos: number;
  dtInicioVigencia: Date;
  dtFimVigencia: Date;
  numeroProposta: string;
  franquia: number;
  carroReserva: boolean;
  numApolice: string;
}
