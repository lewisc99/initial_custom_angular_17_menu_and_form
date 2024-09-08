import {
  Component,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'input-text-area',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input-text-area.component.html',
  styleUrl: './input-text-area.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextAreaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextAreaComponent),
      multi: true,
    },
  ],
})
export class InputTextAreaComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() maxLength: number = 10000;
  @Input() rows: number = 2;
  @Input() required: boolean = false;
  @Input() formControlName: string = '';
  @Input() minLength: number = 0;
  private componentInitialized: boolean = false;
  showRequiredMessage: boolean = false;
  formControl = new FormControl();

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();

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
    }
  }

  onChange = (value: string) => {};
  onTouched = () => {
    this.blur.emit();
  };

  writeValue(value: string): void {
    this.value = value;
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
    if (input.value) {
      this.showRequiredMessage = false;
    }
    this.value = input.value;
    this.onChange(input.value);
    this.change.emit();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.required && !this.value) {
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
