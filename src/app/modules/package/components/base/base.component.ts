import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AfterToday } from '../../../../_helpers/afterToday.validator';
import { GreaterThan } from '../../../../_helpers/greater-than.validator';
import * as moment from 'moment';


import { PackageService } from '../../services/package-service.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  baseForm: FormGroup;
  base: any;
  airPorts: any;
  seasons: any;
  umrahDirection: any;
  packageBasicID: string;
  selectedBasic: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private packageService: PackageService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    this.patchForm();
    this.getAirPorts();
    this.getUmrahSeason();
    this.getUmrahDirection();
    this.getPackageBasicData();
    setTimeout(() => {
      this.getPackageBasicData();
    });
  }

  initForm(): void {
    this.baseForm = this.formBuilder.group({
      localAirportID: ['', Validators.required],
      packageDepartureDate: ['', [Validators.required, AfterToday]],
      packageReturnDate: ['', Validators.required],
      packageCapacity: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      packageAvailableSeats: ['',
        [Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[0-9]*$/)]],
      packageSeasonID: ['', Validators.required],
      itineraryID: ['', Validators.required]
    }, {
      validators: GreaterThan('packageDepartureDate', 'packageReturnDate')
    });
  }

  patchForm() {
    const Id = this.activatedRoute.snapshot.paramMap.get('programId');
    sessionStorage.setItem('ID', JSON.stringify(Id));
    this.base = JSON.parse(sessionStorage.getItem('base'));
    console.log(this.base);
    this.packageBasicID = JSON.parse(sessionStorage.getItem('packageBasicID')) || {};
  }

  getAirPorts() {
    this.packageService.getAirPorts().subscribe(airport => {
      this.airPorts = airport;
      console.log(this.airPorts);
    });
  }

  getUmrahSeason() {
    this.packageService.getUmrahSeason().subscribe(season => {
      this.seasons = season;
      console.log(this.seasons);
    });
  }

  getUmrahDirection() {
    this.packageService.getUmrahDirection().subscribe(direction => {
      this.umrahDirection = direction;
    });
  }

  getPackageBasicData() {
    this.packageService.getbaseData().subscribe(basic => {
      if (this.base) {
        this.selectedBasic = basic.find(b => b.id == this.packageBasicID);
        console.log(this.selectedBasic);
        this.baseForm.patchValue(this.selectedBasic);
      }
    });
  }

  createPackage() {
    const payload = this.baseForm.value;
    this.packageService.createPackage(payload)
      .subscribe((res) => {
        if (res) {
          this.toast.success('تمت الاضافه');
          this.router.navigate(['/package/group']);
        }
      },
        (err) => {

          this.toast.error('لقد حدث خطأ ما');
        });
  }

  updatePackageBasic() {
    this.selectedBasic = this.baseForm.value;
    this.selectedBasic.id = this.packageBasicID;
    this.packageService.updatePackageBasic(this.selectedBasic);
    this.router.navigate(['/package/group']);
    this.toast.success('تم التعديل');
  }

  deletePackageBasic() {
    this.packageService.deletePackageBasic(this.selectedBasic);
    this.toast.info('تم الحذف');
  }
}
