import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataHelperService {
  constructor(private datePipe: DatePipe) {}

  convertDateToString(date: Date | string): string {
    if (!date) return '';

    let convertedDate: Date;

    if (typeof date === 'string') {
      convertedDate = this.convertStringToDate(date)!;
    } else {
      convertedDate = date;
    }

    return this.datePipe.transform(convertedDate, 'yyyy-MM-dd') || '';
  }

  convertDateToStringFormatPTBR(date: Date | string): string {
    if (!date) return '';

    let convertedDate: Date | null;

    if (typeof date === 'string') {
      convertedDate = this.convertStringToDate(date);
    } else {
      convertedDate = date;
    }

    return this.datePipe.transform(convertedDate, 'dd/MM/yyyy') || '';
  }

  public convertStringToDate(dateString: string): Date | null {
    if (!dateString) return null;

    const transformedDate = this.datePipe.transform(dateString, 'yyyy-MM-dd');
    if (transformedDate === null) return null;

    const [year, month, day] = transformedDate.split('-').map(Number);

    const newDate = new Date(year, month - 1, day);

    return newDate;
  }

  public convertStringPTBRToDate(dateString: string): Date | null {
    if (!dateString) return null;

    const [dia, mes, ano] = dateString.split('/').map(Number);

    return new Date(ano, mes - 1, dia);
  }

  addDaysToDate(date: Date, days: number): Date {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  removeDaysFromDate(date: Date, days: number): Date {
    const newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() - days);
    return newDate;
  }

  formatDateForInput(dateString: string): string {
    if (!dateString) return '';

    const date = dateString.includes('/')
      ? this.convertStringPTBRToDate(dateString)
      : this.convertStringToDate(dateString);

    if (!date || isNaN(date.getTime())) {
      return '';
    }

    const ano = date.getFullYear();
    const mes = ('0' + (date.getMonth() + 1)).slice(-2);
    const dia = ('0' + date.getDate()).slice(-2);

    return `${ano}-${mes}-${dia}`;
  }
}
