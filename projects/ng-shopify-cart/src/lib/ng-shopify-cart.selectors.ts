import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState, ICartState } from './ng-shopify-cart.reducer';
import { IDiscount } from './interfaces';

export const selectFeature = createFeatureSelector<IAppState, ICartState>(
  'cart'
);

export const selectCheckout = createSelector(
  selectFeature,
  state => state.checkout
);
export const selectCheckoutLineItems = createSelector(
  selectCheckout,
  checkout => {
    if (checkout) {
      return checkout.lineItems.edges
        .map(edge => {
          return edge.node;
        })
        .sort((node1, node2) => {
          // returns an alphabetically sorted array of line items
          return node1.title < node2.title
            ? -1
            : node1.title > node2.title
            ? 1
            : 0;
        });
    }
  }
);
export const selectCheckoutSubtotal = createSelector(
  selectCheckout,
  checkout => {
    if (checkout) {
      return checkout.subtotalPrice;
    }
  }
);

function diffPrices(total: string, subtotal: string): string {
  const totalFloat = parseFloat(total);
  const subtotalFloat = parseFloat(subtotal);
  const resultFloat = totalFloat - subtotalFloat;
  const resultRounded = Math.round(resultFloat * 100) / 100;
  return resultRounded.toString(10);
}

export const selectCheckoutDiscount = createSelector(
  selectCheckout,
  (checkout): IDiscount | null => {
    if (!checkout || !checkout.discountApplications) {
      return null;
    }
    const amount = diffPrices(checkout.totalPrice, checkout.subtotalPrice);

    let name: string;
    let canRemove: boolean;
    const node = checkout.discountApplications.edges[0].node;
    if (node.__typename === 'DiscountCodeApplication') {
      name = node.code;
      canRemove = true;
    } else {
      name = node.title;
      canRemove = false;
    }

    return { amount, name, canRemove };
  }
);

export const selectCheckoutItemCount = createSelector(
  selectCheckout,
  checkout => {
    if (checkout) {
      // loop through line items to calculate the quantity of items in checkout
      let itemQuantity = 0;
      checkout.lineItems.edges.forEach(edge => {
        itemQuantity += edge.node.quantity;
      });
      return itemQuantity;
    }
  }
);
export const selectCheckoutUrl = createSelector(
  selectCheckout,
  checkout => {
    if (checkout) {
      return checkout.webUrl as string;
    }
  }
);
export const selectCheckoutId = createSelector(
  selectCheckout,
  checkout => {
    if (checkout) {
      return checkout.id;
    }
  }
);
