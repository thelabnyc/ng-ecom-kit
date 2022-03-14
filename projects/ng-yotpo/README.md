# NgYotpo

Use Yotpo widgets in Angular.

# Install

1. `echo @thelabnyc:registry=https://gitlab.com/api/v4/packages/npm/ >> .npmrc`
2. `npm i @thelabnyc/ng-yotpo`
3. Add `NgYotpoModule.forRoot({apiKey: 'your-key'})` to your AppModule's imports.

# Usage

## Reviews Widget

```
<yotpo-reviews-widget
    productId="1"
    price="1.50"
    name="Example Product"
    url="www.example.com"
    imageUrl=""
    description="Something by Example"
></yotpo-reviews-widget>

```

## Star Ratings

`<yotpo-star-rating productId="1"></yotpo-star-rating>`

# Development

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.1.

## Code scaffolding

Run `ng generate component component-name --project ng-yotpo` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-yotpo`.

> Note: Don't forget to add `--project ng-yotpo` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ng-yotpo` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test ng-yotpo` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
