import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-radio',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true,
    },
  ],
})
export class InputRadioComponent implements ControlValueAccessor, OnInit {
  ngOnInit(): void {
    const valueSelected: string =
      this.items.find((item) => item.checked)?.value || '';

    this.value = valueSelected;
  }

  @Input() id: string = '';
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() formControlName: string = '';
  @Input() items: {
    id: string;
    name?: string;
    value: string;
    label: string;
    checked: boolean;
  }[] = [];
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
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

  onValueChange(event: any): void {
    const selectedValue = event.target.value;
    this.value = selectedValue;

    this.onChange(selectedValue);
    this.change.emit();
    this.onTouched();
  }
}
