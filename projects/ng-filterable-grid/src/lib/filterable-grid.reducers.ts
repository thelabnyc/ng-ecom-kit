import { createReducer, on } from '@ngrx/store';
import * as GridActions from './actions';

export interface IGridState {
  sortBy: string | null;
  selectedFilters: { id: number; isVariant: boolean }[];
}

export const initialGridState: IGridState = {
  sortBy: null,
  selectedFilters: []
};

export const gridReducer = createReducer(
  initialGridState,
  on(GridActions.setSortBy, (state, { payload }) => ({
    ...state,
    sortBy: payload
  })),
  on(GridActions.clearAllFilters, state => ({
    ...state,
    selectedFilters: initialGridState.selectedFilters
  }))
);
