import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YotpoReviewsWidgetComponent } from './reviews-widget.component';
import { NgYotpoModule } from './ng-yotpo.module';

describe('NgYotpoComponent', () => {
  let component: YotpoReviewsWidgetComponent;
  let fixture: ComponentFixture<YotpoReviewsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgYotpoModule.forRoot({ apiKey: 'test' })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YotpoReviewsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
