import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from '../../services/package-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  package: any;
  modalRef: any;
  page;

  constructor(
    private activatedRoute: ActivatedRoute,
    private packageService: PackageService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    const ID = this.activatedRoute.snapshot.params['id'];
    this.getPackage(ID);
  }

  openModal(template) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getPackage(id) {
    this.packageService.getPackage().subscribe(pack => {
      const found = pack.find(p => p.id == id);
      this.package = found;
      console.log(this.package);
    });
  }

}