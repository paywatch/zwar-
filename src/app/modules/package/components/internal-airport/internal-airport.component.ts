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
  editState: boolean;
  itemToEdit: any;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private packageService: PackageService
  ) { }

  ngOnInit(): void {
    this.editState = false;
    this.initForm();
    this.getAllAirPlane();
  }

  initForm() {
    this.airPlaneForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  getAllAirPlane() {
    this.sub = this.packageService.getAirPorts().subscribe(res => {
      this.airPorts = res;
    });
  }

  addAirPlane() {
    const payload = this.airPlaneForm.value;
    if (this.airPlaneForm.valid) {
      const result = this.airPorts.find(airport => airport.name == payload.name);
      if (!result) {
        this.packageService.AddAirPlane(payload);
        this.toast.success('تمت الاضافه');
        this.airPlaneForm.reset();
      }
      else {
        this.toast.error('موجود من قبل');
      }
    }
  }

  updateItem(item) {
    this.itemToEdit = item;
    this.editState = true;
  }

  updateSingleItem(item) {
    this.packageService.updateAirPort(item);
    this.editState = false;
    this.toast.success('تم التعديل');
  }

  deleteItem(item) {
    this.packageService.deleteAirPlane(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
