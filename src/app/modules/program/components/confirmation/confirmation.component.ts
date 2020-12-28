import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { LOADIPHLPAPI } from 'dns';
import { environment } from 'src/environments/environment';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  user: any;
  basics: any;
  residential: any;
  transportation: any;
  visit: any;
  residance: any;
  program: any;


  constructor(
    private router: Router,
    private programService: ProgramService) { }

  ngOnInit(): void {
    this.collectAllData();
    this.getAllCategory();
    this.getAllHotelStars();
    this.getAllAirplanes();
    this.getAllTransportation();
  }

  collectAllData() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
    this.residential = JSON.parse(sessionStorage.getItem('hotels'));
    this.transportation = JSON.parse(sessionStorage.getItem('residence'));
    this.visit = JSON.parse(sessionStorage.getItem('visit'));
    this.user = JSON.parse(localStorage.getItem('user')) || {};
    console.log(this.user);
    this.program = {
      ...this.basics,
      ...this.residential,
      ...this.transportation,
      ...this.visit
    };
  }

  getAllCategory() {
    this.programService.getAllCategory().subscribe(categories => {
      const found = categories.find(c => c.id == this.basics.programCategoryID);
      this.program.categoryName = found.name;
    });
  }

  getAllHotelStars() {
    this.programService.getAllStars().subscribe(stars => {
      const found = stars.find(star => star.id == this.residential.hotelStars);
      const madinaHotel = stars.find(star => star.id == this.residential.MHotelStars);
      console.log(madinaHotel);
      this.program.madianHotelStar = madinaHotel.name;
      this.program.hotelStar = found.name;
      console.log();
    });
  }

  getAllAirplanes() {
    this.programService.getAllAirplaneCompany().subscribe(airplane => {
      this.program.airlineNAme = airplane.find(air => air.id == this.transportation.airlineID).name;      
    });
  }

  getAllTransportation() {
    this.programService.getAllTransportation().subscribe(transportation => {
      this.program.transportName = transportation.find(t => t.id == this.transportation.internalTransportations).name;
    });
  }

  confirm() {
    console.log(this.user);
    this.program.uid = this.user.user.uid;
    console.log(this.program.uid);
    this.programService.AddProgram(this.program).subscribe(program => {
      sessionStorage.removeItem('basics');
      sessionStorage.removeItem('hotels');
      sessionStorage.removeItem('residence');
      sessionStorage.removeItem('visit');
      sessionStorage.setItem('program', JSON.stringify(this.program));
      this.router.navigate(['program/congratulation']);
    });
  }

  back() {
    this.router.navigate(['/program/visits']);
  }

}
