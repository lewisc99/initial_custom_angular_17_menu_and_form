import { Component, Input } from '@angular/core';
import { PaginationModel } from '../../../interfaces/filter.model';
import { BaseChildAbstractPaginationComponent } from '../../../base/base-pagination/base-child-abstract-pagination.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-pagination',
  templateUrl: './base-pagination.component.html',
  styleUrls: ['./base-pagination.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class BasePaginationComponent extends BaseChildAbstractPaginationComponent {
  @Input() paginationModel!: PaginationModel;
  public isDropdownOpen: boolean = false;

  getPages(): number[] {
    const currentPage = this.filter.page;
    const maxPagesToShow = 10;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(
      this.paginationModel.totalPages,
      startPage + maxPagesToShow - 1
    );

    startPage = Math.max(1, endPage - maxPagesToShow + 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onPageSizeChange(size: number): void {
    this.toggleDropdown();
    this.fetchDataWithChange((filter) => {
      filter.pageSize = size;
      filter.page = 1;
    });
  }
}
