import { NgModule, ModuleWithProviders } from '@angular/core';
import { YotpoReviewsWidgetComponent } from './reviews-widget.component';
import { INgYotpoConfig } from './interfaces';
import { YotpoService } from './yotpo.service';
import { YotpoStarRatingComponent } from './star-rating/star-rating.component';

@NgModule({
  declarations: [YotpoReviewsWidgetComponent, YotpoStarRatingComponent],
  imports: [],
  exports: [YotpoReviewsWidgetComponent, YotpoStarRatingComponent]
})
export class NgYotpoModule {
  static forRoot(config: INgYotpoConfig): ModuleWithProviders {
    return {
      ngModule: NgYotpoModule,
      providers: [YotpoService, { provide: 'ngYotpoConfig', useValue: config }]
    };
  }
}
