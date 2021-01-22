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
  editState: boolean;
  itemToEdit: any;

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
    if (this.transportForm.valid) {
      this.programService.addTransportWay(payload);
      this.toast.success('تمت الاضافه');
      this.transportForm.reset();
    }
  }

  updateItem(item) {
    this.itemToEdit = item;
    this.editState = true;
  }

  updateSingleItem(item) {
    this.programService.updateTransportWay(item);
    this.editState = false;
    this.toast.success('تم التعديل');
  }

  deleteItem(item) {
    this.programService.deletetransportWay(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
