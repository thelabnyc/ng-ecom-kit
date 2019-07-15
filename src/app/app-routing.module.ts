import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { GridComponent } from './grid/grid.component';
import { YotpoComponent } from './yotpo/yotpo.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
