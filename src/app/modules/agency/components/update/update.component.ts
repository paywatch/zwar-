import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GreaterThan } from '../../../../_helpers/greater-than.validator';
import { LessThanToday } from '../../../../_helpers/lessThanToday.validator';
import { AgencyService } from '../../services/agency/agency.service';

// IMPORT MOMENT FOR FORMAT DATE IN NICE WAY;
import * as moment from 'moment';
import { Branch } from '../../models/branch';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  agency: any;
  agencyForm: FormGroup;
  agencyType: any[];
  ID: any;
  countries: any;
  district: any;
  branchFrom: FormGroup;
  branches: any;
  page = 1;
  ownerForm: FormGroup;
  ownerList: any;
  editMode: boolean;
  editBranchMode: boolean;
  collectBranchForm: any;
  collcectOwnerForm: any;
  selectedOwner: any;
  selectedBranch: any;

  constructor(
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.ID = this.activatedRoute.snapshot.params['id'];
    this.getSingleAgency(this.ID);
    this.initForm();
    this.initBranchForm();
    this.initOwnerForm();
    this.changeMinTourAuth();
    this.changeFTAVMember();
    this.changeFITTMember();
    this.getAgencyType();
    this.getCountries();
    this.getDistrictList();
  }

  initForm() {
    this.agencyForm = this.formBuilder.group({
      tAName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]/)]],
      countryId: ['', Validators.required],
      tAType: ['', Validators.required],
      tAWebsite: ['', [Validators.required, Validators.pattern(/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)]],
      tACommeRegNo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tACommRegIssueDate: ['', [Validators.required, LessThanToday]],
      tACommRegExpiryDate: ['', Validators.required],
      tADescription: ['', [Validators.required, Validators.maxLength(200)]],
      tAMinTourAuthNo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tAMinTourAuthIssueDate: ['', [Validators.required, LessThanToday]],
      tAMinTourAuthExpiryDate: ['', Validators.required],
      tAFTAVMemberNo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tAFTAVMemberIssueDate: ['', [Validators.required, LessThanToday]],
      tAFTAVMemberExpiryDate: ['', Validators.required],
      tAFITTMemberNo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tAFITTMemberIssueDate: ['', [Validators.required, LessThanToday]],
      tAFITTMemberExpiryDate: ['', Validators.required],
      tABranchType: ['', Validators.required],
      tACommRegFile: [],
      tAFITTMemberFile: [],
      tAFTAVMemberFile: [],
      tALogo: [],
      tAMinTourAuthFile: [],
      $$ID: [],
      $$commRegFile: [],
      $$isFITTMember: [true],
      $$isFTAVMember: [true],
      $$isMinTourAuth: [true],
      $$logoFile: [],
    }, {
      validators: [GreaterThan('tACommRegIssueDate', 'tACommRegExpiryDate'),
      GreaterThan('tAMinTourAuthIssueDate', 'tAMinTourAuthExpiryDate'),
      GreaterThan('tAFTAVMemberIssueDate', 'tAFTAVMemberExpiryDate'),
      GreaterThan('tAFITTMemberIssueDate', 'tAFITTMemberExpiryDate')
      ]
    });
  }

  initBranchForm() {
    this.branchFrom = this.formBuilder.group({
      tABranchName: ['', [Validators.required, Validators.pattern(/^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z]+[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_]*$/)]],
      tABranchAddress: ['', Validators.required],
      tABranchEmail: ['', [Validators.required, Validators.email]],
      tABranchFaxNo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tADistrictID: ['', Validators.required],
      tABranchType: [],
      tABranchLatitude: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tABranchLongitude: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tABranchMobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      tABranchPhoneNo: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });
  }

  initOwnerForm() {
    this.ownerForm = this.formBuilder.group({
      tAOwnerFullName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]],
      tAOwnerNationalID: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      tAOwnerPhoneNo: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]]
    });
  }

  getSingleAgency(id) {
    this.agencyService.getAllData().subscribe(agency => {
      this.agency = agency.find(a => a.id == id);
      console.log(this.agency);
      this.branches = this.agency.branch;
      this.ownerList = this.agency.ownerList;
      this.agencyForm.patchValue(this.agency);
    });
  }


  addOwner() {
    this.collcectOwnerForm = this.ownerForm.value;
    if (this.ownerForm.valid) {
      this.collcectOwnerForm.$$ID = this.ownerList.length + 1;
      this.ownerList.push(this.collcectOwnerForm);
    }
    this.ownerForm.reset();
    this.editMode = false;
  }

  editOwner(item) {
    this.selectedOwner = this.ownerList.find(owner => owner.$$ID == item.$$ID);
    console.log(this.selectedOwner);
    this.ownerForm.patchValue(this.selectedOwner);
    this.editMode = true;
  }

  _editOwner() {
    const find = this.ownerList.findIndex(owner => owner.$$ID == this.selectedOwner.$$ID);
    this.ownerList[find] = this.ownerForm.value;
    this.ownerList[find].$$ID = this.selectedOwner.$$ID;
    console.log(this.ownerList[find]);
  }

  onOwnerDelete(ID) {
    this.ownerList = this.ownerList.filter(owner => owner.$$ID !== ID);
  }


  getDistrictList() {
    this.agencyService.getDistrictList().subscribe(district => {
      if (district) {
        this.district = district;
      }
    });
  }

  addBranch() {
    this.editBranchMode = false;
    this.collectBranchForm = this.branchFrom.value;
    if (this.branchFrom.valid) {
      this.collectBranchForm.$$ID = this.branches.length + 1;
      this.collectBranchForm.tADistrictID = this.district.find(d => d.id == this.collectBranchForm.tADistrictID).name;
      this.branches.push(this.collectBranchForm);
      console.log(this.branches);
      this.branchFrom.reset();
    }
  }

  editBranch(item) {
    this.editBranchMode = true;
    this.selectedBranch = this.branches.find(branch => branch.$$ID == item.$$ID);
    this.branchFrom.patchValue(this.selectedBranch);
    console.log(this.selectedBranch);
  }

  _editBranch() {
    const find = this.branches.findIndex(branch => branch.$$ID == this.selectedBranch.$$ID);
    const payload = this.branchFrom.value;
    payload.tADistrictID = this.district.find(dis => dis.id == payload.tADistrictID).name;
    this.branches[find] = this.branchFrom.value;
    this.branches[find].tADistrictID = payload.tADistrictID;
    this.branches[find].$$ID = this.selectedBranch.$$ID;
    console.log(this.branches[find]);
    this.branchFrom.reset();
  }

  onRowDelete(item) {
    this.branches = this.branches.filter(branch => branch.$$ID !== item);
  }

  getAgencyType() {
    this.agencyService.getAgencyType().subscribe(res => {
      if (res) {
        this.agencyType = res;
      }
    });
  }

  getCountries() {
    this.agencyService.getAllCountries().subscribe(country => {
      if (country) {
        this.countries = country;
      }
    });
  }

  get $$isMinTourAuth() {
    return this.agencyForm.get('$$isMinTourAuth').value;
  }

  get $$isFTAVMember() {
    return this.agencyForm.get('$$isFTAVMember').value;
  }

  get $$isFITTMember() {
    return this.agencyForm.get('$$isFITTMember').value;
  }

  changeMinTourAuth() {
    if (this.$$isMinTourAuth) {
      this.agencyForm.get('tAMinTourAuthNo').enable();
      this.agencyForm.get('tAMinTourAuthIssueDate').enable();
      this.agencyForm.get('tAMinTourAuthExpiryDate').enable();
      this.agencyForm.get('tAMinTourAuthFile').enable();
    }
    else {
      this.agencyForm.get('tAMinTourAuthNo').disable();
      this.agencyForm.get('tAMinTourAuthIssueDate').disable();
      this.agencyForm.get('tAMinTourAuthExpiryDate').disable();
      this.agencyForm.get('tAMinTourAuthFile').disable();
    }

    this.agencyForm.updateValueAndValidity();
  }

  changeFTAVMember() {
    if (this.$$isFTAVMember) {
      this.agencyForm.get('tAFTAVMemberNo').enable();
      this.agencyForm.get('tAFTAVMemberIssueDate').enable();
      this.agencyForm.get('tAFTAVMemberExpiryDate').enable();
      this.agencyForm.get('tAFTAVMemberFile').enable();
    }
    else {
      this.agencyForm.get('tAFTAVMemberNo').disable();
      this.agencyForm.get('tAFTAVMemberIssueDate').disable();
      this.agencyForm.get('tAFTAVMemberExpiryDate').disable();
      this.agencyForm.get('tAFTAVMemberFile').disable();
    }
    this.agencyForm.updateValueAndValidity();

  }

  changeFITTMember() {
    if (this.$$isFITTMember) {
      this.agencyForm.get('tAFITTMemberNo').enable();
      this.agencyForm.get('tAFITTMemberIssueDate').enable();
      this.agencyForm.get('tAFITTMemberExpiryDate').enable();
      this.agencyForm.get('tAFITTMemberFile').enable();

    } else {
      this.agencyForm.get('tAFITTMemberNo').disable();
      this.agencyForm.get('tAFITTMemberIssueDate').disable();
      this.agencyForm.get('tAFITTMemberExpiryDate').disable();
      this.agencyForm.get('tAFITTMemberFile').disable();
    }
    this.agencyForm.updateValueAndValidity();
  }

  submit() {
    this.agency = this.agencyForm.value;
    this.agency.id = this.ID;
    this.agency.ownerList = this.ownerList;
    this.agency.branch = this.branches;
    this.agencyService.updateAgency(this.agency);
    this.toaster.info('تم التعديل');
    this.router.navigate(['/agency/edit']);
  }
}
