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

export const selectCheckoutDiscount = createSelector(
  selectCheckout,
  (checkout): IDiscount | null => {
    return null;
    // TEMPORARY: everything changed and the below needs to be basically rewritten
    // if (
    //   !checkout ||
    //   !checkout.discountCodes ||
    //   checkout.discountCodes.length === 0
    // ) {
    //   return null;
    // }

    // /**
    //  * finds the first discount that is either:
    //  * automatic (and therefore always applied) or
    //  * a successfully applied promo code
    //  */
    // const node = checkout.discountApplications.edges.find(
    //   application =>
    //     application.node.__typename !== 'DiscountCodeApplication' ||
    //     application.node.applicable
    // ).node;
    // if (!node) {
    //   return null;
    // }

    // let name: string;
    // let canRemove: boolean;
    // if (node.__typename === 'DiscountCodeApplication') {
    //   name = node.code;
    //   canRemove = true;
    // } else {
    //   name = node.title;
    //   canRemove = false;
    // }

    // let amount: string;
    // if (
    //   node.allocationMethod === 'ACROSS' &&
    //   node.value.__typename === 'MoneyV2'
    // ) {
    //   amount = checkout.discountApplications.edges
    //     .filter(({ node: other }) => {
    //       if ('title' in other && 'title' in node)
    //         return other.title === node.title;
    //       else if ('code' in other && 'code' in node)
    //         return other.code === node.code;
    //       else return false;
    //     })
    //     .reduce((total, edge) => {
    //       if (edge.node.value.__typename === 'MoneyV2')
    //         return total + parseFloat(edge.node.value.amount);
    //       else return total;
    //     }, 0)
    //     .toFixed(2);
    // } else {
    //   amount = checkout.lineItems.edges
    //     .reduce(
    //       (total, item) =>
    //         total +
    //         item.node.discountAllocations.reduce(
    //           (subtotal, allocation) =>
    //             subtotal + parseFloat(allocation.allocatedAmount.amount),
    //           0
    //         ),
    //       0
    //     )
    //     .toFixed(2);
    // }

    // return { amount, name, canRemove };
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
