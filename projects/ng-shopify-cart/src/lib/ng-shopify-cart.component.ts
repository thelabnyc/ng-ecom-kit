import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CheckoutCreate } from './generated/graphql';
import { IVariantIdQuantity } from './interfaces';

@Component({
  selector: 'shop-cart-cart',
  templateUrl: './ng-shopify-cart.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgShopifyCartComponent {
  @Input() lineItems: CheckoutCreate.Node;
  @Input() subtotal: string;
  @Input() checkoutUrl: string;
  @Input() itemCount: number;
  @Output() applyCoupon = new EventEmitter();
  @Output() removeLineItem = new EventEmitter<IVariantIdQuantity>();
  @Output() incrementQuantity = new EventEmitter<IVariantIdQuantity>();
  @Output() decrementQuantity = new EventEmitter<IVariantIdQuantity>();
  constructor() {}
}
