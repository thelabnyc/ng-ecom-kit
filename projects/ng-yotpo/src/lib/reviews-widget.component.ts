import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { YotpoService } from './yotpo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'yotpo-reviews-widget',
  template: `
    <div
      class="yotpo yotpo-main-widget l-content"
      [attr.data-product-id]="productId"
      [attr.data-price]="price"
      [attr.data-name]="name"
      [attr.data-image-url]="imageUrl"
      [attr.data-url]="url"
      [attr.data-description]="description"
    >
      <div [innerHTML]="htmlString$ | async"></div>
    </div>
    ,
  `
})
export class YotpoReviewsWidgetComponent implements OnChanges, OnInit {
  @Input() productId: string;
  @Input() price: number;
  @Input() name: string;
  @Input() imageUrl: string;
  @Input() url: string;
  @Input() description: string;

  htmlString$: Observable<string | null>;

  constructor(private yotpoService: YotpoService) {}

  ngOnInit() {
    this.htmlString$ = this.yotpoService.getHtmlString(this.productId);
  }

  ngOnChanges() {
    this.yotpoService.loadWidget();
  }
}
