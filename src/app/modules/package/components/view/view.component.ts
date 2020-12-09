import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  package: any;
  base: any;
  room: any;
  matwaf: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private packageService: PackageService,) { }

  ngOnInit(): void {
    const ID = this.activatedRoute.snapshot.params['id'];
    this.getSessionStorageData();
    this.getPackage(ID);
  }

  getSessionStorageData() {
    this.base = JSON.parse(sessionStorage.getItem('base')) || {};
    this.matwaf = JSON.parse(sessionStorage.getItem('group')) || {};
    this.room = JSON.parse(sessionStorage.getItem('room')) || {};
  }

  getAirPorts() {
    this.packageService.getAirPorts().subscribe(airport => {
      this.package.internalAirPort = airport.find(air => air.id == this.base.localAirportID).name;
    });
  }

  getUmrahSeason() {
    this.packageService.getUmrahSeason().subscribe(season => {
      this.package.umrahSeasonName = season.find(s => s.id == this.base.packageSeasonID).name;
    });
  }

  getUmrahDirection() {
    this.packageService.getUmrahDirection().subscribe(direction => {
      this.package.directionName = direction.find(d => d.id == this.base.itineraryID).name;
    });
  }

  getRoomType() {
    this.packageService.getRoomType().subscribe(roomType => {
      this.package.roomTypeName = roomType.find(r => r.id == this.room.roomTypeID).name;
    });
  }

  getPackage(id) {
    this.packageService.getPackage().subscribe(pack => {
      const found = pack.find(p => p.id == id);
      this.package = found;
      console.log(this.package);
    });
  }
}
