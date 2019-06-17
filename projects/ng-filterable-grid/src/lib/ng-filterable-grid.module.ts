import { NgModule } from '@angular/core';
import { FilterableGridComponent } from './filterable-grid.component';
import { BrowserModule } from '@angular/platform-browser';
import { FilterableGridContainer } from './filterable-grid.container';

@NgModule({
  declarations: [FilterableGridComponent, FilterableGridContainer],
  imports: [BrowserModule],
  exports: [FilterableGridComponent, FilterableGridContainer]
})
export class NgFilterableGridModule {}
