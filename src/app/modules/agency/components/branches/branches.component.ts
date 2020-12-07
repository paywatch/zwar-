import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../../services/agency/agency.service';



@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  main: any;
  // city: string;
  taBranchesList: any[];
  districtList: any;
  myForm: FormGroup;
  newBranch: any;

  constructor(
    private fb: FormBuilder,
    private agencyService: AgencyService,
    private toast: ToastrService,
    private router: Router) { }


  ngOnInit(): void {
    this.initForm();
    this.getSessionStorageDaTA();
  }

  getSessionStorageDaTA() {
    this.loadDistrictList();
    const found = JSON.parse(sessionStorage.getItem('branches'));
    found ? this.taBranchesList = found : this.taBranchesList = [];
  }

  initForm() {
    this.myForm = this.fb.group({
      tABranchType: [],
      tABranchName: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[\u0621-\u064A0-9a-zA-Z ]+$/)]],
      tADistrictID: ['', Validators.required],
      tABranchAddress: ['', [Validators.required, Validators.maxLength(50)]],
      tABranchLongitude: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^-?\d+$/)]],
      tABranchLatitude: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^-?\d+$/)]],
      tABranchPhoneNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9+]*$/)]],
      tABranchMobileNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9+]*$/)]],
      tABranchFaxNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      tABranchEmail: ['', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/)]],
    });
  }

  SaveData() {
    if (this.myForm.valid) {
      this.newBranch = this.myForm.value;
      this.newBranch.$$ID = this.taBranchesList.length + 1;
      this.taBranchesList.push(this.newBranch);
      this.myForm.reset();
    }
  }

  onRowDelete(id) {
    this.taBranchesList = this.taBranchesList.filter((branch: any) => branch.$$ID !== id);
  }

  createBrnaches() {
    if (this.taBranchesList.length) {
      this.agencyService.saveBranch(this.newBranch)
        .subscribe((res: any) => {
          if (res) {
            this.toast.success('تم الحفظ بنجاح');
            this.myForm.reset();
            this.router.navigate(['agency/display']);
          }
        });
    }
  }

  loadDistrictList() {
    this.agencyService.getDistrictList().subscribe((districts: any) => {
      this.districtList = districts;
    });
  }
}
