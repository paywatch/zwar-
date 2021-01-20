import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AgencyService } from '../../services/agency/agency.service';

@Component({
  selector: 'app-agency-category',
  templateUrl: './agency-category.component.html',
  styleUrls: ['./agency-category.component.css']
})
export class AgencyCategoryComponent implements OnInit, OnDestroy {

  agencyCategoryForm: FormGroup;
  sub: Subscription;
  agencyCategory: any;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private agencyService: AgencyService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllAgenciesCategories();
  }


  initForm() {
    this.agencyCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getAllAgenciesCategories() {
    this.sub = this.agencyService.getAgencyType().subscribe(res => {
      this.agencyCategory = res;
      console.log(res);
    });
  }

  addCategory() {
    const payload = this.agencyCategoryForm.value;
    this.agencyService.addCategory(payload);
    this.toast.success('تمت الاضافه');
    this.agencyCategoryForm.reset();
  }

  deleteItem(item) {
    this.agencyService.deleteAgencyType(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
