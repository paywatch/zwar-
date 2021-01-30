import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterToday } from '../../../../_helpers/afterToday.validator';
import { GreaterThan } from '../../../../_helpers/greater-than.validator';
import { Package } from '../../models/package';
import { PackageService } from '../../services/package-service.service';

// IMPORT MOMENT FOR FORMAT DATE IN NICE WAY;
import * as moment from 'moment';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  singlePackage: any;
  packageForm: FormGroup;
  ID: any;
  roomType: any;
  airports: any;
  umrahSeason: any;
  rooms: any;
  editMode: boolean;
  room: any;
  roomForm: any;
  page;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private packageService: PackageService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ID = this.activatedRouter.snapshot.params['id'];
    setTimeout(() => {
      this.getRoomType();
    }, 2000);
    this.getInternalAirPort();
    this.getPackage(this.ID);
    this.getUmrahSeason();
    this.initForm();
    this.initRoomForm();
  }

  initForm() {
    this.packageForm = this.formBuilder.group({
      ID: [this.singlePackage?.ID],
      localAirportID: [this.singlePackage?.localAirportID, Validators.required],
      packageAvailableSeats: [this.singlePackage?.packageAvailableSeats, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      packageCapacity: [this.singlePackage?.packageCapacity, [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      packageDepartureDate: [this.singlePackage?.packageReturnDate, [Validators.required, AfterToday]],
      packageReturnDate: [this.singlePackage?.packageDepartureDate, Validators.required],
      itineraryID: [this.singlePackage?.itineraryID],
      packageSeasonID: [this.singlePackage?.packageSeasonID, Validators.required],
      groupLeadName: [this.singlePackage?.groupLeadName, Validators.required],
      groupLeadPhone: [this.singlePackage?.groupLeadPhone, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      mutawefName: [this.singlePackage?.mutawefName, Validators.required],
      mutawefPhone: [this.singlePackage?.mutawefPhone, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      mutawefPicture: [this.singlePackage?.mutawefPicture],
    }, {
      validators: GreaterThan('packageDepartureDate', 'packageReturnDate')
    });
  }

  initRoomForm() {
    this.roomForm = this.formBuilder.group({
      roomTypeID: ['', Validators.required],
      roomPriceAdult: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+/)]],
      roomPriceKids: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+/)]],
      roomTypeInfants: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+/)]],
      roomQuantity: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+/)]]
    });
  }

  getPackage(id) {
    this.packageService.getPackage().subscribe(packages => {
      const found = packages.find(p => p.id == id);
      this.singlePackage = found;
      this.rooms = [];
      this.rooms = this.singlePackage.room;
      console.log(this.singlePackage);
      this.packageForm.patchValue(this.singlePackage);
    });
  }

  getRoomType() {
    this.packageService.getRoomType().subscribe(roomType => {
      this.roomType = roomType;
    });
  }

  getInternalAirPort() {
    this.packageService.getAirPorts().subscribe(airport => {
      this.airports = airport;
    });
  }

  getUmrahSeason() {
    this.packageService.getUmrahSeason().subscribe(seasons => {
      this.umrahSeason = seasons;
    });
  }

  deleteRoom(item) {
    this.singlePackage.room = this.singlePackage.room.filter(room => room.$$ID !== item.$$ID);
    this.rooms = this.singlePackage.room;
  }

  editRoom(index) {
    this.room = this.rooms.find(obj => obj.$$ID == index.$$ID);
    this.roomForm.patchValue(this.room);
    this.editMode = true;
  }

  _editRoom() {
    const find = this.rooms.findIndex(r => r.$$ID == this.room.$$ID);
    this.rooms[find] = this.roomForm.value;
    this.rooms = this.rooms.map(room => {
      room.roomTypeName = this.roomType.find(type => type.id == room.roomTypeID).name;
      return room;
    });
    console.log(this.rooms);
  }

  submit() {
    this.singlePackage = {
      data: this.packageForm.value,
      id: this.ID,
      room: []
    };
    this.singlePackage.room = this.rooms;
    this.packageService.updatePackage(this.singlePackage);
    this.router.navigate(['package/edit']);
  }
}
