import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterableGridComponent } from './filterable-grid.component';

describe('NgFilterableGridComponent', () => {
  let component: FilterableGridComponent;
  let fixture: ComponentFixture<FilterableGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterableGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterableGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
