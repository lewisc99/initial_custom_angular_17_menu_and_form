import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnpj',
  standalone: true,
})
export class CnpjPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    let cnpj = value.toString();

    cnpj = cnpj.replace(/\D/g, '');

    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
}
