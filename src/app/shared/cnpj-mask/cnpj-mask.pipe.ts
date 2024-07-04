import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'cnpjMask' })
export class CNPJPipe implements PipeTransform {
  transform(value: any): string | null {
    if (value) {
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
    } else {
      // Optional: Return an empty string or null if the value is undefined
      return ''; // Or return null;
    }
  }

  unformatCnpj(value: string | null | undefined): string {
    if (value) {
      // Replace all non-numeric characters with an empty string
      return value.replace(/[^\d]/g, '');
    }
    return value || '';
  }
}
