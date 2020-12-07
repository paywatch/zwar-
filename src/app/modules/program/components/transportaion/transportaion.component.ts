import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transportaion',
  templateUrl: './transportaion.component.html',
  styleUrls: ['./transportaion.component.css']
})
export class TransportaionComponent implements OnInit {

  transportationFrom: FormGroup;
  basics: any;
  airplane: any;
  transports: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private programService: ProgramService,
              private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    setTimeout(() => {
      this.patchForm();
    },1000);
    this.getAllAirplanes();
    this.getAllTransportation();
  }

  initForm() {
    this.transportationFrom = this.fb.group({
      progAirTicketIncluded: ['', Validators.required],
      airlineID: ['', Validators.required],
      airlineDesc: ['', [Validators.required, Validators.maxLength(50)]],
      internalTransportations: ['' , Validators.required],
      programTransDetails: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  get transportation() {
    return this.transportationFrom;
  }

  patchForm() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
    const transportation = JSON.parse(sessionStorage.getItem('residence'));
    transportation ? this.transportation.patchValue(transportation) : {};
  }

  getAllAirplanes() {
    this.programService.getAllAirplaneCompany().subscribe(airplane => {
      this.airplane = airplane;
      console.log(this.airplane);
    });
  }

  getAllTransportation() {
    this.programService.getAllTransportation().subscribe(transport => {
      this.transports = transport;
      console.log(transport);
    });
  }

  back() {
    this.router.navigate(['/program/residential']);
  }

  submit() {
    sessionStorage.removeItem('submit');
    const payload = this.transportationFrom.value;
    this.programService.createTransportation(payload).subscribe(
      (data) => {
        this.router.navigate(['/program/visits']);
        this.toast.success('تمت الاضافه');
      },
      (error) => this.toast.error('حدث خطأ')
    );
  }
}
