import {
  Component,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'input-date',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent
  implements ControlValueAccessor, OnInit, OnChanges, Validator
{
  constructor(
    private dateAdapter: DateAdapter<Date>,
    @Optional() @Host() protected formGroupDirective: FormGroupDirective
  ) {
    this.dateAdapter.setLocale('pt');
  }

  @Input() id: string = '';
  @Input() label: string = 'Escolha uma data';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() isDataRange: boolean = false;
  @Input() required: boolean = false;

  @Input() formControlName: string = '';
  @Input() startFormControlName: string = '';
  @Input() endFormControlName: string = '';
  @Input() placeholderStartDate: string = 'Data inicial';
  @Input() placeholderEndDate: string = 'Data final';
  @Input() value: string = '';
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  private componentInitialized: boolean = false;
  showRequiredMessage = false;

  startDateControl = new FormControl();
  endDateControl = new FormControl();
  formControl = new FormControl();

  ngOnInit(): void {
    if (this.isDataRange) this.populateDataRange();

    if (this.formGroupDirective && this.formControlName) {
      const control = this.formGroupDirective.form.get(this.formControlName);
      if (control instanceof FormControl) {
        this.formControl = control;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formGroupDirective) {
      this.formGroupDirective.form
        .get(this.startFormControlName)
        ?.valueChanges.subscribe({
          next: (data) => {
            if (data == null) {
              this.startDateControl.setValue('');
            }
          },
        });

      this.formGroupDirective.form
        .get(this.endFormControlName)
        ?.valueChanges.subscribe({
          next: (data) => {
            if (data == null) {
              this.endDateControl.setValue('');
            }
          },
        });
    }
  }

  handleDateChange(event: any): void {
    const date = event.value != null ? event.value._d : null;

    this.value = date;
    this.onChange(date);
    this.change.emit();
  }

  handleDateRangeChange(event: any, isStartDate: boolean = false): void {
    let formGroup: FormGroup = this.formGroupDirective.form;
    let date = event.value != null ? event.value._d : null;

    if (isStartDate) {
      this.startDateControl.setValue(date);
      formGroup.get(this.startFormControlName)?.setValue(date);
    } else {
      this.endDateControl.setValue(date);
      formGroup.get(this.endFormControlName)?.setValue(date);
    }

    const range = event.value;
    this.value = range;
    this.onChange(range);
    this.change.emit();
  }

  onChange = (value: string) => {};
  onTouched = () => {};

  onBlur() {
    this.blur.emit();
  }

  writeValue(value: string): void {
    this.value = value;
  }

  populateDataRange() {
    let formGroup: FormGroup = this.formGroupDirective.form;
    const startDateControlValue = formGroup.get(
      this.startFormControlName
    )?.value;

    const endDateControlValue = formGroup.get(this.endFormControlName)?.value;

    this.startDateControl.setValue(startDateControlValue);
    formGroup.get(this.startFormControlName)?.setValue(startDateControlValue);

    this.endDateControl.setValue(endDateControlValue);
    formGroup.get(this.endFormControlName)?.setValue(endDateControlValue);
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
