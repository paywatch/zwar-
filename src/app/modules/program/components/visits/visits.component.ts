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
  visitID: any;
  selectedVisit: any;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private router: Router,
    private programService: ProgramService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getBasics();
    if (this.visits) {
      setTimeout(() => {
        this.getProgramVisit();
      }, 1000);
    }
  }

  getBasics() {
    this.basics = JSON.parse(sessionStorage.getItem('basics')) || {};
    this.visits = JSON.parse(sessionStorage.getItem('visit')) || {};
    this.visitID = JSON.parse(sessionStorage.getItem('visitID'));
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

  getProgramVisit() {
    this.programService.getProgramVisit().subscribe(visit => {
      if (this.visits) {
        this.selectedVisit = visit.find(v => v.id == this.visitID);
        if (this.selectedVisit) {
          this.visitForm.patchValue(this.selectedVisit);
        }
      }
    });
  }

  updateProgramVisit() {
    this.selectedVisit = this.visitForm.value;
    this.selectedVisit.id = this.visitID;
    console.log(this.selectedVisit);
    this.programService.updateProgramVisit(this.selectedVisit);
    this.router.navigate(['/program/confirmation']);
    this.toast.success('تم التعديل');
  }

  deleteProgramVisit() {
    this.programService.deleteProgramVisit(this.selectedVisit);
    this.visitForm.reset();
    this.router.navigate(['program/transportation']);
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
