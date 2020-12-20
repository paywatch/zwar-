import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  package: any;
  base: any;
  matwaf: any;
  room: any;
  ID: string;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private packaService: PackageService) {
  }

  ngOnInit(): void {
    this.getBasicData();
    this.ID = JSON.parse(sessionStorage.getItem('ID')) || {};
    this.getAirPorts();
    this.getUmrahSeason();
    this.getUmrahDirection();
    this.getRoomType();
  }

  getBasicData() {
    this.base = JSON.parse(sessionStorage.getItem('base')) || {};
    this.matwaf = JSON.parse(sessionStorage.getItem('group')) || {};
    this.room = JSON.parse(sessionStorage.getItem('room')) || {};
    this.package = {
      ...this.base,
      ...this.matwaf,
      ...this.room
    };
    console.log(this.package);
  }

  getAirPorts() {
    this.packaService.getAirPorts().subscribe(airport => {
      this.package.internalAirPort = airport.find(air => air.id == this.base.localAirportID).name;
    });
  }

  getUmrahSeason() {
    this.packaService.getUmrahSeason().subscribe(season => {
      this.package.umrahSeasonName = season.find(s => s.id == this.base.packageSeasonID).name;
    });
  }

  getUmrahDirection() {
    this.packaService.getUmrahDirection().subscribe(direction => {
      this.package.directionName = direction.find(d => d.id == this.base.itineraryID).name;
    });
  }

  getRoomType() {
    this.packaService.getRoomType().subscribe(roomType => {
      this.package.roomTypeName = roomType.find(r => r.id == this.room.roomTypeID).name;
    });
  }

  back() {
    this.router.navigate(['/package/room-data']);
  }

  confirm() {
    this.package.ID = this.ID;
    console.log(this.package.ID);
    this.packaService.addPackages(this.package)
      .subscribe(res => {
        this.router.navigate(['/package/congratulate']);
        this.toast.success('تمت الاضافه');
      }, (error) => this.toast.error('حدث خطا ما'));
  }
}
