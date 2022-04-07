import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  mergeMap,
  concatMap,
  withLatestFrom,
  map,
  exhaustMap,
  catchError,
  debounceTime,
  bufferWhen
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
  GetCheckoutGQL,
  CheckoutDiscountCodeRemoveGQL,
  CheckoutDiscountCodeRemoveMutation,
  CheckoutDiscountCodeApplyV2Mutation,
  CartLinesRemoveGQL,
  CartLinesRemoveMutation,
  CartLinesRemoveMutationVariables,
  CartLinesUpdateGQL,
  CartLinesUpdateMutationVariables,
  CartLinesUpdateMutation,
  CartLineInput
} from './generated/graphql';
import {
  addToCheckout,
  batchAddOrRemoveFromCheckout,
  batchAddOrRemoveFromCheckoutSuccess,
  batchAddOrRemoveFromCheckoutFailure,
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
import { selectCheckout } from './ng-shopify-cart.selectors';

export function getVariantGraphqlId(variantId: number) {
  // Make graphql id from rest api id (yes really..)
  return btoa('gid://shopify/ProductVariant/' + variantId);
}

type AddOrRemoveLineMutation =
  | CheckoutLineItemsAddMutation
  | CartLinesRemoveMutation;
const isAddMutation = (
  m: AddOrRemoveLineMutation
): m is CheckoutLineItemsAddMutation => {
  return (m as CheckoutLineItemsAddMutation).cartLinesAdd !== undefined;
};

@Injectable()
export class CartEffects {
  private userAccessToken: string | null;
  debouncer = debounceTime(500);

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCheckout),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      mergeMap(([action, checkout]) => {
        const variantGID = getVariantGraphqlId(action.variantId);
        const lineItems: CartLineInput[] = [
          {
            merchandiseId: variantGID,
            quantity: action.quantity,
            sellingPlanId: action.sellingPlanId
          }
        ];
        if (checkout) {
          const data: CheckoutLineItemsAddMutationVariables = {
            cartId: checkout.id,
            lineItems
          };
          return this.checkoutLineItemsAdd.mutate(data).pipe(
            map(res => {
              const mutation: CheckoutLineItemsAddMutation = res.data;
              if (mutation.cartLinesAdd && mutation.cartLinesAdd.cart) {
                return addToCheckoutSuccess({
                  checkout: mutation.cartLinesAdd.cart
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
            input: { lines: lineItems }
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

  batchAddOrRemoveFromCheckout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(batchAddOrRemoveFromCheckout),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      mergeMap(([action, checkout]) => {
        // If there's no checkout yet, abort.
        if (!checkout) {
          return EMPTY;
        }
        // Build data for add and remove mutations
        const lineItemsToAdd: CartLineInput[] = action.add.map(toAdd => {
          const variantGID = getVariantGraphqlId(toAdd.variantId);
          return {
            merchandiseId: variantGID,
            quantity: toAdd.quantity,
            sellingPlanId: toAdd.sellingPlanId
          };
        });
        const addMutationData: CheckoutLineItemsAddMutationVariables = {
          cartId: checkout.id,
          lineItems: lineItemsToAdd
        };
        const removeMutationData: CartLinesRemoveMutationVariables = {
          cartId: checkout.id,
          lineIds: action.remove.map(toRemove => toRemove.lineId)
        };
        const needsToAdd = addMutationData.lineItems.length > 0;
        const needsToRemove = removeMutationData.lineIds.length > 0;
        // Is there anything to do? If not, bail now.
        if (!needsToAdd && !needsToRemove) {
          return EMPTY;
        }
        // Run the mutations: add, then remove;
        return this.checkoutLineItemsAdd.mutate(addMutationData).pipe(
          map(addResp => {
            const mutation: CheckoutLineItemsAddMutation = addResp.data;
            if (mutation.cartLinesAdd.userErrors.length) {
              throw new Error(
                `Abort! Error adding items during batch: ${JSON.stringify(
                  mutation.cartLinesAdd.userErrors
                )}`
              );
            }
            return addResp;
          }),
          concatMap(_ => {
            return this.cartLinesRemove.mutate(removeMutationData);
          }),
          map(addOrRemoveResp => {
            const mutation: AddOrRemoveLineMutation = addOrRemoveResp.data;
            const mutationData = isAddMutation(mutation)
              ? mutation.cartLinesAdd
              : mutation.cartLinesRemove;
            if (mutationData.userErrors.length > 0) {
              throw new Error(
                `Abort! Error removing items during batch: ${JSON.stringify(
                  mutationData.userErrors
                )}`
              );
            }
            return batchAddOrRemoveFromCheckoutSuccess({
              checkout: mutationData.cart
            });
          }),
          catchError(err => {
            console.error(err);
            return of(batchAddOrRemoveFromCheckoutFailure());
          })
        );
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
              if (data.cart) {
                // If order is set, then the order is completed. Clear the cart.
                return setCheckout({ checkout: data.cart });
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
              lines: []
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
      exhaustMap(([_, checkout]) => {
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
                  checkout: mutation.cartDiscountCodesUpdate.cart
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
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      mergeMap(([action, checkout]) => {
        if (checkout) {
          const data: CartLinesRemoveMutationVariables = {
            cartId: checkout.id,
            lineIds: [action.lineId]
          };
          return this.cartLinesRemove.mutate(data).pipe(
            map(response => {
              const mutation: CartLinesRemoveMutation = response.data;
              if (mutation.cartLinesRemove.userErrors.length) {
                return removeLineItemFailure();
              } else {
                return removeLineItemSuccess({
                  checkout: mutation.cartLinesRemove.cart
                });
              }
            }),
            catchError(() => of(removeLineItemFailure()))
          );
        } else {
          return EMPTY;
        }
      })
    )
  );

  incrementLineItemQuantity$ = createEffect(() => {
    const actions$ = this.actions$.pipe(ofType(incrementLineItemQuantity));
    const debounced$ = actions$.pipe(this.debouncer);

    return actions$.pipe(
      bufferWhen(() => debounced$),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      mergeMap(([actions, checkout]) => {
        const changes: { [lineId: string]: number } = {};
        actions.forEach(action => {
          changes[action.lineId] = (changes[action.lineId] || 0) + 1;
        });

        if (checkout) {
          const data: CartLinesUpdateMutationVariables = {
            cartId: checkout.id,
            lines: checkout.lines.edges
              .filter(({ node }) => changes[node.id])
              .map(({ node: { id, quantity } }) => {
                if (changes[id]) {
                  return {
                    id,
                    quantity: quantity + changes[id]
                  };
                } else {
                  return {
                    id,
                    quantity
                  };
                }
              })
          };
          return this.cartLinesUpdate.mutate(data).pipe(
            map(res => {
              const mutation: CartLinesUpdateMutation = res.data;
              if (mutation.cartLinesUpdate && mutation.cartLinesUpdate.cart) {
                return incrementLineItemQuantitySuccess({
                  checkout: mutation.cartLinesUpdate.cart
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
    );
  });

  decrementLineItemQuantity$ = createEffect(() => {
    const actions$ = this.actions$.pipe(ofType(decrementLineItemQuantity));
    const debounced$ = actions$.pipe(this.debouncer);
    return actions$.pipe(
      bufferWhen(() => debounced$),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      mergeMap(([actions, checkout]) => {
        const changes: { [lineId: string]: number } = {};
        actions.forEach(action => {
          changes[action.lineId] = (changes[action.lineId] || 0) + 1;
        });

        if (checkout) {
          const data: CartLinesUpdateMutationVariables = {
            cartId: checkout.id,
            lines: checkout.lines.edges
              .filter(({ node }) => changes[node.id])
              .map(({ node: { id, quantity } }) => {
                if (changes[id]) {
                  return {
                    id,
                    quantity: quantity - changes[id]
                  };
                } else {
                  return {
                    id,
                    quantity
                  };
                }
              })
          };
          return this.cartLinesUpdate.mutate(data).pipe(
            map(res => {
              const mutation: CartLinesUpdateMutation = res.data;
              if (mutation.cartLinesUpdate && mutation.cartLinesUpdate.cart) {
                return decrementLineItemQuantitySuccess({
                  checkout: mutation.cartLinesUpdate.cart
                });
              }
            }),
            catchError(err => {
              console.error('Unable to decrement quantity on cart', err);
              return of(decrementLineItemQuantityFailure());
            })
          );
        } else {
          return EMPTY;
        }
      })
    );
  });

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
            lines: []
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
        if (mutation.cartCreate && mutation.cartCreate.cart) {
          if (userAccessToken) {
            const checkoutId = mutation.cartCreate.cart.id;
            this.checkoutCustomerAssociateV2
              .mutate({
                checkoutId,
                customerAccessToken: userAccessToken
              })
              .toPromise();
          }
          return mutation.cartCreate.cart;
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
            mutation.cartDiscountCodesUpdate.userErrors &&
            mutation.cartDiscountCodesUpdate.userErrors.find(
              error => error.field.indexOf('discountCode') > -1
            )
          ) {
            return applyCouponFailure({
              checkout: mutation.cartDiscountCodesUpdate.cart,
              code: discountCode
            });
          }
          return applyCouponSuccess({
            checkout: mutation.cartDiscountCodesUpdate.cart
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
    private cartLinesRemove: CartLinesRemoveGQL,
    private cartLinesUpdate: CartLinesUpdateGQL,
    @Inject('ngShopifyCartConfig') private config: INgShopifyCartConfig
  ) {
    if (this.config.selectUserAccessToken) {
      this.store
        .pipe(select(this.config.selectUserAccessToken))
        .subscribe(accessToken => (this.userAccessToken = accessToken));
    }
  }
}
