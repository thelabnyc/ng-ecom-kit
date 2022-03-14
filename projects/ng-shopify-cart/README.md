# NgShopifyCart

Shopify Cart.

# Install

1. `echo @thelabnyc:registry=https://gitlab.com/api/v4/packages/npm/ >> .npmrc`
2. `ng add @thelabnyc/ng-shopify-cart`
3. Add `NgShopifyCartModule.forRoot({refreshCartAction: yourActionToRefreshCart, selectUserAccessToken: your-selector})` to your app.modules.

- refreshCartAction: Actual to update the cart on. This could be an init action, page router, or something on a timer. You should minimally run this at least on page load.
- selectUserAccessToken: (optional) A function that accepts the state and returns your shopify user access token for the storefront API. If you do not need to associate a shopify Checkout with a user, you may leave this blank.

Adding the shopify storefront api header is not supported by this package at this time (you can use a angular interceptor for this)

## Code scaffolding

Run `ng generate component component-name --project ng-shopify-cart` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-shopify-cart`.

> Note: Don't forget to add `--project ng-shopify-cart` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ng-shopify-cart` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test ng-shopify-cart` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
