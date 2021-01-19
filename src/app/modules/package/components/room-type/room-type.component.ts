import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css']
})
export class RoomTypeComponent implements OnInit, OnDestroy {

  roomTypeForm: FormGroup;
  sub: Subscription;
  roomType: any;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private packageService: PackageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getRoomType();
  }

  initForm() {
    this.roomTypeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getRoomType() {
    this.sub = this.packageService.getRoomType().subscribe(res => {
      this.roomType = res;
    });
  }

  addRoomType() { 
    const payload = this.roomTypeForm.value;
    this.packageService.addRoomType(payload);
    this.toast.success('تمت الاضافه');
    this.roomTypeForm.reset();
  }

  deleteItem(item) {
    this.packageService.deleteRoomType(item);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
