import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { GreaterThan } from '../../../../_helpers/greater-than.validator';
import { LessThanToday } from '../../../../_helpers/lessThanToday.validator';
import { AgencyService } from '../../services/agency/agency.service';


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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private agencyService: AgencyService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.files = {};
    this.initForm();
    this.getSessionData();
    setTimeout(() => {
      this.getAllLicenseData();
    }, 1000);
    this.changeMinTourAuth();
    this.changeFTAVMember();
    this.changeFITTMember();
  }

  getSessionData() {
    this.license = JSON.parse(sessionStorage.getItem('licence'));
    this.main = JSON.parse(sessionStorage.getItem('agencyBasic'));
    this.licenseID = JSON.parse(sessionStorage.getItem('licenseID')) || {};
  }

  initForm() {
    this.myForm = this.fb.group({
      $$isMinTourAuth: [true],
      tAMinTourAuthNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      tAMinTourAuthIssueDate: ['', [Validators.required, LessThanToday]],
      tAMinTourAuthExpiryDate: ['', Validators.required],
      tAMinTourAuthFile: [''],
      $$isFTAVMember: [true],
      tAFTAVMemberIssueDate: ['', [Validators.required, LessThanToday]],
      tAFTAVMemberNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      tAFTAVMemberExpiryDate: ['', Validators.required],
      tAFTAVMemberFile: [''],
      $$isFITTMember: [true],
      tAFITTMemberNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      tAFITTMemberIssueDate: ['', [Validators.required, LessThanToday]],
      tAFITTMemberExpiryDate: ['', Validators.required],
      tAFITTMemberFile: [''],
      taid: [''],
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
      console.log(license);
      if (this.license) {
        this.selectedLicense = license.find(l => l.id == this.licenseID);
        console.log(this.selectedLicense);
        if (this.selectedLicense) {
          this.myForm.patchValue(this.selectedLicense);
        }
      }
    });
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
      tAMinTourAuthFile: '',
      $$isFTAVMember: '',
      tAFTAVMemberIssueDate: '',
      tAFTAVMemberNo: '',
      tAFTAVMemberExpiryDate: '',
      tAFTAVMemberFile: '',
      $$isFITTMember: '',
      tAFITTMemberNo: '',
      tAFITTMemberIssueDate: '',
      tAFITTMemberExpiryDate: '',
      tAFITTMemberFile: ''
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

  // loadFile(fileName) {
  //   const file = JSON.parse(sessionStorage.getItem(fileName));
  //   this.files[fileName] = file && file.originalName ? file.originalName.split(':').pop() : null;

  //   const fileUrl = file && file.newName ? file.newName : '';
  //   this.myForm.get(fileName).setValue(fileUrl);
  // }

  // onPdfChange(input, fileName) {
  //   console.log(fileName);
  //   this.onSelectFile(input, fileName).subscribe(res => {
  //     this.loadFile(fileName);
  //   });
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

  changeMinTourAuth() {
    if (this.$$isMinTourAuth) {
      this.myForm.get('tAMinTourAuthNo').enable();
      this.myForm.get('tAMinTourAuthIssueDate').enable();
      this.myForm.get('tAMinTourAuthExpiryDate').enable();
      this.myForm.get('tAMinTourAuthFile').enable();
    }
    else {
      console.log("clear validators");
      this.myForm.get('tAMinTourAuthNo').disable();
      this.myForm.get('tAMinTourAuthIssueDate').disable();
      this.myForm.get('tAMinTourAuthExpiryDate').disable();
      this.myForm.get('tAMinTourAuthFile').disable();
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
      this.myForm.get('tAFTAVMemberFile').enable();

    }
    else {
      this.myForm.get('tAFTAVMemberNo').disable();
      this.myForm.get('tAFTAVMemberIssueDate').disable();
      this.myForm.get('tAFTAVMemberExpiryDate').disable();
      this.myForm.get('tAFTAVMemberFile').disable();
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
      this.myForm.get('tAFITTMemberFile').enable();

    } else {
      this.myForm.get('tAFITTMemberNo').disable();
      this.myForm.get('tAFITTMemberIssueDate').disable();
      this.myForm.get('tAFITTMemberExpiryDate').disable();
      this.myForm.get('tAFITTMemberFile').disable();
    }
    this.myForm.updateValueAndValidity();
    // this.myForm.get('tAFITTMemberIssueDate').updateValueAndValidity();
    // this.myForm.get('tAFITTMemberExpiryDate').updateValueAndValidity();
    // this.myForm.get('tAFITTMemberFile').updateValueAndValidity();
  }
}
