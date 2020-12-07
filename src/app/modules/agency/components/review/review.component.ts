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

  constructor(
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.ID = this.activatedRoute.snapshot.params['id'];
    this.getAgency(this.ID);
  }

  getAgency(id) {
    this.agencyService.getAllData().subscribe(res => {
      this.agency = res.find(r => r.id = id);
      console.log(this.agency);
    });
  }

  backToLogin() {
    this.router.navigate(['/auth/login']);
    sessionStorage.setItem('agencyID', JSON.stringify(this.ID));
  }
}
