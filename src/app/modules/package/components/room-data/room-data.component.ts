import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-room-data',
  templateUrl: './room-data.component.html',
  styleUrls: ['./room-data.component.css']
})
export class RoomDataComponent implements OnInit {

  roomForm: FormGroup;
  basics: any;
  roomType: any;
  rooms: any[];
  payload: any;
  roomData: any;
  roomID: string;
  selectedRoom: any;
  roomPayload: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private packageService: PackageService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.getSessionStorageData();
    setTimeout(() => {
      this.getPackageRoom();
    }, 1000);
    setTimeout(() => {
      this.getRoomType();
    }, 2000);
  }

  initForm() {
    this.roomForm = this.fb.group({
      roomTypeID: ['', Validators.required],
      roomPriceAdult: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+/)]],
      roomPriceKids: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+/)]],
      roomTypeInfants: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+/)]],
      roomQuantity: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+/)]]
    });
  }

  getRoomType() {
    this.packageService.getRoomType().subscribe(roomType => {
      this.roomType = roomType;
      this.rooms = this.rooms ? this.rooms : [];
      this.rooms = this.rooms.map(r => {
        r.roomName = roomType.find(t => t.id == r.roomTypeID).name;
        return r;
      });
    });
  }

  getSessionStorageData() {
    this.roomData = JSON.parse(sessionStorage.getItem('room'));
    this.roomID = JSON.parse(sessionStorage.getItem('roomID')) || {};
  }

  getPackageRoom() {
    this.packageService.getRooms().subscribe(rooms => {
      if (this.roomData) {
        this.selectedRoom = rooms.find(r => r.id == this.roomID);
        this.selectedRoom ? this.rooms = [].concat(this.selectedRoom) : this.rooms = [];
      }
    });
  }

  resetForm() {
    this.roomForm.reset();
  }

  back() {
    this.router.navigate(['/package/group']);
  }

  addRoom() {
    if (this.roomForm.valid) {
      this.payload = this.roomForm.value;
      this.payload.$$ID = this.rooms.length + 1;
      this.rooms.push(this.payload);
    }
  }

  deleteRoom(id) {
    this.rooms = this.rooms.filter(room => room.$$ID !== id);
  }

  editRoom(index) {
    const room = this.rooms.find(r => r.$$ID === index);
    this.roomForm.patchValue(room);
  }

  submit() {
    this.packageService.createRooms(this.payload)
      .subscribe((res) => {
        if (res) {
          this.toast.success('تمت الاضافه');
          this.router.navigate(['/package/confirm']);
        }
      },
        (err) => {
          this.toast.error('لقد حدث خطأ ما');
        });
  }

  updatePackageRoom() {
    this.roomPayload = { ...this.rooms };
    this.selectedRoom = this.roomPayload;
    this.packageService.updatePackageRoom(this.selectedRoom);
    this.toast.success('تم التعديل');
    this.router.navigate(['/package/confirm']);
  }

  deletePackageRoom() {
    this.packageService.deletePackageRoom(this.selectedRoom);
    this.toast.info('تم الحذف');
  }
}
