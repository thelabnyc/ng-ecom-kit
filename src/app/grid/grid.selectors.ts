import { createSelector } from '@ngrx/store';
import { selectProducts, selectSortBy } from '../reducers';
import { filteredSortedProducts } from 'projects/ng-filterable-grid/src/lib/filterable-grid.selectors';

export const selectGridProducts = createSelector(
  selectProducts,
  selectSortBy,
  filteredSortedProducts
);
