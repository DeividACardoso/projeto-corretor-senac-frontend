import { Cliente } from "./cliente";
import { Seguradora } from "./seguradora";
import { Veiculo } from "./veiculo";

export class Seguro {
  id: number;
  cliente: Cliente;
  seguradora: Seguradora;
  veiculo: Veiculo;
  rcfDanosMateriais: number;
  rofDanosFisicos: number;
  dtInicioVigencia: Date;
  dtFimVigencia: Date;
  numeroProposta: string;
  franquia: number;
  numApolice: string;
  carroReserva: boolean;
  ativo: boolean;
}
