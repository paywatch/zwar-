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
  internalAirportDoc: AngularFirestoreDocument<any>;

  umrahSeasonCollection: AngularFirestoreCollection<any>;
  umrahSeason: Observable<any>;
  umrahSeasonDoc: AngularFirestoreDocument<any>;

  umrahDirectionCollection: AngularFirestoreCollection<any>;
  umrahDirection: Observable<any>;
  umrahDirectionDoc: AngularFirestoreDocument<any>;

  matwafCollection: AngularFirestoreCollection<any>;
  matwaf: Observable<any>;
  matwafDoc: AngularFirestoreDocument<any>;

  roomCollection: AngularFirestoreCollection<any>;
  existRoooms: Observable<any>;
  roomType: Observable<any>;
  roomDoc: AngularFirestoreDocument<any>;

  roomTypeCollection: AngularFirestoreCollection<any>;
  roomTypeDoc: AngularFirestoreDocument<any>;

  packageCollection: AngularFirestoreCollection<any>;

  program: Observable<any>;

  package: Observable<Package[]>;
  packageDocs: AngularFirestoreDocument<Package>;

  matwafFiles: Observable<any[]>;
  matwafFilesCollection: AngularFirestoreCollection<any>;
  matwafImageDoc: AngularFirestoreDocument<any>;

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
    this.matwafFilesCollection = this.afs.collection('MatwafImage');
    this.internalAirportCollection = this.afs.collection('internalairport');
    this.umrahSeasonCollection = this.afs.collection('omrahSeason');
    this.umrahDirectionCollection = this.afs.collection('Umrah Direction');
    this.roomTypeCollection = this.afs.collection('roomType');
  }

  getMatwafFileFromStorage() {
    return this.matwafFiles = this.afs.collection('MatwafImage').snapshotChanges().pipe(
      map(changes => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getAirPorts() {
    return this.internalAirport = this.afs.collection('internalairport').snapshotChanges()
      .pipe(map(changes => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  getUmrahSeason() {
    return this.umrahSeason = this.afs.collection('omrahSeason').snapshotChanges()
      .pipe(map(changes => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  getUmrahDirection() {
    return this.umrahDirection = this.afs.collection('Umrah Direction').snapshotChanges()
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

  getRoomType() {
    return this.roomType = this.afs.collection('roomType').snapshotChanges()
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

  AddAirPlane(payload) {
    this.internalAirportCollection.add(payload);
  }

  addUmrahSeason(payload) {
    this.umrahSeasonCollection.add(payload);
  }

  addUmrahDirection(payload) {
    this.umrahDirectionCollection.add(payload);
  }

  addRoomType(payload) {
    this.roomTypeCollection.add(payload);
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
    sessionStorage.removeItem('group');
    sessionStorage.setItem('group', JSON.stringify(item));
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

  deleteMatwafImage(item) {
    this.matwafImageDoc = this.afs.doc(`MatwafImage/${item.id}`);
    this.matwafImageDoc.delete();
  }

  deleteAirPlane(item) {
    this.internalAirportDoc = this.afs.doc(`internalairport/${item.id}`);
    this.internalAirportDoc.delete();
  }

  deleteUmrahSeason(item) {
    this.umrahSeasonDoc = this.afs.doc(`omrahSeason/${item.id}`);
    this.umrahSeasonDoc.delete();
  }

  deleteUmrahDirection(item) {
    this.umrahDirectionDoc = this.afs.doc(`Umrah Direction/${item.id}`);
    this.umrahDirectionDoc.delete();
  }

  deleteRoomType(item) {
    this.roomTypeDoc = this.afs.doc(`roomType/${item.id}`);
    this.roomTypeDoc.delete();
  }
}
