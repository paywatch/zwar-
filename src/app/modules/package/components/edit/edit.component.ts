import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  packages: any[];

  constructor(
    private router: Router,
    private packageService: PackageService,
  ) { }

  ngOnInit(): void {
    this.getPackage();
    this.getAirport();
    this.getUmrahSeason();
    this.getUmrahDirection();
  }

  getPackage() {
    this.packageService.getPackage().subscribe(pack => {
      if (pack) {
        this.packages = pack;
        console.log(this.packages);
      }
      else {
        this.packages = [];
      }
    });
  }

  getAirport() {
    this.packageService.getAirPorts().subscribe(airport => {
      this.packages = this.packages.map(p => {
        p.airportNAme = airport.find(a => a.id == p.localAirportID).name;
        return p;
      });
    });
  }

  getUmrahSeason() {
    this.packageService.getUmrahSeason().subscribe(season => {
      this.packages = this.packages.map(p => {
        p.umrahSeasonName = season.find(s => s.id == p.packageSeasonID).name;
        return p;
      });
    });
  }

  getUmrahDirection() {
    this.packageService.getUmrahDirection().subscribe(direction => {
      this.packages = this.packages.map(p => {
        p.packageDirectionName = direction.find(d => d.id == p.itineraryID).name;
        return p;
      });
    });
  }

  onRowDelete(event, item) {
    this.packageService.deletePackage(item);
  }

}
