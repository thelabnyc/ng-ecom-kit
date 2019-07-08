import {
  ActionReducerMap,
  MetaReducer,
  createReducer,
  Action
} from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IProduct } from 'projects/ng-filterable-grid/src/lib/interfaces';
import {
  sampleProduct,
  sampleProduct2
} from 'projects/ng-filterable-grid/src/lib/sample-data';
import { InjectionToken } from '@angular/core';
import {
  IGridState,
  gridReducer
} from 'projects/ng-filterable-grid/src/lib/filterable-grid.reducers';

export interface ProductState {
  products: IProduct[];
}

const initialState: ProductState = {
  products: [sampleProduct, sampleProduct2]
};

const productReducer = createReducer(initialState);

export interface State {
  product: ProductState;
  grid: IGridState;
}

export const reducers = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token',
  {
    factory: () => ({
      product: productReducer,
      grid: gridReducer
    })
  }
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectProducts = (state: State) => state.product.products;
export const selectSortBy = (state: State) => state.grid.sortBy;
