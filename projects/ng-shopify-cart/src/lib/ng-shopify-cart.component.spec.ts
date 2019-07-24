import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgShopifyCartComponent } from './ng-shopify-cart.component';

describe('NgShopifyCartComponent', () => {
  let component: NgShopifyCartComponent;
  let fixture: ComponentFixture<NgShopifyCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgShopifyCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgShopifyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
