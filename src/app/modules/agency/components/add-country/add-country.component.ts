import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AgencyService } from '../../services/agency/agency.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit, OnDestroy {

  addCountryForm: FormGroup;
  sub: Subscription;
  countries: any;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private agencyService: AgencyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllCountries();
  }

  initForm() {
    this.addCountryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getAllCountries() {
    this.sub = this.agencyService.getAllCountries().subscribe(res => {
      this.countries = res;
      console.log(res);
    });
  }

  addCountries() {
    const payload = this.addCountryForm.value;
    this.agencyService.addCountry(payload);
    this.toast.success('تمت الاضافه');
  }

  deleteItem(item) {
    this.agencyService.deleteCountry(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
