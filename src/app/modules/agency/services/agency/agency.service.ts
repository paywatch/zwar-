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
  countriesCollection: AngularFirestoreCollection<any>;
  countriesDoc: AngularFirestoreDocument<any>;

  agencyType: Observable<any>;
  agencyTypeCollection: AngularFirestoreCollection<any>;
  agencyTypeDoc: AngularFirestoreDocument<any>;

  licenseCollection: AngularFirestoreCollection<any>;
  license: Observable<any>;
  licenseDoc: AngularFirestoreDocument<any>;

  DistrictList: Observable<any>;
  districtListCollection: AngularFirestoreCollection<any>;
  districtListDoc: AngularFirestoreDocument<any>;

  branchCollection: AngularFirestoreCollection<any>;
  branch: Observable<any>;
  branchDoc: AngularFirestoreDocument<any>;

  confirmationCollection: AngularFirestoreCollection<any>;
  confirmReister: Observable<any>;
  confirmDoc: AngularFirestoreDocument<any>;

  agencyFiles: Observable<any[]>;
  agencyFilesCollection: AngularFirestoreCollection<any>;
  agencyFileDoc: AngularFirestoreDocument<any>;

  agencyComRegFile: Observable<any[]>;
  agencyComRegFileCollection: AngularFirestoreCollection<any>;
  comRegDoc: AngularFirestoreDocument<any>;

  agencyTourismFile: Observable<any[]>;
  agencyTourismFileCollection: AngularFirestoreCollection<any>;
  tourismDoc: AngularFirestoreDocument<any>;

  agencyFtavFile: Observable<any[]>;
  agencyFtavFileCollection: AngularFirestoreCollection<any>;
  ftavDoc: AngularFirestoreDocument<any>;

  agencyTunisFile: Observable<any[]>;
  agencyTunisFileCollection: AngularFirestoreCollection<any>;
  tunisDoc: AngularFirestoreDocument<any>;

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
    this.countriesCollection = this.afs.collection('countries');
    this.districtListCollection = this.afs.collection('districtList');
    this.agencyTypeCollection = this.afs.collection('agencyType');
    this.agencyFilesCollection = this.afs.collection('agencyFile');
    this.agencyComRegFileCollection = this.afs.collection('comRegFile');
    this.agencyTourismFileCollection = this.afs.collection('tourismFiles');
    this.agencyFtavFileCollection = this.afs.collection('FtavFiles');
    this.agencyTunisFileCollection = this.afs.collection('tunisFiles');
  }

  getAgencyImage() {
    return this.agencyFiles = this.afs.collection('agencyFile').snapshotChanges().pipe(
      map(changes => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getComRegFile() {
    return this.agencyComRegFile = this.afs.collection('comRegFile').snapshotChanges()
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

  getTourismFile() {
    return this.agencyTourismFile = this.afs.collection('tourismFiles').snapshotChanges()
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

  getFtavFile() {
    return this.agencyFtavFile = this.afs.collection('FtavFiles').snapshotChanges()
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

  getTunisFile() {
    return this.agencyTunisFile = this.afs.collection('tunisFiles').snapshotChanges()
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

  getAllCountries() {
    return this.countries = this.afs.collection('countries').snapshotChanges()
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

  getAgencyType() {
    return this.agencyType = this.afs.collection('agencyType').snapshotChanges()
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

  getDistrictList() {
    return this.DistrictList = this.afs.collection('districtList').snapshotChanges()
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
      tap(data => sessionStorage.setItem('license', JSON.stringify(payload)))
    );
  }

  saveBranch(payload) {
    const data = {...payload};
    console.log(payload);
    this.branchCollection.add(data).then(res => {
      if (res) {
        sessionStorage.setItem('branchID', JSON.stringify(res.id));
      }
    });
    return of(true).pipe(
      tap(branch => sessionStorage.setItem('branch', JSON.stringify(payload)))
    );
  }

  confirm(payload) {
    this.confirmationCollection.add(payload).then(res => {
    });
  }

  addCountry(payload) {
    this.countriesCollection.add(payload);
  }

  addCity(payload) {
    this.districtListCollection.add(payload);
  }

  addCategory(payload) {
    this.agencyTypeCollection.add(payload);
  }

  updateAgencyData(item) {
    this.registerDoc = this.afs.doc(`agency/${item.id}`);
    this.registerDoc.update(item);
    sessionStorage.removeItem('agency');
    sessionStorage.setItem('agency', JSON.stringify(item));
  }

  updateBasicAgency(item) {
    this.agencyDoc = this.afs.doc(`register/${item.id}`);
    this.agencyDoc.update(item);
    sessionStorage.removeItem('register');
    sessionStorage.setItem('register', JSON.stringify(item));
  }

  updateLicenseData(item) {
    this.licenseDoc = this.afs.doc(`license/${item.id}`);
    this.licenseDoc.update(item);
    sessionStorage.removeItem('license');
    sessionStorage.setItem('license', JSON.stringify(item));
  }

  updateBranchData(item) {
    const data = {...item};
    const ID = JSON.parse(sessionStorage.getItem('branchID'));
    data.id = ID;
    this.branchDoc = this.afs.doc(`branch/${data.id}`);
    this.branchDoc.update(data);
    sessionStorage.removeItem('branch');
    sessionStorage.setItem('branch', JSON.stringify(item));
  }

  updateAgency(agency) {
    this.confirmDoc = this.afs.doc(`confirm/${agency.id}`);
    this.confirmDoc.update(agency);
  }

  updateCountry(item) {
    this.countriesDoc = this.afs.doc(`countries/${item.id}`);
    this.countriesDoc.update(item);
  }

  updateCity(item) {
    this.districtListDoc = this.afs.doc(`districtList/${item.id}`);
    this.districtListDoc.update(item);
  }

  updateCategories(item) {
    this.agencyTypeDoc = this.afs.doc(`agencyType/${item.id}`);
    this.agencyTypeDoc.update(item);
  }

  deleteAgencyData(item) {
    this.registerDoc = this.afs.doc(`agency/${item.id}`);
    this.registerDoc.delete();
  }

  deleteAgencyBasic(item) {
    this.agencyDoc = this.afs.doc(`register/${item.id}`);
    this.agencyDoc.delete();
  }

  deleteLicenseData(item) {
    this.licenseDoc = this.afs.doc(`license/${item.id}`);
    this.licenseDoc.delete();
  }

  deleteBranchData(item) {
    this.branchDoc = this.afs.doc(`branch/${item.id}`);
    this.branchDoc.delete();
  }

  deleteAgency(agency) {
    this.confirmDoc = this.afs.doc(`confirm/${agency.id}`);
    this.confirmDoc.delete();
  }

  deleteAgencyImage(item) {
    this.agencyFileDoc = this.afs.doc(`agencyFile/${item.id}`);
    this.agencyFileDoc.delete();
  }

  deleteTourismFile(item) {
    this.tourismDoc = this.afs.doc(`tourismFiles/${item.id}`);
    this.tourismDoc.delete();
  }

  deleteFtavFile(item) {
    this.ftavDoc = this.afs.doc(`FtavFiles/${item.id}`);
    this.ftavDoc.delete();
  }

  deleteTunisFile(item) {
    this.tunisDoc = this.afs.doc(`tunisFiles/${item.id}`);
    this.tunisDoc.delete();
  }

  deleteComRegFile(item) {
    this.comRegDoc = this.afs.doc(`comRegFile/${item.id}`);
    this.comRegDoc.delete();
  }

  deleteCountry(item) {
    this.countriesDoc = this.afs.doc(`countries/${item.id}`);
    this.countriesDoc.delete();
  }

  deleteCity(item) {
    this.districtListDoc = this.afs.doc(`districtList/${item.id}`);
    this.districtListDoc.delete();
  }

  deleteAgencyType(item) {
    this.agencyTypeDoc = this.afs.doc(`agencyType/${item.id}`);
    this.agencyTypeDoc.delete();
  }
}
