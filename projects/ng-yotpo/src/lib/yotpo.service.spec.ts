import { TestBed } from '@angular/core/testing';

import { YotpoService } from './yotpo.service';
import { NgYotpoModule } from './ng-yotpo.module';

describe('NgYotpoService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [NgYotpoModule.forRoot({ apiKey: 'test' })]
    })
  );

  it('should be created', () => {
    const service: YotpoService = TestBed.get(YotpoService);
    expect(service).toBeTruthy();
  });
});
