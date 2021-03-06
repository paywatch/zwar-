import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-umrah-season',
  templateUrl: './umrah-season.component.html',
  styleUrls: ['./umrah-season.component.css']
})
export class UmrahSeasonComponent implements OnInit, OnDestroy {

  umrahSeasonForm: FormGroup;
  sub: Subscription;
  umrahSeason: any;
  editState: boolean;
  itemToEdit: any;
  page;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private packageService: PackageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUmrahSeason();
  }


  initForm() {
    this.umrahSeasonForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  getUmrahSeason() {
    this.sub = this.packageService.getUmrahSeason().subscribe(res => {
      this.umrahSeason = res;
    });
  }

  addUmrahSeason() {
    const payload = this.umrahSeasonForm.value;
    if (this.umrahSeasonForm.valid) {
      const result = this.umrahSeason.find(season => season.name == payload.name);
      if (!result) {
        this.packageService.addUmrahSeason(payload);
        this.toast.success('تمت الاضافه');
        this.umrahSeasonForm.reset();
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
    this.packageService.updateUmrahASeason(item);
    this.editState = false;
    this.toast.success('تم التعديل');
  }

  deleteItem(item) {
    this.packageService.deleteUmrahSeason(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
