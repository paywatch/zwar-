import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AgencyService } from '../../services/agency/agency.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  agency: any;
  basicData: any;
  license: any;
  branch: any[];
  basics: any;
  licenses: any;
  branches: any;
  user: any;
  FtavFiles: any;
  tunisFilesID: any;
  tourismFile: any;
  comRegFile: any;
  companyLogo: any;
  modalRef: BsModalRef;

  constructor(
    private router: Router,
    private toast: ToastrService,
    private agencyService: AgencyService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.getSessionStorgeData();
    this.getFullAgencyData();
    this.getAllCountries();
    setTimeout(() => {
      this.getCompanyLogo();
      this.getComRegFile();
      this.getTourismFile();
      this.getFtavFiles();
      this.getTounisFile();
    }, 1000);
  }

  getSessionStorgeData() {
    this.basics = JSON.parse(sessionStorage.getItem('agencyBasic')) || {};
    this.license = JSON.parse(sessionStorage.getItem('license')) || {};
    this.branches = JSON.parse(sessionStorage.getItem('branch')) || [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.companyLogo = JSON.parse(sessionStorage.getItem('agencyFile')) || [];
    this.comRegFile = JSON.parse(sessionStorage.getItem('comRegFile')) || [];
    this.tourismFile = JSON.parse(sessionStorage.getItem('tourismFiles')) || [];
    this.FtavFiles = JSON.parse(sessionStorage.getItem('FtavFiles')) || [];
    this.tunisFilesID = JSON.parse(sessionStorage.getItem('tunisFilesID')) || [];
  }

  getFullAgencyData() {
    this.agency = {
      ...this.basics,
      ...this.license,
      branch: this.branches
    };
    console.log(this.agency.branch);
    if (!this.agency) {
      this.router.navigate(['/']);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getCompanyLogo() {
    this.agencyService.getAgencyImage().subscribe(images => {
      const companySet = new Set(this.companyLogo);
      this.agency.companyLogo = images.filter(logo => companySet.has(logo.id));
    });
  }

  getComRegFile() {
    this.agencyService.getComRegFile().subscribe(files => {
      const find = files.find(file => file.id == this.comRegFile);
      this.agency.comRegFile = find;
    });
  }

  getTourismFile() {
    this.agencyService.getTourismFile().subscribe(files => {
      const find = files.find(file => file.id == this.tourismFile);
      this.agency.tourismFile = find;
    });
  }

  getFtavFiles() {
    this.agencyService.getFtavFile().subscribe(files => {
      const find = files.find(file => file.id == this.FtavFiles);
      this.agency.FtavFiles = find;
    });
  }

  getTounisFile() {
    this.agencyService.getTunisFile().subscribe(files => {
      const find = files.find(file => file.id == this.tunisFilesID);
      this.agency.tunisFiles = find;
    });
  }

  getAllCountries() {
    this.agencyService.getAllCountries().subscribe(countries => {
      this.agency.countryName = countries.find(c => c.id == this.agency.countryId).name;
    });
  }

  confirm() {
    this.agency.userID = this.user.user.uid;
    this.agency.status = 'جديد';
    this.agencyService.confirm(this.agency);
    this.router.navigate(['agency/edit']);
    this.toast.success('تم الاضافه بنجاح');
    sessionStorage.removeItem('license');
    sessionStorage.removeItem('licenseID');
    sessionStorage.removeItem('branch');
    sessionStorage.removeItem('branchID');
    sessionStorage.removeItem('register');
    sessionStorage.removeItem('agecyID');
    sessionStorage.removeItem('agency');
    sessionStorage.removeItem('basicID');
    sessionStorage.removeItem('tourismFiles');
    sessionStorage.removeItem('FtavFiles');
    sessionStorage.removeItem('comRegFile');
    sessionStorage.removeItem('agencyFile');
    sessionStorage.removeItem('tunisFilesID');
  }
}

