import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Program } from '../../models/program';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  programId: string;
  program: Program;
  categories: any;
  hotelStars: any;
  airplane: any;
  transportationWay: any;
  programForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private programService: ProgramService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.programId = this.activatedRoute.snapshot.params['programId'];
    this.getSingleProgram();
    this.getAllCategories();
    this.getAllHotelStars();
    this.getAllAirplanes();
    this.getAllTransportation();
    this.initForm();
  }

  initForm() {
    this.programForm = this.formBuilder.group({
      programName: [this.program?.programName, [Validators.required, Validators.maxLength(30)]],
      programPathID: [this.program?.programPathID],
      programUmrahYear: [this.program?.programUmrahYear, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      programCategoryID: [this.program?.programCategoryID, Validators.required],
      programPrice: [this.program?.programPrice, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      programDesc: [this.program?.programDesc, [Validators.required, Validators.maxLength(50)]],
      programId: [this.program?.programId],
      hotelName: [this.program?.hotelName, [Validators.required, Validators.maxLength(30)]],
      hotelNights: [this.program?.hotelNights, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      hotelStars: [this.program?.hotelStars, Validators.required],
      distanceFromHaram: [this.program?.distanceFromHaram, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      breakfastAvailable: [this.program?.breakfastAvailable],
      dinnerAvailable: [this.program?.dinnerAvailable],
      lunchAvailable: [this.program?.lunchAvailable],
      breakfastIncluded: [this.program?.breakfastIncluded],
      lunchIncluded: [this.program?.lunchIncluded],
      dinnerIncluded: [this.program?.dinnerIncluded],
      breakfastDetails: [this.program?.breakfastDetails, Validators.maxLength(50)],
      breakfastPrice: [this.program?.breakfastPrice, [Validators.pattern(/^[0-9]*$/)]],
      lunchDetails: [this.program?.lunchDetails, Validators.maxLength(50)],
      lunchPrice: [this.program?.lunchPrice, Validators.pattern(/^[0-9]*$/)],
      dinnerDetails: [this.program?.dinnerDetails, Validators.maxLength(50)],
      dinnerPrice: [this.program?.dinnerPrice, Validators.pattern(/^[0-9]*$/)],
      MHotelName: [this.program?.MHotelName, Validators.required],
      MHotelNights: [this.program?.MHotelNights, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      MHotelStars: [this.program?.MHotelStars, [Validators.required]],
      MDistanceFromHaram: [this.program?.MDistanceFromHaram, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      MBreakfastAvailable: [this.program?.MBreakfastAvailable],
      MLunchAvailable: [this.program?.MLunchAvailable],
      MDinnerAvailable: [this.program?.MDinnerAvailable],
      MBreakfastIncluded: [this.program?.MBreakfastIncluded],
      MLunchIncluded: [this.program?.MLunchIncluded],
      MDinnerIncluded: [this.program?.MDinnerIncluded],
      MBreakfastDetails: [this.program?.MBreakfastDetails, Validators.maxLength(50)],
      MBreakfastPrice: [this.program?.MBreakfastPrice, [Validators.pattern(/^[0-9]*$/)]],
      MLunchDetails: [this.program?.MLunchDetails, Validators.maxLength(50)],
      MLunchPrice: [this.program?.MLunchPrice, [Validators.pattern(/^[0-9]*$/)]],
      MDinnerDetails: [this.program?.MDinnerDetails, Validators.maxLength(50)],
      MDinnerPrice: [this.program?.MDinnerPrice, [Validators.pattern(/^[0-9]*$/)]],
      progAirTicketIncluded: [this.program?.progAirTicketIncluded],
      airlineID: [this.program?.airlineID, Validators.required],
      airlineDesc: [this.program?.airlineDesc, [Validators.required, Validators.maxLength(50)]],
      internalTransportations: [this.program?.internalTransportations, Validators.required],
      programTransDetails: [this.program?.programTransDetails, [Validators.required, Validators.maxLength(50)]],
      Hira: [this.program?.Hira],
      MaccaMusieum: [this.program?.MaccaMusieum],
      Thour: [this.program?.Thour],
      MoulaTomb: [this.program?.MoulaTomb],
      NourMountain: [this.program?.NourMountain],
      HaramenSharefen: [this.program?.HaramenSharefen],
      Uhod: [this.program?.Uhod],
      MasjedZuElqeblaten: [this.program?.MasjedZuElqeblaten],
      Qebaa: [this.program?.Qebaa],
      SevenMasjed: [this.program?.SevenMasjed],
      ElGenValley: [this.program?.ElGenValley],
      PrinitHolyQuran: [this.program?.PrinitHolyQuran]
    });
  }

  getSingleProgram() {
    this.programService.getProgram().subscribe((programs: any) => {
      this.program = programs.find(p => p.programId == this.programId);
      this.programForm.patchValue(this.program);
    });
  }

  getAllCategories() {
    this.programService.getAllCategory().subscribe(res => {
      this.categories = res;
    });
  }

  getAllHotelStars() {
    this.programService.getAllStars().subscribe(stars => {
      this.hotelStars = stars;
    });
  }

  getAllAirplanes() {
    this.programService.getAllAirplaneCompany().subscribe(airplane => {
      this.airplane = airplane;
    });
  }

  getAllTransportation() {
    this.programService.getAllTransportation().subscribe(transportation => {
      this.transportationWay = transportation;
    });
  }

  submit() {
    this.program = this.programForm.value;
    this.programService.updateProgram(this.program);
    this.router.navigate(['/program/edit']);
  }

}
