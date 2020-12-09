import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private packageService: PackageService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.getRoomType();
    this.getSessionStorageData();
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
      this.roomData.roomTypeName = roomType.find(r => r.id == this.roomData.roomTypeID).name;
      console.log(this.roomData);
    });
  }

  getSessionStorageData() {
    this.roomData = JSON.parse(sessionStorage.getItem('room'));
    this.roomData ? this.rooms = [].concat(this.roomData) : this.rooms = [];
    console.log(this.rooms);
  }

  resetForm() {
    this.roomForm.reset();
  }

  navigate() {
    this.router.navigate(['/package/confirm']);
  }

  deleteRoom(id) {
    this.rooms = this.rooms.filter(room => room.$$ID != id);
  }

  back() {
    this.router.navigate(['/package/group']);
  }


  addRoom() {
    if (this.roomForm.valid) {
      this.payload = this.roomForm.value;
      this.payload.$$ID = this.rooms.length;
      this.rooms.push(this.payload);
    }
  }

  editRoom(index) {
    console.log(index);
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
}
