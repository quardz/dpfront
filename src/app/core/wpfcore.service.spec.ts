import { TestBed } from '@angular/core/testing';

import { WpfcoreService } from './wpfcore.service';

describe('WpfcoreService', () => {
  let service: WpfcoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WpfcoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
