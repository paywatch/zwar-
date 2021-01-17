import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-program-category',
  templateUrl: './program-category.component.html',
  styleUrls: ['./program-category.component.css']
})
export class ProgramCategoryComponent implements OnInit {

  programCategories: FormGroup;
  sub: Subscription;
  categories: any;

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgramService) { }

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
      name: ['', Validators.required]
    });
  }

  AddCategory() {
    const payload = this.programCategories.value;
    this.programService.addCategory(payload);
    this.programCategories.reset();
  }
}
