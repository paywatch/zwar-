import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { GreaterThan } from '../../../../_helpers/greater-than.validator';
import { LessThanToday } from '../../../../_helpers/lessThanToday.validator';
import { AgencyService } from '../../services/agency/agency.service';


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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private agencyService: AgencyService,
    private toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.getAllAgencyData();
    this.getCountries();
    this.getAgencyType();
    setTimeout(() => {
      this.getAgencyBasicData();
    }, 1000);
    this.initForm();
    this.initOwnerForm();
  }

  getAllAgencyData() {
    this.agencyData = JSON.parse(sessionStorage.getItem('agencyBasic'));
    this.basicID = JSON.parse(sessionStorage.getItem('basicID')) || {};
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
      // tslint:disable-next-line:max-line-length
      tACommeRegNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]], // regular express for only numbers
      tACommRegIssueDate: ['', [Validators.required, LessThanToday]],
      tACommRegExpiryDate: ['', Validators.required],
      tADescription: ['', [Validators.required, Validators.maxLength(1000)]],
      tACommRegFile: [''],
      $$commRegFile: [null],
      tALogo: [''],
      $$logoFile: [null],
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
    console.log(this.selectedBasic);
    this.agencyService.updateBasicAgency(this.selectedBasic);
    this.router.navigate(['/agency/license']);
    this.toast.success('تم التعديل');
  }

  deleteAgencyBasic() {
    this.agencyService.deleteAgencyBasic(this.selectedBasic)
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
