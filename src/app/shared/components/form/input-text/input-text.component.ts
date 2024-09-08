import {
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  forwardRef,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { MaskDirective } from '../../../directives/mask.directive';
import {
  formatCnpjMask,
  formatNumberMask,
  formatPlacaMask,
  formatCurrencyMask,
  formatNumberWithDotMask,
} from '../../../directives/mask.functions';

@Component({
  selector: 'input-text',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MaskDirective,
  ],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() type: string = 'text';
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() maxLength: number = 300;
  @Input() minLength: number = 0;
  @Input() mask: string = '';
  @Input() formControlName: string = '';
  @Input() required: boolean = false;
  @Input() prefix: string = '';
  @Input() hidden: boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  formControl = new FormControl();

  private componentInitialized: boolean = false;
  showRequiredMessage: boolean = false;

  constructor(
    @Host() @Optional() private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit(): void {
    if (this.formGroupDirective && this.formControlName) {
      const control = this.formGroupDirective.form.get(this.formControlName);
      if (control instanceof FormControl) {
        this.formControl = control;
      }

      if (this.minLength != 0) {
        this.formControl.setValidators([Validators.minLength(this.minLength)]);
      }

      if (this.mask && this.formControl.value) {
        this.applyMask(this.formControl.value);
        this.formControl.setValue(this.value);
      }
    }
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  onBlur() {
    this.blur.emit();
  }

  writeValue(value: string): void {
    if (this.mask && value) this.applyMask(value);
    else {
      this.value = value;
    }
  }

  private applyMask(value: any): void {
    let formattedValue = String(value);
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
        const valorFormatado = Number(value).toFixed(2);
        formattedValue = formatCurrencyMask(valorFormatado.toString());
        break;
      case 'number-with-dot':
        formattedValue = formatNumberWithDotMask(formattedValue);
        break;
      default:
        break;
    }

    if (formattedValue != this.value) this.value = formattedValue;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: any): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    if (this.value) {
      this.showRequiredMessage = false;
    }

    this.onChange(input.value);
    this.change.emit();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (
      this.required &&
      (this.value === '' || this.value === null || this.value === undefined)
    ) {
      if (this.componentInitialized) {
        this.showRequiredMessage = true;
      }
      this.componentInitialized = true;
      return { required: true };
    }
    this.showRequiredMessage = false;
    return null;
  }
}
