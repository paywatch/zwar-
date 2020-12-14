import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { UtilsService } from '../../core/services/utils/utils.service';
import { Program } from '../models/program';
import { resolve } from 'dns';


@Injectable()
export class ProgramService {

  basicsCollection: AngularFirestoreCollection<any>;
  basics: Observable<any>;

  hotelCollection: AngularFirestoreCollection<any>;
  hotels: Observable<any>;

  transportationCollection: AngularFirestoreCollection<any>;
  transportation: Observable<any>;

  visitsCollection: AngularFirestoreCollection<any>;
  visits: Observable<any>;

  ProgramCollection: AngularFirestoreCollection<Program>;
  program: Observable<Program[]>;
  programDoc: AngularFirestoreDocument<Program>;

  publishCollection: AngularFirestoreCollection<any>;
  publish: Observable<any>;

  programCategory: Observable<any>;

  starsCollection: AngularFirestoreCollection<any>;

  hotelstarts: Observable<any>;
  airPlaneCollection: AngularFirestoreCollection<any>;
  airPlaneCompany: Observable<any>;

  transportationWayCollection: AngularFirestoreCollection<any>;
  transportationWay: Observable<any>;

  programBasics: Observable<any>;
  basicDoc: AngularFirestoreDocument<any>;

  constructor(
    private http: HttpClient,
    public afs: AngularFirestore,
    private utilsService: UtilsService) {
    this.collectAllCollections();
    this.getProgram();
  }

  collectAllCollections() {
    this.basicsCollection = this.afs.collection('basics');
    this.hotelCollection = this.afs.collection('hotels');
    this.transportationCollection = this.afs.collection('transportation');
    this.visitsCollection = this.afs.collection('visits');
    this.ProgramCollection = this.afs.collection('program');
    this.publishCollection = this.afs.collection('publish');
  }

  getAllCategory() {
    this.programCategory = this.afs.collection('programCategory').valueChanges();
    return this.programCategory;
  }

  getAllStars() {
    this.hotelstarts = this.afs.collection('hotel starts').valueChanges();
    return this.hotelstarts;
  }

  getAllAirplaneCompany() {
    this.airPlaneCompany = this.afs.collection('airplaneCompany').valueChanges();
    return this.airPlaneCompany;
  }

  getAllTransportation() {
    this.transportationWay = this.afs.collection('transportationWay').valueChanges();
    return this.transportationWay;
  }

  getProgramBasics() {
    return this.programBasics = this.afs.collection('basics').snapshotChanges().pipe(
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
    return this.program = this.afs.collection('program').snapshotChanges().pipe(
      map(changes => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data() as Program;
          data.programId = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  createProgram(payload) {
    this.basicsCollection.add(payload);
    return of(true)
      .pipe(
        tap(program => sessionStorage.setItem('basics', JSON.stringify(payload)))
      );
  }

  createResidential(payload) {
    this.hotelCollection.add(payload);
    return of(true).pipe(
      tap((programsHotels) => sessionStorage.setItem('hotels', JSON.stringify(payload)))
    );
  }

  createTransportation(payload) {
    this.transportationCollection.add(payload);
    return of(true).pipe(
      tap(res => sessionStorage.setItem('residence', JSON.stringify(payload)))
    );
  }

  createVisit(payload) {
    this.visitsCollection.add(payload);
    return of(true)
      .pipe(
        tap(data => sessionStorage.setItem('visit', JSON.stringify(payload)))
      );
  }

  AddProgram(payload) {
    this.ProgramCollection.add(payload);
    return of(true).pipe(
      tap(res => sessionStorage.setItem('program', JSON.stringify(payload)))
    );
  }

  createprogram(publish) {
    this.publishCollection.add(publish);
    return of(true)
      .pipe(
        tap(program => sessionStorage.setItem('publish', JSON.stringify(publish)))
      );
  }

  deleteProgram(program: Program) {
    this.programDoc = this.afs.doc(`program/${program.programId}`);
    this.programDoc.delete();
  }

  updateBasicData(basic) {
    this.basicDoc = this.afs.doc(`basics/${basic.id}`);
    this.basicDoc.update(basic).then(res => {
      console.log(res);
    });
  }

  deleteBasic(basicData) {
    this.basicDoc = this.afs.doc(`basics/${basicData.id}`);
    this.basicDoc.delete();
  }

  updateProgram(item: Program) {
    this.programDoc = this.afs.doc(`program/${item.programId}`);
    this.programDoc.update(item);
  }
}

