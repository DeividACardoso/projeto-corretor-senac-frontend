import { Time } from "@angular/common";
import { Seguro } from "./seguro";

export class Sinistro {
  id: number;
  tipo: string;
  // data: Date
  data: Date;
  horario: Time;
  dataHora: Date;
  descricao: string;
  seguro: Seguro;
}
