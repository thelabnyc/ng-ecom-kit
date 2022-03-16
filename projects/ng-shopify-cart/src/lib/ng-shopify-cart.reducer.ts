import { createReducer, on, Action } from '@ngrx/store';
import { CheckoutStateFragment } from './generated/graphql';
import {
  setCheckout,
  addToCheckoutSuccess,
  applyCouponSuccess,
  removeCouponSuccess,
  clearCart,
  applyCouponFailure,
  removeLineItemSuccess,
  incrementLineItemQuantitySuccess,
  decrementLineItemQuantitySuccess
} from './ng-shopify-cart.actions';

export interface ICartState {
  checkout: CheckoutStateFragment | null;
  couponError: {
    code: string;
  } | null;
}

const initialState: ICartState = {
  checkout: null,
  couponError: null
};

const cartReducer = createReducer(
  initialState,
  on(
    setCheckout,
    addToCheckoutSuccess,
    removeCouponSuccess,
    removeLineItemSuccess,
    incrementLineItemQuantitySuccess,
    decrementLineItemQuantitySuccess,
    (state, action) => ({
      ...state,
      checkout: action.checkout
    })
  ),
  on(clearCart, state => ({
    ...state,
    checkout: null
  })),
  on(applyCouponSuccess, (state, action) => ({
    ...state,
    checkout: action.checkout,
    couponError: null
  })),
  on(applyCouponFailure, (state, action) => ({
    ...state,
    checkout: action.checkout,
    couponError: {
      code: action.code
    }
  }))
);

export interface IAppState {
  cart: ICartState;
}

export function reducer(state: ICartState | undefined, action: Action) {
  return cartReducer(state, action);
}
