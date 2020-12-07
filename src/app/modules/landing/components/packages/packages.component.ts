import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LandingService } from '../../services/landing/landing.service';


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  packages$: Observable<any>;

  constructor(private landingService: LandingService) { }

  ngOnInit(): void {
    this.packages$ = this.landingService.getPakcage({
      programPrice: 1000,
      programPriceEnd: 1100,
    });
  }

}
