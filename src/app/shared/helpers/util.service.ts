import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilService {
  constructor() {}

  public formatarCnpj(cnpj: string): string {
    const cnpjNumerico = cnpj.replace(/\D/g, '');

    return cnpjNumerico.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
}
