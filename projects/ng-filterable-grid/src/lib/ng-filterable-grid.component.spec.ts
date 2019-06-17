import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFilterableGridComponent } from './ng-filterable-grid.component';

describe('NgFilterableGridComponent', () => {
  let component: NgFilterableGridComponent;
  let fixture: ComponentFixture<NgFilterableGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFilterableGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFilterableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
