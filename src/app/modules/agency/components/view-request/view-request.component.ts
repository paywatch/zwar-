import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../../services/agency/agency.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  agency: any;

  constructor(
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    const ID = this.activatedRoute.snapshot.params['id'];
    this.getAllAgencyData(ID);
  }

  getAllAgencyData(id) {
    this.agencyService.getAllData().subscribe(agency => {
      const found = agency.find(a => a.id == id);
      this.agency = found;
      console.log(this.agency);
    });
  }

  acceptAgency() {
    this.agency.status = 'مقبول';
    this.agencyService.updateAgency(this.agency);
    this.toast.success('تم قبول الطلب');
    this.router.navigate(['/agency/request-list']);
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
    this.agencyService.deleteAgency(this.agency);
  }
}