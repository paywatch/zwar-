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
  licenseDoc: AngularFirestoreDocument<any>;

  DistrictList: Observable<any>;

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

  agencyTourismFile: Observable<any[]>;
  agencyTourismFileCollection: AngularFirestoreCollection<any>;

  agencyFtavFile: Observable<any[]>;
  agencyFtavFileCollection: AngularFirestoreCollection<any>;

  agencyTunisFile: Observable<any[]>;
  agencyTunisFileCollection: AngularFirestoreCollection<any>;

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
      tap(data => sessionStorage.setItem('license', JSON.stringify(payload)))
    );
  }

  saveBranch(payload) {
    this.branchCollection.add(payload).then(res => {
      if (res) {
        sessionStorage.setItem('branchID', JSON.stringify(res.id));
      }
    });
    return of(true).pipe(
      tap(data => sessionStorage.setItem('branch', JSON.stringify(payload)))
    );
  }

  confirm(payload) {
    this.confirmationCollection.add(payload).then(res => {
      console.log(res);
    });
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
    this.branchDoc = this.afs.doc(`branch/${item.id}`);
    this.branchDoc.update(item);
    sessionStorage.removeItem('branch');
    sessionStorage.setItem('branch', JSON.stringify(item));
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

}
