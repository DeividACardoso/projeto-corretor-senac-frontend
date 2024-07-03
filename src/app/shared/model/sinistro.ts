import { Seguro } from "./seguro";

export class Sinistro {
  id: number;
  tipo: string;
  data: Date;
  horario: string;
  descricao: string;
  seguro: Seguro;
}
