import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState, ICartState } from './ng-shopify-cart.reducer';
import { IDiscount } from './interfaces';
import { LineItemPropertiesFragment } from './generated/graphql';

export const selectFeature = createFeatureSelector<IAppState, ICartState>(
  'cart'
);

export const selectCheckout = createSelector(
  selectFeature,
  state => state.checkout
);
export const selectCheckoutLineItems = createSelector(
  selectCheckout,
  (checkout): LineItemPropertiesFragment[] => {
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
    return [];
  }
);
export const selectCheckoutSubtotal = createSelector(
  selectCheckout,
  (checkout): string => {
    if (checkout) {
      return checkout.subtotalPrice;
    } else {
      return '0.00';
    }
  }
);

export const selectCheckoutDiscount = createSelector(
  selectCheckout,
  (checkout): IDiscount | null => {
    if (
      !checkout ||
      !checkout.discountApplications ||
      !checkout.discountApplications.edges ||
      checkout.discountApplications.edges.length === 0
    ) {
      return null;
    }

    /**
     * finds the first discount that is either:
     * automatic (and therefore always applied) or
     * a successfully applied promo code
     */
    const node = checkout.discountApplications.edges.find(
      application =>
        application.node.__typename !== 'DiscountCodeApplication' ||
        application.node.applicable
    ).node;
    if (!node) {
      return null;
    }

    let name: string;
    let canRemove: boolean;
    const amount = 'unimplemented';
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

export const selectDiscountError = createSelector(
  selectFeature,
  state => (state.couponError ? state.couponError.code : null)
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
    } else {
      return 0;
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
