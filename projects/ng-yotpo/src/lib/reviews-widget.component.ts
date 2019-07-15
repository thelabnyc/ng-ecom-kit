import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges
} from '@angular/core';
import { YotpoService } from './yotpo.service';

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
    ></div>
    ,
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YotpoReviewsWidgetComponent implements OnChanges {
  @Input() productId: string;
  @Input() price: number;
  @Input() name: string;
  @Input() imageUrl: string;
  @Input() url: string;
  @Input() description: string;

  constructor(private yotpoService: YotpoService) {}

  ngOnChanges() {
    this.yotpoService.loadWidget();
  }
}
