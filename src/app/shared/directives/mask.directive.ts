import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import {
  formatCnpjMask,
  formatCurrencyMask,
  formatNumberMask,
  formatNumberWithDotMask,
  formatPlacaMask,
} from './mask.functions';

@Directive({
  selector: '[mask]',
  standalone: true,
})
export class MaskDirective {
  @Input() mask: string = '';
  @Input() maskMaxLength: number = 300;
  @Input() minMaxLength: number = 0;

  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    let formattedValue = '';
    switch (this.mask) {
      case 'cnpj':
        formattedValue = formatCnpjMask(value);
        break;
      case 'number':
        formattedValue = formatNumberMask(value);
        break;
      case 'placa':
        formattedValue = formatPlacaMask(value);
        break;
      case 'currency':
        formattedValue = formatCurrencyMask(value, this.maskMaxLength);
        break;
      case 'number-with-dot':
        formattedValue = formatNumberWithDotMask(value, this.maskMaxLength);
        break;
      default:
        break;
    }

    this.renderer.setProperty(
      this.el,
      'value',
      this.mask == '' ? value : formattedValue
    );
  }
}
