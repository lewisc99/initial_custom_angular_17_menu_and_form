import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBRL',
  standalone: true,
})
export class CurrencyBRLPipe implements PipeTransform {
  transform(value: string | null): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Handle null or empty input
    if (!value) {
      return formatter.format(0);
    }

    // Convert to string and handle the case where the input doesn't contain a decimal
    let valueConvertToString = value.toString();

    // First, remove non-numeric characters (but leave dots and commas)
    valueConvertToString = valueConvertToString.replace(/[^\d.,]/g, '');

    // If the string has no decimal point (.), format directly
    if (!valueConvertToString.includes('.')) {
      return formatter.format(Number(valueConvertToString));
    }

    // Split the string by the decimal point to handle the integer and decimal part separately
    let [integerPart, decimalPart] = valueConvertToString.split('.');

    // Limit the decimal part to two digits
    decimalPart = decimalPart.slice(0, 2);

    // Recombine the integer and decimal part, then convert to number
    const combinedValue = `${integerPart}${
      decimalPart ? '.' + decimalPart : ''
    }`;

    // Format the result as BRL currency
    return formatter.format(Number(combinedValue));
  }
}
