import { Component, OnDestroy, OnInit } from '@angular/core';
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
  roomID: string;
  selectedRoom: any;
  roomPayload: any;
  program: any;
  editIndex: any;
  roomsData: any;
  room: any;
  page;
  editMode: boolean;
  data: any;

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
    }, 1000);

    this.program = JSON.parse(sessionStorage.getItem('program')) || {};
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
    this.roomID = JSON.parse(sessionStorage.getItem('roomID')) || {};
    this.roomData = JSON.parse(sessionStorage.getItem('room'));
    if (this.roomsData !== null) {
      this.rooms = this.roomData;
    }
  }

  getPackageRoom() {
    this.packageService.getRooms().subscribe(rooms => {
      if (this.roomData) {
        this.selectedRoom = rooms.find(r => r.id == this.roomID);
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
      this.rooms = this.rooms.map(room => {
        room.roomName = this.roomType.find(roomType => roomType.id == room.roomTypeID).name;
        return room;
      });
      this.editIndex = true;
    }
  }

  deleteRoom(id) {
    this.rooms = this.rooms.filter(room => room.$$ID !== id);
  }

  editRoom(index) {
    this.room = this.rooms.find(obj => obj.$$ID == index.$$ID);
    this.roomForm.patchValue(this.room);
    this.editMode = true;
  }

  _editRoom() {
    const find = this.rooms.findIndex(room => room.$$ID == this.room.$$ID);
    this.rooms[find] = this.roomForm.value;
  }

  submit() {
    this.packageService.createRooms(this.rooms).subscribe(res => {
      if (res) {
        this.toast.success('تمت الاضافه');
        this.router.navigate(['/package/confirm']);
      }
      else {
        this.toast.error('لقد حدث خطأ ما');
      }
    });
  }

  updatePackageRoom() {
    this.packageService.updatePackageRoom(this.rooms);
    this.toast.success('تم التعديل');
    this.router.navigate(['/package/confirm']);
  }

  deletePackageRoom() {
    this.packageService.deletePackageRoom(this.selectedRoom);
    this.toast.info('تم الحذف');
    this.router.navigate(['/package/group']);
    sessionStorage.removeItem('room');
  }
}
