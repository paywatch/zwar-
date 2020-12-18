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
  registerDoc: AngularFirestoreDocument<any>;

  agencyCollection: AngularFirestoreCollection<any>;
  agency: Observable<any>;
  agencyDoc: AngularFirestoreDocument<any>;

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

  getAgencyType() {
    this.agencyType = this.afs.collection('agencyType').valueChanges();
    return this.agencyType;
  }

  getDistrictList() {
    this.DistrictList = this.afs.collection('districtList').valueChanges();
    return this.DistrictList;
  }

  getBasicData() {
    return this.register = this.afs.collection('register').snapshotChanges()
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

  getLicense() {
    return this.license = this.afs.collection('license').snapshotChanges()
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

  getBranch() {
    return this.branch = this.afs.collection('branch').snapshotChanges()
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

  getALlAgency() {
    return this.agency = this.afs.collection('agency').snapshotChanges()
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
    this.agencyCollection.add(payload).then(res => {
      if (res) {
        sessionStorage.setItem('agecyID', JSON.stringify(res.id));
      }
    });
    return of(true).pipe(
      tap(data => sessionStorage.setItem('register', JSON.stringify(payload)))
    );
  }

  addAgency(payload) {
    this.registerCollection.add(payload).then(res => {
      if (res) {
        sessionStorage.setItem('basicID', JSON.stringify(res.id));
      }
    });
    return of(true).pipe(
      tap(data => sessionStorage.setItem('agencyBasic', JSON.stringify(payload)))
    );
  }

  saveLicence(payload) {
    this.licenseCollection.add(payload).then(res => {
      if (res) {
        sessionStorage.setItem('licenseID', JSON.stringify(res.id));
      }
    });
    return of(true).pipe(
      tap(data => sessionStorage.setItem('licence', JSON.stringify(payload)))
    );
  }

  saveBranch(payload) {
    this.branchCollection.add(payload).then(res => {
    });
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

  updateAgencyData(item) {
    this.registerDoc = this.afs.doc(`agency/${item.id}`);
    this.registerDoc.update(item);
  }

  updateBasicAgency(item) {
    this.agencyDoc = this.afs.doc(`register/${item.id}`);
    this.agencyDoc.update(item);
  }

  updateAgency(agency) {
    this.confirmDoc = this.afs.doc(`confirm/${agency.id}`);
    this.confirmDoc.update(agency);
  }

  deleteAgencyData(item) {
    this.registerDoc = this.afs.doc(`agency/${item.id}`);
    this.registerDoc.delete();
  }

  deleteAgencyBasic(item) {
    this.agencyDoc = this.afs.doc(`register/${item.id}`);
    this.agencyDoc.delete();
  }

  deleteAgency(agency) {
    this.confirmDoc = this.afs.doc(`confirm/${agency.id}`);
    this.confirmDoc.delete();
  }

}
