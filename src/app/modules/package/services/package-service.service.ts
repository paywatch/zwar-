import { Injectable } from '@angular/core';
import { Observable, of, } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Package } from '../models/package';


@Injectable({
  providedIn: 'root'
})
export class PackageService {

  baseCollection: AngularFirestoreCollection<any>;
  base: Observable<any>;
  baseDoc: AngularFirestoreDocument<any>;

  internalAirportCollection: AngularFirestoreCollection<any>;
  internalAirport: Observable<any>;

  umrahSeasonCollection: AngularFirestoreCollection<any>;
  umrahSeason: Observable<any>;

  umrahDirectionCollection: AngularFirestoreCollection<any>;
  umrahDirection: Observable<any>;

  matwafCollection: AngularFirestoreCollection<any>;
  matwaf: Observable<any>;
  matwafDoc: AngularFirestoreDocument<any>;

  roomCollection: AngularFirestoreCollection<any>;
  existRoooms: Observable<any>;
  roomType: Observable<any>;
  roomDoc: AngularFirestoreDocument<any>;

  packageCollection: AngularFirestoreCollection<any>;

  program: Observable<any>;

  package: Observable<Package[]>;
  packageDocs: AngularFirestoreDocument<Package>;

  constructor(
    private http: HttpClient,
    private afs: AngularFirestore
  ) {
    this.collectAllCollection();
  }

  collectAllCollection() {
    this.baseCollection = this.afs.collection('packageBasic');
    this.matwafCollection = this.afs.collection('matwafData');
    this.roomCollection = this.afs.collection('roomsData');
    this.packageCollection = this.afs.collection('package');
  }

  getAirPorts() {
    this.internalAirport = this.afs.collection('internalairport').valueChanges();
    return this.internalAirport;
  }

  getUmrahSeason() {
    this.umrahSeason = this.afs.collection('omrahSeason').valueChanges();
    return this.umrahSeason;
  }

  getUmrahDirection() {
    this.umrahDirection = this.afs.collection('Umrah Direction').valueChanges();
    return this.umrahDirection;
  }

  getRoomType() {
    this.roomType = this.afs.collection('roomType').valueChanges();
    return this.roomType;
  }

  getbaseData() {
    return this.base = this.afs.collection('packageBasic').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  getMatwaf() {
    return this.matwaf = this.afs.collection('matwafData').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  getRooms() {
    return this.existRoooms = this.afs.collection('roomsData').snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map((a: any) => {
            const data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  getProgram() {
    this.program = this.afs.collection('program').valueChanges();
    return this.program;
  }

  getPackage() {
    this.package = this.afs.collection('package').snapshotChanges().pipe(
      map(change => {
        return change.map((a: any) => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    return this.package;
  }

  createPackage(payload) {
    this.baseCollection.add(payload).then(res => {
      if (res) {
        sessionStorage.setItem('packageBasicID', JSON.stringify(res.id));
      }
    });
    return of(true).pipe(
      tap(packag => sessionStorage.setItem('base', JSON.stringify(payload)))
    );
  }

  createGroup(payload) {
    this.matwafCollection.add(payload).then(res => {
      if (res) {
        sessionStorage.setItem('groupID', JSON.stringify(res.id));
      }
    });
    return of(true)
      .pipe(
        tap(group => sessionStorage.setItem('group', JSON.stringify(payload)))
      );
  }

  createRooms(rooms) {
    this.roomCollection.add(rooms).then(res => {
      if (res) {
        console.log(res.id);
        sessionStorage.setItem('roomID', JSON.stringify(res.id));
      }
    });
    return of(true)
      .pipe(tap(room => sessionStorage.setItem('room', JSON.stringify(rooms))));
  }

  addPackages(payload) {
    this.packageCollection.add(payload);
    return of(true).pipe(
      tap(packag => sessionStorage.setItem('package', JSON.stringify(payload)))
    );
  }

  updatePackage(item: Package) {
    this.packageDocs = this.afs.doc(`package/${item.id}`);
    this.packageDocs.update(item);
  }

  deletePackage(item: Package) {
    this.packageDocs = this.afs.doc(`package/${item.id}`);
    this.packageDocs.delete();
  }

  updatePackageBasic(item) {
    this.baseDoc = this.afs.doc(`packageBasic/${item.id}`);
    this.baseDoc.update(item);
  }

  updatePackageMatwaf(item) {
    this.matwafDoc = this.afs.doc(`matwafData/${item.id}`);
    this.matwafDoc.update(item);
  }

  updatePackageRoom(item) {
    this.roomDoc = this.afs.doc(`roomsData/${item[0].id}`);
    this.roomDoc.update(item);
  }

  deletePackageBasic(item) {
    this.baseDoc = this.afs.doc(`packageBasic/${item.id}`);
    this.baseDoc.delete();
  }

  deletePackageMatwaf(item) {
    this.matwafDoc = this.afs.doc(`matwafData/${item.id}`);
    this.matwafDoc.delete();
  }

  deletePackageRoom(item) {
    this.roomDoc = this.afs.doc(`roomsData/${item[0].id}`);
    this.roomDoc.delete();
  }

}
