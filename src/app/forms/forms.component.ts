import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InputTextAreaComponent } from '../shared/components/form/input-text-area/input-text-area.component';
import { InputTextComponent } from '../shared/components/form/input-text/input-text.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    InputTextComponent,
    NgIf,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: '',
      netWorth: '',
      placa: '',
      cnpj: '',
      percentage: '',
      callMethod: '',
    });
  }

  onBlur() {}
}
