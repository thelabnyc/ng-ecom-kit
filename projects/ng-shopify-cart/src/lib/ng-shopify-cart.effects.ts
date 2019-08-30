import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  mergeMap,
  withLatestFrom,
  map,
  exhaustMap,
  catchError
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import {
  CheckoutCreateGQL,
  CheckoutCreateMutation,
  CheckoutCreateMutationVariables,
  CheckoutLineItemsAddGQL,
  CheckoutLineItemsAddMutation,
  CheckoutLineItemsAddMutationVariables,
  CheckoutCustomerAssociateV2GQL,
  CheckoutDiscountCodeApplyV2GQL,
  CheckoutLineItemsReplaceMutation,
  CheckoutLineItemsReplaceMutationVariables,
  CheckoutLineItemsReplaceGQL,
  GetCheckoutGQL,
  CheckoutDiscountCodeRemoveGQL,
  CheckoutDiscountCodeRemoveMutation,
  CheckoutDiscountCodeApplyV2Mutation,
  CheckoutStateFragment,
  LineItemPropertiesFragment,
  CheckoutLineItemInput
} from './generated/graphql';
import {
  addToCheckout,
  setCheckout,
  applyCoupon,
  applyCouponSuccess,
  addToCheckoutFailure,
  addToCheckoutSuccess,
  removeLineItem,
  removeLineItemFailure,
  incrementLineItemQuantity,
  incrementLineItemQuantityFailure,
  decrementLineItemQuantity,
  decrementLineItemQuantityFailure,
  clearCart,
  createCheckout,
  createCheckoutFailure,
  removeCoupon,
  removeCouponSuccess,
  applyCouponFailure,
  incrementLineItemQuantitySuccess,
  decrementLineItemQuantitySuccess,
  removeLineItemSuccess
} from './ng-shopify-cart.actions';
import { IAppState } from './ng-shopify-cart.reducer';
import { INgShopifyCartConfig } from './interfaces';
import {
  selectCheckout,
  selectCheckoutLineItems
} from './ng-shopify-cart.selectors';

/**
 * We normalize the list of variantId/quantity tuples that we send to Shopify
 * because if we don't it starts duplicating line items when automatic discounts
 * are applied to some of them
 */
export function collectLineItems(
  lineItems: LineItemPropertiesFragment[]
): CheckoutLineItemInput[] {
  const lineItemsMap = {} as { [variantId: string]: number };
  for (const item of lineItems) {
    lineItemsMap[item.variant.id] =
      item.quantity + (lineItemsMap[item.variant.id] || 0);
  }

  return Object.entries(lineItemsMap).map(([variantId, quantity]) => ({
    variantId,
    quantity
  }));
}

export function getVariantGraphqlId(variantId: number) {
  // Make graphql id from rest api id (yes really..)
  return btoa('gid://shopify/ProductVariant/' + variantId);
}

