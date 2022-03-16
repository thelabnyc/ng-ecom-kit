import { createAction, props } from '@ngrx/store';
import {
  CheckoutStateFragment,
  CheckoutLineItemInput
} from './generated/graphql';
import { IVariantIdQuantity } from './interfaces';

export const refreshCart = createAction('[EcomKit/shop-cart] Refresh Cart');
export const addToCheckout = createAction(
  '[EcomKit/shop-cart] Add To Checkout',
  props<IVariantIdQuantity>()
);
export const addToCheckoutFailure = createAction(
  '[EcomKit/shop-cart] Add To Checkout Failure'
);
export const addToCheckoutSuccess = createAction(
  '[EcomKit/shop-cart] Add To Checkout Success',
  props<{ checkout: CheckoutStateFragment }>()
);
export const createCheckout = createAction(
  '[EcomKit/shop-cart] Create Checkout'
);
export const setCheckout = createAction(
  '[EcomKit/shop-cart] Set Checkout',
  props<{ checkout: CheckoutStateFragment }>()
);
export const createCheckoutFailure = createAction(
  '[EcomKit/shop-cart] Create Checkout Failure'
);
export const applyCoupon = createAction(
  '[EcomKit/shop-cart] Apply Coupon',
  props<{ code: string }>()
);
export const applyCouponSuccess = createAction(
  '[EcomKit/shop-cart] Apply Coupon Success',
  props<{ checkout: CheckoutStateFragment }>()
);
export const applyCouponFailure = createAction(
  '[EcomKit/shop-cart] Apply Coupon Failure',
  props<{ checkout: CheckoutStateFragment; code: string }>()
);
export const removeCoupon = createAction('[EcomKit/shop-cart] Remove Coupon');
export const removeCouponSuccess = createAction(
  '[EcomKit/shop-cart] Remove Coupon Success',
  props<{ checkout: CheckoutStateFragment }>()
);
export const removeLineItem = createAction(
  '[EcomKit/shop-cart] Remove Line Item from Cart',
  props<{ lineId: string }>()
);
export const removeLineItemSuccess = createAction(
  '[EcomKit/shop-cart] Remove Line Item from Cart Success',
  props<{ checkout: CheckoutStateFragment }>()
);
export const removeLineItemFailure = createAction(
  '[EcomKit/shop-cart] Remove Line Item from Cart Failure'
);
export const clearCart = createAction('[EcomKit/shop-cart] Clear Cart');
export const incrementLineItemQuantity = createAction(
  '[EcomKit/shop-cart] Increment Line Item Quantity on Cart',
  props<{ lineId: string }>()
);
export const incrementLineItemQuantitySuccess = createAction(
  '[EcomKit/shop-cart] Increment Line Item Quantity on Cart Success',
  props<{ checkout: CheckoutStateFragment }>()
);
export const incrementLineItemQuantityFailure = createAction(
  '[EcomKit/shop-cart] Increment Line Item Quantity on Cart Failure'
);
export const decrementLineItemQuantity = createAction(
  '[EcomKit/shop-cart] Decrement Line Item Quantity on Cart',
  props<{ lineId: string }>()
);
export const decrementLineItemQuantitySuccess = createAction(
  '[EcomKit/shop-cart] Decrement Line Item Quantity on Cart Success',
  props<{ checkout: CheckoutStateFragment }>()
);
export const decrementLineItemQuantityFailure = createAction(
  '[EcomKit/shop-cart] Decrement Line Item Quantity on Cart Failure'
);
