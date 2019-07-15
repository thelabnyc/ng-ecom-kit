import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YotpoStarRatingComponent } from './star-rating.component';
import { NgYotpoModule } from '../ng-yotpo.module';

describe('StarRatingComponent', () => {
  let component: YotpoStarRatingComponent;
  let fixture: ComponentFixture<YotpoStarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [NgYotpoModule.forRoot({ apiKey: 'test' })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YotpoStarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
