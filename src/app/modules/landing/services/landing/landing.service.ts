import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient) { }

  getPakcage(payload) {
    return this.http.post('/api/ph1/packagelist', {
      page: 0,
      size: 100,
      ...payload
    }).pipe(map((res: any) => res && res.data ? res.data : res));
  }
}
