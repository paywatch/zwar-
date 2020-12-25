import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AgencyService } from '../../services/agency/agency.service';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  agency: any;
  basicData: any;
  license: any;
  branch: any[];
  basics: any;
  licenses: any;
  branches: any;
  user: any;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private agencyService: AgencyService) {
  }

  ngOnInit(): void {
    this.getSessionStorgeData();
    this.getFullAgencyData();
    this.getAllCountries();
  }

  getSessionStorgeData() {
    this.basics = JSON.parse(sessionStorage.getItem('agencyBasic')) || {};
    this.licenses = JSON.parse(sessionStorage.getItem('licence')) || {};
    this.branches = JSON.parse(sessionStorage.getItem('branches')) || {};
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  getFullAgencyData() {
    this.agency = {
      ...this.basics,
      ...this.licenses,
      ...this.branches
    };
    if (!this.agency) {
      this.router.navigate(['/']);
    }
  }

  getAllCountries() {
    this.agencyService.getAllCountries().subscribe(countries => {
      this.agency.countryName = countries.find(c => c.id == this.agency.countryId).name;
    });
  }

  confirm() {
    this.agency.userID = this.user.user.uid;
    console.log(this.agency.userID);
    this.agency.status = 'جديد';
    this.agencyService.confirm(this.agency).subscribe(res => {
      if (res) {
        this.router.navigate(['agency/edit']);
        this.toast.success('Added Successfullty');
      }
      else {
        this.toast.error('Something Went Wrong');
      }
    });
  }
}

    