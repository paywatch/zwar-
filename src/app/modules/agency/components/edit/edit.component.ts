import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from '../../services/agency/agency.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  agencies: any;
  page;

  constructor(
    private agencyService: AgencyService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.getAgency();
  }

  getAgency(): void {
    this.agencyService.getAllData().subscribe(agency => {
      this.agencies = agency;
      console.log(this.agencies);
    });
  }

  onRowDelete(event, agency) {
    this.agencyService.deleteAgency(agency);
    sessionStorage.removeItem('tourismFiles');
    sessionStorage.removeItem('FtavFiles');
    sessionStorage.removeItem('comRegFile');
    sessionStorage.removeItem('agencyFile');
    sessionStorage.removeItem('tunisFilesID');
    this.toast.info('تم الحذف');
  }
}
