import { TestBed } from '@angular/core/testing';

import { NecessityService } from './necessity.service';

describe('NecessityService', () => {
  let service: NecessityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NecessityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
