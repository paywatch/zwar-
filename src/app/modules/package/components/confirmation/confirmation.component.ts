import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from '../../services/package-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';


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
  matwafImage: any;
  modalRef: any;
  program: any;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private packaService: PackageService,
    private modalService: BsModalService
    ) {
  }

  ngOnInit(): void {
    this.getBasicData();
    this.ID = JSON.parse(sessionStorage.getItem('ID')) || {};
    this.program = JSON.parse(sessionStorage.getItem('program')) || {};
    this.getAirPorts();
    this.getUmrahSeason();
    this.getUmrahDirection();
    this.getRoomType();
    this.getMatwafImage();
  }

  getBasicData() {
    this.base = JSON.parse(sessionStorage.getItem('base')) || {};
    this.matwaf = JSON.parse(sessionStorage.getItem('group')) || {};
    this.room = JSON.parse(sessionStorage.getItem('room')) || {};
    this.matwafImage = JSON.parse(sessionStorage.getItem('MatwafImage')) || [];
    this.package = {
      ...this.base,
      ...this.matwaf,
      ...this.room
    };
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getAirPorts() {
    this.packaService.getAirPorts().subscribe(airport => {
      this.package.internalAirPort = airport.find(air => air.id == this.base.localAirportID).name;
    });
  }

  getMatwafImage() {
    this.packaService.getMatwafFileFromStorage().subscribe(files => {
      const matwafImage = new Set(this.matwafImage);
      this.package.matwafImage = files.filter(file => matwafImage.has(file.id));
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
    this.packaService.addPackages(this.package)
      .subscribe(res => {
        this.router.navigate(['/package/congratulate']);
        this.toast.success('تمت الاضافه');
      }, (error) => this.toast.error('حدث خطا ما'));
  }
}
