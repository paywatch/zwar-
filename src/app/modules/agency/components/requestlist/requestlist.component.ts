import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../../services/agency/agency.service';

@Component({
  selector: 'app-requestlist',
  templateUrl: './requestlist.component.html',
  styleUrls: ['./requestlist.component.css']
})
export class RequestlistComponent implements OnInit {

  agencies: any;
  agencyType: any;
  agencyName: any;
  agencyID: any;
  agencytype: any;
  searchResult: any;
  page;

  constructor(
    private agencyService: AgencyService,
    private toaster: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllAgency();
    this.getAgencyCategory();
  }

  getAgencyCategory() {
    this.agencyService.getAgencyType().subscribe(type => {
      this.agencyType = type;
    });
  }

  getValue(event) {
    this.agencytype = event;
  }

  resetForm() {
    this.agencytype = '';
    this.agencyID = '';
    this.agencyName = '';
    this.searchResult = null;
  }

  agencySearch() {
    // tslint:disable-next-line:max-line-length
    const find = this.agencies.find(agency =>  agency.tAName == this.agencyName || agency.id == this.agencyID || agency.tAType == this.agencytype);
    this.searchResult = find;
  }

  getAllAgency() {
    this.agencyService.getAllData().subscribe(agency => {
      if (agency) {
        this.agencies = agency;
      }
      else {
        this.agencies = {};
      }
    });
  }

}
