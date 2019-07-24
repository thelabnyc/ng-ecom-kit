import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgFilterableGridModule } from 'projects/ng-filterable-grid/src/public-api';
import { NgYotpoModule } from 'projects/ng-yotpo/src/public-api';
import { ListingComponent } from './listing/listing.component';
import { GridComponent } from './grid/grid.component';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { YotpoComponent } from './yotpo/yotpo.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { CartComponent } from './cart/cart.component';
import { NgShopifyCartModule } from 'projects/ng-shopify-cart/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent,
    GridComponent,
    YotpoComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgFilterableGridModule,
    NgShopifyCartModule.forRoot({}),
    NgYotpoModule.forRoot({
      apiKey: 'enter-key-here'
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
