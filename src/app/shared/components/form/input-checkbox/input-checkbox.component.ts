import {
  Component,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroupDirective,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'input-checkbox',
  standalone: true,
  imports: [MatCheckboxModule, NgFor, NgIf],
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true,
    },
  ],
})
export class InputCheckboxComponent implements ControlValueAccessor, OnChanges {
  @Input() id: string = '';
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() items: {
    id?: string;
    name: string;
    disabled?: boolean;
    value?: string;
    checked: boolean;
    label: string;
  }[] = [];
  
  @Input() formArrayName: string = '';

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Host() @Optional() private formGroupDirective: FormGroupDirective
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formGroupDirective) {
      this.formGroupDirective.form
        .get(this.formArrayName)
        ?.valueChanges.subscribe({
          next: (data) => {
            if (data == null) {
              this.items.map((item: { checked: boolean }) => {
                item.checked = false;
              });
            }
          },
        });
    }
  }

  onChange = (value: any[]) => {};
  onTouched = () => {};

  writeValue(value: any[]): void {
    this.items.forEach((item) => {
      if (value) {
        item.checked = value.some(
          (checkedItem: any) => checkedItem.name === item.name
        );
      }
    });
  }

  registerOnChange(fn: (value: any[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onCheckboxChange(event: any, item: any): void {
    const checked = event.checked;
    item.checked = !!checked;

    const updatedItems = this.items;

    this.onChange(updatedItems);

    if (this.formGroupDirective) {
      const formGroup = this.formGroupDirective.form;
      formGroup.get(this.formArrayName)?.setValue(updatedItems);
    }

    this.change.emit();
    this.onTouched();
  }
}
