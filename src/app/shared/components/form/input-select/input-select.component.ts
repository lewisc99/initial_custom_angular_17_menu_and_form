import { NgFor, NgIf } from '@angular/common';
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
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'input-select',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIcon,
    NgFor,
    NgIf,
  ],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true,
    },
  ],
})
export class InputSelectComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() id: string = '';
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() formControlName: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() items: {
    id?: string;
    name?: string;
    value: string;
    label: string;
  }[] = [];

  formControl = new FormControl();

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  private componentInitialized: boolean = false;
  showRequiredMessage = false;

  constructor(
    @Host() @Optional() private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit(): void {
    if (this.formGroupDirective && this.formControlName) {
      const control = this.formGroupDirective.form.get(this.formControlName);
      if (control instanceof FormControl) {
        this.formControl = control;
      }
    }
  }

  onValueChange(event: any): void {
    if (event.value) {
      this.showRequiredMessage = false;
    }
    const selectedValue = event.value;
    this.value = selectedValue;
    this.onChange(selectedValue);
    this.onTouched();
    this.change.emit();
  }

  onChange = (value: string) => {};
  onTouched = () => {};

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
    this.disabled = this.disabled;
  }

  onClose(): void {
    if (this.required && !this.value) {
      this.showRequiredMessage = true;
    }
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

  removeValue(event: Event): void {
    event.stopPropagation();
    this.value = '';
    this.onValueChange({ value: '' });
  }
}
