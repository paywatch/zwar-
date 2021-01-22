import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-airplane-company',
  templateUrl: './airplane-company.component.html',
  styleUrls: ['./airplane-company.component.css']
})
export class AirplaneCompanyComponent implements OnInit, OnDestroy {

  airplaneForm: FormGroup;
  sub: Subscription;
  airplanes: any;
  editState: boolean;
  itemToEdit: any;

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgramService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.editState = false;
    this.initForm();
    this.getAirPlane();
  }

  initForm() {
    this.airplaneForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getAirPlane() {
    this.sub = this.programService.getAllAirplaneCompany().subscribe(res => {
      this.airplanes = res;
      console.log(res);
    });
  }

  AddAirPlane() {
    const payload = this.airplaneForm.value;
    this.programService.addAirPlane(payload);
    this.toast.success('تمت الاضافه');
    this.airplaneForm.reset();
  }

  updateItem(item) {
    this.itemToEdit = item;
    this.editState = true;
  }

  updateSingleItem(item) {
    this.programService.updateAirplane(item);
    this.editState = false;
    this.toast.success('تم التعديل');
  }

  deleteItem(item) {
    this.programService.deleteAirPlane(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
