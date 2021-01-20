import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AgencyService } from '../../services/agency/agency.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit, OnDestroy {

  addCityForm: FormGroup;
  sub: Subscription;
  cities: any;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private agencyService: AgencyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllCities();
  }

  initForm() {
    this.addCityForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getAllCities() {
    this.sub = this.agencyService.getDistrictList().subscribe(res => {
      this.cities = res;
    });
  }

  addCities() {
    const payload = this.addCityForm.value;
    this.agencyService.addCity(payload);
    this.toast.success('تمت الاضافه');
    this.addCityForm.reset();
  }

  deleteItem(item) {
    this.agencyService.deleteCity(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}