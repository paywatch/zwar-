import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-umrah-direction',
  templateUrl: './umrah-direction.component.html',
  styleUrls: ['./umrah-direction.component.css']
})
export class UmrahDirectionComponent implements OnInit, OnDestroy {

  umrahDirectionForm: FormGroup;
  sub: Subscription;
  umrahDirections: any;
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
    this.getUmrahDierction();
  }

  initForm() {
    this.umrahDirectionForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getUmrahDierction() {
    this.sub = this.packageService.getUmrahDirection().subscribe(res => {
      this.umrahDirections = res;
    });
  }

  addUmrahDirection() {
    const payload = this.umrahDirectionForm.value;
    this.packageService.addUmrahDirection(payload);
    this.toast.success('تمت الاضافه');
    this.umrahDirectionForm.reset();
  }

  updateItem(item) {
    this.itemToEdit = item;
    this.editState = true;
  }

  updateSingleItem(item) {
    this.packageService.updateUmrahDirection(item);
    this.editState = false;
    this.toast.success('تم التعديل');
  }

  deleteItem(item) {
    this.packageService.deleteUmrahDirection(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
