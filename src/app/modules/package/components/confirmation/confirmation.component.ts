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

  constructor(
    private router: Router,
    private toast: ToastrService,
    private packaService: PackageService) {
  }

  ngOnInit(): void {
    this.getBasicData();
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

  back() {
    this.router.navigate(['/package/room-data']);
  }

  confirm() {
    this.packaService.addPackages(this.package)
    .subscribe(res => {
        this.router.navigate(['/package/congratulate']);
        this.toast.success('تمت الاضافه');
    }, (error) => this.toast.error('حدث خطا ما'));
  }
}
