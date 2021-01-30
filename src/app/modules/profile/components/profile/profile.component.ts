import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgencyService } from 'src/app/modules/agency/services/agency/agency.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  agency: any;
  modalRef: BsModalRef;
  modalTourismRef: BsModalRef;

  constructor(
    private agencyService: AgencyService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    const userID = JSON.parse(localStorage.getItem('user'));
    this.getAgencyDetails(userID.user.uid);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getAgencyDetails(ID) {
    this.agencyService.getAllData().subscribe(agency => {
      this.agency = agency.find(a => a.userID == ID);
    });
  }
}
