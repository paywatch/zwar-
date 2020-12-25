import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { forkJoin, of } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // uploadFile(event, fileName) {

  //   const files = event.target.files;
  //   const formData = new FormData();

  //   for (const file of files) {
  //     const newFileName = file.name.replace(/\s/g, '');
  //     console.log(file);
  //     formData.append('file', file, newFileName);
  //   }

  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');

  //   return this.http.post('/api/ph1/upload', formData, { headers })
  //     .pipe(
  //       map((res: any) => res && res.newName ? res : null ),
  //       tap((res: any) => {
  //         if (res) {
  //           sessionStorage.setItem(fileName, JSON.stringify(res));
  //         }
  //       })
  //     );
  // }

  // uploadFile(event, fileName) {
  //   const files = event.target.files;
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');

  //   const files$ = Array.from(files).map((file: any) => {
  //     const newFileName = file.name.replace(/\s/g, '');
  //     const formData = new FormData();
  //     formData.append('file', file, newFileName);
  //     return this.http.post('/api/ph1/upload', formData, { headers });
  //   });

  //   return forkJoin(files$).pipe(
  //     map((res: any) => res.map((item) => item && item.newName ? item : null)),
  //     tap((res: any) => {
  //       if (res) {
  //         if (files.length - 1) {
  //           sessionStorage.setItem(fileName, JSON.stringify(res));
  //         }
  //         else {
  //           sessionStorage.setItem(fileName, JSON.stringify(res[0]));
  //         }
  //       }
  //     })
  //   );
  // }
}
