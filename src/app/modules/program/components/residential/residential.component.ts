import { Component, OnInit, Input, OnChanges, Output, EventEmitter, NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-residential',
  templateUrl: './residential.component.html',
  styleUrls: ['./residential.component.css']
})
export class ResidentialComponent implements OnInit {

  basics: any;
  residentailForm: FormGroup;
  madinaForm: FormGroup;
  hideMadinaData: boolean;
  residential: any;
  hotelStars: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private programservice: ProgramService) { }

  ngOnInit(): void {
    this.initResidentialForm();
    this.getBasicsData();
    this.initMadinaResidence();
    setTimeout(() => {
      this.patchFormValue();
    }, 2000);
    this.getAllHotelStars();
  }

  getBasicsData() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
  }

  patchFormValue() {
    this.residential = JSON.parse(sessionStorage.getItem('hotels'));
    if (this.residential) {
      console.log('yes');
      this.residentailForm.patchValue(this.residential);
      this.madinaForm.patchValue(this.residential);
    }
  }

  get hotel() {
    const hotel = this.residentailForm;
    return hotel;
  }

  get hotels() {
    const Mhotel = this.madinaForm;
    return Mhotel;
  }

  initResidentialForm() {
    this.residentailForm = this.formBuilder.group({
      hotelName: ['', [Validators.required, Validators.maxLength(50)]],
      hotelNights: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      hotelStars: ['', Validators.required],
      distanceFromHaram: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      breakfastAvailable: [false],
      dinnerAvailable: [false],
      lunchAvailable: [false],
      breakfastIncluded: [true],
      lunchIncluded: [true],
      dinnerIncluded: [true],
      breakfastDetails: ['', Validators.maxLength(50)],
      breakfastPrice: ['', Validators.pattern(/^[0-9]*$/)],
      lunchDetails: ['', Validators.maxLength(50)],
      lunchPrice: ['', Validators.pattern(/^[0-9]*$/)],
      dinnerDetails: ['', Validators.maxLength(50)],
      dinnerPrice: ['', Validators.pattern(/^[0-9]*$/)],
    });
  }

  initMadinaResidence() {
    this.madinaForm = this.formBuilder.group({
      MHotelName: ['', [Validators.required, Validators.maxLength(50)]],
      MHotelNights: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      MHotelStars: ['', Validators.required],
      MDistanceFromHaram: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      MBreakfastAvailable: [false],
      MLunchAvailable: [false],
      MDinnerAvailable: [false],
      MBreakfastIncluded: [true],
      MLunchIncluded: [true],
      MDinnerIncluded: [true],
      MBreakfastDetails: ['', Validators.maxLength(50)],
      MBreakfastPrice: ['', Validators.pattern(/^[0-9]*$/)],
      MLunchDetails: ['', Validators.maxLength(50)],
      MLunchPrice: ['', Validators.pattern(/^[0-9]*$/)],
      MDinnerDetails: ['', Validators.maxLength(50)],
      MDinnerPrice: ['', Validators.pattern(/^[0-9]*$/)],
    });
  }

  getAllHotelStars() {
    this.programservice.getAllStars().subscribe(stars => {
      this.hotelStars = stars;
      console.log(this.hotelStars);
    })
  }

  createHotels() {
    sessionStorage.removeItem('submit');
    const hotels = { ...this.residentailForm.value, ...this.madinaForm.value };
    this.programservice.createResidential(hotels)
      .subscribe((res) => {
        this.router.navigate(['/program/transportation']);
      });
  }
}
