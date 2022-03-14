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
      return checkout.lines.edges
        .map(edge => {
          return edge.node;
        })
        .sort((node1, node2) => {
          // returns an alphabetically sorted array of line items
          return node1.merchandise.title < node2.merchandise.title
            ? -1
            : node1.merchandise.title > node2.merchandise.title
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
      return checkout.estimatedCost.subtotalAmount.amount;
    } else {
      return '0.00';
    }
  }
);

/**
 * The job of this function is to represent the value of the automatic and
 * code-based discounts (of which there can theoretially be multiple) that
 * are affecting the value of the cart. Since in all cases that we allow
 * there can be only one active discount our code attempts to be correct
 * within that assumption. In the theoretical case where there are multiple
 * discounts active we should make sure to only report one, rather than lumping
 * the amounts together.
 */
export const selectCheckoutDiscount = createSelector(
  selectCheckout,
  (checkout): IDiscount | null => {
    if (!checkout) {
      return null;
    }

    const codeApp = checkout.discountCodes.find(code => code.applicable);
    const code = codeApp ? codeApp.code : null;

    if (code) {
      /**
       * If there is a discount code then automatic discounts and other
       * discount codes should not be possible, so only calculate discounts
       * from the active discount code
       */
      let amount = 0;
      for (let line of checkout.lines.edges) {
        for (let alloc of line.node.discountAllocations) {
          if ('code' in alloc && alloc.code === code) {
            amount += parseFloat(alloc.discountedAmount.amount);
          }
        }
      }
      return {
        name: code,
        amount: amount.toFixed(2),
        canRemove: true
      };
    } else {
      /**
       * If there's no discount code, look for any other active discounts.
       * Only calculate the price for the first one you find
       */
      let name: string,
        amount = 0;
      for (let line of checkout.lines.edges) {
        for (let alloc of line.node.discountAllocations) {
          if (!('code' in alloc)) {
            if (!name) name = alloc.title;

            if (alloc.title === name)
              amount += parseFloat(alloc.discountedAmount.amount);
          }
        }
      }
      /**
       * If no discounts are found, return null
       */
      if (!name) return null;

      return {
        name,
        amount: amount.toFixed(2),
        canRemove: false
      };
    }
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
      checkout.lines.edges.forEach(edge => {
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
      return checkout.checkoutUrl as string;
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
