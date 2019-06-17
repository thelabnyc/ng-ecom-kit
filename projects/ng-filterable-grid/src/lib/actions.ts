import { createAction, props } from '@ngrx/store';
import { SortBy } from './interfaces';

export const setSortBy = createAction(
  '[Products] Set Sort By',
  props<{ payload: SortBy }>()
);

export const toggleFilterAttribute = createAction(
  '[Products] Toggle Filter Attribute',
  props<{ payload: number }>()
);

export const toggleFilterOption = createAction(
  '[Products] Toggle Filter Option',
  props<{ id: number; isVariant: boolean }>()
);

export const clearAllFilters = createAction('[Products] Clear All Filters');

export const setSelectedFilters = createAction(
  '[Products] Set Selected Filters',
  props<{ id: number; isVariant: boolean }>()
);
