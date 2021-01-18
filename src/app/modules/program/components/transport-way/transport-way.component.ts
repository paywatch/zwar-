import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-transport-way',
  templateUrl: './transport-way.component.html',
  styleUrls: ['./transport-way.component.css']
})
export class TransportWayComponent implements OnInit, OnDestroy {

  transportForm: FormGroup;
  sub: Subscription;
  transportWay: any;

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgramService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getTransportWay();
  }

  initForm() {
    this.transportForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getTransportWay() {
    this.sub = this.programService.getAllTransportation().subscribe(res => {
      this.transportWay = res;
    });
  }

  AddTransportWay() {
    const payload = this.transportForm.value;
    this.programService.addTransportWay(payload);
    this.toast.success('تمت الاضافه');
    this.transportForm.reset();
  }

  deleteItem(item) {
    this.programService.deletetransportWay(item);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
