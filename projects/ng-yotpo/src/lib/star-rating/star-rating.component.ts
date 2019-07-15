import {
  Component,
  OnChanges,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { YotpoService } from '../yotpo.service';

@Component({
  selector: 'yotpo-star-rating',
  template: `
    <div class="yotpo bottomLine" [attr.data-product-models]="productId"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YotpoStarRatingComponent implements OnChanges {
  @Input() productId: string;

  constructor(private yotpoService: YotpoService) {}

  ngOnChanges() {
    this.yotpoService.loadWidget();
  }
}
