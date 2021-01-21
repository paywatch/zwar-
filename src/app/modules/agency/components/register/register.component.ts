import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Password } from '../../../../_helpers/password.validator';
import { MustMatch } from '../../../../_helpers/must-match.validator';
import { AgencyService } from '../../services/agency/agency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  RegisterForm: FormGroup;
  message: string;
  countries: any;
  agency: any;
  agencyID: string;
  selectedAgency: any;
  registerData: any;
  sub: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private agencyService: AgencyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAlCountries();
    this.getAgency();
    this.getSessioStorageData();
    setTimeout(() => {
      this.getAgency();
    }, 1000);
  }

  initForm() {
    this.RegisterForm = this.fb.group(
      {
        userName: [
          '', [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(/^[\u0621-\u064A0-9a-zA-Z ]+$/)]
        ],
        tAAdminMobileNo: [
          '', [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(/^[+]?[0-9]*$/)],
        ],
        tAAdminEmail: [
          '', [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/)]
        ],
        countryId: ['', Validators.required],
        userPassword: [
          '', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
            Password,
          ],
        ],
        repassword: [
          '', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
          ],
        ],
      },
      {
        validator: MustMatch('userPassword', 'repassword'),
      }
    );
  }

  getSessioStorageData() {
    this.registerData = JSON.parse(sessionStorage.getItem('register')) || {};
    this.agencyID = JSON.parse(sessionStorage.getItem('agecyID')) || {};
  }

  getAlCountries() {
    this.sub = this.agencyService.getAllCountries().subscribe(country => {
      this.countries = country;
    });
  }

  getAgency() {
    this.agencyService.getALlAgency().subscribe(agency => {
      if (this.registerData) {
        this.agency = agency;
        this.selectedAgency = agency.find(a => a.id == this.agencyID);
        if (this.selectedAgency) {
          this.RegisterForm.patchValue(this.selectedAgency);
        }
      }
    });
  }

  register() {
    const payload = this.RegisterForm.value;
    const result = this.agency.find(a => a.userName === payload.userName);
    if (!result) {
      this.agencyService.registerAgency(payload).subscribe(res => {
        if (res) {
          this.router.navigate(['/agency/main']);
          this.toast.success('تمت الاضافه');
        }
        else {
          this.toast.error('SomeThing Went Wrong');
        }
      });
    }
    else {
      this.toast.error('error');
    }
  }

  updateAgency() {
    this.selectedAgency = this.RegisterForm.value;
    this.selectedAgency.id = this.agencyID;
    this.agencyService.updateAgencyData(this.selectedAgency);
    this.router.navigate(['/agency/main']);
    this.toast.success('تم التعديل');
  }

  deleteAgency() {
    this.agencyService.deleteAgencyData(this.selectedAgency);
    this.toast.info('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
