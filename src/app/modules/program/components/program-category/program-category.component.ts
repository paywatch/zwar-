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

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgramService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllCategories();
  }

  deleteItem(item) {
    this.programService.deleteprogramCategory(item);
  }

  getAllCategories() {
    this.sub = this.programService.getAllCategory().subscribe(res => {
      this.categories = res;
      console.log(res);
    });
  }

  initForm() {
    this.programCategories = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  AddCategory() {
    const payload = this.programCategories.value;
    this.programService.addCategory(payload);
    this.toast.success('تمت الاضافه');
    this.programCategories.reset();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
