import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { textChangeRangeIsUnchanged } from 'typescript';
import { AgencyService } from '../../services/agency/agency.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  agency: any;
  ID: string;
  agencyBasic: any;
  companyLogo: any;

  constructor(
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.ID = this.activatedRoute.snapshot.params['id'];
    this.agencyBasic = JSON.parse(sessionStorage.getItem('agencyBasic'));
    this.getAgency(this.ID);
    setTimeout(() => {
      this.getCountry();
    }, 2000);
  }

  getAgency(id) {
    this.agencyService.getAllData().subscribe(res => {
      this.agency = res.find(r => r.id = id);
    });
  }

  getCountry() {
    this.agencyService.getAllCountries().subscribe(country => {
      const find = country.find(c => c.id == this.agencyBasic.countryId).name;
      this.agency.countryName = find;
    });
  }



  backToLogin() {
    this.router.navigate(['/auth/login']);
    sessionStorage.setItem('agencyID', JSON.stringify(this.ID));
    sessionStorage.removeItem('agencyBasic');
    sessionStorage.removeItem('licence');
    sessionStorage.removeItem('register');
    sessionStorage.removeItem('branches');
  }
}
