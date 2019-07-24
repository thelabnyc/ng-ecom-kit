import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { GridComponent } from './grid/grid.component';
import { YotpoComponent } from './yotpo/yotpo.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: ListingComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'yotpo',
    component: YotpoComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
