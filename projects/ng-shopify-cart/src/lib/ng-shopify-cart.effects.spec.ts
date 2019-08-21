import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { ApolloTestingModule } from 'apollo-angular/testing';

import { CartEffects } from './ng-shopify-cart.effects';
import { GetCheckoutGQL } from './generated/graphql';
import { reducer } from './ng-shopify-cart.reducer';

// tslint:disable-next-line: max-line-length
// const emptyCartResp: GetCheckout.Query = {
//   node: {
//     id:
//       'Z2lkOi8vc2hvcGlmeS9DaGVja291dC8wM2YwZDk4OWEyNDMzY2I0YzVjNWM4MjhmNzNjZTM5Yz9rZXk9ODMzOWIzYmQ2YjQ3ODAwYzFlYzE5ZWI5N2E1NGIzOTc=',
//     webUrl:
//       'https://devacurl.myshopify.com/6874824786/checkouts/03f0d989a2433cb4c5c5c828f73ce39c?key=8339b3bd6b47800c1ec19eb97a54b397',
//     subtotalPrice: '0.00',
//     order: null,
//     lineItems: { edges: [], __typename: 'CheckoutLineItemConnection' },
//     __typename: 'Checkout'
//   }
// };
// const badCart: GetCheckout.Query = {
//   node: {
//     id: 'Z2lkOi8vc2hvcGlmeS9DaGE5ZWI5N2E1NGIzOTc=',
//     webUrl:
//       'https://devacurl.myshopify.com/6874824786/checkouts/03f0d989a2433cb4c5c5c828f73ce39c?key=8339b3bd6b47800c1ec19eb97a54b397',
//     subtotalPrice: '0.00',
//     order: null,
//     lineItems: { edges: [], __typename: 'CheckoutLineItemConnection' },
//     __typename: 'Checkout'
//   }
// };

describe('AppEffects', () => {
  let actions$: Observable<any>;
  let effects: CartEffects;
  let getCheckout: GetCheckoutGQL;
  let getCheckoutSpy: jasmine.SpyObj<GetCheckoutGQL>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          { cart: reducer },
          {
            initialState: {
              cart: { checkout: { id: 'test' }, couponError: null }
            }
          }
        ),
        ApolloTestingModule
      ],
      providers: [
        CartEffects,
        { provide: GetCheckoutGQL, useValue: { fetch: jasmine.createSpy() } },
        provideMockActions(() => actions$),
        { provide: 'ngShopifyCartConfig', useValue: {} }
      ]
    });

    effects = TestBed.get(CartEffects);
    getCheckout = TestBed.get(GetCheckoutGQL);
    getCheckoutSpy = jasmine.createSpyObj('getCheckout', ['fetch']);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  // We should have a test but jasmine marbles tests are so horrible and time consuming
});
