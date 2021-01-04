import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


import { GreaterThan } from '../../../../_helpers/greater-than.validator';
import { LessThanToday } from '../../../../_helpers/lessThanToday.validator';
import { AgencyService } from '../../services/agency/agency.service';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

// IMPORT MOMENT FOR FORMAT DATE IN NICE WAY;
import * as moment from 'moment';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  myForm: FormGroup;
  ownerForm: FormGroup;
  displayDialog = false;
  ownerList: any[] = [];
  agencyData: any;
  displayFoto: any[];
  logoUrl: string;
  comFile: string;
  editIndex: number;
  countries: any;
  agencyType: any;
  basicID: any;
  selectedBasic: any;
  uploads: any[];
  allPercentage: Observable<unknown>;
  mainFile: any;
  selectedMainFile: any;
  modalRef: BsModalRef;
  comRegFile: any;
  selectedComRegFile: any;
  comRegUploads: any[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private agencyService: AgencyService,
    private toast: ToastrService,
    private db: AngularFireStorage,
    private afs: AngularFirestore,
    private modalService: BsModalService

  ) {

  }

  ngOnInit(): void {
    this.getAllAgencyData();
    this.getCountries();
    this.getAgencyType();
    this.initForm();
    setTimeout(() => {
      this.getAgencyBasicData();
      this.getAgencyFile();
      this.getComRegFile();
    }, 1000);
    this.initOwnerForm();
  }

  getAllAgencyData() {
    this.agencyData = JSON.parse(sessionStorage.getItem('agencyBasic'));
    this.basicID = JSON.parse(sessionStorage.getItem('basicID')) || {};
    this.comRegFile = JSON.parse(sessionStorage.getItem('comRegFile')) || {};
    this.mainFile = JSON.parse(sessionStorage.getItem('agencyFile')) || {};
  }

  getCountries() {
    this.agencyService.getAllCountries().subscribe(res => {
      this.countries = res;
      console.log(this.countries);
    });
  }

  getAgencyType() {
    this.agencyService.getAgencyType().subscribe(type => {
      this.agencyType = type;
    });
  }

  initForm() {
    this.myForm = this.fb.group({
      tAName: ['', [Validators.required, Validators.maxLength(100)]],
      countryId: ['', Validators.required],
      tAType: ['', Validators.required],
      tAWebsite: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)]],
      tACommeRegNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]], // regular express for only numbers
      tACommRegIssueDate: ['', [Validators.required, LessThanToday]],
      tACommRegExpiryDate: ['', Validators.required],
      tADescription: ['', [Validators.required, Validators.maxLength(1000)]],
      tACommRegFile: [''],
      number: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(/^[0-9]*$/)]]
    }, {
      validators: GreaterThan('tACommRegIssueDate', 'tACommRegExpiryDate')
    });
  }

  initOwnerForm() {
    this.ownerForm = this.fb.group({
      tAOwnerFullName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]],
      tAOwnerNationalID: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      tAOwnerPhoneNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]]
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getAgencyFile() {
    this.agencyService.getAgencyImage().subscribe(files => {
      this.mainFile = this.mainFile.map(m => files.find(file => file.id == m));
      this.selectedMainFile = this.mainFile;
      console.log(this.selectedMainFile);
    });
  }

  logoChange(event) {

    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `agencyFile/${file.name}`;
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
      this.uploads.push(uploadTrack);
      console.log(this.uploads);

      // for every upload do whatever you want in firestore with the uploaded file
      const t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          return this.afs.collection('agencyFile').add({
            name: f.metadata.name,
            // tslint:disable-next-line:object-literal-shorthand
            url: url
          }).then(res => {
            let files = JSON.parse(sessionStorage.getItem('agencyFile'));
            files = files ? files : [];
            files.push(res.id);
            sessionStorage.setItem('agencyFile', JSON.stringify(files));
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

  getComRegFile() {
    this.agencyService.getComRegFile().subscribe(images => {
    const find = images.find(image => image.id == this.comRegFile);
    this.selectedComRegFile = find;
    console.log(this.selectedComRegFile);
  });
}

comRegFileChange(event) {
  this.comRegUploads = [];
  const filelist = event.target.files;
  const allPercentage: Observable<number>[] = [];

  for (const file of filelist) {

    const path = `comRegFile/${file.name}`;
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
    this.comRegUploads.push(uploadTrack);
    console.log(this.uploads);

    // for every upload do whatever you want in firestore with the uploaded file
    const t = task.then((f) => {
      return f.ref.getDownloadURL().then((url) => {
        return this.afs.collection('comRegFile').add({
          name: f.metadata.name,
          // tslint:disable-next-line:object-literal-shorthand
          url: url
        }).then(res => {
          sessionStorage.setItem('comRegFile', JSON.stringify(res.id));
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

// callLogo() {
//   const logoFile = JSON.parse(sessionStorage.getItem('tALogo'));
//   const fileName = logoFile ? logoFile.newName : null;
//   this.logoUrl = fileName ? `${environment.endpoint}/api/ph1/download/${fileName}` : '';

//   if (fileName) {
//     this.myForm.get('tALogo').setValue(fileName);
//   }
// }

getAgencyBasicData() {
  this.agencyService.getBasicData().subscribe(basics => {
    if (this.agencyData) {
      this.selectedBasic = basics.find(b => b.id == this.basicID);
      console.log(this.selectedBasic);
      if (this.selectedBasic) {
        this.myForm.patchValue(this.selectedBasic);
        this.ownerList = this.selectedBasic && this.selectedBasic.ownerList ? this.selectedBasic.ownerList : [];
      }
    }
  });
}

SaveData() {
  if (!this.ownerList.length) {
    this.toast.error('لابد من إدخال بيانات ملاك وكالة السفر');
    return;
  }

  const payload = this.myForm.value;
  payload.ownerList = this.ownerList;
  payload.tACommRegIssueDate = moment(payload.tACommRegIssueDate).format('MM/DD/YYYY');
  payload.tACommRegExpiryDate = moment(payload.tACommRegExpiryDate).format('MM/DD/YYYY');
  this.agencyService.addAgency(payload)
    .subscribe((response: any) => {
      if (response) {
        this.toast.success('تم الحفظ بنجاح');
        this.router.navigate(['agency/license']);
        this.myForm.reset();
      }
    });
}

updateAgencyBasic() {
  this.selectedBasic = this.myForm.value;
  this.selectedBasic.id = this.basicID;
  // tslint:disable-next-line:no-non-null-assertion
  if (this.selectedMainFile) {
    console.log(this.selectedMainFile);
    this.selectedBasic.selectedMainFile = this.selectedMainFile;
  }
  // tslint:disable-next-line:no-non-null-assertion
  if (this.selectedComRegFile) {
    console.log(this.selectedComRegFile);
    this.selectedBasic.selectedComRegFile = this.selectedComRegFile;
  }
  console.log(this.selectedBasic);
  this.agencyService.updateBasicAgency(this.selectedBasic);
  this.router.navigate(['/agency/license']);
  this.toast.success('تم التعديل');
}

deleteAgencyBasic() {
  this.agencyService.deleteAgencyBasic(this.selectedBasic);
}

// logoChange(input: any, fileName) {
//   if (!this.myForm.get('$$logoFile').hasError('maxSize')) {
//     this.onSelectFile(input, fileName).subscribe(() => this.callLogo());
//   }
// }

// getComFile() {
//   const comFile = JSON.parse(sessionStorage.getItem('tACommRegFile'));
//   this.comFile = comFile && comFile.originalName ? comFile.originalName.split(':').pop() : null;
//   if (comFile && comFile.newName) {
//     this.myForm.get('tACommRegFile').setValue(comFile.newName);
//   }
// }

// commRegFileChange(input: any, fileName) {
//   if (!this.myForm.get('$$commRegFile').hasError('maxSize')) {
//     this.onSelectFile(input, fileName).subscribe(() => this.getComFile());
//   }
// }

// onSelectFile(input: any, fileName) {
//   return this.utilsService.uploadFile(input, fileName)
//     .pipe(
//       tap((res) => {
//         if (res) {
//           this.myForm.get(fileName).setValue(res.newName);
//         }
//       })
//     );
// }

showDialog() {
  this.displayDialog = true;
}

saveOwner() {
  console.log(this.editIndex + 1);
  if (this.editIndex + 1) {
    this._editOwner();
  }
  else {
    this._saveOwner();
  }
}

_saveOwner() {
  const payload = this.ownerForm.value;
  if (this.ownerForm.valid) {
    payload.$$ID = this.ownerList.length + 1;
    this.ownerList.push(payload);
  }
  this.onClose();
}

_editOwner() {
  console.log('Edit existing owner');
  const payload = this.ownerForm.value;
  if (this.ownerForm.valid) {
    this.ownerList[this.editIndex] = payload;
    this.editIndex = -1;
    this.ownerList = [...this.ownerList];
  }
  this.onClose();
}

onClose() {
  this.ownerForm.reset();
  this.displayDialog = false;
}

onRowDelete(ownerId) {
  this.ownerList = this.ownerList.filter((owner: any) => {
    return owner.tAOwnerNationalID !== ownerId;
  });
}

onRowEdit(index) {
  const owner = this.ownerList[index];
  this.ownerForm.patchValue(owner);
  this.showDialog();
  this.editIndex = index;
}
}
