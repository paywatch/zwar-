import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProgramService } from '../../services/program.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  visitForm: FormGroup;
  basics: any;
  visits: any;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private programService: ProgramService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getBasics();
    setTimeout(() => {
      this.patchForm();
    }, 1000);
  }

  getBasics () {
    this.basics = JSON.parse(sessionStorage.getItem('basics')) || {};
    this.visits = JSON.parse(sessionStorage.getItem('visit')) || {};
  }

  patchForm() {
    this.visits ? this.visitForm.patchValue(this.visits) : {};
  }


  initForm() {
    this.visitForm = this.fb.group({
      Hira: [''],
      MaccaMusieum: [''],
      Thour: [''],
      MoulaTomb: [''],
      NourMountain: [''],
      HaramenSharefen: [''],
      Uhod: [''],
      MasjedZuElqeblaten: [''],
      Qebaa: [''],
      SevenMasjed: [''],
      ElGenValley: [''],
      PrinitHolyQuran: ['']
    });
  }

  reset() {
    this.visitForm.reset();
    this.router.navigate(['/']);
  }

  back() {
    this.router.navigate(['/program/transportation']);
  }

  submit() {
    const payload = this.visitForm.value;
    this.programService.createVisit(payload).subscribe(
      (data) => {
        this.router.navigate(['/program/confirmation']);
        this.toast.success('تمت الاضافه بنجاح');
      },
      (error) => this.toast.error('حدث خطأ ما')
    );
  }
}
