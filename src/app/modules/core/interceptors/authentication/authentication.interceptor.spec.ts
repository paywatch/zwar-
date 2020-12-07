import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AuthInterceptor } from './authentication.interceptor';

describe('Lang-interceptor.service', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]
  }));

  describe('intercept HTTP requests', () => {
    it('should be created', inject([AuthInterceptor], (service: AuthInterceptor) => {
      expect(service).toBeTruthy();
    }));
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
