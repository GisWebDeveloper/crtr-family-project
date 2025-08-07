import { TestBed } from '@angular/core/testing';

import { TzhsService } from './tzhs.service';

describe('TzhsService', () => {
  let service: TzhsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TzhsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
