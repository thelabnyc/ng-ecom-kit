import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgFilterableGridModule } from 'projects/ng-filterable-grid/src/public-api';
import { ListingComponent } from './listing/listing.component';

@NgModule({
  declarations: [
    AppComponent,
    ListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgFilterableGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
