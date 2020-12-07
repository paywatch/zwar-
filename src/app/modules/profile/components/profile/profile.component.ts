import { Component, OnInit } from '@angular/core';
import { AgencyService } from 'src/app/modules/agency/services/agency/agency.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  agency: any;

  constructor(private agencyService: AgencyService) {
  }

  ngOnInit(): void {
    const ID = JSON.parse(sessionStorage.getItem('agencyID'));
    this.getAgencyDetails(ID);
  }

  getAgencyDetails(ID) {
    this.agencyService.getAllData().subscribe(agency => {
      this.agency = agency.find(a => a.id == ID);
      console.log(this.agency);
    });
  }
}
