import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YotpoComponent } from './yotpo.component';

describe('YotpoComponent', () => {
  let component: YotpoComponent;
  let fixture: ComponentFixture<YotpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YotpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YotpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
