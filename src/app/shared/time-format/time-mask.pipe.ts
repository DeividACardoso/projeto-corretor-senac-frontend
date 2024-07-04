import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'timeFormat'})
export class TimeFormat implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    // Supondo que o valor esteja no formato "HH:mm:ss"
    return value.substring(0, 5); // Retorna apenas "HH:mm"
  }
}
