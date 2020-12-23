import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PackageService } from 'src/app/modules/package/services/package-service.service';
import { ProgramService } from '../../../../modules/program/services/program.service';



@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  packagesList$: any;
  programId: string;
  packages: any;
  selectedPackages: any;
  packageID: any;
  packageTravelDate: any;
  packageReturnedDate: any;
  packageSearchResult: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private packageService: PackageService) { }

  ngOnInit(): void {
    this.programId = this.activatedRoute.snapshot.params['programId'];
    this.getAllPackage();
    setTimeout(() => {
      this.getSeasonName();
      this.getAirport();
    }, 1000);
    this.getSinglePackage();
  }

  searchResult() {
    const find = this.packagesList$.find(p => p.id == this.packageID || p.packageDepartureDate == this.packageTravelDate || p.packageReturnDate == this.packageReturnedDate);
    this.packageSearchResult = find;
  }

  clearSearchResult() {
    this.packageTravelDate = '';
    this.packageReturnedDate = '';
    this.packageID = '';
    this.packageSearchResult = null;
  }

  getAllPackage() {
    this.packageService.getPackage().subscribe(packages => {
      this.packagesList$ = packages;
      console.log(this.packagesList$);
    });
  }

  getAirport() {
    this.packageService.getAirPorts().subscribe(airport => {
      this.packagesList$ = this.packagesList$.map(p => {
        p.airportName = airport.find(a => a.id == p.localAirportID).name;
        return p;
      });
    });
  }

  getSeasonName() {
    this.packageService.getUmrahSeason().subscribe(season => {
      this.packagesList$ = this.packagesList$.map(p => {
        p.seasonName = season.find(s => s.id == p.packageSeasonID).name;
        return p;
      });
    });
  }

  getSinglePackage() {
    this.packageService.getPackage().subscribe(packages => {
      this.selectedPackages = packages.find(p => p.ID == this.programId);
      console.log(this.selectedPackages);
    });
  }

  createNewPackage() {
    this.router.navigate(['/package/base/', this.programId]);;
  }
}
