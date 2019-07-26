import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import {
  applyCoupon,
  incrementLineItemQuantity,
  removeLineItem,
  decrementLineItemQuantity
} from './ng-shopify-cart.actions';
import {
  selectCheckoutLineItems,
  selectCheckoutSubtotal,
  selectCheckoutUrl,
  selectCheckoutItemCount
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
      (applyCoupon)="applyCoupon()"
      (removeLineItem)="removeLineItem($event)"
      (incrementQuantity)="incrementQuantity($event)"
      (decrementQuantity)="decrementQuantity($event)"
    ></shop-cart-cart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgShopifyCartContainer {
  form = new FormGroup({
    code: new FormControl('', Validators.required)
  });
  checkoutLineItems$ = this.store.pipe(select(selectCheckoutLineItems));
  checkoutSubtotal$ = this.store.pipe(select(selectCheckoutSubtotal));
  checkoutUrl$ = this.store.pipe(select(selectCheckoutUrl));
  checkoutItemCount$ = this.store.pipe(select(selectCheckoutItemCount));

  constructor(private store: Store<any>) {}

  applyCoupon() {
    this.store.dispatch(applyCoupon(this.form.value.code));
  }
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
