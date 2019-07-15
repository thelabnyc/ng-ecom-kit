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

@NgModule({
  declarations: [AppComponent, ListingComponent, GridComponent, YotpoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgFilterableGridModule,
    NgYotpoModule.forRoot({
      apiKey: 'enter-key-here'
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
