import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgFilterableGridModule } from 'projects/ng-filterable-grid/src/public-api';
import { ListingComponent } from './listing/listing.component';
import { GridComponent } from './grid/grid.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, ListingComponent, GridComponent],
  imports: [BrowserModule, AppRoutingModule, NgFilterableGridModule, StoreModule.forRoot(reducers, { metaReducers }), StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
