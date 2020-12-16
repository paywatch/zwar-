import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { threadId } from 'worker_threads';

import { UtilsService } from '../../../core/services/utils/utils.service';
import { ProgramService } from '../../services/program.service';


@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent implements OnInit {

  basicsForm: FormGroup;
  // categories$: Observable<any[]>;
  // paths$: Observable<any[]>;
  basics: any;
  categories: any[];
  programs: any;
  selectedBasic: any;
  Basics$: any[];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private programService: ProgramService,
  ) { }

  ngOnInit(): void {
    this.patchForm();
    setTimeout(() => {
      this.getBasicData();
    }, 1000);
    this.getAllCategory();
    this.initForm();
  }

  initForm() {
    this.basicsForm = this.fb.group({
      programName: ['', [Validators.required, Validators.maxLength(100)]],
      programPathID: ['', Validators.required],
      programUmrahYear: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(/^[0-9]*$/)]],
      programCategoryID: ['', Validators.required],
      programPrice: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      programDesc: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  patchForm() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
  }

  getBasicData() {
    this.programService.getProgramBasics().subscribe(basics => {
      this.Basics$ = basics;
      if (this.basics) {
        this.selectedBasic = basics.find(b => b.programName == this.basics.programName);
        console.log(this.selectedBasic);
        this.basicsForm.patchValue(this.selectedBasic);
      }
    });
  }


  getAllCategory() {
    this.programService.getAllCategory().subscribe(category => {
      this.categories = category;
      console.log(category);
    });
  }

  createProgram() {
    const payload = this.basicsForm.value;
    this.programService.createProgram(payload)
      .subscribe(
        (data) => {
          this.toastr.success('تمت الاضافه بنجاح');
          this.router.navigate(['/program/residential']);
        }
      );
  }

  updateBasic() {
    const id = this.selectedBasic.id;
    console.log(id);
    this.selectedBasic = this.basicsForm.value;
    this.selectedBasic.id = id;
    this.programService.updateBasicData(this.selectedBasic);
    this.router.navigate(['/program/residential']);
    this.toastr.success('تم التعديل');
  }

  deleteBasic() {
    this.programService.deleteBasic(this.selectedBasic);
  }

}
