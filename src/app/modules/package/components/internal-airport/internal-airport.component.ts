import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-internal-airport',
  templateUrl: './internal-airport.component.html',
  styleUrls: ['./internal-airport.component.css']
})
export class InternalAirportComponent implements OnInit, OnDestroy {

  airPlaneForm: FormGroup;
  sub: Subscription;
  airPorts: any;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private packageService: PackageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    setTimeout(() => {
      this.getAllAirPlane();
    });
  }

  initForm() {
    this.airPlaneForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getAllAirPlane() {
    this.sub = this.packageService.getAirPorts().subscribe(res => {
      this.airPorts = res;
    });
  }

  addAirPlane() {
    const payload = this.airPlaneForm.value;
    this.packageService.AddAirPlane(payload);
    this.toast.success('تمت الاضافه');
    this.airPlaneForm.reset();
  }

  deleteItem(item) {
    this.packageService.deleteAirPlane(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
