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
  editState: boolean;
  itemToEdit: any;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private agencyService: AgencyService
  ) { }

  ngOnInit(): void {
    this.editState = false;
    this.initForm();
    this.getAllAgenciesCategories();
  }


  initForm() {
    this.agencyCategoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  getAllAgenciesCategories() {
    this.sub = this.agencyService.getAgencyType().subscribe(res => {
      this.agencyCategory = res;
    });
  }

  addCategory() {
    const payload = this.agencyCategoryForm.value;
    if (this.agencyCategoryForm.valid) {
      const result = this.agencyCategory.find(category => category.name == payload.name);
      if (!result) {
        this.agencyService.addCategory(payload);
        this.toast.success('تمت الاضافه');
        this.agencyCategoryForm.reset();
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
    this.agencyService.updateCategories(item);
    this.editState = false;
    this.toast.success('تم التعديل');
  }

  deleteItem(item) {
    this.agencyService.deleteAgencyType(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
