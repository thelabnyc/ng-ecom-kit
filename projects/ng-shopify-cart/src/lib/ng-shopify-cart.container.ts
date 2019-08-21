import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  incrementLineItemQuantity,
  removeLineItem,
  decrementLineItemQuantity
} from './ng-shopify-cart.actions';
import {
  selectCheckoutLineItems,
  selectCheckoutSubtotal,
  selectCheckoutUrl,
  selectCheckoutItemCount,
  selectCheckoutDiscount,
  selectDiscountError
} from './ng-shopify-cart.selectors';
import { IVariantShopifyIdQuantity } from './interfaces';

@Component({
  selector: 'shop-cart-cart-container',
  template: `
    <shop-cart-cart
      [lineItems]="checkoutLineItems$ | async"
      [subtotal]="checkoutSubtotal$ | async"
      [checkoutUrl]="checkoutUrl$ | async"
      [itemCount]="checkoutItemCount$ | async"
      (removeLineItem)="removeLineItem($event)"
      (incrementQuantity)="incrementQuantity($event)"
      (decrementQuantity)="decrementQuantity($event)"
    ></shop-cart-cart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgShopifyCartContainer {
  checkoutLineItems$ = this.store.pipe(select(selectCheckoutLineItems));
  checkoutSubtotal$ = this.store.pipe(select(selectCheckoutSubtotal));
  checkoutUrl$ = this.store.pipe(select(selectCheckoutUrl));
  checkoutItemCount$ = this.store.pipe(select(selectCheckoutItemCount));
  checkoutDiscount$ = this.store.pipe(select(selectCheckoutDiscount));
  discountError$ = this.store.pipe(select(selectDiscountError));

  constructor(private store: Store<any>) {}

  removeLineItem(lineItem: IVariantShopifyIdQuantity) {
    this.store.dispatch(removeLineItem(lineItem));
  }
  incrementQuantity(lineItem: IVariantShopifyIdQuantity) {
    this.store.dispatch(incrementLineItemQuantity(lineItem));
  }
  decrementQuantity(lineItem: IVariantShopifyIdQuantity) {
    if (lineItem.quantity === 1) {
      this.store.dispatch(removeLineItem(lineItem));
    } else {
      this.store.dispatch(decrementLineItemQuantity(lineItem));
    }
  }
}
