import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState, ICartState } from './ng-shopify-cart.reducer';

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
