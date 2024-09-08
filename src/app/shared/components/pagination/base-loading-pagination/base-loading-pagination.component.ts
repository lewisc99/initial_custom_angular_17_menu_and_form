import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicTopPercentageDirective } from '../../../directives/dynamic-top-percentage.directive';

@Component({
  selector: 'app-base-loading-pagination',
  templateUrl: './base-loading-pagination.component.html',
  styleUrls: ['./base-loading-pagination.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicTopPercentageDirective],
})
export class BaseLoadingPaginationComponent {
  @Input() isTableLoading: boolean = false;
  @Input() paginationModelLength: number = 0;
  @Input() noDataFoundMessage: string = 'Nenhum registro encontrado.';

  @Input() topPercentage: number = 55;
}
