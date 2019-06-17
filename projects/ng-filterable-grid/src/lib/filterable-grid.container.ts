import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct, SortBy } from './interfaces';
import { clearAllFilters, setSortBy, toggleFilterAttribute } from './actions';

@Component({
  selector: 'grid-filterable-grid-container',
  template: `
    <grid-filterable-grid
      [products]="products$ | async"
      (clearAllFilters)="clearAllFilters()"
      (toggleFilterAttribute)="toggleFilterAttribute($event)"
      (setSortBy)="setSortBy($event)"
    ></grid-filterable-grid>
  `
})
export class FilterableGridContainer {
  @Input() products$: Observable<IProduct[]>;

  constructor(public store: Store<any>) {}

  toggleFilterAttribute(id: number) {
    this.store.dispatch(toggleFilterAttribute({ payload: id }));
  }

  clearAllFilters() {
    this.store.dispatch(clearAllFilters());
  }

  setSortBy(sort: SortBy) {
    this.store.dispatch(setSortBy({ payload: sort }));
  }
}
