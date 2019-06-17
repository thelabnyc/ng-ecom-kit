import { TestBed } from '@angular/core/testing';

import { NgFilterableGridService } from './ng-filterable-grid.service';

describe('NgFilterableGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgFilterableGridService = TestBed.get(NgFilterableGridService);
    expect(service).toBeTruthy();
  });
});
