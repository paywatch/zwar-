import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transportaion',
  templateUrl: './transportaion.component.html',
  styleUrls: ['./transportaion.component.css']
})
export class TransportaionComponent implements OnInit, OnDestroy {

  transportationFrom: FormGroup;
  basics: any;
  airplane: any;
  transports: any;
  transportations: any;
  transportationData: any[];
  selectedTransportation: any;
  residenceID: any;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private programService: ProgramService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.patchForm();
    this.getAllAirplanes();
    this.getAllTransportation();
    setTimeout(() => {
      this.getProgramTransportation();
    }, 1000);
  }

  initForm() {
    this.transportationFrom = this.fb.group({
      progAirTicketIncluded: ['', Validators.required],
      airlineID: ['', Validators.required],
      airlineDesc: ['', [Validators.required, Validators.maxLength(50)]],
      internalTransportations: ['', Validators.required],
      programTransDetails: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  get transportation() {
    return this.transportationFrom;
  }

  patchForm() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
    this.transportations = JSON.parse(sessionStorage.getItem('residence'));
    this.residenceID = JSON.parse(sessionStorage.getItem('residenceID'));
  }

  getAllAirplanes() {
    this.sub = this.programService.getAllAirplaneCompany().subscribe(airplane => {
      this.airplane = airplane;
    });
  }

  getProgramTransportation() {
    this.programService.getProgramTransportation().subscribe(transportation => {
      this.transportationData = transportation;
      if (this.transportations) {
        const find = this.transportationData.find(t => t.id == this.residenceID);
        this.selectedTransportation = find;
        this.transportationFrom.patchValue(this.selectedTransportation);
      }
    });
  }

  getAllTransportation() {
    this.sub = this.programService.getAllTransportation().subscribe(transport => {
      this.transports = transport;
    });
  }

  back() {
    this.router.navigate(['/program/residential']);
  }

  submit() {
    const payload = this.transportationFrom.value;
    this.programService.createTransportation(payload).subscribe(
      (data) => {
        this.router.navigate(['/program/visits']);
        this.toast.success('تمت الاضافه');
      },
      (error) => this.toast.error('حدث خطأ')
    );
  }

  updateTransportation() {
    const id = this.selectedTransportation.id;
    this.selectedTransportation = this.transportationFrom.value;
    this.selectedTransportation.id = id;
    this.programService.updateTransportation(this.selectedTransportation);
    this.router.navigate(['/program/visits']);
    this.toast.success('تم التعديل');
  }

  deleteTransportation() {
    this.programService.deleteTransportation(this.selectedTransportation);
    this.toast.success('تم الحذف');
    this.router.navigate(['/program/residential']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
