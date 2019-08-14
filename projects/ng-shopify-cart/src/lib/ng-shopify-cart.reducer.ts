import { createReducer, on, Action } from '@ngrx/store';
import { CheckoutCreate } from './generated/graphql';
import {
  setCheckout,
  addToCheckoutSuccess,
  clearCart
} from './ng-shopify-cart.actions';

export interface ICartState {
  checkout: CheckoutCreate.Checkout | null;
}

const initialState: ICartState = {
  checkout: null
};

const cartReducer = createReducer(
  initialState,
  on(setCheckout, addToCheckoutSuccess, (state, action) => ({
    ...state,
    checkout: action.checkout
  })),
  on(clearCart, state => ({
    ...state,
    checkout: null
  }))
);

export interface IAppState {
  cart: ICartState;
}

export function reducer(state: ICartState | undefined, action: Action) {
  return cartReducer(state, action);
}
