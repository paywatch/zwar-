import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-program-category',
  templateUrl: './program-category.component.html',
  styleUrls: ['./program-category.component.css']
})
export class ProgramCategoryComponent implements OnInit, OnDestroy {

  programCategories: FormGroup;
  sub: Subscription;
  categories: any;
  editState: boolean;
  itemToEdit: any;

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgramService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.editState = false;
    this.getAllCategories();
  }

  initForm() {
    this.programCategories = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getAllCategories() {
    this.sub = this.programService.getAllCategory().subscribe(res => {
      this.categories = res;
      console.log(res);
    });
  }

  AddCategory() {
    const payload = this.programCategories.value;
    this.programService.addCategory(payload);
    this.toast.success('تمت الاضافه');
    this.programCategories.reset();
  }

  updateItem(item) {
    this.itemToEdit = item;
    this.editState = true;
  }

  updateSingleItem(item) {
    this.programService.updateItemCategories(item);
    this.editState = false;
    this.toast.success('تم التعديل');
  }

  deleteItem(item) {
    this.programService.deleteprogramCategory(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
