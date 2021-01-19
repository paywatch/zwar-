import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-umrah-season',
  templateUrl: './umrah-season.component.html',
  styleUrls: ['./umrah-season.component.css']
})
export class UmrahSeasonComponent implements OnInit, OnDestroy {

  umrahSeasonForm: FormGroup;
  sub: Subscription;
  umrahSeason: any;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private packageService: PackageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getUmrahSeason();
  }


  initForm() {
    this.umrahSeasonForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getUmrahSeason() {
    this.sub = this.packageService.getUmrahSeason().subscribe(res => {
      this.umrahSeason = res;
    });
  }

  addUmrahSeason() {
    const payload = this.umrahSeasonForm.value;
    this.packageService.addUmrahSeason(payload);
    this.toast.success('تمت الاضافه');
    this.umrahSeasonForm.reset();
  }

  deleteItem(item) {
    this.packageService.deleteUmrahSeason(item);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
