import { TestBed } from '@angular/core/testing';

import { PackageService } from './package-service.service';

describe('PackageService', () => {
  let service: PackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
