import { createAction, props } from '@ngrx/store';
import { CheckoutCreate } from './generated/graphql';
import { IVariantIdQuantity, IVariantShopifyIdQuantity } from './interfaces';

export const addToCheckout = createAction(
  '[EcomKit/shop-cart] Add To Checkout',
  props<IVariantIdQuantity>()
);
export const addToCheckoutFailure = createAction(
  '[EcomKit/shop-cart] Add To Checkout Failure'
);
export const createCheckout = createAction(
  '[EcomKit/shop-cart] Create Checkout'
);
export const setCheckout = createAction(
  '[EcomKit/shop-cart] Set Checkout',
  props<{ checkout: CheckoutCreate.Checkout }>()
);
export const createCheckoutFailure = createAction(
  '[EcomKit/shop-cart] Create Checkout Failure'
);
export const applyCoupon = createAction(
  '[EcomKit/shop-cart] Apply Coupon',
  props<{ code: string }>()
);
export const applyCouponSuccess = createAction(
  '[EcomKit/shop-cart] Apply Coupon Success'
);
export const removeCoupon = createAction('[EcomKit/shop-cart] Remove Coupon');
export const removeCouponSuccess = createAction('[EcomKit/shop-cart] Remove Coupon Success');
export const removeLineItem = createAction(
  '[EcomKit/shop-cart] Remove Line Item from Cart',
  props<IVariantShopifyIdQuantity>()
);
export const removeLineItemFailure = createAction(
  '[EcomKit/shop-cart] Remove Line Item from Cart Failure'
);
export const clearCart = createAction('[EcomKit/shop-cart] Clear Cart');
export const incrementLineItemQuantity = createAction(
  '[EcomKit/shop-cart] Increment Line Item Quantity on Cart',
  props<IVariantShopifyIdQuantity>()
);
export const incrementLineItemQuantityFailure = createAction(
  '[EcomKit/shop-cart] Increment Line Item Quantity on Cart Failure'
);
export const decrementLineItemQuantity = createAction(
  '[EcomKit/shop-cart] Decrement Line Item Quantity on Cart',
  props<IVariantShopifyIdQuantity>()
);
export const decrementLineItemQuantityFailure = createAction(
  '[EcomKit/shop-cart] Decrement Line Item Quantity on Cart Failure'
);
