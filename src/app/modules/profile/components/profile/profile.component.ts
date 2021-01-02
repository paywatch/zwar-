import { Component, OnInit, TemplateRef } from '@angular/core';
import { setServers } from 'dns';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgencyService } from 'src/app/modules/agency/services/agency/agency.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  agency: any;
  companyLogo: string;
  comRegFile: string;
  modalRef: BsModalRef;
  modalTourismRef: BsModalRef;
  tourismFile: any;
  FtavFiles: any;
  tunisFilesID: any;

  constructor(
    private agencyService: AgencyService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    const userID = JSON.parse(localStorage.getItem('user'));
    this.getAgencyDetails(userID.user.uid);
    this.getSessionStorageData();
    setTimeout(() => {
      this.getCompanyLogo();
      this.getComRegFile();
      this.getTourismFile();
      this.getFtavFiles();
      this.getTounisFile();
    }, 1000);
  }

  getSessionStorageData() {
    this.companyLogo = JSON.parse(sessionStorage.getItem('agencyFile')) || {};
    this.comRegFile = JSON.parse(sessionStorage.getItem('comRegFile')) || {};
    this.tourismFile = JSON.parse(sessionStorage.getItem('tourismFiles')) || {};
    this.FtavFiles = JSON.parse(sessionStorage.getItem('FtavFiles')) || {};
    this.tunisFilesID = JSON.parse(sessionStorage.getItem('tunisFilesID')) || {};
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getCompanyLogo() {
    this.agencyService.getAgencyImage().subscribe(images => {
      const find = images.find(image => image.id == this.companyLogo);
      this.agency.companyLogo = find;
    });
  }

  getComRegFile() {
    this.agencyService.getComRegFile().subscribe(files => {
      const find = files.find(file => file.id == this.comRegFile);
      this.agency.comRegFile = find;
      console.log(this.agency.comRegFile);
    });
  }

  getTourismFile() {
    this.agencyService.getTourismFile().subscribe(files => {
      const find = files.find(file => file.id == this.tourismFile);
      this.agency.tourismFile = find;
      console.log(this.agency.tourismFile);
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

  getAgencyDetails(ID) {
    this.agencyService.getAllData().subscribe(agency => {
      this.agency = agency.find(a => a.userID == ID);
      console.log(this.agency);
    });
  }
}
