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
  CheckoutCreate,
  CheckoutLineItemsAddGQL,
  CheckoutLineItemsAdd,
  CheckoutCustomerAssociateV2GQL,
  CheckoutDiscountCodeApplyV2GQL,
  CheckoutLineItemsReplace,
  CheckoutLineItemsReplaceGQL,
  GetCheckoutGQL,
  CheckoutDiscountCodeRemoveGQL
} from './generated/graphql';
import {
  addToCheckout,
  setCheckout,
  applyCoupon,
  applyCouponSuccess,
  addToCheckoutFailure,
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
  removeCouponSuccess
} from './ng-shopify-cart.actions';
import { IAppState } from './ng-shopify-cart.reducer';
import { INgShopifyCartConfig } from './interfaces';
import {
  selectCheckout,
  selectCheckoutLineItems
} from './ng-shopify-cart.selectors';

@Injectable()
export class CartEffects {
  private userAccessToken: string | null;

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCheckout),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      mergeMap(([action, checkout]) => {
        // Make graphql id from rest api id (yes really..)
        const variantGID = btoa(
          'gid://shopify/ProductVariant/' + action.variantId
        );
        const lineItems = [
          { variantId: variantGID, quantity: action.quantity }
        ];
        if (checkout) {
          const data: CheckoutLineItemsAdd.Variables = {
            checkoutId: checkout.id,
            lineItems
          };
          return this.checkoutLineItemsAdd.mutate(data).pipe(
            map(res => {
              const mutation: CheckoutLineItemsAdd.Mutation = res.data;
              if (
                mutation.checkoutLineItemsAdd &&
                mutation.checkoutLineItemsAdd.checkout
              ) {
                return setCheckout({
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
          const data: CheckoutCreate.Variables = { input: { lineItems } };
          return this.createCheckout(data, this.userAccessToken).pipe(
            map(createdCheckout => {
              if (createdCheckout) {
                return setCheckout({ checkout: createdCheckout });
              }
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
          return this.checkoutDiscountCodeApplyV2
            .mutate({
              checkoutId: checkout.id,
              discountCode: coupon
            })
            .pipe(map(() => applyCouponSuccess()));
        } else {
          const data: CheckoutCreate.Variables = {
            input: {
              lineItems: []
            }
          };
          return this.createCheckout(data, this.userAccessToken).pipe(
            mergeMap(createdCheckout => {
              if (createdCheckout) {
                return this.checkoutDiscountCodeApplyV2
                  .mutate({
                    checkoutId: createdCheckout.id,
                    discountCode: coupon
                  })
                  .pipe(
                    mergeMap(() => [
                      applyCouponSuccess(),
                      setCheckout({ checkout: createdCheckout })
                    ])
                  );
              } else {
                return EMPTY;
              }
            })
          );
        }
      })
    )
  );

  removeCoupon$ = createEffect(() => this.actions$.pipe(
      ofType(removeCoupon),
      withLatestFrom(this.store.pipe(select(selectCheckout))),
      exhaustMap(([action, checkout]) => {
        if (checkout) {
          return this.checkoutDiscountCodeRemove
            .mutate({
              checkoutId: checkout.id,
            })
            .pipe(map(() => removeCouponSuccess()));
        }
        return EMPTY;
      }
    )
  ));

  removeLineItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeLineItem),
      withLatestFrom(
        this.store.pipe(select(selectCheckout)),
        this.store.pipe(select(selectCheckoutLineItems))
      ),
      mergeMap(([action, checkout]) => {
        if (checkout) {
          const data: CheckoutLineItemsReplace.Variables = {
            checkoutId: checkout.id,
            lineItems: checkout.lineItems.edges
              .map(lineItem => {
                return {
                  variantId: lineItem.node.variant
                    ? lineItem.node.variant.id
                    : '',
                  quantity: lineItem.node.quantity
                };
              })
              .filter(lineItem => lineItem.variantId !== action.variantId)
          };
          return this.checkoutLineItemsReplace.mutate(data).pipe(
            map(res => {
              const mutation: CheckoutLineItemsReplace.Mutation = res.data;
              if (
                mutation.checkoutLineItemsReplace &&
                mutation.checkoutLineItemsReplace.checkout
              ) {
                return setCheckout({
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
          const data: CheckoutLineItemsReplace.Variables = {
            checkoutId: checkout.id,
            lineItems: checkout.lineItems.edges.map(lineItem => {
              if (
                lineItem.node.variant &&
                action.variantId === lineItem.node.variant.id
              ) {
                return {
                  variantId: lineItem.node.variant
                    ? lineItem.node.variant.id
                    : '',
                  quantity: lineItem.node.quantity + 1
                };
              } else {
                return {
                  variantId: lineItem.node.variant
                    ? lineItem.node.variant.id
                    : '',
                  quantity: lineItem.node.quantity
                };
              }
            })
          };
          return this.checkoutLineItemsReplace.mutate(data).pipe(
            map(res => {
              const mutation: CheckoutLineItemsReplace.Mutation = res.data;
              if (
                mutation.checkoutLineItemsReplace &&
                mutation.checkoutLineItemsReplace.checkout
              ) {
                return setCheckout({
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
          const data: CheckoutLineItemsReplace.Variables = {
            checkoutId: checkout.id,
            lineItems: checkout.lineItems.edges.map(lineItem => {
              if (
                lineItem.node.variant &&
                action.variantId === lineItem.node.variant.id
              ) {
                return {
                  variantId: lineItem.node.variant
                    ? lineItem.node.variant.id
                    : '',
                  quantity: lineItem.node.quantity - 1
                };
              } else {
                return {
                  variantId: lineItem.node.variant
                    ? lineItem.node.variant.id
                    : '',
                  quantity: lineItem.node.quantity
                };
              }
            })
          };
          return this.checkoutLineItemsReplace.mutate(data).pipe(
            map(res => {
              const mutation: CheckoutLineItemsReplace.Mutation = res.data;
              if (
                mutation.checkoutLineItemsReplace &&
                mutation.checkoutLineItemsReplace.checkout
              ) {
                return setCheckout({
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
        const data: CheckoutCreate.Variables = {
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
    data: CheckoutCreate.Variables,
    userAccessToken: string | null
  ) {
    return this.checkoutCreate.mutate(data).pipe(
      map(res => {
        const mutation: CheckoutCreate.Mutation = res.data;
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
