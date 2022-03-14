# NgEcomKit

This project is a shared open source library of components and functions thelab uses for Angular ecom development. It often is intended to work with Shopify.

Project status: Experimental. Expect breaking changes and no changelog until 1.0.

## Filterable Grid

[ng-filterable-grid](projects/ng-filterable-grid)

A collection of ngrx selector functions and interfaces to display a grid. We don't have any common UI for this at this time. The demo does include a very basic implementation just to show how filtering works.

## NG Yotpo

[ng-yotpo](projects/ng-yotpo)

Angular wrapper around Yotpo's JS Widget. Has no other dependencies.

## NG Shopify Cart

[ng-shopify-cart](projects/ng-shopify-cart) is an Angular shopping cart intended to be used with Shopify and a ngrx workflow. It includes mainly the ngrx reducers and effects to work with Shopify's storefront graphql API. It does not include the styling of the actual cart interface.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Publishing New Versions

Use the `publish-version.sh` script with the new version number as an argument.

```bash
./publish-version.sh "0.1.0"
```

This script will update the appropriate versions in package.json, commit, tag, and push. Gitlab CI will, upon receipt of the new tag, build the new versions and publish them to the package registry.
