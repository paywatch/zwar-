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
  singlePackage: Package;
  packageForm: FormGroup;
  ID: any;
  roomType: any;
  airports: any;
  umrahSeason: any;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private packageService: PackageService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ID = this.activatedRouter.snapshot.params['id'];
    this.getRoomType();
    this.getInternalAirPort();
    this.getPackage(this.ID);
    this.getUmrahSeason();
    this.initForm();
  }

  initForm() {
    this.packageForm = this.formBuilder.group({
      ID: [this.singlePackage?.ID],
      localAirportID: [this.singlePackage?.localAirportID, Validators.required],
      packageAvailableSeats: [this.singlePackage?.packageAvailableSeats, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      // tslint:disable-next-line:max-line-length
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
      roomPriceAdult: [this.singlePackage?.roomPriceAdult, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      roomPriceKids: [this.singlePackage?.roomPriceKids, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      roomQuantity: [this.singlePackage?.roomQuantity, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      roomTypeID: [this.singlePackage?.roomTypeID, Validators.required],
      roomTypeInfants: [this.singlePackage?.roomTypeInfants, [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    }, {
      validators: GreaterThan('packageDepartureDate', 'packageReturnDate')
    });
  }

  getPackage(id) {
    this.packageService.getPackage().subscribe(packages => {
      const found = packages.find(p => p.id == id);
      this.singlePackage = found;
      this.packageForm.patchValue(this.singlePackage);
    });
  }

  getRoomType() {
    this.packageService.getRoomType().subscribe(room => {
      this.roomType = room;
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

  submit() {
    this.singlePackage = this.packageForm.value;
    this.singlePackage.id = this.ID;
    this.packageService.updatePackage(this.singlePackage);
    this.router.navigate(['package/edit']);
  }
}