@Injectable()
export class CartEffects {
  private userAccessToken: string | null;

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCheckout),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      mergeMap(([action, checkout]) => {
        const variantGID = getVariantGraphqlId(action.variantId);
        const lineItems = [
          { variantId: variantGID, quantity: action.quantity }
        ];
        if (checkout) {
          const data: CheckoutLineItemsAddMutationVariables = {
            checkoutId: checkout.id,
            lineItems
          };
          return this.checkoutLineItemsAdd.mutate(data).pipe(
            map(res => {
              const mutation: CheckoutLineItemsAddMutation = res.data;
              if (
                mutation.checkoutLineItemsAdd &&
                mutation.checkoutLineItemsAdd.checkout
              ) {
                return addToCheckoutSuccess({
                  checkout: mutation.checkoutLineItemsAdd.checkout
                });
              }
              return addToCheckoutFailure();
            }),
            catchError(err => {
              return of(addToCheckoutFailure());
            })
          );
        } else {
          const data: CheckoutCreateMutationVariables = {
            input: { lineItems }
          };
          return this.createCheckout(data, this.userAccessToken).pipe(
            map(createdCheckout => {
              if (createdCheckout) {
                return addToCheckoutSuccess({ checkout: createdCheckout });
              }
              return addToCheckoutFailure();
            }),
            catchError(err => {
              return of(addToCheckoutFailure());
            })
          );
        }
      })
    )
  );

  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(this.config.refreshCartAction),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      exhaustMap(([action, checkout]) => {
        if (checkout) {
          return this.getCheckout.fetch({ input: checkout.id }).pipe(
            map(({ data }) => {
              if (data.node) {
                // If order is set, then the order is completed. Clear the cart.
                if (data.node.order) {
                  return clearCart();
                } else {
                  return setCheckout({ checkout: data.node });
                }
              } else {
                // There is no corresponding checkout, this often happens after a shopify outage.
                return clearCart();
              }
            })
          );
        } else {
          return EMPTY;
        }
      })
    )
  );

  /** Apply a coupon to a checkout. If no checkout exists, create one and apply the coupon */
  applyCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(applyCoupon),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      exhaustMap(([action, checkout]) => {
        const coupon = action.code;
        if (checkout) {
          return this.applyPromoCode(checkout.id, coupon);
        } else {
          const data: CheckoutCreateMutationVariables = {
            input: {
              lineItems: []
            }
          };
          return this.createCheckout(data, this.userAccessToken).pipe(
            mergeMap(createdCheckout => {
              if (createdCheckout) {
                return this.applyPromoCode(createdCheckout.id, coupon);
              } else {
                return EMPTY;
              }
            })
          );
        }
      })
    )
  );

  removeCoupon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCoupon),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      exhaustMap(([action, checkout]) => {
        if (checkout) {
          return this.checkoutDiscountCodeRemove
            .mutate({
              checkoutId: checkout.id
            })
            .pipe(
              map(response => {
                const mutation: CheckoutDiscountCodeRemoveMutation =
                  response.data;
                return removeCouponSuccess({
                  checkout: mutation.checkoutDiscountCodeRemove.checkout
                });
              })
            );
        }
        return EMPTY;
      })
    )
  );

  removeLineItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeLineItem),
      withLatestFrom(
        this.store.pipe(select(selectCheckout)),
        this.store.pipe(select(selectCheckoutLineItems))
      ),
      mergeMap(([action, checkout]) => {
        if (checkout) {
          const data: CheckoutLineItemsReplaceMutationVariables = {
            checkoutId: checkout.id,
            lineItems: collectLineItems(
              checkout.lineItems.edges.map(edge => edge.node)
            ).filter(({ variantId }) => variantId !== action.variantId)
          };
          return this.checkoutLineItemsReplace.mutate(data).pipe(
            map(res => {
              const mutation: CheckoutLineItemsReplaceMutation = res.data;
              if (
                mutation.checkoutLineItemsReplace &&
                mutation.checkoutLineItemsReplace.checkout
              ) {
                return removeLineItemSuccess({
                  checkout: mutation.checkoutLineItemsReplace.checkout
                });
              }
            }),
            catchError(err => {
              console.error('Unable to remove line item from cart', err);
              return of(removeLineItemFailure());
            })
          );
        } else {
          return EMPTY;
        }
      })
    )
  );

  incrementLineItemQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incrementLineItemQuantity),
      withLatestFrom(
        this.store.pipe(select(selectCheckout)),
        this.store.pipe(select(selectCheckoutLineItems))
      ),
      mergeMap(([action, checkout]) => {
        if (checkout) {
          const data: CheckoutLineItemsReplaceMutationVariables = {
            checkoutId: checkout.id,
            lineItems: collectLineItems(
              checkout.lineItems.edges.map(edge => edge.node)
            ).map(({ variantId, quantity }) => {
              if (variantId === action.variantId) {
                return {
                  variantId,
                  quantity: quantity + 1
                };
              } else {
                return {
                  variantId,
                  quantity
                };
              }
            })
          };
          return this.checkoutLineItemsReplace.mutate(data).pipe(
            map(res => {
              const mutation: CheckoutLineItemsReplaceMutation = res.data;
              if (
                mutation.checkoutLineItemsReplace &&
                mutation.checkoutLineItemsReplace.checkout
              ) {
                return incrementLineItemQuantitySuccess({
                  checkout: mutation.checkoutLineItemsReplace.checkout
                });
              }
            }),
            catchError(err => {
              console.error('Unable to increment quantity on cart', err);
              return of(incrementLineItemQuantityFailure());
            })
          );
        } else {
          return EMPTY;
        }
      })
    )
  );

  decrementLineItemQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(decrementLineItemQuantity),
      withLatestFrom(
        this.store.pipe(select(selectCheckout)),
        this.store.pipe(select(selectCheckoutLineItems))
      ),
      mergeMap(([action, checkout]) => {
        if (checkout) {
          const data: CheckoutLineItemsReplaceMutationVariables = {
            checkoutId: checkout.id,
            lineItems: collectLineItems(
              checkout.lineItems.edges.map(edge => edge.node)
            ).map(({ variantId, quantity }) => {
              if (variantId === action.variantId) {
                return {
                  variantId,
                  quantity: quantity - 1
                };
              } else {
                return {
                  variantId,
                  quantity
                };
              }
            })
          };
          return this.checkoutLineItemsReplace.mutate(data).pipe(
            map(res => {
              const mutation: CheckoutLineItemsReplaceMutation = res.data;
              if (
                mutation.checkoutLineItemsReplace &&
                mutation.checkoutLineItemsReplace.checkout
              ) {
                return decrementLineItemQuantitySuccess({
                  checkout: mutation.checkoutLineItemsReplace.checkout
                });
              }
            }),
            catchError(err => {
              console.error('Unable to increment quantity on cart', err);
              return of(decrementLineItemQuantityFailure());
            })
          );
        } else {
          return EMPTY;
        }
      })
    )
  );

  createCheckout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCheckout),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      exhaustMap(([action, checkout]) => {
        if (checkout) {
          return EMPTY; // It's already been created
        }
        const data: CheckoutCreateMutationVariables = {
          input: {
            lineItems: []
          }
        };
        return this.createCheckout(data, this.userAccessToken).pipe(
          map(createdCheckout => {
            if (createdCheckout) {
              return setCheckout({ checkout: createdCheckout });
            } else {
              return createCheckoutFailure();
            }
          })
        );
      })
    )
  );

  /** Create new checkout object and associate user if possible */
  private createCheckout(
    data: CheckoutCreateMutationVariables,
    userAccessToken: string | null
  ) {
    return this.checkoutCreate.mutate(data).pipe(
      map(res => {
        const mutation: CheckoutCreateMutation = res.data;
        if (mutation.checkoutCreate && mutation.checkoutCreate.checkout) {
          if (userAccessToken) {
            const checkoutId = mutation.checkoutCreate.checkout.id;
            this.checkoutCustomerAssociateV2
              .mutate({
                checkoutId,
                customerAccessToken: userAccessToken
              })
              .toPromise();
          }
          return mutation.checkoutCreate.checkout;
        }
      })
    );
  }

  private applyPromoCode(checkoutId: string, discountCode: string) {
    return this.checkoutDiscountCodeApplyV2
      .mutate({ checkoutId, discountCode })
      .pipe(
        map(response => {
          const mutation: CheckoutDiscountCodeApplyV2Mutation = response.data;

          if (
            mutation.checkoutDiscountCodeApplyV2.userErrors &&
            mutation.checkoutDiscountCodeApplyV2.userErrors.find(
              error => error.field.indexOf('discountCode') > -1
            )
          ) {
            return applyCouponFailure({
              checkout: mutation.checkoutDiscountCodeApplyV2.checkout,
              code: discountCode
            });
          }
          return applyCouponSuccess({
            checkout: mutation.checkoutDiscountCodeApplyV2.checkout
          });
        })
      );
  }

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
    private checkoutCreate: CheckoutCreateGQL,
    private checkoutLineItemsAdd: CheckoutLineItemsAddGQL,
    private checkoutCustomerAssociateV2: CheckoutCustomerAssociateV2GQL,
    private checkoutDiscountCodeApplyV2: CheckoutDiscountCodeApplyV2GQL,
    private checkoutDiscountCodeRemove: CheckoutDiscountCodeRemoveGQL,
    private getCheckout: GetCheckoutGQL,
    private checkoutLineItemsReplace: CheckoutLineItemsReplaceGQL,
    @Inject('ngShopifyCartConfig') private config: INgShopifyCartConfig
  ) {
    if (this.config.selectUserAccessToken) {
      this.store
        .pipe(select(this.config.selectUserAccessToken))
        .subscribe(accessToken => (this.userAccessToken = accessToken));
    }
  }
}
