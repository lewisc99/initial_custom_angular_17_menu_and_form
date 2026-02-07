import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InputTextComponent } from '../shared/components/form/input-text/input-text.component';
import { NgIf } from '@angular/common';
import { InputTextAreaComponent } from '../shared/components/form/input-text-area/input-text-area.component';
import { InputSelectComponent } from '../shared/components/form/input-select/input-select.component';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputTextAreaComponent,
    InputSelectComponent,
    NgIf,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  public formGroup!: FormGroup;

  blurValue: string = '';
  changeValue: string = '';

  selectOptions = [
    { id: '1', value: 'option1', label: 'Option 1' },
    { id: '2', value: 'option2', label: 'Option 2' },
    { id: '3', value: 'option3', label: 'Option 3' },
  ];


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: '',
      netWorth: '',
      placa: '',
      cnpj: '',
      percentage: '',
      callBlurMethod: '',
      callChangeMethod: '',
      requireByTemplate: '',
      requireByFormGroup: ['', Validators.required],
      disabledByTemplate: '',
      disabledByFormGroup: [{ value: '', disabled: true }],
      maxLengthExample: '',
      minLengthExample: '',
      minAndMaxLengthExample: '',
      inputTextArea: '',
      inputSelect: [],
    });

    this.formGroup.get('name')?.setValue('Joe Doe');
  }

  onBlur() {
    this.blurValue = this.formGroup.value.callBlurMethod;
  }

  onChange() {
    this.changeValue = this.formGroup.value.callChangeMethod;
  }

  onSubmit() {  
    console.log(this.formGroup.value);
  }
}
