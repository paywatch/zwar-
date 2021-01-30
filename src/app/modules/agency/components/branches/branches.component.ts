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
  editMode: boolean;
  singleBranch: any;
  page;

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
    this.brachID = JSON.parse(sessionStorage.getItem('branchID')) || {};
    this.found = JSON.parse(sessionStorage.getItem('branch')) || [];
    if (this.found !== null) {
      this.taBranchesList = this.found;
    }
  }

  loadDistrictList() {
    this.agencyService.getDistrictList().subscribe((districts: any) => {
      this.districtList = districts;
    });
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

  editBranch(item) {
    this.singleBranch = this.taBranchesList.find(branch => branch.$$ID == item.$$ID);
    this.myForm.patchValue(this.singleBranch);
    this.editMode = true;
  }

  _editBranch() {
    const find = this.taBranchesList.findIndex(branch => branch.$$ID == this.singleBranch.$$ID);
    this.taBranchesList[find] = this.myForm.value;
  }

  onRowDelete(id) {
    this.taBranchesList = this.taBranchesList.filter((branch: any) => branch.$$ID !== id);
  }

  createBrnaches() {
    this.agencyService.saveBranch(this.taBranchesList)
      .subscribe((res: any) => {
        if (res) {
          this.toast.success('تم الحفظ بنجاح');
          this.myForm.reset();
          this.router.navigate(['agency/display']);
        }
      });
  }

  updateBranchData() {
    this.agencyService.updateBranchData(this.taBranchesList);
    this.toast.success('تم التعديل');
    this.router.navigate(['agency/display']);
  }

  deleteBranchData() {
    this.agencyService.deleteBranchData(this.selectedBranch);
    this.router.navigate(['/agency/license']);
    this.toast.success('تم الحذف');
    sessionStorage.removeItem('branch');
  }
}
