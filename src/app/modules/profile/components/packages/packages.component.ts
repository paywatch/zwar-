import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileService } from '../../services/profile/profile.service';


@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  packagesList$: Observable<any>;
  programId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  createNewPackage() {
  }
}
