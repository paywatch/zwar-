import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  registerCollection: AngularFirestoreCollection<any>;
  register: Observable<any>;

  agencyCollection: AngularFirestoreCollection<any>;
  agency: Observable<any>;

  countries: Observable<any>;
  agencyType: Observable<any>;

  licenseCollection: AngularFirestoreCollection<any>;
  license: Observable<any>;

  DistrictList: Observable<any>;

  branchCollection: AngularFirestoreCollection<any>;
  branch: Observable<any>;

  confirmationCollection: AngularFirestoreCollection<any>;
  confirmReister: Observable<any>;
  confirmDoc: AngularFirestoreDocument<any>;


  constructor(
    private http: HttpClient,
    private afs: AngularFirestore) {
    this.collectColletion();
  }

  collectColletion() {
    this.agencyCollection = this.afs.collection('agency');
    this.registerCollection = this.afs.collection('register');
    this.licenseCollection = this.afs.collection('license');
    this.branchCollection = this.afs.collection('branch');
    this.confirmationCollection = this.afs.collection('confirm');
  }

  getAllCountries() {
    this.countries = this.afs.collection('countries').valueChanges();
    return this.countries;
  }

  getALlAgency() {
    this.agency = this.afs.collection('agency').valueChanges();
    return this.agency;
  }

  getBasicData() {
    this.register = this.afs.collection('register').valueChanges();
    return this.register;
  }

  getLicense() {
    this.license = this.afs.collection('license').valueChanges();
    return this.license;
  }

  getAgencyType() {
    this.agencyType = this.afs.collection('agencyType').valueChanges();
    return this.agencyType;
  }

  getDistrictList() {
    this.DistrictList = this.afs.collection('districtList').valueChanges();
    return this.DistrictList;
  }

  getBranch() {
    this.branch = this.afs.collection('branch').valueChanges();
    return this.branch;
  }

  getAllData() {
    return this.confirmReister = this.afs.collection('confirm').snapshotChanges().pipe(
      map(changes => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  registerAgency(payload) {
    this.agencyCollection.add(payload);
    return of(true).pipe(
      tap(data => sessionStorage.setItem('register', JSON.stringify(payload)))
    );
  }

  addAgency(payload) {
    this.registerCollection.add(payload);
    return of(true).pipe(
      tap(data => sessionStorage.setItem('agencyBasic', JSON.stringify(payload)))
    );
  }

  saveLicence(payload) {
    this.licenseCollection.add(payload);
    return of(true).pipe(
      tap(data => sessionStorage.setItem('licence', JSON.stringify(payload)))
    );
  }

  saveBranch(payload) {
    this.branchCollection.add(payload);
    return of(true).pipe(
      tap(data => sessionStorage.setItem('branches', JSON.stringify(payload)))
    );
  }

  confirm(payload) {
    this.confirmationCollection.add(payload);
    return of(true).pipe(
      tap(data => sessionStorage.setItem('confirm', JSON.stringify(payload)))
    );
  }

  deleteAgency(agency) {
    this.confirmDoc = this.afs.doc(`confirm/${agency.id}`);
    this.confirmDoc.delete();
  }

  updateAgency(agency) {
    this.confirmDoc = this.afs.doc(`confirm/${agency.id}`);
    this.confirmDoc.update(agency);
  }
}
