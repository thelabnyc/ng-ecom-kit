import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgFilterableGridComponent } from 'projects/ng-filterable-grid/src/public-api';
import { ListingComponent } from './listing/listing.component';

const routes: Routes = [
  {
    path: '',
    component: ListingComponent
  },
  {
    path: 'grid',
    component: NgFilterableGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
