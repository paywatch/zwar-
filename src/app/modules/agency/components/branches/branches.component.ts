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
  taBranchesList: any[] = [];
  districtList: any;
  myForm: FormGroup;
  newBranch: any;
  found: any;
  brachID: any;
  selectedBranch: any;

  constructor(
    private fb: FormBuilder,
    private agencyService: AgencyService,
    private toast: ToastrService,
    private router: Router) { }


  ngOnInit(): void {
    this.initForm();
    this.getSessionStorageDaTA();
    setTimeout(() => {
      this.getAllAgencyBranchs();
    }, 1000);
  }

  getSessionStorageDaTA() {
    this.loadDistrictList();
    this.found = JSON.parse(sessionStorage.getItem('branch'));
    this.brachID = JSON.parse(sessionStorage.getItem('branchID')) || {};
    console.log(this.brachID);
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

  getAllAgencyBranchs() {
    this.agencyService.getBranch().subscribe(branches => {
      if (this.found) {
        this.selectedBranch = branches.find(b => b.id == this.brachID);
        console.log(this.selectedBranch);
        if (this.selectedBranch) {
          this.taBranchesList = [].concat(this.selectedBranch);
        }
        else {
          this.taBranchesList = [];
        }
      }
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

  updateBranchData() {
    this.selectedBranch = {...this.taBranchesList};
    this.selectedBranch.id = this.brachID;
    this.agencyService.updateBranchData(this.selectedBranch);
    this.toast.success('تم التعديل');
    this.router.navigate(['agency/display']);
  }

  deleteBranchData() {
    this.agencyService.updateBranchData(this.selectedBranch);
    this.toast.info('تم الحذف');
  }

  onRowDelete(id) {
    this.taBranchesList = this.taBranchesList.filter((branch: any) => branch.$$ID !== id);
  }

  updateAgencyBranch() {
    this.selectedBranch = this.taBranchesList;
    console.log(this.selectedBranch);
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
