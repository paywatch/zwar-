import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';

import { Password } from '../../../../_helpers/password.validator';
import { MustMatch } from '../../../../_helpers/must-match.validator';
import { AgencyService } from '../../services/agency/agency.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;

  message: string;
  countries: any;
  agency: any;
  uniqueEmail: boolean = true;
  uniquePhone: boolean = true;
  uniqueUsername: boolean = true;

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
  }

  initForm() {
    this.RegisterForm = this.fb.group(
      {
        userName: [
          '', [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(/^[A-Za-z0-9]*$/)],
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
        userID: ['' , [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(4)]]
      },
      {
        validator: MustMatch('userPassword', 'repassword'),
      }
    );
  }

  getAlCountries() {
    this.agencyService.getAllCountries().subscribe(country => {
      this.countries = country;
      console.log(this.countries);
    });
  }

  getAgency() {
    this.agencyService.getALlAgency().subscribe(agency => {
      this.agency = agency;
      console.log(this.agency);
    });
  }

  register() {
    const payload = this.RegisterForm.value;
    this.agency.map(a => {
      if (a.userName == payload.userName) {
        this.uniqueUsername = false;
      }
      if (a.tAAdminEmail == payload.tAAdminEmail) {
        this.uniqueEmail = false;
      }
      if (a.tAAdminMobileNo == payload.tAAdminMobileNo) {
        this.uniquePhone = false;
      }
    });
    if (!this.uniqueUsername || !this.uniquePhone || !this.uniqueEmail) {
      return;
    }
    else {
      this.agencyService.registerAgency(payload).subscribe(res => {
        if (res) {
          this.router.navigate(['/agency/main']);
          this.toast.success('تمت الاضافه');
        }
        else{
          this.toast.error('SomeThing Went Wrong');
        }
      });
    }
  }
}
