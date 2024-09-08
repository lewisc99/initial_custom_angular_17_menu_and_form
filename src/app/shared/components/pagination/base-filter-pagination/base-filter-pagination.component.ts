import { Component, Input } from '@angular/core';
import { BaseChildAbstractPaginationComponent } from '../../../base/base-pagination/base-child-abstract-pagination.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-base-filter-pagination',
  templateUrl: './base-filter-pagination.component.html',
  styleUrls: ['./base-filter-pagination.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIcon,
    MatTooltipModule,
  ],
})
export class BaseFilterPaginationComponent extends BaseChildAbstractPaginationComponent {
  @Input() filterForm!: FormGroup;
  @Input() searchInputDisabled = false;
  @Input() tooltipMessage = '';
  @Input() searchInputHidden = false;
  @Input() disableBotton = false;

  public onCleanFilter() {
    this.filter.queries = {};
    this.filter.pageSize = 10;
    this.filter.searchBy = '';
    this.filterForm.reset();
  }
}
