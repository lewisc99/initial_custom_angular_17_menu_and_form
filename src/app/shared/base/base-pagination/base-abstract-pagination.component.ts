import {
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  Component,
  Inject,
} from '@angular/core';
import { FilterModel, PaginationModel } from '../../interfaces/filter.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarHelperService } from '../../helpers/snackbar-helper.service';

@Component({
  template: '',
})
export abstract class BaseAbstractPaginationComponent
  implements OnInit, OnChanges
{
  @Input() cleanSearchBy!: boolean;
  @Input() triggerFetchData: boolean = false;

  isTableLoading = false;
  filterForm!: FormGroup;

  filter: FilterModel = {
    sortBy: '',
    orderByAscending: true,
    filterBy: [],
    page: 1,
    pageSize: 10,
    searchBy: '',
    queries: {},
  };

  toastDuration: number = 10000;

  paginationModel: PaginationModel = {
    data: [],
    totalSize: 0,
    status: false,
    mensagem: '',
    mensagemException: '',
    totalPages: 0,
  };

  constructor(
    protected snackBar: SnackBarHelperService,
    @Inject('service') public service: any,
    protected fb: FormBuilder
  ) {}

   ngOnInit() {
    this.filterForm = this.fb.group({});
    this.fetchData();
  }

  abstract fetchData(): void;

  onSortByChange(sortBy: string): void {
    this.fetchDataWithChange((filter: any) => {
      if (sortBy === filter.sortBy) {
        filter.orderByAscending = !filter.orderByAscending;
      } else {
        filter.sortBy = sortBy;
        filter.orderByAscending = true;
      }
    });
  }

  fetchDataWithChange(changeCallback: (filter: FilterModel) => void): void {
    changeCallback(this.filter);
    this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cleanSearchBy'] && changes['cleanSearchBy'].currentValue) {
      this.filter.searchBy = '';
    }
  }
}
