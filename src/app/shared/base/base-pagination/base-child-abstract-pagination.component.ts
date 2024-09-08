import { Input, Output, EventEmitter, Component } from '@angular/core';
import { FilterModel } from '../../interfaces/filter.model';

@Component({
  template: '',
})
export abstract class BaseChildAbstractPaginationComponent {
  @Input() filter!: FilterModel;
  @Output() onFetchData = new EventEmitter();

  onPageChange(page: number): void {
    this.fetchDataWithChange((filter) => (filter.page = page));
  }

  fetchDataWithChange(changeCallback: (filter: FilterModel) => void): void {
    changeCallback(this.filter);
    this.onFetchData.emit();
  }
}
