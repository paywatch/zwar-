import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../../services/agency/agency.service';

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
    this.changeMinTourAuth();
    this.changeFTAVMember();
    this.changeFITTMember();
    this.getAgencyType();
  }

  initForm() {
    this.agencyForm = this.formBuilder.group({
      tABranchAddress: [],
      tABranchEmail: [],
      tABranchFaxNo: [],
      tADistrictID: [],
      tADescription: [],
      tABranchLatitude: [],
      tABranchLongitude: [],
      tABranchMobileNo: [],
      tABranchName: [],
      tABranchPhoneNo: [],
      tABranchType: [],
      tACommRegExpiryDate: [],
      tACommRegFile: [],
      tACommRegIssueDate: [],
      tACommeRegNo: [],
      tAFITTMemberExpiryDate: [],
      tAFITTMemberFile: [],
      tAFITTMemberIssueDate: [],
      tAFITTMemberNo: [],
      tAFTAVMemberExpiryDate: [],
      tAFTAVMemberFile: [],
      tAFTAVMemberIssueDate: [],
      tAFTAVMemberNo: [],
      tALogo: [],
      tAMinTourAuthExpiryDate: [],
      tAMinTourAuthFile: [],
      tAMinTourAuthIssueDate: [],
      tAMinTourAuthNo: [],
      tAName: [],
      tAType: [],
      tAWebsite: [],
      taid: [],
      $$ID: [],
      tAOwnerFullName: [],
      tAOwnerNationalID: [],
      tAOwnerPhoneNo: [],
      $$commRegFile: [],
      $$isFITTMember: [true],
      $$isFTAVMember: [true],
      $$isMinTourAuth: [true],
      $$logoFile: [],
      agencyID: [],
      countryId: []
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

  getSingleAgency(id) {
    this.agencyService.getAllData().subscribe(agency => {
      this.agency = agency.find(a => a.id == id);
      this.agencyForm.patchValue(this.agency);
    });
  }

  getAgencyType() {
    this.agencyService.getAgencyType().subscribe(res => {
      if (res) {
        this.agencyType = res;
      }
    });
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
    this.agencyService.updateAgency(this.agency);
    this.toaster.info('تم التعديل');
    this.router.navigate(['/agency/edit']);
  }
}
