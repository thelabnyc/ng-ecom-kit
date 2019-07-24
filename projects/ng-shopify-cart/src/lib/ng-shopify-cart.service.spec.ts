import { TestBed } from '@angular/core/testing';

import { NgShopifyCartService } from './ng-shopify-cart.service';

describe('NgShopifyCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgShopifyCartService = TestBed.get(NgShopifyCartService);
    expect(service).toBeTruthy();
  });
});
