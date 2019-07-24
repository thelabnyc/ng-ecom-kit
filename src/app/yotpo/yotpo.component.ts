import { Component } from '@angular/core';
import {
  sampleProduct,
  sampleProduct2
} from 'projects/ng-filterable-grid/src/lib/sample-data';

@Component({
  selector: 'app-yotpo',
  templateUrl: './yotpo.component.html',
  styleUrls: ['./yotpo.component.scss']
})
export class YotpoComponent {
  product;
  ratingId: number;

  constructor() {
    setTimeout(() => {
      this.product = sampleProduct;
    }, 1000);
    setTimeout(() => {
      this.product = sampleProduct2;
    }, 5000);
    setTimeout(() => (this.ratingId = 5), 3000);
  }
}
