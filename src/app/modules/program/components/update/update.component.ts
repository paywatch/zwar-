import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.initForm();
  }

  initForm() {
    this.programForm = this.formBuilder.group({
      programName: [this.program?.programName],
      programPathID: [this.program?.programPathID],
      programUmrahYear: [this.program?.programUmrahYear],
      programCategoryID: [this.program?.programCategoryID],
      programPrice: [this.program?.programPrice],
      programDesc: [this.program?.programDesc],
      programId: [this.program?.programId],
      hotelName: [this.program?.hotelName],
      hotelNights: [this.program?.hotelNights],
      hotelStars: [this.program?.hotelStars],
      distanceFromHaram: [this.program?.distanceFromHaram],
      breakfastAvailable: [this.program?.breakfastAvailable],
      dinnerAvailable: [this.program?.dinnerAvailable],
      lunchAvailable: [this.program?.lunchAvailable],
      breakfastIncluded: [this.program?.breakfastIncluded],
      lunchIncluded: [this.program?.lunchIncluded],
      dinnerIncluded: [this.program?.dinnerIncluded],
      breakfastDetails: [this.program?.breakfastDetails],
      breakfastPrice: [this.program?.breakfastPrice],
      lunchDetails: [this.program?.lunchDetails],
      lunchPrice: [this.program?.lunchPrice],
      dinnerDetails: [this.program?.dinnerDetails],
      dinnerPrice: [this.program?.dinnerPrice],
      MHotelName: [this.program?.MHotelName],
      MHotelNights: [this.program?.MHotelNights],
      MHotelStars: [this.program?.MHotelStars],
      MDistanceFromHaram: [this.program?.MDistanceFromHaram],
      MBreakfastAvailable: [this.program?.MBreakfastAvailable],
      MLunchAvailable: [this.program?.MLunchAvailable],
      MDinnerAvailable: [this.program?.MDinnerAvailable],
      MBreakfastIncluded: [this.program?.MBreakfastIncluded],
      MLunchIncluded: [this.program?.MLunchIncluded],
      MDinnerIncluded: [this.program?.MDinnerIncluded],
      MBreakfastDetails: [this.program?.MBreakfastDetails],
      MBreakfastPrice: [this.program?.MBreakfastPrice],
      MLunchDetails: [this.program?.MLunchDetails],
      MLunchPrice: [this.program?.MLunchPrice],
      MDinnerDetails: [this.program?.MDinnerDetails],
      MDinnerPrice: [this.program?.MDinnerPrice],
      progAirTicketIncluded: [this.program?.progAirTicketIncluded],
      airlineID: [this.program?.airlineID],
      airlineDesc: [this.program?.airlineDesc],
      internalTransportations: [this.program?.internalTransportations],
      programTransDetails: [this.program?.programTransDetails],
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
      console.log(this.program);
    });
  }

  getAllCategories() {
    this.programService.getAllCategory().subscribe(res => {
      this.categories = res;
      this.programForm.patchValue(this.program);
    });
  }

  submit() {
    this.program = this.programForm.value;
    this.programService.updateProgram(this.program);
    this.router.navigate(['/program/edit']);
  }

}
