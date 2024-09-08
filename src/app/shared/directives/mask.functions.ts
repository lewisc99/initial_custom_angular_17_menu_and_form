export function formatCnpjMask(value: string): string {
  const cleaned = value.replace(/\D/g, '');

  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);

  let maskedValue = '';

  if (match) {
    maskedValue = `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
  } else {
    const matchPartial = cleaned.match(
      /(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/
    );

    if (matchPartial) {
      maskedValue = matchPartial[1];
      if (matchPartial[2]) {
        maskedValue += `.${matchPartial[2]}`;
      }
      if (matchPartial[3]) {
        maskedValue += `.${matchPartial[3]}`;
      }
      if (matchPartial[4]) {
        maskedValue += `/${matchPartial[4]}`;
      }
      if (matchPartial[5]) {
        maskedValue += `-${matchPartial[5]}`;
      }
    }
  }

  return maskedValue;
}

export function formatNumberMask(value: any): string {
  const cleaned = value.toString().replace(/\D/g, '');
  return cleaned;
}

export function formatPlacaMask(value: string): string {
  const cleaned = value.toUpperCase().slice(0, 7);
  return cleaned;
}

export function formatCurrencyMask(
  value: string,
  maskMaxLength: number = 300
): string {
  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  value = value.replace(/\D+/g, '');
  if (value.length === 0) value = '0';

  const maxDigits = maskMaxLength;
  if (value.length > maxDigits) {
    value = value.substring(0, maxDigits);
  }

  value = formatter.format(parseInt(value) / 100);

  return value;
}

export function formatNumberWithDotMask(
  value: string,
  maskMaxLength: number = 300
): string {
  let valueWithoutLetter = value.replace(/[^0-9.,]/g, '');

  let formattedValue = '';

  if (valueWithoutLetter.includes(',')) {
    valueWithoutLetter = valueWithoutLetter.replace(',', '.');
  }

  const parts = valueWithoutLetter.split('.');
  const dotsCount = parts.length - 1;

  const maxDigits = maskMaxLength + dotsCount;
  if (valueWithoutLetter.length > maxDigits) {
    value = valueWithoutLetter.substring(0, maxDigits);
    return value;
  }

  if (parts.length > 2 && parts.length == 2) {
    formattedValue = parts[0] + '.' + parts.slice(1).join('');
  } else if (parts.length > 1) {
    for (let i = 0; i <= parts.length - 1; i++) {
      if (i != parts.length - 1) {
        formattedValue += parts[i] + '.';
      } else {
        formattedValue += parts[i];
      }
    }
  } else {
    formattedValue = valueWithoutLetter;
  }

  return formattedValue;
}
