import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgShopifyCartComponent } from './ng-shopify-cart.component';
import { INgShopifyCartConfig } from './interfaces';
import { reducer } from './ng-shopify-cart.reducer';
import { CartEffects } from './ng-shopify-cart.effects';

@NgModule({
  declarations: [NgShopifyCartComponent],
  imports: [
    StoreModule.forFeature('cart', reducer),
    EffectsModule.forFeature([CartEffects])
  ],
  exports: [NgShopifyCartComponent]
})
export class NgShopifyCartModule {
  static forRoot(config: INgShopifyCartConfig): ModuleWithProviders {
    return {
      ngModule: NgShopifyCartModule,
      providers: [{ provide: 'ngShopifyCartConfig', useValue: config }]
    };
  }
}
