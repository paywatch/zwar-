import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../../services/agency/agency.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  agency: any;
  agencyNeedUpdate: boolean;
  companyLogo: any;
  comRegFile: any;
  tourismFile: any;
  FtavFiles: any;
  tunisFilesID: any;
  modalRef: BsModalRef;

  constructor(
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    const ID = this.activatedRoute.snapshot.params['id'];
    this.getAllAgencyData(ID);
    setTimeout(() => {
      this.checkAgencyData();
    }, 2000);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getAllAgencyData(id) {
    this.agencyService.getAllData().subscribe(agency => {
      const found = agency.find(a => a.id == id);
      this.agency = found;
    });
  }

  getCoutry() {

  }

  acceptAgency() {
    this.agency.status = 'مقبول';
    this.agencyService.updateAgency(this.agency);
    this.toast.success('تم قبول الطلب');
    this.router.navigate(['/agency/request-list']);
  }

  checkAgencyData() {
    const entries = Object.values(this.agency);
    for (const key of entries) {
      if (key == '' || null) {
        this.agencyNeedUpdate = true;
      }
    }
  }

  dismissAgency() {
    this.agency.status = 'مرفوض';
    this.agencyService.updateAgency(this.agency);
    this.toast.error('تم رفض الطلب');
    this.router.navigate(['/agency/request-list']);
  }

  freezAccount() {
    this.agency.status = 'مجمد';
    this.agencyService.updateAgency(this.agency);
    this.toast.error('تم تجميد الحساب');
    this.router.navigate(['/agency/request-list']);
  }

  blockAccount() {
    this.agency.status = 'تم الغاؤه';
    this.agencyService.updateAgency(this.agency);
    this.toast.error('تم حظر الحساب');
    this.router.navigate(['/agency/request-list']);
  }

  deleteAgency() {
    this.router.navigate(['/agency/request-list']);
    localStorage.removeItem('tourismFiles');
    localStorage.removeItem('FtavFiles');
    localStorage.removeItem('comRegFile');
    localStorage.removeItem('agencyFile');
    localStorage.removeItem('tunisFilesID');
    this.agencyService.deleteAgency(this.agency);
  }
}
