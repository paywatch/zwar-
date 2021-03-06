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
  editState: boolean;
  itemToEdit: any;
  page;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private packageService: PackageService
  ) { }

  ngOnInit(): void {
    this.editState = false;
    this.initForm();
    this.getRoomType();
  }

  initForm() {
    this.roomTypeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  getRoomType() {
    this.sub = this.packageService.getRoomType().subscribe(res => {
      this.roomType = res;
    });
  }

  addRoomType() {
    const payload = this.roomTypeForm.value;
    if (this.roomTypeForm.valid) {
      const result = this.roomType.find(room => room.name == payload.name);
      if (!result) {
        this.packageService.addRoomType(payload);
        this.toast.success('تمت الاضافه');
        this.roomTypeForm.reset();
      }
      else {
        this.toast.error('موجود من قبل');
      }
    }
  }

  updateItem(item) {
    this.itemToEdit = item;
    this.editState = true;
  }

  updateSingleItem(item) {
    this.packageService.updateRoomType(item);
    this.editState = false;
    this.toast.success('تم التعديل');
  }

  deleteItem(item) {
    this.packageService.deleteRoomType(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
