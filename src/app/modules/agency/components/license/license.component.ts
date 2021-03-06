import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { GreaterThan } from '../../../../_helpers/greater-than.validator';
import { LessThanToday } from '../../../../_helpers/lessThanToday.validator';
import { AgencyService } from '../../services/agency/agency.service';

// IMPORT MOMENT FOR FORMAT DATE IN NICE WAY;
import * as moment from 'moment';
import { combineLatest, Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, tap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {

  myForm: FormGroup;
  main: any;
  files: any;
  licenseID: any;
  license: any;
  selectedLicense: any;
  tourismUploads: any[];
  allPercentage: Observable<unknown>;
  tourismFiles: any;
  selectedTourismFile: any[];
  FtavmUploads: any[];
  FtavFiles: any;
  selectedFtavFile: any[];
  tunisUploads: any[];
  selectedTunisFile: any[];
  tunisFilesID: any;
  modalRef: BsModalRef;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private agencyService: AgencyService,
    private toast: ToastrService,
    private afs: AngularFirestore,
    private modalService: BsModalService,
    private db: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.files = {};
    this.initForm();
    this.getSessionData();
    setTimeout(() => {
      this.getAllLicenseData();
      this.getTourismFile();
      this.getFtavFile();
      this.getTunisFile();
    }, 1000);
    this.changeMinTourAuth();
    this.changeFTAVMember();
    this.changeFITTMember();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getSessionData() {
    this.license = JSON.parse(sessionStorage.getItem('license'));
    this.main = JSON.parse(sessionStorage.getItem('agencyBasic'));
    this.licenseID = JSON.parse(sessionStorage.getItem('licenseID')) || {};
    this.tourismFiles = JSON.parse(sessionStorage.getItem('tourismFiles')) || {};
    this.FtavFiles = JSON.parse(sessionStorage.getItem('FtavFiles')) || {};
    this.tunisFilesID = JSON.parse(sessionStorage.getItem('tunisFilesID')) || {};
  }

  initForm() {
    this.myForm = this.fb.group({
      $$isMinTourAuth: [true],
      tAMinTourAuthNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      tAMinTourAuthIssueDate: ['', [Validators.required, LessThanToday]],
      tAMinTourAuthExpiryDate: ['', Validators.required],
      $$isFTAVMember: [true],
      tAFTAVMemberNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      tAFTAVMemberIssueDate: ['', [Validators.required, LessThanToday]],
      tAFTAVMemberExpiryDate: ['', Validators.required],
      $$isFITTMember: [true],
      tAFITTMemberNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      tAFITTMemberIssueDate: ['', [Validators.required, LessThanToday]],
      tAFITTMemberExpiryDate: ['', Validators.required],
    }, {
      validators: [GreaterThan('tAMinTourAuthIssueDate', 'tAMinTourAuthExpiryDate'),
      GreaterThan('tAFTAVMemberIssueDate', 'tAFTAVMemberExpiryDate'),
      GreaterThan('tAFITTMemberIssueDate', 'tAFITTMemberExpiryDate')
      ]
    }
    );
  }

  getAllLicenseData() {
    this.agencyService.getLicense().subscribe(license => {
      if (this.license) {
        this.selectedLicense = license.find(l => l.id == this.licenseID);
        if (this.selectedLicense) {
          this.myForm.patchValue(this.selectedLicense);
        }
      }
    });
  }

  getTourismFile() {
    this.agencyService.getTourismFile().subscribe(files => {
      const find = files.find(file => file.id == this.tourismFiles);
      this.selectedTourismFile = find;
    });
  }

  deleteTourismFile(item) {
    const path = `tourismFiles/${item.name}`;
    const ref = this.db.ref(path);
    ref.delete();
    this.agencyService.deleteTourismFile(item);
  }

  onPdfChange(event) {

    this.tourismUploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `tourismFiles/${file.name}`;
      const ref = this.db.ref(path);
      const task = this.db.upload(path, file);
      // tslint:disable-next-line:variable-name
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);

      // create composed objects with different information. ADAPT THIS ACCORDING to YOUR NEED
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      };

      // push each upload into the array
      this.tourismUploads.push(uploadTrack);

      // for every upload do whatever you want in firestore with the uploaded file
      const t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          return this.afs.collection('tourismFiles').add({
            name: f.metadata.name,
            // tslint:disable-next-line:object-literal-shorthand
            url: url
          }).then(res => {
            sessionStorage.setItem('tourismFiles', JSON.stringify(res.id));
          });
        });
      });

      this.allPercentage = combineLatest(allPercentage)
        .pipe(
          map((percentages) => {
            let result = 0;
            for (const percentage of percentages) {
              result = result + percentage;
            }
            return result / percentages.length;
          }),
          tap(console.log)
        );
    }
  }

  getFtavFile() {
    this.agencyService.getFtavFile().subscribe(files => {
      const find = files.find(file => file.id == this.FtavFiles);
      this.selectedFtavFile = find;
    });
  }

  deleteFtavFile(item) {
    const path = `FtavFiles/${item.name}`;
    const ref = this.db.ref(path);
    ref.delete();
    this.agencyService.deleteFtavFile(item);
  }

  onFtavChange(event) {

    this.FtavmUploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `FtavFiles/${file.name}`;
      const ref = this.db.ref(path);
      const task = this.db.upload(path, file);
      // tslint:disable-next-line:variable-name
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);

      // create composed objects with different information. ADAPT THIS ACCORDING to YOUR NEED
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      };

      // push each upload into the array
      this.FtavmUploads.push(uploadTrack);

      // for every upload do whatever you want in firestore with the uploaded file
      const t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          return this.afs.collection('FtavFiles').add({
            name: f.metadata.name,
            // tslint:disable-next-line:object-literal-shorthand
            url: url
          }).then(res => {
            sessionStorage.setItem('FtavFiles', JSON.stringify(res.id));
          });
        });
      });

      this.allPercentage = combineLatest(allPercentage)
        .pipe(
          map((percentages) => {
            let result = 0;
            for (const percentage of percentages) {
              result = result + percentage;
            }
            return result / percentages.length;
          }),
          tap(console.log)
        );
    }
  }

  getTunisFile() {
    this.agencyService.getTunisFile().subscribe(files => {
      const find = files.find(file => file.id == this.tunisFilesID);
      this.selectedTunisFile = find;
    });
  }

  deleteTunisFile(item) {
    const path = `tunisFiles/${item.name}`;
    const ref = this.db.ref(path);
    ref.delete();
    this.agencyService.deleteTunisFile(item);
    this.selectedTunisFile = this.selectedTunisFile.filter(file => file.id !== item.id);
  }

  AddtunisFiles(event: any) {

    this.tunisUploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `tunisFiles/${file.name}`;
      const ref = this.db.ref(path);
      const task = this.db.upload(path, file);
      // tslint:disable-next-line:variable-name
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);

      // create composed objects with different information. ADAPT THIS ACCORDING to YOUR NEED
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      };

      // push each upload into the array
      this.tunisUploads.push(uploadTrack);

      // for every upload do whatever you want in firestore with the uploaded file
      const t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          return this.afs.collection('tunisFiles').add({
            name: f.metadata.name,
            // tslint:disable-next-line:object-literal-shorthand
            url: url
          }).then(res => {
            sessionStorage.setItem('tunisFilesID', JSON.stringify(res.id));
          });
        });
      });

      this.allPercentage = combineLatest(allPercentage)
        .pipe(
          map((percentages) => {
            let result = 0;
            for (const percentage of percentages) {
              result = result + percentage;
            }
            return result / percentages.length;
          }),
          tap(console.log)
        );
    }
  }

  get $$isMinTourAuth() {
    return this.myForm.get('$$isMinTourAuth').value;
  }

  get $$isFTAVMember() {
    return this.myForm.get('$$isFTAVMember').value;
  }

  get $$isFITTMember() {
    return this.myForm.get('$$isFITTMember').value;
  }

  SaveData() {

    const emptyForm = {
      tAMinTourAuthNo: '',
      tAMinTourAuthIssueDate: '',
      tAMinTourAuthExpiryDate: '',
      $$isFTAVMember: '',
      tAFTAVMemberIssueDate: '',
      tAFTAVMemberNo: '',
      tAFTAVMemberExpiryDate: '',
      $$isFITTMember: '',
      tAFITTMemberNo: '',
      tAFITTMemberIssueDate: '',
      tAFITTMemberExpiryDate: '',
    };

    const payload = { ...emptyForm, ...this.myForm.value };
    this.agencyService.saveLicence(payload)
      .subscribe((response: any) => {
        if (response) {
          this.toast.success('تم الحفظ بنجاح');
          this.router.navigate(['agency/branches']);
        }
      }, (err) => {
        this.toast.error('لقد حدث خطأ ما');
      });
  }

  updateLicenseData() {
    this.selectedLicense = this.myForm.value;
    this.selectedLicense.id = this.licenseID;
    if (this.selectedTourismFile) {
      this.selectedLicense.selectedTourismFile = this.selectedTourismFile;
    }

    if (this.selectedFtavFile) {
      this.selectedLicense.selectedFtavFile = this.selectedFtavFile;
    }

    if (this.selectedTunisFile) {
      this.selectedLicense.selectedTunisFile = this.selectedTunisFile;
    }

    this.agencyService.updateLicenseData(this.selectedLicense);
    this.router.navigate(['/agency/branches']);
    this.toast.success('تم التعديل');
  }

  deleteLicenseData() {
    this.agencyService.deleteLicenseData(this.selectedLicense);
    this.router.navigate(['/agency/main']);
    this.toast.success('تم الحذف');
  }

  changeMinTourAuth() {
    if (this.$$isMinTourAuth) {
      this.myForm.get('tAMinTourAuthNo').enable();
      this.myForm.get('tAMinTourAuthIssueDate').enable();
      this.myForm.get('tAMinTourAuthExpiryDate').enable();
    }
    else {
      this.myForm.get('tAMinTourAuthNo').disable();
      this.myForm.get('tAMinTourAuthIssueDate').disable();
      this.myForm.get('tAMinTourAuthExpiryDate').disable();
    }

    this.myForm.updateValueAndValidity();
    // this.myForm.get('tAMinTourAuthIssueDate').updateValueAndValidity();
    // this.myForm.get('tAMinTourAuthExpiryDate').updateValueAndValidity();
    // this.myForm.get('tAMinTourAuthFile').updateValueAndValidity();
  }

  changeFTAVMember() {
    if (this.$$isFTAVMember) {
      this.myForm.get('tAFTAVMemberNo').enable();
      this.myForm.get('tAFTAVMemberIssueDate').enable();
      this.myForm.get('tAFTAVMemberExpiryDate').enable();

    }
    else {
      this.myForm.get('tAFTAVMemberNo').disable();
      this.myForm.get('tAFTAVMemberIssueDate').disable();
      this.myForm.get('tAFTAVMemberExpiryDate').disable();
    }
    this.myForm.updateValueAndValidity();
    // this.myForm.get('tAFTAVMemberIssueDate').updateValueAndValidity();
    // this.myForm.get('tAFTAVMemberExpiryDate').updateValueAndValidity();
    // this.myForm.get('tAFTAVMemberFile').updateValueAndValidity();

  }

  changeFITTMember() {
    if (this.$$isFITTMember) {
      this.myForm.get('tAFITTMemberNo').enable();
      this.myForm.get('tAFITTMemberIssueDate').enable();
      this.myForm.get('tAFITTMemberExpiryDate').enable();

    } else {
      this.myForm.get('tAFITTMemberNo').disable();
      this.myForm.get('tAFITTMemberIssueDate').disable();
      this.myForm.get('tAFITTMemberExpiryDate').disable();
    }
    this.myForm.updateValueAndValidity();
    // this.myForm.get('tAFITTMemberIssueDate').updateValueAndValidity();
    // this.myForm.get('tAFITTMemberExpiryDate').updateValueAndValidity();
    // this.myForm.get('tAFITTMemberFile').updateValueAndValidity();
  }
}
