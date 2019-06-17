import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct, SortBy } from './interfaces';

@Component({
  selector: 'grid-filterable-grid',
  templateUrl: './filterable-grid.component.html',
  styles: []
})
export class FilterableGridComponent {
  @Input() products: IProduct[];
  @Output() clearAllFilters = new EventEmitter();
  @Output() toggleFilterAttribute = new EventEmitter<number>();
  @Output() setSortBy = new EventEmitter<SortBy>();
}
